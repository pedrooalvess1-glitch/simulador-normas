/* ===== Camada 6 · Desenergização e reenergização ===== */
MODS.push((()=>{
  const A={open52:'Abrir o disjuntor 52-1',open89:'Abrir a seccionadora 89-1',test1:'Testar ausência de tensão no ponto de trabalho',lock:'Travar a seccionadora com cadeado pessoal',
    test2:'Testar ausência de tensão onde o aterramento será ligado',ground:'Instalar aterramento temporário e equipotencializar as fases',barrier:'Instalar anteparo isolante sobre as partes ainda energizadas',
    tag:'Fixar etiqueta de impedimento de reenergização',cones:'Delimitar e sinalizar a área com cones e corrente',
    r_cones:'Retirar cones e corrente da área',r_tools:'Recolher ferramentas, utensílios e equipamentos',r_people:'Retirar das imediações quem não participa da reenergização',
    r_ground:'Remover o aterramento temporário e a equipotencialização',r_barrier:'Retirar o anteparo das partes energizadas',r_tag:'Remover a etiqueta de impedimento',
    r_unlock:'Retirar o cadeado (desbloqueio)',r_close89:'Fechar a seccionadora 89-1',r_close52:'Fechar o disjuntor 52-1'};
  // edição única: Portaria 737/2026 — seletor desativado (sequência 'old' = 10.5.1/10.5.2 de 2004 removida)
  const SEQ={
    neu:{des:[{k:'a',t:'Seccionamento ou desligamento',acts:['open52','open89'],ord:1},{k:'b',t:'Constatação da ausência de tensão',acts:['test1']},{k:'c',t:'Impedimento de reenergização',acts:['lock']},
        {k:'d',t:'Constatação de ausência de tensão e instalação do aterramento temporário com equipotencialização',acts:['test2','ground'],ord:1},
        {k:'e',t:'Proteção dos elementos energizados na zona controlada e proteção contra arco',acts:['barrier']},{k:'f',t:'Sinalização de impedimento de reenergização',acts:['tag']},{k:'g',t:'Delimitação e sinalização da área de trabalho',acts:['cones']}],
      ren:[{k:'a',t:'Retirada dos obstáculos de delimitação e sinalização',acts:['r_cones']},{k:'b',t:'Retirada das ferramentas, utensílios e equipamentos',acts:['r_tools']},{k:'c',t:'Retirada dos trabalhadores não envolvidos',acts:['r_people']},
        {k:'d',t:'Remoção do aterramento temporário e da equipotencialização',acts:['r_ground']},{k:'e',t:'Retirada das proteções dos elementos energizados',acts:['r_barrier']},{k:'f',t:'Remoção da sinalização de impedimento',acts:['r_tag']},
        {k:'g',t:'Desbloqueio e religamento dos dispositivos de seccionamento',acts:['r_unlock','r_close89','r_close52'],ord:1}]}};
  const SHOW={des:['ground','tag','open89','test1','cones','lock','barrier','open52','test2'],ren:['r_close52','r_ground','r_tag','r_people','r_cones','r_close89','r_barrier','r_tools','r_unlock']};
  const NOTE={
    open52:['Desligamento','O disjuntor interrompe a corrente de carga. A lâmpada passou de vermelha (fechado) para verde (aberto).',['10.13.1']],
    open89:['Seccionamento visível','As lâminas abertas mostram a separação física. O trecho até o transformador está desligado, mas ainda não está desenergizado no sentido da norma.',['10.13.1','10.5.2']],
    test1:['Ausência de tensão constatada','O detector, conferido numa fonte conhecida antes e depois do uso, não acusa tensão nas buchas do transformador.',['10.13.1','10.12.6.1']],
    lock:['Impedimento de reenergização','Cadeado pessoal na alavanca da 89-1. Só quem colocou o cadeado o retira.',['10.13.1','10.4.1']],
    test2:['Segunda constatação','Nova verificação, agora no ponto exato onde os grampos serão ligados. A constatação se repete antes do aterramento (alínea d do 10.13.1).',['10.13.1']],
    ground:['Aterramento e equipotencialização','Grampos primeiro na barra de terra, depois em cada fase, com as três interligadas. Se alguém energizar por engano, a proteção atua e a equipe fica numa zona equipotencial.',['10.13.1','10.4.6']],
    barrier:['Partes energizadas protegidas','O barramento de entrada e os contatos superiores da 89-1 continuam energizados dentro da zona controlada. O anteparo isolante impede o contato. A alínea e inclui também a proteção dos trabalhadores contra os efeitos do arco elétrico.',['10.13.1','AII','10.6.5']],
    tag:['Sinalização instalada','Etiqueta na alavanca: quem bloqueou, por quê, desde quando.',['10.13.1','10.7.7']],
    cones:['Área delimitada','Cones e corrente fecham a área de trabalho (alínea g do 10.13.1).',['10.13.1','10.7.7']],
    r_cones:['Delimitação retirada','A reenergização começa por aqui (alínea a do 10.13.2).',['10.13.2']],r_tools:['Ferramentas recolhidas','Nada esquecido dentro do cubículo ou sobre o transformador.',['10.13.2']],
    r_people:['Área liberada','Só fica quem participa da reenergização.',['10.13.2']],r_ground:['Aterramento removido','Primeiro as fases, por último a barra de terra.',['10.13.2']],
    r_barrier:['Anteparo retirado','',['10.13.2']],r_tag:['Etiqueta removida','',['10.13.2']],r_unlock:['Cadeado retirado','Pelo mesmo trabalhador que o colocou.',['10.13.2']],
    r_close89:['Seccionadora fechada','Fecha sem carga, com o disjuntor ainda aberto.',['10.13.2']],r_close52:['Disjuntor fechado','O disjuntor estabelece a corrente. Instalação reenergizada.',['10.13.2']]};
  // edição única: Portaria 737/2026 — seletor desativado (modo 'old' = 2004 removido; mode fica fixo)
  let mode='neu',phase='des',idx=0,done=new Set(),errors=0,hint=false;let S,O={};
  function fresh(){S={c52:true,c89:true,lock:false,tag:false,ground:false,barrier:false,cones:false,tools:false,people:true};phase='des';idx=0;done=new Set();errors=0;hint=false;}
  fresh();
  const X=[-1.6,-1.2,-.8],XT=[1.55,2.0,2.45];
  function build(){O={line:[],mid:[],load:[]};
    boxB(13,3.6,.2,'#e2dfd7',0,0,-2.4);boxB(.2,3.6,6,'#e2dfd7',-3.9,0,.6);const sl=boxB(13,.04,6,'#a9b0b6',0,0,.6);sl.castShadow=false;
    // cubículos
    const cub=(x,w)=>{const g=grp(x,0,-1.7);boxB(w,2.7,.05,'#aeb8c0',0,0,-.53,g);boxB(.05,2.7,1.1,'#aeb8c0',-w/2,0,0,g);boxB(.05,2.7,1.1,'#aeb8c0',w/2,0,0,g);boxB(w,.05,1.1,'#aeb8c0',0,2.65,0,g);
      boxB(w,1.35,.04,'#b9c2c9',0,0,.53,g);const f=box(w-.06,1.2,.02,'#8e979e',0,2.0,.54,g,{transparent:true,opacity:.18,wireframe:false});f.castShadow=false;return g;};
    const c1=cub(-2.8,1.2);const c2=cub(-1.2,1.4);
    plate(['ENTRADA 13,8 kV'],.9,.16,{bg:'#20313f',fg:'#fff'},0,1.2,.565,c1);plate(['PERIGO','ALTA TENSÃO'],.5,.32,{bg:'#f2c200',fg:'#111',border:'#111'},0,.7,.565,c1);
    plate(['89-1 · 52-1'],.8,.16,{bg:'#20313f',fg:'#fff'},0,1.2,.565,c2);
    hot(c1,'c1','Cubículo de entrada (barramento energizado)');
    // barramento, cabos de chegada (lado da fonte: sempre energizado)
    [-2.0,-1.8,-1.6].forEach((z,i)=>{const y=2.45;O.line.push(rod([-3.3,y,z],[X[i],y,z],.025,'#c27a3a',null,{metalness:.6,roughness:.35}));
      O.line.push(rod([X[i],y,z],[X[i],2.3,-1.5],.022,'#c27a3a',null,{metalness:.6}));O.line.push(box(.07,.06,.09,'#c27a3a',X[i],2.3,-1.5,null,{metalness:.6}));
      rod([-3.0+i*.2,3.6,-2.1],[-3.0+i*.2,2.45,z],.03,'#1d1d1d');});
    // seccionadora: lâminas articuladas embaixo
    O.blades=[];X.forEach(x=>{const piv=grp(x,1.62,-1.5);const b=box(.035,.68,.07,'#d9d9d9',0,.34,0,piv,{metalness:.7,roughness:.25});O.mid.push(b);piv.rotation.x=S.c89?0:1.1;O.blades.push(piv);
      O.mid.push(box(.07,.06,.09,'#c27a3a',x,1.6,-1.5,null,{metalness:.6}));O.mid.push(rod([x,1.58,-1.5],[x,1.38,-1.6],.02,'#c27a3a',null,{metalness:.6}));});
    // alavanca da 89-1
    O.lever=grp(-.58,1.9,-1.14);box(.08,.08,.06,'#333',0,0,0,O.lever);O.arm=box(.04,.36,.04,'#c0392b',0,-.16,.04,O.lever);O.lever.rotation.z=S.c89?0:-1.2;
    hot(O.lever,'sc','Seccionadora 89-1 (alavanca)');
    O.lock=grp(-.58,1.72,-1.08);box(.09,.08,.04,'#c0392b',0,0,0,O.lock);addMesh(new THREE.TorusGeometry(.03,.008,6,12,Math.PI),M('#9aa1a6',{metalness:.8}),0,.04,0,O.lock);O.lock.visible=S.lock;
    O.tag=plate(['NÃO OPERE','EQUIPE EM','SERVIÇO'],.16,.22,{bg:'#c0392b',fg:'#fff'},-.58,1.52,-1.06,null);O.tag.visible=S.tag;
    // disjuntor 52-1 (porta inferior)
    const dj=grp(-1.2,0,-1.14);box(.9,.6,.03,'#59626a',0,.95,0,dj);O.lamp=sph(.045,S.c52?'#d22':'#2b2',-.28,1.1,.03,dj,{emissive:S.c52?0xdd2222:0x22bb44,emissiveIntensity:.8});
    O.handle=box(.16,.06,.05,'#e3a11b',.2,.92,.04,dj);O.handle.rotation.z=S.c52?0:.9;plate(['52-1'],.24,.1,{bg:'#111',fg:'#fff'},0,1.17,.02,dj);
    hot(dj,'dj','Disjuntor 52-1');
    // cabos até o transformador
    X.forEach((x,i)=>{rod([x,.5,-1.6],[x,.06,-1.6],.03,'#1d1d1d');rod([x,.06,-1.6],[XT[i],.06,-1.6],.03,'#1d1d1d');rod([XT[i],.06,-1.6],[XT[i],1.75,-1.75],.03,'#1d1d1d');});
    // transformador
    const tr=grp(2.0,0,-1.3);boxB(1.6,1.5,1.0,'#5d6d79',0,0,0,tr);plate(['TR-01','1000 kVA'],.5,.26,{bg:'#20313f',fg:'#fff'},0,1.0,.51,tr);
    XT.forEach((x,i)=>{cyl(.06,.08,.38,'#d8dde1',x-2.0,1.69,0,tr);O.load.push(sph(.05,'#c27a3a',x-2.0,1.92,0,tr,{metalness:.6}));});
    hot(tr,'tr','TR-01 · ponto de trabalho',{dy:.5});
    // barra de terra
    box(6.6,.05,.03,'#b87333',-.3,.35,-2.27,null,{metalness:.6});for(let i=0;i<8;i++)box(.04,.08,.04,'#b87333',-3.2+i*.8,.35,-2.24);
    // aterramento temporário instalado
    O.gnd=grp(0,0,0);XT.forEach(x=>{rod([x,1.92,-1.3],[x,.36,-2.22],.018,'#3f9d3f',O.gnd);box(.07,.07,.07,'#888',x,1.95,-1.3,O.gnd);});rod([XT[0],1.95,-1.3],[XT[2],1.95,-1.3],.016,'#3f9d3f',O.gnd);
    O.gnd.visible=S.ground;hot(O.gnd,'gnd','Aterramento temporário instalado',{noPin:true});
    // anteparo
    O.bar=box(2.7,.6,.03,'#e67e22',-2.05,2.35,-1.08,null,{transparent:true,opacity:.6});O.bar.visible=S.barrier;hot(O.bar,'bar','Anteparo isolante',{noPin:true});
    // cones e corrente
    O.cones=grp(0,0,0);[[.9,.15],[2.0,.35],[3.1,.15]].forEach(([x,z])=>{cyl(.02,.17,.5,'#e8590c',x,.25,z,O.cones);box(.36,.03,.36,'#e8590c',x,.015,z,O.cones);});
    line([[.9,.45,.15],[2.0,.45,.35],[3.1,.45,.15]],0xd4a017,O.cones);line([[.9,.45,.15],[.9,.45,-2.2]],0xd4a017,O.cones);line([[3.1,.45,.15],[3.1,.45,-2.2]],0xd4a017,O.cones);
    O.cones.visible=S.cones;hot(O.cones,'conesOn','Delimitação da área',{noPin:true});
    // ferramentas do serviço e pessoa não envolvida
    O.tools=grp(2.9,0,-.45);boxB(.5,.22,.25,'#b5322b',0,0,0,O.tools);box(.3,.03,.03,'#333',0,.27,0,O.tools);O.tools.visible=S.tools;hot(O.tools,'tools','Caixa de ferramentas do serviço',{noPin:true});
    O.vis=person({x:4.5,z:.9,helmet:'#2e6db4',shirt:'#8a8a8a',pants:'#555'});O.vis.g.rotation.y=-Math.PI/2;O.vis.g.visible=S.people;hot(O.vis.g,'people','Visitante da manutenção predial',{noPin:true});
    // trabalhador
    const w=person({x:1.25,z:.9,shirt:'#1d3a5c',pants:'#1a3049'});w.g.rotation.y=Math.PI;
    // carrinho de ferramentas
    const ca=grp(-.6,0,1.5);boxB(1.8,.05,.7,'#4b5965',0,.8,0,ca);boxB(1.8,.05,.7,'#4b5965',0,.25,0,ca);[[-.85,-.3],[.85,-.3],[-.85,.3],[.85,.3]].forEach(([x,z])=>boxB(.04,.85,.04,'#333',x,0,z,ca));
    hot(ca,'cart','Carrinho de ferramentas',{dy:.6});
    O.det=grp(-.55,.9,1.4);const st=cyl(.018,.018,1.1,'#f2c200',0,0,0,O.det);st.rotation.z=Math.PI/2;O.detLamp=sph(.04,'#444',.58,0,0,O.det,{emissive:0,emissiveIntensity:1});
    O.det.userData.home=O.det.position.clone();hot(O.det,'det','Detector de tensão (bastão)',{noPin:true});
    const at=grp(-.15,.9,1.65);const tor=addMesh(new THREE.TorusGeometry(.13,.025,8,20),M('#3f9d3f'),0,.03,0,at);tor.rotation.x=Math.PI/2;box(.08,.08,.08,'#888',.15,.05,0,at);at.visible=!S.ground;O.atCart=at;hot(at,'atr','Conjunto de aterramento temporário',{noPin:true});
    const cd=grp(.2,.9,1.3);box(.09,.08,.04,'#c0392b',0,.04,0,cd);cd.visible=!S.lock;O.cadCart=cd;hot(cd,'cad','Cadeado pessoal',{noPin:true});
    const et=grp(.45,.9,1.3);const e1=box(.12,.01,.17,'#c0392b',0,.01,0,et);et.visible=!S.tag;O.etCart=et;hot(et,'eti','Etiqueta de impedimento',{noPin:true});
    const an=grp(.0,.9,1.75);box(.6,.02,.35,'#e67e22',0,.01,0,an);an.visible=!S.barrier;O.anCart=an;hot(an,'ant','Anteparo isolante',{noPin:true});
    const co=grp(.65,.9,1.65);cyl(.02,.13,.36,'#e8590c',0,.18,0,co);co.visible=!S.cones;O.coCart=co;hot(co,'con','Cones e corrente',{noPin:true});
    G.tick=t=>{const k=.35+.3*Math.sin(t*4);const mid=S.c89,load=S.c89&&S.c52&&!S.ground;
      O.line.forEach(m=>setEm(m,0xff8a00,k));O.mid.forEach(m=>setEm(m,mid?0xff8a00:0,mid?k:1));O.load.forEach(m=>setEm(m,load?0xff8a00:0,load?k:1));};
  }
  function apply(a){const T=(fn,d)=>tween(d||520,fn);
    if(a==='open52'||a==='r_close52'){S.c52=a==='r_close52';O.lamp.material.color.set(S.c52?'#d22':'#2b2');setEm(O.lamp,S.c52?0xdd2222:0x22bb44,.8);const h0=O.handle.rotation.z,h1=S.c52?0:.9;T(k=>O.handle.rotation.z=h0+(h1-h0)*k);}
    if(a==='open89'||a==='r_close89'){S.c89=a==='r_close89';const r0=O.blades[0].rotation.x,r1=S.c89?0:1.1,l0=O.lever.rotation.z,l1=S.c89?0:-1.2;T(k=>{O.blades.forEach(b=>b.rotation.x=r0+(r1-r0)*k);O.lever.rotation.z=l0+(l1-l0)*k;},800);}
    if(a==='lock'||a==='r_unlock'){S.lock=a==='lock';O.lock.visible=S.lock;O.cadCart.visible=!S.lock;}
    if(a==='tag'||a==='r_tag'){S.tag=a==='tag';O.tag.visible=S.tag;O.etCart.visible=!S.tag;}
    if(a==='ground'||a==='r_ground'){S.ground=a==='ground';O.gnd.visible=S.ground;O.atCart.visible=!S.ground;}
    if(a==='barrier'||a==='r_barrier'){S.barrier=a==='barrier';O.bar.visible=S.barrier;O.anCart.visible=!S.barrier;}
    if(a==='cones'||a==='r_cones'){S.cones=a==='cones';O.cones.visible=S.cones;O.coCart.visible=!S.cones;}
    if(a==='r_tools'){S.tools=false;O.tools.visible=false;}
    if(a==='r_people'){S.people=false;O.vis.g.visible=false;}
    if(a==='test1'||a==='test2'){const d=O.det,h=d.userData.home.clone(),tg=new THREE.Vector3(2.0,2.15,-.75);const live=S.c89&&S.c52;
      T(k=>{d.position.lerpVectors(h,tg,k);d.rotation.z=k*.9;},600);setTimeout(()=>{setEm(O.detLamp,live?0xff2222:0x22cc44,1.2);O.detLamp.material.color.set(live?'#f22':'#2c4');},620);
      setTimeout(()=>{setEm(O.detLamp,0,1);O.detLamp.material.color.set('#444');T(k=>{d.position.lerpVectors(tg,h,k);d.rotation.z=.9*(1-k);},600);},1500);}}
  function physErr(a){
    if(a==='open89'&&S.c52)return {t:'Seccionadora aberta sob carga',b:'A seccionadora não é feita para interromper corrente de carga. Abri-la com o disjuntor fechado forma arco nos contatos, na altura do seu rosto. Abra primeiro o 52-1.',r:['10.6.5','10.13.1']};
    if((a==='test1'||a==='test2')&&S.c52&&S.c89)return {t:'O detector acusa tensão',b:'Nada foi seccionado ainda. A sequência começa pelo seccionamento.',r:['10.13.1']};
    if(a==='ground'&&!(mode==='neu'?done.has('test2'):done.has('test1')))return {t:'Aterramento sem constatação',b:'Se o circuito estiver energizado, o grampo fecha um curto franco com arco na sua frente. Ligar o aterramento sem constatar ausência de tensão é falha de procedimento de desenergização.',r:['10.13.1','10.16.1'],gir:1};
    if((a==='r_close89'||a==='r_close52')&&S.ground)return {t:'Religamento com aterramento instalado',b:'Fechar o circuito com o aterramento temporário ligado põe a fonte em curto-circuito franco. Desrespeitar a sequência de reenergização é grave e iminente risco.',r:['10.13.2','10.16.1'],gir:1};
    if(a==='r_close89'&&S.lock)return {t:'A alavanca está travada',b:'O cadeado impede a manobra. Esse é exatamente o papel do impedimento de reenergização.',r:['10.13.2']};
    if(a==='r_close52'&&!S.c89&&!S.ground)return {t:'Fechar primeiro a seccionadora',b:'A seccionadora fecha sem carga; o disjuntor fecha por último porque é ele que estabelece a corrente.',r:['10.6.5']};
    return null;}
  function stepOf(a,seq){return seq.find(s=>s.acts.includes(a));}
  function doAction(a){if(phase==='fim'||!A[a])return;const seq=SEQ[mode][phase];if(phase==='des'&&a.startsWith('r_'))return;if(phase==='ren'&&!a.startsWith('r_'))return;
    if(done.has(a)){fb({k:'info',t:'Já feito',b:A[a]});return;}
    const pe=physErr(a);if(pe){errors++;fb({k:'err',t:pe.t,b:pe.b,r:pe.r,gir:pe.gir});toast(pe.t,'bad');redraw();return;}
    const st=seq[idx];
    if(st.acts.includes(a)){if(st.ord){const exp=st.acts.find(x=>!done.has(x));if(exp!==a){errors++;fb({k:'err',t:'Ordem dentro da etapa',b:`Antes de "${A[a].toLowerCase()}", vem "${A[exp].toLowerCase()}".`,r:[phase==='des'?'10.13.1':'10.13.2']});toast('Fora de ordem','bad');redraw();return;}}
      done.add(a);apply(a);const n=NOTE[a];
      fb({k:'ok',t:`(${st.k}) ${n[0]}`,b:n[1],r:n[2]});toast(n[0],'ok');
      if(st.acts.every(x=>done.has(x))){idx++;hint=false;if(idx>=seq.length)finish();}}
    else{errors++;const s2=stepOf(a,seq);const cur=seq[idx];
      fb({k:'err',t:'Fora de sequência',b:`A etapa atual é (${cur.k}). "${A[a]}" pertence à etapa (${s2?s2.k:'?'}).`,r:[phase==='des'?'10.13.1':'10.13.2']});toast('Fora de sequência','bad');}
    redraw();}
  function finish(){if(phase==='des'){phase='ren';idx=0;done=new Set();S.tools=true;O.tools.visible=true;banner('Liberada para trabalho');markDone('desenergizado','a');
      fb({k:'ok',t:'Instalação desenergizada',b:`Sequência completa com ${errors} erro(s). Agora a instalação pode ser considerada desenergizada e liberada. Depois do serviço, faça a reenergização na tarefa B.`,r:['10.13.1','10.13.3']});errors=0;}
    else{phase='fim';banner('Reenergizada');markDone('desenergizado','b');fb({k:'ok',t:'Instalação reenergizada',b:`Sequência completa com ${errors} erro(s).`,r:['10.13.2']});}}
  let panelEl=null,which='des';
  function redraw(){if(!panelEl||!panelEl.isConnected)return;draw(panelEl,which);}
  function draw(el,w){panelEl=el;which=w;const seqs=SEQ[mode][w];
    let html=`<p class="lead">${w==='des'?'Execute a desenergização do TR-01 para manutenção. Clique nos objetos da cena ou nas ações abaixo. Errar a ordem gera feedback com o item da norma.':'O serviço terminou. Devolva a instalação à operação na ordem certa.'}</p>`;
    if(w==='ren'&&phase==='des'){el.innerHTML=html+`<div class="card info"><div class="ct">A desenergização ainda não terminou</div><div class="cb">Complete a tarefa A ou carregue o cenário já desenergizado.</div><div class="row-actions"><button type="button" class="btn primary" id="m6skip">Carregar cenário desenergizado</button></div></div>`;
      $('#m6skip',el).onclick=()=>{SEQ[mode].des.forEach(s=>s.acts.forEach(a=>{if(!a.startsWith('test'))apply(a);}));phase='ren';idx=0;done=new Set();errors=0;S.tools=true;if(O.tools)O.tools.visible=true;banner('Liberada para trabalho');redraw();};return;}
    if(w==='des'&&phase!=='des'){el.innerHTML=html+`<div class="card ok"><div class="ct">Desenergização concluída</div><div class="cb">Siga para a reenergização ou recomece.</div><div class="row-actions"><button type="button" class="btn primary" id="m6go">Ir para a reenergização</button><button type="button" class="btn" id="m6re">Recomeçar do zero</button></div></div>`;
      $('#m6go',el).onclick=()=>gotoTask('b');$('#m6re',el).onclick=restart;return;}
    if(w==='ren'&&phase==='fim'){el.innerHTML=html+`<div class="card ok"><div class="ct">Ciclo completo</div><div class="cb">Desenergizou, trabalhou e reenergizou.</div><div class="row-actions"><button type="button" class="btn" id="m6re">Recomeçar do zero</button></div></div>`;
      $('#m6re',el).onclick=restart;return;}
    html+=`<ul class="steps">${seqs.map((s,i)=>{const st=i<idx?'done':i===idx?'cur':'pend';const show=i<idx||(i===idx&&hint);
      return `<li class="${st}"><span class="sk">${s.k})</span><span>${show?s.t:i===idx?'Etapa atual · qual é?':'···'}${i===idx&&s.acts.length>1?` <span class="lead">(${s.acts.filter(a=>done.has(a)).length}/${s.acts.length} ações)</span>`:''}</span></li>`;}).join('')}</ul>
      <div class="row-actions"><button type="button" class="btn" id="m6hint">${hint?'Esconder':'Mostrar'} etapa atual</button><span class="lead">Erros: <b class="num">${errors}</b></span>${R(w==='des'?'10.13.1':'10.13.2')}</div>
      <div class="acts">${SHOW[w].map(a=>`<button type="button" class="act" data-act="${a}" ${done.has(a)?'disabled':''}>${A[a]}</button>`).join('')}</div>`;
    el.innerHTML=html;
    $('#m6hint',el).onclick=()=>{hint=!hint;redraw();};$$('[data-act]',el).forEach(b=>b.onclick=()=>doAction(b.dataset.act));}
  function restart(){fresh();banner(null);reloadScene();if(panelEl)draw(panelEl,which);}
  const QC=[
    {q:'Um circuito desligado no disjuntor, sem bloqueio nem aterramento, está desenergizado para a NR-10?',o:['Sim','Não; só depois de cumprida a sequência do 10.13.1. Antes disso vale o capítulo 10.14'],a:1,x:'Desligada com possibilidade de energização segue as regras de instalação energizada.',r:['10.13.1','10.5.2']},
    {q:'O PLH pode mudar a sequência de desenergização?',o:['Nunca','Sim, por peculiaridade da situação ou desenvolvimento tecnológico, com justificativa técnica formalizada antes e o mesmo nível de segurança','Sim, verbalmente no campo'],a:1,r:['10.13.4']},
    {q:'Outra equipe pode religar o alimentador que você desenergizou. O que a norma exige?',o:['Nada; a responsabilidade é dela','Medidas que impeçam outras equipes ou organizações de energizar a instalação durante todo o serviço'],a:1,r:['10.13.3']},
    {q:'Com 89 e 52 abertos, o barramento de entrada continua energizado dentro da zona controlada. Que etapa cuida disso?',o:['(c) impedimento de reenergização','(e) proteção dos elementos energizados na zona controlada e contra arco','(g) delimitação da área'],a:1,r:['10.13.1','AII']},
    {q:'Pelo 10.13.1, qual é a ordem das três primeiras etapas?',o:['Seccionamento → constatação → impedimento','Seccionamento → impedimento → constatação','Impedimento → seccionamento → constatação'],a:0,x:'Alíneas a, b e c do 10.13.1: seccionamento ou desligamento; constatação da ausência de tensão; impedimento de reenergização. A constatação volta na alínea d, antes do aterramento.',r:['10.13.1']},
    {q:'Pelo 10.13.2, qual é a primeira etapa da reenergização?',o:['Remover o aterramento temporário','Retirar os obstáculos de delimitação e sinalização da área','Religar o disjuntor'],a:1,r:['10.13.2']},
    {q:'Ao abrir uma seccionadora com o disjuntor fechado, o que acontece?',o:['Nada; seccionadora interrompe carga','Forma arco nos contatos, porque seccionadora não é dispositivo de abertura sob carga'],a:1,x:'Por isso o 10.6.5 lista dispositivos de abertura sob carga e intertravamentos como proteção contra arco.',r:['10.6.5']}];
  const mod={id:'desenergizado',phase:'III',name:'Desenergização e reenergização',short:'Desenergizado',scene:'Subestação abrigada 13,8 kV',primer:{logic:"Desligado não é desenergizado. A instalação só é considerada desenergizada depois de toda a sequência do 10.13.1; antes disso, se ainda pode ser energizada por qualquer meio, vale o regime de energizada (10.5.2). A volta tem sequência própria (10.13.2). Um PLH pode alterar as etapas, desde que justifique por escrito antes e mantenha o mesmo nível de segurança.",links:[["projeto", "O projeto previu o bloqueio e o aterramento que você usa aqui.", ["10.4.1", "10.4.6"]], ["zonas", "A etapa (e) existe porque algo continua energizado dentro da ZC.", ["AII"]], ["organizacao", "A área delimitada e sinalizada da etapa (g) segue a sinalização do 10.7.7.", ["10.7.7"]], ["documentacao", "Falha na sequência de desenergização ou de reenergização é GIR.", ["10.16.1"]]]},
    brief:'O procedimento mais cobrado da norma, passo a passo. Uma instalação só é desenergizada depois de toda a sequência. O resto é instalação desligada, que ainda pode matar.',
    base:['10.13.1','10.13.2','10.13.3','10.13.4','10.16.1'],
    cam:{theta:.42,phi:1.12,r:9.5,t:[0,1.3,-.6],rMax:20},
    reset(){},build,
    onPick(id){const isR=phase==='ren';const m={dj:isR?'r_close52':'open52',sc:isR?(S.lock?'r_unlock':'r_close89'):'open89',det:done.has('test1')?'test2':'test1',
        cad:'lock',atr:'ground',ant:'barrier',eti:'tag',con:'cones',gnd:'r_ground',bar:'r_barrier',conesOn:'r_cones',tools:'r_tools',people:'r_people'};
      if(id==='c1'){fb({k:'info',t:'Cubículo de entrada',b:'O barramento e os contatos superiores da 89-1 estão do lado da fonte. Continuam energizados mesmo com tudo aberto, e ficam dentro da zona controlada de quem trabalha no cubículo.',r:['10.13.1','AII']});toast('Lado da fonte: sempre energizado');return true;}
      if(id==='tr'){fb({k:'info',t:'TR-01',b:'Ponto de trabalho. O brilho âmbar nas buchas indica tensão. Ele some quando o circuito é aberto.',r:['10.13.1']});return true;}
      if(id==='cart'){fb({k:'info',t:'Carrinho de ferramentas',b:'Detector, conjunto de aterramento, cadeado, etiqueta, anteparo e cones. Clique em cada item para usá-lo.'});return true;}
      if(id==='sc'&&isR&&S.tag){gotoTask('b');doAction('r_tag');return true;}
      const a=m[id];if(!a)return false;gotoTask(isR||phase==='fim'?'b':'a');doAction(a);return true;},
    tasks:[{id:'a',title:'Desenergizar',render(el){draw(el,'des');}},{id:'b',title:'Reenergizar',render(el){draw(el,'ren');}},{id:'c',title:'Pegadinhas',render(el,api){quiz(el,api,QC);}}]};
  QB.add('desenergizado',QC);
  return mod;})());
