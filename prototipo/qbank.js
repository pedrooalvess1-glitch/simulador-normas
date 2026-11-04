/* ===== Banco de questões, revisão espaçada e estatísticas (v3) =====
   Cada módulo registra aqui as questões que já tinha (QB.add / QB.cls).
   O treino (treino.js) usa o banco para simulado, revisão espaçada e painel.
   Tudo é por aluno, no localStorage (Store); sem storage, funciona sem guardar. */
const QB={list:[],ids:new WeakMap(),seen:new WeakSet(),
  add(mod,arr){(arr||[]).forEach((q,i)=>{if(!q||!q.q||!q.o||this.seen.has(q))return;this.seen.add(q);
      const id=mod+':'+i;this.ids.set(q,id);this.list.push(Object.assign({},q,{id,mod}));});},
  cls(mod,items,options,prompt){(items||[]).forEach((it,i)=>{const a=options.findIndex(o=>o.v===it.a);if(a<0)return;
      const id=mod+':c'+i+':'+options.map(o=>o.v).join('');const q={id,mod,q:`${prompt}<br><span class="lead">“${it.t}”</span>`,o:options.map(o=>o.l),a,x:it.x,r:it.r,gir:it.gir};
      this.list.push(q);});},
  idOf(q){return q.id||this.ids.get(q)||null;},
  byId(id){return this.list.find(q=>q.id===id)||null;}};

/* Leitner com 5 caixas. Errou: caixa 1 (revisa hoje). Acertou: sobe uma caixa (1, 3, 7 e 14 dias). */
const SRS={DAYS:[0,0,1,3,7,14],   // dias até a próxima revisão, por caixa (índice = caixa)
  data(){return Store.data.srs=Store.data.srs||{};},
  record(id,ok,card){if(!id)return;const D=this.data();const c=D[id]||{b:0,due:0,n:0,w:0};c.n++;if(!ok)c.w++;
    c.b=ok?Math.min(5,c.b?c.b+1:2):1;   /* acerto em questão nova já vai para a caixa 2 */
    c.due=Date.now()+this.DAYS[c.b]*864e5;if(card)c.card=card;D[id]=c;Store.save();},
  due(){const D=this.data(),now=Date.now();return Object.keys(D).filter(k=>D[k].b>0&&D[k].due<=now).sort((a,b)=>D[a].due-D[b].due);},
  boxes(){const D=this.data(),c=[0,0,0,0,0,0];Object.values(D).forEach(v=>c[v.b||0]++);return c;}};

/* Acertos por capítulo da norma (usa o primeiro item citado na questão). */
const STATS={
  rec(q,ok){const S=Store.data.st=Store.data.st||{};const ch=STATS.chap(q);const s=S[ch]||[0,0];s[1]++;if(ok)s[0]++;S[ch]=s;
    const day=new Date().toISOString().slice(0,10);const H=Store.data.dias=Store.data.dias||{};H[day]=(H[day]||0)+1;Store.save();},
  chap(q){const r=(q.r||[])[0];if(!r)return 'geral';if(/^art/.test(r))return 'Portaria';return typeof chapOf==='function'?chapOf(r):r;}};

/* As questões dos módulos passam a alimentar a revisão e o painel, sem mudar os módulos. */
(function(){const base=quiz;quiz=function(el,api,qs,o){o=Object.assign({},o||{});
  qs=(qs||[]).map(q=>typeof bancaQ==='function'?bancaQ(q):q);   /* formato de banca: 5 alternativas e o porquê das erradas (banca.js) */
  const prev=o.onAnswer;
  o.onAnswer=(q,ok)=>{const id=QB.idOf(q);SRS.record(id,ok);STATS.rec(q,ok);if(prev)prev(q,ok);};return base(el,api,qs,o);};})();

/* ===== Progresso: exportar e importar (JSON) =====
   O progresso fica no localStorage do navegador ('nr10sim.v1'); este painel leva para outro computador ou navegador.
   No Artifact do claude.ai o download é bloqueado: por isso o JSON também aparece no campo de texto, para copiar. */
const PROG={
  json(){return JSON.stringify(Object.assign({app:'simulador-nr10',versao:1,exportado:new Date().toISOString()},{dados:Store.data}));},
  ler(txt){let o;try{o=JSON.parse(txt);}catch(e){return {erro:'O texto não é um JSON válido.'};}
    const d=o&&o.app==='simulador-nr10'?o.dados:o;   /* aceita também o objeto cru do localStorage */
    if(!d||typeof d!=='object'||!d.done||typeof d.done!=='object')return {erro:'O arquivo não parece ser um progresso do simulador (falta o campo "done").'};
    return {dados:d};},
  resumo(d){const nd=Object.values(d.done||{}).reduce((s,m)=>s+Object.keys(m).length,0),nr=Object.keys(d.srs||{}).length,ns=(d.sims||[]).length;
    return `${nd} tarefa(s) concluída(s) · ${nr} questão(ões) na revisão espaçada · ${ns} simulado(s)`;},
  abrir(){const j=this.json();
    openDrawer('Progresso',`<p class="lead">O progresso fica guardado só neste navegador. Exporte para levar a outro computador, navegador ou celular, e importe lá.</p>
      <div class="card info"><div class="ct">Agora neste navegador</div><div class="cb">${this.resumo(Store.data)}</div></div>
      <div class="h3">Exportar</div><div class="row-actions"><button type="button" class="btn primary" data-pg="baixar">Baixar arquivo .json</button><button type="button" class="btn" data-pg="copiar">Copiar o texto</button></div>
      <textarea class="search prog-txt" id="pgOut" readonly aria-label="Progresso em JSON">${esc(j)}</textarea>
      <div class="h3">Importar</div><p class="lead">Escolha o arquivo exportado ou cole o texto. O progresso atual deste navegador é substituído.</p>
      <input type="file" id="pgFile" accept=".json,application/json" aria-label="Arquivo de progresso">
      <textarea class="search prog-txt" id="pgIn" placeholder="…ou cole aqui o texto exportado" aria-label="Texto do progresso a importar"></textarea>
      <div class="row-actions"><button type="button" class="btn" data-pg="importar">Conferir e importar</button></div><div id="pgMsg"></div>`);
    const B=$('#drB'),msg=(k,t,b)=>{$('#pgMsg').innerHTML=cardHTML({k,t,b});};
    B.querySelector('[data-pg=baixar]').onclick=()=>{try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([j],{type:'application/json'}));
        a.download='progresso-nr10-'+new Date().toISOString().slice(0,10)+'.json';document.body.appendChild(a);a.click();a.remove();
        msg('ok','Arquivo gerado','Se o download não começar (no claude.ai ele é bloqueado), use "Copiar o texto" e guarde num arquivo .json.');}
      catch(e){msg('err','Download indisponível','Use "Copiar o texto".');}};
    B.querySelector('[data-pg=copiar]').onclick=()=>{const t=$('#pgOut');t.select();let ok=false;
      try{if(navigator.clipboard){navigator.clipboard.writeText(j).then(()=>msg('ok','Copiado','Cole num arquivo de texto e salve com a extensão .json.'),()=>msg('info','Texto selecionado','Use Ctrl+C para copiar.'));return;}ok=document.execCommand('copy');}catch(e){}
      msg(ok?'ok':'info',ok?'Copiado':'Texto selecionado',ok?'Cole num arquivo de texto e salve com a extensão .json.':'Use Ctrl+C para copiar.');};
    $('#pgFile').onchange=e=>{const f=e.target.files&&e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{$('#pgIn').value=String(r.result||'');msg('info','Arquivo carregado','Clique em "Conferir e importar".');};r.readAsText(f);};
    let pend=null;const bi=B.querySelector('[data-pg=importar]');
    bi.onclick=()=>{if(pend){Store.data=pend;Store.save();msg('ok','Progresso importado','Recarregando o simulador…');setTimeout(()=>location.reload(),600);return;}
      const r=this.ler($('#pgIn').value.trim());if(r.erro){msg('err','Não deu para importar',r.erro);return;}
      pend=r.dados;bi.textContent='Confirmar: substituir o progresso atual';bi.classList.add('primary');msg('info','Conferido',this.resumo(pend));};}};
