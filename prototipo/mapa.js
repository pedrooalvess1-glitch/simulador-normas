/* ===== Mapa da norma: remissões entre capítulos, trilhas e pontos fracos ===== */
function chapOf(id){if(/^10\.\d+/.test(id))return id.split('.').slice(0,2).join('.');if(id.startsWith('g-'))return 'AI';if(id==='AII')return 'AII';if(id==='AIII')return 'AIII';if(id.startsWith('AIV'))return 'AIV';if(id.startsWith('NR-'))return id;return id;}
(()=>{
  const CH={'10.1':['Objetivo','I',105,110],'10.2':['Campo de aplicação','I',105,195],'AI':['Glossário','I',105,280],'AII':['Zonas','I',105,365],
    '10.3':['Gerenciamento de risco','II',325,100],'10.4':['Segurança em projetos','II',325,170],'10.5':['Eliminação do perigo','II',325,240],'10.6':['Proteção coletiva','II',325,310],'10.11':['Proteção individual','II',325,430],'AIV':['EPI de arco','II',325,500],
    '10.7':['Medidas administrativas','II',500,135],'10.8':['Qualificação e capacitação','II',500,205],'10.9':['Treinamentos','II',500,275],'10.10':['Autorização','II',500,345],'AIII':['Conteúdo dos treinamentos','II',500,415],
    '10.12':['Ciclo de vida','III',705,160],'10.13':['Desenergizado','III',705,255],'10.14':['Energizado e proximidade','III',705,350],
    '10.15':['Documentação e PIE','IV',895,210],'10.16':['Grave e iminente risco','IV',895,320],
    'NR-1':['GRO','X',88,600],'NR-3':['Embargo','X',228,600],'NR-6':['EPI','X',368,600],'NR-7':['PCMSO','X',508,600],'NR-17':['Ergonomia','X',648,600],'NR-23':['Incêndio','X',788,600],'NR-26':['Sinalização','X',925,600]};
  const MODOF={'10.1':'enq','10.2':'enq','AI':'enq','AII':'zonas','10.3':'projeto','10.4':'projeto','10.5':'coletiva','10.6':'coletiva','10.7':'organizacao','10.8':'pessoas','10.9':'pessoas','10.10':'pessoas','AIII':'pessoas','10.11':'individual','AIV':'individual','10.12':'desenergizado','10.13':'desenergizado','10.14':'energizado','10.15':'documentacao','10.16':'documentacao'};
  const disp=c=>c.startsWith('A')?'Anexo '+{AI:'I',AII:'II',AIII:'III',AIV:'IV'}[c]:c;
  const E=[
    ['10.1.1','NR-1','x','O objetivo segue o GRO da NR-1.'],['10.1.2','g-sep','x','Os termos vêm do glossário.'],['10.2.2','AII','x','A zona controlada define o trabalho em proximidade.'],
    ['10.2.3','AII','x','O arco alcança mesmo fora da ZC.'],['10.2.4','10.6.6','x','A EBT só fica sujeita às medidas contra explosão e incêndio.'],['10.3.1','NR-1','x','A avaliação de riscos complementa a da NR-1.'],
    ['10.4.8.1','10.2.1','x','Projeto feito no exterior segue as normas do campo de aplicação.'],['10.4.10','NR-17','x','Iluminação e posição de trabalho.'],
    ['10.5.1','10.13.1','x','Eliminar o perigo é desenergizar.'],['10.5.2','10.14.1','x','Desligada com possibilidade de energização segue o regime de energizada.'],['10.5.3','NR-1','x','A ordem de prioridade é a da NR-1.'],
    ['10.5.4','10.6.1','x','Segundo nível da hierarquia: proteção coletiva.'],['10.5.4','10.7.1','x','Terceiro nível: medidas administrativas.'],['10.5.4','10.11.1','x','Quarto nível: proteção individual.'],
    ['10.6.4.1','10.4.9','x','A exceção ao DDR é registrada no memorial (alínea f).'],['10.6.6','NR-23','x','Explosão e incêndio.'],['10.6.6','10.2.1','x','Áreas classificadas, surtos e raios seguem as normas técnicas do 10.2.1.'],
    ['10.6.6.1.2','10.10.2','x','Serviço em área classificada só por autorizado.'],['10.7.5','NR-7','x','Exame de saúde.'],['10.7.7','NR-26','x','Sinalização de segurança.'],
    ['10.7.8.1','10.11.3','x','Indumentária condutiva só conforme as vestimentas do 10.11.3.'],['10.7.12','10.8.1','x','Qualificação e capacitação como medida administrativa.'],['10.7.12','10.10.2','x','Autorização como medida administrativa.'],
    ['10.9.1','NR-1','x','Treinamento a cargo do empregador, conforme NR-1.'],['10.9.3','AIII','x','O conteúdo mínimo está no Anexo III.'],['10.9.4','10.10.2','x','O Básico é dado aos autorizados.'],
    ['10.10.2.1','10.7.5','x','ASO apto é requisito da autorização.'],['10.10.2.1','10.9.2','x','Treinamento aprovado é requisito da autorização.'],
    ['10.11.1','10.5.4','x','O EPI obedece à hierarquia.'],['10.11.1','NR-6','x','EPI com Certificado de Aprovação.'],['10.11.2','AIV-I','x','A categoria vem do Anexo IV.'],['10.11.2.3','10.6.5','x','Fora do Anexo IV, estudo de energia incidente do 10.6.5 a.'],
    ['10.12.3','10.10.2','x','As etapas do ciclo de vida são executadas por autorizados.'],['10.12.9','10.14.1','x','Ensaios e comissionamento seguem o 10.14.'],
    ['10.13.1','AII','x','A etapa (e) protege o que fica energizado na ZC.'],['10.14.1','10.10.2','x','Só autorizados.'],['10.14.1.2','10.7.3','x','Atividade não elétrica pede a análise de risco do 10.7.3.'],
    ['10.14.3','AII','x','O bloqueio do religamento vale dentro da ZR.'],['10.15.1','NR-1','x','Documentação digital conforme NR-1.'],['10.15.3','10.4.1','x','Toda organização tem projeto conforme o 10.4.'],
    ['10.15.4','10.10.2','x','Quem tem autorizados guarda a documentação.'],['10.15.5','10.6.6.1.2','x','Procedimentos e PT de área classificada.'],
    ['10.16.1','NR-3','x','Embargo sem a metodologia da NR-3.'],['10.16.1','10.13.1','x','Falha em desenergizar ou reenergizar.'],['10.16.1','10.10.2','x','Serviço por quem não atende ao 10.10.'],['10.16.1','10.6.6.1','x','Área classificada sem proteção coletiva.'],
    ['10.16.1','10.14.4','t','Ensaios de isolação não realizados.'],
    ['10.4.1','10.13.1','t','O dispositivo com bloqueio previsto em projeto recebe o cadeado da etapa (c).'],['10.4.6','10.13.1','t','O aterramento temporário previsto é instalado na etapa (d).'],
    ['10.4.12','10.6.5','t','O estudo do projeto define a distância segura.'],['10.4.12','10.11.2.3','t','O mesmo estudo define o EPI fora do Anexo IV.'],['10.6.4','10.4.9','t','O DDR é adotado conforme definido em projeto.'],
    ['10.9.8','AII','t','O treinamento pontual é para quem adentra a ZC.'],['10.7.11','10.15.2','t','O relatório de inspeção vira documentação.'],['10.13.1','10.11.2','t','A etapa (e) inclui proteção contra o arco.'],
    ['10.12.6','10.14.4','t','Equipamentos isolantes inspecionados e ensaiados.'],['10.4.9','10.15.3','t','O memorial faz parte do projeto exigido de toda organização.']];
  const AG={};E.forEach(([f,t,k,w])=>{const a=chapOf(f),b=chapOf(t);if(a===b||!CH[a]||!CH[b])return;const key=a+'|'+b;(AG[key]=AG[key]||{a,b,k:'t',list:[]});if(k==='x')AG[key].k='x';AG[key].list.push([f,t,k,w]);});
  const TR=[
    {t:'Choque elétrico',s:[['10.3.1','A avaliação de riscos começa pela exposição ao choque e ao arco.'],['10.6.1','Duas condições: parte viva inacessível e massa sem perigo, inclusive em falha.'],['10.6.1.1','As duas camadas são aplicadas juntas e por meios independentes.'],
      ['10.6.2','Camada básica: isolação, barreiras e invólucros, limitação da tensão.'],['10.6.3','Camada supletiva: seccionamento automático, aterramento, equipotencialização, isolação suplementar, separação elétrica.'],
      ['10.4.4','O seccionamento automático depende do esquema de aterramento definido em projeto.'],['10.6.4','Onde o perigo é maior, a camada adicional: o DDR.'],['10.6.4.1','A exceção ao DDR fica registrada no memorial, alínea f do 10.4.9.'],['10.15.3','E as inspeções e medições do aterramento ficam documentadas.']]},
    {t:'Arco elétrico',s:[['10.2.3','A norma alcança quem está exposto a arco, mesmo fora da zona controlada.'],['10.4.12','O projeto traz o estudo de energia incidente.'],['10.6.5','Nove medidas coletivas; a primeira usa a distância segura desse estudo.'],
      ['g-dseg','Distância segura: onde a energia incidente cai a 1,2 cal/cm².'],['10.11.2','O EPI de arco é escolhido pelos quadros do Anexo IV.'],['10.11.2.2','Qualquer parâmetro fora da linha da tabela invalida o Anexo IV.'],
      ['10.11.2.3','Aí o caminho volta ao estudo de energia incidente.'],['10.13.1','Na desenergização, a etapa (e) inclui proteção contra arco.'],['10.7.7.1','E a porta do painel adverte sobre o perigo de arco.']]},
    {t:'Desenergização',s:[['10.4.1','O projeto especifica o dispositivo que aceita bloqueio e sinalização.'],['10.4.2','De preferência com seccionamento de ação simultânea.'],['10.4.6','E prevê onde ligar o aterramento temporário.'],
      ['10.5.1','Desenergizar é a forma prioritária de eliminar o perigo.'],['10.5.2','Enquanto puder ser energizada, a instalação segue o regime de energizada.'],['10.13.1','A sequência de sete etapas.'],
      ['10.13.3','O estado é garantido contra outras equipes e organizações.'],['10.13.4','Um PLH pode alterar a sequência com justificativa formal prévia.'],['10.13.2','A volta tem sete etapas próprias.'],['10.16.1','Errar qualquer das duas sequências é grave e iminente risco.']]},
    {t:'Pessoa autorizada',s:[['10.8.1','Qualificado: curso específico reconhecido.'],['10.8.2','PLH: qualificado com registro no conselho.'],['10.8.3','Capacitado: plano de aprendizagem sob PLH, trabalhando sob PLH.'],
      ['10.7.5','Exame de saúde conforme NR-7.'],['10.9.2','Treinamentos iniciais conforme o tipo de organização e de serviço.'],['10.10.2.1','A autorização exige ASO apto e treinamento aprovado.'],
      ['10.10.4','A organização sabe, a qualquer momento, o alcance de cada autorização.'],['10.14.1','Só autorizados fazem serviço com exposição.'],['10.15.4','A comprovação fica na documentação.'],['10.16.1','Serviço por quem não atende ao 10.10 é grave e iminente risco.']]},
    {t:'Documento',s:[['10.4.7','O projeto fica disponível e atualizado.'],['10.7.1.1','O procedimento tem conteúdo mínimo e é aprovado por PLH.'],['10.7.2.3','A PT fica no local e, ao final, é encerrada e arquivada.'],
      ['10.7.11','A inspeção gera relatório com plano de ação e cronograma.'],['10.15.1','Tudo pode ser digital, em português.'],['10.15.3','Toda organização: projeto e registros de aterramento.'],
      ['10.15.4','Quem tem autorizados: procedimentos, especificações, comprovações e ensaios.'],['10.15.6','SEP ou MT/AT: tudo organizado no PIE, sob PLH.'],['10.15.6.1','O PIE contém a resposta a emergências.']]}];
  // edição única: Portaria 737/2026 — seletor desativado (trilha "O que mudou desde 2004" removida)
  let sel=null,trail=null,step=0,opened=new Set(),seenTrail=new Set();
  const NW=150,NH=40,XW=118;
  function heat(){const M=Store.data.miss||{};const h={};Object.keys(M).forEach(r=>{const c=chapOf(r);h[c]=(h[c]||0)+M[r];});return h;}
  function stepChap(s,tr){return chapOf(s[0]);}
  function edgePath(a,b,bend){const A=CH[a],B=CH[b];const ax=A[2],ay=A[3],bx=B[2],by=B[3];const dx=bx-ax,dy=by-ay,L=Math.hypot(dx,dy)||1;
    const cx=(ax+bx)/2-dy/L*L*bend,cy=(ay+by)/2+dx/L*L*bend;
    const cut=(px,py,qx,qy,c)=>{const hw=(c[1]==='X'?XW:NW)/2+3,hh=NH/2+3;const vx=qx-px,vy=qy-py,l=Math.hypot(vx,vy)||1;const ux=vx/l,uy=vy/l;const d=Math.min(Math.abs(ux)>1e-6?hw/Math.abs(ux):1e9,Math.abs(uy)>1e-6?hh/Math.abs(uy):1e9);return [qx-ux*d,qy-uy*d];};
    const [sx,sy]=cut(cx,cy,ax,ay,A),[ex,ey]=cut(cx,cy,bx,by,B);return `M${sx.toFixed(1)},${sy.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}`;}
  function drawMap(){const v=$('#mapView');if(!v)return;const H=heat();const tr=trail!=null?TR[trail]:null;
    const path=tr?tr.s.map(s=>stepChap(s,tr)):[];const cur=tr?path[step]:null;
    const on=k=>{const g=AG[k];if(sel)return g.a===sel||g.b===sel;if(tr){for(let i=0;i<path.length-1;i++){if((path[i]===g.a&&path[i+1]===g.b)||(path[i]===g.b&&path[i+1]===g.a))return true;}}return false;};
    const any=!!(sel||tr);
    let s=`<svg viewBox="0 0 1000 650" class="mv" role="img" aria-label="Mapa de remissões entre os capítulos da NR-10"><defs>
      <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="mv-ah"/></marker>
      <marker id="ah2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="mv-ah on"/></marker></defs>`;
    [['I','I · APLICAÇÃO',20,190],['II','II · CONTROLE',240,580],['III','III · EXECUÇÃO',620,790],['IV','IV · PROVA',810,980]].forEach(([k,t,x0,x1])=>{s+=`<rect x="${x0}" y="52" width="${x1-x0}" height="490" rx="10" class="mv-band"/><text x="${(x0+x1)/2}" y="38" class="mv-ph">${t}</text>`;});
    s+=`<text x="20" y="568" class="mv-ph l">NORMAS CITADAS PELA NR-10</text><text x="412" y="76" class="mv-hint">ordem dos capítulos = hierarquia do 10.5.4</text>`;
    const tr2=tr?path:null;
    if(tr2){let d='';for(let i=0;i<tr2.length-1;i++){if(tr2[i]===tr2[i+1])continue;d+=`<path d="${edgePath(tr2[i],tr2[i+1],.12)}" class="mv-trail" marker-end="url(#ah2)"/>`;}s+=d;}
    Object.keys(AG).forEach((k,i)=>{const g=AG[k];const o=on(k);if(tr&&!sel)return;s+=`<path d="${edgePath(g.a,g.b,(i%2?1:-1)*.1)}" class="mv-edge ${g.k==='t'?'t':''} ${o?'on':''} ${any&&!o?'dim':''}" marker-end="url(#${o?'ah2':'ah'})"/>`;});
    Object.entries(CH).forEach(([c,[t,ph,x,y]])=>{const w=ph==='X'?XW:NW;const isSel=c===sel,isCur=c===cur;const inT=tr&&path.includes(c);
      const lit=!any||isSel||(sel&&Object.values(AG).some(g=>(g.a===sel&&g.b===c)||(g.b===sel&&g.a===c)))||inT;
      s+=`<g class="mv-node ${isSel||isCur?'sel':''} ${lit?'':'dim'}" data-ch="${c}" tabindex="0" role="button" aria-label="${disp(c)} ${t}"><rect x="${x-w/2}" y="${y-NH/2}" width="${w}" height="${NH}" rx="6"/>
        <text x="${x}" y="${y-4}" class="mv-id">${disp(c)}</text><text x="${x}" y="${y+12}" class="mv-t">${t}</text>`;
      if(inT){const n=path.indexOf(c)+1;s+=`<circle cx="${x-w/2}" cy="${y-NH/2}" r="10" class="mv-num"/><text x="${x-w/2}" y="${y-NH/2+4}" class="mv-numt">${n}</text>`;}
      if(H[c]){s+=`<circle cx="${x+w/2}" cy="${y-NH/2}" r="10" class="mv-heat"/><text x="${x+w/2}" y="${y-NH/2+4}" class="mv-heatt">${H[c]>99?'99':H[c]}</text>`;}
      s+='</g>';});
    s+=`<g transform="translate(20,630)" class="mv-leg"><line x1="0" y1="-4" x2="26" y2="-4" class="mv-edge"/><text x="32" y="0">citação no texto</text><line x1="150" y1="-4" x2="176" y2="-4" class="mv-edge t"/><text x="182" y="0">ligação de conteúdo</text><circle cx="330" cy="-4" r="7" class="mv-heat"/><text x="342" y="0">erros que você cometeu</text></g></svg>`;
    v.innerHTML=s;
    $$('.mv-node',v).forEach(n=>{const go=()=>{sel=sel===n.dataset.ch?null:n.dataset.ch;if(sel){opened.add(sel);trail=null;}gotoTask('a');drawMap();renderDetail();};n.onclick=go;n.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}};});}
  function renderDetail(){const el=$('#mapDet');if(!el)return;
    if(!sel){el.innerHTML='<p class="lead">Clique num capítulo do mapa para ver o que ele cita e quem o cita.</p>';if(mod._upd)mod._upd();return;}
    const c=sel,[t]=CH[c];const items=Object.keys(REF).filter(k=>chapOf(k)===c);
    const out=Object.values(AG).filter(g=>g.a===c),inc=Object.values(AG).filter(g=>g.b===c);
    const lst=gs=>gs.flatMap(g=>g.list).map(([f,to,k,w])=>`<li>${R(f)} → ${R(to)} <span class="lead">${w}</span>${k==='t'?' <span class="tag">conteúdo</span>':''}</li>`).join('');
    el.innerHTML=`<div class="profile"><span class="eyebrow">${disp(c)}</span><h4>${t}</h4>${MODOF[c]?`<div class="row-actions"><button type="button" class="btn" data-mod="${MODOF[c]}">Estudar no módulo ${MODS.find(m=>m.id===MODOF[c]).short}</button></div>`:''}
      ${items.length?`<div class="base"><span class="lab">Itens</span>${Rs(items)}</div>`:''}</div>
      ${out.length?`<div class="h3">Este capítulo remete a</div><ul class="lnk">${lst(out)}</ul>`:''}${inc.length?`<div class="h3">É citado por</div><ul class="lnk">${lst(inc)}</ul>`:''}`;if(mod._upd)mod._upd();}
  function trailUI(el,api){const pick=()=>{el.innerHTML=`<p class="lead">Cada trilha segue um tema através de vários capítulos, na ordem em que a norma o constrói. É o fluxograma de correlações já montado. O mapa acende o caminho e numera as paradas.</p>
      <div class="who">${TR.map((t,i)=>`<button type="button" class="${seenTrail.has(i)?'done':''}" data-tr="${i}"><i style="background:${seenTrail.has(i)?'var(--ok)':'var(--line)'}"></i>${t.t}</button>`).join('')}</div><div class="prog"><span class="num">${seenTrail.size}/${TR.length} trilhas</span><div class="bar"><i style="width:${seenTrail.size/TR.length*100}%"></i></div></div>`;
      $$('[data-tr]',el).forEach(b=>b.onclick=()=>{trail=+b.dataset.tr;step=0;sel=null;drawMap();show();});};
    const show=()=>{const tr=TR[trail];
      el.innerHTML=`<div class="row-actions"><button type="button" class="btn ghost" data-a="back">← Trilhas</button><span class="h3" style="margin:0">${tr.t}</span></div>
      <ol class="steps trail">${tr.s.map((s,i)=>{const st=i<step?'done':i===step?'cur':'pend';
        const r=REF[s[0]];return `<li class="${st}" data-st="${i}"><span class="sk">${i+1}</span><span>${R(s[0])} <b>${r?r.t:''}</b><br><span class="lead">${s[1]}</span></span></li>`;}).join('')}</ol>
      <div class="row-actions"><button type="button" class="btn" data-a="prev" ${step?'':'disabled'}>Anterior</button><button type="button" class="btn primary" data-a="next">${step<tr.s.length-1?'Próxima parada':'Concluir trilha'}</button></div>`;
      $('[data-a=back]',el).onclick=()=>{trail=null;drawMap();pick();};
      $('[data-a=prev]',el).onclick=()=>{step--;drawMap();show();};
      $('[data-a=next]',el).onclick=()=>{if(step<tr.s.length-1){step++;drawMap();show();}else{seenTrail.add(trail);if(seenTrail.size===TR.length)api.done();trail=null;drawMap();pick();}};
      $$('[data-st]',el).forEach(li=>li.addEventListener('click',e=>{if(e.target.closest('button'))return;step=+li.dataset.st;drawMap();show();}));};
    if(trail!=null)show();else pick();}
  function weakUI(el){const M=Store.data.miss||{};const keys=Object.keys(M).sort((a,b)=>M[b]-M[a]);
    el.innerHTML=`<p class="lead">Cada resposta errada em qualquer módulo registra os itens citados na correção. O mapa marca em vermelho os capítulos com mais erros. Fica só no seu navegador.</p>`+
      (keys.length?`<div class="cl">${keys.slice(0,20).map(k=>{const c=chapOf(k);return `<div class="cl-row"><div class="t">${R(k)} ${REF[k]?REF[k].t:''}</div><div class="num">${M[k]}×</div>${MODOF[c]?`<div class="ex"><button type="button" class="btn" data-mod="${MODOF[c]}">Rever em ${MODS.find(m=>m.id===MODOF[c]).short}</button></div>`:''}</div>`;}).join('')}</div>
      <div class="row-actions"><button type="button" class="btn" data-a="zero">Zerar registro de erros</button><span class="lead" id="zmsg"></span></div>`:`<div class="card info"><div class="ct">Nenhum erro registrado ainda</div><div class="cb">Faça as tarefas dos módulos e volte aqui.</div></div>`);
    const z=$('[data-a=zero]',el);if(z){let arm=false;z.onclick=()=>{if(!arm){arm=true;z.textContent='Confirmar: zerar';$('#zmsg',el).textContent='Clique de novo para apagar.';return;}Store.data.miss={};Store.save();drawMap();weakUI(el);};}}
  const mod={id:'mapa',phase:'map',name:'Mapa da norma',short:'Mapa da norma',scene:'Remissões entre capítulos',vpE:'Arquitetura da NR-10',view:'map',
    brief:'A NR-10 tem dezesseis capítulos e quatro anexos que se citam o tempo todo. O mapa mostra essas remissões: linha cheia é citação explícita no texto; tracejada é ligação de conteúdo. As colunas são as fases do simulador, e a ordem dos capítulos 10.5, 10.6, 10.7 e 10.11 é a própria hierarquia de controle do 10.5.4.',
    base:['10.1.1','10.5.4','10.16.1'],cam:{theta:0,phi:1,r:10,t:[0,0,0]},
    reset(){sel=null;trail=null;step=0;},build(){},drawMap,
    tasks:[
      {id:'a',title:'Explorar',render(el,api){el.innerHTML=`<p class="lead">Abra pelo menos seis capítulos. Repare em quais capítulos recebem mais setas: são os que amarram a norma.</p><div class="prog" id="mapP"></div><div id="mapDet"></div>`;
        const upd=()=>{$('#mapP',el).innerHTML=`<span class="num">${opened.size}/6 capítulos</span><div class="bar"><i style="width:${Math.min(1,opened.size/6)*100}%"></i></div>`;if(opened.size>=6)api.done();};
        mod._upd=upd;upd();renderDetail();}},
      {id:'b',title:'Trilhas',render(el,api){trailUI(el,api);}},
      {id:'c',title:'Pontos fracos',free:1,render(el){weakUI(el);}}],
    onTask(id){if(id!=='b'&&trail!=null){trail=null;drawMap();}}};
  MODS.push(mod);})();
