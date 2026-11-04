/* ===== Camada 3 · Pessoas ===== */
MODS.push((()=>{
  const W=[
    {id:'ana',n:'Ana',c:'Engenheira eletricista',h:'#f4f4f2',s:'#3a5f7f',l:['Graduação em Engenharia Elétrica reconhecida pelo MEC','Registro ativo no CREA','ASO: apta','Básico 40 h e Complementar SEP 40 h há 10 meses'],
      task:'Manobra em subestação de 13,8 kV da distribuidora',q:'Como ela se enquadra?',o:['PLH; pode ser autorizada para a tarefa','Qualificada, mas não habilitada','Precisa ser capacitada antes'],a:0,
      x:'Curso reconhecido mais registro no conselho é PLH. A autorização exige ASO apto e treinamento com aproveitamento, independentemente do cargo e da escolaridade. No SEP: Básico e Complementar SEP.',r:['10.8.2','10.10.2.1','10.9.5']},
    {id:'bruno',n:'Bruno',c:'Técnico em eletrotécnica',h:'#2e6db4',s:'#4e6a3e',l:['Curso técnico reconhecido pelo MEC','Sem registro no conselho de classe','ASO: apto','Básico 40 h há 8 meses'],
      task:'Manutenção preventiva em QGBT 380 V de uma indústria',q:'Como ele se enquadra?',o:['PLH','Qualificado; pode ser autorizado','Trabalhador-capacitado'],a:1,
      x:'Concluiu curso específico reconhecido, então é qualificado. Sem registro no conselho, não é PLH. Qualificado com ASO e treinamento pode ser autorizado.',r:['10.8.1','10.8.2','10.10.2']},
    {id:'carla',n:'Carla',c:'Auxiliar de manutenção',h:'#2f8f5a',s:'#7a5a3a',l:['Ensino médio, sem curso na área elétrica','Capacitação de 80 h na própria empresa: Fundamentos 40 h, QSMS 16 h e Sistema elétrico de consumo 24 h, com prática supervisionada','Plano de aprendizagem sob responsabilidade de PLH','Trabalha sob responsabilidade de PLH autorizado','ASO: apta · Básico 40 h'],
      task:'Troca de disjuntores em quadros de BT da própria fábrica',q:'Ela pode ser autorizada?',o:['Não, sem curso técnico','Sim, como trabalhadora-capacitada, nesta organização','Sim, como qualificada'],a:1,
      x:'Cumpre as duas condições simultâneas do 10.8.3 e os módulos mínimos do 10.8.4 para o SEC (40 + 16 + 24 h). A capacitação só vale na organização que capacitou.',r:['10.8.3','10.8.4','10.8.3.3']},
    {id:'diego',n:'Diego',c:'Eletricista capacitado, recém-contratado',h:'#d4a017',s:'#5a4a7a',l:['Capacitado pela empresa anterior há 1 ano','Básico 40 h há 1 ano','ASO: apto'],
      task:'A mesma função que exercia na empresa anterior',q:'A capacitação anterior vale aqui?',o:['Vale integralmente','Não; um PLH pode convalidar Fundamentos e QSMS por avaliação, dentro de 2 anos','Não; e nenhum módulo pode ser aproveitado'],a:1,
      x:'A capacitação vale só para a organização que capacitou. Fundamentos de eletricidade e QSMS podem ser aproveitados por PLH, com aprovação em avaliação, até 2 anos da realização. O resto, inclusive a prática supervisionada na realidade da nova empresa, é refeito.',r:['10.8.3.3','10.8.4.2','10.8.3.2']},
    {id:'elisa',n:'Elisa',c:'Técnica habilitada (CFT)',h:'#f4f4f2',s:'#7f3a3a',l:['Curso técnico e registro no CFT','Último treinamento NR-10 há 2 anos e 5 meses','ASO: apta'],
      task:'Seguir na manutenção em BT',q:'O que falta?',o:['Nada, segue autorizada','O periódico bienal, com no mínimo 16 h','Refazer o Básico de 40 h'],a:1,
      x:'O periódico é bienal com 16 h mínimas. Sem ele, deixa de cumprir o requisito de treinamento da autorização.',r:['10.9.10','10.10.2.1']},
    {id:'fabio',n:'Fábio',c:'Eletricista qualificado',h:'#2e6db4',s:'#3a5f7f',l:['Volta hoje de afastamento de 120 dias','Periódico em dia antes do afastamento','ASO de retorno: apto'],
      task:'Retomar as manobras na subestação da fábrica',q:'Ele pode retomar direto?',o:['Sim, o periódico está em dia','Não; faz o treinamento eventual antes','Só precisa do ASO'],a:1,
      x:'Afastamento acima de 90 dias exige treinamento eventual, mesmo com o periódico em dia. A carga e o conteúdo atendem à situação que o motivou.',r:['10.9.11','10.9.11.1']},
    {id:'gustavo',n:'Gustavo',c:'Técnico estrangeiro do fabricante',h:'#c0392b',s:'#2b2b2b',l:['Não reside no Brasil','Vem comissionar um painel por 12 dias','Experiência comprovada no equipamento'],
      task:'Comissionamento dentro da zona controlada',q:'Qual o requisito de treinamento?',o:['Básico 40 h','Específico e pontual de 8 h, com acompanhamento presencial e permanente de trabalhador autorizado, sob responsabilidade de PLH','Dispensado, por ser do fabricante'],a:1,
      x:'Vale para estrangeiros ou não residentes em serviço pontual de até 30 dias corridos. O comissionamento em si fica sob responsabilidade de PLH e é feito por profissional autorizado.',r:['10.9.8','10.12.9']},
    {id:'helena',n:'Helena',c:'Instaladora de fibra óptica',h:'#e67e22',s:'#2d4f6b',l:['Funcionária de provedor de internet','Trabalha em postes da distribuidora','ASO: apta'],
      task:'Lançar cabo óptico na faixa de telecom do poste',q:'Qual treinamento inicial?',o:['Básico 40 h e Complementar SEP 40 h','Específico de compartilhamento de infraestrutura do SEP, 40 h','Nenhum: não toca na rede elétrica'],a:1,
      x:'Ela trabalha em proximidade do SEP com compartilhamento de infraestrutura. Quem faz esse treinamento fica dispensado do Básico e do Complementar SEP.',r:['10.9.9','10.9.4','g-comp']},
    {id:'igor',n:'Igor',c:'Pedreiro da obra',h:'#f1c40f',s:'#8a8a8a',l:['Atividade não elétrica','Vai rebocar a parede ao lado da subestação, sem entrar na zona controlada'],
      task:'Reboco na zona livre, vizinha da zona controlada',q:'O que a organização precisa fazer?',o:['Dar o Básico de 40 h','Análise de risco e instrução formal sobre os riscos','Nada: ele não é eletricista'],a:1,
      x:'Para atividade não elétrica na zona livre e na vizinhança da ZC: análise de risco e instrução formal. EPI de arco pode ser dispensado se a análise de risco indicar que não há exposição.',r:['10.14.1.2','10.11.2.4']}];
  let ans={},cur=null;
  const INFO={quadro:{t:'Quadro de autorizações',b:'A organização mantém um sistema que permite saber, a qualquer momento, o que cada trabalhador está autorizado a fazer, e registra a autorização nos documentos funcionais.',r:['10.10.4','10.10.3']},
    portaria:{t:'Portaria da subestação',b:'Só entra na zona controlada quem é autorizado. A autorização exige anuência formal da organização, ASO apto e treinamento com aproveitamento satisfatório.',r:['10.10.2','10.10.2.1','10.7.5']}};
  function build(){
    const fence=grp(0,0,-4.5);for(let i=-6;i<=6;i++)cyl(.04,.04,2,'#8e979e',i,1,0,fence);box(12.2,.04,.04,'#8e979e',0,1.9,0,fence);box(12.2,.04,.04,'#8e979e',0,.3,0,fence);
    const tr=grp(-2.5,0,-6.5);boxB(1.6,1.6,1.2,'#6f7f8c',0,0,0,tr);[-.45,0,.45].forEach(x=>cyl(.07,.07,.6,'#c9d0d6',x,1.9,0,tr));
    const tr2=grp(2.5,0,-6.5);boxB(1.6,1.6,1.2,'#6f7f8c',0,0,0,tr2);[-.45,0,.45].forEach(x=>cyl(.07,.07,.6,'#c9d0d6',x,1.9,0,tr2));
    plate(['PERIGO','ACESSO RESTRITO A','PESSOAS AUTORIZADAS'],1.6,.75,{bg:'#f2c200',fg:'#111',border:'#111'},0,1.25,-4.44,null);
    const gate=grp(0,0,-4.4);boxB(.16,1.3,.16,'#4b5965',-.9,0,0,gate);box(1.8,.08,.08,'#E3A11B',0,1.15,0,gate);hot(gate,'portaria',INFO.portaria.t,{dy:.9});
    const q=grp(-7.2,0,-1.2);boxB(.1,2.2,.1,'#4b5965',-.9,0,0,q);boxB(.1,2.2,.1,'#4b5965',.9,0,0,q);box(2,1.2,.06,'#f7f8f9',0,1.6,0,q);
    for(let r=0;r<3;r++)for(let c=0;c<6;c++)box(.22,.18,.02,['#2B7649','#2B7649','#E3A11B','#B83A30'][(r*6+c)%4],-.65+c*.26,1.95-r*.3,.04,q);
    q.rotation.y=.6;hot(q,'quadro',INFO.quadro.t);
    const R0=6.2;W.forEach((w,i)=>{const a=-1.05+i*(2.1/(W.length-1));const x=Math.sin(a)*R0,z=Math.cos(a)*R0-2.2;
      cyl(.45,.45,.06,ans[w.id]!=null?(ans[w.id]?'#2B7649':'#B83A30'):'#9aa4ad',x,.03,z,null);
      const p=person({helmet:w.h,shirt:w.s,x,z});p.g.rotation.y=a+Math.PI;
      hot(p.g,w.id,`${w.n} · ${w.c}`,{dy:.25});label([w.n],x,2.35,z,null,{s:.3});});
  }
  function profile(el,api){const w=W.find(x=>x.id===cur);const pr=$('#m3p',el);if(!w){pr.innerHTML='<p class="lead">Escolha um trabalhador na cena ou na lista.</p>';return;}
    const done=ans[w.id]!=null;
    pr.innerHTML=`<div class="profile"><span class="eyebrow">${w.c}</span><h4>${w.n}</h4><ul>${w.l.map(t=>`<li>${t}</li>`).join('')}</ul><div class="task"><b>Tarefa:</b> ${w.task}</div></div>
      <div class="q"><div class="qq">${w.q}</div>${w.o.map((t,j)=>`<button type="button" class="opt ${done&&j===w.a?'right':''}" data-j="${j}" ${done?'disabled':''}><span class="ol">${'ABC'[j]}</span><span>${t}</span></button>`).join('')}<div class="qfb">${done?cardHTML({k:ans[w.id]?'ok':'err',t:ans[w.id]?'Correto':'Você errou esta',b:w.x,r:w.r}):''}</div></div>`;
    $$('.opt',pr).forEach(b=>b.onclick=()=>{if(ans[w.id]!=null)return;const j=+b.dataset.j;ans[w.id]=j===w.a;
      $$('.opt',pr).forEach(x=>{x.disabled=true;const jj=+x.dataset.j;if(jj===w.a)x.classList.add('right');else if(jj===j)x.classList.add('wrong');});
      pr.querySelector('.qfb').innerHTML=cardHTML({k:ans[w.id]?'ok':'err',t:ans[w.id]?'Correto':'Não é essa',b:w.x,r:w.r});
      reloadScene();drawWho(el);if(Object.keys(ans).length===W.length)api.done();});}
  function drawWho(el){const n=Object.keys(ans).length,ok=Object.values(ans).filter(Boolean).length;
    $('#m3w',el).innerHTML=W.map(w=>`<button type="button" class="${ans[w.id]!=null?'done':''} ${cur===w.id?'sel':''}" data-w="${w.id}"><i style="background:${w.h};border:1px solid var(--line)"></i>${w.n}</button>`).join('');
    $('#m3n',el).innerHTML=`<span class="num">${n}/${W.length} · ${ok} certas</span><div class="bar"><i style="width:${n/W.length*100}%"></i></div>`;
    $$('[data-w]',el).forEach(b=>b.onclick=()=>{cur=b.dataset.w;drawWho(el);profile(el,{done:()=>markDone('pessoas','a')});});}
  const VF=[
    {t:'A autorização precisa constar nos documentos funcionais do trabalhador.',a:'V',r:['10.10.3']},
    {t:'Um engenheiro eletricista pode ser autorizado só pelo diploma, sem treinamento NR-10.',a:'F',x:'O treinamento vale independentemente do cargo e da escolaridade.',r:['10.10.2.1']},
    {t:'A organização mantém um sistema que mostra, a qualquer momento, a abrangência da autorização de cada trabalhador.',a:'V',r:['10.10.4']},
    {t:'O treinamento pode ser feito fora do expediente, pago pelo trabalhador.',a:'F',x:'É a cargo e custo do empregador, durante o expediente.',r:['10.9.1']},
    {t:'A parte prática do treinamento pode ser feita a distância.',a:'F',x:'O conteúdo prático é presencial.',r:['10.9.13']},
    {t:'Quem supervisiona serviços em eletricidade também precisa ser autorizado.',a:'V',r:['10.10.2']},
    {t:'Em serviço feito em equipe, a organização indica um dos membros para supervisionar e conduzir o trabalho.',a:'V',r:['10.7.6']},
    {t:'Os documentos técnicos do PIE podem ser elaborados por trabalhador-capacitado.',a:'F',x:'São elaborados por PLH.',r:['10.15.7']},
    {t:'Depois de um acidente grave que indique necessidade, a organização faz treinamento eventual, mesmo com o periódico em dia.',a:'V',r:['10.9.11']},
    {t:'A documentação da NR-10 pode ser só digital, em português.',a:'V',r:['10.15.1']},
    {t:'Os instrutores precisam ter proficiência comprovada, sob responsabilidade de PLH.',a:'V',r:['10.9.12']}];
  const mod={id:'pessoas',phase:'II',name:'Pessoas e autorização',short:'Pessoas',scene:'Portaria da subestação',primer:{logic:"Quatro condições que não se confundem. Qualificado tem curso reconhecido. PLH tem curso e registro no conselho. Capacitado aprendeu por plano de aprendizagem sob um PLH, e isso só vale na organização que o capacitou. Autorizado é quem a organização liberou formalmente, com ASO apto e treinamento aprovado. Só o autorizado intervém.",links:[["enq", "O tipo de organização e a faixa de tensão escolhem os treinamentos.", ["10.9.5", "10.9.6"]], ["zonas", "Trabalho em proximidade também exige autorização.", ["10.10.2"]], ["organizacao", "O 10.7.12 trata tudo isso como medida administrativa.", ["10.7.12"]], ["documentacao", "Não autorizado executando serviço é GIR; a comprovação vai para os documentos.", ["10.16.1", "10.15.4"]]]},
    brief:'Qualificado, habilitado, capacitado e autorizado são quatro condições diferentes. Aqui você enquadra cada pessoa da equipe e decide o que falta para ela trabalhar.',
    base:['10.8.1','10.8.2','10.8.3','10.10.2','10.10.2.1','10.9.2'],
    cam:{theta:0,phi:1.12,r:15,t:[0,1.1,-1],rMax:30},
    reset(){},build,info:INFO,
    onPick(id){if(W.find(w=>w.id===id)){cur=id;gotoTask('a');const el=$('#tb');drawWho(el);profile(el,{done:()=>markDone('pessoas','a')});
      const w=W.find(x=>x.id===id);toast(`${w.n} · ${w.c}`);return true;}return false;},
    tasks:[
      {id:'a',title:'Equipe',render(el,api){el.innerHTML=`<p class="lead">Clique em cada pessoa no semicírculo. Leia a ficha, a tarefa que ela vai fazer, e decida. O disco sob os pés fica verde ou vermelho conforme a sua resposta.</p>
        <div class="prog" id="m3n"></div><div class="who" id="m3w"></div><div id="m3p"></div>`;drawWho(el);profile(el,api);}},
      {id:'b',title:'Autorização',render(el,api){classify(el,api,{id:'vf',intro:'Verdadeiro ou falso, pelo texto da NR-10 (Portaria 737/2026).',options:[{v:'V',l:'Verdadeiro'},{v:'F',l:'Falso'}],items:VF});}}
    ]};
  QB.cls('pessoas',VF,[{v:'V',l:'Verdadeiro'},{v:'F',l:'Falso'}],'Verdadeiro ou falso, pela NR-10?');
  return mod;})());
