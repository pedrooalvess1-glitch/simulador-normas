/* ===== Treino para prova (v3): simulado, revisão espaçada, gerador de questões e cartões =====
   Escopo normativo: NR-10, Portaria MTE 737/2026 (edição única).
   Dados normativos deste arquivo conferidos no PDF da Portaria em 03/11/2026
   (Quadro I do 10.9.2, 10.9.4–10.9.11, 10.13.1, 10.13.2, 10.14.2, 10.15.6, Anexo II, Anexo IV Quadros I–III). */
(()=>{
  const L='ABCDE';
  const rnd=n=>Math.floor(Math.random()*n);
  const pick=a=>a[rnd(a.length)];
  const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;};
  const fmtV=v=>v>=1000?(v/1000).toLocaleString('pt-BR')+' kV':v.toLocaleString('pt-BR')+' V';
  const pct=(a,b)=>b?Math.round(100*a/b):0;
  /* monta uma questão com a alternativa correta embaralhada entre as demais */
  function mk(q,right,wrong,x,r,gen,w){const o=shuffle([right].concat(wrong.filter(t=>t!==right)).slice(0,5));return {q,o,a:o.indexOf(right),x,r,gen,w:w||{}};}
  /* explicações por alternativa (formato de banca): texto|itens */
  const C3W='O Quadro I (CA) não tem nenhuma linha de Categoria 3; ela só aparece no Quadro II (CC).|AIV-I';
  const HW={'8 h':'8 h é o Específico e pontual, para estrangeiros ou não residentes em serviço pontual (10.9.8).|10.9.8','16 h':'16 h é um complementar isolado (MT/AT-SEC ou Área Classificada) ou o periódico bienal; nenhum deles substitui o Básico do autorizado.|10.9.2,10.9.4',
    '40 h':'40 h é só o Básico (ou só o Específico de compartilhamento).|10.9.2','56 h':'56 h é o Básico mais um complementar de 16 h.|10.9.2','72 h':'72 h é o Básico mais dois complementares de 16 h.|10.9.2',
    '80 h':'80 h é o Básico mais o Complementar do SEP.|10.9.2,10.9.5','96 h':'96 h é o Básico, o Complementar do SEP e um complementar de 16 h.|10.9.2','120 h':'120 h não corresponde a uma soma de treinamentos do Quadro I exigida para um só trabalhador.|10.9.2'};
  /* embaralha as alternativas de uma questão do banco, mantendo a correta */
  function shuf(q){const idx=shuffle(q.o.map((_,i)=>i));return Object.assign({},q,{o:idx.map(i=>q.o[i]),a:idx.indexOf(q.a)});}

  /* ---------- nomes curtos dos capítulos (rótulos do painel, não texto da norma) ---------- */
  const CHN={'10.1':'Objetivo','10.2':'Campo de aplicação','AI':'Glossário (Anexo I)','AII':'Zonas (Anexo II)','10.3':'Gerenciamento de riscos','10.4':'Projetos',
    '10.5':'Eliminação do perigo','10.6':'Proteção coletiva','10.7':'Medidas administrativas','10.8':'Qualificação e capacitação','10.9':'Treinamentos',
    '10.10':'Autorização','10.11':'Proteção individual','AIV':'EPI de arco (Anexo IV)','AIII':'Treinamentos (Anexo III)','10.12':'Etapas da instalação',
    '10.13':'Desenergização','10.14':'Energizado','10.15':'Documentação','10.16':'Grave e iminente risco','Portaria':'Artigos da Portaria','geral':'Geral'};
  const chName=c=>CHN[c]||c;

  /* ---------- dados conferidos no PDF ---------- */
  const SEQ_D=['seccionamento ou desligamento','constatação da ausência de tensão','impedimento de reenergização',
    'constatação de ausência de tensão para a instalação de aterramento temporário com equipotencialização dos condutores dos circuitos',
    'proteção dos elementos energizados existentes na zona controlada (Anexo II desta NR) e proteção dos trabalhadores para os efeitos do arco elétrico',
    'instalação da sinalização de impedimento de reenergização','delimitação e sinalização da área de trabalho'];
  const SEQ_R=['retirada dos obstáculos de delimitação e sinalização do espaço seguro de trabalho','retirada das ferramentas, utensílios e equipamentos',
    'retirada das imediações de todos os trabalhadores não envolvidos no processo de reenergização','remoção do aterramento temporário e da equipotencialização',
    'retirada das proteções dos elementos energizados nas imediações','remoção da sinalização de impedimento de reenergização',
    'desbloqueio, se houver, e religamento dos dispositivos de seccionamento'];
  /* Anexo IV, Quadro I (CA): [equipamento, kA máx., tempo máx. (s), distância mín. (mm), categoria, ≤600 V?] */
  const AIV=[['Painel ou outro equipamento classificado para 240 V ou menos',25,0.03,455,1,1],
    ['Painel ou outro equipamento com classificação superior a 240 V e até 600 V',25,0.03,455,2,1],
    ['Centro de controle de motores (CCM) de classe de 600 V',65,0.03,455,2,1],
    ['Centro de controle de motores (CCM) de classe de 600 V',42,0.33,455,4,1],
    ['Aparelhagem de distribuição de 600 V (com disjuntores de potência ou interruptores com fusível) e quadros de distribuição de 600 V',35,0.5,455,4,1],
    ['Outro equipamento de classe de 600 V (277 V a 600 V, nominal)',65,0.03,455,2,1],
    ['Partida de motor NEMA E2 (contator com fusível), 2,3 kV a 7,2 kV',35,0.24,910,4,0],
    ['Aparelhagem de manobra revestida de metal, 1 kV a 15 kV',35,0.24,910,4,0],
    ['Chave seccionadora em invólucro metálico, com ou sem fusível, construção de 1 kV a 15 kV',35,0.24,910,4,0],
    ['Outro equipamento de 1 kV a 15 kV',35,0.24,910,4,0]];
  const CAT_CAL={1:4,2:8,3:25,4:40};
  const FAIXA_TXT={EBT:'não superior a 50 V CA ou 120 V CC',BT:'superior a 50 V CA (120 V CC) e igual ou inferior a 1.000 V CA (1.500 V CC)',
    MT:'superior a 1.000 V CA (1.500 V CC) e igual ou inferior a 36.200 V CA (3.000 V CC)',AT:'superior a 36.200 V CA ou 3.000 V CC'};
  const GREF={EBT:'g-ebt',BT:'g-bt',MT:'g-mt',AT:'g-at'};

  /* ---------- gerador de questões (cada chamada sorteia um cenário novo) ---------- */
  const GEN={
    faixa:{n:'Faixas de tensão',f(){const ac=Math.random()<.7;
      const V=ac?pick([24,50,110,127,220,380,440,690,1000,2300,4160,13800,23000,34500,36200,69000,138000,230000,500000]):pick([24,48,120,125,600,750,1000,1500,1800,3000,3300]);
      const f=faixa(V,ac);return mk(`Tensão de ${fmtV(V)} em ${ac?'corrente alternada':'corrente contínua'}, entre fases. Em que faixa ela está pelo glossário da NR-10?`,
        f,['EBT','BT','MT','AT','Depende do tipo de instalação, não só da tensão'],`${f}: tensão ${FAIXA_TXT[f]}. Repare nas fronteiras: o limite superior de cada faixa é "igual ou inferior".`,[GREF[f]],'faixa',
        Object.assign({'Depende do tipo de instalação, não só da tensão':'As faixas do glossário dependem só do valor da tensão, em CA ou CC, entre fases ou entre fase e terra.|'+GREF[f]},
          ...['EBT','BT','MT','AT'].map(k=>({[k]:`${k} é a tensão ${FAIXA_TXT[k]}.|${GREF[k]}`}))));}},
    zonas:{n:'Zonas (Anexo II)',f(){const rows=ZTAB.filter(r=>r[1]<=150);const i=rnd(rows.length),z=rows[i];
      const useEx=z[5]&&Math.random()<.65;const kV=useEx?parseFloat(z[5].replace(',','.'))/(z[5].includes('kV')?1:1000):(z[0]||0.38);
      const lab=useEx?z[5]:(z[0]?fmtV(z[0]*1000):'380 V');const s=r=>`Rr = ${fmt(r[2])} m · Rc = ${fmt(r[3])} m`;
      const w=[rows[i-1],rows[i+1],rows[i+2],rows[i-2]].filter(Boolean).map(s);
      const ww={};[rows[i-1],rows[i+1],rows[i+2],rows[i-2]].filter(Boolean).forEach(r=>{ww[s(r)]=`São os raios da linha ${r[4]} do Anexo II, outra faixa de tensão.|AII`;});
      return mk(`Instalação de ${lab} (tensão nominal entre fases). Quais são os raios da zona de risco e da zona controlada pelo Anexo II?`,
        s(z),w,`Linha ${z[4]} do Anexo II. Fronteira: o limite inferior entra na faixa (≥) e o superior não (<).`,['AII'],'zonas',ww);}},
    trein:{n:'Treinamentos (Quadro I)',f(){const P=[
        ['Eletricista autorizado de uma indústria (SEC) que só trabalha em baixa tensão',40,'Básico 40 h.',['10.9.4']],
        ['Eletricista autorizado de uma indústria (SEC) que opera a cabine primária de 13,8 kV',56,'Básico 40 h + Complementar de Média e Alta Tensão - SEC 16 h.',['10.9.4','10.9.6']],
        ['Eletricista autorizado de uma distribuidora (SEP)',80,'Básico 40 h + Complementar do SEP 40 h.',['10.9.4','10.9.5']],
        ['Técnico de provedor que instala fibra óptica em postes da distribuidora (compartilhamento de infraestrutura do SEP)',40,'Só o Específico de compartilhamento de infraestrutura do SEP, 40 h: ele dispensa o Básico e o Complementar do SEP.',['10.9.9','10.9.4','10.9.5']],
        ['Eletricista autorizado (SEC, baixa tensão) que faz manutenção em área classificada de um posto',56,'Básico 40 h + Complementar de Área Classificada 16 h.',['10.9.4','10.9.7']],
        ['Eletricista autorizado de uma refinaria (SEC) que atua em média tensão e em área classificada',72,'Básico 40 h + Complementar MT/AT - SEC 16 h + Complementar de Área Classificada 16 h.',['10.9.4','10.9.6','10.9.7']],
        ['Eletricista autorizado de uma distribuidora (SEP) que também atua em área classificada',96,'Básico 40 h + Complementar do SEP 40 h + Complementar de Área Classificada 16 h.',['10.9.4','10.9.5','10.9.7']]];
      const p=pick(P);const opts=[8,16,40,56,72,80,96,120].map(h=>h+' h');
      return mk(`${p[0]}. Qual é a carga horária mínima total dos treinamentos iniciais?`,p[1]+' h',shuffle(opts),`${p[2]} Cargas do Quadro I do 10.9.2.`,['10.9.2'].concat(p[3]),'trein',HW);}},
    arco:{n:'Categoria de arco (CA)',f(){const t=pick(AIV);let [eq,kA,s,mm,cat,bt]=t;const mode=Math.random();
      const FORA='Fora do Anexo IV: fazer estudo de energia incidente';let right='Categoria '+cat,x,r=['AIV-I','10.11.2.1'];
      if(mode<.22){const k=rnd(3);if(k===0)kA=Math.round(kA*1.3);else if(k===1)s=+(s*2).toFixed(2);else mm=mm-150;right=FORA;
        x=`O parâmetro ${['de corrente','de tempo','de distância'][k]} saiu da linha do Quadro I. Corrente maior, tempo maior ou distância menor impede o Anexo IV; vale o estudo de energia incidente.`;r=['10.11.2.2','10.11.2.3','AIV-I'];}
      else if(mode<.40&&bt&&cat>1){right='Categoria '+(cat-1);
        x=`Linha do Quadro I: Categoria ${cat}. Pela nota do quadro, equipamento de 600 V ou menos protegido por fusível ou disjuntor limitador de até 200 A pode descer um número, nunca abaixo da Categoria 1.`;}
      else{if(Math.random()<.4){kA=Math.max(5,Math.round(kA*.8));mm=mm+150;}x=`Dentro da linha do Quadro I (até ${t[1]} kA, até ${fmt(t[2])} s, a partir de ${t[3]} mm): Categoria ${cat}. Valores menores de corrente e tempo, ou distância maior, continuam dentro da linha.`;}
      const lim=mode>=.22&&mode<.40&&bt&&cat>1?' O circuito é protegido por disjuntor limitador de corrente de 200 A. Qual é a menor categoria admitida?':' Qual é a categoria de EPI?';
      const ww={'Categoria 3':C3W};const fora=right===FORA,red=!fora&&right!=='Categoria '+cat;
      [1,2,4].forEach(k=>{const t='Categoria '+k;if(t===right)return;ww[t]=fora?'Algum parâmetro saiu da linha do Quadro I, e isso impede o Anexo IV.|10.11.2.2':
        red&&k===cat?'É a categoria da linha, mas a nota do Quadro I permite reduzir um número com limitador de corrente de até 200 A.|AIV-I':
        k<cat-(red?1:0)?'Abaixo da categoria do Anexo IV: categoria menor só com estudo de energia incidente.|10.11.2.3':'Acima da categoria que a linha do Quadro I dá para estes parâmetros.|AIV-I';});
      if(!fora)ww[FORA]='Corrente, tempo e distância cabem na linha do equipamento: o Anexo IV se aplica.|10.11.2.1';
      return mk(`${eq}: corrente de falha disponível de ${kA} kA, tempo de eliminação de ${fmt(s)} s, distância de trabalho de ${mm} mm.${lim}`,
        right,['Categoria 1','Categoria 2','Categoria 3','Categoria 4',FORA],x,r,'arco',ww);}},
    arcoCC:{n:'Categoria de arco (CC)',f(){const V=pick([220,250,400,480,600]);const bands=[[.5,1.4,2],[1.5,2.9,2],[3,6.9,3],[7,9.9,4]];const b=pick(bands);
      const I=+(b[0]+Math.random()*(b[1]-b[0])).toFixed(1);
      return mk(`Banco de baterias de ${V} V CC, corrente de curto-circuito disponível de ${fmt(I,1)} kA, arco de até 2 s a 455 mm. Qual é a categoria de EPI pelo Quadro II do Anexo IV?`,
        'Categoria '+b[2],['Categoria 1','Categoria 2','Categoria 3','Categoria 4','Fora do Anexo IV: estudo de energia incidente'],`Quadro II (CC, acima de 150 V e até 600 V): abaixo de 3 kA → Cat. 2; de 3 a menos de 7 kA → Cat. 3; de 7 a menos de 10 kA → Cat. 4.`,['AIV-II'],'arcoCC',
        {'Categoria 1':'O Quadro II (CC) começa na Categoria 2.|AIV-II','Categoria 2':'Categoria 2 é para corrente abaixo de 3 kA.|AIV-II','Categoria 3':'Categoria 3 é de 3 a menos de 7 kA.|AIV-II',
         'Categoria 4':'Categoria 4 é de 7 a menos de 10 kA.|AIV-II','Fora do Anexo IV: estudo de energia incidente':`${V} V está entre 150 e 600 V, e ${fmt(I,1)} kA está abaixo de 10 kA: cabe no Quadro II.|AIV-II`});}},
    vest:{n:'Vestimenta (cal/cm²)',f(){const c=1+rnd(4);return mk(`Qual é a resistência mínima ao arco (ATPV ou EBT) da vestimenta da Categoria ${c} de EPI?`,
        CAT_CAL[c]+' cal/cm²',['4 cal/cm²','8 cal/cm²','12 cal/cm²','25 cal/cm²','40 cal/cm²'],'Quadro III do Anexo IV: Cat. 1 = 4; Cat. 2 = 8; Cat. 3 = 25; Cat. 4 = 40 cal/cm².',['AIV-III'],'vest',
        Object.assign({'12 cal/cm²':'12 cal/cm² não é mínimo de nenhuma categoria do Quadro III.|AIV-III'},...[1,2,3,4].map(k=>({[CAT_CAL[k]+' cal/cm²']:`É o mínimo da Categoria ${k}.|AIV-III`}))));}},
    seq:{n:'Sequências (10.13)',f(){const des=Math.random()<.55;const S=des?SEQ_D:SEQ_R;const ref=des?'10.13.1':'10.13.2';const nome=des?'desenergização':'reenergização';const k=rnd(3);
      const sw=()=>Object.assign({},...S.map((t,j)=>({[t]:`É a alínea ${'abcdefg'[j]} do ${ref}.|${ref}`})));
      if(k===0){const i=rnd(S.length-1);return mk(`Na sequência de ${nome} do ${ref}, qual etapa vem logo depois de “${S[i]}”?`,S[i+1],shuffle(S.filter((_,j)=>j!==i&&j!==i+1)).slice(0,4),`Alínea ${'abcdefg'[i]} → alínea ${'abcdefg'[i+1]} do ${ref}.`,[ref],'seq',sw());}
      if(k===1){const i=rnd(S.length);return mk(`Qual é a alínea “${'abcdefg'[i]}” da sequência de ${nome} do ${ref}?`,S[i],shuffle(S.filter((_,j)=>j!==i)).slice(0,4),`${ref}, alínea ${'abcdefg'[i]}.`,[ref],'seq',sw());}
      const first=Math.random()<.5;const i=first?0:S.length-1;return mk(`Qual é a ${first?'primeira':'última'} etapa da sequência de ${nome} do ${ref}?`,S[i],shuffle(S.filter((_,j)=>j!==i)).slice(0,4),`${ref}, alínea ${'abcdefg'[i]}.`,[ref],'seq',sw());}},
    pie:{n:'PIE (10.15.6)',f(){const kw=pick([120,300,750,1500,2500]);const P=[
        ['Distribuidora de energia elétrica',1],['Usina solar conectada à rede da distribuidora (geração)',1],
        ['Indústria com cabine primária de 13,8 kV operada pelos próprios eletricistas',1],
        [`Supermercado com ${kw} kW instalados, alimentado em 380 V, sem atividade em média tensão`,0],
        ['Condomínio residencial alimentado em 220/127 V, com um eletricista próprio',0]];const p=pick(P);
      const S='Sim: integra o SEP ou realiza atividades em média ou alta tensão',C='Sim: por causa da carga instalada',N='Não: não integra o SEP nem realiza atividades em média ou alta tensão';
      const A='Sim: toda organização com trabalhadores autorizados mantém PIE',D='Não: só concessionárias de distribuição mantêm PIE';
      const pw={[C]:'Carga instalada não é critério do 10.15.6.|10.15.6',[A]:'Ter autorizados obriga a documentação do 10.15.4; organizá-la como PIE depende de integrar o SEP ou atuar em MT/AT.|10.15.4,10.15.6',
        [D]:'O 10.15.6 alcança quem integra o SEP (geração e transmissão também) ou realiza atividades em MT/AT, não só distribuidoras.|10.15.6,g-sep',
        [S]:'Esta organização não integra o SEP nem realiza atividades em MT/AT.|10.15.6',[N]:'Esta organização integra o SEP ou realiza atividades em MT/AT.|10.15.6'};
      return mk(`${p[0]}. A organização é obrigada a manter o PIE?`,p[1]?S:N,[S,C,N,A,D],`O 10.15.6 exige o PIE de quem integra o SEP ou realiza atividades em instalações com média e alta tensão. Carga instalada não é critério.${p[1]?'':' Quem tem autorizados mantém a documentação do 10.15.4 mesmo sem PIE.'}`,['10.15.6'],'pie',pw);}},
    indiv:{n:'Trabalho individual (10.14.2)',f(){const P=[['Troca de isolador numa rede de distribuição de 13,8 kV energizada',1],['Manobra numa subestação de 69 kV da distribuidora (SEP)',1],
        ['Ajuste dentro de um cubículo de 13,8 kV energizado de uma indústria (SEC)',1],['Medição num QGBT de 380 V energizado de uma indústria (SEC)',0],
        ['Medição num painel de 440 V energizado de um hospital (SEC)',0],['Troca de lâmpada num circuito de 220 V desligado e bloqueado de um escritório',0]];const p=pick(P);
      const V='Não pode ser feito individualmente',R='Pode, se o trabalhador for PLH',D='O 10.14.2 não proíbe; a análise de risco decide',
        PT='Pode, se a permissão de trabalho autorizar',E='Pode, desde que use a vestimenta de arco adequada';
      const iw={[V]:'O 10.14.2 só veda o trabalho individual em serviços energizados em MT/AT e em serviços no SEP; aqui não é nenhum dos dois.|10.14.2',
        [D]:'É serviço energizado em MT/AT ou serviço no SEP: o 10.14.2 veda o trabalho individual.|10.14.2',[R]:'A habilitação não muda o 10.14.2; fora dele, quem decide é a análise de risco.|10.14.2,10.7.3',
        [PT]:'A PT não afasta o 10.14.2; fora dele, a decisão vem da análise de risco.|10.14.2,10.7.3',[E]:'EPI não muda o 10.14.2; fora dele, a decisão vem da análise de risco.|10.14.2,10.5.4'};
      return mk(`${p[0]}. Um trabalhador pode fazer o serviço sozinho?`,p[1]?V:D,[V,R,D,PT,E],'O 10.14.2 veda o trabalho individual em serviços em instalações energizadas em média e alta tensão e em todos os serviços executados no SEP. Fora disso, a decisão sai da análise de risco.',['10.14.2','10.7.3'],'indiv',iw);}},
    eventual:{n:'Treinamento eventual',f(){const d=pick([45,60,89,90,91,100,120,180]);const S='Sim, treinamento eventual',N='Não',P='Só se o periódico bienal estiver vencido',Q='Sim, sempre, depois de qualquer afastamento',O='Só se a organização quiser: o eventual é opcional';
      const ew={[S]:`${d} dias não passa de 90: o 10.9.11 a não se aplica.|10.9.11`,[N]:`${d} dias passa de 90: o 10.9.11 a exige o eventual.|10.9.11`,
        [P]:'O eventual vale independentemente de já ter feito o periódico.|10.9.11',[Q]:'O 10.9.11 a fala em afastamento ou inatividade por período superior a 90 dias, não em qualquer afastamento.|10.9.11',
        [O]:'O 10.9.11 diz que a organização deve realizar o eventual nas situações listadas.|10.9.11'};
      return mk(`Eletricista autorizado volta ao trabalho depois de ${d} dias de afastamento. O periódico bienal está em dia. Ele precisa de treinamento eventual?`,d>90?S:N,[S,N,P,Q,O],
        `O 10.9.11 a exige treinamento eventual após afastamento ou inatividade por período superior a 90 dias, independentemente do periódico. ${d} dias ${d>90?'passa':'não passa'} do limite.`,['10.9.11'],'eventual',ew);}},
    pt:{n:'Validade da PT',f(){const P=[['no turno seguinte, com a mesma equipe e sem mudança nas condições',0],['no turno seguinte, com toda a equipe trocada',1],['no turno seguinte, depois que as condições estabelecidas na PT mudaram',1]];const p=pick(P);
      const RV='Pode ser revalidada pelo responsável pela autorização da PT',NV='Precisa de nova permissão de trabalho',CV='Continua válida até o fim do serviço, sem revalidação',
        EV='Pode ser revalidada pelo próprio executante, por escrito',HV='Vale 24 horas a partir da emissão, sem revalidação';
      const tw={[RV]:'Houve mudança nas condições ou em toda a equipe: não cabe revalidação.|10.7.2.2',[NV]:'Sem mudança nas condições nem na equipe, a PT pode ser revalidada.|10.7.2.2',
        [CV]:'A PT é restrita ao turno de trabalho.|10.7.2.2',[EV]:'Quem revalida é o responsável pela autorização da permissão.|10.7.2.2',[HV]:'A PT é restrita ao turno de trabalho, não a 24 horas.|10.7.2.2'};
      return mk(`Um serviço não rotineiro com PT vai continuar ${p[0]}. O que a NR-10 prevê?`,p[1]?NV:RV,[RV,NV,CV,EV,HV],'Pelo 10.7.2.2, a PT vale pela duração da atividade, restrita ao turno, e pode ser revalidada quando não houver mudança nas condições estabelecidas nem em toda a equipe.',['10.7.2.2'],'pt',tw);}}};
  const GKEYS=Object.keys(GEN);

  /* ---------- cartões de fatos (frente → verso), conferidos no PDF ---------- */
  const FC=[
    ['Treinamentos','Carga horária mínima do treinamento inicial Básico','40 h (Quadro I).',['10.9.2']],
    ['Treinamentos','Complementar do SEP','40 h, para quem faz serviços no SEP ou trabalha em sua proximidade.',['10.9.2','10.9.5']],
    ['Treinamentos','Complementar de Média e Alta Tensão - SEC','16 h, para quem faz serviços em MT/AT ou trabalha em sua proximidade no SEC.',['10.9.2','10.9.6']],
    ['Treinamentos','Complementar de Área Classificada','16 h.',['10.9.2','10.9.7']],
    ['Treinamentos','Específico e pontual: carga e para quem','8 h; profissionais estrangeiros ou não residentes no país que entram na zona controlada para serviços pontuais, por no máximo 30 dias corridos, com acompanhamento presencial e permanente de trabalhador autorizado, sob responsabilidade de PLH.',['10.9.2','10.9.8']],
    ['Treinamentos','Específico de compartilhamento de infraestrutura do SEP','40 h. Quem faz este treinamento não faz o Básico nem o Complementar do SEP.',['10.9.2','10.9.4','10.9.5','10.9.9']],
    ['Treinamentos','Treinamento periódico','Bienal, com carga horária mínima de 16 h.',['10.9.10']],
    ['Treinamentos','Treinamento eventual: as quatro situações','a) retorno de afastamento ou inatividade por mais de 90 dias; b) modificações significativas nas instalações ou troca de métodos, processos e organização do trabalho; c) mudança nos procedimentos, condições ou operações que altere os riscos; d) acidente grave ou fatal que indique necessidade de novo treinamento.',['10.9.11']],
    ['Pessoas','Onde vale a capacitação do trabalhador-capacitado?','Só na organização que o capacitou e nas condições estabelecidas pelo PLH autorizado responsável pela capacitação.',['10.8.3.3']],
    ['Pessoas','Módulos mínimos da capacitação','Fundamentos de eletricidade básica 40 h e Qualidade, saúde, meio ambiente 16 h (SEP e SEC); Fundamentos de SEP 40 h (só SEP); Sistema elétrico de consumo 24 h (só SEC); Compartilhamento de infraestruturas do SEP 24 h (só compartilhamento).',['10.8.4']],
    ['Pessoas','Requisitos para a autorização (anuência formal)','a) ser previamente apto em exame médico ocupacional; b) treinamento de segurança com avaliação e aproveitamento satisfatórios, independentemente do cargo e escolaridade.',['10.10.2.1','10.7.5']],
    ['Pessoas','Quem é considerado PLH','Trabalhador previamente qualificado pelo Sistema Oficial de Ensino em curso específico na área elétrica e com registro no competente conselho de classe.',['10.8.2']],
    ['Pessoas','Supervisão de equipe','A organização indica um trabalhador entre os membros da equipe para supervisionar e conduzir os trabalhos.',['10.7.6']],
    ['Faixas e zonas','Faixas de tensão (CA / CC)','EBT ≤ 50 V / 120 V; BT até 1.000 V / 1.500 V; MT até 36.200 V / 3.000 V; AT acima disso.',['g-ebt','g-bt','g-mt','g-at']],
    ['Faixas e zonas','Por que a MT em CC vai até 3.000 V?','Por causa do limite de tensão usado na alimentação do transporte sobre trilhos (observação do glossário).',['g-mt']],
    ['Faixas e zonas','A NR-10 se aplica à extrabaixa tensão?','Não, exceto para o item 10.6.6 e subitens (explosão e incêndio).',['10.2.4']],
    ['Faixas e zonas','Rr e Rc abaixo de 1 kV','0,20 m e 0,70 m.',['AII']],
    ['Faixas e zonas','Rr e Rc de 13,8 kV','0,38 m e 1,38 m (faixa ≥ 10 e < 15 kV).',['AII']],
    ['Faixas e zonas','Rr e Rc de 69 kV','0,90 m e 1,90 m (faixa ≥ 60 e < 70 kV).',['AII']],
    ['Faixas e zonas','Rr e Rc de 138 kV','1,20 m e 3,20 m (faixa ≥ 132 e < 150 kV).',['AII']],
    ['Faixas e zonas','Em trifásico, qual tensão entra no Anexo II?','A tensão composta (eficaz entre fases).',['AII']],
    ['Sequências','Desenergização (10.13.1), as 7 alíneas',SEQ_D.map((s,i)=>'abcdefg'[i]+') '+s).join('; ')+'.',['10.13.1']],
    ['Sequências','Reenergização (10.13.2), as 7 alíneas',SEQ_R.map((s,i)=>'abcdefg'[i]+') '+s).join('; ')+'.',['10.13.2']],
    ['Sequências','Quem pode alterar as sequências do 10.13?','PLH, autorizado, com justificativa técnica previamente formalizada, mantendo o mesmo nível de segurança.',['10.13.4']],
    ['Sequências','Garantia da desenergização','A organização impede que outras equipes ou organizações energizem as instalações durante todo o serviço.',['10.13.3']],
    ['Documentos','Procedimento de trabalho: quando e quem aprova','Atividades rotineiras; elaborado a partir de análise de risco; aprovado por PLH.',['10.7.1','10.7.1.1']],
    ['Documentos','Permissão de trabalho: quando e quem aprova','Atividades não rotineiras; precedida de análise de riscos; aprovada por trabalhador autorizado.',['10.7.2']],
    ['Documentos','Validade da PT','Duração da atividade, restrita ao turno; pode ser revalidada se não mudarem as condições estabelecidas nem toda a equipe.',['10.7.2.2']],
    ['Documentos','Quem é obrigado a ter PIE','Organizações que integram o SEP ou realizam atividades em instalações com média e alta tensão; sob responsabilidade de PLH.',['10.15.6']],
    ['Documentos','Grave e iminente risco: as 4 condições do 10.16.1','a) área classificada sem proteção coletiva; b) não adotar os procedimentos de desenergização (10.13.1) ou reenergização (10.13.2), ou as alternativas do 10.13.4; c) serviço ou trabalho em proximidade por quem não atende ao capítulo 10.10; d) não realizar ensaios e testes de isolação.',['10.16.1']],
    ['EPI e arco','Vestimenta mínima por categoria','Cat. 1 = 4; Cat. 2 = 8; Cat. 3 = 25; Cat. 4 = 40 cal/cm² (ATPV ou EBT).',['AIV-III']],
    ['EPI e arco','Quando o Anexo IV vale?','Só nas condições dele, de forma conjunta: equipamento, máxima corrente de falha, máximo tempo de eliminação e distância mínima de trabalho. Fora disso, estudo de energia incidente.',['10.11.2.1','10.11.2.2','10.11.2.3']],
    ['EPI e arco','Nota do limitador de corrente (Quadro I)','600 V ou menos, com fusível ou disjuntor limitador de até 200 A: a categoria pode cair um número, nunca abaixo da 1.',['AIV-I']],
    ['EPI e arco','Adornos e indumentária','É vedado usar adornos pessoais; a indumentária não pode ter materiais condutíveis (salvo as do 10.11.3).',['10.7.8','10.7.8.1']],
    ['EPI e arco','Periodicidade dos ensaios dielétricos','O menor intervalo entre regulamentação, fabricante e critério do PLH; sem previsão, anual.',['10.14.4.1']],
    ['Energizado','Trabalho individual','Vedado em serviços energizados em média e alta tensão e em serviços no SEP.',['10.14.2']],
    ['Energizado','Religamento automático','Intervenção energizada em MT/AT dentro da zona de risco só com o religamento automático desativado (bloqueado) e sinalizado.',['10.14.3','10.14.3.1']],
    ['Energizado','Comunicação sem contato visual','Equipamentos de comunicação permanente com a equipe e com o centro de operação ou sala de comando.',['10.12.4','10.12.4.1']],
    ['Portaria','Vigência da Portaria 737/2026','Um ano após a publicação (DOU de 01/06/2026). A alínea "e" do 10.6.4 vale um ano depois disso para instalações existentes.',['art5','art3']],
    ['Portaria','Tipificação (Art. 2º)','NR-10: NR Especial. Anexos I a IV: Tipo 1.',['art2']],
    ['Portaria','Revogações (Art. 4º)','Portarias MTE nº 598/2004 e MTPS nº 508/2016.',['art4']],
    ['Portaria','Direito de recusa na NR-10','Aparece como conteúdo do Treinamento Básico (Anexo III, item 9, alínea k).',['AIII']]];
  const FTEMAS=['Todos'].concat([...new Set(FC.map(c=>c[0]))]);

  /* ---------- registro de respostas ---------- */
  function record(q,ok){STATS.rec(q,ok);if(!ok)miss(q.r);if(q.id)SRS.record(q.id,ok);}
  function oneQ(el,q,n,onNext,label){let done=false;
    el.innerHTML=`<div class="q"><div class="qn">${label||''}</div><div class="qq">${q.q}</div>${q.o.map((t,j)=>`<button type="button" class="opt" data-j="${j}"><span class="ol">${L[j]}</span><span>${t}</span></button>`).join('')}<div class="qfb"></div></div>`;
    $$('.opt',el).forEach(b=>b.onclick=()=>{if(done)return;done=true;const j=+b.dataset.j,ok=j===q.a;record(q,ok);
      $$('.opt',el).forEach(x=>{x.disabled=true;const jj=+x.dataset.j;if(jj===q.a)x.classList.add('right');else if(jj===j)x.classList.add('wrong');});
      el.querySelector('.qfb').innerHTML=cardHTML({k:ok?'ok':'err',t:ok?'Correto':'Resposta: '+L[q.a],b:q.x,r:q.r,gir:q.gir,extra:whyHTML(q,j)})+`<div class="row-actions" style="margin-top:8px"><button type="button" class="btn primary" data-a="next">Próxima</button></div>`;
      el.querySelector('[data-a=next]').onclick=()=>onNext(ok);refresh();});}
  function refresh(){if(G.mod&&G.mod.id==='treino')drawDash();}

  /* ---------- A · Simulado ---------- */
  let timer=null;const SIM={n:20,src:'mix',ritmo:4.5};
  function seg(id,opts,cur){return `<div class="seg" id="${id}">${opts.map(([v,l])=>`<button type="button" data-v="${v}" aria-pressed="${String(v)===String(cur)}">${l}</button>`).join('')}</div>`;}
  function buildSim(){const n=SIM.n;let nb=SIM.src==='gen'?0:SIM.src==='bank'?n:Math.round(n*.6);nb=Math.min(nb,QB.list.length);
    const bank=shuffle(QB.list).slice(0,nb).map(shuf);const gen=[];for(let i=0;i<n-nb;i++)gen.push(GEN[pick(GKEYS)].f());return shuffle(bank.concat(gen));}
  function simSetup(el){clearInterval(timer);
    el.innerHTML=`<p class="lead">Prova no estilo de banca: as respostas só aparecem no fim. As questões vêm do banco dos módulos (${QB.list.length} questões) e do gerador, que cria cenários novos a cada vez. Erros vão para a revisão espaçada.</p>
      <div class="h3">Questões</div>${seg('simN',[[10,'10'],[20,'20'],[25,'25'],[40,'40']],SIM.n)}
      <div class="h3">Origem</div>${seg('simS',[['mix','Banco + gerador'],['bank','Só banco'],['gen','Só gerador']],SIM.src)}
      <div class="h3">Tempo</div>${seg('simT',[[0,'Sem tempo'],[3,'3 min/questão'],[4.5,'Ritmo da prova (4,5 min)']],SIM.ritmo)}
      <p class="lead">"Ritmo da prova" = 3 h para 40 questões.</p>
      <div class="row-actions"><button type="button" class="btn primary" data-a="go">Começar o simulado</button></div>`;
    [['#simN','n',Number],['#simS','src',String],['#simT','ritmo',Number]].forEach(([s,k,c])=>$$(s+' button',el).forEach(b=>b.onclick=()=>{SIM[k]=c(b.dataset.v);simSetup(el);}));
    el.querySelector('[data-a=go]').onclick=()=>simRun(el,{qs:buildSim(),ans:{},i:0,t0:Date.now(),lim:SIM.ritmo?SIM.ritmo*60*SIM.n*1000:0});}
  function simRun(el,S){clearInterval(timer);const q=S.qs[S.i];const left=()=>S.lim?Math.max(0,S.lim-(Date.now()-S.t0)):null;
    const mmss=ms=>{const s=Math.round(ms/1000);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');};
    el.innerHTML=`<div class="row-actions"><span class="lead">Questão <b class="num">${S.i+1}</b> de ${S.qs.length} · respondidas <b class="num">${Object.keys(S.ans).length}</b></span>${S.lim?`<span class="tr-clock num" id="simClock">${mmss(left())}</span>`:''}</div>
      <div class="tr-dots">${S.qs.map((_,k)=>`<button type="button" data-k="${k}" class="${k===S.i?'cur':''} ${S.ans[k]!=null?'on':''}" aria-label="Ir para a questão ${k+1}">${k+1}</button>`).join('')}</div>
      <div class="q"><div class="qq">${q.q}</div>${q.o.map((t,j)=>`<button type="button" class="opt ${S.ans[S.i]===j?'sel':''}" data-j="${j}"><span class="ol">${L[j]}</span><span>${t}</span></button>`).join('')}</div>
      <div class="row-actions"><button type="button" class="btn" data-a="prev" ${S.i?'':'disabled'}>Anterior</button><button type="button" class="btn" data-a="next" ${S.i<S.qs.length-1?'':'disabled'}>Próxima</button><button type="button" class="btn primary" data-a="end">Entregar</button></div>`;
    $$('.opt',el).forEach(b=>b.onclick=()=>{S.ans[S.i]=+b.dataset.j;if(S.i<S.qs.length-1)S.i++;simRun(el,S);});
    $$('.tr-dots button',el).forEach(b=>b.onclick=()=>{S.i=+b.dataset.k;simRun(el,S);});
    el.querySelector('[data-a=prev]').onclick=()=>{S.i--;simRun(el,S);};el.querySelector('[data-a=next]').onclick=()=>{S.i++;simRun(el,S);};
    const end=el.querySelector('[data-a=end]');let arm=false;end.onclick=()=>{const falt=S.qs.length-Object.keys(S.ans).length;
      if(falt&&!arm){arm=true;end.textContent=`Entregar com ${falt} em branco?`;return;}simEnd(el,S);};
    if(S.lim)timer=setInterval(()=>{const c=$('#simClock');if(!c||!c.isConnected){clearInterval(timer);return;}const l=left();c.textContent=mmss(l);if(l<=0){clearInterval(timer);simEnd(el,S);}},1000);}
  function simEnd(el,S){clearInterval(timer);let ok=0;const per={};const sec=Math.round((Date.now()-S.t0)/1000);
    S.qs.forEach((q,k)=>{const a=S.ans[k];const good=a===q.a;if(good)ok++;const c=STATS.chap(q);per[c]=per[c]||[0,0];per[c][1]++;if(good)per[c][0]++;record(q,good);});
    const H=Store.data.sims=Store.data.sims||[];H.push({d:Date.now(),n:S.qs.length,ok,s:sec});if(H.length>30)H.shift();Store.save();
    const wrong=S.qs.map((q,k)=>[q,k]).filter(([q,k])=>S.ans[k]!==q.a);
    el.innerHTML=`<div class="score">${ok} de ${S.qs.length} · ${pct(ok,S.qs.length)}%</div><p class="lead">Tempo: ${Math.floor(sec/60)} min ${sec%60} s. Na prova, cada questão específica vale 2,8 pontos.</p>
      <div class="cl">${Object.entries(per).sort((a,b)=>a[1][0]/a[1][1]-b[1][0]/b[1][1]).map(([c,[a,t]])=>`<div class="cl-row ${a===t?'good':a/t<.6?'bad':''}"><div class="t">${chName(c)}</div><div class="num">${a}/${t}</div></div>`).join('')}</div>
      <div class="row-actions"><button type="button" class="btn primary" data-a="new">Novo simulado</button>${wrong.length?`<button type="button" class="btn" data-a="redo">Refazer as ${wrong.length} erradas</button>`:''}</div>
      ${wrong.length?`<div class="h3">Correção</div>`:''}<div class="tr-rev">${wrong.map(([q,k])=>`<div class="tr-item"><div class="qq">${k+1}. ${q.q}</div><div class="lead">Sua resposta: ${S.ans[k]!=null?L[S.ans[k]]+') '+q.o[S.ans[k]]:'em branco'}</div>${cardHTML({k:'ok',t:'Correta: '+L[q.a]+') '+q.o[q.a],b:q.x,r:q.r,gir:q.gir,extra:whyHTML(q,S.ans[k])})}</div>`).join('')}</div>`;
    el.querySelector('[data-a=new]').onclick=()=>simSetup(el);const rd=el.querySelector('[data-a=redo]');
    if(rd)rd.onclick=()=>simRun(el,{qs:wrong.map(([q])=>shuf(q)),ans:{},i:0,t0:Date.now(),lim:0});refresh();}

  /* ---------- B · Revisão espaçada ---------- */
  function revUI(el){const due=SRS.due();const ids=due.slice(0,20);
    if(!ids.length){const M=Store.data.miss||{};const top=Object.keys(M).sort((a,b)=>M[b]-M[a]).slice(0,8);
      const extra=QB.list.filter(q=>(q.r||[]).some(r=>top.includes(r))).slice(0,10);const B=SRS.boxes();
      el.innerHTML=`<p class="lead">Nada para revisar agora. Cada questão errada entra na caixa 1 e volta no mesmo dia; cada acerto sobe uma caixa e a questão volta em 1, 3, 7 ou 14 dias.</p>
        <div class="tr-boxes">${[1,2,3,4,5].map(b=>`<div><b class="num">${B[b]}</b><span>caixa ${b}</span></div>`).join('')}</div>
        ${extra.length?`<div class="row-actions"><button type="button" class="btn primary" data-a="weak">Treinar ${extra.length} questões dos meus pontos fracos</button></div>`:''}`;
      const w=el.querySelector('[data-a=weak]');if(w)w.onclick=()=>run(extra.map(q=>q.id),0,0);return;}
    run(ids,0,0);
    function run(list,i,ok){if(i>=list.length){el.innerHTML=`<div class="score">${ok} de ${list.length}</div><p class="lead">Revisão do dia feita. As erradas voltam ainda hoje.</p><div class="row-actions"><button type="button" class="btn" data-a="again">Ver de novo</button></div>`;
        el.querySelector('[data-a=again]').onclick=()=>revUI(el);refresh();return;}
      const id=list[i];const lab=`Revisão ${i+1} de ${list.length} · caixa ${(SRS.data()[id]||{}).b||1}`;
      if(id.startsWith('fc:')){const c=FC[+id.slice(3)];if(!c){run(list,i+1,ok);return;}card(el,c,+id.slice(3),lab,g=>run(list,i+1,ok+(g?1:0)));return;}
      const q=QB.byId(id);if(!q){run(list,i+1,ok);return;}oneQ(el,shuf(q),0,g=>run(list,i+1,ok+(g?1:0)),lab);}}

  /* ---------- C · Gerador ---------- */
  const GSEL=new Set(GKEYS);let streak=0,gcount=0,gok=0;
  function genUI(el){const keys=GKEYS.filter(k=>GSEL.has(k));const k=pick(keys.length?keys:GKEYS);const q=GEN[k].f();
    el.innerHTML=`<p class="lead">Cada questão é um cenário sorteado agora, calculado a partir das tabelas da norma. Escolha os temas:</p>
      <div class="tr-chips">${GKEYS.map(g=>`<button type="button" data-g="${g}" aria-pressed="${GSEL.has(g)}">${GEN[g].n}</button>`).join('')}</div>
      <div class="row-actions"><span class="lead">Nesta sessão: <b class="num">${gok}/${gcount}</b> · sequência de acertos: <b class="num">${streak}</b></span></div><div id="genQ"></div>`;
    $$('[data-g]',el).forEach(b=>b.onclick=()=>{const g=b.dataset.g;if(GSEL.has(g)){if(GSEL.size>1)GSEL.delete(g);}else GSEL.add(g);genUI(el);});
    oneQ($('#genQ',el),q,0,ok=>{gcount++;if(ok){gok++;streak++;}else streak=0;genUI(el);},GEN[k].n);}

  /* ---------- D · Cartões ---------- */
  let ftema='Todos',fidx=0,forder=null;
  function card(el,c,i,label,next){el.innerHTML=`<div class="qn lead">${label}</div><div class="tr-card" tabindex="0"><span class="eyebrow">${c[0]}</span><div class="qq">${c[1]}</div><div class="tr-back" hidden><p>${c[2]}</p><div class="cr">${Rs(c[3])}</div></div></div>
      <div class="row-actions"><button type="button" class="btn primary" data-a="show">Mostrar resposta</button></div>`;
    const show=()=>{el.querySelector('.tr-back').hidden=false;el.querySelector('.row-actions').innerHTML=`<button type="button" class="btn" data-a="no">Não lembrei</button><button type="button" class="btn primary" data-a="yes">Lembrei</button>`;
      el.querySelector('[data-a=no]').onclick=()=>{SRS.record('fc:'+i,false,1);STATS.rec({r:c[3]},false);next(false);refresh();};
      el.querySelector('[data-a=yes]').onclick=()=>{SRS.record('fc:'+i,true,1);STATS.rec({r:c[3]},true);next(true);refresh();};};
    el.querySelector('[data-a=show]').onclick=show;el.querySelector('.tr-card').onkeydown=e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();show();}};}
  function cardsUI(el){const list=FC.map((c,i)=>i).filter(i=>ftema==='Todos'||FC[i][0]===ftema);if(!forder||forder.t!==ftema)forder={t:ftema,o:shuffle(list)};fidx=fidx%forder.o.length;
    const i=forder.o[fidx];el.innerHTML=`<div class="tr-chips">${FTEMAS.map(t=>`<button type="button" data-t="${t}" aria-pressed="${t===ftema}">${t}</button>`).join('')}</div><div id="fcBox"></div>`;
    $$('[data-t]',el).forEach(b=>b.onclick=()=>{ftema=b.dataset.t;fidx=0;forder=null;cardsUI(el);});
    card($('#fcBox',el),FC[i],i,`Cartão ${fidx+1} de ${forder.o.length}`,()=>{fidx++;cardsUI(el);});}

  /* ---------- painel (lado esquerdo) ---------- */
  function drawDash(){const v=$('#mapView');if(!v)return;const S=Store.data.st||{};let a=0,t=0;Object.values(S).forEach(([x,y])=>{a+=x;t+=y;});
    const dataProva=Store.data.prova||'2026-12-13';const dias=Math.ceil((new Date(dataProva+'T12:00:00')-new Date())/864e5);
    const sims=(Store.data.sims||[]).slice(-6).reverse();const B=SRS.boxes();const due=SRS.due().length;const M=Store.data.miss||{};
    const weak=Object.keys(M).sort((x,y)=>M[y]-M[x]).slice(0,8);
    const chs=Object.entries(S).filter(([,v])=>v[1]>=3).sort((x,y)=>x[1][0]/x[1][1]-y[1][0]/y[1][1]);
    v.innerHTML=`<div class="tr-dash">
      <div class="tr-hero"><div><span class="eyebrow">Contagem regressiva</span><div class="tr-big num">${dias>0?dias:0}</div><span class="lead">${dias>0?'dias até a prova':'dia da prova'}</span></div>
        <label class="lead">Data da prova <input type="date" id="trProva" value="${dataProva}"></label></div>
      <div class="out">
        <div class="tile"><span class="tk">Respondidas</span><span class="tv num">${t}</span><span class="ts">acerto geral ${pct(a,t)}%</span></div>
        <div class="tile ${due?'alert':''}"><span class="tk">Revisões para hoje</span><span class="tv num">${due}</span><span class="ts">aba B · Revisão</span></div>
        <div class="tile"><span class="tk">Dias de estudo</span><span class="tv num">${Object.keys(Store.data.dias||{}).length}</span><span class="ts">dias com pelo menos uma resposta</span></div>
        <div class="tile"><span class="tk">Simulados</span><span class="tv num">${(Store.data.sims||[]).length}</span><span class="ts">${sims[0]?'último: '+pct(sims[0].ok,sims[0].n)+'%':'nenhum ainda'}</span></div>
      </div>
      <div class="h3">Acerto por capítulo</div>
      ${chs.length?`<div class="tr-bars">${chs.map(([c,[x,y]])=>`<div class="tr-bar"><span>${chName(c)}</span><i><b style="width:${pct(x,y)}%" class="${x/y<.6?'bad':x/y<.8?'mid':'ok'}"></b></i><span class="num">${pct(x,y)}% · ${y}</span></div>`).join('')}</div>`:'<p class="lead">Responda pelo menos 3 questões de um capítulo para ele aparecer aqui.</p>'}
      <div class="h3">Caixas da revisão</div><div class="tr-boxes">${[1,2,3,4,5].map(b=>`<div><b class="num">${B[b]}</b><span>caixa ${b}</span></div>`).join('')}</div>
      ${weak.length?`<div class="h3">Itens com mais erros</div><div class="cr">${weak.map(r=>R(r)+`<span class="lead num">×${M[r]}</span>`).join(' ')}</div>`:''}
      ${sims.length?`<div class="h3">Últimos simulados</div><div class="cl">${sims.map(s=>`<div class="cl-row"><div class="t">${new Date(s.d).toLocaleDateString('pt-BR')} · ${s.n} questões · ${Math.round(s.s/60)} min</div><div class="num">${pct(s.ok,s.n)}%</div></div>`).join('')}</div>`:''}
      <p class="lead">Base: NR-10, Portaria MTE 737/2026. O progresso fica salvo só neste navegador.</p></div>`;
    const d=$('#trProva');if(d)d.onchange=()=>{if(d.value){Store.data.prova=d.value;Store.save();drawDash();}};}

  const mod={id:'treino',phase:'T',name:'Treino para prova',short:'Treino',scene:'Painel de estudo',view:'map',vpE:'Treino',
    primer:{logic:'O treino junta o que os módulos ensinam e cobra no formato de prova. O simulado mistura o banco de questões dos módulos com cenários sorteados pelo gerador (faixas, zonas, treinamentos, categoria de arco, sequências, PIE, trabalho individual). Cada erro conta no capítulo da norma e entra na revisão espaçada; os cartões fixam os números que as bancas cobram.',
      links:[['enq','Faixas, zonas e treinamentos do gerador saem do enquadramento.',['g-mt','AII','10.9.2']],['individual','A categoria de arco do gerador usa o Anexo IV.',['AIV-I']],['desenergizado','As sequências do gerador são as do 10.13.',['10.13.1','10.13.2']],['mapa','Os itens com mais erros também acendem o mapa.',['10.1.1']]]},
    brief:'Simulado no estilo de banca, revisão espaçada dos erros, gerador de questões que sorteia cenários novos e cartões dos fatos mais cobrados.',
    base:['10.9.2','10.13.1','10.13.2','AII','AIV-I'],cam:{theta:.4,phi:1.1,r:10,t:[0,1,0],rMax:20},
    reset(){},build(){},drawMap:drawDash,leave(){clearInterval(timer);},
    tasks:[{id:'a',title:'Simulado',free:1,render(el){simSetup(el);}},{id:'b',title:'Revisão',free:1,render(el){revUI(el);}},
      {id:'c',title:'Gerador',free:1,render(el){genUI(el);}},{id:'d',title:'Cartões',free:1,render(el){cardsUI(el);}}]};
  window.__treino={GEN,FC,SEQ_D,SEQ_R};   // usado pelos testes automáticos
  MODS.push(mod);})();
