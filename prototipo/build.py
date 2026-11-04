import sys
css=open('style.css').read()
js='\n'.join(open(f).read() for f in ['refs.js','refs2.js','engine.js','qbank.js','mapa.js','m1.js','m7.js','m2.js','m4.js','m5.js','m3.js','m6.js','m8.js','missao.js','historia.js','treino.js','main.js'])
# uso: python3 build.py            -> HTML que carrega three.js r128 do cdnjs (versão publicada)
#      python3 build.py --offline  -> HTML autocontido, com vendor/three.min.js embutido (roda sem internet)
OFFLINE = '--offline' in sys.argv
three = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
three_tag = ('<script>\n'+open('vendor/three.min.js').read()+'\n</script>') if OFFLINE else '<script src="'+three+'"></script>'
html=f'''<title>Simulador NR-10</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Public+Sans:wght@400;500;600;700&display=swap">
<style>
{css}
</style>
<div id="app">
 <header class="top">
  <div class="brand"><b>NR-10 <span>·</span> Simulador</b><small>Portaria MTE nº 737/2026 · nova redação, em vigor a partir de junho de 2027</small></div>
  <nav class="phases" id="phases" aria-label="Fases do simulador"></nav>
  <div class="tools"><button class="btn" id="btnNorma" type="button">Consultar norma</button></div>
  <nav class="mods" id="mods" aria-label="Módulos da fase"></nav>
 </header>
 <main class="stage">
  <section class="viewport" id="vp" aria-label="Cena 3D interativa">
   <canvas id="gl"></canvas>
   <div class="mapview" id="mapView" hidden></div>
   <div class="loading" id="loading">Montando a instalação…</div>
   <div class="vp-tag"><span class="e" id="vpE"></span><span class="s" id="vpS"></span></div>
   <div class="tip" id="tip" hidden></div>
   <div class="vp-banner" id="banner" hidden></div>
   <div class="vp-toast" id="toast" hidden></div>
   <div class="vp-hint">Arraste para girar · Shift + arraste para mover · role para aproximar · clique nos marcadores</div>
   <div class="vp-ctl"><button class="btn" id="btnPins" type="button" aria-pressed="true">Marcadores</button><button class="btn" id="btnHome" type="button">Recentrar</button></div>
  </section>
  <aside class="panel" id="panel" aria-label="Tarefas da camada"></aside>
 </main>
</div>
<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer" aria-hidden="true" aria-label="Texto da norma"><div class="dr-head"><b id="drT">Norma</b><button class="btn ghost" id="drClose" type="button">Fechar</button></div><div class="dr-body" id="drB"></div></aside>
{three_tag}
<script>
{js}
</script>
'''
if OFFLINE:  # documento completo: charset explícito evita acentos quebrados ao abrir o arquivo local
    html = '<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<style>body{margin:0}img{max-width:100%}</style>\n' + html.replace('<div id="app">','</head>\n<body>\n<div id="app">',1) + '</body>\n</html>\n'
out = 'simulador-nr10-offline.html' if OFFLINE else 'simulador-nr10.html'
open(out,'w').write(html)
open('bundle.js','w').write(js)
print(out, len(html))
