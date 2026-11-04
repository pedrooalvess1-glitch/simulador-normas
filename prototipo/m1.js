/* ===== Camada 1 · Enquadramento ===== */
const ZTAB=[[0,1,.20,.70,'< 1 kV','380 V'],[1,3,.22,1.22,'≥ 1 e < 3 kV','2,3 kV'],[3,6,.25,1.25,'≥ 3 e < 6 kV','4,16 kV'],[6,10,.35,1.35,'≥ 6 e < 10 kV','6,9 kV'],
 [10,15,.38,1.38,'≥ 10 e < 15 kV','13,8 kV'],[15,20,.40,1.40,'≥ 15 e < 20 kV',''],[20,30,.56,1.56,'≥ 20 e < 30 kV','23 kV'],[30,36,.58,1.58,'≥ 30 e < 36 kV','34,5 kV'],
 [36,45,.63,1.63,'≥ 36 e < 45 kV',''],[45,60,.83,1.83,'≥ 45 e < 60 kV',''],[60,70,.90,1.90,'≥ 60 e < 70 kV','69 kV'],[70,110,1.00,2.00,'≥ 70 e < 110 kV','88 kV'],
 [110,132,1.10,3.10,'≥ 110 e < 132 kV',''],[132,150,1.20,3.20,'≥ 132 e < 150 kV','138 kV'],[150,220,1.60,3.60,'≥ 150 e < 220 kV',''],[220,275,1.80,3.80,'≥ 220 e < 275 kV','230 kV'],
 [275,380,2.50,4.50,'≥ 275 e < 380 kV','345 kV'],[380,480,3.20,5.20,'≥ 380 e < 480 kV','440 kV'],[480,700,5.20,7.20,'≥ 480 e < 700 kV','500 kV']];
function zoneRow(kV){for(let i=0;i<ZTAB.length;i++){if(kV<ZTAB[i][1])return i;}return -1;}
function faixa(V,ac){if(ac){if(V<=50)return 'EBT';if(V<=1000)return 'BT';if(V<=36200)return 'MT';return 'AT';}
  if(V<=120)return 'EBT';if(V<=1500)return 'BT';if(V<=3000)return 'MT';return 'AT';}
// edição única: Portaria 737/2026 — seletor desativado (faixa2004 removida)
const FX={EBT:{n:'Extrabaixa tensão',r:'g-ebt'},BT:{n:'Baixa tensão',r:'g-bt'},MT:{n:'Média tensão',r:'g-mt'},AT:{n:'Alta tensão',r:'g-at'}};

MODS.push((()=>{
  const P={
    geracao:{t:'Geração eólica e fotovoltaica',pre:{v:690,u:'V',ac:true,w:'sep',a:'servico'},
      b:'Aerogeradores e usinas fotovoltaicas são geração, portanto SEP. Um aerogerador típico gera em 690 V CA (BT). Strings fotovoltaicas chegam a 1.500 Vcc, que é exatamente o teto da BT em corrente contínua. O Complementar do SEP inclui a interface dessas fontes com o sistema.',r:['10.2.1','g-sep','g-bt','10.9.5']},
    transmissao:{t:'Linha de transmissão 230 kV',pre:{v:230,u:'kV',ac:true,w:'sep',a:'servico'},
      b:'230 kV é AT (acima de 36,2 kV). No Anexo II, a faixa ≥ 220 e < 275 kV dá Rr = 1,80 m e Rc = 3,80 m. Serviço energizado aqui nunca é individual e, dentro da zona de risco, exige bloqueio do religamento automático.',r:['g-at','AII','10.14.2','10.14.3']},
    distribuicao:{t:'Subestação de distribuição 69/13,8 kV',pre:{v:13.8,u:'kV',ac:true,w:'sep',a:'servico'},
      b:'Distribuição é o conjunto de subestações e linhas abaixo de 230 kV da concessionária ou permissionária. O lado de 69 kV é AT; o de 13,8 kV é MT. A organização integra o SEP, então mantém PIE.',r:['g-dist','g-mt','10.15.6']},
    poste:{t:'Poste com rede elétrica e cabos de telecom',pre:{v:13.8,u:'kV',ac:true,w:'sep',a:'comp'},
      b:'Cabo de internet no poste da distribuidora é compartilhamento de infraestrutura: cessão onerosa da capacidade excedente do poste para telecom. Quem lança fibra aqui trabalha em proximidade do SEP e faz o treinamento Específico de compartilhamento (40 h), que dispensa o Básico e o Complementar SEP.',r:['g-comp','10.9.9','10.9.4','10.7.9']},
    medicao:{t:'Padrão de entrada e medição',pre:{v:380,u:'V',ac:true,w:'sep',a:'servico'},
      b:'O SEP vai da geração até a medição, inclusive. O medidor ainda é SEP. Daqui para dentro começa o Sistema Elétrico de Consumo (SEC), que muda o módulo de capacitação (Fundamentos de SEP × Sistema elétrico de consumo) e os treinamentos complementares.',r:['g-sep','10.8.4']},
    cabine:{t:'Cabine primária 13,8 kV do consumidor',pre:{v:13.8,u:'kV',ac:true,w:'sec',a:'servico'},
      b:'Média tensão dentro do SEC. Quem trabalha aqui faz Básico (40 h) e Complementar de MT/AT-SEC (16 h). Como a organização realiza atividades em MT, o PIE passa a ser obrigatório, mesmo sem integrar o SEP.',r:['10.9.6','10.15.6','g-mt']},
    consumo:{t:'Indústria · QGBT 380 V',pre:{v:380,u:'V',ac:true,w:'sec',a:'servico'},
      b:'Serviço em BT no SEC: Básico (40 h) e periódico bienal (16 h). Só por ser BT o PIE não é exigido, mas toda organização precisa de projeto elétrico e da documentação das inspeções e medições do aterramento.',r:['10.9.4','10.9.10','10.15.3']},
    gerador:{t:'Grupo gerador próprio',pre:{v:380,u:'V',ac:true,w:'sec',a:'servico'},
      b:'Quem tem geração própria precisa impedir que ela energize instalações de outras organizações (o retorno pela rede que pega o eletricista da distribuidora de surpresa), salvo condições autorizadas pela ANEEL.',r:['10.14.5','10.13.3']}
  };
  const order=['geracao','transmissao','distribuicao','poste','medicao','cabine','consumo','gerador'];
  let seen=new Set(),cls={v:13.8,u:'kV',ac:true,w:'sep',a:'servico',ac2:false,es:false},seenFx=new Set(),blades=null;

  function build(){
    // faixas do chão: SEP × SEC
    const sep=box(26,.02,13,'#7d93a8',-5,.011,0,null,{transparent:true,opacity:.28});sep.receiveShadow=true;sep.castShadow=false;
    const sec=box(10,.02,13,'#a8916f',13,.011,0,null,{transparent:true,opacity:.3});sec.castShadow=false;
    label(['SEP · geração → medição'],-12,.25,6.2,null,{s:.5});label(['SEC · após a medição'],13,.25,6.2,null,{s:.5});
    line([[8,.03,-6.5],[8,.03,6.5]],0xE3A11B);
    // aerogerador
    const wt=grp(-16,0,-2.2);cyl(.22,.34,8,'#e9ecef',0,4,0,wt);box(.6,.6,1.3,'#e9ecef',0,8.2,.1,wt);
    blades=grp(0,8.2,.8,wt);sph(.2,'#d0d5da',0,0,0,blades);
    for(let k=0;k<3;k++){const b=box(.22,3.4,.06,'#f2f4f6',0,1.75,0,grp(0,0,0,blades));b.parent.rotation.z=k*2*Math.PI/3;}
    // FV
    const pv=grp(-16,0,2.6);for(let r=0;r<2;r++)for(let c=0;c<3;c++){const pg=grp(c*1.75-1.75,0,r*1.6,pv);cyl(.04,.04,.7,'#8a939b',0,.35,0,pg);
      const pan=box(1.6,.04,1.0,'#1d3b66',0,.8,0,pg,{metalness:.3,roughness:.4});pan.rotation.x=-.45;}
    const gen=grp(-16,0,0);hot(wt,'geracao',P.geracao.t,{dy:.2});hot(pv,'geracao',P.geracao.t,{noPin:true});
    // transformador elevador e torres
    const se1=grp(-11.5,0,0);boxB(1.4,1.2,1,'#7b8a96',0,0,0,se1);[-.4,0,.4].forEach(x=>cyl(.06,.06,.6,'#b9c2c9',x,1.5,0,se1));
    const tw=[];[-8.2,-3.8].forEach(x=>{const t=grp(x,0,0);boxB(.5,9,.5,'#9aa4ad',0,0,0,t);box(3.4,.16,.16,'#9aa4ad',0,8.4,0,t);box(2.4,.16,.16,'#9aa4ad',0,7.4,0,t);
      [-1.6,0,1.6].forEach(z=>cyl(.05,.05,.5,'#cfd6dc',z,8.1,0,t));tw.push(t);});
    hot(tw[0],'transmissao',P.transmissao.t);hot(tw[1],'transmissao',P.transmissao.t,{noPin:true});
    [-1.6,0,1.6].forEach(z=>{line(sag([-11.5,1.8,z*.3],[-8.2+z,7.85,0],.3),0x333333);line(sag([-8.2+z,7.85,0],[-3.8+z,7.85,0],.9),0x333333);});
    // subestação de distribuição
    const sd=grp(.2,0,0);boxB(3.6,.05,3.2,'#8f9aa3',0,0,0,sd);boxB(1.2,1.3,1,'#6f7f8c',-.8,0,-.4,sd);boxB(1,1.1,.9,'#6f7f8c',.9,0,.5,sd);
    [[-1.8,0],[1.8,0],[0,-1.6],[0,1.6]].forEach(([x,z])=>{const f=box(x?.05:3.6,1.3,x?3.2:.05,'#b0bac2',x,.65,z,sd,{transparent:true,opacity:.45});f.castShadow=false;});
    boxB(.12,3,.12,'#9aa4ad',-1.2,0,1,sd);boxB(.12,3,.12,'#9aa4ad',1.2,0,1,sd);box(2.6,.12,.12,'#9aa4ad',0,2.9,1,sd);
    hot(sd,'distribuicao',P.distribuicao.t);
    [-1.6,0,1.6].forEach(z=>line(sag([-3.8+z,7.85,0],[.2+z*.5,2.95,1],.6),0x333333));
    // poste com telecom
    const po=grp(4.4,0,.4);cyl(.13,.18,9,'#a3a8ad',0,4.5,0,po);box(2,.12,.12,'#8a8f94',0,8.5,0,po);[-.8,0,.8].forEach(x=>cyl(.05,.05,.3,'#d8dde1',x,8.72,0,po));
    box(.24,.34,.16,'#1b1b1b',0,5.3,.18,po);plate(['CTO'],.2,.1,{bg:'#1b1b1b',fg:'#fff'},0,5.3,.262,po);
    hot(po,'poste',P.poste.t);
    [-.8,0,.8].forEach(x=>line(sag([.2+x*.6,2.95,1],[4.4+x,8.7,.4],.5),0x333333));
    line(sag([-3.8,5.4,.4],[4.4,5.4,.58],.7),0x111111);line(sag([4.4,5.4,.58],[11,5.6,-2],.4),0x111111);
    // padrão de entrada
    const pe=grp(7.4,0,2.2);cyl(.09,.11,3.6,'#a3a8ad',0,1.8,0,pe);boxB(.5,.6,.25,'#d9dde0',0,1.2,.15,pe);plate(['kWh'],.3,.14,{bg:'#20313f',fg:'#9fe0b0'},0,1.55,.28,pe);
    hot(pe,'medicao',P.medicao.t);line(sag([4.4,7.4,.4],[7.4,3.5,2.2],.35),0x333333);
    // cabine primária, indústria e gerador
    const cb=grp(10,0,-3.4);boxB(2.6,2.6,2.2,'#e3e0d8',0,0,0,cb);boxB(.8,1.9,.04,'#5c6b77',0,0,1.11,cb);plate(['PERIGO','13,8 kV'],.6,.4,{bg:'#f2c200',fg:'#111',border:'#111'},0,2.15,1.12,cb);
    hot(cb,'cabine',P.cabine.t);
    const ind=grp(14,0,.6);boxB(6,4.2,5,'#cfd3d6',0,0,0,ind);const roof=box(6.3,.25,5.4,'#8e989f',0,4.45,0,ind);roof.rotation.z=.04;
    boxB(2,2.6,.05,'#68767f',-1.4,0,2.51,ind);plate(['QGBT 380 V'],1.4,.36,{bg:'#20313f',fg:'#fff'},1.4,2.9,2.52,ind);
    hot(ind,'consumo',P.consumo.t);
    const gg=grp(13.6,0,4.6);boxB(1.8,1.1,.9,'#c9a227',0,0,0,gg);cyl(.07,.07,.7,'#555',.6,1.45,0,gg);plate(['GMG'],.5,.22,{bg:'#1b1b1b',fg:'#f2c200'},0,.7,.456,gg);
    hot(gg,'gerador',P.gerador.t);
    line(sag([10,2.6,-2.3],[11.8,3.4,-1.9],.2),0x333333);
    G.tick=t=>{if(blades)blades.rotation.z=t*1.1;};
  }

  function fxTile(V,ac){const f=faixa(V,ac);return `<div class="tile full"><span class="tk">Faixa de tensão · glossário</span><span class="tv">${f}</span><span class="ts">${FX[f].n} ${R(FX[f].r)}</span></div>`;}
  function evaluate(){const V=cls.u==='kV'?cls.v*1000:cls.v;const kV=V/1000;const f=faixa(V,cls.ac);const mtat=f==='MT'||f==='AT';const sep=cls.w==='sep';
    const out=[];out.push(fxTile(V,cls.ac));
    if(f==='EBT'&&!cls.ac2){out.push(`<div class="tile full good"><span class="tk">NR-10 se aplica?</span><span class="tv">Não</span><span class="ts">Extrabaixa tensão fica fora, exceto para as medidas contra explosão e incêndio. ${R('10.2.4')}${R('10.6.6')}</span></div>`);return {html:out.join(''),f};}
    if(f==='EBT')out.push(`<div class="tile full"><span class="tk">NR-10 se aplica?</span><span class="tv">Só 10.6.6</span><span class="ts">EBT em área classificada: aplicam-se as medidas contra explosão e incêndio. ${R('10.2.4')}${R('10.6.6')}</span></div>`);
    const zi=zoneRow(kV);
    if(f!=='EBT')out.push(zi<0?`<div class="tile full alert"><span class="tk">Zonas · Anexo II</span><span class="tv">Fora da tabela</span><span class="ts">A tabela vai até 700 kV.</span></div>`:
      `<div class="tile"><span class="tk">Rr · zona de risco</span><span class="tv num">${fmt(ZTAB[zi][2])} m</span><span class="ts">Faixa ${ZTAB[zi][4]} ${R('AII')}</span></div><div class="tile"><span class="tk">Rc · zona controlada</span><span class="tv num">${fmt(ZTAB[zi][3])} m</span><span class="ts">Em trifásico, use a tensão entre fases.</span></div>`);
    // treinamentos
    let tr=[];let note='';
    if(cls.a==='naoel'){tr=[];note=`Atividade não elétrica na zona livre: a organização faz análise de risco e dá instrução formal. ${R('10.14.1.2')} EPI de arco pode ser dispensado se a análise de risco indicar ausência de exposição. ${R('10.11.2.4')}`;}
    else if(cls.es){tr=[['Específico e pontual',8,'10.9.8']];note='Até 30 dias corridos, com acompanhamento presencial e permanente de trabalhador autorizado, sob responsabilidade de PLH.';}
    else if(cls.a==='comp'){tr=[['Específico de compartilhamento de infraestrutura do SEP',40,'10.9.9']];note=`Dispensa o Básico e o Complementar SEP. ${R('10.9.4')}${R('10.9.5')}`;}
    else{tr=[['Básico',40,'10.9.4']];if(sep)tr.push(['Complementar do SEP',40,'10.9.5']);if(!sep&&mtat)tr.push(['Complementar de MT/AT - SEC',16,'10.9.6']);}
    if(cls.ac2&&cls.a!=='naoel')tr.push(['Complementar de Área Classificada',16,'10.9.7']);
    const tot=tr.reduce((s,x)=>s+x[1],0);
    out.push(`<div class="tile full"><span class="tk">Treinamentos iniciais · Quadro I</span>${tr.length?`<ul>${tr.map(x=>`<li>${x[0]}: <b class="num">${x[1]} h</b> ${R(x[2])}</li>`).join('')}</ul><span class="ts">Total inicial: <b class="num">${tot} h</b>. Depois, periódico bienal de 16 h ${R('10.9.10')} e eventual quando couber ${R('10.9.11')}. ${note}</span>`:`<span class="ts">${note}</span>`}</div>`);
    if(cls.a!=='naoel'&&!cls.es){const cap=cls.a==='comp'?[['Compartilhamento de infraestruturas do SEP',24]]:[['Fundamentos de eletricidade básica',40],['Qualidade, saúde e meio ambiente',16],sep?['Fundamentos de SEP',40]:['Sistema elétrico de consumo',24]];
      out.push(`<div class="tile full"><span class="tk">Se for trabalhador-capacitado · módulos</span><ul>${cap.map(x=>`<li>${x[0]}: <b class="num">${x[1]} h</b></li>`).join('')}</ul><span class="ts">Mais os módulos de tarefas específicas definidos pela organização. ${R('10.8.4')}</span></div>`);}
    const pie=sep||mtat;
    out.push(`<div class="tile ${pie?'alert':''}"><span class="tk">PIE</span><span class="tv">${pie?'Obrigatório':'Não exigido'}</span><span class="ts">${pie?(sep?'Integra o SEP':'Atividade em MT/AT'):'Não é SEP nem MT/AT'} ${R('10.15.6')}</span></div>`);
    const ind=sep||mtat;
    out.push(`<div class="tile ${ind?'alert':''}"><span class="tk">Serviço individual</span><span class="tv">${ind?'Proibido':'Não vedado pelo 10.14.2'}</span><span class="ts">${ind?(sep?'Todo serviço no SEP':'Energizado em MT/AT'):'Decide-se na análise de risco'} ${R('10.14.2')}</span></div>`);
    if(mtat)out.push(`<div class="tile full"><span class="tk">Energizado dentro da ZR</span><span class="ts">Bloquear o religamento automático e sinalizar a desativação ${R('10.14.3')}${R('10.14.3.1')}. Ferramentas e dispositivos isolantes de MT/AT passam por ensaio dielétrico ${R('10.14.4')}.</span></div>`);
    else out.push(`<div class="tile full"><span class="tk">Ensaios dielétricos em BT</span><span class="ts">Luvas e mangas isolantes e EPC isolantes de baixa tensão também são ensaiados, no máximo anualmente quando não houver outra previsão. ${R('10.14.4')}${R('10.14.4.1')}</span></div>`);
    out.push(`<div class="tile full"><span class="tk">Arco elétrico</span><span class="ts">A NR-10 vale também quando há exposição ao arco, mesmo sem entrar na zona controlada. ${R('10.2.3')}${R('10.11.2')}</span></div>`);
    return {html:out.join(''),f};}

  const QS=[
    {q:'String fotovoltaica de 1.200 Vcc em uma usina solar. Em que faixa ela está?',o:['EBT','BT','MT','AT'],a:1,x:'Em corrente contínua, a BT vai de mais de 120 V até 1.500 V. 1.200 Vcc é BT.',r:['g-bt']},
    {q:'Cabine primária de 13,8 kV. Faixa pela NR-10?',o:['BT','MT','AT'],a:1,x:'MT vai de mais de 1.000 V CA até 36.200 V CA (glossário).',r:['g-mt']},
    {q:'Rack de telecom em 48 Vcc, fora de área classificada. A NR-10 se aplica?',o:['Sim, integralmente','Não: é extrabaixa tensão','Só o capítulo de EPI'],a:1,x:'48 Vcc não passa de 120 Vcc, logo é EBT. O 10.2.4 exclui a EBT, exceto para o 10.6.6 (explosão e incêndio).',r:['10.2.4','g-ebt']},
    {q:'Supermercado com 300 kW instalados, alimentado em 380 V, sem atividade em MT. O PIE é obrigatório pela NR-10?',o:['Sim, porque passa de 75 kW','Não: o PIE é exigido de quem integra o SEP ou atua em MT/AT','Sim, todo estabelecimento comercial'],a:1,x:'O 10.15.6 exige o PIE de quem integra o SEP ou realiza atividades em MT/AT; a carga instalada não é critério. Projeto e documentação de aterramento continuam exigidos.',r:['10.15.6','10.15.3']},
    {q:'Equipe de provedor instala fibra óptica em postes da distribuidora. Qual treinamento inicial?',o:['Básico 40 h + Complementar SEP 40 h','Específico de compartilhamento de infraestrutura do SEP, 40 h','Nenhum: não mexem na rede elétrica'],a:1,x:'O 10.9.9 cria o treinamento específico, e os itens 10.9.4 e 10.9.5 dispensam Básico e Complementar SEP de quem o faz.',r:['10.9.9','10.9.4','10.9.5']},
    {q:'Até onde vai o Sistema Elétrico de Potência?',o:['Até a subestação da distribuidora','Até a medição, inclusive','Até o quadro geral do consumidor'],a:1,x:'Pelo glossário, o SEP compreende geração, transmissão e distribuição até a medição, inclusive.',r:['g-sep']},
    {q:'Linha de 138 kV. Quais são Rr e Rc?',o:['1,10 m e 3,10 m','1,20 m e 3,20 m','1,60 m e 3,60 m'],a:1,x:'138 kV cai na faixa ≥ 132 e < 150 kV do Anexo II.',r:['AII']},
    {q:'Serviço energizado em um QGBT de 380 V de uma indústria (SEC). O item 10.14.2 proíbe fazê-lo sozinho?',o:['Sim','Não: o 10.14.2 vale para energizado em MT/AT e para serviços no SEP'],a:1,x:'A vedação do trabalho individual alcança energizado em MT/AT e qualquer serviço no SEP. Em BT no SEC, a decisão sai da análise de risco.',r:['10.14.2','10.7.3']}
  ];

  const mod={id:'enq',phase:'I',name:'Enquadramento',short:'Enquadramento',scene:'Do gerador à tomada',primer:{logic:"A norma liga três chaves: onde você está (SEP ou SEC), em que faixa de tensão (EBT, BT, MT ou AT) e o que você faz (serviço, trabalho em proximidade, compartilhamento de infraestrutura ou atividade não elétrica). Cada combinação dispara obrigações em capítulos diferentes. Quase toda questão de prova começa por esse enquadramento, mesmo quando não diz.",links:[["zonas", "A faixa de tensão escolhe a linha do Anexo II e, com ela, os raios Rr e Rc.", ["AII"]], ["pessoas", "SEP, SEC e MT/AT decidem quais treinamentos iniciais a pessoa faz.", ["10.9.5", "10.9.6"]], ["documentacao", "Integrar o SEP ou atuar em MT/AT obriga o PIE.", ["10.15.6"]], ["energizado", "Energizado em MT/AT ou qualquer serviço no SEP nunca é individual.", ["10.14.2"]]]},
    brief:'Onde a NR-10 se aplica, em que faixa de tensão você está e o que isso dispara: zonas, treinamentos, PIE e restrições de trabalho.',
    base:['10.1.1','10.2.1','10.2.4','g-sep','AII'],
    cam:{theta:.32,phi:1.08,r:34,t:[0,2.5,0],rMax:70},
    reset(){blades=null;},build,
    onPick(id){const p=P[id];if(!p)return false;seen.add(id);
      fb({k:'info',t:p.t,b:p.b+`<div class="row-actions" style="margin-top:8px"><button type="button" class="btn" data-pre="${id}">Levar ao classificador</button></div>`,r:p.r});toast(p.t);
      if(activeTask()==='a')selectTask(UI.task);return true;},
    tasks:[
      {id:'a',title:'Cadeia',render(el,api){const n=order.filter(k=>seen.has(k)).length;
        el.innerHTML=`<p class="lead">Clique nos oito marcadores da cena, da geração à tomada. Cada ponto mostra o que muda na aplicação da norma. O chão azul é SEP; o bege é SEC.</p>
        <div class="prog"><span class="num">${n}/8</span><div class="bar"><i style="width:${n/8*100}%"></i></div></div>
        <div class="who">${order.map(k=>`<button type="button" class="${seen.has(k)?'done':''}" data-go="${k}"><i style="background:${seen.has(k)?'var(--ok)':'var(--line)'}"></i>${P[k].t.split(' ')[0]} ${P[k].t.split(' ')[1]||''}</button>`).join('')}</div>`;
        $$('[data-go]',el).forEach(b=>b.onclick=()=>{markVisited(b.dataset.go);mod.onPick(b.dataset.go);});
        if(n===8)api.done();}},
      {id:'b',title:'Classificador',render(el,api){
        el.innerHTML=`<p class="lead">Informe a instalação e a atividade. O resultado aponta os itens que se aplicam. Clicar em "Levar ao classificador" num ponto da cena preenche este formulário.</p>
        <div class="form">
          <div class="fld"><label for="c1v">Tensão nominal</label><div class="inline"><input id="c1v" type="number" min="0" step="any" value="${cls.v}"><select id="c1u" aria-label="Unidade"><option ${cls.u==='V'?'selected':''}>V</option><option ${cls.u==='kV'?'selected':''}>kV</option></select></div></div>
          <div class="fld"><span class="fl">Corrente</span><div class="seg" id="c1ac"><button type="button" data-v="1" aria-pressed="${cls.ac}">CA</button><button type="button" data-v="0" aria-pressed="${!cls.ac}">CC</button></div></div>
          <div class="fld full"><label for="c1w">Onde</label><select id="c1w"><option value="sep" ${cls.w==='sep'?'selected':''}>SEP · geração, transmissão, distribuição até a medição</option><option value="sec" ${cls.w==='sec'?'selected':''}>SEC · depois da medição</option></select></div>
          <div class="fld full"><label for="c1a">Atividade</label><select id="c1a">
            <option value="servico">Serviço em eletricidade na instalação</option><option value="prox">Trabalho em proximidade (pode entrar na ZC)</option>
            <option value="comp">Compartilhamento de infraestrutura (telecom em postes)</option><option value="naoel">Atividade não elétrica na zona livre</option></select></div>
          <label class="chk"><input type="checkbox" id="c1x" ${cls.ac2?'checked':''}> Área classificada</label>
          <label class="chk"><input type="checkbox" id="c1e" ${cls.es?'checked':''}> Estrangeiro em serviço pontual</label>
        </div><div class="out" id="c1out"></div><div class="prog" id="c1p"></div>`;
        $('#c1a',el).value=cls.a;
        const upd=()=>{cls.v=parseFloat($('#c1v',el).value)||0;cls.u=$('#c1u',el).value;cls.w=$('#c1w',el).value;cls.a=$('#c1a',el).value;cls.ac2=$('#c1x',el).checked;cls.es=$('#c1e',el).checked;
          const r=evaluate();$('#c1out',el).innerHTML=r.html;seenFx.add(r.f);
          $('#c1p',el).innerHTML=`Faixas exploradas: <b>${['EBT','BT','MT','AT'].filter(x=>seenFx.has(x)).join(' · ')||'—'}</b> (meta: as quatro)`;if(seenFx.size>=4)api.done();};
        $$('input,select',el).forEach(i=>i.addEventListener('input',upd));
        $$('#c1ac button',el).forEach(b=>b.onclick=()=>{cls.ac=b.dataset.v==='1';$$('#c1ac button',el).forEach(x=>x.setAttribute('aria-pressed',x===b));upd();});
        upd();}},
      {id:'c',title:'Casos',render(el,api){quiz(el,api,QS);}}
    ]};
  document.addEventListener('click',e=>{const b=e.target.closest('[data-pre]');if(!b||!G.mod||G.mod.id!=='enq')return;const p=P[b.dataset.pre].pre;
    Object.assign(cls,{v:p.v,u:p.u,ac:p.ac,w:p.w,a:p.a,ac2:false,es:false});gotoTask('b');if(activeTask()==='b')selectTask(UI.task);});
  QB.add('enq',QS);
  return mod;})());
