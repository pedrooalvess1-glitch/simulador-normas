/* ===== Camada 5 · Pré-trabalho ===== */
MODS.push((()=>{
  const H={
    porta:{nc:1,t:'Painel P-03 com a porta aberta, sem intervenção',b:'A porta do painel fica permanentemente fechada, exceto durante manutenção, pesquisa de defeito ou outra intervenção.',r:['10.7.7.1']},
    caixas:{nc:1,t:'Caixas de papelão guardadas dentro do cubículo',b:'Compartimentos e invólucros de equipamentos elétricos são exclusivos para essa finalidade. Guardar qualquer objeto ali é proibido.',r:['10.12.8']},
    placa:{nc:1,t:'QGBT sem sinalização',b:'Falta indicar o nível de tensão, advertir sobre choque e arco e restringir o acesso a pessoas não autorizadas.',r:['10.7.7.1','10.7.7']},
    luvas:{nc:1,gir:1,t:'Luvas isolantes com ensaio vencido há 16 meses',b:'Luvas isolantes de BT passam por ensaio dielétrico no menor intervalo previsto e, sem outra previsão, anualmente. Usar EPI isolante sem o ensaio é grave e iminente risco.',r:['10.14.4','10.14.4.1','10.16.1']},
    adornos:{nc:1,t:'Eletricista de aliança e relógio metálico',b:'Adornos pessoais são vedados nos serviços em eletricidade e nos trabalhos em proximidade.',r:['10.7.8']},
    multimetro:{nc:1,t:'Multímetro CAT II 300 V para medir no QGBT de 380 V',b:'O instrumento precisa servir à tensão de trabalho e ter categoria compatível com os surtos do ponto de medição. CAT II 300 V não atende a um QGBT de 380 V entre fases.',r:['10.12.6.1']},
    diagrama:{nc:1,t:'Diagrama unifilar de 2015 numa sala reformada em 2024',b:'O projeto corresponde ao executado e a documentação fica atualizada e disponível.',r:['10.4.13','10.15.2']},
    luminaria:{nc:1,t:'Luminária queimada em frente ao CCM',b:'A instalação precisa oferecer iluminação adequada para a posição de trabalho, conforme NR-17.',r:['10.4.10']},
    tomada:{nc:1,t:'Tomada da área de lavagem de peças sem DDR',b:'Edificação não residencial, ponto de tomada em área molhada ou sujeita a lavagem: DDR obrigatório. Para instalação existente, a alínea e passa a valer um ano após a vigência.',r:['10.6.4','art3']},
    aterr:{nc:1,t:'Conjunto de aterramento temporário com grampo quebrado e cabo descascado',b:'Dispositivos de proteção coletiva com isolação ou função de segurança são inspecionados e testados. Este conjunto não pode ser usado.',r:['10.12.6','10.13.1']},
    extintor:{nc:0,t:'Extintor de CO₂ na validade, junto à porta',b:'Conforme. Proteção contra incêndio segue a NR-23.',r:['10.6.6']},
    tapete:{nc:0,t:'Tapete isolante diante do QGBT',b:'Conforme. É proteção coletiva isolante, sujeita a ensaio dielétrico periódico.',r:['10.14.4']},
    acesso:{nc:0,t:'Porta da sala com placa de acesso restrito',b:'Conforme. Sinalização de restrição e impedimento de acesso.',r:['10.7.7']},
    armario:{nc:0,t:'Armário de EPI com vestimentas identificadas por trabalhador',b:'Conforme. O EPI é de uso pessoal; o uso compartilhado é proibido.',r:['10.11.1']}};
  const NCK=Object.keys(H).filter(k=>H[k].nc);let found=new Set(),falseHits=new Set();
  function build(){
    const fl=boxB(11,.04,8,'#b9bfc4',0,0,0);fl.castShadow=false;
    boxB(11,3.2,.2,'#e6e3dc',0,0,-4.1);boxB(.2,3.2,8,'#e6e3dc',-5.6,0,0);
    // QGBT
    const q=grp(-1.2,0,-3.6);for(let i=0;i<4;i++){boxB(.9,2.2,.7,'#cfd3d6',(i-1.5)*.92,0,0,q);}
    const door=grp(.92*.5+.45,0,.36,q);box(.9,2.1,.04,'#c3c8cc',-.45,1.1,0,door);door.rotation.y=-1.25;
    plate(['P-03'],.3,.12,{bg:'#20313f',fg:'#fff'},(0.5)*.92,2.08,.351,q);plate(['P-01'],.3,.12,{bg:'#20313f',fg:'#fff'},(-1.5)*.92,2.08,.351,q);plate(['P-02'],.3,.12,{bg:'#20313f',fg:'#fff'},(-.5)*.92,2.08,.351,q);plate(['P-04'],.3,.12,{bg:'#20313f',fg:'#fff'},(1.5)*.92,2.08,.351,q);
    hot(door,'porta',H.porta.t,{dy:.1});
    const cx=grp(.46,0,-3.55);boxB(.36,.3,.36,'#b48a5a',0,.5,0,cx);boxB(.3,.24,.3,'#a87f50',.02,.8,0,cx);hot(cx,'caixas','Dentro do P-03',{dy:.6});
    const pl=box(1.5,.36,.02,'#cfd3d6',-1.2,2.45,-3.24);hot(pl,'placa','Frente do QGBT',{dy:.3});
    const tp=boxB(4,.03,1,'#262626',-1.2,0,-2.6);hot(tp,'tapete',H.tapete.t,{dy:.25});
    // CCM e luminária
    const c=grp(-5.15,0,-.8);boxB(.7,2.2,1.8,'#c3c9ce',0,0,0,c);for(let r=0;r<6;r++)box(.02,.26,.75,'#e3e6e9',.36,.35+r*.31,.42,c);
    const lum=grp(-5.4,2.75,-.8);box(.3,.08,1.1,'#e9ecef',0,0,0,lum);box(.06,.3,.08,'#9aa1a6',-.12,.15,0,lum);box(.2,.03,1.0,'#5b6168',0,-.05,0,lum);hot(lum,'luminaria','Luminária sobre o CCM',{dy:.2});
    const lum2=grp(-1.2,2.95,-3.85);box(1.4,.08,.3,'#e9ecef',0,0,0,lum2);box(1.3,.03,.2,'#fff6d0',0,-.05,.02,lum2,{emissive:0xfff3c0,emissiveIntensity:.9});
    // trafo seco em cela
    const t=grp(4,0,-2.8);boxB(1.6,1.8,1.2,'#5d6d79',0,0,0,t);[-.5,0,.5].forEach(x=>cyl(.08,.08,.4,'#c9d0d6',x,2,0,t));
    [[-1.3,0],[1.3,0]].forEach(([x])=>{const m=box(.03,2.4,2.2,'#8e979e',x,1.2,.2,t,{transparent:true,opacity:.35});m.castShadow=false;});const fr=box(2.6,2.4,.03,'#8e979e',0,1.2,1.3,t,{transparent:true,opacity:.35});fr.castShadow=false;
    // mesa com luvas, multímetro e diagrama
    const m=grp(2.6,0,1.2);boxB(1.6,.06,.8,'#8a6b4a',0,.78,0,m);[[-.72,-.32],[.72,-.32],[-.72,.32],[.72,.32]].forEach(([x,z])=>boxB(.05,.78,.05,'#5a4a3a',x,0,z,m));
    const lv=grp(-.4,.84,0,m);box(.22,.04,.32,'#e67e22',0,0,0,lv);box(.22,.04,.32,'#e67e22',.25,0,.05,lv);plate(['ENSAIO','03/2025'],.16,.1,{bg:'#fff',fg:'#b00',border:'#b00'},.12,.03,.17,lv);lv.children[2].rotation.x=-Math.PI/2;
    hot(lv,'luvas','Luvas isolantes sobre a mesa',{dy:.3});
    const mm=grp(.35,.84,0,m);box(.16,.04,.26,'#f2c200',0,0,0,mm);plate(['CAT II','300 V'],.12,.1,{bg:'#111',fg:'#f2c200'},0,.025,.02,mm).rotation.x=-Math.PI/2;hot(mm,'multimetro','Multímetro sobre a mesa',{dy:.3});
    const dg=grp(1.65,1.7,-3.98);box(1.0,.66,.03,'#fafafa',0,0,0,dg);plate(['DIAGRAMA UNIFILAR','REV. 2015'],.9,.5,{bg:'#fff',fg:'#20313f'},0,0,.02,dg);hot(dg,'diagrama','Diagrama afixado na parede',{dy:.2});
    // lavagem
    const lw=grp(-4.6,0,2.8);boxB(1,.85,.6,'#b7c2c8',0,0,0,lw);box(.8,.05,.45,'#7b8a96',0,.86,0,lw);const tm=grp(-5.47,1.2,2.8);box(.04,.14,.12,'#f4f4f4',0,0,0,tm);hot(tm,'tomada','Tomada da área de lavagem',{dy:.25});
    label(['Lavagem de peças'],-4.6,1.7,2.8,null,{s:.26});
    // aterramento temporário no chão
    const at=grp(1.4,0,2.9);cyl(.12,.12,.06,'#2b7a2b',0,.03,0,at);for(let i=0;i<3;i++){box(.08,.06,.16,'#8e979e',-.3+i*.3,.04,.4,at);}line([[1.1,.05,3.3],[1.4,.06,2.9],[1.7,.05,3.3],[1.4,.06,2.9],[1.4,.05,3.3]],0x2b7a2b);
    hot(at,'aterr','Conjunto de aterramento temporário',{dy:.3});
    // extintor, porta, armário
    const ex=grp(-5.3,0,-2.05);cyl(.12,.12,.65,'#c0392b',0,.33,0,ex);cyl(.03,.03,.1,'#222',0,.7,0,ex);hot(ex,'extintor',H.extintor.t,{dy:.2});
    const pt=grp(-5.48,0,-3.0);pt.rotation.y=Math.PI/2;boxB(1,2.1,.04,'#6d7a85',0,0,0,pt);plate(['ACESSO RESTRITO','PESSOAS AUTORIZADAS'],.7,.3,{bg:'#f2c200',fg:'#111',border:'#111'},0,1.6,.03,pt);hot(pt,'acesso','Porta da sala elétrica',{dy:.25});
    const ar=grp(-5.2,0,1.2);boxB(.6,1.9,.9,'#7b8a96',0,0,0,ar);for(let i=0;i<3;i++)box(.02,.2,.25,['#2f5d8a','#b9a67e','#1d3a5c'][i],.31,1.4,-.3+i*.3,ar);hot(ar,'armario',H.armario.t,{dy:.2});
    // eletricista com adornos
    const p=person({x:-2.2,z:-1.9,shirt:'#24476b',pants:'#1f3a57'});p.g.rotation.y=Math.PI;
    addMesh(new THREE.TorusGeometry(.03,.009,8,16),M('#d4af37',{metalness:.9,roughness:.2}),0,-.62,.05,p.P.shL);box(.1,.05,.1,'#d4af37',0,-.52,0,p.P.shR,{metalness:.9});
    hot(p.g,'adornos','Eletricista diante do QGBT',{dy:.25});
  }
  const GIR=[
    {t:'Instalação de área classificada sem medidas de proteção coletiva',a:'G',r:['10.16.1']},
    {t:'Equipe aterrou o circuito sem constatar ausência de tensão',a:'G',x:'Falha na sequência de desenergização.',r:['10.16.1','10.13.1']},
    {t:'Ajudante sem treinamento nem autorização trocando disjuntor energizado no QGBT',a:'G',x:'Trabalhador que não atende ao capítulo 10.10.',r:['10.16.1','10.10.2.1']},
    {t:'Luvas isolantes em uso sem ensaio dielétrico',a:'G',r:['10.16.1','10.14.4']},
    {t:'Painel com circuitos sem identificação',a:'N',x:'Não conformidade com 10.7.7, mas fora da lista do 10.16.1.',r:['10.7.7']},
    {t:'Diagrama unifilar desatualizado',a:'N',x:'Não conformidade com 10.4.13, mas fora da lista do 10.16.1.',r:['10.4.13']},
    {t:'Religaram o disjuntor com o aterramento temporário ainda instalado',a:'G',x:'Falha na sequência de reenergização.',r:['10.16.1','10.13.2']},
    {t:'Luminária queimada diante do CCM',a:'N',x:'Não conformidade com 10.4.10, fora da lista do 10.16.1.',r:['10.4.10']}];
  window.GIR_ITEMS=GIR;
  QB.cls('documentacao',GIR,[{v:'G',l:'Grave e iminente risco (10.16.1)'},{v:'N',l:'Não conformidade, não é GIR'}],'Esta situação está na lista do 10.16.1?');
  const ROT=[
    {t:'Termografia mensal dos barramentos do QGBT, prevista no plano de manutenção',a:'P',x:'Habitual e parte do processo contínuo.',r:['10.7.1','g-rot']},
    {t:'Troca emergencial de um TC queimado no cubículo de entrada',a:'T',r:['10.7.2']},
    {t:'Limpeza semestral programada dos painéis',a:'P',x:'Rotineira não depende da frequência, e sim de ser habitual e parte do processo contínuo.',r:['g-rot','10.7.1']},
    {t:'Instalação de um alimentador novo para a ampliação da fábrica',a:'T',r:['10.7.2']},
    {t:'Manobra diária de transferência rede/gerador prevista no procedimento operacional',a:'P',r:['10.7.1']},
    {t:'Primeira intervenção em um painel recém-adquirido, ainda sem procedimento',a:'T',r:['10.7.2']}];
  const PT=[{t:'Requisitos a serem atendidos para a execução',c:1},{t:'Orçamento do serviço',c:0},{t:'Disposições e medidas da análise de risco',c:1},{t:'Relação de todos os envolvidos e suas autorizações',c:1},
    {t:'Foto de cada trabalhador',c:0},{t:'Data do serviço',c:1},{t:'Condições impeditivas',c:1},{t:'Nome do cliente final',c:0}];
  const APR=[{t:'Local dos serviços e seu entorno',c:1},{t:'Isolamento e sinalização no entorno da área',c:1},{t:'Condições meteorológicas adversas',c:1},{t:'Cotação de preços dos materiais',c:0},
    {t:'Seleção, inspeção, uso e limites dos sistemas de proteção coletiva e individual',c:1},{t:'Riscos adicionais e externos',c:1},{t:'Trabalhos simultâneos',c:1},{t:'Horas extras previstas no mês',c:0},
    {t:'Condições impeditivas',c:1},{t:'Emergências, resgate e primeiros socorros',c:1},{t:'Necessidade de sistema de comunicação',c:1},{t:'Forma de supervisão',c:1},{t:'Avaliação de desempenho anual da equipe',c:0}];
  const QD=[
    {q:'Por quanto tempo vale uma permissão de trabalho?',o:['Uma semana','Pela duração da atividade, restrita ao turno; pode ser revalidada se nada mudar nas condições ou na equipe','Até o fim do contrato'],a:1,r:['10.7.2.2']},
    {q:'Quem aprova a PT e quem aprova o procedimento de trabalho?',o:['PT: trabalhador autorizado · procedimento: PLH','Ambos: técnico de segurança','PT: PLH · procedimento: supervisor'],a:0,r:['10.7.2','10.7.1.1']},
    {q:'Na avaliação prévia, você vê que a chuva molhou o piso do cubículo. O que a norma manda?',o:['Iniciar com cuidado redobrado','Não iniciar a operação e comunicar o superior hierárquico','Estender a PT para o próximo turno'],a:1,r:['10.7.4.1','10.7.4.2']},
    {q:'Terminado o serviço, a PT…',o:['é descartada','é encerrada e arquivada para rastreabilidade','fica com o executante'],a:1,r:['10.7.2.3']}];

  const mod={id:'organizacao',phase:'II',name:'Organização do trabalho',short:'Organização',scene:'Sala elétrica da fábrica',primer:{logic:"Medidas administrativas: o que é rotineiro segue procedimento aprovado por PLH; o que não é rotineiro exige permissão de trabalho; os dois nascem da análise de risco. No local, a avaliação prévia confere se o papel bate com a realidade, e se não bate o serviço não começa. Sinalização, adornos, supervisão e inspeção completam o capítulo.",links:[["pessoas", "Qualificação, treinamento e autorização são tratados como medida administrativa.", ["10.7.12"]], ["energizado", "Atividade não elétrica perto da ZC exige a análise de risco do 10.7.3 e instrução formal.", ["10.14.1.2"]], ["desenergizado", "A área delimitada e sinalizada é a etapa (g) da desenergização.", ["10.7.7", "10.13.1"]], ["documentacao", "Procedimentos, análises de risco e PT vão para a documentação.", ["10.15.4"]]]},
    brief:'Antes de tocar em qualquer coisa: inspecionar, analisar o risco, emitir o documento certo e fazer a avaliação prévia no local. Há dez não conformidades escondidas na sala.',
    base:['10.7.1','10.7.2','10.7.3','10.7.4','10.7.11'],
    cam:{theta:.5,phi:.98,r:13.5,t:[0,1,-.4],rMax:26},
    reset(){},build,
    onPick(id){const h=H[id];if(!h)return false;gotoTask('a');
      if(h.nc){const nw=!found.has(id);found.add(id);fb({k:'err',t:`Não conformidade: ${h.t}`,b:h.b,r:h.r,gir:h.gir});toast(nw?`NC encontrada · ${found.size}/${NCK.length}`:'NC já registrada','bad');}
      else{falseHits.add(id);fb({k:'ok',t:h.t,b:h.b,r:h.r});toast('Conforme','ok');}
      if(activeTask()==='a')drawA($('#tb'));return true;},
    tasks:[
      {id:'a',title:'Inspeção',render(el,api){el.innerHTML='';drawA(el,api);}},
      {id:'c',title:'Rotina × PT',render(el,api){classify(el,api,{id:'rot',intro:'Atividade rotineira segue procedimento de trabalho aprovado por PLH. Não rotineira exige permissão de trabalho, precedida de análise de risco e aprovada por trabalhador autorizado.',
        options:[{v:'P',l:'Procedimento (rotineira)'},{v:'T',l:'Permissão de trabalho'}],items:ROT});}},
      {id:'d',title:'PT e APR',render(el,api){const ok=new Set();const chk=()=>{if(ok.has('pt')&&ok.has('apr')&&ok.has('q'))api.done();};el.innerHTML='';
        pickList(el,api,{title:'Conteúdo mínimo da PT',items:PT,x:'São cinco itens obrigatórios.',r:['10.7.2.1'],onDone:()=>{ok.add('pt');chk();}});
        pickList(el,api,{title:'Conteúdo mínimo da análise de risco',items:APR,x:'São dez itens, de a a j.',r:['10.7.3'],onDone:()=>{ok.add('apr');chk();}});
        el.insertAdjacentHTML('beforeend','<div class="h3">Validade e avaliação prévia</div><div id="m5q"></div>');quiz($('#m5q',el),{done:()=>{ok.add('q');chk();}},QD);}}
    ]};
  function drawA(el,api){if(!el)return;const n=found.size;
    let html=`<p class="lead">Percorra a sala e clique em tudo que parecer irregular. Itens conformes também respondem, para você calibrar o olhar. Ao final sai o relatório que o 10.7.11 exige.</p>
      <div class="prog"><span class="num">${n}/${NCK.length} NC</span><div class="bar"><i style="width:${n/NCK.length*100}%"></i></div><span class="num">${falseHits.size} conformes vistos</span></div>`;
    if(n===NCK.length){html+=`<div class="h3">Relatório de inspeção</div><div class="cl">${NCK.map((k,i)=>`<div class="cl-row bad"><div class="t"><b>${i+1}.</b> ${H[k].t}</div><div>${Rs(H[k].r)}</div></div>`).join('')}</div>`+
      cardHTML({k:'info',t:'O que o relatório precisa ter',b:'Indicação das medidas de prevenção, com plano de ação e cronograma de adequação.',r:['10.7.11']});markDone('organizacao','a');}
    else html+=`<div class="cl">${NCK.filter(k=>found.has(k)).map(k=>`<div class="cl-row bad"><div class="t">${H[k].t}</div><div>${Rs(H[k].r)}</div></div>`).join('')||'<div class="cl-row"><div class="t lead">Nenhuma NC registrada ainda.</div></div>'}</div>`;
    el.innerHTML=html;}
  QB.cls('organizacao',ROT,[{v:'P',l:'Procedimento de trabalho (rotineira)'},{v:'T',l:'Permissão de trabalho (não rotineira)'}],'Que documento libera esta atividade?');
  return mod;})());
