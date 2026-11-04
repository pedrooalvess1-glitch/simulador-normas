/* ===== Treino estilo banca (v4): 5 alternativas e o porquê de cada alternativa errada =====
   Camada sobre o banco QB, chaveada pelo ID da questão (módulo:índice). Não muda as questões dos módulos:
   completa as alternativas até 5 e explica cada alternativa errada, citando o item da NR-10 (Portaria MTE 737/2026).
   Formato de cada entrada:
     e: alternativas erradas acrescentadas;  drop: alternativas retiradas (para ficar em 5);
     o + a: troca completa das alternativas (usado nas listas de classificação, que tinham 2 a 4 rótulos);
     p: novo enunciado antes da situação citada;  w: {texto da alternativa: 'por que está errada|itens,citados'}.
   Tudo aqui é explicação do simulador (inferência a validar em docs/VALIDACAO_DO_CONTEUDO.md), não texto da norma. */
const BANCA=(()=>{
  /* ---------- modelos compartilhados pelas listas de classificação ---------- */
  const G={a:'Grave e iminente risco: alínea a do 10.16.1 (área classificada sem proteção coletiva)',
    b:'Grave e iminente risco: alínea b do 10.16.1 (desenergização ou reenergização fora do 10.13)',
    c:'Grave e iminente risco: alínea c do 10.16.1 (trabalhador que não atende ao capítulo 10.10)',
    d:'Grave e iminente risco: alínea d do 10.16.1 (falta de ensaios e testes de isolação)',
    n:'Não conformidade, mas fora da lista do 10.16.1'};
  const GO=[G.a,G.b,G.c,G.d,G.n];
  const GW={[G.a]:'A alínea a é só a ausência de medidas de proteção coletiva em instalações elétricas de áreas classificadas.|10.16.1',
    [G.b]:'A alínea b é a não adoção da sequência de desenergização (10.13.1) ou de reenergização (10.13.2), ou das alternativas do 10.13.4.|10.16.1',
    [G.c]:'A alínea c é serviço em eletricidade ou trabalho em proximidade feito por quem não atende ao capítulo 10.10 (autorização).|10.16.1',
    [G.d]:'A alínea d é a não realização de ensaios e testes de isolação em equipamentos, ferramentas, dispositivos isolantes e EPI/EPC.|10.16.1'};
  const gir=(a,nc)=>({p:'Pelo 10.16.1, como se enquadra esta situação?',o:GO,a:GO.indexOf(G[a]),w:Object.assign({},GW,{[G.n]:nc})});

  const P={pt:'Procedimento de trabalho aprovado por PLH: a atividade é rotineira',
    t:'Permissão de trabalho, precedida de análise de risco e aprovada por trabalhador autorizado: a atividade é não rotineira',
    x:'Permissão de trabalho, porque toda intervenção com o painel aberto exige PT',
    f:'Procedimento de trabalho, porque a atividade é feita com frequência mensal ou maior',
    v:'Nenhum documento: basta a ordem de serviço do supervisor'};
  const PO=[P.pt,P.t,P.x,P.f,P.v];
  const PW={[P.x]:'A NR-10 não liga a PT a painel aberto: PT é para o não rotineiro (10.7.2); fora de área classificada (10.6.6.1.2), o rotineiro segue procedimento (10.7.1).|10.7.1,10.7.2,10.6.6.1.2',
    [P.f]:'Rotineira independe da frequência (glossário): o critério é ser habitual e fazer parte do processo contínuo de trabalho. Se o documento está certo, o motivo está errado.|g-rot',
    [P.v]:'O rotineiro tem procedimento de trabalho (10.7.1) e o não rotineiro tem PT (10.7.2); ordem verbal não é nenhum dos dois.|10.7.1,10.7.2'};
  const rot=(certo,porque)=>({p:'Que documento libera esta atividade?',o:PO,a:certo?0:1,w:Object.assign({},PW,certo?{[P.t]:porque}:{[P.pt]:porque})});

  const T5='Só quem integra o SEP';
  const TW={'Toda organização':'De toda organização, o 10.15.3 exige só o projeto elétrico e a documentação das inspeções e medições do aterramento.|10.15.3',
    'Quem tem trabalhadores autorizados':'O 10.15.4 lista procedimentos, análises de risco e PT; especificação de EPC, EPI e ferramental; comprovação de qualificação, treinamentos e autorização; relatórios de testes de isolação.|10.15.4',
    'Quem tem área classificada':'O 10.15.5 lista os procedimentos, análises de risco e PT do 10.6.6.1.2, a certificação dos equipamentos em área classificada e as inspeções de conformidade.|10.15.5',
    'Conteúdo do PIE':'O conteúdo próprio do PIE é o procedimento de resposta a emergências (10.15.6.1); o resto do PIE vem do 10.15.4 e do 10.15.5.|10.15.6.1,10.15.6',
    [T5]:'Nenhum documento do 10.15 é exclusivo do SEP: o capítulo separa toda organização (10.15.3), quem tem autorizados (10.15.4), quem tem área classificada (10.15.5) e o PIE (10.15.6).|10.15.3,10.15.4,10.15.5,10.15.6'};
  const tx={e:[T5],w:TW};

  const NA='N/A · resistente a arco, portas fechadas',FA='Fora do Anexo IV · estudo de energia incidente';
  const C3='O Quadro I (CA) não tem nenhuma linha de Categoria 3; ela só aparece no Quadro II (CC).|AIV-I';
  const C1='Categoria 1 só existe na linha de painéis ou outros equipamentos de até 240 V.|AIV-I';
  const vf=(o,a,w)=>({p:'Pela NR-10, esta afirmação é verdadeira ou falsa?',o,a,w});

  return {
  /* ===== I Aplicação: enquadramento ===== */
  'enq:0':{e:['Fora da NR-10, por ser corrente contínua'],w:{
    'EBT':'A EBT em corrente contínua vai até 120 V; 1.200 Vcc está muito acima.|g-ebt',
    'MT':'A MT em corrente contínua começa acima de 1.500 V; 1.200 Vcc ainda é BT.|g-mt',
    'AT':'A AT em corrente contínua é acima de 3.000 V.|g-at',
    'Fora da NR-10, por ser corrente contínua':'O 10.2.1 inclui instalações em corrente alternada e/ou contínua, e o glossário dá as faixas também em CC.|10.2.1,g-bt'}},
  'enq:1':{e:['EBT','Fora da NR-10: é instalação do consumidor'],w:{
    'BT':'A BT em corrente alternada vai só até 1.000 V; 13,8 kV passa disso.|g-bt',
    'AT':'A AT em corrente alternada começa acima de 36.200 V; 13,8 kV fica abaixo.|g-at',
    'EBT':'A EBT em corrente alternada vai até 50 V.|g-ebt',
    'Fora da NR-10: é instalação do consumidor':'O 10.2.1 alcança geração, transmissão, distribuição e consumo, em baixa, média e/ou alta tensão.|10.2.1'}},
  'enq:2':{e:['Sim, porque toda instalação em corrente contínua está na NR-10','Não: a NR-10 só alcança corrente alternada'],w:{
    'Sim, integralmente':'48 Vcc não passa de 120 V em CC: é EBT, e o 10.2.4 exclui a EBT da NR-10.|10.2.4,g-ebt',
    'Só o capítulo de EPI':'A única exceção do 10.2.4 é o 10.6.6 (proteção contra explosão e incêndio), não o capítulo de EPI.|10.2.4',
    'Sim, porque toda instalação em corrente contínua está na NR-10':'A corrente contínua está no alcance (10.2.1), mas o 10.2.4 exclui a EBT, em CA ou em CC.|10.2.1,10.2.4',
    'Não: a NR-10 só alcança corrente alternada':'A resposta é "não", mas pelo motivo errado: o 10.2.1 inclui corrente contínua; a exclusão vem da faixa de tensão (10.2.4).|10.2.1,10.2.4'}},
  'enq:3':{e:['Sim, porque tem eletricistas próprios autorizados','Não: comércio não precisa de nenhum documento da NR-10'],w:{
    'Sim, porque passa de 75 kW':'A carga instalada não é critério no 10.15.6: valem integrar o SEP ou realizar atividades em MT/AT.|10.15.6',
    'Sim, todo estabelecimento comercial':'O 10.15.6 não usa o tipo de estabelecimento como critério.|10.15.6',
    'Sim, porque tem eletricistas próprios autorizados':'Ter autorizados obriga a documentação do 10.15.4; organizá-la como PIE só é exigido de quem integra o SEP ou atua em MT/AT (10.15.6).|10.15.4,10.15.6',
    'Não: comércio não precisa de nenhum documento da NR-10':'Toda organização dispõe de projeto elétrico e da documentação das inspeções e medições do aterramento (10.15.3).|10.15.3'}},
  'enq:4':{e:['Específico e pontual, 8 h','Básico 40 h + Específico de compartilhamento 40 h'],w:{
    'Básico 40 h + Complementar SEP 40 h':'O 10.9.4 e o 10.9.5 dispensam o Básico e o Complementar do SEP de quem faz o Específico de compartilhamento.|10.9.4,10.9.5',
    'Nenhum: não mexem na rede elétrica':'Trabalho em proximidade com compartilhamento de infraestrutura do SEP exige o Específico (10.9.9) e trabalhador autorizado (10.14.1).|10.9.9,10.14.1',
    'Específico e pontual, 8 h':'O Específico e pontual é para profissionais estrangeiros e/ou não residentes no país, em serviços pontuais de até 30 dias (10.9.8).|10.9.8',
    'Básico 40 h + Específico de compartilhamento 40 h':'O 10.9.4 exclui do Básico quem faz o Específico de compartilhamento.|10.9.4'}},
  'enq:5':{e:['Até a medição, exclusive','Só até a transmissão; a distribuição é outro sistema'],w:{
    'Até a subestação da distribuidora':'O glossário estende o SEP pela distribuição até a medição, inclusive; a subestação fica antes.|g-sep',
    'Até o quadro geral do consumidor':'O quadro geral fica depois da medição, já na instalação do consumidor.|g-sep',
    'Até a medição, exclusive':'O glossário diz até a medição, inclusive: a medição faz parte do SEP.|g-sep',
    'Só até a transmissão; a distribuição é outro sistema':'O glossário inclui geração, transmissão e distribuição no SEP.|g-sep'}},
  'enq:6':{e:['1,00 m e 2,00 m','1,20 m e 2,20 m'],w:{
    '1,10 m e 3,10 m':'É a linha ≥ 110 e < 132 kV; 138 kV já passou de 132.|AII',
    '1,60 m e 3,60 m':'É a linha ≥ 150 e < 220 kV; 138 kV não chega a 150.|AII',
    '1,00 m e 2,00 m':'É a linha ≥ 70 e < 110 kV.|AII',
    '1,20 m e 2,20 m':'O Rr está certo, mas o Rc da linha ≥ 132 e < 150 kV é 3,20 m: a partir de 110 kV a distância entre Rr e Rc deixa de ser 1,00 m.|AII'}},
  'enq:7':{e:['Sim: todo serviço energizado, em qualquer tensão, exige mais de um trabalhador','Sim, porque 380 V já é média tensão no SEC','Não: o 10.14.2 só vale para o SEP'],w:{
    'Sim':'O 10.14.2 alcança serviço energizado em MT/AT e qualquer serviço no SEP; um QGBT de 380 V de indústria não é nenhum dos dois.|10.14.2',
    'Sim: todo serviço energizado, em qualquer tensão, exige mais de um trabalhador':'A vedação do 10.14.2 é restrita a MT/AT energizada e ao SEP.|10.14.2',
    'Sim, porque 380 V já é média tensão no SEC':'380 V é BT pelo glossário (até 1.000 V CA), em qualquer sistema.|g-bt',
    'Não: o 10.14.2 só vale para o SEP':'A resposta é "não", mas o motivo está errado: o 10.14.2 também alcança MT/AT energizada no SEC.|10.14.2'}},

  /* ===== I Aplicação: zonas ===== */
  'zonas:0':{e:['Zona controlada: qualquer trabalhador pode estar ali com instrução formal','Fora das zonas do Anexo II, por estar a mais de 0,38 m'],w:{
    'Zona livre: pode trabalhar':'Para 10 a 15 kV a zona livre começa em Rc = 1,38 m; a 1,0 m ele está na zona controlada.|AII',
    'Zona de risco':'A zona de risco vai só até Rr = 0,38 m.|AII',
    'Zona controlada: qualquer trabalhador pode estar ali com instrução formal':'A zona controlada só admite profissionais autorizados (glossário); a instrução formal do 10.14.1.2 é para quem fica na zona livre e na vizinhança da zona controlada.|g-zc,10.14.1.2',
    'Fora das zonas do Anexo II, por estar a mais de 0,38 m':'Passar de Rr só tira da zona de risco; até Rc = 1,38 m ainda é zona controlada.|AII'}},
  'zonas:1':{e:['ZC, porque a distância se mede do corpo, não da ferramenta','Fora do alcance da NR-10, porque o tubo não toca o barramento'],w:{
    'ZL':'Até o corpo (0,50 m) está dentro de Rc = 0,70 m.|AII',
    'ZC':'Pelo corpo seria ZC, mas a ponta do tubo condutor fica a 0,10 m, dentro de Rr = 0,20 m.|AII,10.2.2',
    'ZC, porque a distância se mede do corpo, não da ferramenta':'O 10.2.2 conta a entrada por meio de extensões condutoras: vale a ponta do tubo.|10.2.2,g-prox',
    'Fora do alcance da NR-10, porque o tubo não toca o barramento':'Basta poder entrar na zona controlada, com o corpo ou com extensões condutoras (10.2.2); contato não é condição.|10.2.2'}},
  'zonas:2':{e:['ZL, porque o operador está na cabine, a mais de 3,20 m','ZR, porque toda aproximação de máquina em AT é zona de risco'],w:{
    'ZL':'A zona livre começa em Rc = 3,20 m; a ponta da lança está a 3,0 m.|AII',
    'ZR':'Para 132 a 150 kV a zona de risco vai só até Rr = 1,20 m.|AII',
    'ZL, porque o operador está na cabine, a mais de 3,20 m':'A lança metálica é extensão condutora: conta a posição da ponta (glossário, trabalho em proximidade).|g-prox,10.2.2',
    'ZR, porque toda aproximação de máquina em AT é zona de risco':'A zona sai da tabela do Anexo II pela distância; 3,0 m fica entre Rr e Rc.|AII'}},
  'zonas:3':{e:['ZC, porque a superfície isolante rebaixa a zona em um nível','Depende só da distância: a superfície isolante não muda a zona'],w:{
    'ZR':'Sem a superfície, 0,30 m seria zona de risco (Rr = 0,38 m); com a superfície isolante adequada interposta vale a Figura 2 do Anexo II.|AII',
    'ZC':'Sem a superfície seria a zona de risco, e não a controlada; com ela, vale a Figura 2 do Anexo II.|AII',
    'ZC, porque a superfície isolante rebaixa a zona em um nível':'A Figura 2 não rebaixa a zona em um nível: do outro lado da superfície isolante a região é zona livre.|AII',
    'Depende só da distância: a superfície isolante não muda a zona':'A Figura 2 do Anexo II existe justamente para a interposição de superfície de separação física adequada.|AII'}},
  'zonas:4':{e:['Só se ele usar ferramenta condutora que alcance a ZC','Não: em 480 V o arco só é tratado dentro da zona controlada','Sim, mas só se ele for eletricista'],w:{
    'Não: está fora da ZC':'A zona controlada delimita o alcance pelo choque; o 10.2.3 estende a NR-10 à exposição ao arco mesmo sem entrada na zona controlada.|10.2.3',
    'Só se ele usar ferramenta condutora que alcance a ZC':'Isso é o 10.2.2 (extensões condutoras); o 10.2.3 alcança a exposição ao arco por si só.|10.2.2,10.2.3',
    'Não: em 480 V o arco só é tratado dentro da zona controlada':'O 10.2.3 não distingue tensão nem depende da zona controlada; o Anexo IV tem linhas de CCM de 600 V.|10.2.3,AIV-I',
    'Sim, mas só se ele for eletricista':'O alcance do 10.2.3 depende da exposição ao arco, não da função. Quem faz atividade não elétrica só fica dispensado de EPI de arco se a análise de risco mostrar que não está exposto (10.11.2.4).|10.2.3,10.11.2.4'}},

  /* ===== III Execução: energizado ===== */
  'energizado:0':{e:['Desativar o religamento só se a intervenção for no SEP','Desativar o religamento; sinalizar é opcional'],w:{
    'Pode seguir com EPI adequado':'EPI é o último nível da hierarquia (10.5.4) e não substitui a desativação exigida pelo 10.14.3.|10.14.3,10.5.4',
    'Basta avisar o centro de operação':'Avisar não desativa nada: o 10.14.3 exige a desativação (bloqueio) do religamento automático.|10.14.3',
    'Desativar o religamento só se a intervenção for no SEP':'O 10.14.3 vale para intervenção energizada em MT/AT dentro da zona de risco, no SEP ou fora dele.|10.14.3',
    'Desativar o religamento; sinalizar é opcional':'O 10.14.3.1 exige sinalizar os dispositivos desativados com a identificação da condição de desativação.|10.14.3.1'}},
  'energizado:1':{e:['Permitido só para quem tem o treinamento Básico','Permitido em qualquer tensão, por ser só ligar e desligar'],w:{
    'Proibido: só autorizados':'O 10.14.1 exige autorizados nos serviços em eletricidade, mas o 10.14.1.1 abre exceção para operações elementares em BT.|10.14.1,10.14.1.1',
    'Exige permissão de trabalho':'Operação elementar não é serviço em eletricidade: pode ser feita por qualquer pessoa não advertida (10.14.1.1).|10.14.1.1,g-opel',
    'Permitido só para quem tem o treinamento Básico':'O 10.14.1.1 admite qualquer pessoa não advertida.|10.14.1.1',
    'Permitido em qualquer tensão, por ser só ligar e desligar':'O 10.14.1.1 restringe a operação elementar à baixa tensão, em sistemas projetados e mantidos para uso seguro.|10.14.1.1'}},
  'energizado:2':{e:['Sim, se a permissão de trabalho autorizar','Sim, porque o 10.14.2 só vale para o SEP','Não, salvo com o religamento automático bloqueado'],w:{
    'Sim, se for PLH':'A habilitação não muda a vedação do 10.14.2.|10.14.2',
    'Sim, se a permissão de trabalho autorizar':'A PT não afasta a vedação do 10.14.2.|10.14.2,10.7.2',
    'Sim, porque o 10.14.2 só vale para o SEP':'O 10.14.2 alcança também serviços energizados em MT/AT fora do SEP.|10.14.2',
    'Não, salvo com o religamento automático bloqueado':'Bloquear o religamento (10.14.3) é exigência a mais na zona de risco; não substitui a equipe do 10.14.2.|10.14.3,10.14.2'}},
  'energizado:3':{e:['A cada 6 meses, sempre','Não precisam de ensaio, por serem de baixa tensão'],w:{
    'A cada 2 anos':'Bienal é o treinamento periódico (10.9.10), não o ensaio; sem outra previsão, o ensaio é anual.|10.14.4.1,10.9.10',
    'Só quando apresentarem defeito':'O ensaio é periódico, e não fazê-lo é grave e iminente risco (10.16.1 d).|10.14.4.1,10.16.1',
    'A cada 6 meses, sempre':'A NR-10 não fixa 6 meses: vale o menor intervalo entre regulamentações, fabricante e PLH; sem previsão, anual.|10.14.4.1',
    'Não precisam de ensaio, por serem de baixa tensão':'O 10.14.4 b inclui expressamente luvas e mangas isolantes para baixa tensão.|10.14.4'}},
  'energizado:4':{e:['O do 10.13, porque a instalação ainda não foi energizada','O do 10.14, feitos por qualquer eletricista, sem PLH','Só o procedimento do fabricante do equipamento'],w:{
    'Livre, pois a instalação ainda não opera':'O 10.12.1 vale independentemente do estado de energização, e o 10.12.9 remete ensaios e comissionamento ao 10.14.|10.12.1,10.12.9',
    'O do 10.13, porque a instalação ainda não foi energizada':'O 10.12.9 manda ensaios e comissionamento atenderem ao 10.14 (energizado), não ao 10.13.|10.12.9',
    'O do 10.14, feitos por qualquer eletricista, sem PLH':'O 10.12.9 exige responsabilidade de PLH e execução por profissional autorizado.|10.12.9',
    'Só o procedimento do fabricante do equipamento':'A NR-10 define o regime: capítulo 10.14, sob responsabilidade de PLH (10.12.9).|10.12.9'}},
  'energizado:5':{e:['Parar o serviço até haver contato visual','Rádio, só se houver sinal de celular no local','Comunicação com o colega; com a sala de comando é opcional'],w:{
    'Nada, se houver procedimento':'O 10.12.4 garante comunicação direta e visual em todo serviço; sem ela, vale o 10.12.4.1.|10.12.4,10.12.4.1',
    'Parar o serviço até haver contato visual':'A norma não manda parar: sem comunicação direta e visual, exige equipamentos de comunicação (10.12.4.1).|10.12.4.1',
    'Rádio, só se houver sinal de celular no local':'Os equipamentos devem permitir comunicação permanente independentemente das condições locais, de interferências ou da ausência de sinais.|10.12.4.1',
    'Comunicação com o colega; com a sala de comando é opcional':'O 10.12.4.1 inclui o centro de operação ou a sala de comando.|10.12.4.1'}},
  'energizado:6':{e:['Desligar a cogeração só quando a distribuidora pedir','Medidas que impeçam a energização, sem nenhuma exceção','Nada, se a cogeração for de fonte renovável'],w:{
    'Nada, a concessionária se protege':'O 10.14.5 põe a obrigação em quem possui geração própria.|10.14.5',
    'Desligar a cogeração só quando a distribuidora pedir':'O 10.14.5 exige medidas que impeçam energizar instalações de outras organizações, não uma ação sob pedido.|10.14.5',
    'Medidas que impeçam a energização, sem nenhuma exceção':'O 10.14.5 ressalva as condições autorizadas pela ANEEL.|10.14.5',
    'Nada, se a cogeração for de fonte renovável':'O 10.14.5 não distingue a fonte da geração própria.|10.14.5'}},
  'energizado:7':{e:['Como desenergizado, se o disjuntor estiver bloqueado','Como energizado só enquanto o gerador estiver ligado','Como extrabaixa tensão, por ser fonte portátil'],w:{
    'Como desenergizado':'Só é desenergizada a instalação liberada pela sequência do 10.13.1; desligada com possibilidade de energização segue o 10.14 (10.5.2).|10.5.2,10.13.1',
    'Como desenergizado, se o disjuntor estiver bloqueado':'O bloqueio cuida de uma fonte; com outra fonte possível, a instalação continua com possibilidade de energização.|10.5.2,10.13.1',
    'Como energizado só enquanto o gerador estiver ligado':'O 10.5.2 fala em possibilidade de energização por qualquer meio ou razão; não importa o gerador estar ligado agora.|10.5.2',
    'Como extrabaixa tensão, por ser fonte portátil':'A faixa depende do valor da tensão, não de a fonte ser portátil.|g-ebt'}},

  /* ===== II Controle: projeto (lista Conforme / Não conforme) ===== */
  'projeto:c0:CN':{o:['Conforme: atende ao desligamento com impedimento de reenergização e indicação da condição operativa (10.4.1)',
      'Não conforme: o 10.4.1 exige seccionamento de ação simultânea em todo circuito','Não conforme: todo QDC precisa de aterramento fixo no seccionamento',
      'Conforme, mas só porque o QDC é de média tensão','Não conforme: a etiqueta precisa ser substituída por cadeado'],a:0,w:{
    'Não conforme: o 10.4.1 exige seccionamento de ação simultânea em todo circuito':'Ação simultânea é o 10.4.2, e na medida do possível; o 10.4.1 pede impedimento de reenergização e sinalização com indicação da condição operativa.|10.4.1,10.4.2',
    'Não conforme: todo QDC precisa de aterramento fixo no seccionamento':'Recursos fixos de aterramento são exigidos quando tecnicamente viáveis e necessários (10.4.5); o que todo projeto prevê são condições para aterramento temporário (10.4.6).|10.4.5,10.4.6',
    'Conforme, mas só porque o QDC é de média tensão':'O 10.4.1 vale para os projetos de instalações elétricas em geral, sem faixa de tensão.|10.4.1',
    'Não conforme: a etiqueta precisa ser substituída por cadeado':'O 10.4.1 pede os dois: recurso para impedimento de reenergização e sinalização com indicação da condição operativa.|10.4.1'}},
  'projeto:c1:CN':{o:['Não conforme: o projeto deve prever, na medida do possível, seccionamento de ação simultânea (10.4.2)',
      'Conforme: três disjuntores monopolares cortam as três fases, o que basta','Conforme: ação simultânea só é exigida em MT/AT',
      'Não conforme: o circuito do motor exige DDR pelo 10.6.4','Conforme, desde que cada disjuntor tenha etiqueta própria'],a:0,w:{
    'Conforme: três disjuntores monopolares cortam as três fases, o que basta':'Cortar as fases uma a uma não é ação simultânea, que o 10.4.2 pede na medida do possível.|10.4.2',
    'Conforme: ação simultânea só é exigida em MT/AT':'O 10.4.2 não tem faixa de tensão.|10.4.2',
    'Não conforme: o circuito do motor exige DDR pelo 10.6.4':'O 10.6.4 lista os circuitos com DDR obrigatório (áreas molhadas, tomadas externas etc.); o problema aqui é o seccionamento.|10.6.4,10.4.2',
    'Conforme, desde que cada disjuntor tenha etiqueta própria':'Sinalização não supre o seccionamento de ação simultânea do 10.4.2.|10.4.2'}},
  'projeto:c2:CN':{o:['Não conforme: circuitos de finalidades distintas são identificados e instalados separadamente, salvo compartilhamento definido em projeto (10.4.3.1)',
      'Conforme: compartilhar eletroduto é sempre permitido se os cabos forem isolados','Não conforme só por falta de identificação; separar não é exigido',
      'Conforme, se o eletricista registrar a decisão na PT','Conforme: o 10.4.3.1 só trata de circuitos de tração elétrica'],a:0,w:{
    'Conforme: compartilhar eletroduto é sempre permitido se os cabos forem isolados':'O compartilhamento só vale quando a tecnologia permite e está definido em projeto.|10.4.3.1',
    'Não conforme só por falta de identificação; separar não é exigido':'O 10.4.3.1 exige identificar e instalar separadamente.|10.4.3.1',
    'Conforme, se o eletricista registrar a decisão na PT':'A exceção do 10.4.3.1 depende do projeto, não da PT.|10.4.3.1',
    'Conforme: o 10.4.3.1 só trata de circuitos de tração elétrica':'Tração é só um dos exemplos; o item cita comunicação, sinalização, controle e tração.|10.4.3.1'}},
  'projeto:c3:CN':{o:['Não conforme: o projeto define o esquema de aterramento e se neutro e PE são interligados (10.4.4)',
      'Conforme: isso é decidido na obra pelo eletricista','Conforme: basta o projeto prever aterramento temporário',
      'Não conforme: o projeto deve sempre interligar neutro e PE','Conforme, se as medições de aterramento forem documentadas'],a:0,w:{
    'Conforme: isso é decidido na obra pelo eletricista':'O 10.4.4 põe essa definição no projeto.|10.4.4',
    'Conforme: basta o projeto prever aterramento temporário':'As condições de aterramento temporário (10.4.6) são outro requisito e não substituem o 10.4.4.|10.4.6,10.4.4',
    'Não conforme: o projeto deve sempre interligar neutro e PE':'O 10.4.4 manda definir a obrigatoriedade ou não da interligação; não impõe uma resposta.|10.4.4',
    'Conforme, se as medições de aterramento forem documentadas':'Documentar inspeções e medições (10.15.3) não substitui a definição no projeto.|10.15.3,10.4.4'}},
  'projeto:c4:CN':{o:['Não conforme: todo projeto prevê condições para a adoção de aterramento temporário (10.4.6)',
      'Conforme: aterramento temporário só é usado em média e alta tensão','Conforme: o 10.4.5 só pede recursos fixos quando viável e necessário',
      'Não conforme: o QGBT precisa de chave de aterramento fixa','Conforme, se a equipe levar o próprio conjunto de aterramento'],a:0,w:{
    'Conforme: aterramento temporário só é usado em média e alta tensão':'O 10.4.6 diz todo projeto, e a alínea d do 10.13.1 não tem faixa de tensão.|10.4.6,10.13.1',
    'Conforme: o 10.4.5 só pede recursos fixos quando viável e necessário':'O 10.4.5 trata de aterramento fixo no seccionamento; o temporário é o 10.4.6, sem condição.|10.4.5,10.4.6',
    'Não conforme: o QGBT precisa de chave de aterramento fixa':'O recurso fixo é exigido quando tecnicamente viável e necessário (10.4.5); a exigência sem condição é a do temporário (10.4.6).|10.4.5,10.4.6',
    'Conforme, se a equipe levar o próprio conjunto de aterramento':'Levar o conjunto não supre as condições que o projeto deve prever no QGBT. [INTERPRETAÇÃO]|10.4.6'}},
  'projeto:c5:CN':{o:['Conforme: atende às alíneas e e f do conteúdo mínimo do memorial (10.4.9)',
      'Não conforme: o funcionamento da proteção é assunto do procedimento de trabalho','Não conforme: o memorial deveria trazer o estudo de energia incidente no lugar disso',
      'Conforme, mas é opcional: o 10.4.9 é só recomendação','Não conforme: DR não pode constar do memorial, só do diagrama'],a:0,w:{
    'Não conforme: o funcionamento da proteção é assunto do procedimento de trabalho':'O conteúdo do procedimento está no 10.7.1.1; o princípio funcional dos dispositivos de proteção é a alínea e do memorial.|10.4.9,10.7.1.1',
    'Não conforme: o memorial deveria trazer o estudo de energia incidente no lugar disso':'O estudo de energia incidente é o 10.4.12, quando aplicável; não substitui as alíneas e e f do 10.4.9.|10.4.12,10.4.9',
    'Conforme, mas é opcional: o 10.4.9 é só recomendação':'O 10.4.9 lista o conteúdo mínimo do memorial: é obrigatório.|10.4.9',
    'Não conforme: DR não pode constar do memorial, só do diagrama':'A alínea e pede justamente o princípio funcional dos dispositivos de proteção destinados à segurança das pessoas.|10.4.9'}},
  'projeto:c6:CN':{o:['Não conforme: projeto elaborado fora do Brasil fica sob responsabilidade técnica de PLH (10.4.8.1)',
      'Conforme: basta seguir a norma internacional aplicável','Conforme, se o projeto for traduzido para o português',
      'Não conforme: projeto elaborado fora do Brasil é proibido','Conforme, se o eletricista autorizado assinar o projeto'],a:0,w:{
    'Conforme: basta seguir a norma internacional aplicável':'Normas internacionais entram na ausência ou omissão das oficiais (10.2.1), mas o projeto continua sob PLH (10.4.8.1).|10.2.1,10.4.8.1',
    'Conforme, se o projeto for traduzido para o português':'A língua portuguesa é exigência da documentação (10.15.1); não substitui o PLH.|10.15.1,10.4.8.1',
    'Não conforme: projeto elaborado fora do Brasil é proibido':'O 10.4.8.1 admite o projeto de fora, sob responsabilidade técnica de PLH.|10.4.8.1',
    'Conforme, se o eletricista autorizado assinar o projeto':'Autorização não é habilitação: a responsabilidade é de PLH (10.4.8, 10.8.2).|10.4.8,10.8.2'}},
  'projeto:c7:CN':{o:['Não conforme: o projeto é mantido atualizado de forma a corresponder ao executado (10.4.13)',
      'Conforme: ampliação pequena dispensa atualização','Conforme, se a ampliação estiver anotada na PT do serviço',
      'Não conforme, e é grave e iminente risco pelo 10.16.1','Conforme: atualizar o projeto só é exigido de quem tem PIE'],a:0,w:{
    'Conforme: ampliação pequena dispensa atualização':'O 10.4.13 não tem limite de porte.|10.4.13',
    'Conforme, se a ampliação estiver anotada na PT do serviço':'A PT é encerrada e arquivada (10.7.2.3), mas não atualiza o projeto.|10.7.2.3,10.4.13',
    'Não conforme, e é grave e iminente risco pelo 10.16.1':'Projeto desatualizado não está entre as quatro situações do 10.16.1.|10.16.1',
    'Conforme: atualizar o projeto só é exigido de quem tem PIE':'O 10.4.13 vale para todo projeto, e toda organização dispõe de projeto (10.15.3).|10.4.13,10.15.3'}},
  'projeto:c8:CN':{o:['Conforme: atende ao espaço seguro (10.4.3) e à iluminação adequada com posição de trabalho segura (10.4.10)',
      'Não conforme: iluminação é tema só da NR-17, fora do projeto elétrico','Não conforme: espaço livre só é exigido em MT/AT',
      'Conforme, mas o espaço seguro só vale durante a construção','Não conforme: a frente do QGBT deveria ter armário para guardar ferramentas'],a:0,w:{
    'Não conforme: iluminação é tema só da NR-17, fora do projeto elétrico':'O 10.4.10 põe a iluminação no projeto, de acordo com a NR-17.|10.4.10',
    'Não conforme: espaço livre só é exigido em MT/AT':'O 10.4.3 não tem faixa de tensão.|10.4.3',
    'Conforme, mas o espaço seguro só vale durante a construção':'O 10.4.3 considera a operação e os serviços de construção e manutenção.|10.4.3',
    'Não conforme: a frente do QGBT deveria ter armário para guardar ferramentas':'Pelo 10.12.8, locais de serviços elétricos e invólucros não podem guardar objetos.|10.12.8'}},
  'projeto:c9:CN':{o:['Conforme: o projeto considera, quando aplicável, o estudo de energia incidente (10.4.12)',
      'Não conforme: estudo de energia incidente só vale para MT/AT','Não conforme: com estudo, o Anexo IV fica proibido',
      'Conforme, e o estudo é obrigatório em todo QGBT','Não conforme: o estudo fica no PIE, não no projeto'],a:0,w:{
    'Não conforme: estudo de energia incidente só vale para MT/AT':'O 10.4.12 não tem faixa de tensão.|10.4.12',
    'Não conforme: com estudo, o Anexo IV fica proibido':'Os dois convivem: o 10.11.2.3 exige o estudo fora das condições do Anexo IV ou para categoria menor que a dele.|10.11.2.3',
    'Conforme, e o estudo é obrigatório em todo QGBT':'A resposta é "conforme", mas o 10.4.12 diz quando aplicável.|10.4.12',
    'Não conforme: o estudo fica no PIE, não no projeto':'O 10.4.12 põe o estudo no projeto; o PIE organiza a documentação de quem integra o SEP ou atua em MT/AT (10.15.6).|10.4.12,10.15.6'}},
  'projeto:c10:CN':{o:['Não conforme: o projeto fica disponível aos autorizados, às autoridades competentes e a outras pessoas autorizadas pela organização (10.4.7)',
      'Conforme: o projeto é documento sigiloso da organização','Conforme, se uma cópia for mostrada à fiscalização quando pedida',
      'Não conforme: o projeto deve ficar afixado na porta do QGBT','Não conforme: o projeto deve estar disponível a qualquer pessoa'],a:0,w:{
    'Conforme: o projeto é documento sigiloso da organização':'O 10.4.7 e o 10.15.2 exigem disponibilidade.|10.4.7,10.15.2',
    'Conforme, se uma cópia for mostrada à fiscalização quando pedida':'Os autorizados também têm acesso, e a documentação fica sempre disponível.|10.4.7,10.15.2',
    'Não conforme: o projeto deve ficar afixado na porta do QGBT':'A norma exige disponibilidade, não afixação; o meio digital é admitido (10.15.1).|10.4.7,10.15.1',
    'Não conforme: o projeto deve estar disponível a qualquer pessoa':'O 10.4.7 limita aos autorizados, às autoridades e a outras pessoas autorizadas pela organização.|10.4.7'}},

  /* ===== II Controle: proteção coletiva ===== */
  'coletiva:0':{e:['Só pela proteção supletiva, desde que haja aterramento','Pelo EPI isolante, a última barreira'],w:{
    'Só pela proteção básica':'Uma só proteção vale apenas nas condições das normas técnicas, descritas no memorial (10.6.1.2); a regra é a combinação (10.6.1.1).|10.6.1.1,10.6.1.2',
    'Pelo DDR, que substitui as demais':'O DDR é proteção adicional obrigatória nos casos do 10.6.4; não substitui a básica nem a supletiva.|10.6.4,g-adic',
    'Só pela proteção supletiva, desde que haja aterramento':'O 10.6.1.1 pede as duas em conjunto; uma só, apenas nas condições do 10.6.1.2.|10.6.1.1,10.6.1.2',
    'Pelo EPI isolante, a última barreira':'EPI é proteção individual, último nível da hierarquia do 10.5.4; não é medida coletiva.|10.5.4,10.11.1'}},
  'coletiva:1':{e:['proteção adicional, como o DDR','medida proibida pela NR-10'],w:{
    'proteção básica completa':'A proteção básica se faz por isolação, barreiras ou invólucros e limitação da tensão (10.6.2); o obstáculo não impede o contato deliberado.|10.6.2,10.6.2.1',
    'proteção supletiva':'Supletiva cuida de massas acidentalmente vivas: seccionamento automático, aterramento, equipotencialização, isolação suplementar e separação elétrica (10.6.3).|10.6.3',
    'proteção adicional, como o DDR':'Proteção adicional é a do DDR do 10.6.4; obstáculo é proteção parcial.|g-adic,10.6.2.1',
    'medida proibida pela NR-10':'O 10.6.2.1 admite, conforme requisitos de normas técnicas.|10.6.2.1'}},
  'coletiva:2':{e:['Dispositivos limitadores de corrente'],w:{
    'Painel resistente a arco':'Está no 10.6.5, alínea b.|10.6.5','Seleção de tempos de interrupção muito curtos':'Está no 10.6.5, alínea h.|10.6.5',
    'Chave de aterramento resistente ao curto-circuito presumido':'Está no 10.6.5, alínea d.|10.6.5','Dispositivos limitadores de corrente':'Está no 10.6.5, alínea g.|10.6.5'}},
  'coletiva:3':{e:['Só pode voltar se for trocado por motor novo','Certificado só é exigido de equipamento importado'],w:{
    'Nada, se o reparo foi bem feito':'O 10.6.6.1.1 cita expressamente os equipamentos reparados.|10.6.6.1.1',
    'Apenas novo ensaio dielétrico':'O 10.6.6.1.1 pede seleção e manutenção conforme o estudo de classificação de áreas, com certificado; um ensaio não substitui isso.|10.6.6.1.1',
    'Só pode voltar se for trocado por motor novo':'O reparado pode voltar, selecionado e mantido conforme o estudo e certificado.|10.6.6.1.1',
    'Certificado só é exigido de equipamento importado':'O 10.6.6.1.1 alcança fabricados, importados e reparados.|10.6.6.1.1'}},
  'coletiva:4':{e:['PT só se a atividade for não rotineira','Permissão de trabalho aprovada pelo bombeiro civil'],w:{
    'só procedimento de trabalho':'Na área classificada o 10.6.6.1.2 soma PT, análise de risco, procedimento e trabalhador autorizado.|10.6.6.1.2',
    'só treinamento Complementar de Área Classificada':'O complementar (10.9.7) é exigido, mas não basta: o 10.6.6.1.2 pede PT e procedimento.|10.9.7,10.6.6.1.2',
    'PT só se a atividade for não rotineira':'Na área classificada o 10.6.6.1.2 exige PT sem distinguir rotineira e não rotineira.|10.6.6.1.2',
    'Permissão de trabalho aprovada pelo bombeiro civil':'A PT é precedida de análise de risco e o serviço é feito por trabalhador autorizado; a NR-10 não dá esse papel ao bombeiro.|10.6.6.1.2,10.7.2'}},
  'coletiva:5':{e:['Nada, se a instalação for de extrabaixa tensão','Proteção específica, sem precisar constar do projeto'],w:{
    'Sinalização apenas':'O 10.6.6.2 exige proteção específica e dispositivos de descarga.|10.6.6.2',
    'EPI antiestático para todos':'EPI é o último nível (10.5.4); o 10.6.6.2 exige medida no processo ou equipamento.|10.6.6.2,10.5.4',
    'Nada, se a instalação for de extrabaixa tensão':'O 10.6.6 (explosão e incêndio) vale até para a EBT, pela exceção do 10.2.4.|10.6.6.2,10.2.4',
    'Proteção específica, sem precisar constar do projeto':'O 10.6.6.2 diz conforme projeto.|10.6.6.2'}},
  'coletiva:6':{e:['medidas de proteção individual','exigidas só em área classificada'],w:{
    'opcionais':'A organização deve adotar as duas (10.6.7, 10.6.8).|10.6.7,10.6.8',
    'responsabilidade exclusiva da concessionária':'A obrigação é da organização, conforme o próprio projeto.|10.6.7,10.6.8',
    'medidas de proteção individual':'Estão no capítulo de proteção coletiva.|10.6.7,10.6.8',
    'exigidas só em área classificada':'O 10.6.7 e o 10.6.8 não se limitam a área classificada.|10.6.7,10.6.8'}},
  'coletiva:7':{e:['grave e iminente risco, mas a interdição segue a metodologia da NR-3','grave e iminente risco só se houver atmosfera explosiva no momento'],w:{
    'não conformidade comum':'Está na alínea a do 10.16.1.|10.16.1',
    'infração apenas da NR-23':'O 10.6.6 remete à NR-23, mas a falta de proteção coletiva em área classificada é grave e iminente risco da própria NR-10 (10.16.1 a).|10.6.6,10.16.1',
    'grave e iminente risco, mas a interdição segue a metodologia da NR-3':'O 10.16.1 dispensa justamente a metodologia da NR-3 nessas situações.|10.16.1',
    'grave e iminente risco só se houver atmosfera explosiva no momento':'A alínea a do 10.16.1 é a ausência de medidas coletivas em instalações de áreas classificadas, sem essa condição.|10.16.1'}},

  /* ===== II Controle: proteção individual (Anexo IV) ===== */
  'individual:0':{drop:[NA],w:{'Categoria 2':'Categoria 2 é a linha de painéis acima de 240 V até 600 V; 220 V fica na linha de até 240 V.|AIV-I','Categoria 3':C3,
    'Categoria 4':'Categoria 4 vem de tempos maiores (0,24 a 0,5 s) ou de 1 a 15 kV; com 0,03 s este painel cabe na linha da Categoria 1.|AIV-I',
    [FA]:'18 kA ≤ 25 kA, 0,03 s ≤ 0,03 s e 455 mm ≥ 455 mm: os parâmetros cabem na linha, considerados em conjunto.|10.11.2.1,AIV-I'}},
  'individual:1':{drop:[NA],w:{'Categoria 1':'Categoria 1 é a linha de até 240 V; 440 V está acima.|AIV-I','Categoria 3':C3,
    'Categoria 4':'Os parâmetros cabem na linha dos painéis de 240 a 600 V (25 kA, 0,03 s, 455 mm): Categoria 2.|AIV-I',
    [FA]:'22 kA ≤ 25 kA, 0,03 s e 455 mm: cabe na linha.|10.11.2.1,AIV-I'}},
  'individual:2':{drop:[NA],w:{'Categoria 1':C1,'Categoria 3':C3,
    'Categoria 2':'A linha de CCM com Categoria 2 exige 0,03 s; com 0,30 s vale a linha de 42 kA e 0,33 s.|AIV-I',
    [FA]:'40 kA ≤ 42 kA e 0,30 s ≤ 0,33 s, a 455 mm: cabe na linha de CCM da Categoria 4.|AIV-I,10.11.2.1'}},
  'individual:3':{drop:[NA],w:{'Categoria 1':C1,'Categoria 3':C3,
    'Categoria 2':'Categoria 2 só aparece em linhas de até 600 V com 0,03 s.|AIV-I',
    [FA]:'31,5 kA ≤ 35 kA, 0,20 s ≤ 0,24 s e 910 mm: cabe na linha da aparelhagem revestida de metal.|AIV-I,10.11.2.1'}},
  'individual:4':{drop:[NA],w:{'Categoria 1':'O Quadro II (CC) começa na Categoria 2.|AIV-II','Categoria 2':'No Quadro II, a Categoria 2 é para corrente abaixo de 3 kA.|AIV-II',
    'Categoria 4':'No Quadro II, a Categoria 4 é de 7 kA a menos de 10 kA.|AIV-II',
    [FA]:'220 V está entre 150 e 600 V, e 4 kA cabe na faixa de 3 a menos de 7 kA; sem proteção conhecida, a nota 2 assume 2 s, que é o parâmetro do próprio quadro.|AIV-II'}},
  'individual:5':{drop:[NA],w:{'Categoria 1':'A linha de até 240 V vai só até 25 kA e 0,03 s.|AIV-I',
    'Categoria 2':'As linhas de Categoria 2 de até 600 V exigem 0,03 s; aqui são 0,10 s.|AIV-I,10.11.2.2','Categoria 3':C3,
    'Categoria 4':'A linha de quadros de distribuição de 600 V (Categoria 4) vai até 35 kA; 50 kA passa. E "painel" é outra linha do quadro.|AIV-I,10.11.2.2'}},
  'individual:6':{drop:[NA],w:{'Categoria 2':'A linha de até 240 V já dá Categoria 1; a nota só reduz, nunca abaixo da 1.|AIV-I','Categoria 3':C3,
    'Categoria 4':'Os parâmetros cabem na linha da Categoria 1.|AIV-I',[FA]:'20 kA ≤ 25 kA, 0,03 s e 455 mm: cabe na linha de até 240 V.|AIV-I'}},
  'individual:7':{drop:[NA],w:{'Categoria 2':'É a categoria da linha, mas a nota permite reduzir um número com fusível ou disjuntor limitador de até 200 A.|AIV-I','Categoria 3':C3,
    'Categoria 4':'Os parâmetros cabem na linha da Categoria 2, antes da redução.|AIV-I',[FA]:'20 kA ≤ 25 kA, 0,03 s e 455 mm: cabe na linha.|AIV-I'}},
  'individual:8':{drop:['Categoria 3'],w:{'Categoria 1':'Equipamento resistente a arco de 1 a 15 kV, portas fechadas e travadas, dentro da classificação: N/A.|AIV-I',
    'Categoria 2':'Equipamento resistente a arco de 1 a 15 kV, portas fechadas e travadas, dentro da classificação: N/A.|AIV-I',
    'Categoria 4':'Seria a categoria com a porta aberta, pela linha do equipamento não resistente.|AIV-I',
    [FA]:'O Quadro I tem linha própria para equipamentos resistentes a arco de 1 a 15 kV.|AIV-I'}},
  'individual:9':{drop:['Categoria 3'],w:{'Categoria 1':C1,'Categoria 2':'Categoria 2 só aparece em linhas de até 600 V.|AIV-I',
    [NA]:'N/A exige portas fechadas e travadas; com a porta aberta vale a linha do equipamento não resistente (nota * do Quadro I).|AIV-I',
    [FA]:'25 kA ≤ 35 kA, 0,20 s ≤ 0,24 s e 910 mm: cabe na linha da aparelhagem revestida de metal.|AIV-I'}},

  /* ===== IV Prova: grave e iminente risco (lista) ===== */
  'documentacao:c0:GN':gir('a','É exatamente a alínea a do 10.16.1: ausência de proteção coletiva em instalação de área classificada.|10.16.1,10.6.6.1'),
  'documentacao:c1:GN':gir('b','Aterrar sem constatar a ausência de tensão é não adotar a sequência do 10.13.1 (alínea d): alínea b do 10.16.1.|10.16.1,10.13.1'),
  'documentacao:c2:GN':gir('c','Quem não tem treinamento nem autorização não atende ao capítulo 10.10: alínea c do 10.16.1.|10.16.1,10.10.2.1'),
  'documentacao:c3:GN':gir('d','EPI isolante sem ensaio é a alínea d do 10.16.1.|10.16.1,10.14.4'),
  'documentacao:c4:GN':Object.assign(gir('n'),{w:Object.assign({},GW)}),
  'documentacao:c5:GN':Object.assign(gir('n'),{w:Object.assign({},GW)}),
  'documentacao:c6:GN':gir('b','Religar com o aterramento instalado inverte a sequência do 10.13.2 (alínea d antes da g): alínea b do 10.16.1.|10.16.1,10.13.2'),
  'documentacao:c7:GN':Object.assign(gir('n'),{w:Object.assign({},GW)}),

  /* ===== II Controle: organização (procedimento × PT) ===== */
  'organizacao:c0:PT':rot(1,'Termografia mensal prevista no plano é habitual e parte do processo contínuo: atividade rotineira, com procedimento (10.7.1).|10.7.1,g-rot'),
  'organizacao:c1:PT':rot(0,'Troca emergencial não é habitual nem parte do processo contínuo: é não rotineira, com PT (10.7.2).|10.7.2,g-rot'),
  'organizacao:c2:PT':rot(1,'Limpeza programada no plano é rotineira, mesmo sendo semestral: a frequência não é o critério.|g-rot,10.7.1'),
  'organizacao:c3:PT':rot(0,'Instalar um alimentador novo não faz parte do processo contínuo: é não rotineira, com PT.|10.7.2,g-rot'),
  'organizacao:c4:PT':rot(1,'Manobra diária prevista no procedimento operacional é rotineira.|10.7.1,g-rot'),
  'organizacao:c5:PT':rot(0,'Primeira intervenção, sem procedimento, não é habitual: é não rotineira, com PT.|10.7.2,g-rot'),

  /* ===== II Controle: pessoas (verdadeiro ou falso) ===== */
  'pessoas:c0:VF':vf(['Verdadeira: a autorização é consignada nos documentos funcionais do trabalhador (10.10.3)','Falsa: basta o crachá com a abrangência da autorização',
      'Falsa: a autorização é verbal, dada pelo supervisor no dia','Verdadeira, mas só para trabalhadores do SEP','Falsa: a autorização consta só do PIE'],0,{
    'Falsa: basta o crachá com a abrangência da autorização':'O sistema de identificação (10.10.4) é exigência a mais; a consignação nos documentos funcionais é o 10.10.3.|10.10.3,10.10.4',
    'Falsa: a autorização é verbal, dada pelo supervisor no dia':'A autorização é anuência formal da organização (10.10.2.1), consignada nos documentos funcionais.|10.10.2.1,10.10.3',
    'Verdadeira, mas só para trabalhadores do SEP':'O 10.10.3 vale para todo trabalhador autorizado.|10.10.3',
    'Falsa: a autorização consta só do PIE':'O PIE organiza a documentação de quem integra o SEP ou atua em MT/AT; a consignação é nos documentos funcionais.|10.10.3,10.15.6'}),
  'pessoas:c1:VF':vf(['Falsa: a autorização exige treinamento com avaliação e aproveitamento satisfatórios, independentemente do cargo e da escolaridade (10.10.2.1)',
      'Verdadeira: PLH dispensa o treinamento da NR-10','Verdadeira, se ele tiver registro no conselho de classe',
      'Falsa: engenheiro não pode ser autorizado; só técnicos','Falsa: além do diploma, basta o exame médico'],0,{
    'Verdadeira: PLH dispensa o treinamento da NR-10':'O 10.10.2.1 b vale independentemente do cargo e da escolaridade.|10.10.2.1',
    'Verdadeira, se ele tiver registro no conselho de classe':'O registro faz dele PLH (10.8.2), mas a autorização ainda exige exame médico e treinamento.|10.8.2,10.10.2.1',
    'Falsa: engenheiro não pode ser autorizado; só técnicos':'Profissionais habilitados estão entre os autorizados (10.10.2 a).|10.10.2',
    'Falsa: além do diploma, basta o exame médico':'O 10.10.2.1 exige exame médico e treinamento, juntos.|10.10.2.1'}),
  'pessoas:c2:VF':vf(['Verdadeira: o sistema de identificação permite conhecer, a qualquer tempo, a abrangência da autorização de cada trabalhador (10.10.4)',
      'Falsa: basta a anotação nos documentos funcionais','Verdadeira, mas só para empresas com PIE',
      'Falsa: a abrangência só é informada à fiscalização quando pedida','Verdadeira, mas só para trabalhadores de MT/AT'],0,{
    'Falsa: basta a anotação nos documentos funcionais':'Os documentos funcionais (10.10.3) e o sistema de identificação (10.10.4) são exigências separadas.|10.10.3,10.10.4',
    'Verdadeira, mas só para empresas com PIE':'O 10.10.4 não depende do PIE.|10.10.4',
    'Falsa: a abrangência só é informada à fiscalização quando pedida':'O 10.10.4 pede conhecer a abrangência a qualquer tempo.|10.10.4',
    'Verdadeira, mas só para trabalhadores de MT/AT':'O 10.10.4 alcança cada trabalhador autorizado.|10.10.4'}),
  'pessoas:c3:VF':vf(['Falsa: o treinamento é a cargo e custo do empregador e durante o expediente (10.9.1)','Verdadeira, se o trabalhador concordar por escrito',
      'Falsa quanto ao custo; o horário pode ser fora do expediente','Verdadeira para o periódico bienal; falsa só para o inicial','Falsa: o custo é dividido entre empregador e trabalhador'],0,{
    'Verdadeira, se o trabalhador concordar por escrito':'O 10.9.1 não prevê acordo para mudar custo ou horário.|10.9.1',
    'Falsa quanto ao custo; o horário pode ser fora do expediente':'O 10.9.1 exige os dois: custo do empregador e durante o expediente.|10.9.1',
    'Verdadeira para o periódico bienal; falsa só para o inicial':'O 10.9.1 vale para todos os treinamentos previstos na NR, inclusive o periódico.|10.9.1,10.9.10',
    'Falsa: o custo é dividido entre empregador e trabalhador':'É a cargo e custo do empregador.|10.9.1'}),
  'pessoas:c4:VF':vf(['Falsa: o conteúdo prático é presencial (10.9.13)','Verdadeira, se houver simulador virtual','Verdadeira para o periódico; o presencial vale só no inicial',
      'Falsa: todo o treinamento, teoria e prática, é presencial','Verdadeira, se o instrutor tiver proficiência comprovada'],0,{
    'Verdadeira, se houver simulador virtual':'O 10.9.13 não abre exceção.|10.9.13',
    'Verdadeira para o periódico; o presencial vale só no inicial':'O 10.9.13 vale para os treinamentos previstos na NR, sem distinguir.|10.9.13',
    'Falsa: todo o treinamento, teoria e prática, é presencial':'A resposta é "falsa", mas o 10.9.13 fala só do conteúdo prático.|10.9.13',
    'Verdadeira, se o instrutor tiver proficiência comprovada':'A proficiência do instrutor é o 10.9.12; não muda a modalidade presencial do 10.9.13.|10.9.12,10.9.13'}),
  'pessoas:c5:VF':vf(['Verdadeira: quem supervisiona também é autorizado (10.10.2 c)','Falsa: o supervisor só precisa ser PLH',
      'Falsa: o supervisor não entra na zona controlada, então não precisa','Verdadeira, mas só no SEP','Falsa: basta o técnico de segurança supervisionar'],0,{
    'Falsa: o supervisor só precisa ser PLH':'O 10.10.2 c põe quem supervisiona entre os autorizados; habilitação não substitui autorização.|10.10.2',
    'Falsa: o supervisor não entra na zona controlada, então não precisa':'A alínea c não depende de entrar na zona controlada.|10.10.2',
    'Verdadeira, mas só no SEP':'O 10.10.2 não distingue SEP e SEC.|10.10.2',
    'Falsa: basta o técnico de segurança supervisionar':'Quem supervisiona serviços em eletricidade é autorizado (10.10.2 c), e a organização o indica entre os membros da equipe (10.7.6).|10.10.2,10.7.6'}),
  'pessoas:c6:VF':vf(['Verdadeira: a organização indica um trabalhador entre os membros da equipe para supervisão e condução (10.7.6)','Falsa: a supervisão é sempre de pessoa de fora da equipe',
      'Verdadeira só para equipes com mais de dois trabalhadores','Falsa: cada membro supervisiona o próprio trabalho','Verdadeira só em MT/AT'],0,{
    'Falsa: a supervisão é sempre de pessoa de fora da equipe':'O 10.7.6 diz entre os membros da equipe.|10.7.6',
    'Verdadeira só para equipes com mais de dois trabalhadores':'O 10.7.6 não tem número mínimo.|10.7.6',
    'Falsa: cada membro supervisiona o próprio trabalho':'O 10.7.6 pede um trabalhador indicado.|10.7.6',
    'Verdadeira só em MT/AT':'O 10.7.6 vale para serviços em eletricidade e trabalhos em proximidade feitos em equipe, sem faixa de tensão.|10.7.6'}),
  'pessoas:c7:VF':vf(['Falsa: os documentos técnicos do PIE são elaborados por PLH (10.15.7)','Verdadeira, se ele trabalhar sob responsabilidade de PLH autorizado',
      'Verdadeira para os procedimentos; o PLH elabora só o projeto','Falsa: só o técnico de segurança elabora o PIE','Falsa: o PIE é elaborado pela Inspeção do Trabalho'],0,{
    'Verdadeira, se ele trabalhar sob responsabilidade de PLH autorizado':'Isso define o trabalhador-capacitado (10.8.3 b), mas o 10.15.7 reserva a elaboração ao PLH.|10.8.3,10.15.7',
    'Verdadeira para os procedimentos; o PLH elabora só o projeto':'Os procedimentos do 10.15.4 integram o PIE, e o 10.15.7 vale para todos os documentos técnicos do PIE.|10.15.7,g-pie',
    'Falsa: só o técnico de segurança elabora o PIE':'O 10.15.7 atribui ao PLH.|10.15.7',
    'Falsa: o PIE é elaborado pela Inspeção do Trabalho':'O PIE é da organização, sob responsabilidade de PLH.|10.15.6'}),
  'pessoas:c8:VF':vf(['Verdadeira: após acidente grave ou fatal que indique a necessidade, há treinamento eventual, independentemente do periódico (10.9.11 d)',
      'Falsa: com o periódico bienal em dia, não há outro treinamento','Verdadeira, com carga horária fixa de 16 h','Verdadeira só se o acidente for fatal',
      'Falsa: o eventual só existe após afastamento de mais de 90 dias'],0,{
    'Falsa: com o periódico bienal em dia, não há outro treinamento':'O 10.9.11 vale independentemente de já ter feito o periódico.|10.9.11',
    'Verdadeira, com carga horária fixa de 16 h':'16 h é o mínimo do periódico (10.9.10); a carga do eventual atende à situação que o motivou (10.9.11.1).|10.9.10,10.9.11.1',
    'Verdadeira só se o acidente for fatal':'A alínea d do 10.9.11 diz grave ou fatal.|10.9.11',
    'Falsa: o eventual só existe após afastamento de mais de 90 dias':'O afastamento é só a alínea a; o 10.9.11 tem quatro situações.|10.9.11'}),
  'pessoas:c9:VF':vf(['Verdadeira: pode ser emitida e armazenada em meio digital, conforme a NR-1, em língua portuguesa (10.15.1)','Falsa: precisa existir também em papel',
      'Verdadeira, e pode estar em inglês se a matriz for estrangeira','Falsa: a PT nunca pode ser digital','Verdadeira, mas a versão digital fica disponível só à direção'],0,{
    'Falsa: precisa existir também em papel':'O 10.15.1 admite o meio digital.|10.15.1',
    'Verdadeira, e pode estar em inglês se a matriz for estrangeira':'O 10.15.1 exige língua portuguesa (Brasil).|10.15.1',
    'Falsa: a PT nunca pode ser digital':'O 10.7.2.3 admite a PT em meio físico ou digital.|10.7.2.3',
    'Verdadeira, mas a versão digital fica disponível só à direção':'Fica disponível aos trabalhadores interessados ou seus representantes e à Inspeção do Trabalho.|10.15.2'}),
  'pessoas:c10:VF':vf(['Verdadeira: instrutores com comprovada proficiência, sob responsabilidade de PLH (10.9.12)','Falsa: basta o instrutor ter feito o treinamento Básico',
      'Verdadeira, e o instrutor precisa ser engenheiro','Falsa: a responsabilidade é do técnico de segurança','Verdadeira só para a parte prática'],0,{
    'Falsa: basta o instrutor ter feito o treinamento Básico':'O 10.9.12 exige proficiência comprovada nas áreas e assuntos específicos.|10.9.12',
    'Verdadeira, e o instrutor precisa ser engenheiro':'O 10.9.12 não exige que o instrutor seja engenheiro; a responsabilidade é de PLH.|10.9.12',
    'Falsa: a responsabilidade é do técnico de segurança':'É de PLH.|10.9.12',
    'Verdadeira só para a parte prática':'O 10.9.12 vale para os treinamentos de segurança e saúde previstos na NR.|10.9.12'}),

  /* ===== III Execução: desenergizado ===== */
  'desenergizado:0':{e:['Sim, se o disjuntor estiver aberto e etiquetado','Não; falta só o aterramento temporário','Sim, para serviços em baixa tensão'],w:{
    'Sim':'Seccionar é só a alínea a do 10.13.1; sem o resto, a instalação está desligada com possibilidade de energização (10.5.2).|10.13.1,10.5.2',
    'Sim, se o disjuntor estiver aberto e etiquetado':'Disjuntor aberto e etiqueta são parte da sequência; o 10.13.1 exige as sete alíneas.|10.13.1',
    'Não; falta só o aterramento temporário':'Faltam também a constatação da ausência de tensão, o impedimento de reenergização e as demais alíneas.|10.13.1',
    'Sim, para serviços em baixa tensão':'O 10.13.1 não tem faixa de tensão.|10.13.1'}},
  'desenergizado:1':{e:['Sim, qualquer trabalhador autorizado, se registrar na PT','Sim, para ganhar tempo, mesmo com nível de segurança menor'],w:{
    'Nunca':'O 10.13.4 admite alterar, substituir, ampliar ou eliminar medidas.|10.13.4',
    'Sim, verbalmente no campo':'A justificativa técnica é previamente formalizada.|10.13.4',
    'Sim, qualquer trabalhador autorizado, se registrar na PT':'O 10.13.4 reserva a mudança ao PLH, autorizado.|10.13.4',
    'Sim, para ganhar tempo, mesmo com nível de segurança menor':'O 10.13.4 exige manter o mesmo nível de segurança.|10.13.4'}},
  'desenergizado:2':{e:['Basta avisar a outra equipe por rádio','Medidas só durante a instalação do aterramento','Nada, se o aterramento temporário estiver instalado'],w:{
    'Nada; a responsabilidade é dela':'O 10.13.3 põe na organização a garantia do estado de desenergização.|10.13.3',
    'Basta avisar a outra equipe por rádio':'O 10.13.3 exige medidas que impeçam a energização, não só aviso.|10.13.3',
    'Medidas só durante a instalação do aterramento':'O 10.13.3 diz durante toda a execução do serviço.|10.13.3',
    'Nada, se o aterramento temporário estiver instalado':'O aterramento é uma alínea do 10.13.1; o 10.13.3 exige ainda impedir que outras equipes energizem.|10.13.3,10.13.1'}},
  'desenergizado:3':{e:['(d) constatação de ausência de tensão para o aterramento','(f) sinalização de impedimento de reenergização'],w:{
    '(c) impedimento de reenergização':'O impedimento segura o que foi desligado; o barramento de entrada continua energizado.|10.13.1',
    '(g) delimitação da área':'A delimitação marca a área de trabalho; a proteção dos elementos energizados na zona controlada é a alínea e.|10.13.1',
    '(d) constatação de ausência de tensão para o aterramento':'A alínea d cuida do trecho a aterrar, não do que continua energizado na zona controlada.|10.13.1',
    '(f) sinalização de impedimento de reenergização':'A alínea f sinaliza o impedimento; não protege os elementos energizados.|10.13.1'}},
  'desenergizado:4':{e:['Constatação → seccionamento → impedimento','Seccionamento → aterramento → constatação'],w:{
    'Seccionamento → impedimento → constatação':'No 10.13.1, a constatação (b) vem antes do impedimento (c).|10.13.1',
    'Impedimento → seccionamento → constatação':'A primeira alínea é o seccionamento (a).|10.13.1',
    'Constatação → seccionamento → impedimento':'A sequência começa pelo seccionamento (a); a constatação é a alínea b.|10.13.1',
    'Seccionamento → aterramento → constatação':'O aterramento é a alínea d, depois da constatação (b) e do impedimento (c).|10.13.1'}},
  'desenergizado:5':{e:['Retirar as ferramentas, utensílios e equipamentos','Retirar das imediações quem não participa da reenergização'],w:{
    'Remover o aterramento temporário':'É a alínea d do 10.13.2.|10.13.2','Religar o disjuntor':'É a última, alínea g.|10.13.2',
    'Retirar as ferramentas, utensílios e equipamentos':'É a alínea b; a primeira é a retirada dos obstáculos de delimitação e sinalização.|10.13.2',
    'Retirar das imediações quem não participa da reenergização':'É a alínea c.|10.13.2'}},
  'desenergizado:6':{e:['Nada, se o operador usar vestimenta de Categoria 4','Nada: toda seccionadora tem intertravamento com o disjuntor','A corrente é interrompida sem arco, por ser manobra em vazio'],w:{
    'Nada; seccionadora interrompe carga':'Seccionadora não é dispositivo de abertura sob carga; por isso o 10.6.5 lista dispositivos de abertura sob carga entre as medidas contra arco.|10.6.5',
    'Nada, se o operador usar vestimenta de Categoria 4':'A vestimenta não impede o arco; EPI é o último nível da hierarquia.|10.5.4,10.6.5',
    'Nada: toda seccionadora tem intertravamento com o disjuntor':'Intertravamento é uma das medidas do 10.6.5 (alínea e), adotada conforme projeto; não existe em toda instalação.|10.6.5',
    'A corrente é interrompida sem arco, por ser manobra em vazio':'Com o disjuntor fechado a manobra não é em vazio: a seccionadora abre com corrente.|10.6.5'}},

  /* ===== IV Prova: documentação ===== */
  'documentacao:0':{e:['Sim, porque tem trabalhadores autorizados','Não; e por ser BT, também dispensa procedimentos de trabalho'],w:{
    'Sim, passa de 75 kW':'Carga instalada não é critério do 10.15.6.|10.15.6',
    'Não precisa de documento algum':'O 10.15.3 vale para toda organização.|10.15.3',
    'Sim, porque tem trabalhadores autorizados':'Autorizados obrigam o 10.15.4; o PIE depende de integrar o SEP ou atuar em MT/AT.|10.15.4,10.15.6',
    'Não; e por ser BT, também dispensa procedimentos de trabalho':'Com autorizados, o 10.15.4 a exige procedimentos, análises de risco e PT.|10.15.4'}},
  'documentacao:1':{e:['Não precisa: o PIE é só de quem integra o SEP','Precisa só se a carga passar de 75 kW','Precisa, e os documentos técnicos podem ser feitos pelo eletricista autorizado'],w:{
    'Não precisa: não é concessionária':'O 10.15.6 b não exige ser concessionária: basta realizar atividades em MT/AT.|10.15.6',
    'Não precisa: o PIE é só de quem integra o SEP':'A alínea b do 10.15.6 inclui quem realiza atividades em MT/AT.|10.15.6',
    'Precisa só se a carga passar de 75 kW':'A carga instalada não é critério.|10.15.6',
    'Precisa, e os documentos técnicos podem ser feitos pelo eletricista autorizado':'Os documentos técnicos do PIE são elaborados por PLH (10.15.7).|10.15.7'}},
  'documentacao:2':{e:['Precisa de PIE só se a tensão passar de 36,2 kV','Não precisa: geração não faz parte do SEP','Precisa de PIE só um ano depois da conexão'],w:{
    'Não precisa: é energia renovável':'O 10.15.6 não distingue a fonte; a geração integra o SEP (glossário).|10.15.6,g-sep',
    'Precisa de PIE só se a tensão passar de 36,2 kV':'A alínea a (integrar o SEP) independe da tensão.|10.15.6',
    'Não precisa: geração não faz parte do SEP':'O glossário inclui a geração no SEP.|g-sep',
    'Precisa de PIE só um ano depois da conexão':'O 10.15.6 não prevê carência.|10.15.6'}},
  'documentacao:3':{e:['O trabalhador-capacitado, sob orientação de PLH','A distribuidora de energia'],w:{
    'Qualquer trabalhador autorizado':'Autorização não é habilitação; o 10.15.7 exige PLH.|10.15.7',
    'O técnico de segurança do trabalho':'O 10.15.7 exige PLH.|10.15.7',
    'O trabalhador-capacitado, sob orientação de PLH':'O 10.15.7 exige que os documentos técnicos do PIE sejam elaborados por PLH.|10.15.7',
    'A distribuidora de energia':'O PIE é da organização, sob responsabilidade de PLH.|10.15.6'}},
  'documentacao:4':{e:['Sim, em qualquer idioma','Sim, mas só com cópia impressa no local','Não: só a PT pode ser digital'],w:{
    'Não, precisa ser impresso':'O 10.15.1 admite o meio digital, e o glossário define o PIE em meio físico ou eletrônico.|10.15.1,g-pie',
    'Sim, em qualquer idioma':'O 10.15.1 exige língua portuguesa (Brasil).|10.15.1',
    'Sim, mas só com cópia impressa no local':'O 10.15.1 não exige cópia em papel.|10.15.1',
    'Não: só a PT pode ser digital':'O 10.15.1 vale para toda a documentação da NR.|10.15.1'}},
  'documentacao:5':{e:['Só à Inspeção do Trabalho, quando requisitar','A qualquer pessoa, inclusive ao público','Só ao PLH responsável'],w:{
    'Só à direção da empresa':'O 10.15.2 inclui os trabalhadores interessados ou seus representantes e a Inspeção do Trabalho.|10.15.2',
    'Só à Inspeção do Trabalho, quando requisitar':'Também aos trabalhadores interessados ou representantes, e sempre disponível.|10.15.2',
    'A qualquer pessoa, inclusive ao público':'O 10.15.2 lista trabalhadores interessados ou seus representantes e a Inspeção do Trabalho.|10.15.2',
    'Só ao PLH responsável':'O 10.15.2 lista trabalhadores interessados ou seus representantes e a Inspeção do Trabalho.|10.15.2'}},
  'documentacao:6':{e:['Obriga a interdição imediata de toda instalação sem PIE','Dispensa a NR-3 em qualquer não conformidade da NR-10'],w:{
    'Cria multas novas':'O 10.16.1 trata de embargo e interdição, não de multas.|10.16.1',
    'Proíbe a interdição de instalações do SEP':'O 10.16.1 não exclui o SEP.|10.16.1',
    'Obriga a interdição imediata de toda instalação sem PIE':'Falta de PIE não está entre as quatro situações do 10.16.1.|10.16.1',
    'Dispensa a NR-3 em qualquer não conformidade da NR-10':'A dispensa vale só para as quatro situações listadas.|10.16.1'}},
  'documentacao:c0:TAXP':tx,'documentacao:c1:TAXP':tx,'documentacao:c3:TAXP':tx,'documentacao:c4:TAXP':tx,'documentacao:c5:TAXP':tx,
  'documentacao:c6:TAXP':tx,'documentacao:c7:TAXP':tx,'documentacao:c8:TAXP':tx,
  'documentacao:c2:TAXP':{e:[T5],w:Object.assign({},TW,{'Quem tem área classificada':'O 10.15.5 a também pede procedimentos, análises de risco e PT, mas só os do serviço em área classificada (10.6.6.1.2); a obrigação geral é de quem tem autorizados (10.15.4 a). [INTERPRETAÇÃO]|10.15.5,10.15.4'})},

  /* ===== Missão (OS 0457) ===== */
  'missao:0':{e:['SEP em MT: Básico e Complementar do SEP, PIE obrigatório','Fora da NR-10: o transformador vai estar desligado'],w:{
    'SEP em AT: Básico e Complementar SEP':'13,8 kV é MT (até 36.200 V CA), e a cabine depois da medição é do consumidor.|g-mt,g-sep',
    'SEC em BT: só o Básico, e PIE pela carga instalada acima de 75 kW':'13,8 kV não é BT, e carga instalada não é critério de PIE.|g-bt,10.15.6',
    'SEP em MT: Básico e Complementar do SEP, PIE obrigatório':'Depois da medição a instalação é do consumidor: o SEP vai até a medição, inclusive.|g-sep',
    'Fora da NR-10: o transformador vai estar desligado':'A NR-10 alcança manutenção em MT (10.2.1), e desligada com possibilidade de energização segue o 10.14 (10.5.2).|10.2.1,10.5.2'}},
  'missao:1':{e:['Só a análise de risco, sem outro documento','Permissão de trabalho aprovada pelo PLH, sem análise de risco'],w:{
    'Procedimento de trabalho aprovado por PLH':'Procedimento é para atividade rotineira (10.7.1); serviço nunca feito é não rotineiro.|10.7.1,g-rot',
    'Ordem verbal do supervisor':'O não rotineiro exige PT (10.7.2).|10.7.2',
    'Só a análise de risco, sem outro documento':'A análise de risco precede a PT; não a substitui.|10.7.2',
    'Permissão de trabalho aprovada pelo PLH, sem análise de risco':'A PT é precedida de análise de riscos e aprovada por trabalhador autorizado.|10.7.2'}},
  'missao:2':{e:['Os contatos inferiores da 89-1, do lado da carga','Só o QGBT de 380 V'],w:{
    'Nada: a seccionadora isola tudo':'A seccionadora isola o trecho do lado da carga; o lado da fonte continua energizado e é tratado na alínea e do 10.13.1.|10.13.1',
    'Só o secundário do transformador':'Com a 89-1 aberta, o perigo na zona controlada da cabine é o lado da fonte da 89-1.|10.13.1,AII',
    'Os contatos inferiores da 89-1, do lado da carga':'Do lado da carga a 89-1 aberta isola; quem segue energizado é o lado da fonte.|10.13.1',
    'Só o QGBT de 380 V':'A pergunta é sobre a zona controlada da cabine: o barramento de entrada e os contatos do lado da fonte seguem energizados.|10.13.1,AII'}},
  'missao:3':{e:['Cada um supervisiona o próprio trabalho','Um terceiro eletricista só para observar'],w:{
    'Nada: equipe pequena dispensa':'O 10.7.6 vale para equipe de qualquer tamanho.|10.7.6',
    'Um técnico de segurança externo presente':'O 10.7.6 indica alguém entre os membros da equipe.|10.7.6',
    'Cada um supervisiona o próprio trabalho':'O 10.7.6 pede um trabalhador indicado.|10.7.6',
    'Um terceiro eletricista só para observar':'O 10.7.6 indica um dos membros da própria equipe; não exige um terceiro.|10.7.6'}},
  'missao:4':{e:['Categoria 1'],w:{'Categoria 1':C1,'Categoria 2':'Categoria 2 só aparece em linhas de até 600 V com 0,03 s.|AIV-I','Categoria 3':C3,
    'Fora do Anexo IV':'20 kA ≤ 35 kA, 0,20 s ≤ 0,24 s e 910 mm: cabe na linha.|AIV-I,10.11.2.1'}},
  'missao:5':{e:['Medir com um multímetro de bolso','Seguir: com a seccionadora visível, a constatação pode ser pulada'],w:{
    'Usar mesmo assim: a 89-1 está visivelmente aberta':'Sem detector confiável não se cumpre a constatação do 10.13.1; anormalidade que afeta a segurança impede o início (10.7.4.2).|10.7.4.2,10.13.1',
    'Começar e trocar o detector depois':'O 10.7.4.2 manda não iniciar a operação.|10.7.4.2',
    'Medir com um multímetro de bolso':'O instrumento precisa ser adequado à tensão de trabalho e à classe de isolação (10.12.6.1 a).|10.12.6.1',
    'Seguir: com a seccionadora visível, a constatação pode ser pulada':'A constatação é alínea do 10.13.1; só PLH altera a sequência, com justificativa formalizada (10.13.4).|10.13.1,10.13.4'}},
  'missao:6':{e:['Só aterrar o lado de MT, que resolve as duas fontes','Tratar o lado de 380 V como extrabaixa tensão'],w:{
    'Nada: o lado de 13,8 kV já está seccionado':'Enquanto houver possibilidade de energização por qualquer meio, vale o 10.14 (10.5.2).|10.5.2',
    'Basta avisar o operador do gerador':'Aviso não é impedimento de reenergização (10.13.1 c, 10.13.3).|10.13.1,10.13.3',
    'Só aterrar o lado de MT, que resolve as duas fontes':'O aterramento é uma alínea; desenergizar exige seccionar e impedir a reenergização da fonte de BT também. [INTERPRETAÇÃO]|10.13.1,10.5.2',
    'Tratar o lado de 380 V como extrabaixa tensão':'380 V é BT pelo glossário.|g-bt'}},
  'missao:7':{e:['Sim, porque a PT vale 24 horas','Não: a PT não pode ser revalidada em hipótese alguma'],w:{
    'Sim, até o fim do serviço':'A validade é limitada à duração da atividade e restrita ao turno.|10.7.2.2',
    'Sim, se o supervisor assinar de novo':'Não cabe revalidação com mudança na equipe.|10.7.2.2',
    'Sim, porque a PT vale 24 horas':'A PT é restrita ao turno de trabalho.|10.7.2.2',
    'Não: a PT não pode ser revalidada em hipótese alguma':'O 10.7.2.2 admite revalidação pelo responsável pela autorização, se não mudarem as condições nem a equipe.|10.7.2.2'}},

  /* ===== História (OS 0731): já tinham 5 alternativas ===== */
  'historia:0':{w:{'SEP em alta tensão: Básico e Complementar do SEP':'13,8 kV é MT, e depois da medição a instalação é do consumidor.|g-mt,g-sep',
    'SEC em baixa tensão: só o Básico, e PIE pela carga instalada':'13,8 kV não é BT, e carga instalada não é critério de PIE.|g-bt,10.15.6',
    'Fora da NR-10, porque o serviço é no transformador desligado':'Desligado com possibilidade de energização segue o 10.14 (10.5.2); a NR-10 alcança a manutenção (10.2.1).|10.5.2,10.2.1',
    'SEP em média tensão, porque a cabine recebe energia da distribuidora':'Receber energia da distribuidora não põe a cabine no SEP: o SEP vai até a medição, inclusive.|g-sep'}},
  'historia:1':{w:{'Procedimento de trabalho aprovado por PLH':'Procedimento é para atividade rotineira (10.7.1); serviço nunca feito é não rotineiro.|10.7.1,g-rot',
    'Ordem verbal do supervisor':'O não rotineiro exige PT (10.7.2).|10.7.2',
    'Só a análise de risco, sem outro documento':'A análise de risco precede a PT; não a substitui.|10.7.2',
    'O projeto elétrico da cabine':'O projeto fica disponível e atualizado (10.4.7), mas não libera serviço.|10.4.7,10.7.2'}},
  'historia:2':{w:{'Nada: equipe de duas pessoas dispensa supervisão':'O 10.7.6 vale para qualquer equipe.|10.7.6',
    'Contratar um técnico de segurança para ficar no local':'O 10.7.6 indica alguém entre os membros da equipe.|10.7.6',
    'Pôr um terceiro eletricista só para observar':'O 10.7.6 não exige um terceiro.|10.7.6',
    'Deixar cada um supervisionar o próprio trabalho':'O 10.7.6 pede um trabalhador indicado.|10.7.6'}},
  'historia:3':{w:{'Categoria 2: no mínimo 8 cal/cm²':'Categoria 2 só aparece em linhas de até 600 V com 0,03 s.|AIV-I',
    'Categoria 3: no mínimo 25 cal/cm²':C3,'Categoria 1: no mínimo 4 cal/cm²':C1,
    'Nenhuma: o Anexo IV não vale para média tensão':'O Quadro I tem linhas de 1 kV a 15 kV.|AIV-I'}},
  'historia:4':{w:{'Usa assim mesmo: a seccionadora vai ficar visivelmente aberta':'Anormalidade que afeta a segurança impede o início (10.7.4.2); sem detector não há constatação do 10.13.1.|10.7.4.2,10.13.1',
    'Começa e troca o detector depois':'O 10.7.4.2 manda não iniciar a operação.|10.7.4.2',
    'Usa o VPIS do cubículo no lugar do detector':'O indicador fixo não substitui a constatação com instrumento adequado e testado. [INTERPRETAÇÃO]|10.13.1,10.12.6.1',
    'Mede com um multímetro de bolso':'O instrumento precisa ser adequado à tensão de trabalho e à classe de isolação.|10.12.6.1'}},
  'historia:5':{w:{'Sim, até o fim do serviço':'A validade é restrita ao turno.|10.7.2.2','Sim, se o supervisor da noite assinar embaixo':'Com a equipe toda trocada, não cabe revalidação.|10.7.2.2',
    'Sim, porque a PT vale 24 horas':'A PT é restrita ao turno.|10.7.2.2','Não existe PT em serviço de manutenção':'A PT existe para todo serviço não rotineiro (10.7.2).|10.7.2'}},
  'historia:6':{w:{'É descartada, porque o serviço terminou':'Ao final, a PT é encerrada e arquivada.|10.7.2.3','Fica com o executante, como comprovante pessoal':'Ela é arquivada pela organização, para rastreabilidade.|10.7.2.3',
    'É reutilizada no próximo serviço parecido':'A PT vale só para a atividade e o turno.|10.7.2.2','É entregue à distribuidora':'A PT é encerrada e arquivada; a NR-10 não manda entregá-la à distribuidora.|10.7.2.3'}},
  'historia:7':{w:{'É só uma não conformidade, corrigida no próximo serviço':'Pular a constatação é não adotar a sequência do 10.13.1: alínea b do 10.16.1.|10.16.1',
    'Gera multa, mas nunca interdição':'O 10.16.1 permite embargo ou interdição.|10.16.1','Só conta se houver acidente':'O 10.16.1 não depende de acidente.|10.16.1',
    'Depende de a fábrica ter PIE':'O 10.16.1 não depende do PIE.|10.16.1'}}
  };})();

/* Aplica a camada BANCA a uma questão (cópia; a original não muda). */
function bancaQ(q){const id=q&&(q.id||QB.idOf(q));const b=id&&BANCA[id];if(!b)return q;
  let o=q.o.slice(),a=q.a;const w=Object.assign({},q.w||{},b.w||{});
  if(b.o){o=b.o.slice();a=b.a;}
  if(b.e)o=o.concat(b.e.filter(t=>!o.includes(t)));
  if(b.drop){const right=o[a];o=o.filter(t=>t===right||!b.drop.includes(t));a=o.indexOf(right);}
  const out=Object.assign({},q,{id,o,a,w});
  if(b.p){const k=q.q.indexOf('<br>');out.q=b.p+(k>=0?q.q.slice(k):'');}
  return out;}

/* "Por que as outras estão erradas": lista das alternativas erradas com o motivo e o item.
   ord (opcional) = ordem em que as alternativas foram mostradas (índices de q.o). */
function whyHTML(q,j,ord){const w=q&&q.w;if(!w)return '';const L='ABCDEF';ord=ord||q.o.map((_,k)=>k);
  const rows=ord.map((k,pos)=>[k,pos]).filter(([k])=>k!==q.a&&w[q.o[k]]);if(!rows.length)return '';
  const li=([k,pos])=>{const [t,r]=String(w[q.o[k]]).split('|');return `<li class="${k===j?'mine':''}"><span class="ol">${L[pos]}</span><span>${t} ${Rs(r?r.split(','):[])}</span></li>`;};
  const mine=j!=null&&j!==q.a;
  return `<details class="why" ${mine?'open':''}><summary>${mine?'Por que a sua e as outras alternativas estão erradas':'Por que as outras alternativas estão erradas'}</summary><ul>${rows.map(li).join('')}</ul></details>`;}

/* As questões já registradas passam a sair no formato de banca. */
QB.list=QB.list.map(bancaQ);
