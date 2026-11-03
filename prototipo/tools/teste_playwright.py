import asyncio
from playwright.async_api import async_playwright
import os
BASE=os.path.dirname(os.path.abspath(__file__))+'/..'
SH=BASE+'/tools/shots/';os.makedirs(SH,exist_ok=True)
THREE=open(BASE+'/vendor/three.min.js').read()
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist'])
        pg=await b.new_page(viewport={'width':1400,'height':860})
        errs=[]
        pg.on('console',lambda m: errs.append(m.type+': '+m.text) if m.type=='error' else None)
        pg.on('pageerror',lambda e: errs.append('PAGEERR: '+str(e)))
        async def route(r):
            u=r.request.url
            if 'three' in u: await r.fulfill(body=THREE,content_type='application/javascript')
            elif 'fonts.g' in u: await r.fulfill(body='',content_type='text/css')
            else: await r.continue_()
        await pg.route('**/*',route)
        await pg.goto('file://'+BASE+'/simulador-nr10.html')
        await pg.wait_for_timeout(2000)
        await pg.screenshot(path=SH+'n_mapa.png')
        await pg.click('.mv-node[data-ch="10.13"]'); await pg.wait_for_timeout(300)
        await pg.screenshot(path=SH+'n_mapa_sel.png')
        await pg.click('.task-tab[data-task="1"]'); await pg.wait_for_timeout(200)
        await pg.click('[data-tr="1"]'); await pg.wait_for_timeout(200)
        for _ in range(3): await pg.click('[data-a=next]'); await pg.wait_for_timeout(100)
        await pg.screenshot(path=SH+'n_trail.png')
        print('mods', await pg.evaluate("MODS.map(m=>m.id+':'+m.phase).join(' ')"))
        for mid in ['enq','zonas','projeto','coletiva','organizacao','pessoas','individual','desenergizado','energizado','documentacao']:
            await pg.evaluate(f"loadModule('{mid}')"); await pg.wait_for_timeout(900)
            if mid in ('coletiva','energizado','documentacao','zonas'): await pg.screenshot(path=SH+'n_'+mid+'.png')
        # wrong answers to populate misses
        await pg.evaluate("loadModule('energizado')"); await pg.wait_for_timeout(600)
        await pg.click('.opt[data-j="0"]'); await pg.wait_for_timeout(200)
        await pg.evaluate("loadModule('documentacao')"); await pg.wait_for_timeout(600)
        await pg.evaluate("onPicked(G.hotMap['b_proj'])")
        await pg.click('[data-a=check]'); await pg.wait_for_timeout(200)
        # mission
        await pg.click('[data-phase="mis"]'); await pg.wait_for_timeout(1000)
        for k in range(12):
            ty=await pg.evaluate("document.querySelector('#oPool')?'o':document.querySelector('[data-a=chk]')?'m':'q'")
            if ty=='q': await pg.click('.opt[data-j="1"]')
            elif ty=='m':
                await pg.click('.pick label >> nth=0'); await pg.click('[data-a=chk]')
            else:
                for pidx in range(7):
                    await pg.click(f'[data-p="{pidx}"]')
            await pg.wait_for_timeout(150)
            if k==7: await pg.screenshot(path=SH+'n_missao_o.png')
            await pg.click('[data-a=next]'); await pg.wait_for_timeout(150)
        await pg.screenshot(path=SH+'n_missao_fim.png')
        await pg.click('[data-phase="map"]'); await pg.wait_for_timeout(500)
        await pg.click('.task-tab[data-task="2"]'); await pg.wait_for_timeout(300)
        await pg.screenshot(path=SH+'n_weak.png')
        print('done', await pg.evaluate("JSON.stringify(Store.data.done)"))
        m=await b.new_page(viewport={'width':390,'height':844},color_scheme='dark')
        m.on('pageerror',lambda e: errs.append('M-PAGEERR: '+str(e)))
        await m.route('**/*',route)
        await m.goto('file://'+BASE+'/simulador-nr10.html#coletiva'); await m.wait_for_timeout(2200)
        await m.screenshot(path=SH+'n_m_coletiva.png')
        await m.goto('file://'+BASE+'/simulador-nr10.html#mapa'); await m.wait_for_timeout(1500)
        await m.screenshot(path=SH+'n_m_mapa.png')
        print('mobile scrollWidth', await m.evaluate("document.documentElement.scrollWidth"))
        print('\n'.join(errs) or 'no errors')
        await b.close()
asyncio.run(main())
