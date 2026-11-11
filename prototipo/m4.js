/* ===== Camada 4 · Proteção coletiva e individual ===== */
(()=>{
  let man=null,X={},cat=2,passed=new Set();
  let dress={roupa:'comum',cabeca:'none',capacete:true,oculos:false,auricular:false,luvas:'none',calcado:'aco',adornos:true};
  const INFO={
    q220:{t:'Painel 220 V',b:'Pelo Quadro I do Anexo IV, painéis de até 240 V, com até 25 kA, eliminação em 0,03 s e 455 mm de distância de trabalho, pedem Categoria 1.',r:['AIV-I']},
    qgbt:{t:'Painel 440 V',b:'Painéis acima de 240 V até 600 V, com até 25 kA, 0,03 s e 455 mm: Categoria 2. Acima desses limites a tabela deixa de valer.',r:['AIV-I','10.11.2.2']},
    ccm:{t:'CCM 480 V',b:'CCM classe 600 V tem duas linhas: 65 kA com 0,03 s (Cat. 2) e 42 kA com 0,33 s (Cat. 4). O tempo de eliminação muda tudo.',r:['AIV-I']},
    mc:{t:'Cubículo metal-clad 13,8 kV',b:'Aparelhagem revestida de metal de 1 a 15 kV, até 35 kA, 0,24 s, 910 mm: Categoria 4. Se for resistente a arco, com portas fechadas e travadas e dentro da classificação, a categoria é N/A.',r:['AIV-I','10.6.5']},
    bat:{t:'Banco de baterias 220 Vcc',b:'O Quadro II cobre fontes CC acima de 150 V até 600 V. Sem dispositivo de proteção conhecido, assume-se arco de 2 s.',r:['AIV-II']},
    tapete:{t:'Tapete isolante',b:'Proteção coletiva isolante. Como EPC isolante de baixa tensão, passa por ensaio dielétrico.',r:['10.14.4','10.12.6']},
    man:{t:'Eletricista no vestiário',b:'Vista o trabalhador na tarefa C e confira contra a categoria escolhida.',r:['AIV-III']}};
  function build(){
    const fl=boxB(10,.02,4,'#9aa4ad',0,0,-2.6,null,{transparent:true,opacity:.35});fl.castShadow=false;
    const q=grp(-5.6,0,-3.6);boxB(.9,1.1,.25,'#d6d9dc',0,.9,0,q);plate(['PAINEL 220 V'],.5,.14,{bg:'#20313f',fg:'#fff'},0,1.85,.13,q);hot(q,'q220',INFO.q220.t);
    const g=grp(-3.4,0,-3.6);for(let i=0;i<3;i++){boxB(.8,2.1,.6,'#cfd3d6',(i-1)*.82,0,0,g);box(.02,.6,.02,'#555',(i-1)*.82+.3,1.1,.31,g);}plate(['PAINEL 440 V'],1.1,.2,{bg:'#20313f',fg:'#fff'},0,2.25,.31,g);hot(g,'qgbt',INFO.qgbt.t);
    const c=grp(-.6,0,-3.6);boxB(1.6,2.2,.6,'#c3c9ce',0,0,0,c);for(let r=0;r<6;r++)for(let k=0;k<2;k++)box(.7,.28,.02,'#e3e6e9',(k-.5)*.76,.35+r*.31,.31,c);plate(['CCM 480 V'],.8,.2,{bg:'#20313f',fg:'#fff'},0,2.33,.31,c);hot(c,'ccm',INFO.ccm.t);
    const m=grp(2.4,0,-3.6);boxB(1.1,2.5,1,'#9aa6b0',0,0,0,m);box(.9,.9,.02,'#8d99a3',0,1.6,.51,m);plate(['PERIGO','13,8 kV'],.5,.32,{bg:'#f2c200',fg:'#111',border:'#111'},0,2.25,.511,m);hot(m,'mc',INFO.mc.t);
    const b=grp(4.9,0,-3.6);boxB(1.6,.08,.7,'#6b5a3a',0,0,0,b);boxB(1.6,.08,.7,'#6b5a3a',0,.75,0,b);boxB(1.6,.08,.7,'#6b5a3a',0,1.5,0,b);
    for(let r=0;r<3;r++)for(let k=0;k<5;k++)boxB(.26,.4,.5,'#1f1f1f',-.62+k*.31,.1+r*.75,0,b);plate(['BATERIAS 220 Vcc'],1.2,.2,{bg:'#20313f',fg:'#fff'},0,2.05,.36,b);hot(b,'bat',INFO.bat.t);
    const tp=boxB(5,.03,.9,'#2a2a2a',-2,0,-2.6);hot(tp,'tapete',INFO.tapete.t,{dy:.2});
    const ped=cyl(.6,.6,.12,'#8e989f',0,.06,1.4,null);
    man=person({x:0,z:1.4,shirt:'#2f5d8a',pants:'#28465f'});man.g.position.y=.12;const P=man.P;X={};
    X.hood=box(.38,.46,.36,'#b9a67e',0,1.7,0,man.g);X.visor=box(.26,.14,.02,'#20313f',0,1.7,.185,man.g,{metalness:.4,roughness:.2});
    X.shield=box(.3,.26,.02,'#9ccbe0',0,1.66,.2,man.g,{transparent:true,opacity:.5});X.shbar=box(.32,.03,.06,'#333',0,1.8,.17,man.g);
    X.bal=sph(.142,'#222b33',0,1.67,0,man.g);X.glass=box(.24,.05,.03,'#111',0,1.69,.125,man.g);
    X.earL=cyl(.05,.05,.04,'#c0392b',-.145,1.68,0,man.g);X.earL.rotation.z=Math.PI/2;X.earR=cyl(.05,.05,.04,'#c0392b',.145,1.68,0,man.g);X.earR.rotation.z=Math.PI/2;
    X.ring=addMesh(new THREE.TorusGeometry(.03,.009,8,16),M('#d4af37',{metalness:.9,roughness:.2}),0,-.62,.05,P.shL);
    X.watch=box(.1,.05,.1,'#d4af37',0,-.52,0,P.shR,{metalness:.9,roughness:.25});
    P.shL.rotation.z=.12;P.shR.rotation.z=-.12;
    hot(man.g,'man','Eletricista · vestir EPI',{dy:.25});applyDress();
  }
  const SUIT={comum:['#2f5d8a','#28465f',1],ar4:['#24476b','#1f3a57',1],ar8:['#1d3a5c','#1a3049',1.03],ar25:['#b9a67e','#b9a67e',1.12],ar40:['#a8926a','#a8926a',1.16]};
  function applyDress(){if(!man)return;const P=man.P,s=SUIT[dress.roupa];
    [P.torso,P.armL,P.armR].forEach(m=>m.material.color.set(s[0]));[P.legL,P.legR].forEach(m=>m.material.color.set(s[1]));
    P.torso.scale.set(s[2],1,s[2]);[P.legL,P.legR,P.armL,P.armR].forEach(m=>m.scale.set(s[2],1,s[2]));
    X.hood.visible=X.visor.visible=dress.cabeca==='hood';X.shield.visible=X.shbar.visible=dress.cabeca==='shield'||dress.cabeca==='shieldbal';X.bal.visible=dress.cabeca==='shieldbal';
    P.helmet.visible=P.brim.visible=dress.capacete;if(dress.cabeca==='hood'){P.helmet.position.y=1.95;P.brim.position.y=1.952;}else{P.helmet.position.y=1.71;P.brim.position.y=1.712;}
    X.glass.visible=dress.oculos&&dress.cabeca!=='hood';X.earL.visible=X.earR.visible=dress.auricular&&dress.cabeca!=='hood';
    const gl={none:'#c48f6c',couro:'#7a4e2d',isol:'#e67e22'}[dress.luvas];[P.handL,P.handR].forEach(h=>{h.material.color.set(gl);h.scale.setScalar(dress.luvas==='none'?1:1.35);});
    [P.bootL,P.bootR].forEach(b=>b.material.color.set(dress.calcado==='aco'?'#59626a':'#3b2c22'));
    X.ring.visible=X.watch.visible=dress.adornos;}
  function checkDress(){const req=[4,8,25,40][cat-1];const atpv={comum:0,ar4:4,ar8:8,ar25:25,ar40:40}[dress.roupa];const out=[];
    out.push([atpv>=req,`Vestimenta AR com ATPV/EBT de pelo menos ${req} cal/cm²${cat>=3?' em traje completo':''}`,atpv?`você escolheu ${atpv} cal/cm²`:'uniforme comum não tem resistência ao arco',['AIV-III','10.11.3']]);
    const head={1:['shield','shieldbal','hood'],2:['shieldbal','hood'],3:['hood'],4:['hood']}[cat];
    out.push([head.includes(dress.cabeca),cat===1?'Protetor facial AR ou capuz AR':cat===2?'Capuz completo AR, ou protetor facial AR com balaclava AR':'Capuz carrasco completo AR','',['AIV-III']]);
    out.push([dress.capacete,'Capacete de segurança','',['AIV-III']]);
    out.push([dress.oculos,'Óculos de proteção ou de ampla visão','seleção obrigatória (SO)',['AIV-III']]);
    out.push([dress.auricular,'Protetor auricular','exigido quando há risco de ruído ou explosão por arco',['AIV-III']]);
    out.push([dress.luvas!=='none','Luvas de couro espessas, luvas AR ou isolantes de borracha com cobertura','',['AIV-III']]);
    out.push([cat===1||dress.calcado==='couro','Calçado de couro, resistente ao calor, sem metal exposto',cat===1?'na Categoria 1 é "conforme necessário" (CN)':'',['AIV-III']]);
    out.push([!dress.adornos,'Sem adornos pessoais','aliança, anel, relógio e qualquer outro adorno pessoal são vedados',['10.7.8','10.7.8.1']]);
    return out;}
  const ORD=[{k:'des',l:'Desenergização',r:'10.5.1'},{k:'epc',l:'Proteção coletiva',r:'10.6.1'},{k:'adm',l:'Medidas administrativas',r:'10.7.1'},{k:'epi',l:'Proteção individual',r:'10.11.1'}];
  const MED=[
    {t:'Isolação das partes vivas',a:'bas',r:['10.6.2']},{t:'Barreiras ou invólucros',a:'bas',r:['10.6.2']},{t:'Limitação da tensão',a:'bas',r:['10.6.2']},
    {t:'Obstáculos',a:'par',r:['10.6.2.1']},{t:'Colocação fora do alcance',a:'par',r:['10.6.2.1']},
    {t:'Seccionamento automático da alimentação',a:'sup',r:['10.6.3']},{t:'Infraestrutura de aterramento',a:'sup',r:['10.6.3']},{t:'Equipotencialização',a:'sup',r:['10.6.3']},
    {t:'Separação elétrica',a:'sup',r:['10.6.3']},{t:'Isolação suplementar',a:'sup',r:['10.6.3']},
    {t:'DDR de alta sensibilidade',a:'adi',r:['10.6.4','g-adic']},
    {t:'Painel resistente a arco elétrico',a:'arc',r:['10.6.5']},{t:'Tempos de interrupção muito curtos',a:'arc',r:['10.6.5']},{t:'Fechaduras com chaves não intercambiáveis',a:'arc',r:['10.6.5']}];
  const OPC=['Categoria 1','Categoria 2','Categoria 3','Categoria 4','N/A · resistente a arco, portas fechadas','Fora do Anexo IV · estudo de energia incidente'];
  const SC=[
    {q:'Painel 220 V · Icc 18 kA · eliminação 0,03 s · trabalho a 455 mm',o:OPC,a:0,x:'Linha dos painéis de até 240 V: até 25 kA, 0,03 s, 455 mm → Categoria 1 (mínimo 4 cal/cm²).',r:['AIV-I']},
    {q:'Painel 440 V · Icc 22 kA · 0,03 s · 455 mm',o:OPC,a:1,x:'Painéis acima de 240 V até 600 V, até 25 kA → Categoria 2 (mínimo 8 cal/cm²).',r:['AIV-I']},
    {q:'CCM 480 V · Icc 40 kA · eliminação 0,30 s · 455 mm',o:OPC,a:3,x:'Cabe na linha CCM 42 kA e 0,33 s → Categoria 4. Com 0,03 s seria Categoria 2: o tempo de eliminação pesa mais que a corrente.',r:['AIV-I']},
    {q:'Cubículo metal-clad 13,8 kV · Icc 31,5 kA · 0,20 s · 910 mm',o:OPC,a:3,x:'Aparelhagem revestida de metal de 1 a 15 kV, até 35 kA e 0,24 s → Categoria 4.',r:['AIV-I']},
    {q:'Banco de baterias 220 Vcc · Icc 4 kA · sem dispositivo de proteção conhecido · trabalho a 455 mm',o:OPC,a:2,x:'Quadro II: de 3 a menos de 7 kA → Categoria 3. Sem dispositivo de proteção, assume-se arco de 2 s.',r:['AIV-II']},
    {q:'Painel 380 V · Icc 50 kA · eliminação 0,10 s · 455 mm',o:OPC,a:5,x:'Nenhuma linha cobre 50 kA com 0,10 s: painéis vão até 25 kA, quadros de distribuição até 35 kA, e as linhas de 65 kA exigem 0,03 s. Qualquer parâmetro pior impede o Anexo IV, e a organização faz estudo de energia incidente. Atenção à tradução: no Quadro I, "painéis" e "quadros de distribuição de 600 V" são linhas diferentes (a segunda leva à Categoria 4).',r:['10.11.2.2','10.11.2.3','10.6.5']},
    {q:'Painel 220 V · Icc 20 kA · 0,03 s · 455 mm · protegido por fusível limitador de corrente de 160 A. Qual a menor categoria que o Anexo IV admite?',o:OPC,a:0,x:'A nota permite reduzir uma categoria quando há fusível ou disjuntor limitador de até 200 A, mas nunca abaixo da Categoria 1.',r:['AIV-I']},
    {q:'Painel 440 V · Icc 20 kA · 0,03 s · 455 mm · protegido por disjuntor termomagnético limitador de corrente de 100 A. Qual a menor categoria que o Anexo IV admite?',o:OPC,a:0,x:'Categoria 2 da linha; a nota permite reduzir uma categoria com limitador de corrente de até 200 A → Categoria 1.',r:['AIV-I']},
    {q:'Cubículo 13,8 kV resistente a arco · Icc 25 kA · 0,20 s · portas fechadas e travadas · dentro da classificação do equipamento',o:OPC,a:4,x:'Para equipamentos resistentes a arco nessas condições, a categoria é N/A.',r:['AIV-I','10.6.5']},
    {q:'O mesmo cubículo resistente a arco (25 kA, 0,20 s, 910 mm), mas com a porta aberta para extrair o disjuntor',o:OPC,a:3,x:'Com portas abertas vale a linha do equipamento não resistente a arco: aparelhagem revestida de metal 1–15 kV → Categoria 4.',r:['AIV-I']}];

  const CQ=[
    {q:'Como regra, a proteção coletiva contra choque é assegurada por quê?',o:['Só pela proteção básica','Pela aplicação conjunta de proteção básica e supletiva, por meios independentes ou por medida que garanta as duas','Pelo DDR, que substitui as demais'],a:1,x:'Duas camadas independentes: uma impede o contato com a parte viva, a outra impede que a massa fique perigosa se a primeira falhar. Só nas condições das normas técnicas, descritas no memorial, admite-se uma delas.',r:['10.6.1.1','10.6.1.2']},
    {q:'Obstáculos e colocação fora do alcance são classificados como…',o:['proteção básica completa','proteção parcial, aplicável conforme normas técnicas','proteção supletiva'],a:1,x:'O obstáculo impede o contato acidental, mas não o contato deliberado. Por isso a norma o chama de proteção parcial.',r:['10.6.2.1','g-adic']},
    {q:'Qual destas NÃO está entre as medidas coletivas contra arco do 10.6.5?',o:['Painel resistente a arco','Seleção de tempos de interrupção muito curtos','Vestimenta AR de categoria 2','Chave de aterramento resistente ao curto-circuito presumido'],a:2,x:'Vestimenta é EPI, último nível da hierarquia (10.11). As demais alternativas são medidas coletivas do 10.6.5.',r:['10.6.5','10.11.2']},
    {q:'Um motor à prova de explosão foi reparado e volta para a área classificada. O que a norma exige?',o:['Nada, se o reparo foi bem feito','Seleção e manutenção conforme o estudo de classificação de áreas e certificado segundo as normas técnicas','Apenas novo ensaio dielétrico'],a:1,r:['10.6.6.1.1']},
    {q:'Serviço em eletricidade dentro de área classificada exige…',o:['só procedimento de trabalho','permissão de trabalho precedida de análise de risco, procedimento de trabalho e trabalhador autorizado','só treinamento Complementar de Área Classificada'],a:1,x:'Note que aqui a PT é obrigatória mesmo que a atividade seja rotineira. O treinamento complementar de 16 h também é exigido, pelo 10.9.7.',r:['10.6.6.1.2','10.9.7']},
    {q:'Um processo acumula eletricidade estática capaz de provocar ignição. O que a norma pede?',o:['Sinalização apenas','Proteção específica e dispositivos de descarga elétrica, conforme projeto','EPI antiestático para todos'],a:1,r:['10.6.6.2']},
    {q:'Proteção contra sobretensões e contra descargas atmosféricas são…',o:['opcionais','medidas de proteção coletiva definidas em projeto, observando as normas técnicas citadas no 10.2.1','responsabilidade exclusiva da concessionária'],a:1,r:['10.6.7','10.6.8','10.2.1']},
    {q:'Instalação elétrica de área classificada sem medidas de proteção coletiva caracteriza…',o:['não conformidade comum','grave e iminente risco, com embargo ou interdição sem a metodologia da NR-3','infração apenas da NR-23'],a:1,r:['10.16.1','10.6.6.1']}];
  const coletiva={id:'coletiva',phase:'II',name:'Proteção coletiva',short:'Coletiva',scene:'Sala de painéis',primer:{logic:"A hierarquia do 10.5.4 manda eliminar o perigo (desenergizar) antes de tudo; depois proteger o coletivo; depois organizar o trabalho; e só então proteger o indivíduo. Contra choque, a proteção coletiva combina duas camadas independentes: a básica impede tocar a parte viva, a supletiva impede que a massa fique perigosa se a isolação falhar. O DDR é a camada adicional onde o perigo é maior. Arco, explosão, surtos e raios têm caminhos próprios.",links:[["projeto", "As medidas coletivas são escolhidas no projeto.", ["10.4.4", "10.6.4"]], ["organizacao", "Quando a coletiva não basta ou ainda está em implantação, entram as medidas administrativas.", ["10.5.4"]], ["individual", "A distância segura do 10.6.5 a e o EPI fora do Anexo IV saem do mesmo estudo de energia incidente.", ["10.6.5", "10.11.2.3"]], ["documentacao", "Área classificada sem proteção coletiva é grave e iminente risco.", ["10.16.1"]]]},
    brief:'Ordene a hierarquia de controle e classifique cada medida coletiva pela função que ela cumpre: básica, parcial, supletiva, adicional ou contra arco. Depois, explosão, eletricidade estática, surtos e raios.',
    base:['10.5.1','10.5.4','10.6.1','10.6.1.1','10.6.5','10.6.6'],
    cam:{theta:.15,phi:1.15,r:12.5,t:[0,1.2,-1.4],rMax:28},
    reset(){man=null;},build,info:INFO,
    onPick(id){if(id==='man'){fb({k:'info',t:'Vestiário',b:'O EPI é o último nível da hierarquia e tem módulo próprio, logo depois de Pessoas.',extra:'<div class="row-actions" style="margin-top:6px"><button type="button" class="btn" data-mod="individual">Ir para Proteção individual</button></div>'});toast('Vestiário');return true;}return false;},
    tasks:[{id:'a',title:'Hierarquia',render(el,api){let step=0;
        el.innerHTML=`<p class="lead">Clique nas quatro medidas na ordem de prioridade que a norma impõe.</p><div class="order" id="m4o"></div><div id="m4of"></div><div id="m4cl"></div>`;
        const shuffled=[ORD[3],ORD[1],ORD[0],ORD[2]];
        const draw=()=>{$('#m4o',el).innerHTML=shuffled.map(o=>{const i=ORD.indexOf(o);return `<button type="button" class="${i<step?'done':''}" data-k="${o.k}">${i<step?`<span class="n">${i+1}º</span>`:''}${o.l}</button>`;}).join('');
          $$('#m4o button',el).forEach(b=>b.onclick=()=>{const i=ORD.findIndex(o=>o.k===b.dataset.k);if(i<step)return;
            if(i===step){step++;draw();if(step===4){$('#m4of',el).innerHTML=cardHTML({k:'ok',t:'Ordem correta',b:'Desenergização é a prioridade. Se não for possível, proteção coletiva. Se esta não bastar, estiver em implantação ou for complementar, vêm as medidas administrativas e, por último, o EPI. A ordem segue a da NR-1.',r:['10.5.1','10.5.4','10.5.3']});part2();}}
            else $('#m4of',el).innerHTML=cardHTML({k:'err',t:'Ainda não',b:`A próxima na hierarquia é outra. "${ORD[i].l}" vem em ${i+1}º lugar.`,r:['10.5.4']});});};
        const part2=()=>{const w=$('#m4cl',el);w.innerHTML='<div class="h3">Classifique cada medida coletiva</div>';const box=document.createElement('div');w.appendChild(box);
          classify(box,api,{id:'med',options:[{v:'bas',l:'Básica (contato direto)'},{v:'par',l:'Parcial'},{v:'sup',l:'Supletiva (contato indireto)'},{v:'adi',l:'Adicional'},{v:'arc',l:'Contra arco'}],items:MED});};
        draw();}},
      {id:'b',title:'Arco, Ex e surtos',render(el,api){quiz(el,api,CQ);}}]};
  const individual={id:'individual',phase:'II',name:'Proteção individual e arco',short:'Individual',scene:'Sala de painéis e vestiário',primer:{logic:"Último nível da hierarquia. Para o arco, a categoria sai do Anexo IV só quando equipamento, corrente de falta, tempo de eliminação e distância de trabalho cabem juntos na mesma linha. Qualquer parâmetro pior tira a situação da tabela e exige estudo de energia incidente. Os itens de cada categoria estão no Quadro III.",links:[["coletiva", "O EPI só entra depois das medidas coletivas e administrativas.", ["10.5.4", "10.11.1"]], ["projeto", "O estudo de energia incidente nasce no projeto.", ["10.4.12"]], ["organizacao", "Adornos são vedados e a vestimenta não pode conduzir.", ["10.7.8", "10.7.8.1"]], ["energizado", "Luvas e mangas isolantes passam por ensaio dielétrico.", ["10.14.4"]]]},
    brief:'Escolha a categoria de EPI de arco pelo Anexo IV e vista o eletricista. Os cenários treinam a leitura conjunta dos quatro parâmetros da tabela.',
    base:['10.11.1','10.11.2','10.11.2.1','10.11.2.2','10.11.2.3','AIV-I','AIV-III'],
    cam:{theta:.05,phi:1.2,r:8,t:[0,1.2,0],rMax:28},
    reset(){man=null;},build,info:INFO,
    onPick(id){if(id==='man'){gotoTask('c');toast('Vestiário');return true;}return false;},
    tasks:[{id:'b',title:'Categoria',render(el,api){quiz(el,api,SC);}},
      {id:'c',title:'Vestir EPI',render(el,api){
        const rad=(name,opts)=>`<div class="seg" data-g="${name}">${opts.map(([v,l])=>`<button type="button" data-v="${v}" aria-pressed="${dress[name]===v}">${l}</button>`).join('')}</div>`;
        el.innerHTML=`<p class="lead">Escolha a categoria, vista o trabalhador e confira. O manequim na cena muda junto. Passe em duas categorias diferentes para concluir.</p>
        <div class="fld"><span class="fl">Categoria exigida</span><div class="seg" id="m4cat">${[1,2,3,4].map(c=>`<button type="button" data-c="${c}" aria-pressed="${cat===c}">Cat. ${c}${passed.has(c)?' ✓':''}</button>`).join('')}</div></div>
        <div class="fld"><span class="fl">Vestimenta</span>${rad('roupa',[['comum','Uniforme comum'],['ar4','AR 4'],['ar8','AR 8'],['ar25','AR 25 · traje'],['ar40','AR 40 · traje']])}</div>
        <div class="fld"><span class="fl">Cabeça e rosto</span>${rad('cabeca',[['none','Nada'],['shield','Protetor facial AR'],['shieldbal','Facial + balaclava AR'],['hood','Capuz carrasco AR']])}</div>
        <div class="fld"><span class="fl">Mãos</span>${rad('luvas',[['none','Sem luvas'],['couro','Couro espessa'],['isol','Isolante + cobertura']])}</div>
        <div class="fld"><span class="fl">Pés</span>${rad('calcado',[['aco','Bota com biqueira de aço exposta'],['couro','Calçado de couro sem metal']])}</div>
        <div class="form"><label class="chk"><input type="checkbox" id="d-capacete" ${dress.capacete?'checked':''}> Capacete</label><label class="chk"><input type="checkbox" id="d-oculos" ${dress.oculos?'checked':''}> Óculos de proteção</label>
        <label class="chk"><input type="checkbox" id="d-auricular" ${dress.auricular?'checked':''}> Protetor auricular</label><label class="chk"><input type="checkbox" id="d-adornos" ${dress.adornos?'checked':''}> Aliança e relógio</label></div>
        <div class="row-actions"><button type="button" class="btn primary" id="m4chk">Conferir EPI</button></div><div id="m4r"></div>`;
        $$('[data-g]',el).forEach(g=>$$('button',g).forEach(b=>b.onclick=()=>{dress[g.dataset.g]=b.dataset.v;$$('button',g).forEach(x=>x.setAttribute('aria-pressed',x===b));applyDress();}));
        ['capacete','oculos','auricular','adornos'].forEach(k=>{$('#d-'+k,el).onchange=e=>{dress[k]=e.target.checked;applyDress();};});
        $$('#m4cat button',el).forEach(b=>b.onclick=()=>{cat=+b.dataset.c;reloadScene();selectTask(UI.task);});
        $('#m4chk',el).onclick=()=>{const res=checkDress();const ok=res.every(r=>r[0]);if(ok){passed.add(cat);}
          $('#m4r',el).innerHTML=`<div class="cl">${res.map(([g,t,s,r])=>`<div class="cl-row ${g?'good':'bad'}"><div class="t">${g?'✓':'✗'} ${t}${s?` <span class="lead">· ${s}</span>`:''}</div><div>${Rs(r)}</div></div>`).join('')}</div>`+
            cardHTML({k:ok?'ok':'err',t:ok?`Pronto para Categoria ${cat}`:'Ainda não está pronto',b:ok?'Cada peça precisa de Certificado de Aprovação (CA) conforme a NR-6. A categoria só vale nas condições do Anexo IV.':'Corrija os itens marcados.',r:['10.11.2','10.11.2.1']});
          $$('#m4cat button',el).forEach(b=>{const c=+b.dataset.c;b.textContent=`Cat. ${c}${passed.has(c)?' ✓':''}`;});
          if(passed.size>=2)api.done();};}}]};
  QB.add('coletiva',CQ);QB.add('individual',SC);
  MODS.push(coletiva,individual);})();
