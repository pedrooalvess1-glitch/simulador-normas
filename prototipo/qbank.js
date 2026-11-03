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
(function(){const base=quiz;quiz=function(el,api,qs,o){o=Object.assign({},o||{});const prev=o.onAnswer;
  o.onAnswer=(q,ok)=>{const id=QB.idOf(q);SRS.record(id,ok);STATS.rec(q,ok);if(prev)prev(q,ok);};return base(el,api,qs,o);};})();
