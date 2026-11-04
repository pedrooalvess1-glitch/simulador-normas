/* ===== Histórias 2 a 4: QDC de prédio (BT/SEC), canteiro de obra (instalação temporária) e rede de distribuição (SEP) =====
   Mesmo motor da história 1 (makeStory, em historia.js). Cada objeto liga a itens da NR-10 (Portaria MTE 737/2026);
   textos normativos só via REF. Explicações e alternativas erradas (w) são do simulador e citam o item: inferência a validar.
   [PRÁTICA] marca detalhe de cenário que não vem da NR-10 e nunca é cobrado. */

/* ---------- peças de desenho comuns às três histórias ---------- */
const SCX={
  cart(K,items,x0,y0){const {rc,tx,hs}=K;const o=[rc(x0,y0+52,items.length*45+20,52,'sc-cart',4),`<circle cx="${x0+20}" cy="${y0+116}" r="10" class="sc-dark"/><circle cx="${x0+items.length*45}" cy="${y0+116}" r="10" class="sc-dark"/>`];
    items.forEach(([id,lab,g],i)=>{const x=x0+22+i*45;o.push(hs(id,[x-20,y0,40,82],`<g transform="translate(${x} ${y0+50})">${g}</g>`+tx(x,y0+74,lab,'sc-tiny2','middle')));});return o.join('');},
  det(K){return `${K.rc(-3,-40,6,40,'sc-stick',2)}${K.rc(-8,-50,16,12,'sc-dark',3)}<circle cx="0" cy="-44" r="3" class="sc-ledon"/>`;},
  mult(K){return `${K.rc(-11,-40,22,34,'sc-arc',3)}${K.rc(-7,-36,14,9,'sc-paper',1)}<circle cx="0" cy="-16" r="4" class="sc-dark"/>`;},
  atr(K){return `<path d="M-12 -6 C -12 -40, 12 -40, 12 -6" class="sc-gcable"/>${K.rc(-14,-10,8,8,'sc-cu',1)}${K.rc(6,-10,8,8,'sc-cu',1)}`;},
  eti(K){return K.rc(-12,-30,24,24,'sc-tag',2);},
  ant(K){return K.rc(-14,-36,28,30,'sc-barrier',3);},
  cone(){return `<path d="M-9 -4 l9 -28 l9 28z" class="sc-cone"/>`;},
  breakers(K,x,y,cols,rows,w,h,cls){let o='';for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)o+=K.rc(x+c*(w+4),y+r*(h+6),w,h,cls||'sc-breaker',2);return o;}};

/* ======================================================================================
   História 2 · OS 0815 · QDC de um prédio comercial (baixa tensão, SEC)
   ====================================================================================== */
(()=>{
  const HS={
    shaft:{t:'Shaft elétrico do 3º andar',b:'Local de serviços elétricos: exclusivo para essa finalidade, proibido guardar objetos (10.12.8).',r:['10.12.8']},
    caixas:{t:'Caixas de papelão guardadas no shaft',b:'Locais de serviços elétricos e invólucros não podem ser usados para armazenamento ou guarda de objetos (10.12.8).',r:['10.12.8']},
    qdc:{t:'QDC do 3º andar · 380/220 V',b:'Quadro com porta mantida fechada fora de intervenção e sinalização do nível de tensão, de choque, de arco e de restrição de acesso (10.7.7.1).',r:['10.7.7.1']},
    dg:{t:'Disjuntor geral do QDC',b:'O projeto especifica dispositivo de desligamento com recurso para impedimento de reenergização e sinalização da condição operativa (10.4.1). Seccionamento: alínea a do 10.13.1.',r:['10.4.1','10.13.1']},
    bornes:{t:'Bornes de entrada do disjuntor geral',b:'Lado da fonte: continuam energizados com o disjuntor geral aberto. Abaixo de 1 kV, Rr = 0,20 m e Rc = 0,70 m (Anexo II).',r:['AII','10.13.1']},
    barr:{t:'Barramento do QDC',b:'Ponto onde se constata a ausência de tensão (10.13.1 b) e onde o projeto prevê condições para o aterramento temporário (10.4.6).',r:['10.13.1','10.4.6']},
    circ:{t:'Disjuntores dos circuitos',b:'Circuitos identificados (10.7.7 a), com o sistema de identificação descrito no memorial do projeto (10.4.9 b).',r:['10.7.7','10.4.9']},
    dr:{t:'DR do circuito da copa-cozinha',b:'Proteção adicional obrigatória nos circuitos de tomada de copas-cozinhas em edificação não residencial (10.6.4 e). Para instalação existente, essa alínea vale um ano depois da vigência da Portaria (art. 3º).',r:['10.6.4','art3']},
    copa:{t:'Copa-cozinha do escritório',b:'Ponto de tomada em copa-cozinha de edificação não residencial: alínea e do 10.6.4.',r:['10.6.4']},
    furad:{t:'Furadeira com plugue adaptado',b:'Só podem ser usados equipamentos e ferramentas elétricas compatíveis com a instalação existente, preservando as características de proteção (10.12.5). O adaptador que elimina o pino de terra não preserva. [INTERPRETAÇÃO]',r:['10.12.5']},
    docs:{t:'Projeto e procedimento de trabalho',b:'O procedimento é aprovado por PLH (10.7.1.1). O projeto fica disponível aos autorizados e atualizado conforme o executado (10.4.7, 10.4.13).',r:['10.7.1.1','10.4.7','10.4.13']},
    rita:{t:'Rita · eletricista predial',b:'Autorizada: ASO apto e treinamento com aproveitamento (10.10.2.1). É vedado o uso de adornos pessoais no serviço (10.7.8).',r:['10.10.2.1','10.7.8']},
    leo:{t:'Léo · técnico em eletrotécnica',b:'Voltou de 120 dias de afastamento: antes de voltar ao serviço, treinamento eventual (10.9.11 a).',r:['10.9.11']},
    joana:{t:'Joana · recepcionista',b:'Pessoa não advertida: pode fazer operações elementares em BT, como ligar e desligar circuitos em quadro feito para uso seguro (10.14.1.1).',r:['10.14.1.1','g-opel']},
    mult:{t:'Multímetro / detector de BT',b:'Adequado à tensão de trabalho e à classe de isolação, com categoria compatível com surtos e aferido (10.12.6.1).',r:['10.12.6.1']},
    cad:{t:'Cadeado pessoal',b:'Impedimento de reenergização (10.13.1 c).',r:['10.13.1']},
    eti:{t:'Etiqueta de impedimento',b:'Sinalização de impedimento de reenergização (10.13.1 f; 10.7.7 e).',r:['10.13.1','10.7.7']},
    ant:{t:'Anteparo isolante',b:'Protege os elementos que continuam energizados na zona controlada (10.13.1 e). Barreira é proteção básica (10.6.2 b).',r:['10.13.1','10.6.2']},
    atr:{t:'Conjunto de aterramento temporário de BT',b:'Aterramento com equipotencialização dos condutores (10.13.1 d).',r:['10.13.1']},
    cone:{t:'Cones e corrente',b:'Delimitação e sinalização da área de trabalho no corredor (10.13.1 g; 10.7.7 d).',r:['10.13.1','10.7.7']}};
  const S0={dg:true,lock:false,tag:false,ground:false,barrier:false,cones:false,caixas:true,semId:true,anel:true,furad:true,leo:true};
  const OS='<b>OS 0815 · Edifício Empresarial Boa Vista.</b> O prédio comercial recebe 380/220 V da distribuidora, depois da medição. Serviço: trocar o disjuntor do circuito de tomadas da copa-cozinha do 3º andar e instalar nele um DR. Equipe da manutenção predial do próprio condomínio.';
  const ST=[
    {f:'F1 · Briefing',ty:'q',n:OS,q:'Como esta atividade se enquadra na NR-10?',
      o:['SEC em baixa tensão: os autorizados fazem o Básico, e o condomínio mantém projeto, registros de aterramento e a documentação do 10.15.4, sem obrigação de PIE',
        'SEC em baixa tensão, mas com PIE obrigatório por ser edifício comercial','SEP, porque o prédio é alimentado pela distribuidora',
        'Fora da NR-10, porque o serviço é num quadro de 220 V','SEC em baixa tensão: Básico e Complementar de Média e Alta Tensão - SEC'],a:0,
      x:'Depois da medição a instalação é do consumidor; 380/220 V é BT (até 1.000 V CA). O PIE é só de quem integra o SEP ou atua em MT/AT (10.15.6). Toda organização dispõe de projeto e documentação do aterramento (10.15.3), e quem tem autorizados mantém a documentação do 10.15.4. O autorizado faz o Básico (10.9.4).',
      r:['g-bt','10.15.6','10.15.3','10.15.4','10.9.4'],foco:['qdc','docs'],
      w:{'SEC em baixa tensão, mas com PIE obrigatório por ser edifício comercial':'O 10.15.6 não usa o tipo de edificação: o PIE é de quem integra o SEP ou realiza atividades em MT/AT.|10.15.6',
        'SEP, porque o prédio é alimentado pela distribuidora':'O SEP vai até a medição, inclusive; o QDC fica depois dela.|g-sep',
        'Fora da NR-10, porque o serviço é num quadro de 220 V':'220 V é BT, dentro do alcance do 10.2.1; só a EBT fica fora (10.2.4).|g-bt,10.2.1,10.2.4',
        'SEC em baixa tensão: Básico e Complementar de Média e Alta Tensão - SEC':'O complementar MT/AT-SEC é para quem atua em média e alta tensão.|10.9.6'}},
    {f:'F2 · Planejamento',ty:'q',n:'Trocar disjuntor de circuito de tomadas é serviço habitual da manutenção predial, previsto no plano de manutenção, com procedimento escrito aprovado pela engenheira responsável.',q:'O que libera a execução?',
      o:['O procedimento de trabalho, elaborado a partir de análise de risco e aprovado por PLH','Permissão de trabalho, porque todo serviço em quadro exige PT',
        'Nada: trocar disjuntor é operação elementar','Procedimento de trabalho aprovado pelo próprio eletricista','Permissão de trabalho emitida pelo síndico'],a:0,
      x:'Serviço rotineiro (habitual e parte do processo contínuo) é executado mediante procedimento de trabalho elaborado a partir de análise de risco (10.7.1), aprovado por PLH (10.7.1.1).',
      r:['10.7.1','10.7.1.1','g-rot'],foco:['docs'],
      w:{'Permissão de trabalho, porque todo serviço em quadro exige PT':'PT é para o não rotineiro (10.7.2); este serviço é rotineiro.|10.7.2,g-rot',
        'Nada: trocar disjuntor é operação elementar':'Operação elementar é ligar e desligar (glossário); trocar disjuntor é serviço em eletricidade, só para autorizados (10.14.1).|g-opel,10.14.1',
        'Procedimento de trabalho aprovado pelo próprio eletricista':'O procedimento é aprovado por PLH.|10.7.1.1',
        'Permissão de trabalho emitida pelo síndico':'Além de a atividade ser rotineira, a PT é aprovada por trabalhador autorizado (10.7.2).|10.7.2'}},
    {f:'F2 · Equipe',ty:'find',n:'<b>Rita:</b> eletricista, ASO apto, Básico e periódico em dia. <b>Léo:</b> técnico em eletrotécnica, ASO apto, periódico em dia; voltou ontem de 120 dias de afastamento. <b>Joana:</b> recepcionista, vai abrir o shaft para a equipe.',
      p:'Clique em quem não pode começar o serviço hoje.',alvo:['leo'],
      ok:{t:'Léo precisa do treinamento eventual',b:'Depois de afastamento por mais de 90 dias, a organização faz treinamento eventual, mesmo com o periódico em dia (10.9.11 a), com carga e conteúdo ligados à situação que o motivou (10.9.11.1). Joana só abre a porta e fica fora da zona controlada.',r:['10.9.11','10.9.11.1']},
      fx:S=>{S.leo=false;}},
    {f:'F3 · Chegada',ty:'hunt',n:'A equipe abre o shaft do 3º andar. Antes de tocar no quadro, olhe o ambiente e as pessoas.',p:'Encontre as 4 situações que contrariam a NR-10.',
      alvos:{caixas:{t:'Caixas guardadas no shaft',b:'O shaft é local de serviços elétricos: é proibido usá-lo para guardar objetos (10.12.8). As caixas saem.',r:['10.12.8'],fx:S=>{S.caixas=false;}},
        circ:{t:'Circuitos sem identificação',b:'A sinalização identifica os circuitos elétricos (10.7.7 a), como o memorial do projeto define (10.4.9 b). Rita identifica o circuito da copa-cozinha antes de mexer.',r:['10.7.7','10.4.9'],fx:S=>{S.semId=false;}},
        rita:{t:'Rita está de anel',b:'É vedado o uso de adornos pessoais nos serviços em eletricidade (10.7.8). O anel fica guardado fora do shaft.',r:['10.7.8'],fx:S=>{S.anel=false;}},
        furad:{t:'Furadeira com plugue adaptado',b:'Só ferramentas compatíveis com a instalação, preservando as características de proteção (10.12.5). O adaptador que tira o pino de terra anula a proteção. [INTERPRETAÇÃO]',r:['10.12.5'],fx:S=>{S.furad=false;}}}},
    {f:'F3 · Projeto',ty:'q',n:'O projeto de adequação prevê DR para o circuito de tomadas da copa-cozinha do escritório. O prédio já existia quando a Portaria 737/2026 entrou em vigor.',q:'Como a NR-10 trata o DR desse circuito?',
      o:['É exigido pela alínea e do 10.6.4 (copa-cozinha em edificação não residencial), mas, para instalação existente, essa alínea só vale um ano depois da vigência da Portaria (art. 3º)',
        'Não é exigido: a lista do 10.6.4 só vale para residências','É exigido desde a publicação da Portaria, sem prazo nenhum',
        'Só seria exigido se a copa-cozinha tivesse chuveiro','Não é exigido: o DR é proteção adicional facultativa'],a:0,
      x:'O 10.6.4 e torna o DDR de alta sensibilidade obrigatório nos pontos de tomada de copas-cozinhas em edificações não residenciais. O art. 3º da Portaria adia essa alínea, para as instalações já existentes, a um ano depois da vigência; e a Portaria entra em vigor um ano após a publicação (art. 5º).',
      r:['10.6.4','art3','art5'],foco:['dr','copa'],
      w:{'Não é exigido: a lista do 10.6.4 só vale para residências':'A alínea d é de locais de habitação; a alínea e é justamente de edificações não residenciais.|10.6.4',
        'É exigido desde a publicação da Portaria, sem prazo nenhum':'A Portaria vale um ano após a publicação (art. 5º), e a alínea e, para instalação existente, um ano depois disso (art. 3º).|art5,art3',
        'Só seria exigido se a copa-cozinha tivesse chuveiro':'Banheira ou chuveiro é a alínea a; copa-cozinha em edificação não residencial é a e.|10.6.4',
        'Não é exigido: o DR é proteção adicional facultativa':'O 10.6.4 chama o DDR de proteção coletiva adicional obrigatória nas situações listadas.|10.6.4,g-adic'}},
    {f:'F4 · Desenergização',ty:'seq',ref:'10.13.1',n:'Rita vai desenergizar o QDC inteiro para trocar o disjuntor. Alínea por alínea do 10.13.1, nos objetos da cena.',
      p:'Clique nos objetos na ordem da sequência.',
      acts:[{hs:['dg'],k:'a',t:'Desligar o disjuntor geral do QDC',b:'Seccionamento do quadro.',fx:S=>{S.dg=false;}},
        {hs:['barr','mult'],k:'b',t:'Constatar a ausência de tensão no barramento',b:'Instrumento adequado à tensão e testado antes [PRÁTICA]: sem tensão no barramento.'},
        {hs:['cad','dg'],k:'c',t:'Travar o disjuntor geral com cadeado pessoal',b:'Impedimento de reenergização sob controle de quem trabalha.',fx:S=>{S.lock=true;}},
        {hs:['mult'],k:'d',t:'Constatar de novo, no ponto do aterramento',b:'A constatação se repete antes de aterrar.'},
        {hs:['atr','barr'],k:'d',t:'Instalar o aterramento temporário no barramento, com equipotencialização',b:'As fases e o neutro interligados e aterrados.',fx:S=>{S.ground=true;}},
        {hs:['ant','bornes'],k:'e',t:'Cobrir os bornes de entrada do disjuntor geral',b:'O lado da fonte continua energizado a poucos centímetros da mão: dentro da zona controlada.',fx:S=>{S.barrier=true;}},
        {hs:['eti'],k:'f',t:'Fixar a etiqueta de impedimento no disjuntor geral',b:'Quem bloqueou, por quê e desde quando.',fx:S=>{S.tag=true;}},
        {hs:['cone'],k:'g',t:'Delimitar e sinalizar a área no corredor',b:'O corredor do andar tem circulação de pessoas.',fx:S=>{S.cones=true;}}],
      esp:(h,cur,S)=>{
        if(h==='atr'&&!S.ground&&cur.hs[0]!=='atr')return {t:'Aterramento sem constatação',b:'A alínea d manda constatar a ausência de tensão para instalar o aterramento temporário. Pular essa etapa é grave e iminente risco (10.16.1 b).',r:['10.13.1','10.16.1'],gir:1};
        if(h==='cad'&&cur.k==='b')return {t:'Impedimento antes da constatação',b:'No 10.13.1, a constatação da ausência de tensão (alínea b) vem antes do impedimento de reenergização (alínea c).',r:['10.13.1']};
        return null;}},
    {f:'F5 · Operação elementar',ty:'q',n:'Serviço feito e QDC reenergizado. À tarde, o disjuntor do ar-condicionado da recepção desarma no quadro de tomadas da sala, projetado e mantido para operação segura. Joana quer religá-lo.',q:'Ela pode?',
      o:['Pode: ligar e desligar circuitos em BT, em quadro feito para uso seguro, é operação elementar, permitida a qualquer pessoa não advertida',
        'Não: só trabalhador autorizado pode operar disjuntor','Pode, mas só com permissão de trabalho','Pode, se tiver feito o Básico de 40 h','Pode, e também poderia num quadro de média tensão'],a:0,
      x:'O 10.14.1.1 admite operações elementares, como ligar e desligar circuitos, em baixa tensão, em sistemas projetados, construídos, instalados e mantidos para uso seguro, por qualquer pessoa não advertida.',
      r:['10.14.1.1','g-opel'],foco:['joana'],
      w:{'Não: só trabalhador autorizado pode operar disjuntor':'O 10.14.1 exige autorizados nos serviços em eletricidade, mas o 10.14.1.1 abre exceção para a operação elementar em BT.|10.14.1,10.14.1.1',
        'Pode, mas só com permissão de trabalho':'Operação elementar não é serviço em eletricidade e não pede PT.|10.14.1.1',
        'Pode, se tiver feito o Básico de 40 h':'O 10.14.1.1 admite qualquer pessoa não advertida.|10.14.1.1',
        'Pode, e também poderia num quadro de média tensão':'A operação elementar do 10.14.1.1 é só em baixa tensão.|10.14.1.1'}},
    {f:'Encerramento',ty:'q',n:'O DR novo da copa-cozinha está no QDC.',q:'O que acontece com o projeto do quadro?',
      o:['É atualizado para corresponder ao executado e fica disponível aos trabalhadores autorizados','Nada: trocar um componente não muda o projeto',
        'É atualizado só na próxima reforma grande','Vai para o PIE do prédio','Fica guardado só com o síndico'],a:0,
      x:'O projeto é mantido atualizado de forma a corresponder ao executado (10.4.13) e fica disponível aos trabalhadores autorizados, às autoridades competentes e a outras pessoas autorizadas pela organização (10.4.7). Toda organização dispõe de projeto elétrico (10.15.3).',
      r:['10.4.13','10.4.7','10.15.3'],foco:['docs','dr'],
      w:{'Nada: trocar um componente não muda o projeto':'Entrou um dispositivo novo no quadro: o 10.4.13 pede o projeto igual ao executado.|10.4.13',
        'É atualizado só na próxima reforma grande':'O 10.4.13 não espera reforma: o projeto acompanha o executado.|10.4.13',
        'Vai para o PIE do prédio':'Sem SEP nem MT/AT, o condomínio não é obrigado a ter PIE (10.15.6).|10.15.6',
        'Fica guardado só com o síndico':'O projeto fica disponível aos autorizados e às autoridades (10.4.7).|10.4.7'}}];

  makeStory({id:'hist_qdc',store:'hist_qdc',name:'Uma OS no QDC de um prédio',short:'QDC 380/220 V',scene:'Prédio comercial · QDC de BT',
    aria:'Shaft elétrico com o QDC de 380/220 V de um prédio comercial, com objetos clicáveis',explore:'Comece pelo shaft, pelo QDC ou pelo carrinho.',
    primer:{logic:'Uma OS rotineira em baixa tensão, num prédio comercial: procedimento em vez de PT, treinamento eventual, adornos e ferramentas, DR em copa-cozinha com a regra de transição do art. 3º e a sequência de desenergização num quadro de BT, onde o lado da fonte continua vivo a centímetros da mão.',
      links:[['desenergizado','A sequência da fase F4 é a do 10.13.1.',['10.13.1']],['projeto','DR e identificação de circuitos vêm do projeto.',['10.6.4','10.4.9']],['organizacao','Procedimento × PT.',['10.7.1','10.7.2']]]},
    brief:'Uma ordem de serviço de baixa tensão num prédio comercial: rotina, DR da copa-cozinha e desenergização de um QDC.',
    base:['10.7.1','10.6.4','10.13.1','10.14.1.1','10.9.11'],HS,S0,ST,
    draw(S,K){const {tx,rc,hs,person}=K;const o=[];
      o.push(rc(0,0,1000,430,'sc-wall'),rc(0,430,1000,210,'sc-floor'),`<line x1="0" y1="430" x2="1000" y2="430" class="sc-edge"/>`);
      // shaft
      o.push(hs('shaft',[20,130,170,300],rc(20,130,170,300,'sc-door',3)+rc(190,130,16,300,'sc-doorleaf',2)+tx(105,120,'SHAFT ELÉTRICO','sc-lab','middle')+rc(52,150,106,30,'sc-warnplate',3)+tx(105,170,'SÓ AUTORIZADOS','sc-plate2','middle')));
      if(S.caixas)o.push(hs('caixas',[36,320,140,104],rc(40,360,64,62,'sc-box',2)+rc(100,330,72,92,'sc-box',2)+rc(52,322,40,40,'sc-box',2)+tx(136,380,'arquivo','sc-tiny','middle')));
      // QDC
      o.push(rc(230,120,330,300,'sc-cub',4)+tx(395,112,'QDC 3º ANDAR · 380/220 V','sc-lab','middle'));
      o.push(hs('qdc',[470,374,80,38],rc(470,374,80,38,'sc-warnplate',3)+tx(510,392,'380 V','sc-plate','middle')+tx(510,406,'CHOQUE · ARCO','sc-plate2','middle')));
      o.push(hs('bornes',[262,134,92,26],[0,1,2].map(i=>`<circle cx="${278+i*30}" cy="147" r="7" class="sc-cu"/>`).join('')+tx(370,152,'entrada','sc-tiny')));
      if(S.barrier)o.push(rc(254,128,108,38,'sc-barrier',4));
      o.push(hs('dg',[262,170,92,58],rc(262,170,92,58,'sc-panel',3)+`<circle cx="285" cy="199" r="11" class="${S.dg?'sc-red':'sc-green'}"/>`+tx(285,203,S.dg?'L':'D','sc-lampt','middle')+tx(322,195,'GERAL','sc-tiny','middle')+tx(322,212,S.dg?'LIGADO':'DESLIG.','sc-tiny','middle')
        +(S.lock?`<g class="sc-lock"><path d="M340 216 v-5 a5 5 0 0 1 10 0 v5" class="sc-shackle"/>${rc(336,216,18,14,'sc-lockbody',2)}</g>`:'')+(S.tag?rc(300,226,28,18,'sc-tag',2)+tx(314,239,'NÃO','sc-tiny2','middle'):'')));
      o.push(hs('barr',[262,238,276,14],rc(262,240,276,10,'sc-bus',2)+tx(400,264,'barramento','sc-tiny','middle')));
      if(S.ground)o.push(`<g>${[0,1,2,3].map(i=>`<path d="M${300+i*50} 246 C ${310+i*50} 300, ${330+i*40} 380, ${360+i*20} 414" class="sc-gcable"/>`).join('')}</g>`);
      o.push(hs('circ',[262,272,200,92],SCX.breakers(K,262,274,6,3,28,24)+(S.semId?'':[0,1,2,3,4,5].map(i=>tx(276+i*32,370,'C'+(i+1),'sc-tiny','middle')).join(''))));
      o.push(hs('dr',[476,272,62,56],rc(476,272,62,56,'sc-panel',3)+tx(507,296,'DR','sc-lab','middle')+tx(507,316,'copa','sc-tiny','middle')));
      o.push(rc(230,420,330,8,'sc-cu',2));
      // documentos e copa
      o.push(hs('docs',[600,150,64,92],rc(600,150,64,92,'sc-paper',3)+tx(632,172,'PROC.','sc-lab','middle')+`<line x1="610" y1="188" x2="654" y2="188" class="sc-rule"/><line x1="610" y1="200" x2="654" y2="200" class="sc-rule"/><line x1="610" y1="212" x2="640" y2="212" class="sc-rule"/>`+tx(632,234,'projeto','sc-tiny','middle')));
      o.push(hs('copa',[700,200,280,230],rc(700,330,280,100,'sc-cub',3)+rc(740,316,90,16,'sc-panel',3)+rc(860,250,40,30,'sc-paper',3)+`<circle cx="872" cy="265" r="4" class="sc-dark"/><circle cx="888" cy="265" r="4" class="sc-dark"/>`+tx(840,224,'COPA-COZINHA','sc-lab','middle')+tx(880,296,'tomada','sc-tiny','middle')));
      // pessoas
      o.push(person('rita',70,'Rita','eletr.','sc-coat1',S.anel?`<circle cx="94" cy="545" r="5" class="sc-ring"/>`:''));
      if(S.leo)o.push(person('leo',150,'Léo','téc.','sc-coat2'));
      o.push(person('joana',930,'Joana','recep.','sc-coat3'));
      // furadeira
      if(S.furad)o.push(hs('furad',[640,560,90,40],rc(650,572,46,18,'sc-tool',4)+rc(690,566,30,10,'sc-tool',2)+rc(658,588,12,12,'sc-tool',2)+`<path d="M664 600 C 690 612, 700 600, 724 606" class="sc-wire"/>`+tx(686,620,'adaptador','sc-tiny','middle')));
      // carrinho
      o.push(SCX.cart(K,[['mult','Medidor',SCX.mult(K)],['cad','Cadeado',S.lock?'':`<g class="sc-lock"><path d="M-5 -22 v-5 a5 5 0 0 1 10 0 v5" class="sc-shackle"/>${rc(-9,-22,18,14,'sc-lockbody',2)}</g>`],
        ['eti','Etiqueta',S.tag?'':SCX.eti(K)],['atr','Aterram.',S.ground?'':SCX.atr(K)],['ant','Anteparo',S.barrier?'':SCX.ant(K)],['cone','Cones',S.cones?'':SCX.cone()]],270,488));
      if(S.cones)o.push(hs('cone',[230,452,340,30],`<line x1="236" y1="466" x2="556" y2="466" class="sc-chain"/>`+[0,1,2,3].map(i=>`<path d="M${230+i*104} 480 l10 -24 l10 24z" class="sc-cone"/>`).join('')));
      return o.join('');}});
})();

/* ======================================================================================
   História 3 · OS 1102 · Canteiro de obra (instalação temporária em BT, rede de MT ao lado)
   ====================================================================================== */
(()=>{
  const HS={
    qdp:{t:'Quadro de distribuição provisório (QDP) · 380/220 V',b:'A NR-10 alcança instalações de caráter permanente ou temporário (10.2.1). Porta mantida fechada fora de intervenção, com sinalização de tensão, choque, arco e restrição de acesso (10.7.7.1).',r:['10.2.1','10.7.7.1']},
    dg:{t:'Disjuntor geral do QDP',b:'Dispositivo de desligamento com recurso para impedimento de reenergização e sinalização da condição operativa (10.4.1).',r:['10.4.1','10.13.2']},
    bornes:{t:'Bornes de entrada do QDP',b:'Lado da fonte: continuam energizados com o disjuntor geral aberto (Anexo II, < 1 kV: Rr 0,20 m, Rc 0,70 m).',r:['AII']},
    sacos:{t:'Sacos de cimento dentro do QDP',b:'Invólucros de equipamentos elétricos são exclusivos para essa finalidade: proibido guardar objetos (10.12.8).',r:['10.12.8']},
    drq:{t:'DR do QDP',b:'Os sistemas de proteção são mantidos em condições seguras, inspecionados, testados e controlados periodicamente (10.12.7).',r:['10.12.7','10.6.4']},
    interf:{t:'Eletroduto com força e interfone',b:'Circuitos de finalidades distintas são identificados e instalados separadamente, salvo compartilhamento definido em projeto (10.4.3.1, 10.12.10).',r:['10.4.3.1','10.12.10']},
    tomext:{t:'Tomadas novas no pátio',b:'Tomadas em áreas externas à edificação: DDR de alta sensibilidade obrigatório (10.6.4 b).',r:['10.6.4']},
    betoneira:{t:'Betoneira nova',b:'Equipamento compatível com a instalação existente, preservando as características de proteção (10.12.5).',r:['10.12.5']},
    rede:{t:'Rede de distribuição 13,8 kV na calçada',b:'Pertence à distribuidora (SEP). Para 13,8 kV, Rr = 0,38 m e Rc = 1,38 m (Anexo II). Chegar à zona controlada com o corpo ou com extensões condutoras é trabalho em proximidade (10.2.2).',r:['AII','10.2.2','g-sep']},
    vergalhao:{t:'Servente erguendo vergalhões junto à rede',b:'Vergalhão é extensão condutora: perto da rede, pode entrar na zona controlada (10.2.2), o que só cabe a autorizados (10.14.1).',r:['10.2.2','10.14.1']},
    proj:{t:'Projeto do canteiro',b:'Sob responsabilidade de PLH (10.4.8), disponível aos autorizados e atualizado conforme o executado (10.4.7, 10.4.13).',r:['10.4.8','10.4.7','10.4.13']},
    marta:{t:'Marta · engenheira residente (PLH)',b:'Qualificada e com registro no conselho de classe (10.8.2). Responde pelo projeto e pelo acompanhamento do técnico estrangeiro.',r:['10.8.2','10.9.8']},
    tiago:{t:'Tiago · eletricista autorizado',b:'ASO apto e treinamento com aproveitamento (10.10.2.1).',r:['10.10.2.1']},
    klaus:{t:'Klaus · técnico do fabricante do elevador de obra',b:'Estrangeiro, 12 dias de serviço na zona controlada: treinamento Específico e pontual, acompanhado presencial e permanentemente por trabalhador autorizado (10.9.8).',r:['10.9.8']},
    ajud:{t:'Ajudante da obra',b:'Não participa da reenergização: sai das imediações (10.13.2 c).',r:['10.13.2']},
    ferr:{t:'Ferramentas e sobras de cabo',b:'Na reenergização, ferramentas, utensílios e equipamentos saem antes do aterramento (10.13.2 b).',r:['10.13.2']},
    cad:{t:'Cadeado pessoal',b:'Impedimento de reenergização (10.13.1 c); sai na alínea g do 10.13.2.',r:['10.13.1','10.13.2']},
    eti:{t:'Etiqueta de impedimento',b:'Removida na alínea f do 10.13.2.',r:['10.13.2','10.7.7']},
    atr:{t:'Aterramento temporário',b:'Removido na alínea d do 10.13.2, depois de retirar delimitação, ferramentas e pessoas não envolvidas.',r:['10.13.2']},
    ant:{t:'Anteparo isolante dos bornes',b:'Proteção dos elementos energizados: sai na alínea e do 10.13.2.',r:['10.13.2','10.13.1']},
    cone:{t:'Cones e fita',b:'Obstáculos de delimitação e sinalização: a reenergização começa por eles (10.13.2 a).',r:['10.13.2']}};
  const S0={qdpOpen:true,placa:false,sacos:true,drOk:false,interf:true,verg:true,dg:true,lock:false,tag:false,ground:false,barrier:false,cones:false,tools:false,ajud:false,klaus:false};
  const OS='<b>OS 1102 · Construtora Litoral.</b> Canteiro de um edifício de 8 andares. O quadro de distribuição provisório (QDP) recebe 380/220 V da medição da obra. Serviço: ampliar o QDP com um circuito para a betoneira nova e tomadas no pátio. A rede de 13,8 kV da distribuidora passa na calçada, junto ao tapume.';
  const ST=[
    {f:'F1 · Briefing',ty:'q',n:OS,q:'A NR-10 se aplica a esta instalação provisória?',
      o:['Sim: a NR-10 alcança instalações de caráter permanente ou temporário, inclusive nas etapas de construção e montagem','Não: só alcança instalações permanentes',
        'Só depois que o prédio for entregue','Só na rede de média tensão, que é da distribuidora','Não: canteiro de obra tem norma própria e fica fora da NR-10'],a:0,
      x:'O 10.2.1 aplica a NR-10 às etapas de projeto, construção, montagem, comissionamento, operação e manutenção de instalações de baixa, média e/ou alta tensão, de caráter permanente ou temporário.',
      r:['10.2.1'],foco:['qdp'],
      w:{'Não: só alcança instalações permanentes':'O 10.2.1 diz de caráter permanente ou temporário.|10.2.1',
        'Só depois que o prédio for entregue':'Construção e montagem estão no 10.2.1.|10.2.1',
        'Só na rede de média tensão, que é da distribuidora':'O 10.2.1 inclui a baixa tensão, e 380/220 V é BT.|10.2.1,g-bt',
        'Não: canteiro de obra tem norma própria e fica fora da NR-10':'O 10.2.1 não exclui canteiros; outra norma pode somar exigências, não afastar a NR-10. [INTERPRETAÇÃO]|10.2.1'}},
    {f:'F2 · Projeto',ty:'q',n:'A construtora quer ampliar o QDP "do jeito que der" e desenhar depois, quando a obra acabar.',q:'O que a NR-10 exige do projeto desta instalação provisória?',
      o:['Projeto sob responsabilidade de PLH, mantido atualizado de forma a corresponder ao executado e disponível aos autorizados','Nada: instalação provisória dispensa projeto',
        'Só um croqui feito pelo eletricista','Projeto só depois da desmontagem, para registro','Projeto só se a carga do canteiro passar de 75 kW'],a:0,
      x:'Toda organização dispõe de projeto elétrico conforme o capítulo 10.4 (10.15.3), sob responsabilidade de PLH (10.4.8), disponível aos autorizados (10.4.7) e atualizado conforme o executado (10.4.13).',
      r:['10.15.3','10.4.8','10.4.7','10.4.13'],foco:['proj','marta'],
      w:{'Nada: instalação provisória dispensa projeto':'O 10.15.3 vale para toda organização, e o 10.2.1 inclui as instalações temporárias.|10.15.3,10.2.1',
        'Só um croqui feito pelo eletricista':'O projeto fica sob responsabilidade de PLH.|10.4.8',
        'Projeto só depois da desmontagem, para registro':'O projeto corresponde ao executado durante toda a vida da instalação.|10.4.13',
        'Projeto só se a carga do canteiro passar de 75 kW':'A NR-10 não usa carga instalada como critério para o projeto.|10.15.3'}},
    {f:'F2 · Proteção',ty:'q',n:'As tomadas novas ficam no pátio, fora de qualquer edificação, e vão alimentar ferramentas portáteis.',q:'O DR de alta sensibilidade nesses circuitos é…',
      o:['Obrigatório, como proteção coletiva adicional: tomadas em áreas externas à edificação (10.6.4 b)','Opcional, porque a instalação é provisória',
        'Obrigatório só daqui a um ano, como nas instalações existentes','Dispensado se as tomadas tiverem pino de terra','Obrigatório só para tomadas acima de 32 A'],a:0,
      x:'O 10.6.4 b torna obrigatório o DDR de alta sensibilidade nos circuitos que alimentam tomadas em áreas externas à edificação. O adiamento do art. 3º vale só para a alínea e, e só para instalações existentes.',
      r:['10.6.4','art3','g-adic'],foco:['tomext','drq'],
      w:{'Opcional, porque a instalação é provisória':'O 10.6.4 b não distingue instalação provisória.|10.6.4,10.2.1',
        'Obrigatório só daqui a um ano, como nas instalações existentes':'O art. 3º adia só a alínea e do 10.6.4, e só para instalações existentes; esta é a alínea b, num circuito novo.|art3,10.6.4',
        'Dispensado se as tomadas tiverem pino de terra':'Aterramento é proteção supletiva (10.6.3); o DDR é proteção adicional obrigatória que se soma a ela.|10.6.3,10.6.4',
        'Obrigatório só para tomadas acima de 32 A':'32 A aparece na alínea c, para tomadas internas que alimentam equipamentos no exterior; a alínea b não tem limite de corrente.|10.6.4'}},
    {f:'F3 · Ronda no canteiro',ty:'hunt',n:'Antes de mexer no QDP, Tiago e Marta fazem uma ronda pelo canteiro.',p:'Encontre as 5 situações que contrariam a NR-10.',
      alvos:{qdp:{t:'Porta do QDP aberta, sem sinalização',b:'Fora de intervenção, a porta fica permanentemente fechada, com sinalização do nível de tensão, de choque e arco e de restrição de acesso (10.7.7.1). A placa vai para a porta, que fecha assim que a ronda acabar.',r:['10.7.7.1'],fx:S=>{S.placa=true;}},
        sacos:{t:'Sacos de cimento dentro do QDP',b:'Invólucro de equipamento elétrico não é depósito (10.12.8).',r:['10.12.8'],fx:S=>{S.sacos=false;}},
        drq:{t:'DR nunca testado',b:'Os sistemas de proteção são inspecionados, testados e controlados periodicamente (10.12.7). O teste entra na rotina do canteiro.',r:['10.12.7'],fx:S=>{S.drOk=true;}},
        interf:{t:'Interfone no eletroduto de força',b:'Circuitos de finalidades distintas são identificados e instalados separadamente, salvo compartilhamento definido em projeto (10.4.3.1, 10.12.10).',r:['10.4.3.1','10.12.10'],fx:S=>{S.interf=false;}},
        vergalhao:{t:'Vergalhões erguidos junto à rede de 13,8 kV',b:'Um vergalhão de 6 m é extensão condutora e pode entrar na zona controlada (Rc = 1,38 m): isso é trabalho em proximidade, só para autorizados (10.2.2, 10.14.1). Para quem trabalha na vizinhança, análise de risco e instrução formal (10.14.1.2). O material passa a ser movimentado longe da rede.',r:['10.2.2','AII','10.14.1','10.14.1.2'],fx:S=>{S.verg=false;}}}},
    {f:'F4 · Estrangeiro',ty:'q',n:'Klaus, técnico alemão do fabricante do elevador de obra, chega para 12 dias de montagem e ajustes elétricos no quadro do elevador, dentro da zona controlada.',q:'O que a NR-10 exige para ele?',
      o:['Treinamento Específico e pontual (8 h), com acompanhamento presencial e permanente de trabalhador autorizado, sob responsabilidade de PLH','Básico de 40 h, como qualquer autorizado',
        'Nada: o treinamento feito na Alemanha vale aqui','Específico e pontual (8 h), e depois ele pode trabalhar sozinho','Específico e pontual, válido para permanência de até 90 dias'],a:0,
      x:'O 10.9.8 cria o treinamento Específico e pontual para profissionais estrangeiros e/ou não residentes no país que entram na zona controlada para serviços pontuais, com permanência máxima de 30 dias corridos, sob acompanhamento presencial e permanente de trabalhador autorizado e responsabilidade de PLH. Carga: 8 h (Quadro I).',
      r:['10.9.8','10.9.2'],foco:['klaus','marta'],pre:S=>{S.klaus=true;},
      w:{'Básico de 40 h, como qualquer autorizado':'Para estrangeiro ou não residente em serviço pontual de até 30 dias, o treinamento previsto é o Específico e pontual.|10.9.8,10.9.2',
        'Nada: o treinamento feito na Alemanha vale aqui':'O 10.9.8 manda a organização promover o Específico e pontual.|10.9.8',
        'Específico e pontual (8 h), e depois ele pode trabalhar sozinho':'O acompanhamento presencial e permanente de trabalhador autorizado vale durante todo o serviço.|10.9.8',
        'Específico e pontual, válido para permanência de até 90 dias':'O limite é de 30 dias corridos.|10.9.8'}},
    {f:'F5 · Reenergização',ty:'seq',ref:'10.13.2',n:'O circuito da betoneira foi ligado com o QDP desenergizado pela sequência do 10.13.1. Um ajudante da obra se aproximou para olhar. Agora a volta, alínea por alínea do 10.13.2.',
      p:'Clique nos objetos na ordem da sequência de reenergização.',pre:S=>{Object.assign(S,{dg:false,lock:true,tag:true,ground:true,barrier:true,cones:true,tools:true,ajud:true,klaus:false,qdpOpen:true});},
      acts:[{hs:['cone'],k:'a',t:'Retirar cones e fita',b:'Primeiro os obstáculos de delimitação e sinalização.',fx:S=>{S.cones=false;}},
        {hs:['ferr'],k:'b',t:'Recolher ferramentas e sobras de cabo',b:'Nada fica dentro do QDP.',fx:S=>{S.tools=false;}},
        {hs:['ajud'],k:'c',t:'Retirar o ajudante das imediações',b:'Ele não participa da reenergização.',fx:S=>{S.ajud=false;}},
        {hs:['atr'],k:'d',t:'Remover o aterramento temporário e a equipotencialização',b:'Só agora, com área, ferramentas e pessoas liberadas.',fx:S=>{S.ground=false;}},
        {hs:['ant','bornes'],k:'e',t:'Retirar o anteparo dos bornes de entrada',b:'A proteção dos elementos energizados sai depois do aterramento.',fx:S=>{S.barrier=false;}},
        {hs:['eti'],k:'f',t:'Remover a etiqueta de impedimento',b:'',fx:S=>{S.tag=false;}},
        {hs:['cad','dg'],k:'g',t:'Retirar o cadeado e religar o disjuntor geral',b:'Pelo mesmo trabalhador que o colocou [PRÁTICA]. Porta fechada em seguida.',fx:S=>{S.lock=false;S.dg=true;S.qdpOpen=false;}}],
      esp:(h,cur,S)=>{
        if(h==='dg'&&S.ground)return {t:'Religamento com aterramento instalado',b:'Religar com o aterramento temporário ainda ligado inverte a sequência do 10.13.2. Não seguir a sequência de reenergização é grave e iminente risco (10.16.1 b).',r:['10.13.2','10.16.1'],gir:1};
        if(h==='atr'&&S.ground&&cur.k<'d')return {t:'Aterramento retirado cedo',b:'O aterramento sai só na alínea d, depois da delimitação (a), das ferramentas (b) e das pessoas não envolvidas (c).',r:['10.13.2']};
        return null;}},
    {f:'Fiscalização',ty:'q',n:'Semanas depois, um auditor-fiscal do trabalho flagra um servente, sem treinamento nem autorização, ligando os cabos de uma serra circular nos bornes do QDP.',q:'Como a NR-10 trata essa situação?',
      o:['Grave e iminente risco (10.16.1 c): permite embargo ou interdição sem a metodologia da NR-3','Não conformidade leve, porque a instalação é provisória',
        'Grave e iminente risco só se houver acidente','Infração da construtora, mas sem possibilidade de interdição','Grave e iminente risco pela alínea a, por ser canteiro de obra'],a:0,
      x:'Serviço em eletricidade feito por trabalhador que não atende ao capítulo 10.10 é a alínea c do 10.16.1, que dispensa a metodologia da NR-3 para embargo ou interdição.',
      r:['10.16.1','10.10.2.1'],foco:['qdp'],
      w:{'Não conformidade leve, porque a instalação é provisória':'O 10.16.1 não distingue instalação provisória.|10.16.1,10.2.1',
        'Grave e iminente risco só se houver acidente':'O 10.16.1 não depende de acidente.|10.16.1',
        'Infração da construtora, mas sem possibilidade de interdição':'O 10.16.1 permite embargo ou interdição.|10.16.1',
        'Grave e iminente risco pela alínea a, por ser canteiro de obra':'A alínea a é a área classificada sem proteção coletiva; aqui é a alínea c.|10.16.1'}}];

  makeStory({id:'hist_obra',store:'hist_obra',name:'Uma OS no canteiro de obra',short:'Canteiro 380 V',scene:'Canteiro de obra · QDP provisório',
    aria:'Canteiro de obra com quadro provisório, betoneira e rede de 13,8 kV na calçada, com objetos clicáveis',explore:'Comece pelo QDP, pela rede da calçada ou pelo carrinho.',
    primer:{logic:'Uma instalação temporária também é instalação: projeto com PLH, DR nas tomadas externas, proteção testada e invólucro sem entulho. O canteiro ainda traz o estrangeiro do 10.9.8, a rede de média tensão vizinha (extensões condutoras) e a sequência de reenergização do 10.13.2.',
      links:[['zonas','Vergalhão perto da rede: zona controlada e extensões condutoras.',['10.2.2','AII']],['desenergizado','A fase F5 é a sequência do 10.13.2.',['10.13.2']],['pessoas','O técnico estrangeiro usa o 10.9.8.',['10.9.8']]]},
    brief:'Uma ordem de serviço numa instalação provisória de canteiro: projeto, DR, ronda de não conformidades, técnico estrangeiro e reenergização.',
    base:['10.2.1','10.6.4','10.12.7','10.9.8','10.13.2','10.16.1'],HS,S0,ST,
    draw(S,K){const {tx,rc,hs,person}=K;const o=[];
      o.push(rc(0,96,1000,334,'sc-sky'),rc(0,430,1000,210,'sc-soil'),`<line x1="0" y1="430" x2="1000" y2="430" class="sc-edge"/>`);
      // prédio em obra ao fundo
      o.push(rc(380,150,300,280,'sc-cub',2)+[0,1,2,3,4,5].map(i=>`<line x1="380" y1="${190+i*40}" x2="680" y2="${190+i*40}" class="sc-rule"/>`).join('')+tx(530,140,'EDIFÍCIO EM OBRA','sc-lab','middle'));
      // rede de MT, poste e tapume
      o.push(hs('rede',[0,104,240,40],rc(30,110,10,320,'sc-pole',2)+[0,1,2].map(i=>`<line x1="0" y1="${118+i*10}" x2="240" y2="${118+i*10}" class="sc-wire"/>`).join('')+tx(120,156,'rede 13,8 kV','sc-tiny','middle')));
      o.push(rc(0,330,250,100,'sc-tapume')+tx(125,388,'TAPUME','sc-tiny','middle'));
      if(S.verg)o.push(hs('vergalhao',[150,140,96,470],`<line x1="160" y1="140" x2="210" y2="420" class="sc-rebar"/><line x1="176" y1="146" x2="222" y2="420" class="sc-rebar"/>`+`<circle cx="232" cy="472" r="16" class="sc-skin"/>`+rc(222,454,20,9,'sc-helmet',4)+`<path d="M210 490 h44 v62 h-44z" class="sc-coat3"/>`+rc(215,552,13,44,'sc-pants')+rc(236,552,13,44,'sc-pants')+tx(232,614,'Servente','sc-name','middle')));
      // QDP
      o.push(rc(270,200,96,180,'sc-cub',3)+tx(318,192,'QDP','sc-lab','middle'));
      o.push(S.qdpOpen?hs('qdp',[254,200,14,180],rc(254,200,14,180,'sc-doorleaf',2)):hs('qdp',[282,330,72,34],rc(282,330,72,34,'sc-warnplate',3)+tx(318,352,'380 V','sc-plate','middle')));
      if(S.qdpOpen){o.push(hs('bornes',[282,208,72,18],[0,1,2].map(i=>`<circle cx="${296+i*22}" cy="217" r="6" class="sc-cu"/>`).join('')));
        if(S.barrier)o.push(rc(278,204,80,26,'sc-barrier',3));
        o.push(hs('dg',[282,232,72,36],rc(282,232,72,36,'sc-panel',2)+`<circle cx="298" cy="250" r="9" class="${S.dg?'sc-red':'sc-green'}"/>`+tx(328,254,S.dg?'LIG':'DESL','sc-tiny','middle')
          +(S.lock?`<g class="sc-lock"><path d="M338 262 v-5 a5 5 0 0 1 10 0 v5" class="sc-shackle"/>${rc(334,262,18,14,'sc-lockbody',2)}</g>`:'')+(S.tag?rc(300,266,26,16,'sc-tag',2):'')));
        o.push(hs('drq',[282,274,40,32],rc(282,274,40,32,'sc-panel',2)+tx(302,294,'DR','sc-tiny','middle')+(S.drOk?`<circle cx="318" cy="279" r="4" class="sc-green"/>`:'')));
        o.push(SCX.breakers(K,326,276,1,2,26,12));
        if(S.sacos)o.push(hs('sacos',[282,312,72,40],rc(284,316,32,34,'sc-box',3)+rc(318,320,34,30,'sc-box',3)+tx(318,338,'cimento','sc-tiny','middle')));
        if(S.ground)o.push(`<path d="M300 236 C 296 300, 300 360, 318 380" class="sc-gcable"/>`);
        if(S.placa)o.push(rc(282,354,72,22,'sc-warnplate',3)+tx(318,369,'380 V','sc-plate','middle'));}
      else o.push(hs('dg',[282,232,72,36],tx(318,254,S.dg?'ligado':'desligado','sc-tiny','middle')));
      if(S.interf)o.push(hs('interf',[362,246,22,184],rc(368,260,10,170,'sc-panel',2)+`<line x1="373" y1="270" x2="373" y2="420" class="sc-wire2"/>`+tx(373,252,'interfone','sc-tiny','middle')));
      o.push(hs('tomext',[720,330,70,50],rc(720,330,70,50,'sc-panel',3)+`<circle cx="740" cy="355" r="7" class="sc-dark"/><circle cx="770" cy="355" r="7" class="sc-dark"/>`+tx(755,396,'tomadas pátio','sc-tiny','middle')));
      o.push(hs('betoneira',[820,300,120,130],`<ellipse cx="880" cy="350" rx="48" ry="38" class="sc-tr"/>`+rc(840,380,80,40,'sc-tool',3)+`<circle cx="850" cy="424" r="8" class="sc-dark"/><circle cx="910" cy="424" r="8" class="sc-dark"/>`+tx(880,296,'betoneira','sc-tiny','middle')));
      o.push(hs('proj',[700,180,64,92],rc(700,180,64,92,'sc-paper',3)+tx(732,202,'PROJ.','sc-lab','middle')+`<line x1="710" y1="220" x2="754" y2="220" class="sc-rule"/><line x1="710" y1="232" x2="754" y2="232" class="sc-rule"/>`+tx(732,262,'QDP','sc-tiny','middle')));
      if(S.tools)o.push(hs('ferr',[290,482,80,26],rc(294,490,46,8,'sc-tool',3)+rc(344,486,8,20,'sc-tool',2)+tx(330,518,'ferramentas','sc-tiny','middle')));
      if(S.cones)o.push(hs('cone',[262,440,124,30],`<line x1="266" y1="454" x2="382" y2="454" class="sc-chain"/>`+[0,1,2].map(i=>`<path d="M${262+i*52} 468 l10 -24 l10 24z" class="sc-cone"/>`).join('')));
      // pessoas
      o.push(person('marta',430,'Marta','PLH','sc-coat1'),person('tiago',500,'Tiago','eletr.','sc-coat2'));
      if(S.klaus)o.push(person('klaus',570,'Klaus','fabr.','sc-coat3'));
      if(S.ajud)o.push(person('ajud',640,'Ajudante','obra','sc-coat3'));
      o.push(SCX.cart(K,[['atr','Aterram.',S.ground?'':SCX.atr(K)],['ant','Anteparo',S.barrier?'':SCX.ant(K)],['eti','Etiqueta',S.tag?'':SCX.eti(K)],
        ['cad','Cadeado',S.lock?'':`<g class="sc-lock"><path d="M-5 -22 v-5 a5 5 0 0 1 10 0 v5" class="sc-shackle"/>${rc(-9,-22,18,14,'sc-lockbody',2)}</g>`],['cone','Cones',S.cones?'':SCX.cone()]],680,488));
      return o.join('');}});
})();

/* ======================================================================================
   História 4 · OS 2210 · Rede de distribuição aérea de 13,8 kV (SEP), com compartilhamento de poste
   ====================================================================================== */
(()=>{
  const HS={
    poste:{t:'Poste com rede de MT, rede de BT e fibra',b:'Infraestrutura do SEP compartilhada com um provedor de telecomunicações (glossário: compartilhamento de infraestrutura).',r:['g-comp','g-sep']},
    isol:{t:'Isolador quebrado · ponto de trabalho',b:'Rede de 13,8 kV: MT. Rr = 0,38 m e Rc = 1,38 m (Anexo II).',r:['g-mt','AII']},
    mt:{t:'Rede de média tensão 13,8 kV',b:'Desligada não é desenergizada: enquanto puder ser energizada por qualquer meio, valem as regras do 10.14 (10.5.2).',r:['10.5.2','10.13.1']},
    bt:{t:'Rede de baixa tensão (continua energizada)',b:'Elemento energizado dentro da zona controlada do ponto de trabalho: alínea e do 10.13.1.',r:['10.13.1','AII']},
    fibra:{t:'Cabo de fibra óptica do provedor',b:'Compartilhamento de infraestrutura do SEP (glossário).',r:['g-comp']},
    tecprov:{t:'Técnico do provedor de internet',b:'Trabalho em proximidade com compartilhamento de infraestrutura do SEP: treinamento Específico de 40 h (10.9.9) e autorização (10.14.1). As organizações executam ações integradas quando a atuação independente é tecnicamente inviável (10.7.9).',r:['10.9.9','10.14.1','10.7.9']},
    chave:{t:'Chave fusível do trecho',b:'Seccionamento (10.13.1 a). Com recurso para impedimento de reenergização e sinalização (10.4.1).',r:['10.13.1','10.4.1']},
    cod:{t:'Rádio · centro de operação',b:'Comunicação permanente com a equipe e o centro de operação (10.12.4.1). O centro de operação também impede que outras equipes energizem o trecho (10.13.3).',r:['10.12.4.1','10.13.3']},
    ufv:{t:'Casas com painéis solares',b:'Microgeração na rede de BT: possibilidade de energização por outra fonte (10.5.2). Quem tem geração própria impede a energização de instalações de outras organizações (10.14.5).',r:['10.5.2','10.14.5']},
    cesto:{t:'Caminhão com cesto aéreo',b:'Equipamentos com isolação elétrica são adequados às tensões envolvidas, inspecionados e testados (10.12.6); os de MT/AT passam por ensaio dielétrico (10.14.4 a).',r:['10.12.6','10.14.4']},
    nuvem:{t:'Nuvens de tempestade',b:'Condições meteorológicas adversas entram na análise de risco (10.7.3 c) e podem ser condição impeditiva (10.7.3 g).',r:['10.7.3']},
    edu:{t:'Edu · encarregado',b:'Indicado pela organização para supervisionar e conduzir o serviço da equipe (10.7.6); também é autorizado (10.10.2 c).',r:['10.7.6','10.10.2']},
    fabio:{t:'Fábio · eletricista de linha',b:'Autorizado: Básico e Complementar do SEP (10.9.4, 10.9.5).',r:['10.9.4','10.9.5']},
    gil:{t:'Gil · eletricista de linha',b:'Serviço no SEP não pode ser feito individualmente (10.14.2).',r:['10.14.2']},
    det:{t:'Detector de tensão para MT',b:'Adequado à tensão e à classe de isolação, aferido (10.12.6.1).',r:['10.12.6.1','10.13.1']},
    atr:{t:'Conjunto de aterramento temporário de MT',b:'Aterramento com equipotencialização (10.13.1 d). Ferramental isolante passa por ensaio (10.14.4).',r:['10.13.1','10.14.4']},
    cobert:{t:'Coberturas isolantes',b:'Protegem os elementos energizados na zona controlada (10.13.1 e). EPC isolante passa por ensaio (10.14.4).',r:['10.13.1','10.14.4']},
    eti:{t:'Etiqueta de impedimento',b:'Sinalização de impedimento de reenergização (10.13.1 f; 10.7.7 e).',r:['10.13.1','10.7.7']},
    cone:{t:'Cones e sinalização de via',b:'Delimitação da área (10.13.1 g) e sinalização de áreas de circulação, vias públicas e veículos (10.7.7).',r:['10.13.1','10.7.7']},
    docs:{t:'PT e análise de risco da equipe',b:'A PT fica disponível no local, em meio físico ou digital, e no fim é encerrada e arquivada (10.7.2.3). A documentação vai para o PIE da distribuidora (10.15.6).',r:['10.7.2.3','10.15.6']}};
  const S0={open:false,lock:false,tag:false,ground:false,cobert:false,cones:false,prov:true,nuvem:false};
  const OS='<b>OS 2210 · Distribuidora Agreste Energia.</b> Rede de distribuição aérea de 13,8 kV numa rua residencial. Serviço programado: trocar um isolador quebrado, com a rede de MT desenergizada. No mesmo poste há a rede de BT e um cabo de fibra óptica de um provedor de internet. Equipe de linha: Edu (encarregado), Fábio e Gil.';
  const ST=[
    {f:'F1 · Briefing',ty:'q',n:OS,q:'Como esta atividade se enquadra na NR-10?',
      o:['SEP: Básico e Complementar do SEP (80 h), PIE obrigatório e serviço nunca individual','SEC em MT: Básico e Complementar de Média e Alta Tensão - SEC',
        'SEP: só o Complementar do SEP, que dispensa o Básico','SEP, mas o serviço desenergizado pode ser feito por um eletricista sozinho','SEP em alta tensão, por ser rede da distribuidora'],a:0,
      x:'A distribuição integra o SEP (glossário). O autorizado faz o Básico (10.9.4) e o Complementar do SEP (10.9.5): 40 + 40 h. Quem integra o SEP mantém o PIE (10.15.6), e serviços no SEP não podem ser feitos individualmente, energizados ou não (10.14.2). 13,8 kV é MT.',
      r:['g-sep','10.9.4','10.9.5','10.15.6','10.14.2'],foco:['poste','edu'],
      w:{'SEC em MT: Básico e Complementar de Média e Alta Tensão - SEC':'A rede da distribuidora integra o SEP; o complementar MT/AT-SEC é para o sistema de consumo.|g-sep,10.9.6',
        'SEP: só o Complementar do SEP, que dispensa o Básico':'O Básico só é dispensado para quem faz o Específico de compartilhamento (10.9.4).|10.9.4',
        'SEP, mas o serviço desenergizado pode ser feito por um eletricista sozinho':'O 10.14.2 veda o trabalho individual em todo serviço executado no SEP.|10.14.2',
        'SEP em alta tensão, por ser rede da distribuidora':'A faixa vem da tensão: 13,8 kV é MT (até 36.200 V CA).|g-mt'}},
    {f:'F2 · No local',ty:'find',n:'Chegando ao poste, a equipe encontra um técnico do provedor de internet subindo a escada para lançar fibra no mesmo poste, sem combinar nada com a distribuidora.',
      p:'Clique em quem precisa entrar no planejamento antes de começar.',alvo:['tecprov'],
      ok:{t:'Ações integradas com o provedor',b:'Quando a atuação independente é tecnicamente inviável, as organizações do compartilhamento executam ações integradas (10.7.9). Trabalhos simultâneos entram na análise de risco (10.7.3 f). O técnico do provedor faz o Específico de compartilhamento de 40 h (10.9.9).',r:['10.7.9','10.7.3','10.9.9']},
      fx:S=>{S.prov=false;}},
    {f:'F2 · Planejamento',ty:'q',n:'A chave fusível do trecho será aberta pela equipe, mas o centro de operação pode fechar remotamente o religador do alimentador, a montante.',q:'O que a NR-10 exige?',
      o:['Medidas que impeçam outras equipes ou organizações de energizar o trecho durante todo o serviço, além do impedimento de reenergização sob controle da equipe',
        'Nada: com a chave aberta, o religador não importa','Só desativar o religamento automático, como no serviço energizado','Basta avisar o centro de operação por rádio',
        'Desligar a subestação inteira durante o serviço'],a:0,
      x:'A organização garante o estado de desenergização durante toda a execução, impedindo que outras equipes ou organizações energizem as instalações (10.13.3). O impedimento de reenergização (10.13.1 c) fica sob controle dos trabalhadores envolvidos (glossário).',
      r:['10.13.3','10.13.1'],foco:['chave','cod'],
      w:{'Nada: com a chave aberta, o religador não importa':'Enquanto houver possibilidade de energização, a instalação não está desenergizada (10.5.2), e o 10.13.3 exige impedir outras equipes.|10.5.2,10.13.3',
        'Só desativar o religamento automático, como no serviço energizado':'O 10.14.3 é do serviço energizado em MT/AT na zona de risco; aqui vale a sequência completa do 10.13.1 e o 10.13.3.|10.14.3,10.13.1,10.13.3',
        'Basta avisar o centro de operação por rádio':'Aviso não é medida que impeça a energização.|10.13.3',
        'Desligar a subestação inteira durante o serviço':'A NR-10 exige medidas que impeçam a energização do trecho, não uma medida específica como essa. [INTERPRETAÇÃO]|10.13.3'}},
    {f:'F3 · Outras fontes',ty:'q',n:'Na rua há casas com painéis solares ligados à rede de BT, alimentada pelo transformador do trecho.',q:'Como a equipe trata a rede, mesmo com a chave do trecho aberta?',
      o:['Como energizada, pelo capítulo 10.14, até cumprir a sequência do 10.13.1: há possibilidade de energização por outra fonte',
        'Como desenergizada: microgeração é pequena demais para energizar a rede','Como extrabaixa tensão, porque painel solar gera corrente contínua',
        'Não se preocupa: o risco é só de quem tem a geração própria','Basta aterrar o lado da fonte principal'],a:0,
      x:'Instalação desligada, mas com possibilidade de energização por qualquer meio ou razão, segue o capítulo 10.14 (10.5.2). Só é desenergizada depois da sequência do 10.13.1. Quem tem geração própria também impede a energização de instalações de outras organizações (10.14.5).',
      r:['10.5.2','10.13.1','10.14.5'],foco:['ufv','bt'],
      w:{'Como desenergizada: microgeração é pequena demais para energizar a rede':'O 10.5.2 fala em possibilidade de energização por qualquer meio ou razão, sem limite de potência.|10.5.2',
        'Como extrabaixa tensão, porque painel solar gera corrente contínua':'A rede de BT continua em BT: a faixa depende do valor da tensão na rede.|g-bt,10.5.2',
        'Não se preocupa: o risco é só de quem tem a geração própria':'O 10.14.5 obriga quem tem geração própria, mas a equipe ainda trata a instalação pelo 10.5.2. [INTERPRETAÇÃO]|10.14.5,10.5.2',
        'Basta aterrar o lado da fonte principal':'O aterramento é uma alínea; enquanto houver outra fonte possível, a instalação não está desenergizada. [INTERPRETAÇÃO]|10.13.1,10.5.2'}},
    {f:'F4 · Desenergização',ty:'seq',ref:'10.13.1',n:'Plano fechado com o provedor e o centro de operação. Agora a desenergização do trecho, alínea por alínea do 10.13.1.',
      p:'Clique nos objetos na ordem da sequência.',
      acts:[{hs:['chave'],k:'a',t:'Abrir a chave fusível do trecho',b:'Seccionamento com abertura visível.',fx:S=>{S.open=true;}},
        {hs:['det','mt'],k:'b',t:'Constatar a ausência de tensão na rede de MT',b:'Detector adequado à tensão e testado antes [PRÁTICA].'},
        {hs:['chave','cod'],k:'c',t:'Bloquear a chave e registrar o impedimento no centro de operação',b:'Impedimento sob controle da equipe; o centro de operação não manobra o trecho.',fx:S=>{S.lock=true;}},
        {hs:['det','isol'],k:'d',t:'Constatar de novo, nos pontos de aterramento',b:'A constatação se repete antes de aterrar.'},
        {hs:['atr'],k:'d',t:'Instalar o aterramento temporário dos dois lados do ponto de trabalho',b:'Com equipotencialização dos condutores [os dois lados: PRÁTICA].',fx:S=>{S.ground=true;}},
        {hs:['cobert','bt'],k:'e',t:'Cobrir a rede de BT, que continua energizada',b:'Ela fica dentro da zona controlada do ponto de trabalho.',fx:S=>{S.cobert=true;}},
        {hs:['eti','chave'],k:'f',t:'Sinalizar o impedimento de reenergização na chave',b:'',fx:S=>{S.tag=true;}},
        {hs:['cone'],k:'g',t:'Delimitar e sinalizar a área na rua',b:'Inclui a sinalização para veículos e pedestres.',fx:S=>{S.cones=true;}}],
      esp:(h,cur,S)=>{
        if(h==='atr'&&!S.ground&&cur.hs[0]!=='atr')return {t:'Aterramento sem constatação',b:'A alínea d manda constatar a ausência de tensão para instalar o aterramento. Pular a constatação é grave e iminente risco (10.16.1 b).',r:['10.13.1','10.16.1'],gir:1};
        if((h==='chave'||h==='cod')&&cur.k==='b')return {t:'Impedimento antes da constatação',b:'No 10.13.1, a constatação da ausência de tensão (alínea b) vem antes do impedimento de reenergização (alínea c).',r:['10.13.1']};
        return null;}},
    {f:'F5 · Tempo',ty:'q',n:'Com o serviço pela metade, nuvens carregadas chegam, e há raios a poucos quilômetros.',q:'O que a equipe faz?',pre:S=>{S.nuvem=true;},
      o:['Interrompe o serviço: condições meteorológicas adversas entram na análise de risco e podem ser condição impeditiva','Continua: a rede está aterrada, então não há risco',
        'Continua, com luvas isolantes','Continua, se o encarregado autorizar verbalmente','Só para se começar a chover no local'],a:0,
      x:'A análise de risco considera as condições meteorológicas adversas (10.7.3 c) e as condições impeditivas (10.7.3 g); a PT também traz as condições impeditivas (10.7.2.1 e). Condição impeditiva impede a realização ou a continuidade do serviço (glossário). [INTERPRETAÇÃO: a decisão concreta sai da análise de risco da equipe.]',
      r:['10.7.3','10.7.2.1'],foco:['nuvem','edu'],
      w:{'Continua: a rede está aterrada, então não há risco':'O aterramento não afasta as condições meteorológicas adversas da análise de risco.|10.7.3',
        'Continua, com luvas isolantes':'EPI é o último nível da hierarquia e não resolve condição impeditiva.|10.5.4,10.7.3',
        'Continua, se o encarregado autorizar verbalmente':'Condição impeditiva prevista na análise de risco e na PT não é dispensada verbalmente.|10.7.3,10.7.2.1',
        'Só para se começar a chover no local':'A análise de risco considera condições meteorológicas adversas, não só a chuva no local.|10.7.3'}},
    {f:'Encerramento',ty:'q',n:'O tempo melhorou, o isolador foi trocado e o trecho foi reenergizado pela sequência do 10.13.2.',q:'Onde fica a documentação deste serviço?',pre:S=>{Object.assign(S,{nuvem:false,ground:false,cobert:false,tag:false,lock:false,open:false,cones:false});},
      o:['No PIE da distribuidora, sob responsabilidade de PLH, que também traz os procedimentos de resposta a emergências e o sistema de resgate',
        'Só no caminhão, até o fim do turno','No PIE do provedor de internet','Em lugar nenhum: serviço desenergizado não gera documento','Só com a ANEEL'],a:0,
      x:'A PT é encerrada e arquivada para rastreabilidade (10.7.2.3). Quem integra o SEP organiza a documentação do 10.15.4 na forma de PIE, sob responsabilidade de PLH (10.15.6), com procedimentos de resposta a emergências e o sistema de resgate disponível (10.15.6.1).',
      r:['10.15.6','10.15.6.1','10.7.2.3'],foco:['docs'],
      w:{'Só no caminhão, até o fim do turno':'No fim, a PT é encerrada e arquivada para rastreabilidade.|10.7.2.3',
        'No PIE do provedor de internet':'O serviço e a PT são da distribuidora, que integra o SEP e mantém o próprio PIE.|10.15.6',
        'Em lugar nenhum: serviço desenergizado não gera documento':'O serviço não rotineiro tem PT (10.7.2), e o 10.15.4 exige procedimentos, análises de risco e PT.|10.7.2,10.15.4',
        'Só com a ANEEL':'A NR-10 manda a organização manter a documentação disponível aos trabalhadores e à Inspeção do Trabalho (10.15.2).|10.15.2'}}];

  makeStory({id:'hist_sep',store:'hist_sep',name:'Uma OS na rede de distribuição',short:'Rede 13,8 kV (SEP)',scene:'Rede aérea de distribuição · SEP',
    aria:'Rua com poste de rede de 13,8 kV, rede de BT, fibra óptica e caminhão com cesto aéreo, com objetos clicáveis',explore:'Comece pelo poste, pela chave fusível ou pelo caminhão.',
    primer:{logic:'Uma OS no SEP: treinamentos de 80 h, PIE e equipe sempre com mais de uma pessoa. O poste é compartilhado com um provedor de fibra (ações integradas), o centro de operação pode religar o trecho (10.13.3), a microgeração da rua é outra fonte (10.5.2) e o tempo pode virar condição impeditiva.',
      links:[['desenergizado','A fase F4 é a sequência do 10.13.1 no SEP.',['10.13.1','10.13.3']],['enq','Enquadramento SEP × SEC.',['g-sep']],['energizado','Geração própria e trabalho individual.',['10.14.5','10.14.2']]]},
    brief:'Uma ordem de serviço numa rede de distribuição de 13,8 kV: compartilhamento de poste, centro de operação, microgeração e tempo ruim.',
    base:['10.14.2','10.13.3','10.5.2','10.7.9','10.7.3','10.15.6'],HS,S0,ST,
    draw(S,K){const {tx,rc,hs,person}=K;const o=[];
      o.push(rc(0,96,1000,334,'sc-sky'),rc(0,430,1000,210,'sc-road'),`<line x1="0" y1="430" x2="1000" y2="430" class="sc-edge"/>`,`<line x1="0" y1="540" x2="1000" y2="540" class="sc-lane"/>`);
      if(S.nuvem)o.push(hs('nuvem',[20,100,220,70],`<ellipse cx="90" cy="135" rx="70" ry="28" class="sc-cloud"/><ellipse cx="170" cy="128" rx="60" ry="26" class="sc-cloud"/><path d="M150 150 l-14 26 h12 l-8 24 l26 -34 h-12 l10 -16z" class="sc-bolt"/>`));
      // casas com painel solar
      o.push(hs('ufv',[800,250,190,180],rc(810,320,80,110,'sc-cub',2)+`<path d="M800 322 L850 270 L900 322z" class="sc-roof"/><path d="M818 312 L850 280 L868 298 L836 330z" class="sc-pv"/>`
        +rc(900,330,80,100,'sc-cub',2)+`<path d="M892 332 L940 288 L988 332z" class="sc-roof"/><path d="M906 324 L940 294 L958 312 L924 342z" class="sc-pv"/>`+tx(895,446,'casas com solar','sc-tiny','middle')));
      // fios
      o.push(hs('mt',[0,140,780,22],[0,1,2].map(i=>`<line x1="0" y1="${146+i*6}" x2="780" y2="${146+i*6}" class="sc-wire"/>`).join('')+tx(700,138,'MT 13,8 kV','sc-tiny')));
      o.push(hs('bt',[0,226,780,18],[0,1].map(i=>`<line x1="0" y1="${230+i*8}" x2="780" y2="${230+i*8}" class="sc-wire"/>`).join('')+tx(700,222,'BT','sc-tiny')+(S.cobert?rc(410,222,180,24,'sc-barrier',4):'')));
      o.push(hs('fibra',[0,270,780,10],`<line x1="0" y1="275" x2="780" y2="275" class="sc-wire2"/>`+tx(700,268,'fibra','sc-tiny')));
      // poste principal e isoladores
      o.push(hs('poste',[488,120,24,310],rc(492,120,16,310,'sc-pole',2)));
      o.push(rc(430,156,140,8,'sc-pole',2));
      o.push(hs('isol',[436,130,128,28],[0,1,2].map(i=>rc(442+i*52,134,14,22,i===1?'sc-isobad':'sc-iso',3)).join('')+(S.ground?`<path d="M500 160 C 470 220, 480 330, 500 426" class="sc-gcable"/><path d="M560 160 C 600 230, 590 330, 560 426" class="sc-gcable"/>`:'')));
      // chave fusível no poste da esquerda
      o.push(rc(170,120,14,310,'sc-pole',2));
      o.push(hs('chave',[150,150,60,60],rc(158,160,40,10,'sc-pole',2)+`<line x1="166" y1="170" x2="${S.open?150:166}" y2="${S.open?200:206}" class="sc-blade"/><line x1="190" y1="170" x2="${S.open?174:190}" y2="${S.open?200:206}" class="sc-blade"/>`
        +tx(178,222,S.open?'ABERTA':'FECHADA','sc-tiny','middle')+(S.lock?`<g class="sc-lock"><path d="M196 186 v-5 a5 5 0 0 1 10 0 v5" class="sc-shackle"/>${rc(192,186,18,14,'sc-lockbody',2)}</g>`:'')+(S.tag?rc(150,180,26,16,'sc-tag',2):'')));
      // técnico do provedor numa escada
      if(S.prov)o.push(hs('tecprov',[520,260,80,200],`<line x1="530" y1="460" x2="512" y2="270" class="sc-ladder"/><line x1="560" y1="460" x2="540" y2="270" class="sc-ladder"/>`
        +`<circle cx="560" cy="300" r="13" class="sc-skin"/>`+rc(548,314,26,46,'sc-coat3',3)+tx(586,370,'provedor','sc-tiny')));
      // caminhão com cesto
      o.push(hs('cesto',[600,300,190,140],rc(610,360,160,60,'sc-truck',4)+rc(730,330,40,40,'sc-truck',3)+`<circle cx="640" cy="424" r="13" class="sc-dark"/><circle cx="740" cy="424" r="13" class="sc-dark"/>`
        +`<line x1="640" y1="360" x2="600" y2="310" class="sc-ladder2"/>`+rc(590,296,28,20,'sc-barrier',3)+tx(690,394,'cesto aéreo','sc-tiny','middle')));
      o.push(hs('cod',[744,336,22,26],rc(746,338,18,22,'sc-dark',3)+`<line x1="755" y1="338" x2="760" y2="326" class="sc-wire"/>`));
      o.push(hs('docs',[30,300,64,92],rc(30,300,64,92,'sc-paper',3)+tx(62,322,'PT','sc-lab','middle')+`<line x1="40" y1="338" x2="84" y2="338" class="sc-rule"/><line x1="40" y1="350" x2="84" y2="350" class="sc-rule"/>`+tx(62,382,'AR','sc-tiny','middle')));
      if(S.cones)o.push(hs('cone',[300,452,420,30],`<line x1="306" y1="466" x2="716" y2="466" class="sc-chain"/>`+[0,1,2,3,4].map(i=>`<path d="M${300+i*100} 480 l10 -24 l10 24z" class="sc-cone"/>`).join('')));
      o.push(person('edu',80,'Edu','encarr.','sc-coat1'),person('fabio',160,'Fábio','linha','sc-coat2'),person('gil',240,'Gil','linha','sc-coat2'));
      o.push(SCX.cart(K,[['det','Detector',SCX.det(K)],['atr','Aterram.',S.ground?'':SCX.atr(K)],['cobert','Cobert.',S.cobert?'':SCX.ant(K)],['eti','Etiqueta',S.tag?'':SCX.eti(K)],['cone','Cones',S.cones?'':SCX.cone()]],560,488));
      return o.join('');}});
})();
