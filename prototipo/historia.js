/* ===== Histórias: ordens de serviço contadas sobre o desenho da instalação (v5) =====
   Motor genérico: cada história é um módulo da fase H, com cena estática em SVG (sem animação).
   O desenho muda de estado a cada ação, e cada objeto clicável está ligado aos itens da NR-10
   (Portaria MTE 737/2026) que se aplicam a ele. Textos normativos: só via REF (gaveta).
   Explicações das histórias são do simulador e citam o item.
   cfg = {id, store, name, short, scene, aria, brief, primer, base, explore, HS, S0, ST, draw(S,K)} */
function makeStory(cfg){
  const L='ABCDE';
  const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const {HS,S0,ST}=cfg;const NQ=ST.length;
  const bq=st=>typeof bancaQ==='function'?bancaQ(Object.assign({},st,{id:QB.idOf(st)})):st;

  /* ---------- progresso ---------- */
  const H={i:0,S:Object.assign({},S0),err:0,used:{},found:[],k:0,ans:null,ord:null,fim:false};
  function load(){try{const d=Store.data[cfg.store];if(d&&typeof d.i==='number'){Object.assign(H,d);H.S=Object.assign({},S0,d.S||{});}}catch(e){}}
  function save(){Store.data[cfg.store]={i:H.i,S:H.S,err:H.err,used:H.used,found:H.found,k:H.k,fim:H.fim};Store.save();}
  function use(r){(r||[]).forEach(x=>{H.used[x]=(H.used[x]||0)+1;});}
  function restart(){Object.assign(H,{i:0,S:Object.assign({},S0),err:0,used:{},found:[],k:0,ans:null,ord:null,fim:false});save();redraw();}
  let mode='hist',sel=null,hint=false,lastFx=null;


  /* ---------- desenho: peças comuns às cenas ---------- */
  const tx=(x,y,s,c,a)=>`<text x="${x}" y="${y}" class="${c||'sc-txt'}"${a?` text-anchor="${a}"`:''}>${s}</text>`;
  const rc=(x,y,w,h,c,r)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${c}"${r?` rx="${r}"`:''}/>`;
  function hstate(id){const st=[];const step=ST[H.i];
    if(mode==='hist'&&step&&!H.fim){if(step.ty==='hunt'&&H.found.includes(id))st.push('found');
      if(hint&&((step.alvo||[]).includes(id)||(step.alvos&&step.alvos[id]&&!H.found.includes(id))||(step.ty==='seq'&&step.acts[H.k]&&step.acts[H.k].hs.includes(id))))st.push('hint');
      if(H.ans!=null&&(step.foco||[]).includes(id))st.push('rel');}
    if(sel===id)st.push('sel');return st;}
  /* 3D: pinta os objetos pelo estado (seleção > encontrado > pista > relacionado) e põe marcador só nas pistas */
  const HCOL={sel:[0xffffff,.32],found:[0x2B7649,.55],hint:[0xE3A11B,.5],rel:[0x2E7DD1,.5]};
  function applyHot(){if(G.no3d||!G.world)return;G.world.updateMatrixWorld(true);
    G.hot.slice().forEach(o=>{if(o.userData.pin)return;const st=hstate(o.userData.hotId);const k=['sel','found','hint','rel'].find(s=>st.includes(s));
      if(k)setEm(o,HCOL[k][0],HCOL[k][1]);
      if(st.includes('hint')&&PIN_TEX){const b=new THREE.Box3().setFromObject(o);if(b.isEmpty())return;const c=b.getCenter(new THREE.Vector3());
        const s=new THREE.Sprite(new THREE.SpriteMaterial({map:PIN_TEX,depthTest:false,transparent:true,sizeAttenuation:false}));
        s.renderOrder=20;s.scale.set(.042,.042,1);s.position.set(c.x,b.max.y+.3,c.z);
        Object.assign(s.userData,{hotId:o.userData.hotId,hotLabel:o.userData.hotLabel,pin:true,y0:s.position.y,ph:Math.random()*6});
        s.visible=G.showPins;G.world.add(s);G.pins.push(s);G.hot.push(s);}});}
  function focus3d(id){if(G.no3d||!G.mod||G.mod.view==='map')return;const o=G.hot.find(x=>x.userData.hotId===id&&!x.userData.pin);if(!o)return;
    const b=new THREE.Box3().setFromObject(o);if(b.isEmpty())return;G.oT.t.copy(b.getCenter(new THREE.Vector3()));G.oT.r=Math.max(5,Math.min(G.oT.r,9));}
  function hs(id,box,inner){const st=hstate(id);
    const [x,y,w,h]=box;
    return `<g class="hs ${st.join(' ')}" data-hs="${id}" tabindex="0" role="button" aria-label="${HS[id].t}"><title>${HS[id].t}</title>${inner}<rect class="hit" x="${x-4}" y="${y-4}" width="${w+8}" height="${h+8}" rx="6"/></g>`;}
  function lock(x,y){return `<g class="sc-lock"><path d="M${x+4} ${y+8} v-5 a5 5 0 0 1 10 0 v5" class="sc-shackle"/>${rc(x,y+8,18,14,'sc-lockbody',2)}</g>`;}
  function person(id,x,name,role,color,extra){const y=600;
    return hs(id,[x-28,y-150,56,148],`<circle cx="${x}" cy="${y-128}" r="16" class="sc-skin"/>${rc(x-10,y-146,20,9,'sc-helmet',4)}
      <path d="M${x-22} ${y-110} h44 v62 h-44z" class="${color}"/>${rc(x-17,y-48,13,44,'sc-pants')}${rc(x+4,y-48,13,44,'sc-pants')}
      ${rc(x-12,y-100,24,15,'sc-badge',2)}${tx(x,y-89,role,'sc-tiny','middle')}${extra||''}${tx(x,y+14,name,'sc-name','middle')}`);}
  const K={tx,rc,hs,lock,person,H};
  function scene(){return `<svg class="hist-svg" viewBox="${cfg.viewBox||'0 96 1000 534'}" role="img" aria-label="${cfg.aria}">${cfg.draw(H.S,K)}</svg>`;}

  /* ---------- painel ---------- */
  let panelEl=null;
  function redraw(){drawScene();if(panelEl&&panelEl.isConnected){if(mode==='hist')drawStep(panelEl);else if(mode==='exp')drawExplore(panelEl);else drawIndex(panelEl);}}
  function drawScene(){if(!G.mod||G.mod.id!==cfg.id)return;if(G.mod.view!=='map'){reloadScene();return;}
    const v=$('#mapView');if(!v)return;v.innerHTML=`<div class="hist-wrap">${scene()}</div>`;
    $$('[data-hs]',v).forEach(g=>{g.onclick=()=>pick(g.dataset.hs);g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(g.dataset.hs);}};});}
  function bar(){return `<div class="prog"><span class="num">Passo ${Math.min(H.i+1,NQ)} de ${NQ}</span><div class="bar"><i style="width:${H.i/NQ*100}%"></i></div><span class="num">erros ${H.err}</span></div>`;}
  function next(){const st=ST[H.i];H.i++;H.ans=null;H.ord=null;H.found=[];H.k=0;hint=false;
    if(H.i>=NQ){H.fim=true;markDone(cfg.id,'a');}else if(ST[H.i].pre)ST[H.i].pre(H.S);save();redraw();$('#panel').scrollTop=0;}
  function wrongInfo(h,why){const i=HS[h];H.err++;miss(i.r);save();fb({k:'err',t:why||('Não é isto: '+i.t),b:i.b,r:i.r});}
  function drawStep(el){if(H.fim||H.i>=NQ){drawEnd(el);return;}const st=ST[H.i];
    let h=`${bar()}<div class="eyebrow">${st.f}</div><div class="hist-n">${st.n}</div>`;
    if(st.ty==='q'){if(!H.ord)H.ord=shuffle(st.o.map((_,i)=>i));
      h+=`<div class="q"><div class="qq">${st.q}</div>${H.ord.map((oi,j)=>`<button type="button" class="opt ${H.ans!=null?(oi===st.a?'right':(oi===H.ans?'wrong':'')):''}" data-j="${oi}" ${H.ans!=null?'disabled':''}><span class="ol">${L[j]}</span><span>${st.o[oi]}</span></button>`).join('')}</div>`;
      if(H.ans!=null)h+=cardHTML({k:H.ans===st.a?'ok':'err',t:H.ans===st.a?'Correto':'Resposta: '+L[H.ord.indexOf(st.a)],b:st.x,r:st.r,extra:whyHTML(bq(st),H.ans,H.ord)})+`<p class="lead">Na cena, os objetos ligados a esta decisão estão destacados.</p><div class="row-actions"><button type="button" class="btn primary" data-a="go">Continuar a história</button></div>`;}
    else if(st.ty==='find'){h+=`<p class="hist-p">${st.p}</p><div class="row-actions"><button type="button" class="btn" data-a="hint">${hint?'Esconder':'Mostrar'} pista</button></div>`;}
    else if(st.ty==='hunt'){const n=Object.keys(st.alvos).length;h+=`<p class="hist-p">${st.p}</p><div class="row-actions"><span class="lead">Encontradas: <b class="num">${H.found.length} de ${n}</b></span><button type="button" class="btn" data-a="hint">${hint?'Esconder':'Mostrar'} pista</button></div>`;
      if(H.found.length===n)h+=`<div class="row-actions"><button type="button" class="btn primary" data-a="go">Continuar a história</button></div>`;}
    else if(st.ty==='seq'){const done=st.acts.slice(0,H.k);const cur=st.acts[H.k];
      h+=`<p class="hist-p">${st.p}</p><ul class="steps">${done.map(a=>`<li class="done"><span class="sk">${a.k})</span><span>${a.t}</span></li>`).join('')}${cur?`<li class="cur"><span class="sk">${cur.k})</span><span>${hint?cur.t:'Próxima ação · qual é?'}</span></li>`:''}</ul>
        <div class="row-actions">${cur?`<button type="button" class="btn" data-a="hint">${hint?'Esconder':'Mostrar'} próxima ação</button>`:''}${R(st.ref)}</div>`;
      if(!cur)h+=cardHTML({k:'ok',t:st.ref==='10.13.1'?'Instalação desenergizada':'Instalação reenergizada',b:st.ref==='10.13.1'?'Só agora, com a sequência completa, a instalação é considerada desenergizada e liberada para o serviço.':'Sequência completa. O estado desenergizado foi mantido até a autorização para reenergizar.',r:[st.ref]})+`<div class="row-actions"><button type="button" class="btn primary" data-a="go">Continuar a história</button></div>`;}
    h+=`<div class="row-actions hist-foot"><button type="button" class="btn ghost" data-a="reset">Recomeçar a história</button></div>`;
    el.innerHTML=h;
    $$('.opt',el).forEach(b=>b.onclick=()=>{if(H.ans!=null)return;H.ans=+b.dataset.j;const ok=H.ans===st.a;use(st.r);if(!ok){H.err++;miss(st.r);}
      const id=QB.idOf(st);if(id)SRS.record(id,ok);STATS.rec(st,ok);save();redraw();});
    const go=$('[data-a=go]',el);if(go)go.onclick=next;
    const hb=$('[data-a=hint]',el);if(hb)hb.onclick=()=>{hint=!hint;redraw();};
    const rs=$('[data-a=reset]',el);let arm=false;rs.onclick=()=>{if(!arm){arm=true;rs.textContent='Confirmar: recomeçar do passo 1';return;}restart();};}
  function pick(h){if(!HS[h])return;
    if(mode!=='hist'){sel=h;const i=HS[h];fb({k:'info',t:i.t,b:i.b,r:i.r});redraw();return;}
    const st=ST[H.i];if(!st||H.fim)return;
    if(st.ty==='q'){const i=HS[h];fb({k:'info',t:i.t,b:i.b,r:i.r});return;}
    if(st.ty==='find'){if(st.alvo.includes(h)){use(st.ok.r);if(st.fx)st.fx(H.S);STATS.rec(st.ok,true);fb({k:'ok',t:st.ok.t,b:st.ok.b,r:st.ok.r});hint=false;next();return;}
      STATS.rec(st.ok,false);wrongInfo(h);return;}
    if(st.ty==='hunt'){const a=st.alvos[h];if(a&&!H.found.includes(h)){H.found.push(h);a.fx(H.S);use(a.r);STATS.rec(a,true);fb({k:'ok',t:a.t,b:a.b,r:a.r});hint=false;save();redraw();return;}
      if(a){fb({k:'info',t:'Já encontrada',b:a.t});return;}const i=HS[h];fb({k:'info',t:'Conforme: '+i.t,b:i.b,r:i.r});return;}
    if(st.ty==='seq'){const cur=st.acts[H.k];if(!cur)return;
      if(cur.hs.includes(h)){if(cur.fx)cur.fx(H.S);use([st.ref]);STATS.rec({r:[st.ref]},true);fb({k:'ok',t:`(${cur.k}) ${cur.t}`,b:cur.b,r:[st.ref]});H.k++;hint=false;save();redraw();return;}
      const e=st.esp&&st.esp(h,cur,H.S);H.err++;STATS.rec({r:[st.ref]},false);
      if(e){miss(e.r);save();fb({k:'err',t:e.t,b:e.b,r:e.r,gir:e.gir});redraw();return;}
      const later=st.acts.slice(H.k+1).find(a=>a.hs.includes(h));miss([st.ref]);save();
      fb({k:'err',t:'Fora de sequência',b:later?`"${later.t}" é da alínea ${later.k}. A sequência está na alínea ${cur.k}.`:`${HS[h].t} não é a próxima ação da sequência (alínea ${cur.k}).`,r:[st.ref]});redraw();}}
  function drawEnd(el){const refs=Object.keys(H.used).sort((a,b)=>chapOf(a).localeCompare(chapOf(b),'pt',{numeric:true}));
    el.innerHTML=`<div class="score">História concluída · ${H.err} erro(s)</div><p class="lead">Estes são os itens da NR-10 que você aplicou nesta instalação. Abra cada um para ler o texto da Portaria.</p>
      <div class="cr">${refs.map(r=>R(r)).join('')}</div>
      <p class="lead">As decisões desta história também entram no Treino (simulado e revisão espaçada).</p>
      <div class="row-actions"><button type="button" class="btn primary" data-a="again">Jogar de novo</button><button type="button" class="btn" data-a="map">Ver itens × cena</button></div>`;
    $('[data-a=again]',el).onclick=restart;$('[data-a=map]',el).onclick=()=>gotoTask('c');}

  /* ---------- explorar e índice ---------- */
  function drawExplore(el){const i=sel&&HS[sel];
    el.innerHTML=`<p class="lead">Clique em qualquer objeto da cena para ver o que ele é e quais itens da NR-10 se aplicam a ele. A cena mostra o estado em que a história parou.</p>
      ${i?cardHTML({k:'info',t:i.t,b:i.b,r:i.r}):'<div class="card info"><div class="ct">Nenhum objeto selecionado</div><div class="cb">'+(cfg.explore||'Comece por qualquer objeto da cena.')+'</div></div>'}`;}
  function drawIndex(el){const inv={};Object.entries(HS).forEach(([id,o])=>o.r.forEach(r=>{(inv[r]=inv[r]||[]).push(id);}));
    const keys=Object.keys(inv).sort((a,b)=>a.localeCompare(b,'pt',{numeric:true}));
    el.innerHTML=`<p class="lead">Cada item da NR-10 e o objeto da cena onde ele aparece. Clique no objeto para destacá-lo na cena.</p>
      <div class="cl">${keys.map(r=>`<div class="cl-row"><div class="t">${R(r)} <b>${REF[r]?REF[r].t:''}</b></div><div class="hist-objs">${inv[r].map(id=>`<button type="button" class="mlink" data-o="${id}">${HS[id].t.split(' · ')[0]}</button>`).join(' ')}</div></div>`).join('')}</div>`;
    $$('[data-o]',el).forEach(b=>b.onclick=()=>{sel=b.dataset.o;drawScene();focus3d(sel);fb({k:'info',t:HS[sel].t,b:HS[sel].b,r:HS[sel].r});});}


  const K3={hs:(o,id)=>hot(o,id,HS[id]?HS[id].t:id,{noPin:true}),HS,H};
  const mod={id:cfg.id,phase:'H',name:cfg.name,short:cfg.short,scene:cfg.scene,get view(){return (G.no3d||!cfg.build3d)?'map':'3d';},vpE:'História',
    primer:cfg.primer,brief:cfg.brief,base:cfg.base,cam:cfg.cam||{theta:.4,phi:1.1,r:10,t:[0,1,0],rMax:20},
    reset(){},build(){if(!cfg.build3d)return;cfg.build3d(H.S,K3);applyHot();},onPick(id){pick(id);return true;},drawMap:drawScene,
    onTask(id){mode=id==='a'?'hist':id==='b'?'exp':'idx';sel=null;hint=false;drawScene();},
    tasks:[{id:'a',title:'História',render(el){panelEl=el;mode='hist';drawStep(el);}},
      {id:'b',title:'Explorar a cena',free:1,render(el){panelEl=el;mode='exp';drawExplore(el);}},
      {id:'c',title:'Itens × cena',free:1,render(el){panelEl=el;mode='idx';drawIndex(el);}}]};
  load();
  QB.add(cfg.id,ST.filter(s=>s.ty==='q'));
  (window.__stories=window.__stories||[]).push({id:cfg.id,name:cfg.name,ST,HS,H});
  MODS.push(mod);return {mod,H};}

/* ===== Histórias em 3D (v3): peças comuns e cenários =====
   Cada cenário recebe o estado da história (S) e K.hs(objeto, id) para tornar o objeto clicável.
   Os ids são os mesmos do HS de cada história, então a lógica (passos, pistas, sequências) não muda.
   O desenho SVG continua como reserva quando o WebGL não está disponível. */
const H3={
  C:{wall:0xe6e2da,floor:0xc4c1ba,cub:0xb7c0c8,dark:0x2a3138,cu:0xc8773a,red:0xd0342c,green:0x2fa35a,yellow:0xf2c230,
    orange:0xf07f1a,paper:0xfbfaf6,steel:0x9aa3ab,alu:0xc9ced3,wood:0xb98a52,black:0x1d2126,white:0xf4f4f2,door:0x9aa3ab,glass:0x1f262d},
  room(w,d,h){const C=H3.C;const f=boxB(w,.06,d,C.floor,0,-.055,0);f.castShadow=false;
    boxB(w,h,.16,C.wall,0,0,-d/2);boxB(.16,h,d,C.wall,-w/2,0,0);boxB(w,.12,.04,0x8f99a3,0,0,-d/2+.1);},
  man(K,id,x,z,name,role,shirt,o){o=o||{};const r=person(Object.assign({x,z,shirt},o.helmet?{helmet:o.helmet}:{},o.p?{p:o.p}:{}));
    if(o.y)r.g.position.y=o.y;if(o.ry)r.g.rotation.y=o.ry;
    label(role?[name,role]:[name],0,role?2.22:2.12,0,r.g,{s:.27});if(id)K.hs(r.g,id);return r;},
  lock(p,x,y,z,s){const C=H3.C;s=s||1;const g=grp(x,y,z,p);box(.07*s,.06*s,.035*s,C.red,0,0,0,g,{roughness:.5});
    addMesh(new THREE.TorusGeometry(.024*s,.006*s,8,16,Math.PI),M(C.steel,{metalness:.7,roughness:.3}),0,.03*s,0,g);return g;},
  tag(p,x,y,z,s){s=s||1;const g=grp(x,y,z,p);box(.13*s,.18*s,.006,0xb02a24,0,0,0,g);
    plate(['NÃO','LIGAR'],.12*s,.16*s,{bg:'#d0342c',fg:'#ffffff'},0,0,.005,g);
    rod([0,.09*s,0],[0,.14*s,-.02],.004*s,0x15202b,g);return g;},
  cone(p,x,z){const C=H3.C;const g=grp(x,0,z,p);boxB(.3,.03,.3,C.orange,0,0,0,g);cyl(.025,.13,.5,C.orange,0,.28,0,g);
    cyl(.077,.095,.08,C.white,0,.25,0,g);return g;},
  cones(K,pts){const g=grp();pts.forEach(([x,z])=>H3.cone(g,x,z));
    for(let i=0;i<pts.length-1;i++){const [x0,z0]=pts[i],[x1,z1]=pts[i+1];const n=8;
      for(let k=0;k<n;k++){const a=k/n,b=(k+1)/n,sg=t=>.5-.12*4*t*(1-t);
        rod([x0+(x1-x0)*a,sg(a),z0+(z1-z0)*a],[x0+(x1-x0)*b,sg(b),z0+(z1-z0)*b],.012,k%2?0xf4f4f2:0xd0342c,g);}}
    K.hs(g,'cone');return g;},
  /* documento num quadro/prancheta: lines = texto da folha */
  doc(K,id,x,y,z,lines,o){o=o||{};const g=grp(x,y,z);g.rotation.set(o.rx||0,o.ry||0,0);
    box(.6,.8,.03,0x5b4630,0,0,0,g);plate(lines,.5,.68,{bg:'#fbfaf6',fg:'#15202b'},0,0,.017,g);
    box(.18,.05,.03,H3.C.steel,0,.38,.03,g);K.hs(g,id);return g;},
  /* caixa aberta de quadro: fundo, laterais, topo e base (não clicável) */
  encl(x,yb,zb,w,h,d,c){c=c||H3.C.cub;box(w,h,.02,0xd5dade,x,yb+h/2,zb+.01);
    boxB(.04,h,d,c,x-w/2,yb,zb+d/2);boxB(.04,h,d,c,x+w/2,yb,zb+d/2);boxB(w,.04,d,c,x,yb+h-.04,zb+d/2);boxB(w,.04,d,c,x,yb,zb+d/2);},
  /* carrinho com uma vaga por item; a vaga é sempre clicável, o item some quando está instalado na cena */
  cart(K,x,z,items){const C=H3.C;const n=items.length,sp=.46,W=n*sp+.2;const g=grp(x,0,z);
    boxB(W,.05,.62,0x46525e,0,.78,0,g);boxB(W,.04,.56,0x46525e,0,.26,0,g);
    [[-1,-1],[-1,1],[1,-1],[1,1]].forEach(([a,b])=>{cyl(.02,.02,.66,C.steel,a*(W/2-.05),.5,b*.27,g);
      const w=cyl(.07,.07,.05,C.black,a*(W/2-.05),.08,b*.27,g);w.rotation.x=Math.PI/2;});
    rod([W/2,.83,-.26],[W/2+.22,1.05,-.26],.018,C.black,g);rod([W/2,.83,.26],[W/2+.22,1.05,.26],.018,C.black,g);
    rod([W/2+.22,1.05,-.26],[W/2+.22,1.05,.26],.022,C.black,g);
    plate('CARRINHO DE FERRAMENTAS',Math.min(2.4,W*.8),.14,{bg:'#15202b',fg:'#ffffff'},0,.33,.29,g);
    items.forEach(([id,lab,fn],i)=>{const s=grp(-W/2+.1+sp*(i+.5),.805,0,g);boxB(.42,.02,.5,0x5d6b78,0,0,0,s);
      plate(lab,.42,.1,{bg:'#f4f4f2',fg:'#15202b'},0,-.035,.316,s);if(fn)fn(s);K.hs(s,id);});
    return g;},
  it:{
    det(p){const C=H3.C;const m=cyl(.02,.02,.4,C.yellow,-.03,.04,0,p);m.rotation.z=Math.PI/2;box(.1,.07,.08,C.dark,.2,.05,0,p);
      sph(.018,0x39d353,.2,.1,0,p,{emissive:0x39d353,emissiveIntensity:.8});},
    mult(p){const C=H3.C;boxB(.15,.045,.24,C.yellow,0,.02,0,p);const s=plate('0,0 V',.11,.06,{bg:'#bfe3c6',fg:'#15202b'},0,.067,-.05,p);s.rotation.x=-Math.PI/2;
      const k=cyl(.025,.025,.012,C.dark,0,.068,.05,p);rod([.05,.04,.1],[.17,.03,.2],.007,C.red,p);rod([-.05,.04,.1],[-.17,.03,.2],.007,C.black,p);},
    atr(p){const C=H3.C;const t=addMesh(new THREE.TorusGeometry(.12,.02,8,24),M(0x2c7a3a),0,.04,0,p);t.rotation.x=Math.PI/2;
      const t2=addMesh(new THREE.TorusGeometry(.1,.02,8,24),M(0x2c7a3a),0,.08,0,p);t2.rotation.x=Math.PI/2;
      box(.06,.05,.08,C.cu,.15,.05,.12,p);box(.06,.05,.08,C.cu,-.15,.05,.12,p);},
    cad(p){H3.lock(p,0,.06,0,1.7);},
    eti(p){const g=H3.tag(p,0,.12,0,1.1);g.rotation.x=-.9;},
    ant(p){const m=box(.34,.26,.02,H3.C.orange,0,.15,0,p,{transparent:true,opacity:.85});m.rotation.x=-.35;},
    cobert(p){[-.07,.07].forEach(z=>{const m=cyl(.055,.055,.36,H3.C.orange,0,.06,z,p);m.rotation.z=Math.PI/2;});},
    cone(p){const g=H3.cone(p,0,0);g.scale.setScalar(.55);},
    luva(p,ok){const C=H3.C;[-.09,.09].forEach((x,j)=>{const g=grp(x,0,0,p);g.rotation.z=j?-.15:.15;
      box(.1,.12,.035,C.yellow,0,.1,0,g);[-.036,-.012,.012,.036].forEach((fx,i)=>cyl(.011,.011,.07+(i===1||i===2?.015:0),C.yellow,fx,.19,0,g));
      const th=cyl(.012,.012,.06,C.yellow,-.06,.12,0,g);th.rotation.z=.8;
      box(.12,.04,.045,ok?C.green:C.red,0,.03,0,g,{emissive:ok?C.green:C.red,emissiveIntensity:.25});});},
    roupa(p){boxB(.34,.08,.36,0x2b4a7a,0,.01,0,p);box(.2,.03,.08,0x22395e,0,.1,-.12,p);
      const s=plate(['CAT 4','40 cal/cm²'],.22,.13,{bg:'#f4f4f2',fg:'#15202b'},0,.093,.05,p);s.rotation.x=-Math.PI/2;}}};

const H3S={cams:{
  historia:{theta:.12,phi:1.1,r:13.5,t:[-0.4,1.0,-0.6],rMax:32},
  hist_qdc:{theta:.1,phi:1.1,r:14,t:[.2,1.1,-0.7],rMax:30},
  hist_obra:{theta:.12,phi:1.2,r:22,t:[-0.3,3.8,-2.4],rMax:44},
  hist_sep:{theta:.12,phi:1.24,r:25,t:[.5,5.0,-1.8],rMax:52},
  hist_ex:{theta:.14,phi:1.25,r:24,t:[1.6,1.5,-.4],rMax:50}},

/* ---------- História 1 · cabine primária 13,8 kV ---------- */
historia(S,K){const C=H3.C;H3.room(14.6,7.4,3.4);
  // porta, extintor, documentos
  {const g=grp(-6.4,0,-3.56);boxB(1.12,2.28,.06,0x6b7580,0,0,0,g);boxB(.98,2.18,.05,C.door,0,0,.03,g);
    plate(['PERIGO','13,8 kV'],.62,.34,{bg:'#f2c230',fg:'#15202b'},0,1.6,.06,g);
    plate(['ACESSO RESTRITO','SÓ AUTORIZADOS'],.62,.2,{bg:'#ffffff',fg:'#d0342c'},0,1.28,.06,g);sph(.035,C.dark,.38,1.05,.08,g);K.hs(g,'porta');}
  {const g=grp(-5.5,0,-3.4);cyl(.11,.11,.62,C.red,0,.9,0,g);cyl(.04,.04,.08,C.dark,0,1.25,0,g);
    rod([.03,1.26,0],[.18,.98,.1],.018,C.black,g);cyl(.05,.02,.12,C.black,.19,.92,.11,g);
    plate('CO₂',.16,.08,{bg:'#ffffff',fg:'#15202b'},0,.95,.112,g);plate('EXTINTOR',.34,.12,{bg:'#d0342c',fg:'#ffffff'},0,1.75,-.12,g);K.hs(g,'ext');}
  H3.doc(K,'docs',-4.75,1.55,-3.56,['PT · OS 0731','________','unifilar']);
  // cubículo de entrada
  {const g=grp(-3.55,0,-3.0);boxB(1.3,2.4,1.1,C.cub,0,0,0,g);box(1.0,.9,.02,C.glass,0,1.85,.555,g);
    [-.3,0,.3].forEach(x=>{box(.06,.78,.04,C.cu,x,1.85,.575,g);cyl(.035,.035,.08,C.white,x,2.27,.575,g);cyl(.035,.035,.08,C.white,x,1.43,.575,g);});
    plate(['ENTRADA','13,8 kV'],.7,.26,{bg:'#15202b',fg:'#ffffff'},0,1.2,.556,g);
    plate(['PERIGO','13,8 kV'],.56,.3,{bg:'#f2c230',fg:'#15202b'},0,.78,.556,g);K.hs(g,'entrada');}
  if(S.barrier){const g=grp(-3.55,1.85,-2.36);box(1.16,1.04,.03,C.orange,0,0,0,g,{transparent:true,opacity:.78});
    plate('ANTEPARO',.5,.12,{bg:'#15202b',fg:'#ffffff'},0,.38,.02,g);K.hs(g,'ant');}
  // cubículo 89-1 / 52-1
  boxB(1.5,2.4,1.1,C.cub,-2.1,0,-3.0);
  {const g=grp(-2.1,0,-2.44);box(1.3,.95,.02,C.glass,0,1.83,0,g);
    [-.38,0,.38].forEach(x=>{cyl(.045,.045,.14,C.white,x,1.45,.05,g);cyl(.045,.045,.14,C.white,x,2.2,.05,g);box(.08,.05,.06,C.steel,x,2.12,.07,g);
      const a=[x,1.52,.07];rod(a,S.c89?[x,2.12,.07]:[x,1.52+.37,.07+.53],.018,C.steel,g,{metalness:.6,roughness:.35});});
    rod([.6,1.35,.03],[.6,1.75,.03],.02,C.black,g);
    plate('89-1 · '+(S.c89?'FECHADA':'ABERTA'),.9,.14,{bg:S.c89?'#d0342c':'#2fa35a',fg:'#ffffff'},0,1.27,.035,g);K.hs(g,'s89');}
  if(S.lock89)K.hs(H3.lock(null,-1.5,1.62,-2.39,1.6),'cad');
  if(S.tag)K.hs(H3.tag(null,-1.62,1.38,-2.405),'eti');
  {const g=grp(-2.1,0,-2.44);box(1.2,.5,.03,0x5d6b78,0,.9,0,g);
    const c=S.c52?C.red:C.green;sph(.07,c,-.38,.95,.04,g,{emissive:c,emissiveIntensity:.9});
    plate(['52-1',S.c52?'LIGADO':'DESLIGADO'],.5,.24,{bg:'#15202b',fg:'#ffffff'},.15,.98,.02,g);box(.3,.06,.06,C.dark,.15,.75,.04,g);K.hs(g,'d52');}
  {const g=grp(-2.1,0,-2.44);box(.7,.2,.03,0x5d6b78,0,.42,0,g);const on=S.c52&&S.c89;
    [-.25,-.12,.01].forEach(x=>sph(.035,on?0xffd23f:0x50565c,x,.42,.025,g,{emissive:on?0xffb000:0,emissiveIntensity:on?1:0}));
    plate('VPIS',.18,.09,{bg:'#15202b',fg:'#ffffff'},.22,.42,.02,g);K.hs(g,'vpis');}
  // baia do TR-01
  boxB(.06,2.4,1.1,C.cub,-1.25,0,-3.0);boxB(.06,2.4,1.1,C.cub,.85,0,-3.0);boxB(2.1,.4,.04,C.cub,-.2,2.0,-2.47);
  plate(['TR-01 · 1000 kVA','13,8 kV / 380 V'],1.3,.32,{bg:'#15202b',fg:'#ffffff'},-.2,2.2,-2.445);
  {const g=grp(-.2,0,-3.0);boxB(1.2,.12,.8,C.dark,0,0,0,g);boxB(1.1,1.2,.7,0x7b8a7a,0,.12,0,g);
    for(let i=0;i<6;i++)boxB(.03,1.0,.22,0x6f7e6e,-.4+i*.16,.22,.45,g);
    [-.32,0,.32].forEach(x=>{cyl(.05,.07,.3,C.white,x,1.47,0,g);[0,1,2].forEach(k=>cyl(.09,.09,.02,C.white,x,1.38+k*.09,0,g));cyl(.02,.02,.08,C.cu,x,1.66,0,g);});
    K.hs(g,'tr');}
  if(S.tools){const g=grp(.45,0,-1.9);boxB(.42,.2,.22,C.red,0,0,0,g);rod([-.12,.2,0],[-.12,.28,0],.012,C.black,g);rod([.12,.2,0],[.12,.28,0],.012,C.black,g);
    rod([-.12,.28,0],[.12,.28,0],.012,C.black,g);const w=box(.34,.02,.05,C.steel,-.42,.01,.1,g,{metalness:.6});w.rotation.y=.4;K.hs(g,'ferr');}
  // barra de terra e aterramento temporário
  {const g=grp();box(5.0,.05,.04,C.cu,-1.67,.14,-2.36,g);for(let i=0;i<6;i++)cyl(.02,.02,.1,C.yellow,-4.0+i*.95,.06,-2.36,g);
    plate('TERRA',.3,.1,{bg:'#2fa35a',fg:'#ffffff'},1.1,.15,-2.33,g);K.hs(g,'terra');}
  if(S.ground){const g=grp();[-1,0,1].forEach(i=>{const x=-.2+i*.32;const a=[x,1.7,-3.0],m=[-.2+i*.45,1.22,-2.2],b=[-.6+i*.3,.17,-2.33];
      rod(a,m,.015,0x2c7a3a,g);rod(m,b,.015,0x2c7a3a,g);box(.06,.06,.06,C.cu,...a,g);box(.06,.05,.06,C.cu,...b,g);});
    rod([-.52,1.72,-3.0],[.12,1.72,-3.0],.012,0x2c7a3a,g);K.hs(g,'atr');}
  // escada, pintor, Davi
  if(S.escada){const g=grp();[1.05,1.45].forEach(x=>rod([x,0,-2.35],[x,2.95,-3.52],.022,C.alu,g,{metalness:.6,roughness:.35}));
    for(let k=1;k<10;k++){const t=k/10;rod([1.05,2.95*t,-2.35-1.17*t],[1.45,2.95*t,-2.35-1.17*t],.015,C.alu,g,{metalness:.6});}K.hs(g,'escada');}
  if(S.pintor){const {g,P}=H3.man(K,'pintor',2.5,-2.75,'Pintor','terceirizado',0xeeeeea,{ry:Math.PI});P.shR.rotation.x=-2.5;
    const r=cyl(.045,.045,.24,0xd8d0c0,0,-.72,0,P.shR);r.rotation.z=Math.PI/2;cyl(.12,.1,.22,0xd9d4c8,.35,.11,.15,g);}
  if(S.davi)H3.man(K,'davi',2.1,-1.3,'Davi','mecânico',0x8a5a2b);
  // QGBT e gerador
  {const g=grp(4.3,0,-3.3);boxB(1.1,2.1,.5,C.cub,0,0,0,g);plate('QGBT · 380 V',.8,.16,{bg:'#15202b',fg:'#ffffff'},0,2.3,.2,g);
    if(S.qgbtOpen){box(1.0,1.9,.02,0x3a434c,0,1.05,.245,g);
      for(let r=0;r<4;r++)for(let c=0;c<6;c++){box(.1,.18,.06,C.white,-.38+c*.15,.5+r*.4,.27,g);box(.03,.05,.03,C.black,-.38+c*.15,.53+r*.4,.31,g);}
      const h=grp(.55,0,.25,g);h.rotation.y=1.9;boxB(1.08,2.04,.03,C.door,-.54,.03,0,h);}
    else{boxB(1.08,2.04,.03,C.door,0,.03,.265,g);plate(['PERIGO','380 V'],.5,.28,{bg:'#f2c230',fg:'#15202b'},0,1.55,.282,g);
      plate('CHOQUE · ARCO',.5,.12,{bg:'#ffffff',fg:'#d0342c'},0,1.3,.282,g);box(.04,.2,.04,C.black,.42,1.05,.3,g);}
    if(S.lockBT)H3.lock(g,.3,1.05,.33,1.6);K.hs(g,'qgbt');}
  {const g=grp(6.05,0,-2.9);boxB(1.6,.15,.9,C.dark,0,0,0,g);boxB(1.4,1.0,.8,0xe0b020,0,.15,0,g);
    box(.5,.6,.02,C.glass,-.38,.65,.41,g);const f=cyl(.22,.22,.02,0x4a5158,-.38,.65,.42,g);f.rotation.x=Math.PI/2;
    box(.4,.42,.06,C.cub,.38,.72,.43,g);plate(['QTA','AUTO'],.3,.16,{bg:'#15202b',fg:'#ffffff'},.38,.82,.462,g);
    sph(.025,C.green,.3,.6,.465,g,{emissive:C.green,emissiveIntensity:.8});cyl(.05,.05,.6,C.dark,.5,1.45,-.25,g);
    plate('GERADOR',.5,.12,{bg:'#15202b',fg:'#ffffff'},0,1.08,.401,g);K.hs(g,'ger');}
  K.hs(boxB(5.0,.015,1.2,0x22272c,-1.67,0,-1.62),'tapete');
  if(S.cones)H3.cones(K,[[-4.1,-.8],[-2.9,-.75],[-1.7,-.75],[-.5,-.75],[.7,-.8]]);
  // pessoas
  H3.man(K,'ana',-6.0,.5,'Ana','PLH',0x2f5d8a);
  {const {P}=H3.man(K,'bruno',-4.9,.6,'Bruno','técnico',0x2e8b7a);if(S.relogio)box(.15,.05,.16,0xc9ced3,0,-.55,0,P.shL,{metalness:.7,roughness:.3});}
  if(S.caio)H3.man(K,'caio',-3.8,.6,'Caio','?',0x6b7580);
  // carrinho
  const I=H3.it;H3.cart(K,1.3,1.35,[['det','Detector',I.det],['atr','Aterram.',S.ground?null:I.atr],['cad','Cadeado',S.lock89?null:I.cad],
    ['eti','Etiqueta',S.tag?null:I.eti],['ant','Anteparo',S.barrier?null:I.ant],['cone','Cones',S.cones?null:I.cone],
    ['luva','Luvas',p=>I.luva(p,S.luvaOk)],['roupa','Vestim.',I.roupa]]);},

/* ---------- História 2 · QDC de prédio comercial ---------- */
hist_qdc(S,K){const C=H3.C;H3.room(13.4,7,3.2);
  // shaft
  {const g=grp(-5.3,0,-3.42);boxB(.08,2.3,.12,C.steel,-.66,0,0,g);boxB(.08,2.3,.12,C.steel,.66,0,0,g);boxB(1.4,.08,.12,C.steel,0,2.3,0,g);
    box(1.24,2.3,.02,0x1b2026,0,1.15,-.01,g);[-.3,-.15,0].forEach(x=>cyl(.05,.05,2.3,C.black,x,1.15,.04,g));
    plate(['SHAFT ELÉTRICO','SÓ AUTORIZADOS'],.9,.3,{bg:'#f2c230',fg:'#15202b'},0,2.6,.0,g);const h=grp(-.66,0,.06,g);h.rotation.y=-1.3;boxB(1.24,2.24,.04,0x8a939c,.62,.02,0,h);
    plate(['SHAFT ELÉTRICO','SÓ AUTORIZADOS'],.8,.36,{bg:'#f2c230',fg:'#15202b'},.62,1.6,.025,h);K.hs(g,'shaft');}
  if(S.caixas){const g=grp(-5.3,0,-2.95);boxB(.55,.45,.45,0xb98a52,-.25,0,0,g);boxB(.5,.4,.42,0xc69a62,.3,0,.05,g);boxB(.45,.38,.4,0xa97c46,-.2,.45,0,g);
    plate('ARQUIVO',.3,.1,{bg:'#ffffff',fg:'#15202b'},-.25,.25,.228,g);K.hs(g,'caixas');}
  // QDC
  const qx=-1.8;H3.encl(qx,.55,-3.42,2.2,1.8,.3);plate('QDC 3º ANDAR · 380/220 V',1.7,.16,{bg:'#15202b',fg:'#ffffff'},qx,2.55,-3.38);
  {const h=grp(qx-1.1,0,-3.12);h.rotation.y=-1.7;boxB(2.18,1.78,.03,C.door,1.09,.56,0,h);
    plate(['380 V','CHOQUE · ARCO','SÓ AUTORIZADOS'],.7,.42,{bg:'#f2c230',fg:'#15202b'},1.09,1.6,-.017,h,Math.PI);
    plate(['PERIGO','380 V'],.6,.34,{bg:'#f2c230',fg:'#15202b'},1.09,1.6,.017,h);K.hs(h,'qdc');}
  {const g=grp(qx-.55,2.15,-3.36);[-.2,0,.2].forEach(x=>{const s=cyl(.035,.035,.08,C.cu,x,0,.04,g);s.rotation.x=Math.PI/2;rod([x,.02,.02],[x,.2,.02],.02,C.black,g);});
    K.hs(g,'bornes');}
  if(S.barrier){const g=grp(qx-.55,2.15,-3.23);box(.62,.24,.02,C.orange,0,0,0,g,{transparent:true,opacity:.82});K.hs(g,'ant');}
  {const g=grp(qx-.55,1.8,-3.38);box(.62,.36,.14,C.dark,0,0,.07,g);const c=S.dg?C.red:C.green;
    sph(.04,c,.23,.1,.15,g,{emissive:c,emissiveIntensity:.9});plate(['GERAL',S.dg?'LIGADO':'DESLIGADO'],.3,.14,{bg:'#15202b',fg:'#ffffff'},-.1,0,.142,g);
    box(.08,.1,.05,C.black,.15,S.dg?.07:-.07,.165,g);K.hs(g,'dg');}
  if(S.lock)K.hs(H3.lock(null,qx-.2,1.69,-3.16,1.5),'cad');
  if(S.tag)K.hs(H3.tag(null,qx-.95,1.7,-3.2),'eti');
  {const g=grp(qx,1.5,-3.36);[0,1,2,3].forEach(i=>box(1.9,.035,.025,i===3?0x4a78b5:C.cu,0,.09-i*.06,.03,g));
    [-.8,0,.8].forEach(x=>box(.05,.24,.04,0x8b2a2a,x,0,.01,g));K.hs(g,'barr');}
  if(S.ground){const g=grp();[0,1,2,3].forEach(i=>{const a=[qx-.75+i*.5,1.59-i*.06,-3.31],m=[qx-.6+i*.35,.9,-2.92],b=[qx-.3+i*.12,.06,-2.7];
      rod(a,m,.013,0x2c7a3a,g);rod(m,b,.013,0x2c7a3a,g);box(.05,.05,.05,C.cu,...a,g);});box(.3,.06,.1,C.cu,qx-.12,.04,-2.7,g);K.hs(g,'atr');}
  {const g=grp(qx-.35,1.0,-3.38);for(let r=0;r<3;r++)for(let c=0;c<6;c++){box(.12,.2,.1,C.white,c*.16-.4,.26-r*.26,.05,g);box(.03,.05,.03,C.black,c*.16-.4,.29-r*.26,.115,g);}
    if(!S.semId)for(let c=0;c<6;c++)plate('C'+(c+1),.12,.06,{bg:'#15202b',fg:'#ffffff'},c*.16-.4,.42,.07,g);K.hs(g,'circ');}
  {const g=grp(qx+.7,1.05,-3.38);box(.3,.45,.12,C.white,0,0,.06,g);sph(.025,C.yellow,.08,-.12,.125,g);
    plate(['DR','copa'],.24,.16,{bg:'#2e7dd1',fg:'#ffffff'},0,.08,.121,g);K.hs(g,'dr');}
  box(1.9,.04,.03,C.cu,qx,.66,-3.38);
  // documentos e copa
  H3.doc(K,'docs',.9,1.55,-3.4,['PROCEDIMENTO','POP-07','projeto']);
  {const g=grp(3.9,0,-3.05);boxB(2.8,.9,.66,0xd9d4c8,0,0,0,g);boxB(2.9,.04,.72,0x4a4f55,0,.9,0,g);box(.5,.02,.38,C.alu,-.6,.95,0,g);
    rod([-.6,.94,-.24],[-.6,1.2,-.24],.015,C.alu,g);rod([-.6,1.2,-.24],[-.6,1.2,-.1],.015,C.alu,g);
    boxB(.5,.3,.36,C.dark,.8,.94,-.05,g);box(.3,.2,.01,0x3a434c,.75,1.09,.131,g);boxB(2.8,.62,.34,0xd9d4c8,0,1.65,-.16,g);
    box(.16,.1,.02,C.white,.2,1.2,-.32,g);sph(.012,C.dark,.17,1.2,-.31,g);sph(.012,C.dark,.23,1.2,-.31,g);
    plate('COPA-COZINHA',1.0,.16,{bg:'#15202b',fg:'#ffffff'},0,2.45,-.3,g);K.hs(g,'copa');}
  // pessoas
  {const {P}=H3.man(K,'rita',1.9,.3,'Rita','eletricista',0x2f5d8a);
    if(S.anel){const r=addMesh(new THREE.TorusGeometry(.03,.012,8,16),M(0xe0b020,{metalness:.8,roughness:.25}),0,-.62,0,P.shR);r.rotation.x=Math.PI/2;}}
  if(S.leo)H3.man(K,'leo',2.9,.4,'Léo','técnico',0x2e8b7a);
  H3.man(K,'joana',5.4,.6,'Joana','recepção',0x8a4a8a);
  if(S.furad){const g=grp(4.0,0,1.2);g.scale.setScalar(1.5);box(.26,.1,.09,0x1f7a5a,0,.2,0,g);boxB(.08,.15,.08,0x1f7a5a,-.04,0,0,g);
    const c=cyl(.025,.03,.08,C.steel,.17,.2,0,g);c.rotation.z=Math.PI/2;const b=cyl(.006,.006,.12,C.steel,.27,.2,0,g);b.rotation.z=Math.PI/2;
    rod([-.04,.02,0],[-.35,.015,.15],.008,C.black,g);rod([-.35,.015,.15],[-.6,.015,.06],.008,C.black,g);box(.07,.05,.05,C.white,-.64,.03,.06,g);
    label('adaptador',-.64,.22,.06,g,{s:.12});K.hs(g,'furad');}
  // carrinho e cones
  const I=H3.it;H3.cart(K,-.4,1.35,[['mult','Medidor',I.mult],['cad','Cadeado',S.lock?null:I.cad],['eti','Etiqueta',S.tag?null:I.eti],
    ['atr','Aterram.',S.ground?null:I.atr],['ant','Anteparo',S.barrier?null:I.ant],['cone','Cones',S.cones?null:I.cone]]);
  if(S.cones)H3.cones(K,[[-3.3,-2.0],[-2.2,-1.9],[-1.1,-1.9],[0,-2.0]]);},

/* ---------- História 3 · canteiro de obra ---------- */
hist_obra(S,K){const C=H3.C;
  {const f=boxB(24,.06,16,0xa48a6a,0,-.055,1);f.castShadow=false;const s=boxB(24,.16,2.2,0xb8b8b0,0,-.01,-6.3);s.castShadow=false;}
  // tapume e rede de MT na calçada
  boxB(24,2.2,.05,0xb7bec4,0,0,-5.25);for(let x=-11;x<=11;x+=2.2)boxB(.08,2.3,.08,0x8a939c,x,0,-5.2);
  {const g=grp();[[-5,true],[6.5,false]].forEach(([px])=>{cyl(.13,.2,9,0xa8a8a0,px,4.5,-6.6,g);box(.12,.12,1.6,0x8a8a82,px,8.6,-6.6,g);
      [-7.2,-6.6,-6.0].forEach(z=>cyl(.05,.07,.2,0xcfe6e0,px,8.76,z,g));});
    [-7.2,-6.6,-6.0].forEach(z=>rod([-12,8.87,z],[12,8.87,z],.024,C.dark,g));
    plate(['PERIGO','13,8 kV'],.42,.26,{bg:'#f2c230',fg:'#15202b'},-5,3.0,-6.38,g);K.hs(g,'rede');}
  if(S.verg){const {g,P}=H3.man(K,'vergalhao',-3.6,-4.3,'Servente',null,0xf07f1a,{helmet:'#f2c230'});P.shL.rotation.x=-2.7;P.shR.rotation.x=-2.7;
    rod([-.15,.6,.25],[-1.3,7.6,-1.8],.014,0x7a4a2a,g);rod([.12,.6,.25],[-1.0,7.5,-1.9],.014,0x7a4a2a,g);}
  // edifício em obra ao fundo
  for(let lv=0;lv<3;lv++){boxB(7,.2,2.4,0xbdbab2,4.6,lv*2.8,-3.9);[1.2,4.6,8.0].forEach(x=>[-4.9,-2.9].forEach(z=>{if(lv<2)boxB(.25,2.8,.25,0xa9a59c,x,lv*2.8+.2,z);}));}
  // QDP
  const qx=-2.0;boxB(1.4,2.25,.05,C.wood,qx,0,-2.66);boxB(.1,2.3,.1,0x8a6a42,qx-.6,0,-2.72);boxB(.1,2.3,.1,0x8a6a42,qx+.6,0,-2.72);
  plate('QDP · 380/220 V',.8,.14,{bg:'#15202b',fg:'#ffffff'},qx,2.08,-2.63);
  H3.encl(qx,.8,-2.63,.9,1.2,.32);
  if(S.qdpOpen){const h=grp(qx-.45,0,-2.31);h.rotation.y=-1.7;boxB(.9,1.2,.03,C.door,.45,.8,0,h);
      if(S.placa)plate(['PERIGO','380 V'],.5,.3,{bg:'#f2c230',fg:'#15202b'},.45,1.6,-.017,h,Math.PI);K.hs(h,'qdp');
    {const g=grp(qx,1.85,-2.58);[-.22,0,.22].forEach(x=>{const s=cyl(.03,.03,.07,C.cu,x,0,.035,g);s.rotation.x=Math.PI/2;rod([x,.02,.02],[x,.15,.02],.018,C.black,g);});K.hs(g,'bornes');}
    if(S.barrier){const g=grp(qx,1.85,-2.47);box(.62,.2,.02,C.orange,0,0,0,g,{transparent:true,opacity:.82});K.hs(g,'ant');}
    {const g=grp(qx-.15,1.55,-2.6);box(.42,.26,.12,C.dark,0,0,.06,g);const c=S.dg?C.red:C.green;sph(.035,c,.15,.07,.13,g,{emissive:c,emissiveIntensity:.9});
      plate(['GERAL',S.dg?'LIGADO':'DESLIG.'],.22,.12,{bg:'#15202b',fg:'#ffffff'},-.08,0,.121,g);K.hs(g,'dg');}
    if(S.lock)K.hs(H3.lock(null,qx+.13,1.45,-2.44,1.4),'cad');
    if(S.tag)K.hs(H3.tag(null,qx-.32,1.42,-2.45,.9),'eti');
    {const g=grp(qx-.2,1.22,-2.6);box(.24,.26,.1,C.white,0,0,.05,g);plate('DR',.16,.08,{bg:'#2e7dd1',fg:'#ffffff'},0,.05,.101,g);sph(.02,C.yellow,-.07,-.08,.1,g);
      if(S.drOk)sph(.025,C.green,.08,-.08,.105,g,{emissive:C.green,emissiveIntensity:.9});K.hs(g,'drq');}
    [0,1].forEach(i=>box(.1,.2,.09,C.white,qx+.12+i*.13,1.22,-2.56));
    if(S.sacos){const g=grp(qx,.84,-2.47);boxB(.38,.24,.22,0xd9cfb8,-.2,0,0,g);boxB(.38,.22,.22,0xcfc4aa,.2,0,0,g);
      plate('CIMENTO',.3,.08,{bg:'#8a6a42',fg:'#ffffff'},-.2,.12,.111,g);K.hs(g,'sacos');}
    if(S.ground){const g=grp();rod([qx-.15,1.45,-2.47],[qx-.6,.65,-2.0],.014,0x2c7a3a,g);rod([qx-.6,.65,-2.0],[qx-.9,.12,-1.8],.014,0x2c7a3a,g);
      cyl(.02,.02,.3,C.cu,qx-.9,.1,-1.8,g);box(.06,.05,.06,C.cu,qx-.15,1.45,-2.47,g);K.hs(g,'atr');}}
  else{const d=boxB(.9,1.2,.03,C.door,qx,.8,-2.29);plate(['PERIGO','380 V'],.5,.3,{bg:'#f2c230',fg:'#15202b'},qx,1.6,-2.27);
    plate('CHOQUE · ARCO',.5,.1,{bg:'#ffffff',fg:'#d0342c'},qx,1.37,-2.27);K.hs(d,'qdp');
    const g=grp(qx+.28,1.05,-2.26);box(.12,.12,.04,C.dark,0,0,0,g);box(.03,.12,.03,C.red,0,0,.03,g);
    plate(S.dg?'ligado':'desligado',.22,.07,{bg:'#15202b',fg:'#ffffff'},0,-.11,.005,g);K.hs(g,'dg');}
  if(S.interf){const g=grp();rod([qx+.62,.1,-2.55],[qx+.62,2.0,-2.55],.03,0x8a939c,g);rod([qx+.62,1.9,-2.55],[qx+.45,1.9,-2.55],.03,0x8a939c,g);
    box(.14,.22,.08,C.white,qx+.62,1.25,-2.48,g);plate('INTERF.',.12,.05,{bg:'#15202b',fg:'#ffffff'},qx+.62,1.32,-2.439,g);K.hs(g,'interf');}
  // pátio
  {const g=grp(1.7,0,-.8);boxB(.1,1.1,.1,C.wood,0,0,0,g);box(.38,.28,.14,0x5d6b78,0,1.0,.1,g);
    [-.09,.09].forEach(x=>{const s=cyl(.05,.05,.02,C.white,x,1.0,.175,g);s.rotation.x=Math.PI/2;});
    plate(['TOMADAS','PÁTIO'],.32,.14,{bg:'#15202b',fg:'#ffffff'},0,1.3,.06,g);K.hs(g,'tomext');}
  {const g=grp(4.6,0,-.6);[[-.45,-.35],[-.45,.35],[.45,-.35],[.45,.35]].forEach(([x,z])=>rod([x,.2,z],[0,.8,0],.025,0x5d6b78,g));
    const d=cyl(.45,.3,.8,C.orange,.1,1.15,0,g);d.rotation.z=.6;const r=cyl(.3,.3,.04,0x3a434c,.33,1.48,0,g);r.rotation.z=.6;
    box(.3,.25,.25,0x2f5d8a,-.5,.75,0,g);[-.45,.45].forEach(z=>{const w=cyl(.18,.18,.08,C.black,0,.18,z,g);w.rotation.x=Math.PI/2;});K.hs(g,'betoneira');}
  {const g=grp(.2,0,-1.9);boxB(1.0,.04,.6,C.wood,0,.85,0,g);[[-.45,-.25],[-.45,.25],[.45,-.25],[.45,.25]].forEach(([x,z])=>boxB(.05,.85,.05,0x8a6a42,x,0,z,g));}
  H3.doc(K,'proj',.2,1.2,-2.0,['PROJETO','QDP','PLH: Marta'],{rx:-.35});
  if(S.tools){const g=grp(-1.0,0,-1.55);boxB(.42,.2,.22,C.red,0,0,0,g);rod([-.12,.2,0],[.12,.2,0],.012,C.black,g);
    const sp=cyl(.16,.16,.12,C.black,.45,.16,0,g);sp.rotation.x=Math.PI/2;K.hs(g,'ferr');}
  if(S.cones)H3.cones(K,[[-3.1,-1.35],[-2.0,-1.25],[-.9,-1.35]]);
  // pessoas
  H3.man(K,'marta',.2,.9,'Marta','PLH',0x2f5d8a);H3.man(K,'tiago',1.2,.9,'Tiago','eletricista',0x2e8b7a,{helmet:'#f2c230'});
  if(S.klaus)H3.man(K,'klaus',2.2,.9,'Klaus','fabricante',0x6a4c9c,{helmet:'#d0342c'});
  if(S.ajud)H3.man(K,'ajud',3.2,1.0,'Ajudante','obra',0xf07f1a,{helmet:'#f2c230'});
  const I=H3.it;H3.cart(K,-2.6,1.3,[['atr','Aterram.',S.ground?null:I.atr],['ant','Anteparo',S.barrier?null:I.ant],['eti','Etiqueta',S.tag?null:I.eti],
    ['cad','Cadeado',S.lock?null:I.cad],['cone','Cones',S.cones?null:I.cone]]);},

/* ---------- História 4 · rede aérea de distribuição (SEP) ---------- */
hist_sep(S,K){const C=H3.C;
  {const a=boxB(70,.06,10,0x3a3f45,0,-.055,1.5);a.castShadow=false;const s=boxB(70,.16,2.6,0xb8b8b0,0,-.01,-4.8);s.castShadow=false;
    const l=boxB(70,.06,24,0x8fae6a,0,-.055,-18.1);l.castShadow=false;for(let x=-25;x<26;x+=2.4)boxB(1.2,.008,.12,C.white,x,0,1.8);}
  const PZ=-4.4,ZS=[-5.0,-4.4,-3.8];
  // postes vizinhos (não clicáveis) e poste principal
  [-8,11].forEach(px=>{cyl(.14,.22,10,0xa8a8a0,px,5,PZ);box(.1,.1,1.5,0x8a8a82,px,9.2,PZ);ZS.forEach(z=>cyl(.05,.07,.2,0xcfe6e0,px,9.36,z));
    box(.06,.4,.06,0x5d6b78,px,7.6,PZ+.2);});
  {const g=grp(0,0,PZ);cyl(.14,.22,10,0xa8a8a0,0,5,0,g);box(.1,.1,1.5,0x8a8a82,0,9.2,0,g);box(.06,.4,.06,0x5d6b78,0,7.6,.2,g);K.hs(g,'poste');}
  {const g=grp();ZS.forEach((z,i)=>{if(i===1){const b=cyl(.05,.07,.2,0x8a6a4a,.03,9.33,z,g);b.rotation.z=.5;box(.06,.04,.05,0x8a6a4a,.12,9.27,z+.06,g);}
      else{cyl(.05,.07,.2,0xcfe6e0,0,9.36,z,g);cyl(.08,.08,.03,0xcfe6e0,0,9.4,z,g);}});K.hs(g,'isol');}
  {const g=grp();ZS.forEach(z=>rod([-22,9.5,z],[22,9.5,z],.026,C.dark,g));label('MT 13,8 kV',-4,9.95,PZ,g,{s:.32});K.hs(g,'mt');}
  {const g=grp();[7.4,7.6,7.8].forEach(y=>rod([-22,y,PZ+.25],[22,y,PZ+.25],.022,C.black,g));label('BT',-4,8.15,PZ+.25,g,{s:.3});K.hs(g,'bt');}
  if(S.cobert){const g=grp();[7.4,7.6,7.8].forEach(y=>{const c=cyl(.07,.07,3.2,C.orange,0,y,PZ+.25,g);c.rotation.z=Math.PI/2;});K.hs(g,'cobert');}
  {const g=grp();rod([-22,6.4,PZ+.25],[22,6.4,PZ+.25],.02,0x111111,g);box(.36,.18,.12,C.dark,.7,6.4,PZ+.25,g);label('fibra',-4,6.75,PZ+.25,g,{s:.28});K.hs(g,'fibra');}
  // chave fusível no poste da esquerda
  {const g=grp(-8,0,PZ);box(.08,.08,1.5,0x8a8a82,0,8.3,0,g);
    ZS.forEach(z=>{const zl=z-PZ;cyl(.05,.05,.35,C.white,0,8.25,zl+.08,g);
      rod([0,8.05,zl+.18],S.open?[0,7.6,zl+.62]:[0,8.6,zl+.2],.035,0x7a5a3a,g);});
    plate(['CHAVE',S.open?'ABERTA':'FECHADA'],.9,.32,{bg:S.open?'#2fa35a':'#d0342c',fg:'#ffffff'},0,7.0,.24,g);
    if(S.lock)H3.lock(g,.2,6.55,.26,4);K.hs(g,'chave');}
  if(S.tag)K.hs(H3.tag(null,-8.25,6.45,PZ+.26,2.6),'eti');
  if(S.ground){const g=grp();[[-.9,1],[.9,-1]].forEach(([dx])=>{ZS.forEach(z=>rod([dx,9.48,z],[dx*.8,8.6,PZ+.3],.014,0x2c7a3a,g));
      rod([dx*.8,8.6,PZ+.3],[dx*.4,.2,PZ+.4],.018,0x2c7a3a,g);box(.08,.08,.08,C.cu,dx*.4,.15,PZ+.4,g);});K.hs(g,'atr');}
  if(S.prov){const c=grp();[-.22,.22].forEach(dz=>rod([1.6,0,PZ+dz],[.25,6.3,PZ+dz],.025,C.alu,c,{metalness:.6}));
    for(let k=1;k<20;k++){const t=k/20;rod([1.6-1.35*t,6.3*t,PZ-.22],[1.6-1.35*t,6.3*t,PZ+.22],.016,C.alu,c);}
    H3.man(K,null,1.0,PZ,'Técnico','provedor',0x7a3db8,{y:2.9,ry:-Math.PI/2,p:c});K.hs(c,'tecprov');}
  // caminhão com cesto e rádio
  {const g=grp(4.8,0,.2);boxB(5.2,.3,2.0,C.dark,0,.5,0,g);boxB(3.4,.8,2.0,C.white,-.8,.8,0,g);boxB(1.5,1.6,2.0,C.white,1.85,.8,0,g);
    box(.02,.7,1.7,C.glass,2.61,1.85,0,g);box(3.4,.12,.02,C.orange,-.8,1.3,1.01,g);
    plate('AGRESTE ENERGIA',1.6,.22,{bg:'#ffffff',fg:'#15202b'},-.8,1.05,1.012,g);
    [-1.6,-.6,1.6].forEach(x=>[-1,1].forEach(z=>{const w=cyl(.45,.45,.3,C.black,x,.45,z,g);w.rotation.x=Math.PI/2;}));
    cyl(.3,.35,.4,C.white,-1.6,1.6,0,g);
    const base=[-1.6,1.85,0],mid=[-2.55,4.6,-2.0],top=[-3.5,7.3,-3.5];rod(base,mid,.12,C.white,g);rod(mid,top,.1,C.yellow,g);
    boxB(.7,.9,.7,C.yellow,-3.6,7.2,-3.65,g);K.hs(g,'cesto');}
  {const g=grp(6.65,2.4,.2);boxB(.25,.35,.15,C.dark,0,0,0,g);rod([.08,.35,0],[.08,.95,0],.01,C.black,g);
    sph(.025,C.green,-.06,.28,.08,g,{emissive:C.green,emissiveIntensity:.9});label('rádio · COD',0,1.2,0,g,{s:.22});K.hs(g,'cod');}
  // casas com geração solar
  {const g=grp();[5.0,8.6].forEach(x=>{const zc=-8.6;boxB(3,2.6,3,0xe9e1cf,x,0,zc,g);box(.7,1.4,.02,0x7a5a3a,x-.6,.7,zc+1.51,g);
      const f=box(3.4,.1,2.0,0xa2533a,x,3.08,zc+.82,g);f.rotation.x=.55;const b=box(3.4,.1,2.0,0xa2533a,x,3.08,zc-.82,g);b.rotation.x=-.55;
      const pv=box(2.4,.04,1.3,0x1d3557,x,3.17,zc+.86,g,{metalness:.4,roughness:.3});pv.rotation.x=.55;});
    label('casas com geração solar',6.8,4.4,-8.6,g,{s:.3});K.hs(g,'ufv');}
  if(S.nuvem){const g=grp(-12,8,-30);g.scale.setScalar(1.6);[[0,0,0,1.8],[1.8,.3,.2,1.5],[-1.7,.2,.1,1.4],[.8,.9,-.4,1.3],[-.6,1,-.2,1.2]].forEach(([x,y,z,r])=>sph(r,0x5d6670,x,y,z,g));
    const pts=[[.3,-1.4,1],[-.4,-2.6,1.2],[.4,-2.7,1.2],[-.5,-4.4,1.4]];for(let i=0;i<3;i++)rod(pts[i],pts[i+1],.08,0xffd23f,g,{emissive:0xffd23f,emissiveIntensity:.9});
    K.hs(g,'nuvem');}
  // documentos, cones, equipe, carrinho
  {const g=grp(-6.0,0,1.6);boxB(.8,.04,.5,0x8a939c,0,.8,0,g);[[-.35,-.2],[-.35,.2],[.35,-.2],[.35,.2]].forEach(([x,z])=>rod([x,0,z],[x,.8,z],.015,0x5d6b78,g));}
  H3.doc(K,'docs',-6.0,1.0,1.6,['PT · OS 2210','análise de risco'],{rx:-1.15});
  if(S.cones)H3.cones(K,[[-3,-2.9],[-1.5,-2.7],[0,-2.6],[1.5,-2.7],[3,-2.9]]);
  H3.man(K,'edu',-4.6,1.9,'Edu','encarregado',0x2f5d8a);H3.man(K,'fabio',-3.6,1.9,'Fábio','linha',0xf07f1a);H3.man(K,'gil',-2.6,1.9,'Gil','linha',0xf07f1a);
  const I=H3.it;H3.cart(K,-.2,2.8,[['det','Detector',I.det],['atr','Aterram.',S.ground?null:I.atr],['cobert','Cobert.',S.cobert?null:I.cobert],
    ['eti','Etiqueta',S.tag?null:I.eti],['cone','Cones',S.cones?null:I.cone]]);},

/* ---------- História 5 · posto de combustível (área classificada) ---------- */
hist_ex(S,K){const C=H3.C;
  {const f=boxB(28,.06,16,0x7d848b,1,-.055,-1);f.castShadow=false;const c=boxB(12,.01,8,0xb7b3aa,1,0,-1.6);c.castShadow=false;for(let x=-10;x<13;x+=2.6)boxB(1.3,.008,.12,C.white,x,0,4.6);}
  // loja, QDC e pasta da área classificada
  boxB(5,3.2,4,0xe9e1cf,-8.4,0,-3.4);box(1.2,2.2,.02,C.glass,-9.5,1.1,-1.39);box(1.6,1.1,.02,C.glass,-7.6,1.5,-1.39);
  plate('LOJA',1.4,.36,{bg:'#2f5d8a',fg:'#ffffff'},-8.4,2.8,-1.37);
  {const q=grp(-6.6,0,-1.38);boxB(.72,.98,.18,C.cub,0,.9,.09,q);
    for(let r=0;r<3;r++)for(let c=0;c<3;c++)box(.13,.2,.04,C.white,-.2+c*.2,1.65-r*.28,.2,q);
    plate('QDC · 220/127 V',.66,.12,{bg:'#15202b',fg:'#ffffff'},0,2.0,.19,q);K.hs(q,'qdc');}
  {const g=grp(-5.0,0,.8);boxB(.8,.04,.5,0x8a939c,0,.8,0,g);[[-.35,-.2],[-.35,.2],[.35,-.2],[.35,.2]].forEach(([x,z])=>rod([x,0,z],[x,.8,z],.015,0x5d6b78,g));}
  H3.doc(K,'docs',-5.0,1.0,.8,S.certs?['PASTA · ÁREA Ex','PT · AR · proced.','certificados Ex']:['PASTA · ÁREA Ex','PT · AR · proced.'],{rx:-1.15});
  // área classificada: ilha (sempre clicável); delimitação e placa só depois da ronda
  {const gp=grp();boxB(6,.2,1.3,C.cub,1,0,-1.6,gp);
    const z=boxB(9.4,.012,5.6,0xE3A11B,1,0,-1.6,gp,{transparent:true,opacity:S.sinal?.3:.02,depthWrite:false});z.castShadow=false;
    if(S.sinal){[[-3.7,-4.4],[5.7,-4.4],[-3.7,1.2],[5.7,1.2]].forEach(([x,zz])=>{boxB(.1,1.0,.1,C.yellow,x,0,zz,gp);box(.11,.18,.11,C.dark,x,.8,zz,gp);});
      [[[-3.7,1.2],[5.7,1.2]],[[-3.7,-4.4],[-3.7,1.2]],[[5.7,-4.4],[5.7,1.2]]].forEach(([a,b])=>rod([a[0],.85,a[1]],[b[0],.85,b[1]],.015,C.red,gp));
      boxB(.06,1.4,.06,C.dark,1,0,1.25,gp);plate(['ÁREA CLASSIFICADA','acesso restrito'],1.3,.5,{bg:'#f2c230',fg:'#15202b'},1,1.55,1.29,gp);}
    K.hs(gp,'pista');}
  // cobertura, colunas e luminárias
  boxB(10,.45,6.4,0xb03a2e,1,4.8,-1.6);box(9.8,.02,6.2,0xe9e6df,1,4.79,-1.6);
  [-3.2,5.2].forEach(x=>[-3.8,.6].forEach(z=>cyl(.18,.18,4.8,C.steel,x,2.4,z)));
  {const g=grp(-.2,4.3,-.3);rod([0,.05,0],[0,.5,0],.02,C.dark,g);
    if(S.lumComum){box(.9,.1,.5,C.white,0,0,0,g);box(.8,.03,.4,0xfffde8,0,-.065,0,g,{emissive:0xfff3c0,emissiveIntensity:.25});label('comum',0,-.4,0,g,{s:.26});}
    else{box(.9,.18,.5,C.dark,0,0,0,g);box(.7,.04,.36,0xfff3c0,0,-.11,0,g,{emissive:0xfff3c0,emissiveIntensity:.9});label('Ex',0,-.42,0,g,{s:.26});}
    K.hs(g,'lum');}
  {const g=grp(2.2,4.3,-.3);rod([0,.05,0],[0,.5,0],.02,C.dark,g);box(.9,.18,.5,C.dark,0,0,0,g);box(.7,.04,.36,0xfff3c0,0,-.11,0,g,{emissive:0xfff3c0,emissiveIntensity:.9});}
  // bombas na ilha
  const pump=(x,p)=>{const g=grp(x,.2,-1.6,p);boxB(.8,1.7,.55,C.yellow,0,0,0,g);box(.5,.3,.02,C.glass,0,1.38,.285,g);
    plate('BOMBA',.5,.12,{bg:'#15202b',fg:'#ffffff'},0,.95,.29,g);rod([.42,1.2,0],[.6,.4,.15],.025,C.black,g);box(.08,.2,.1,C.dark,.62,.35,.15,g);return g;};
  K.hs(pump(-.4),'bomba');pump(2.4);
  {const g=grp(4.6,0,.4);cyl(.11,.11,.6,C.red,0,.42,0,g);cyl(.04,.04,.08,C.dark,0,.76,0,g);K.hs(g,'ext');}
  // caminhão-tanque, mangueira de descarga e cabo de aterramento
  {const g=grp(-.8,0,0);boxB(6.2,.3,2.1,C.dark,9.8,.5,-.4,g);boxB(1.6,1.8,2.1,C.white,12.1,.8,-.4,g);box(.02,.7,1.8,C.glass,12.91,1.95,-.4,g);
    const t=cyl(1.0,1.0,4.4,C.alu,9.2,1.85,-.4,g,{metalness:.5,roughness:.35});t.rotation.z=Math.PI/2;
    plate(['COMBUSTÍVEL','INFLAMÁVEL'],1.5,.4,{bg:'#f2c230',fg:'#15202b'},9.2,1.85,.62,g);
    [7.6,8.8,11.9].forEach(x=>[-1.45,.65].forEach(z=>{const w=cyl(.45,.45,.3,C.black,x,.45,z,g);w.rotation.x=Math.PI/2;}));
    boxB(.5,.08,.5,0x5d6b78,7.2,0,1.8,g);
    rod([7.0,.95,.5],[6.7,.5,1.2],.05,C.black,g);rod([6.7,.5,1.2],[7.2,.12,1.8],.05,C.black,g);
    if(S.terra){rod([7.4,.65,.66],[8.0,.3,1.6],.016,0x2c7a3a,g);rod([8.0,.3,1.6],[8.1,.05,2.0],.016,0x2c7a3a,g);
      cyl(.03,.03,.5,C.cu,8.1,.25,2.0,g);box(.08,.06,.08,C.cu,7.4,.65,.68,g);}
    K.hs(g,'caminhao');}
  // tampa do tanque subterrâneo e sensores de nível
  {boxB(2.4,.03,1.4,0x6b7580,8.2,0,2.6);const s=plate('TANQUE SUBTERRÂNEO',1.6,.22,{bg:'#6b7580',fg:'#ffffff'},8.2,.05,2.6);s.rotation.x=-Math.PI/2;}
  {const g=grp(9.8,0,2.2);boxB(.34,.4,.22,C.white,0,0,0,g);plate('24 Vcc',.28,.11,{bg:'#15202b',fg:'#ffffff'},0,.26,.115,g);
    rod([0,0,-.05],[-1.0,0,.2],.02,0x8a939c,g);label('sensores',0,.75,0,g,{s:.22});K.hs(g,'sensor');}
  // pessoas
  H3.man(K,'rosa',-4.4,2.4,'Rosa','eletricista',0x2f5d8a);H3.man(K,'lia',-3.4,2.4,'Lia','eletricista',0x2f5d8a);
  if(S.marcos)H3.man(K,'marcos',-2.4,2.4,'Marcos','eletricista BT',0x3e6e9e);
  H3.man(K,'vitor',1.0,.3,'Vítor','frentista',0x9a7b4f);}};


/* ===== História 1: OS 0731 na cabine primária de 13,8 kV ===== */
(()=>{
  /* ---------- objetos da cena: o que são e quais itens da NR-10 se aplicam ---------- */
  const HS={
    porta:{t:'Porta da cabine',b:'Local de serviço elétrico: uso exclusivo, proibido guardar objetos (10.12.8). Sinalização de advertência e de restrição de acesso (10.7.7).',r:['10.12.8','10.7.7']},
    docs:{t:'Quadro de documentos (PT e unifilar)',b:'A PT fica disponível no local do serviço e, no fim, é encerrada e arquivada (10.7.2.3). O projeto fica disponível aos trabalhadores autorizados e atualizado (10.4.7, 10.4.13).',r:['10.7.2.3','10.4.7','10.4.13']},
    ext:{t:'Extintor de CO₂',b:'A proteção contra incêndio segue a NR-23, citada no 10.6.6. A NR-10 de 2026 não tem item próprio sobre extintor.',r:['10.6.6','NR-23']},
    entrada:{t:'Cubículo de entrada · barramento 13,8 kV',b:'Lado da fonte: continua energizado mesmo com o 52-1 e a 89-1 abertos. Para 13,8 kV, Rr = 0,38 m e Rc = 1,38 m (Anexo II).',r:['AII','g-zr','g-zc']},
    vpis:{t:'Indicador de presença de tensão (VPIS)',b:'Os LEDs indicam tensão na saída da 89-1, mas não substituem a constatação com detector testado (10.13.1 b). [PRÁTICA: o LED pode estar queimado.]',r:['10.13.1','10.12.6.1']},
    s89:{t:'Seccionadora 89-1',b:'Seccionamento com abertura visível (10.13.1 a). O projeto especifica dispositivo com recurso para impedimento de reenergização e sinalização (10.4.1) e, se possível, de ação simultânea (10.4.2).',r:['10.13.1','10.4.1','10.4.2']},
    d52:{t:'Disjuntor 52-1',b:'Interrompe a corrente de carga; por isso abre antes da seccionadora. Dispositivo de abertura sob carga é proteção coletiva contra arco (10.6.5 c). Lâmpada vermelha = ligado, verde = desligado [PRÁTICA].',r:['10.6.5','10.13.1']},
    tr:{t:'TR-01 · ponto de trabalho',b:'Transformador de 1000 kVA, 13,8 kV/380 V. Desligado não é desenergizado: enquanto puder ser energizado por qualquer meio, valem as regras do capítulo 10.14 (10.5.2).',r:['10.5.2','10.13.1']},
    terra:{t:'Barra de terra',b:'O projeto prevê condições para o aterramento temporário (10.4.6) e define o esquema de aterramento (10.4.4).',r:['10.4.6','10.4.4']},
    qgbt:{t:'QGBT 380 V',b:'Painel com porta mantida fechada fora de intervenção e sinalização do nível de tensão, de choque e de arco (10.7.7.1).',r:['10.7.7.1']},
    ger:{t:'Gerador de emergência com QTA',b:'Fonte própria: pode energizar a instalação pelo lado de 380 V. A geração própria também não pode energizar instalações de outras organizações (10.14.5).',r:['10.14.5','10.5.2']},
    tapete:{t:'Tapete isolante',b:'Isolação no piso diante dos cubículos [PRÁTICA]. Equipamentos isolantes passam por ensaio dielétrico (10.14.4).',r:['10.14.4','10.6.2']},
    det:{t:'Detector de tensão por aproximação (MT)',b:'Adequado à tensão e à classe de isolação, com categoria compatível com surtos e aferido (10.12.6.1). Testado numa fonte conhecida antes do uso [PRÁTICA].',r:['10.12.6.1','10.13.1']},
    atr:{t:'Conjunto de aterramento temporário',b:'Grampos e cabos para aterrar e equipotencializar as fases (10.13.1 d). O ferramental isolante passa por ensaio (10.14.4).',r:['10.13.1','10.14.4']},
    cad:{t:'Cadeado pessoal',b:'Impedimento de reenergização (10.13.1 c). Só quem colocou o cadeado o retira [PRÁTICA].',r:['10.13.1','10.7.7']},
    eti:{t:'Etiqueta de impedimento',b:'Sinalização de impedimento de reenergização (10.13.1 f; 10.7.7 e).',r:['10.13.1','10.7.7']},
    ant:{t:'Anteparo isolante',b:'Protege os elementos que continuam energizados na zona controlada e os trabalhadores contra o arco (10.13.1 e). Barreira é proteção básica (10.6.2 b).',r:['10.13.1','10.6.2','AII']},
    cone:{t:'Cones e corrente',b:'Delimitação e sinalização da área de trabalho (10.13.1 g; 10.7.7 d).',r:['10.13.1','10.7.7']},
    luva:{t:'Luvas isolantes',b:'Ensaio dielétrico no menor prazo entre regulamento, fabricante e critério do PLH; sem previsão, anual (10.14.4, 10.14.4.1).',r:['10.14.4','10.14.4.1']},
    roupa:{t:'Vestimenta contra arco',b:'Escolhida pelos Quadros do Anexo IV (10.11.2). A indumentária não pode ter material condutível (10.7.8.1).',r:['10.11.2','AIV-III','10.7.8.1']},
    ana:{t:'Ana · engenheira eletricista (PLH)',b:'Qualificada em curso da área elétrica e com registro no conselho de classe: é PLH (10.8.2). ASO apto e treinamentos em dia: pode ser autorizada (10.10.2.1).',r:['10.8.2','10.10.2.1']},
    bruno:{t:'Bruno · técnico em eletrotécnica',b:'Trabalhador qualificado (10.8.1), com exame de saúde (10.7.5) e treinamentos em dia.',r:['10.8.1','10.7.5']},
    caio:{t:'Caio · capacitado em outra empresa',b:'A capacitação só vale para a organização que capacitou e nas condições do PLH responsável (10.8.3.3).',r:['10.8.3.3']},
    pintor:{t:'Pintor terceirizado',b:'Atividade não elétrica na vizinhança da zona controlada: análise de risco e instrução formal (10.14.1.2). Trabalho simultâneo ao serviço elétrico entra na análise de risco (10.7.3 f).',r:['10.14.1.2','10.7.3']},
    escada:{t:'Escada de alumínio',b:'Guardada na cabine, contraria o 10.12.8: local de serviço elétrico não serve para guardar objetos. É extensão condutora: entrar com ela na zona controlada é trabalho em proximidade (10.2.2; glossário).',r:['10.12.8','10.2.2','g-prox']},
    ferr:{t:'Ferramentas do reaperto',b:'Na reenergização, ferramentas, utensílios e equipamentos são retirados antes de remover o aterramento (10.13.2 b).',r:['10.13.2']},
    davi:{t:'Davi · mecânico de manutenção',b:'Não participa da reenergização: sai das imediações (10.13.2 c).',r:['10.13.2']}};

  /* ---------- estado do desenho ---------- */
  const S0={c52:true,c89:true,lock89:false,lockBT:false,tag:false,ground:false,barrier:false,cones:false,tools:false,
    caio:true,pintor:true,escada:true,relogio:true,qgbtOpen:true,luvaOk:false,davi:false};

  /* ---------- a história ---------- */
  const OS='<b>OS 0731 · Fábrica de Embalagens Nordeste.</b> A cabine primária recebe 13,8 kV da distribuidora, depois da medição, e alimenta o TR-01 (1000 kVA, 13,8 kV/380 V). Serviço: inspecionar e reapertar as conexões das buchas do TR-01. Equipe própria.';
  const ST=[
    {f:'F1 · Briefing',ty:'q',n:OS,q:'Como esta atividade se enquadra na NR-10?',
      o:['SEC em média tensão: o PIE é obrigatório e a equipe faz o Básico e o Complementar de Média e Alta Tensão - SEC','SEP em alta tensão: Básico e Complementar do SEP','SEC em baixa tensão: só o Básico, e PIE pela carga instalada','Fora da NR-10, porque o serviço é no transformador desligado','SEP em média tensão, porque a cabine recebe energia da distribuidora'],a:0,
      x:'Depois da medição a instalação é do consumidor (SEC): pelo glossário, o SEP vai até a medição, inclusive. 13,8 kV é MT (acima de 1.000 V até 36.200 V CA). Quem realiza atividades em MT mantém o PIE (10.15.6), e o trabalhador faz o Básico (10.9.4) e o Complementar MT/AT - SEC (10.9.6).',
      r:['g-sep','g-mt','10.15.6','10.9.6'],foco:['entrada','tr']},
    {f:'F2 · Planejamento',ty:'q',n:'A fábrica nunca fez esse serviço e não tem procedimento escrito para ele. O documento do serviço vai ficar no quadro ao lado da porta.',q:'O que libera a execução?',
      o:['Permissão de trabalho, precedida de análise de risco e aprovada por trabalhador autorizado','Procedimento de trabalho aprovado por PLH','Ordem verbal do supervisor','Só a análise de risco, sem outro documento','O projeto elétrico da cabine'],a:0,
      x:'Serviço não rotineiro exige PT, precedida de análise de riscos e aprovada por trabalhador autorizado (10.7.2). Procedimento aprovado por PLH é para atividades rotineiras (10.7.1, 10.7.1.1). A PT fica disponível no local do serviço (10.7.2.3).',
      r:['10.7.2','10.7.1','g-rot','10.7.2.3'],foco:['docs']},
    {f:'F2 · Equipe',ty:'find',n:'Três eletricistas se apresentam. <b>Ana:</b> engenheira eletricista com registro no CREA, ASO apto, Básico e Complementar MT/AT - SEC em dia. <b>Bruno:</b> técnico em eletrotécnica, ASO apto, mesmos treinamentos. <b>Caio:</b> era trabalhador-capacitado na empresa onde trabalhava antes; foi contratado ontem.',
      p:'Clique em quem não pode compor a equipe.',alvo:['caio'],
      ok:{t:'Caio fica fora',b:'A capacitação só vale para a organização que capacitou o trabalhador e nas condições estabelecidas pelo PLH responsável (10.8.3.3). Para ser autorizado aqui, Caio precisa de anuência formal da organização, ASO apto e treinamento com aproveitamento (10.10.2.1).',r:['10.8.3.3','10.10.2.1']},
      fx:S=>{S.caio=false;}},
    {f:'F2 · Supervisão',ty:'q',n:'A equipe ficou com duas pessoas: Ana e Bruno.',q:'O que a organização precisa definir?',
      o:['Indicar um dos dois para supervisionar e conduzir os trabalhos','Nada: equipe de duas pessoas dispensa supervisão','Contratar um técnico de segurança para ficar no local','Pôr um terceiro eletricista só para observar','Deixar cada um supervisionar o próprio trabalho'],a:0,
      x:'Em serviço feito em equipe, a organização indica um trabalhador entre os membros para supervisionar e conduzir os trabalhos (10.7.6). Quem supervisiona também é autorizado (10.10.2 c).',
      r:['10.7.6','10.10.2'],foco:['ana','bruno']},
    {f:'F3 · Almoxarifado',ty:'find',n:'No carrinho: detector de tensão para MT, conjunto de aterramento temporário, cadeado, etiqueta, anteparo isolante, cones e corrente, luvas isolantes e vestimenta contra arco. A etiqueta das luvas mostra o último ensaio dielétrico há 14 meses. O fabricante e o PLH não definiram outro prazo.',
      p:'Clique no item que não pode ser usado hoje.',alvo:['luva'],
      ok:{t:'Luvas com ensaio vencido',b:'O 10.14.4 manda submeter a ensaio dielétrico o que tem isolação para trabalho em MT/AT (alínea a) e as luvas e mangas isolantes de BT (alínea b). Sem prazo menor previsto, o ensaio é anual (10.14.4.1): 14 meses é ensaio vencido. Não ensaiar EPI isolante é uma das condições de grave e iminente risco (10.16.1 d). O almoxarifado troca as luvas.',r:['10.14.4','10.14.4.1','10.16.1']},
      fx:S=>{S.luvaOk=true;}},
    {f:'F3 · Vestimenta',ty:'q',n:'O painel de 13,8 kV é aparelhagem de manobra revestida de metal. O estudo da cabine indica corrente de falha disponível de 20 kA, tempo de eliminação de 0,20 s e distância de trabalho de 910 mm.',q:'Qual vestimenta mínima o Anexo IV exige para manobrar a 89-1?',
      o:['Categoria 4: no mínimo 40 cal/cm²','Categoria 2: no mínimo 8 cal/cm²','Categoria 3: no mínimo 25 cal/cm²','Categoria 1: no mínimo 4 cal/cm²','Nenhuma: o Anexo IV não vale para média tensão'],a:0,
      x:'A linha "aparelhagem de manobra revestida de metal, 1 kV a 15 kV" do Quadro I vale até 35 kA, até 0,24 s e a partir de 910 mm: Categoria 4. O Quadro III dá no mínimo 40 cal/cm² para a Categoria 4. Os quatro parâmetros valem em conjunto (10.11.2.1).',
      r:['AIV-I','AIV-III','10.11.2.1'],foco:['roupa','s89']},
    {f:'F4 · Chegada',ty:'hunt',n:'A equipe entra na cabine. Antes de tocar em qualquer equipamento, olhe o ambiente.',p:'Encontre as 4 situações que contrariam a NR-10.',
      alvos:{qgbt:{t:'Porta do QGBT aberta',b:'Sem intervenção em curso, a porta do painel fica permanentemente fechada, com sinalização do nível de tensão e de advertência (10.7.7.1). A equipe fecha a porta.',r:['10.7.7.1'],fx:S=>{S.qgbtOpen=false;}},
        bruno:{t:'Bruno está de relógio',b:'É vedado o uso de adornos pessoais nos serviços em eletricidade (10.7.8). Bruno guarda o relógio fora da cabine.',r:['10.7.8'],fx:S=>{S.relogio=false;}},
        escada:{t:'Escada de alumínio encostada no cubículo',b:'A cabine é local de serviço elétrico: é proibido usá-la para guardar qualquer objeto (10.12.8). Além disso, a escada é extensão condutora: quem a manuseia pode entrar com ela na zona controlada, e isso é trabalho em proximidade (10.2.2; glossário). A escada sai da cabine.',r:['10.12.8','10.2.2','g-prox'],fx:S=>{S.escada=false;}},
        pintor:{t:'Pintor trabalhando ao lado dos cubículos',b:'O pintor não consta na PT nem na análise de risco deste serviço: é trabalho simultâneo não previsto (10.7.3 f), exatamente o que a avaliação prévia precisa encontrar (10.7.4.1 a). Para atividade não elétrica na vizinhança da zona controlada, a organização faz análise de risco e dá instrução formal (10.14.1.2). Ele sai da cabine até isso ser resolvido.',r:['10.7.3','10.7.4.1','10.14.1.2','g-zc'],fx:S=>{S.pintor=false;}}}},
    {f:'F5 · Avaliação prévia',ty:'q',n:'Na avaliação prévia, Bruno testa o detector numa fonte conhecida. O LED não acende.',q:'O que a equipe faz?',
      o:['Não inicia a operação e comunica o superior hierárquico','Usa assim mesmo: a seccionadora vai ficar visivelmente aberta','Começa e troca o detector depois','Usa o VPIS do cubículo no lugar do detector','Mede com um multímetro de bolso'],a:0,
      x:'Anormalidade que afeta a segurança, constatada na avaliação prévia: a operação não é iniciada e o superior é comunicado (10.7.4.2). O instrumento precisa ser adequado à tensão e à classe de isolação (10.12.6.1). Sem detector confiável não há como cumprir a constatação de ausência de tensão do 10.13.1. Um detector reserva, testado, chega do almoxarifado.',
      r:['10.7.4','10.7.4.2','10.12.6.1'],foco:['det','vpis']},
    {f:'F6 · Desenergização',ty:'seq',ref:'10.13.1',n:'Detector reserva testado. Agora a desenergização, alínea por alínea do 10.13.1, nos objetos da cena.',
      p:'Clique nos objetos na ordem da sequência. Erros de ordem mostram o mecanismo do acidente.',
      acts:[{hs:['d52'],k:'a',t:'Abrir o disjuntor 52-1',b:'O disjuntor interrompe a corrente de carga. A lâmpada passa de vermelha para verde.',fx:S=>{S.c52=false;}},
        {hs:['s89'],k:'a',t:'Abrir a seccionadora 89-1',b:'Abertura visível, já sem carga.',fx:S=>{S.c89=false;}},
        {hs:['tr','det'],k:'b',t:'Constatar a ausência de tensão nas buchas do TR-01',b:'Detector testado, fase a fase: sem tensão no ponto de trabalho.'},
        {hs:['cad','s89'],k:'c',t:'Travar a 89-1 com cadeado pessoal',b:'Impedimento de reenergização. Só quem colocou o cadeado o retira.',fx:S=>{S.lock89=true;}},
        {hs:['det','terra'],k:'d',t:'Constatar de novo, no ponto onde o aterramento será ligado',b:'A constatação se repete antes do aterramento.'},
        {hs:['atr'],k:'d',t:'Instalar o aterramento temporário com equipotencialização',b:'Grampos primeiro na barra de terra, depois em cada fase, com as três interligadas.',fx:S=>{S.ground=true;}},
        {hs:['ant','entrada'],k:'e',t:'Instalar o anteparo isolante sobre as partes ainda energizadas',b:'O barramento de entrada continua energizado dentro da zona controlada. A alínea e inclui a proteção contra os efeitos do arco (vestimenta Categoria 4).',fx:S=>{S.barrier=true;}},
        {hs:['eti'],k:'f',t:'Fixar a etiqueta de impedimento de reenergização',b:'Quem bloqueou, por quê e desde quando.',fx:S=>{S.tag=true;}},
        {hs:['cone'],k:'g',t:'Delimitar e sinalizar a área de trabalho',b:'Cones e corrente fecham a área.',fx:S=>{S.cones=true;S.tools=true;}}],
      esp:(h,cur,S)=>{
        if(h==='s89'&&S.c52)return {t:'Arco na seccionadora',b:'Abrir a seccionadora com o disjuntor fechado forma arco nos contatos: ela não é dispositivo de abertura sob carga. Dispositivos de abertura sob carga aparecem no 10.6.5 c como proteção contra arco.',r:['10.6.5','10.13.1']};
        if(h==='atr'&&!S.ground&&cur.hs[0]!=='atr')return {t:'Aterramento sem constatação',b:'Se o circuito estiver energizado, o grampo fecha um curto franco com arco na frente de quem o segura. A alínea d manda constatar a ausência de tensão para instalar o aterramento.',r:['10.13.1']};
        if((h==='cad')&&cur.k==='b')return {t:'Impedimento antes da constatação',b:'No 10.13.1, a constatação da ausência de tensão (alínea b) vem antes do impedimento de reenergização (alínea c).',r:['10.13.1']};
        return null;}},
    {f:'F7 · Evento',ty:'find',n:'Bruno vai começar o reaperto quando Ana lembra: o QGBT tem um gerador de emergência com QTA. Se faltar energia na fábrica, o gerador parte sozinho e alimenta o barramento de 380 V, ligado ao secundário do TR-01.',
      p:'Clique onde a equipe precisa agir antes de tocar nas buchas.',alvo:['qgbt','ger'],
      ok:{t:'Bloquear também o lado de 380 V',b:'Alimentado pelo lado de 380 V, o transformador eleva a tensão de volta a 13,8 kV nas buchas de MT (backfeed). Enquanto a instalação puder ser energizada por qualquer meio, valem as regras do capítulo 10.14 (10.5.2), e a organização garante o estado desenergizado durante todo o serviço (10.13.3). Como o 10.13.1 só considera desenergizada a instalação liberada pela sequência, e a sequência feita até aqui seccionou só a fonte de 13,8 kV, a equipe abre, bloqueia e sinaliza também a chave do QGBT que alimenta o TR-01. Essa fonte devia ter aparecido antes, na análise de risco e na avaliação prévia (10.7.3, 10.7.4.1 a). [INTERPRETAÇÃO apoiada no 10.5.2 e no 10.13.1: a norma não usa a expressão "todas as fontes".]',r:['10.5.2','10.13.3','10.13.1','10.7.4.1']},
      fx:S=>{S.lockBT=true;}},
    {f:'F7 · Troca de turno',ty:'q',n:'O reaperto atrasou. O serviço passa para o turno da noite, com dois eletricistas que não estavam na equipe.',q:'A PT do turno da manhã continua valendo?',
      o:['Não: a PT é restrita ao turno e, com a equipe toda trocada, não pode ser revalidada','Sim, até o fim do serviço','Sim, se o supervisor da noite assinar embaixo','Sim, porque a PT vale 24 horas','Não existe PT em serviço de manutenção'],a:0,
      x:'A PT vale pela duração da atividade, restrita ao turno, e só pode ser revalidada se não mudarem as condições estabelecidas nem toda a equipe (10.7.2.2). A nova PT lista todos os envolvidos e suas autorizações (10.7.2.1 c).',
      r:['10.7.2.2','10.7.2.1'],foco:['docs']},
    {f:'F8 · Reenergização',ty:'seq',ref:'10.13.2',n:'Serviço feito. Davi, da manutenção mecânica, entrou para olhar o TR-01. Agora a volta, alínea por alínea do 10.13.2.',
      p:'Clique nos objetos na ordem da sequência de reenergização.',pre:S=>{S.davi=true;},
      acts:[{hs:['cone'],k:'a',t:'Retirar cones e corrente',b:'A reenergização começa pela retirada dos obstáculos de delimitação e sinalização.',fx:S=>{S.cones=false;}},
        {hs:['ferr'],k:'b',t:'Recolher ferramentas, utensílios e equipamentos',b:'Nada fica dentro do cubículo ou sobre o transformador.',fx:S=>{S.tools=false;}},
        {hs:['davi'],k:'c',t:'Retirar das imediações quem não participa da reenergização',b:'Davi sai da cabine.',fx:S=>{S.davi=false;}},
        {hs:['atr','terra'],k:'d',t:'Remover o aterramento temporário e a equipotencialização',b:'Primeiro as fases, por último a barra de terra.',fx:S=>{S.ground=false;}},
        {hs:['ant','entrada'],k:'e',t:'Retirar o anteparo isolante',b:'As proteções dos elementos energizados saem só agora.',fx:S=>{S.barrier=false;}},
        {hs:['eti'],k:'f',t:'Remover a etiqueta de impedimento',b:'',fx:S=>{S.tag=false;}},
        {hs:['cad'],k:'g',t:'Retirar o cadeado da 89-1',b:'Pelo mesmo trabalhador que o colocou.',fx:S=>{S.lock89=false;}},
        {hs:['qgbt','ger'],k:'g',t:'Desbloquear o lado de 380 V',b:'O bloqueio do QGBT também sai.',fx:S=>{S.lockBT=false;}},
        {hs:['s89'],k:'g',t:'Fechar a seccionadora 89-1',b:'Fecha sem carga, com o disjuntor ainda aberto.',fx:S=>{S.c89=true;}},
        {hs:['d52'],k:'g',t:'Fechar o disjuntor 52-1',b:'O disjuntor estabelece a corrente. Instalação reenergizada.',fx:S=>{S.c52=true;}}],
      esp:(h,cur,S)=>{
        if((h==='s89'||h==='d52')&&S.ground)return {t:'Religamento com aterramento instalado',b:'Fechar o circuito com o aterramento temporário ligado põe a fonte em curto franco. Não seguir a sequência de reenergização é condição de grave e iminente risco (10.16.1 b).',r:['10.13.2','10.16.1'],gir:1};
        if(h==='d52'&&!S.c52&&!S.c89&&cur.hs[0]!=='d52')return {t:'Disjuntor antes da seccionadora',b:'A seccionadora fecha primeiro, sem carga; depois o disjuntor estabelece a corrente.',r:['10.13.2','10.6.5']};
        if((h==='atr'||h==='terra')&&S.ground&&cur.k<'d')return {t:'Aterramento retirado cedo',b:'Na sequência do 10.13.2, o aterramento sai só na alínea d, depois de retirar delimitação, ferramentas e pessoas não envolvidas.',r:['10.13.2']};
        return null;}},
    {f:'Encerramento',ty:'q',n:'Instalação reenergizada. Falta fechar a papelada.',q:'O que acontece com a permissão de trabalho?',
      o:['É encerrada e arquivada de forma a permitir a rastreabilidade','É descartada, porque o serviço terminou','Fica com o executante, como comprovante pessoal','É reutilizada no próximo serviço parecido','É entregue à distribuidora'],a:0,
      x:'A PT fica disponível no local durante o serviço e, ao final, é encerrada e arquivada de forma a permitir a rastreabilidade (10.7.2.3). Se a instalação mudou, o projeto é atualizado para corresponder ao executado (10.4.13).',
      r:['10.7.2.3','10.4.13'],foco:['docs']},
    {f:'Fiscalização',ty:'q',n:'Semanas depois, um auditor-fiscal do trabalho visita a fábrica e pergunta o que aconteceria se a equipe tivesse pulado a constatação de ausência de tensão.',q:'Como a NR-10 trata esse desvio?',
      o:['É condição de grave e iminente risco: permite embargo ou interdição sem a metodologia da NR-3','É só uma não conformidade, corrigida no próximo serviço','Gera multa, mas nunca interdição','Só conta se houver acidente','Depende de a fábrica ter PIE'],a:0,
      x:'O 10.16.1 b inclui a não adoção dos procedimentos de desenergização (10.13.1) ou de reenergização (10.13.2), ou das alternativas permitidas pelo 10.13.4. Os documentos do serviço ficam no PIE, que esta fábrica mantém por atuar em média tensão (10.15.6).',
      r:['10.16.1','10.13.4','10.15.6'],foco:['docs']}];
  const {H}=makeStory({id:'historia',build3d:H3S.historia,cam:H3S.cams.historia,store:'hist',name:'Uma OS na cabine primária',short:'Cabine 13,8 kV',scene:'Cabine primária 13,8 kV',
    aria:'Cabine primária 13,8 kV desenhada, com objetos clicáveis',explore:'Comece pela porta, pelos cubículos ou pelo carrinho de ferramentas.',
    primer:{logic:'A história percorre uma ordem de serviço real, do enquadramento à fiscalização, dentro de uma cabine primária em 3D. Cada decisão é tomada no ambiente: quem entra na equipe, que EPI serve, o que está errado na sala, em que ordem se mexe em cada dispositivo. A cena muda a cada ação, e cada objeto mostra os itens da NR-10 que valem para ele.',
      links:[['desenergizado','A sequência das fases F6 e F8 é a do 10.13.',['10.13.1','10.13.2']],['pessoas','A escolha da equipe usa qualificação, capacitação e autorização.',['10.8.3.3','10.10.2.1']],['individual','A vestimenta sai do Anexo IV.',['AIV-I']],['treino','As decisões da história entram no simulado e na revisão.',['10.7.2']]]},
    brief:'Uma ordem de serviço contada passo a passo na cabine em 3D. Você decide, clica nos objetos e vê quais itens da NR-10 se aplicam a cada um.',
    base:['10.7.2','10.13.1','10.13.2','10.16.1','AIV-I'],HS,S0,ST,
    draw(S,K){const {tx,rc,hs,lock,person,H}=K;const o=[];
    o.push(rc(0,0,1000,430,'sc-wall'),rc(0,430,1000,210,'sc-floor'),`<line x1="0" y1="430" x2="1000" y2="430" class="sc-edge"/>`);
    // porta
    o.push(hs('porta',[15,140,80,290],rc(15,140,80,290,'sc-door',3)+rc(26,175,58,44,'sc-warnplate',3)+tx(55,193,'PERIGO','sc-plate','middle')+tx(55,208,'13,8 kV','sc-plate2','middle')+`<circle cx="84" cy="300" r="4" class="sc-dark"/>`+tx(55,128,'PORTA','sc-lab','middle')));
    // extintor e documentos
    o.push(hs('ext',[104,300,22,70],rc(104,312,22,58,'sc-red',6)+rc(109,300,12,14,'sc-dark',2)+tx(115,388,'CO₂','sc-tiny','middle')));
    o.push(hs('docs',[134,150,64,92],rc(134,150,64,92,'sc-paper',3)+tx(166,172,'PT','sc-lab','middle')+`<line x1="144" y1="186" x2="188" y2="186" class="sc-rule"/><line x1="144" y1="198" x2="188" y2="198" class="sc-rule"/><line x1="144" y1="210" x2="178" y2="210" class="sc-rule"/>`+tx(166,232,'unifilar','sc-tiny','middle')));
    // cubículo de entrada
    o.push(hs('entrada',[210,110,140,320],rc(210,110,140,320,'sc-cub',4)+[0,1,2].map(i=>rc(228+i*38,126,24,64,'sc-bus',2)).join('')+tx(280,214,'ENTRADA','sc-lab','middle')+tx(280,232,'13,8 kV','sc-txt','middle')+rc(240,250,80,36,'sc-warnplate',3)+tx(280,273,'PERIGO','sc-plate','middle')));
    // cubículo 89/52
    o.push(rc(360,110,170,320,'sc-cub',4));
    const blades=[0,1,2].map(i=>{const x=392+i*45;return `<circle cx="${x}" cy="138" r="5" class="sc-dark"/><circle cx="${x}" cy="222" r="5" class="sc-dark"/>`+(S.c89?`<line x1="${x}" y1="138" x2="${x}" y2="222" class="sc-blade"/>`:`<line x1="${x}" y1="222" x2="${x+30}" y2="160" class="sc-blade"/>`);}).join('');
    o.push(hs('s89',[372,124,148,110],blades+tx(445,248,'89-1 · '+(S.c89?'FECHADA':'ABERTA'),'sc-txt','middle')+(S.lock89?lock(492,190):'')+(S.tag?rc(470,212,28,18,'sc-tag',2)+tx(484,225,'NÃO','sc-tiny2','middle'):'')));
    o.push(hs('d52',[378,262,134,96],rc(378,262,134,96,'sc-panel',3)+`<circle cx="410" cy="300" r="13" class="${S.c52?'sc-red':'sc-green'}"/>`+tx(410,305,S.c52?'L':'D','sc-lampt','middle')+tx(468,296,'52-1','sc-lab','middle')+tx(468,314,S.c52?'LIGADO':'DESLIGADO','sc-tiny','middle')+rc(436,330,64,14,'sc-dark',2)));
    const vOn=S.c52&&S.c89;
    o.push(hs('vpis',[378,372,90,34],rc(378,372,90,34,'sc-panel',3)+[0,1,2].map(i=>`<circle cx="${396+i*26}" cy="389" r="7" class="${vOn?'sc-ledon':'sc-ledoff'}"/>`).join('')+tx(482,393,'VPIS','sc-tiny')));
    // cubículo do TR
    o.push(hs('tr',[540,110,170,320],rc(540,110,170,320,'sc-cub',4)+rc(560,210,130,150,'sc-tr',4)+[0,1,2,3,4,5].map(i=>rc(566+i*21,222,8,126,'sc-fin',2)).join('')+[0,1,2].map(i=>rc(580+i*38,182,14,30,'sc-bushing',4)).join('')+tx(625,140,'TR-01','sc-lab','middle')+tx(625,158,'1000 kVA','sc-txt','middle')+tx(625,174,'13,8 kV / 380 V','sc-tiny','middle')));
    if(S.tools)o.push(hs('ferr',[600,366,60,26],rc(600,376,46,8,'sc-tool',3)+rc(640,370,8,20,'sc-tool',2)+tx(630,402,'ferramentas','sc-tiny','middle')));
    // barreira (anteparo) e aterramento
    if(S.barrier)o.push(hs('ant',[214,118,190,80],rc(214,118,190,80,'sc-barrier',4)+tx(309,164,'ANTEPARO','sc-lab','middle')));
    o.push(hs('terra',[210,410,500,14],rc(210,412,500,10,'sc-cu',2)+tx(718,422,'terra','sc-tiny')));
    if(S.ground)o.push(`<g class="sc-gnd">${[0,1,2].map(i=>`<path d="M${587+i*38} 186 C ${560+i*38} 260, ${600+i*30} 360, ${600+i*20} 412" class="sc-gcable"/>`).join('')}</g>`);
    // escada e pintor
    if(S.escada)o.push(hs('escada',[700,240,70,330],`<line x1="712" y1="250" x2="726" y2="566" class="sc-ladder"/><line x1="742" y1="250" x2="760" y2="566" class="sc-ladder"/>`+[0,1,2,3,4,5,6].map(i=>{const t=i/7,y=280+i*42;return `<line x1="${713+t*14}" y1="${y}" x2="${744+t*16}" y2="${y}" class="sc-ladder2"/>`;}).join('')));
    if(S.pintor)o.push(person('pintor',800,'Pintor','terc.','sc-coat3',rc(822,488,8,30,'sc-brush',2)));
    if(S.davi)o.push(person('davi',800,'Davi','mec.','sc-coat3'));
    // QGBT e gerador
    o.push(hs('qgbt',[860,170,72,250],rc(860,170,72,250,'sc-cub',3)+(S.qgbtOpen?[0,1,2,3].map(i=>rc(870,190+i*50,52,30,'sc-breaker',2)).join('')+rc(932,170,14,250,'sc-doorleaf',2):rc(868,200,56,40,'sc-warnplate',3)+tx(896,224,'380 V','sc-plate','middle'))+tx(896,160,'QGBT','sc-lab','middle')+(S.lockBT?lock(887,300):'')));
    o.push(hs('ger',[946,300,50,120],rc(946,300,50,120,'sc-gen',4)+tx(971,330,'GER','sc-tiny','middle')+tx(971,344,'QTA','sc-tiny','middle')+`<circle cx="971" cy="380" r="12" class="sc-fan"/>`));
    // tapete e cones
    o.push(hs('tapete',[210,432,500,18],`<path d="M210 432 h500 l10 18 h-520z" class="sc-mat"/>`+tx(460,445,'tapete isolante','sc-tiny2','middle')));
    if(S.cones)o.push(hs('cone',[205,456,520,26],`<line x1="215" y1="468" x2="715" y2="468" class="sc-chain"/>`+[0,1,2,3,4].map(i=>`<path d="M${205+i*125} 482 l10 -24 l10 24z" class="sc-cone"/>`).join('')));
    // pessoas
    o.push(person('ana',70,'Ana','PLH','sc-coat1'));
    o.push(person('bruno',150,'Bruno','téc.','sc-coat2',H.S.relogio?`<circle cx="${150+24}" cy="${600-58}" r="5" class="sc-watch"/>`:''));
    if(S.caio)o.push(person('caio',230,'Caio','?','sc-coat2'));
    // carrinho
    o.push(rc(380,540,360,52,'sc-cart',4),`<circle cx="400" cy="604" r="10" class="sc-dark"/><circle cx="720" cy="604" r="10" class="sc-dark"/>`,tx(560,586,'CARRINHO DE FERRAMENTAS','sc-tiny2','middle'));
    const items=[['det','Detector',`${rc(-3,-40,6,40,'sc-stick',2)}${rc(-8,-50,16,12,'sc-dark',3)}<circle cx="0" cy="-44" r="3" class="sc-ledon"/>`],
      ['atr','Aterram.',H.S.ground?'':`<path d="M-12 -6 C -12 -40, 12 -40, 12 -6" class="sc-gcable"/>${rc(-14,-10,8,8,'sc-cu',1)}${rc(6,-10,8,8,'sc-cu',1)}`],
      ['cad','Cadeado',H.S.lock89?'':lock(-9,-30)],['eti','Etiqueta',H.S.tag?'':rc(-12,-30,24,24,'sc-tag',2)],
      ['ant','Anteparo',H.S.barrier?'':rc(-14,-36,28,30,'sc-barrier',3)],['cone','Cones',H.S.cones?'':`<path d="M-9 -4 l9 -28 l9 28z" class="sc-cone"/>`],
      ['luva','Luvas',`<path d="M-10 -6 v-20 a4 4 0 0 1 8 0 v-6 a3 3 0 0 1 6 0 v6 a3 3 0 0 1 6 0 v20z" class="sc-glove"/>${rc(-8,-14,16,7,H.S.luvaOk?'sc-green':'sc-red',1)}`],
      ['roupa','Vestim.',`<path d="M-14 -34 h28 l6 10 h-6 v20 h-22 v-20 h-6z" class="sc-arc"/>${tx(0,-14,'4','sc-tiny2','middle')}`]];
    items.forEach(([id,lab,g],i)=>{const x=402+i*45;o.push(hs(id,[x-20,488,40,82],`<g transform="translate(${x} 538)">${g}</g>`+tx(x,562,lab,'sc-tiny2','middle')));});
    return o.join('');}});
  window.__hist={ST,HS,H};})();
