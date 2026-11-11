/* ===== Camada 2 · Projeto e obra ===== */
MODS.push((()=>{
  const AL={a:'10.6.4 a: locais com banheira ou chuveiro, todos os pontos de utilização.',b:'10.6.4 b: tomadas em áreas externas à edificação.',
    c:'10.6.4 c: tomadas internas que podem alimentar equipamentos no exterior, até 32 A.',
    d:'10.6.4 d: em habitação, pontos de utilização (tomadas e iluminação) em cozinhas, copas, lavanderias, áreas de serviço, garagens e áreas molhadas.',
    e:'10.6.4 e: em edificação não residencial, pontos de TOMADA em cozinhas, copas, lavanderias, áreas de serviço, garagens e áreas molhadas. Em instalações existentes, só passa a valer um ano após a vigência da Portaria.',
    n:'Local seco que não está na lista do 10.6.4. O projeto pode adotar DDR, mas a norma não o exige aqui.',
    x:'Circuito cuja continuidade é indispensável à segurança das pessoas: a exigência do DDR não se aplica (10.6.4.1). O mesmo item dispensa o DDR em caso de inviabilidade técnica registrada em projeto.'};
  const ROOMS=[
    {id:'banheiro',r:[3,5,-3.5,.5],res:'Banheiro',nres:'Vestiário com chuveiro',need:{res:'a',nres:'a'},c:'#a9c7d8'},
    {id:'cozinha',r:[-5,-1.5,.5,3.5],res:'Cozinha',nres:'Cozinha industrial',need:{res:'d',nres:'e'},c:'#d9c9a3'},
    {id:'lavanderia',r:[-1.5,.8,.5,3.5],res:'Lavanderia',nres:'Lavanderia',need:{res:'d',nres:'e'},c:'#b9d3c4'},
    {id:'garagem',r:[.8,5,.5,3.5],res:'Garagem',nres:'Garagem / doca',need:{res:'d',nres:'e'},c:'#c3c6c9'},
    {id:'sala',r:[-5,-.5,-3.5,.5],res:'Sala · tomada de até 32 A usada para equipamentos no quintal',nres:'Salão · tomada de até 32 A que alimenta equipamentos no pátio',need:{res:'c',nres:'c'},c:'#d8c0b0'},
    {id:'quarto',r:[-.5,3,-3.5,.5],res:'Quarto',nres:'Escritório',need:{res:'n',nres:'n'},c:'#c9bfd6'},
    {id:'varanda',r:[-5,-.5,-5.6,-3.5],res:'Quintal · área externa à edificação',nres:'Pátio · área externa à edificação',need:{res:'b',nres:'b'},c:'#b8a98e',ext:true},
    {id:'bomba',res:'Bomba de incêndio',nres:'Bomba de incêndio',need:{res:'x',nres:'x'}}];
  let mode='res',sel=new Set(),floors={};
  const INFO={
    qdc:{t:'Quadro de distribuição (QDC)',b:'O projeto especifica dispositivo de desligamento que aceita impedimento de reenergização (cadeado) e sinalização da condição do circuito. Seccionamento de ação simultânea sempre que possível. Porta fechada e sinalização de tensão e de perigo de choque e arco.',r:['10.4.1','10.4.2','10.7.7.1']},
    padrao:{t:'Padrão de entrada',b:'O medidor marca o fim do SEP. Daqui para dentro a instalação é do consumidor, e o projeto dele precisa estar sob responsabilidade de PLH, atualizado e disponível aos trabalhadores autorizados.',r:['g-sep','10.4.7','10.4.8']},
    aterramento:{t:'Haste e caixa de inspeção do aterramento',b:'O projeto define o esquema de aterramento e se neutro e PE são interligados, e prevê condições para aterramento temporário. A organização guarda a documentação das inspeções e medições do aterramento.',r:['10.4.4','10.4.6','10.15.3','10.6.3']}};

  function room(rm){const [x0,x1,z0,z1]=rm.r;const w=x1-x0,d=z1-z0,cx=(x0+x1)/2,cz=(z0+z1)/2;const g=grp(cx,0,cz);
    const fl=boxB(w-.08,.06,d-.08,rm.c,0,0,0,g);floors[rm.id]=fl;
    if(!rm.ext){const H=1.05,T=.1;boxB(w,H,T,'#eceae4',0,0,-d/2+T/2,g);boxB(w,H,T,'#eceae4',0,0,d/2-T/2,g);boxB(T,H,d,'#eceae4',-w/2+T/2,0,0,g);boxB(T,H,d,'#eceae4',w/2-T/2,0,0,g);}
    else{[[-w/2+.1,-d/2+.1],[w/2-.1,-d/2+.1]].forEach(([x,z])=>cyl(.06,.06,2.4,'#8a7660',x,1.2,z,g));box(w,.08,.3,'#8a7660',0,2.4,-d/2+.1,g);}
    return g;}
  function build(){floors={};
    const lab=r=>mode==='res'?r.res:r.nres;
    ROOMS.filter(r=>r.r).forEach(rm=>{const g=room(rm);hot(g,rm.id,lab(rm),{dy:.9});label([lab(rm).split(' · ')[0]],0,1.55,0,g,{s:.34});
      if(sel.has(rm.id))paint(rm.id,true);});
    // mobiliário e pontos
    const ch=grp(4.5,0,-2.6);cyl(.03,.03,2.1,'#9aa1a6',0,1.05,0,ch);cyl(.14,.1,.05,'#cfd4d8',0,2.1,.12,ch);box(.9,.02,.9,'#dfe8ee',-.2,.07,.2,ch);
    boxB(1.6,.9,.6,'#d6d2c8',-3.9,0,3,null);boxB(.7,1.7,.65,'#e8eaec',-2.2,0,3,null);boxB(.55,.85,.55,'#f0f0f0',-.4,0,3,null);boxB(.6,.9,.5,'#dfe3e6',.35,0,3,null);
    const car=grp(3,0,2);boxB(1.7,.55,3.4,'#3d6e9e',0,.18,0,car);boxB(1.4,.45,1.8,'#2e5478',0,.73,-.2,car);[[-.8,-1.1],[.8,-1.1],[-.8,1.1],[.8,1.1]].forEach(([x,z])=>{const w=cyl(.28,.28,.2,'#1e1e1e',x,.28,z,car);w.rotation.z=Math.PI/2;});
    boxB(2.2,.75,.9,'#6d7f6a',-3,0,-2.4,null);boxB(1.8,.45,2,'#e2dccf',1,0,-2.2,null);boxB(.08,.12,.05,'#fafafa',-1.6,.3,-3.42,null);
    const tx=grp(-2.6,0,-4.6);cyl(.04,.04,.6,'#7d7d7d',0,.3,0,tx);boxB(.16,.18,.08,'#f4f4f4',0,.6,0,tx);
    // QDC
    const qd=grp(-.4,0,.62);boxB(.12,1.9,.6,'#eceae4',0,0,0,qd);boxB(.08,.6,.45,'#c7ccd0',.1,1.05,0,qd);plate(['QDC'],.3,.12,{bg:'#20313f',fg:'#fff'},.145,1.5,0,qd,Math.PI/2);
    hot(qd,'qdc',INFO.qdc.t,{dy:.25});
    // padrão, aterramento e bomba
    const pd=grp(5.9,0,2.8);cyl(.08,.1,3.2,'#a3a8ad',0,1.6,0,pd);boxB(.45,.55,.22,'#d9dde0',0,1.1,-.15,pd);hot(pd,'padrao',INFO.padrao.t);
    const at=grp(5.9,0,1.2);boxB(.34,.06,.34,'#7b858c',0,0,0,at);cyl(.016,.016,.5,'#b87333',0,.06,0,at);line([[5.9,.08,1.2],[5.9,1.2,2.65]],0xb87333);hot(at,'aterramento',INFO.aterramento.t,{dy:.5});
    const bb=grp(5.9,0,-2.2);boxB(.9,.12,.5,'#5d6870',0,0,0,bb);const mo=cyl(.2,.2,.55,'#b5322b',.12,.36,0,bb);mo.rotation.z=Math.PI/2;cyl(.07,.07,.5,'#7b858c',-.3,.4,0,bb).rotation.z=Math.PI/2;
    floors.bomba=mo;hot(bb,'bomba','Bomba de incêndio');if(sel.has('bomba'))paint('bomba',true);}
  function paint(id,on){const f=floors[id];if(!f)return;const base=on?0x2B7649:0;setEm(f,base,on?.55:1);}
  function toggle(id){if(sel.has(id))sel.delete(id);else sel.add(id);paint(id,sel.has(id));const rm=ROOMS.find(r=>r.id===id);
    toast(`${mode==='res'?rm.res:rm.nres}: ${sel.has(id)?'DDR marcado':'DDR removido'}`,sel.has(id)?'ok':'');if(activeTask()==='a')drawList();}
  let listEl=null;
  function drawList(){if(!listEl)return;const L=$('#ddrList',listEl);if(!L)return;
    L.innerHTML=ROOMS.map(r=>`<label class="chk" style="padding:4px 0"><input type="checkbox" data-room="${r.id}" ${sel.has(r.id)?'checked':''}> ${mode==='res'?r.res:r.nres}</label>`).join('');
    $$('[data-room]',L).forEach(i=>i.onchange=()=>{toggle(i.dataset.room);});}
  const AUD=[
    {t:'O QDC tem disjuntor geral com dispositivo para cadeado e etiqueta que indica se o circuito está ligado ou desligado.',a:'C',x:'Atende ao desligamento com impedimento de reenergização e indicação da condição operativa.',r:['10.4.1']},
    {t:'O motor trifásico da bomba é seccionado por três disjuntores monopolares independentes, sem acoplamento.',a:'N',x:'O projeto deve prever, na medida do possível, seccionamento de ação simultânea (10.4.2). Para um motor trifásico, um dispositivo tripolar de ação simultânea é plenamente possível, então a ressalva não se aplica.',r:['10.4.2']},
    {t:'Cabos de CFTV e de força passam no mesmo eletroduto, sem definição no projeto.',a:'N',x:'Circuitos de finalidades distintas são identificados e instalados separadamente, salvo compartilhamento definido em projeto.',r:['10.4.3.1','10.12.10']},
    {t:'O projeto não especifica o esquema de aterramento nem se neutro e PE são interligados.',a:'N',x:'Esses dois pontos são conteúdo obrigatório do projeto.',r:['10.4.4']},
    {t:'Não há ponto previsto para conectar aterramento temporário no QGBT.',a:'N',x:'Todo projeto prevê condições para aterramento temporário.',r:['10.4.6']},
    {t:'O memorial descreve o princípio de funcionamento dos DR e sua compatibilidade com a instalação.',a:'C',x:'Alíneas e e f do memorial descritivo.',r:['10.4.9']},
    {t:'O projeto veio de um escritório no exterior e não tem responsável técnico habilitado no Brasil.',a:'N',x:'Projeto feito fora do Brasil fica sob responsabilidade técnica de PLH.',r:['10.4.8.1','10.4.8']},
    {t:'A garagem foi ampliada, mas o projeto ficou na versão original.',a:'N',x:'O projeto corresponde ao executado.',r:['10.4.13','10.4.7']},
    {t:'A frente do QGBT tem espaço livre e iluminação suficiente para manutenção.',a:'C',x:'Espaço seguro e iluminação adequada conforme NR-17.',r:['10.4.3','10.4.10']},
    {t:'Para o QGBT de 380 V com 30 kA de curto presumido, o projeto inclui estudo de energia incidente.',a:'C',x:'Estudo de energia incidente quando aplicável, para definir a proteção contra os efeitos térmicos do arco.',r:['10.4.12','10.6.5']},
    {t:'O projeto fica trancado na sala do engenheiro e os eletricistas autorizados não têm acesso.',a:'N',x:'O projeto fica disponível aos trabalhadores autorizados, às autoridades e a outras pessoas autorizadas.',r:['10.4.7','10.15.2']}];
  const MEM=[{t:'Proteção contra choques elétricos, queimaduras e riscos adicionais',c:1},{t:'Sistema de identificação de circuitos, dispositivos, condutores e equipamentos, e como aplicá-lo fisicamente',c:1},
    {t:'Cronograma físico-financeiro da obra',c:0},{t:'Restrições e advertências de acesso de pessoas aos componentes',c:1},{t:'Precauções diante das influências externas',c:1},
    {t:'Lista de fornecedores e orçamento dos materiais',c:0},{t:'Princípio funcional dos dispositivos de proteção destinados à segurança das pessoas',c:1},
    {t:'Marca comercial obrigatória dos disjuntores',c:0},{t:'Compatibilidade dos dispositivos de proteção com a instalação',c:1},{t:'Cálculo de carga térmica do ar-condicionado',c:0}];

  const mod={id:'projeto',phase:'II',name:'Projeto e obra',short:'Projeto',scene:'Obra do zero',primer:{logic:"O projeto é a primeira barreira e a mais barata. Ele prepara a instalação para tudo o que vem depois: o ponto do cadeado, o ponto do aterramento temporário, o esquema de aterramento, o estudo de energia incidente, o lugar do DDR. Quando o projeto falha, as camadas seguintes viram improviso no campo.",links:[["desenergizado", "O dispositivo com bloqueio do 10.4.1 recebe o cadeado da etapa (c); o aterramento temporário previsto no 10.4.6 é instalado na etapa (d).", ["10.4.1", "10.4.6", "10.13.1"]], ["coletiva", "EPC e DDR são adotados conforme definido em projeto; a exceção ao DDR fica registrada no memorial.", ["10.6.4", "10.6.4.1"]], ["individual", "O estudo de energia incidente do projeto define o EPI quando o Anexo IV não se aplica.", ["10.4.12", "10.11.2.3"]], ["documentacao", "Toda organização mantém o projeto elétrico atualizado.", ["10.15.3"]]]},
    brief:'A segurança começa na prancheta. Aqui você decide onde o DDR é obrigatório, audita um projeto contra o capítulo 10.4 e monta o memorial descritivo.',
    base:['10.4.1','10.4.8','10.4.9','10.6.4','10.6.4.1'],
    cam:{theta:.55,phi:.82,r:19,t:[0,0,0],rMax:40},
    reset(){floors={};},build,info:INFO,
    onPick(id){const rm=ROOMS.find(r=>r.id===id);if(rm){gotoTask('a');toggle(id);return true;}return false;},
    tasks:[
      {id:'a',title:'DDR',render(el,api){listEl=el;
        el.innerHTML=`<p class="lead">Clique nos cômodos da planta (ou marque na lista) onde o DDR de alta sensibilidade é obrigatório. Depois confira. Troque o tipo de edificação para ver a diferença entre as alíneas d e e.</p>
        <div class="seg" id="m2mode"><button type="button" data-v="res" aria-pressed="${mode==='res'}">Residência</button><button type="button" data-v="nres" aria-pressed="${mode==='nres'}">Restaurante (não residencial)</button></div>
        <div id="ddrList" style="display:flex;flex-direction:column"></div>
        <div class="row-actions"><button type="button" class="btn primary" id="m2chk">Conferir projeto</button><button type="button" class="btn" id="m2clr">Limpar</button></div><div id="m2res" class="fb"></div>`;
        drawList();
        $$('#m2mode button',el).forEach(b=>b.onclick=()=>{mode=b.dataset.v;sel.clear();reloadScene();selectTask(UI.task);});
        $('#m2clr',el).onclick=()=>{sel.forEach(id=>paint(id,false));sel.clear();drawList();$('#m2res',el).innerHTML='';};
        $('#m2chk',el).onclick=()=>{let ok=0;const rows=ROOMS.map(r=>{const need=r.need[mode];const req=!['n','x'].includes(need);const good=sel.has(r.id)===req;if(good)ok++;
            return `<div class="cl-row ${good?'good':'bad'}"><div class="t"><b>${mode==='res'?r.res:r.nres}</b> · ${req?'DDR obrigatório':'DDR não exigido'}</div><div class="num">${good?'✓':'✗'}</div><div class="ex">${AL[need]}</div></div>`;}).join('');
          $('#m2res',el).innerHTML=`<div class="score">${ok} de ${ROOMS.length}</div><div class="cl">${rows}</div>`+cardHTML({k:'info',t:'Atenção às palavras',b:mode==='res'?'Em habitação (alínea d) o texto fala em pontos de utilização, o que inclui a iluminação desses cômodos.':'Em edificação não residencial (alínea e) o texto fala só em pontos de tomada. E, para instalações já existentes, a alínea e entra em vigor um ano depois da Portaria.',r:mode==='res'?['10.6.4']:['10.6.4','art3']});
          if(ok===ROOMS.length)api.done();};}},
      {id:'b',title:'Auditoria',render(el,api){classify(el,api,{id:'aud',intro:'Cada afirmação descreve o projeto entregue para a obra. Marque se está conforme ou não conforme com o capítulo 10.4.',
        options:[{v:'C',l:'Conforme'},{v:'N',l:'Não conforme'}],items:AUD});}},
      {id:'c',title:'Memorial',render(el,api){el.innerHTML='';pickList(el,api,{intro:'Marque o que o memorial descritivo precisa conter, no mínimo, como itens de segurança.',items:MEM,
        x:'São seis alíneas, de a a f. Orçamento, cronograma e marca de equipamento são conteúdo de outros documentos.',r:['10.4.9'],onDone:api.done});}}
    ]};
  QB.cls('projeto',AUD,[{v:'C',l:'Conforme'},{v:'N',l:'Não conforme'}],'O projeto entregue para a obra está conforme o capítulo 10.4?');
  return mod;})());
