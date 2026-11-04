/* ===== História: uma ordem de serviço contada sobre o desenho da cabine (v4) =====
   Cena estática em SVG (sem animação): o desenho muda de estado a cada ação, e cada objeto
   clicável está ligado aos itens da NR-10 (Portaria MTE 737/2026) que se aplicam a ele.
   Textos normativos: só via REF (gaveta). Explicações abaixo são do simulador e citam o item. */
(()=>{
  const L='ABCDE';
  const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};

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
    pintor:{t:'Pintor terceirizado',b:'Atividade não elétrica na vizinhança da zona controlada: análise de risco e instrução formal (10.14.1.2).',r:['10.14.1.2']},
    escada:{t:'Escada de alumínio',b:'Extensão condutora: entrar na zona controlada com ela é trabalho em proximidade (10.2.2; glossário).',r:['10.2.2','g-prox']},
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
      ok:{t:'Luvas com ensaio vencido',b:'Luvas e mangas isolantes passam por ensaio dielétrico (10.14.4 b). Sem prazo menor previsto, o ensaio é anual (10.14.4.1): 14 meses é ensaio vencido. Não ensaiar EPI isolante é uma das condições de grave e iminente risco (10.16.1 d). O almoxarifado troca as luvas.',r:['10.14.4','10.14.4.1','10.16.1']},
      fx:S=>{S.luvaOk=true;}},
    {f:'F3 · Vestimenta',ty:'q',n:'O painel de 13,8 kV é aparelhagem de manobra revestida de metal. O estudo da cabine indica corrente de falha disponível de 20 kA, tempo de eliminação de 0,20 s e distância de trabalho de 910 mm.',q:'Qual vestimenta mínima o Anexo IV exige para manobrar a 89-1?',
      o:['Categoria 4: no mínimo 40 cal/cm²','Categoria 2: no mínimo 8 cal/cm²','Categoria 3: no mínimo 25 cal/cm²','Categoria 1: no mínimo 4 cal/cm²','Nenhuma: o Anexo IV não vale para média tensão'],a:0,
      x:'A linha "aparelhagem de manobra revestida de metal, 1 kV a 15 kV" do Quadro I vale até 35 kA, até 0,24 s e a partir de 910 mm: Categoria 4. O Quadro III dá no mínimo 40 cal/cm² para a Categoria 4. Os quatro parâmetros valem em conjunto (10.11.2.1).',
      r:['AIV-I','AIV-III','10.11.2.1'],foco:['roupa','s89']},
    {f:'F4 · Chegada',ty:'hunt',n:'A equipe entra na cabine. Antes de tocar em qualquer equipamento, olhe o ambiente.',p:'Encontre as 4 situações que contrariam a NR-10.',
      alvos:{qgbt:{t:'Porta do QGBT aberta',b:'Sem intervenção em curso, a porta do painel fica permanentemente fechada, com sinalização do nível de tensão e de advertência (10.7.7.1). A equipe fecha a porta.',r:['10.7.7.1'],fx:S=>{S.qgbtOpen=false;}},
        bruno:{t:'Bruno está de relógio',b:'É vedado o uso de adornos pessoais nos serviços em eletricidade (10.7.8). Bruno guarda o relógio fora da cabine.',r:['10.7.8'],fx:S=>{S.relogio=false;}},
        escada:{t:'Escada de alumínio encostada no cubículo',b:'É extensão condutora. Entrar na zona controlada com parte do corpo ou com extensões condutoras é trabalho em proximidade (10.2.2; glossário). A escada sai da cabine.',r:['10.2.2','g-prox'],fx:S=>{S.escada=false;}},
        pintor:{t:'Pintor trabalhando ao lado dos cubículos',b:'Para quem faz atividade não elétrica na vizinhança da zona controlada, a organização faz análise de risco e dá instrução formal (10.14.1.2). Ele sai da área até ser instruído.',r:['10.14.1.2','g-zc'],fx:S=>{S.pintor=false;}}}},
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
      ok:{t:'Bloquear também o lado de 380 V',b:'Alimentado pelo lado de 380 V, o transformador eleva a tensão de volta a 13,8 kV nas buchas de MT (backfeed). Enquanto a instalação puder ser energizada por qualquer meio, valem as regras do capítulo 10.14 (10.5.2), e a organização garante o estado desenergizado durante todo o serviço (10.13.3). A equipe abre e bloqueia a chave do QGBT que alimenta o TR-01. [INTERPRETAÇÃO: aplicar o 10.13.1 a todas as fontes.]',r:['10.5.2','10.13.3','10.13.1']},
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
  const NQ=ST.length;

  /* ---------- progresso ---------- */
  const H={i:0,S:Object.assign({},S0),err:0,used:{},found:[],k:0,ans:null,ord:null,fim:false};
  function load(){try{const d=Store.data.hist;if(d&&typeof d.i==='number'){Object.assign(H,d);H.S=Object.assign({},S0,d.S||{});}}catch(e){}}
  function save(){Store.data.hist={i:H.i,S:H.S,err:H.err,used:H.used,found:H.found,k:H.k,fim:H.fim};Store.save();}
  function use(r){(r||[]).forEach(x=>{H.used[x]=(H.used[x]||0)+1;});}
  function restart(){Object.assign(H,{i:0,S:Object.assign({},S0),err:0,used:{},found:[],k:0,ans:null,ord:null,fim:false});save();redraw();}
  let mode='hist',sel=null,hint=false,lastFx=null;

  /* ---------- desenho ---------- */
  const tx=(x,y,s,c,a)=>`<text x="${x}" y="${y}" class="${c||'sc-txt'}"${a?` text-anchor="${a}"`:''}>${s}</text>`;
  const rc=(x,y,w,h,c,r)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${c}"${r?` rx="${r}"`:''}/>`;
  function hs(id,box,inner){const st=[];const step=ST[H.i];
    if(mode==='hist'&&step){if(step.ty==='hunt'&&H.found.includes(id))st.push('found');
      if(hint&&((step.alvo||[]).includes(id)||(step.alvos&&step.alvos[id]&&!H.found.includes(id))||(step.ty==='seq'&&step.acts[H.k]&&step.acts[H.k].hs.includes(id))))st.push('hint');
      if(H.ans!=null&&(step.foco||[]).includes(id))st.push('rel');}
    if(sel===id)st.push('sel');
    const [x,y,w,h]=box;
    return `<g class="hs ${st.join(' ')}" data-hs="${id}" tabindex="0" role="button" aria-label="${HS[id].t}"><title>${HS[id].t}</title>${inner}<rect class="hit" x="${x-4}" y="${y-4}" width="${w+8}" height="${h+8}" rx="6"/></g>`;}
  function lock(x,y){return `<g class="sc-lock"><path d="M${x+4} ${y+8} v-5 a5 5 0 0 1 10 0 v5" class="sc-shackle"/>${rc(x,y+8,18,14,'sc-lockbody',2)}</g>`;}
  function person(id,x,name,role,color,extra){const y=600;
    return hs(id,[x-28,y-150,56,148],`<circle cx="${x}" cy="${y-128}" r="16" class="sc-skin"/>${rc(x-10,y-146,20,9,'sc-helmet',4)}
      <path d="M${x-22} ${y-110} h44 v62 h-44z" class="${color}"/>${rc(x-17,y-48,13,44,'sc-pants')}${rc(x+4,y-48,13,44,'sc-pants')}
      ${rc(x-12,y-100,24,15,'sc-badge',2)}${tx(x,y-89,role,'sc-tiny','middle')}${extra||''}${tx(x,y+14,name,'sc-name','middle')}`);}
  function scene(){const S=H.S;const o=[];
    o.push(`<svg class="hist-svg" viewBox="0 96 1000 534" role="img" aria-label="Cabine primária 13,8 kV desenhada, com objetos clicáveis">`);
    o.push(rc(0,0,1000,430,'sc-wall'),rc(0,430,1000,210,'sc-floor'),`<line x1="0" y1="430" x2="1000" y2="430" class="sc-edge"/>`);
    // porta
    o.push(hs('porta',[15,140,80,290],rc(15,140,80,290,'sc-door',3)+rc(26,175,58,44,'sc-warnplate',3)+tx(55,193,'PERIGO','sc-plate','middle')+tx(55,208,'ALTA TENSÃO','sc-plate2','middle')+`<circle cx="84" cy="300" r="4" class="sc-dark"/>`+tx(55,128,'PORTA','sc-lab','middle')));
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
    o.push(`</svg>`);return o.join('');}

  /* ---------- painel ---------- */
  let panelEl=null;
  function redraw(){drawScene();if(panelEl&&panelEl.isConnected){if(mode==='hist')drawStep(panelEl);else if(mode==='exp')drawExplore(panelEl);else drawIndex(panelEl);}}
  function drawScene(){const v=$('#mapView');if(!v||!G.mod||G.mod.id!=='historia')return;v.innerHTML=`<div class="hist-wrap">${scene()}</div>`;
    $$('[data-hs]',v).forEach(g=>{g.onclick=()=>pick(g.dataset.hs);g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();pick(g.dataset.hs);}};});}
  function bar(){return `<div class="prog"><span class="num">Passo ${Math.min(H.i+1,NQ)} de ${NQ}</span><div class="bar"><i style="width:${H.i/NQ*100}%"></i></div><span class="num">erros ${H.err}</span></div>`;}
  function next(){const st=ST[H.i];H.i++;H.ans=null;H.ord=null;H.found=[];H.k=0;hint=false;
    if(H.i>=NQ){H.fim=true;markDone('historia','a');}else if(ST[H.i].pre)ST[H.i].pre(H.S);save();redraw();$('#panel').scrollTop=0;}
  function wrongInfo(h,why){const i=HS[h];H.err++;miss(i.r);save();fb({k:'err',t:why||('Não é isto: '+i.t),b:i.b,r:i.r});}
  function drawStep(el){if(H.fim||H.i>=NQ){drawEnd(el);return;}const st=ST[H.i];
    let h=`${bar()}<div class="eyebrow">${st.f}</div><div class="hist-n">${st.n}</div>`;
    if(st.ty==='q'){if(!H.ord)H.ord=shuffle(st.o.map((_,i)=>i));
      h+=`<div class="q"><div class="qq">${st.q}</div>${H.ord.map((oi,j)=>`<button type="button" class="opt ${H.ans!=null?(oi===st.a?'right':(oi===H.ans?'wrong':'')):''}" data-j="${oi}" ${H.ans!=null?'disabled':''}><span class="ol">${L[j]}</span><span>${st.o[oi]}</span></button>`).join('')}</div>`;
      if(H.ans!=null)h+=cardHTML({k:H.ans===st.a?'ok':'err',t:H.ans===st.a?'Correto':'Resposta: '+L[H.ord.indexOf(st.a)],b:st.x,r:st.r})+`<p class="lead">Na cena, os objetos ligados a esta decisão estão destacados.</p><div class="row-actions"><button type="button" class="btn primary" data-a="go">Continuar a história</button></div>`;}
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
    el.innerHTML=`<div class="score">História concluída · ${H.err} erro(s)</div><p class="lead">Estes são os itens da NR-10 que você aplicou na cabine. Abra cada um para ler o texto da Portaria.</p>
      <div class="cr">${refs.map(r=>R(r)).join('')}</div>
      <p class="lead">As decisões desta história também entram no Treino (simulado e revisão espaçada).</p>
      <div class="row-actions"><button type="button" class="btn primary" data-a="again">Jogar de novo</button><button type="button" class="btn" data-a="map">Ver itens × cena</button></div>`;
    $('[data-a=again]',el).onclick=restart;$('[data-a=map]',el).onclick=()=>gotoTask('c');}

  /* ---------- explorar e índice ---------- */
  function drawExplore(el){const i=sel&&HS[sel];
    el.innerHTML=`<p class="lead">Clique em qualquer objeto da cabine para ver o que ele é e quais itens da NR-10 se aplicam a ele. A cena mostra o estado em que a história parou.</p>
      ${i?cardHTML({k:'info',t:i.t,b:i.b,r:i.r}):'<div class="card info"><div class="ct">Nenhum objeto selecionado</div><div class="cb">Comece pela porta, pelos cubículos ou pelo carrinho de ferramentas.</div></div>'}`;}
  function drawIndex(el){const inv={};Object.entries(HS).forEach(([id,o])=>o.r.forEach(r=>{(inv[r]=inv[r]||[]).push(id);}));
    const keys=Object.keys(inv).sort((a,b)=>a.localeCompare(b,'pt',{numeric:true}));
    el.innerHTML=`<p class="lead">Cada item da NR-10 e o objeto da cena onde ele aparece. Clique no objeto para destacá-lo no desenho.</p>
      <div class="cl">${keys.map(r=>`<div class="cl-row"><div class="t">${R(r)} <b>${REF[r]?REF[r].t:''}</b></div><div class="hist-objs">${inv[r].map(id=>`<button type="button" class="mlink" data-o="${id}">${HS[id].t.split(' · ')[0]}</button>`).join(' ')}</div></div>`).join('')}</div>`;
    $$('[data-o]',el).forEach(b=>b.onclick=()=>{sel=b.dataset.o;drawScene();fb({k:'info',t:HS[sel].t,b:HS[sel].b,r:HS[sel].r});});}

  const mod={id:'historia',phase:'H',name:'Uma OS na cabine primária',short:'Cabine 13,8 kV',scene:'Cabine primária 13,8 kV',view:'map',vpE:'História',
    primer:{logic:'A história percorre uma ordem de serviço real, do enquadramento à fiscalização, sobre o desenho de uma cabine primária. Cada decisão é tomada no ambiente: quem entra na equipe, que EPI serve, o que está errado na sala, em que ordem se mexe em cada dispositivo. O desenho muda a cada ação, e cada objeto mostra os itens da NR-10 que valem para ele.',
      links:[['desenergizado','A sequência das fases F6 e F8 é a do 10.13.',['10.13.1','10.13.2']],['pessoas','A escolha da equipe usa qualificação, capacitação e autorização.',['10.8.3.3','10.10.2.1']],['individual','A vestimenta sai do Anexo IV.',['AIV-I']],['treino','As decisões da história entram no simulado e na revisão.',['10.7.2']]]},
    brief:'Uma ordem de serviço contada passo a passo no desenho da cabine. Você decide, clica nos objetos e vê quais itens da NR-10 se aplicam a cada um.',
    base:['10.7.2','10.13.1','10.13.2','10.16.1','AIV-I'],cam:{theta:.4,phi:1.1,r:10,t:[0,1,0],rMax:20},
    reset(){},build(){},drawMap:drawScene,
    onTask(id){mode=id==='a'?'hist':id==='b'?'exp':'idx';sel=null;hint=false;drawScene();},
    tasks:[{id:'a',title:'História',render(el){panelEl=el;mode='hist';drawStep(el);}},
      {id:'b',title:'Explorar a cena',free:1,render(el){panelEl=el;mode='exp';drawExplore(el);}},
      {id:'c',title:'Itens × cena',free:1,render(el){panelEl=el;mode='idx';drawIndex(el);}}]};
  load();
  QB.add('historia',ST.filter(s=>s.ty==='q'));
  window.__hist={ST,HS,H};
  MODS.push(mod);})();
