/* ==================== inicialização ==================== */
const ORDER=['mapa','historia','hist_qdc','hist_obra','hist_sep','hist_ex','enq','zonas','projeto','coletiva','organizacao','pessoas','individual','desenergizado','energizado','documentacao','missao','treino'];
function migrate(){const d=Store.data.done;const mp={c1:'enq',c2:'projeto',c3:'pessoas',c6:'desenergizado'};
  Object.entries(mp).forEach(([o,n])=>{if(d[o]&&!d[n])d[n]=d[o];});['c1','c2','c3','c4','c5','c6','c7'].forEach(k=>delete d[k]);Store.save();}
function boot(){MODS.sort((a,b)=>ORDER.indexOf(a.id)-ORDER.indexOf(b.id));Store.load();migrate();initGL();renderNav();
  document.addEventListener('click',e=>{const r=e.target.closest('[data-ref]');if(r){openRef(r.dataset.ref);return;}
    if(e.target.closest('[data-index]')){openIndex('');return;}
    const ph=e.target.closest('[data-phase]');if(ph){const k=ph.dataset.phase;const ms=modsOf(k);const last=UI.lastByPhase[k];loadModule(last&&ms.find(x=>x.id===last)?last:ms[0].id);return;}
    const l=e.target.closest('[data-mod]');if(l){if(!G.mod||G.mod.id!==l.dataset.mod){loadModule(l.dataset.mod);$('#panel').scrollTop=0;}return;}
    const t=e.target.closest('[data-task]');if(t){selectTask(+t.dataset.task);return;}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDrawer();if(e.key==='Enter'){const c=e.target.closest&&e.target.closest('.dr-item.compact');if(c)openRef(c.dataset.ref);}});
  $('#scrim').onclick=closeDrawer;$('#drClose').onclick=closeDrawer;$('#btnNorma').onclick=()=>openIndex('');$('#btnProg').onclick=()=>PROG.abrir();
  $('#btnHome').onclick=()=>{if(G.home&&!G.no3d)setCam(G.home);};
  $('#btnPins').onclick=e=>{G.showPins=!G.showPins;G.pins.forEach(p=>p.visible=G.showPins);e.currentTarget.setAttribute('aria-pressed',G.showPins);};
  window.addEventListener('hashchange',()=>{if(UI.hashLock){UI.hashLock=false;return;}const id=location.hash.slice(1);if(MODS.find(m=>m.id===id)&&(!G.mod||G.mod.id!==id))loadModule(id);});
  const start=(location.hash||'').slice(1);loadModule(MODS.find(m=>m.id===start)?start:'historia',true);}
(function(){let ran=false;const go=()=>{if(ran)return;ran=true;boot();};
  try{Promise.all([document.fonts.load('700 40px "Barlow Condensed"'),document.fonts.load('600 40px "Barlow Condensed"')]).then(go,go);}catch(e){go();}
  setTimeout(go,1800);})();
