/* ===== Missão integrada: uma OS do começo ao fim ===== */
(()=>{
  const OS='<b>OS 0457</b> · Substituir as buchas de BT do TR-01 (1000 kVA, 13,8 kV/380 V) na cabine primária da Indústria Alfa. É a primeira vez que a empresa faz esse serviço. Equipe própria.';
  const ST=[
    {m:'enq',ty:'q',t:'Enquadramento',q:'Como esta atividade se enquadra?',o:['SEC em MT: PIE obrigatório, Básico e Complementar MT/AT-SEC, serviço energizado nunca individual','SEP em AT: Básico e Complementar SEP','SEC em BT: só o Básico, e PIE pela carga instalada acima de 75 kW'],a:0,
      x:'A cabine é do consumidor, depois da medição (o SEP vai até a medição, inclusive): SEC. 13,8 kV é MT pelo glossário. O TR-01 é parte da instalação de 13,8 kV e o serviço é feito dentro da cabine, junto a partes de MT: a organização realiza atividade em instalação com MT, o que obriga o PIE (10.15.6 b), e a equipe faz o Básico (10.9.4) e o Complementar MT/AT-SEC (10.9.6). Serviço energizado em MT nunca é individual (10.14.2).',r:['g-mt','g-sep','10.15.6','10.9.4','10.9.6','10.14.2']},
    {m:'organizacao',ty:'q',t:'Documento de trabalho',q:'A empresa nunca fez esse serviço. O que libera a execução?',o:['Procedimento de trabalho aprovado por PLH','Permissão de trabalho, precedida de análise de risco e aprovada por trabalhador autorizado','Ordem verbal do supervisor'],a:1,
      x:'Atividade que não é habitual nem parte do processo contínuo é não rotineira.',r:['10.7.2','g-rot']},
    {m:'zonas',ty:'q',t:'Análise de risco',q:'Com a 89-1 aberta, o que continua energizado e entra na análise de risco como perigo dentro da zona controlada?',o:['Nada: a seccionadora isola tudo','O barramento de entrada e os contatos superiores da 89-1, do lado da fonte','Só o secundário do transformador'],a:1,
      x:'O lado da fonte permanece energizado. A etapa (e) do 10.13.1 existe para isso: proteger os elementos energizados na ZC e o trabalhador contra o arco.',r:['10.13.1','AII','10.7.3']},
    {m:'pessoas',ty:'m',t:'Equipe',q:'Marque quem pode compor a equipe deste serviço.',items:[
      {t:'Ana · engenheira, CREA ativo, ASO apta, Básico e Complementar MT/AT-SEC em dia, autorização registrada nos documentos funcionais',c:1},{t:'Bruno · técnico qualificado, ASO apto, Básico e Complementar MT/AT-SEC em dia, autorização registrada nos documentos funcionais',c:1},
      {t:'Carla · capacitada na empresa anterior, sem convalidação nesta',c:0},{t:'Fábio · voltou ontem de 120 dias de afastamento, sem treinamento eventual',c:0},
      {t:'Joana · técnica qualificada, ASO apta, só com o Básico',c:0},{t:'Igor · pedreiro da obra vizinha',c:0}],
      x:'Ana e Bruno cumprem os requisitos da autorização (10.10.2.1) e a têm consignada nos documentos funcionais (10.10.3). Carla: a capacitação só vale para a organização que capacitou (10.8.3.3). Fábio: afastamento por mais de 90 dias exige treinamento eventual (10.9.11 a). Joana: serviço em MT, ou em sua proximidade, no SEC exige o Complementar MT/AT-SEC (10.9.6). Igor: atividade não elétrica, fora da equipe de serviço em eletricidade.',r:['10.10.2.1','10.10.3','10.8.3.3','10.9.11','10.9.6']},
    {m:'organizacao',ty:'q',t:'Supervisão',q:'A equipe tem duas pessoas. O que a organização precisa definir?',o:['Nada: equipe pequena dispensa','Um dos membros para supervisionar e conduzir o trabalho','Um técnico de segurança externo presente'],a:1,r:['10.7.6']},
    {m:'individual',ty:'q',t:'EPI de arco',q:'Para manobrar a 89-1 no cubículo metal-clad de 13,8 kV (Icc 20 kA, eliminação 0,20 s, distância de trabalho 910 mm), qual a categoria?',o:['Categoria 2','Categoria 3','Categoria 4','Fora do Anexo IV'],a:2,
      x:'Linha da aparelhagem revestida de metal de 1 a 15 kV: até 35 kA, 0,24 s, 910 mm → Categoria 4, com vestimenta de pelo menos 40 cal/cm².',r:['AIV-I','AIV-III']},
    {m:'organizacao',ty:'q',t:'Avaliação prévia',q:'No local, o detector de tensão não acende ao ser testado numa fonte conhecida.',o:['Usar mesmo assim: a 89-1 está visivelmente aberta','Não iniciar a operação e comunicar o superior hierárquico','Começar e trocar o detector depois'],a:1,
      x:'Sem detector confiável não há como cumprir a constatação de ausência de tensão. É anormalidade que afeta a segurança.',r:['10.7.4.1','10.7.4.2','10.12.6.1']},
    {m:'desenergizado',ty:'o',t:'Desenergização',q:'Ponha as etapas do 10.13.1 em ordem.',items:['Seccionamento ou desligamento','Constatação da ausência de tensão','Impedimento de reenergização','Constatação para o aterramento temporário com equipotencialização','Proteção dos elementos energizados na ZC e contra arco','Sinalização de impedimento de reenergização','Delimitação e sinalização da área de trabalho'],
      x:'A constatação da ausência de tensão (b) vem antes do impedimento de reenergização (c) e se repete antes do aterramento temporário (d). A sequência termina com a delimitação e sinalização da área de trabalho (g).',r:['10.13.1']},
    {m:'energizado',ty:'q',t:'Outra fonte',q:'O QGBT tem um gerador de emergência que pode alimentar o TR-01 pelo lado de 380 V. O que isso muda?',o:['Nada: o lado de 13,8 kV já está seccionado','O lado de BT também precisa ser seccionado e bloqueado; enquanto houver possibilidade de energização, vale o regime de energizada','Basta avisar o operador do gerador'],a:1,
      x:'Alimentado pela BT, o transformador eleva a tensão do gerador de volta a 13,8 kV nas buchas de MT. Instalação desligada, mas com possibilidade de energização por qualquer meio ou razão, segue o capítulo 10.14 (10.5.2), e só é considerada desenergizada depois da sequência do 10.13.1. Por isso a fonte de 380 V também passa por seccionamento, impedimento e sinalização, e a organização mantém esse estado até o fim do serviço (10.13.3).',r:['10.5.2','10.13.1','10.13.3']},
    {m:'organizacao',ty:'q',t:'Troca de turno',q:'O serviço passa para o turno da noite, e a equipe inteira é trocada por dois eletricistas que não estavam no turno do dia. A PT do dia vale?',o:['Sim, até o fim do serviço','Não: a PT é restrita ao turno e só pode ser revalidada se não mudarem as condições estabelecidas nem toda a equipe','Sim, se o supervisor assinar de novo'],a:1,
      x:'Pelo 10.7.2.2, a PT vale pela duração da atividade, restrita ao turno, e pode ser revalidada pelo responsável pela autorização da permissão quando não mudam as condições estabelecidas nem toda a equipe de trabalho. Aqui a equipe inteira mudou: é preciso nova PT, com a relação dos novos envolvidos e suas autorizações (10.7.2.1 c).',r:['10.7.2.2','10.7.2.1']},
    {m:'desenergizado',ty:'o',t:'Reenergização',q:'Serviço terminado. Ponha as etapas do 10.13.2 em ordem.',items:['Retirada dos obstáculos de delimitação e sinalização','Retirada de ferramentas, utensílios e equipamentos','Retirada dos trabalhadores não envolvidos','Remoção do aterramento temporário e da equipotencialização','Retirada das proteções dos elementos energizados','Remoção da sinalização de impedimento','Desbloqueio e religamento'],r:['10.13.2']},
    {m:'documentacao',ty:'m',t:'Encerramento',q:'O que precisa acontecer no encerramento?',items:[
      {t:'Encerrar e arquivar a PT para rastreabilidade',c:1},{t:'Atualizar o projeto se a instalação mudou',c:1},{t:'Manter no PIE os relatórios de ensaio do ferramental isolante',c:1},
      {t:'Descartar a análise de risco, já que o serviço terminou',c:0},{t:'Entregar a PT ao executante como comprovante pessoal',c:0}],
      x:'A PT é encerrada e arquivada; o projeto corresponde ao executado; o PIE reúne procedimentos, análises, PT e relatórios de ensaio.',r:['10.7.2.3','10.4.13','10.15.4','10.15.6']}];
  const PERM=[3,0,5,1,6,2,4];
  let i=0,res=[];
  function draw(el,api){const N=ST.length;
    if(i>=N){const ok=res.filter(Boolean).length;const bad={};ST.forEach((s,k)=>{if(!res[k])bad[s.m]=(bad[s.m]||0)+1;});
      el.innerHTML=`<div class="os">${OS}</div><div class="score">${ok} de ${N} decisões certas</div>
        ${Object.keys(bad).length?`<div class="h3">Revise primeiro</div><div class="cl">${Object.entries(bad).sort((a,b)=>b[1]-a[1]).map(([m,n])=>{const md=MODS.find(x=>x.id===m);return `<div class="cl-row bad"><div class="t"><b>${md.short}</b> · ${n} ${n>1?'decisões erradas':'decisão errada'}</div><button type="button" class="btn" data-mod="${m}">Abrir módulo</button></div>`;}).join('')}</div>`:
        cardHTML({k:'ok',t:'OS executada sem erro',b:'Você aplicou as quatro fases da norma na sequência de um serviço real.'})}
        <div class="row-actions"><button type="button" class="btn" data-a="redo">Refazer a OS</button></div>`;
      api.done();$('[data-a=redo]',el).onclick=()=>{i=0;res=[];draw(el,api);};return;}
    const s=ST[i];const md=MODS.find(x=>x.id===s.m);
    let body='';
    if(s.ty==='q')body=s.o.map((t,j)=>`<button type="button" class="opt" data-j="${j}"><span class="ol">${'ABCD'[j]}</span><span>${t}</span></button>`).join('');
    if(s.ty==='m')body=`<div class="pick">${s.items.map((it,j)=>`<label for="ms-${i}-${j}"><input type="checkbox" id="ms-${i}-${j}" data-j="${j}"><span>${it.t}</span></label>`).join('')}</div><div class="row-actions"><button type="button" class="btn primary" data-a="chk">Conferir</button></div>`;
    if(s.ty==='o'){const perm=PERM.filter(p=>p<s.items.length);body=`<ol class="steps" id="oDone"></ol><div class="acts" id="oPool">${perm.map(p=>`<button type="button" class="act" data-p="${p}">${s.items[p]}</button>`).join('')}</div><p class="lead" id="oMsg"></p>`;}
    el.innerHTML=`<div class="os">${OS}</div><div class="prog"><span class="num">Decisão ${i+1} de ${N}</span><div class="bar"><i style="width:${i/N*100}%"></i></div></div>
      <div class="q"><div class="qn">${s.t} · ensinado em <button type="button" class="mlink" data-mod="${s.m}">${md?md.short:s.m}</button></div><div class="qq">${s.q}</div>${body}<div class="qfb"></div></div>`;
    const fin=(ok,extra)=>{res[i]=ok;if(!ok)miss(s.r);el.querySelector('.qfb').innerHTML=cardHTML({k:ok?'ok':'err',t:ok?'Certo':'Decisão errada',b:(extra?extra+' ':'')+(s.x||''),r:s.r})+`<div class="row-actions" style="margin-top:8px"><button type="button" class="btn primary" data-a="next">${i+1<N?'Próxima decisão':'Ver diagnóstico'}</button></div>`;
      $('[data-a=next]',el).onclick=()=>{i++;draw(el,api);};};
    if(s.ty==='q'){let done=false;$$('.opt',el).forEach(b=>b.onclick=()=>{if(done)return;done=true;const j=+b.dataset.j;$$('.opt',el).forEach(x=>{x.disabled=true;const jj=+x.dataset.j;if(jj===s.a)x.classList.add('right');else if(jj===j)x.classList.add('wrong');});fin(j===s.a);});}
    if(s.ty==='m'){$('[data-a=chk]',el).onclick=e=>{e.currentTarget.disabled=true;let all=true;$$('input',el).forEach(inp=>{const it=s.items[+inp.dataset.j];const lab=inp.parentElement;inp.disabled=true;
        if(inp.checked&&it.c)lab.classList.add('good');else if(inp.checked&&!it.c){lab.classList.add('bad');all=false;}else if(!inp.checked&&it.c){lab.classList.add('miss');all=false;}});fin(all);};}
    if(s.ty==='o'){let k=0,err=0;const done=$('#oDone',el);$$('[data-p]',el).forEach(b=>b.onclick=()=>{const p=+b.dataset.p;
        if(p===k){b.disabled=true;done.insertAdjacentHTML('beforeend',`<li class="done"><span class="sk">${String.fromCharCode(97+k)})</span><span>${s.items[p]}</span></li>`);k++;$('#oMsg',el).textContent='';
          if(k===s.items.length){fin(err===0,err?`Concluída com ${err} tentativa(s) fora de ordem.`:'Sequência completa sem erro.');}}
        else{err++;$('#oMsg',el).textContent=`Ainda não. Falta a etapa (${String.fromCharCode(97+k)}). Tentativas fora de ordem: ${err}.`;}});}}
  const mod={id:'missao',phase:'mis',name:'Missão integrada',short:'OS 0457',scene:'Cabine primária da Indústria Alfa',vpE:'Missão integrada',
    primer:{logic:'A norma é aplicada em sequência numa ordem de serviço: enquadrar, escolher o documento, analisar o risco, montar a equipe, escolher o EPI, avaliar o local, desenergizar, executar, reenergizar e documentar. Cada decisão aqui leva o nome do módulo que a ensina. No fim, o diagnóstico mostra quais módulos rever primeiro.',links:[]},
    brief:'Uma ordem de serviço real, do enquadramento ao arquivamento da PT. Doze decisões que cruzam as quatro fases.',
    base:['10.7.2','10.7.4','10.13.1','10.13.2','10.15.6'],
    cam:{theta:.42,phi:1.12,r:9.5,t:[0,1.3,-.6],rMax:20},
    reset(){},build(){const d=MODS.find(m=>m.id==='desenergizado');if(d)d.build();G.pendingPins=[];},
    onPick(){toast('As decisões desta missão ficam no painel');return true;},
    tasks:[{id:'a',title:'Ordem de serviço',render(el,api){draw(el,api);}}]};
  QB.add('missao',ST.filter(s=>s.ty==='q'));
  MODS.push(mod);})();
