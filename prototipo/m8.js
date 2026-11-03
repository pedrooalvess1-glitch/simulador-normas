/* ===== Fase IV · Documentação e grave e iminente risco ===== */
(()=>{
  const BIN=[
    {id:'b_proj',l:'PROJETO',c:'#2f5d8a',t:'Projeto elétrico e memorial descritivo',b:'Toda organização dispõe de projeto elétrico conforme o capítulo 10.4, atualizado conforme o executado e disponível aos autorizados.',r:['10.15.3','10.4.7','10.4.13']},
    {id:'b_ater',l:'ATERRAMENTO',c:'#3f7d4f',t:'Inspeções e medições do aterramento',b:'Também exigidas de toda organização, tenha ela ou não trabalhadores autorizados.',r:['10.15.3']},
    {id:'b_proc',l:'PROCEDIMENTOS',c:'#8a5a2b',t:'Procedimentos, análises de risco e PT',b:'Exigidos de quem tem trabalhadores autorizados. A PT encerrada é arquivada para rastreabilidade.',r:['10.15.4','10.7.2.3']},
    {id:'b_epi',l:'EPC · EPI',c:'#a0522d',t:'Especificação de EPC, EPI e ferramental',b:'Exigida de quem tem trabalhadores autorizados.',r:['10.15.4']},
    {id:'b_trei',l:'PESSOAS',c:'#5a4a7a',t:'Qualificação, capacitação, treinamentos e autorizações',b:'Comprovação documental de cada condição do trabalhador, inclusive a autorização consignada nos documentos funcionais.',r:['10.15.4','10.10.3']},
    {id:'b_ens',l:'ENSAIOS',c:'#b5322b',t:'Relatórios de testes de isolação',b:'Ensaios de ferramentas, dispositivos, EPI e EPC isolantes. A falta deles é uma das quatro condições de GIR.',r:['10.15.4','10.14.4','10.16.1']},
    {id:'b_ex',l:'ÁREA EX',c:'#c9a227',t:'Documentos de área classificada',b:'Procedimentos, análises de risco e PT do 10.6.6.1.2, certificação dos equipamentos e inspeções de conformidade.',r:['10.15.5']},
    {id:'b_emer',l:'EMERGÊNCIA',c:'#c0392b',t:'Resposta a emergências',b:'Conteúdo obrigatório do PIE: técnicas, equipamentos pessoais e coletivos e o sistema de resgate disponível.',r:['10.15.6.1']},
    {id:'b_insp',l:'INSPEÇÃO',c:'#4b5965',t:'Relatório de inspeção com plano de ação',b:'Resultado da inspeção das instalações, com medidas de prevenção, plano de ação e cronograma.',r:['10.7.11']}];
  const INFO={};BIN.forEach(b=>INFO[b.id]={t:b.t,b:b.b,r:b.r});
  INFO.pie={t:'Prontuário das Instalações Elétricas',b:'Quem integra o SEP ou atua em MT/AT organiza a documentação dos itens 10.15.4 e 10.15.5 na forma de PIE, sob responsabilidade de PLH. Os documentos técnicos do PIE são elaborados por PLH.',r:['10.15.6','10.15.7','g-pie']};
  INFO.digital={t:'Documentação digital',b:'Pode ser emitida e guardada em meio digital, em português, atualizada e disponível aos trabalhadores, seus representantes e à Inspeção do Trabalho.',r:['10.15.1','10.15.2']};
  INFO.auditor={t:'Auditor-Fiscal do Trabalho',b:'Diante de uma das quatro condições do 10.16.1, pode embargar ou interditar sem aplicar a metodologia da NR-3.',r:['10.16.1','NR-3']};
  function build(){
    const fl=boxB(9,.04,7,'#b9bfc4',0,0,0);fl.castShadow=false;boxB(9,3.2,.2,'#e6e3dc',0,0,-3.5);boxB(.2,3.2,7,'#e6e3dc',-4.5,0,0);
    const sh=grp(-.9,0,-3.05);[0,.75,1.5,2.25].forEach(y=>boxB(4.6,.05,.6,'#7b858c',0,y+.1,0,sh));[-2.3,2.3].forEach(x=>boxB(.06,2.45,.6,'#6b747b',x,0,0,sh));
    plate(['PIE · PRONTUÁRIO DAS INSTALAÇÕES ELÉTRICAS'],4.2,.3,{bg:'#20313f',fg:'#fff'},0,2.65,.05,sh);hot(sh,'pie',INFO.pie.t,{dy:.5});
    BIN.forEach((b,i)=>{const row=Math.floor(i/3),col=i%3;const g=grp(-1.5+col*1.5,.15+row*.75,0,sh);for(let k=0;k<3;k++)boxB(.13,.5,.42,b.c,-.3+k*.15,0,0,g);
      plate([b.l],.62,.13,{bg:'#f7f8f9',fg:'#15202b'},0,.6,.22,g);hot(g,b.id,b.t,{dy:.25});});
    const dk=grp(2.6,0,.6);boxB(1.6,.06,.8,'#8a6b4a',0,.76,0,dk);[[-.72,-.32],[.72,-.32],[-.72,.32],[.72,.32]].forEach(([x,z])=>boxB(.05,.76,.05,'#5a4a3a',x,0,z,dk));
    boxB(.55,.36,.04,'#1b1b1b',0,.95,-.2,dk);box(.5,.3,.01,'#3e6fa0',0,1.13,-.177,dk,{emissive:0x2a5585,emissiveIntensity:.6});hot(dk,'digital',INFO.digital.t,{dy:.3});
    const a=person({x:-.6,z:1.4,shirt:'#ececec',pants:'#2b3440',helmet:'#2e6db4'});a.g.rotation.y=Math.PI*.85;box(.24,.32,.02,'#8a6b4a',0,-.5,.12,a.P.shR).rotation.x=-.4;a.P.shR.rotation.x=-.9;
    hot(a.g,'auditor','Auditor-Fiscal do Trabalho',{dy:.25});}
  const DOC=[
    {t:'Projeto elétrico conforme o capítulo 10.4',a:'T',r:['10.15.3']},{t:'Inspeções e medições do sistema de aterramento',a:'T',r:['10.15.3']},
    {t:'Procedimentos de trabalho, análises de risco e PT',a:'A',r:['10.15.4']},{t:'Especificação de EPC, EPI e ferramental',a:'A',r:['10.15.4']},
    {t:'Comprovação de qualificação, habilitação, capacitação, treinamento e autorização',a:'A',r:['10.15.4']},{t:'Relatórios de testes de isolação',a:'A',r:['10.15.4']},
    {t:'Certificação dos equipamentos instalados em área classificada',a:'X',r:['10.15.5']},{t:'Inspeções de conformidade da área classificada',a:'X',r:['10.15.5']},
    {t:'Procedimentos de resposta a emergências, com sistema de resgate',a:'P',x:'Conteúdo específico do PIE.',r:['10.15.6.1']}];
  const PQ=[
    {q:'Supermercado com 300 kW instalados, alimentado em 380 V, com dois eletricistas próprios. Precisa de PIE pela NR-10?',o:['Sim, passa de 75 kW','Não; mas mantém projeto, registros de aterramento e a documentação do 10.15.4','Não precisa de documento algum'],a:1,x:'O PIE é para quem integra o SEP ou atua em MT/AT. Ter autorizados já obriga a documentação do 10.15.4, só que fora do formato de PIE.',r:['10.15.6','10.15.4','10.15.3']},
    {q:'Indústria com cabine primária de 13,8 kV operada pelos próprios eletricistas.',o:['Precisa de PIE','Não precisa: não é concessionária'],a:0,x:'Realiza atividades em instalação de média tensão.',r:['10.15.6','g-mt']},
    {q:'Usina solar de 5 MW conectada à rede da distribuidora.',o:['Precisa de PIE: geração integra o SEP','Não precisa: é energia renovável'],a:0,r:['10.15.6','g-sep']},
    {q:'Quem elabora os documentos técnicos do PIE?',o:['Qualquer trabalhador autorizado','PLH','O técnico de segurança do trabalho'],a:1,r:['10.15.7','10.15.6']},
    {q:'O PIE pode existir só em meio digital?',o:['Não, precisa ser impresso','Sim, conforme a NR-1, em português'],a:1,r:['10.15.1']},
    {q:'A quem a documentação da NR-10 fica disponível?',o:['Só à direção da empresa','Aos trabalhadores interessados ou seus representantes e à Inspeção do Trabalho'],a:1,r:['10.15.2']},
    {q:'O que o 10.16.1 muda na fiscalização?',o:['Cria multas novas','Dispensa a metodologia da NR-3 para embargar ou interditar diante de quatro condições objetivas','Proíbe a interdição de instalações do SEP'],a:1,r:['10.16.1','NR-3']}];
  const mod={id:'documentacao',phase:'IV',name:'Documentação e grave e iminente risco',short:'Documentação e GIR',scene:'Arquivo técnico',
    primer:{logic:'Tudo o que a norma exige precisa ser demonstrável. Toda organização tem projeto e registros do aterramento. Quem tem autorizados guarda procedimentos, PT, especificação de EPC e EPI, comprovação de treinamento e relatórios de ensaio. Quem integra o SEP ou atua em MT/AT organiza isso em PIE, elaborado por PLH. O 10.16 fecha a norma com as quatro condições que permitem embargar ou interditar na hora.',
      links:[['projeto','O primeiro documento de toda organização é o projeto.',['10.15.3']],['organizacao','Procedimentos, análises de risco e PT são documentos da norma.',['10.15.4']],['pessoas','Comprovação de qualificação, treinamento e autorização.',['10.15.4']],['desenergizado','Falha de sequência leva ao GIR.',['10.16.1']],['coletiva','Área classificada sem proteção coletiva leva ao GIR.',['10.16.1']]]},
    brief:'Monte a estante da documentação exigida de cada organização, decida quem precisa de PIE e separe o que é grave e iminente risco do que é só não conformidade.',
    base:['10.15.3','10.15.4','10.15.5','10.15.6','10.15.7','10.16.1'],
    cam:{theta:.35,phi:1.12,r:9.5,t:[0,1.2,-1],rMax:22},
    reset(){},build,info:INFO,
    tasks:[
      {id:'a',title:'Quem guarda o quê',render(el,api){classify(el,api,{id:'doc',intro:'Para cada documento, qual organização é obrigada a mantê-lo? Clique nas pastas da estante para consultar.',
        options:[{v:'T',l:'Toda organização'},{v:'A',l:'Quem tem autorizados'},{v:'X',l:'Quem tem área classificada'},{v:'P',l:'Conteúdo do PIE'}],items:DOC});}},
      {id:'b',title:'Precisa de PIE?',render(el,api){quiz(el,api,PQ);}},
      {id:'c',title:'GIR',render(el,api){classify(el,api,{id:'gir',intro:'O 10.16.1 lista as condições que permitem embargo ou interdição sem a metodologia da NR-3. Separe o que está na lista do que é só não conformidade.',
        options:[{v:'G',l:'GIR · 10.16.1'},{v:'N',l:'NC, não é GIR'}],items:window.GIR_ITEMS||[]});}}]};
  QB.add('documentacao',PQ);QB.cls('documentacao',DOC,[{v:'T',l:'Toda organização'},{v:'A',l:'Quem tem trabalhadores autorizados'},{v:'X',l:'Quem tem área classificada'},{v:'P',l:'Conteúdo do PIE'}],'Quem é obrigado a manter este documento?');
  MODS.push(mod);})();
