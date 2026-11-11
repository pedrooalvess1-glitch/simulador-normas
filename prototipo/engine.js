/* ==================== utilidades ==================== */
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function refKey(id){const r=REF[id];return r&&r.k?r.k:id;}
function R(id,label){return `<button type="button" class="ref" data-ref="${id}">${esc(label||refKey(id))}</button>`;}
function Rs(a){return (a||[]).map(i=>R(i)).join('');}
const fmt=(n,d=2)=>Number(n).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});

const Store={key:'nr10sim.v1',data:{done:{}},
  load(){try{const v=localStorage.getItem(this.key);if(v){const o=JSON.parse(v);if(o&&o.done)this.data=o;}}catch(e){}},
  save(){try{localStorage.setItem(this.key,JSON.stringify(this.data));}catch(e){}}};
function isDone(m,t){return !!(Store.data.done[m]&&Store.data.done[m][t]);}
function markDone(m,t){(Store.data.done[m]=Store.data.done[m]||{})[t]=true;Store.save();renderNav();renderTaskTabs();}

/* ==================== motor 3D ==================== */
const G={hot:[],hotMap:{},pins:[],tweens:[],pendingPins:[],showPins:true,no3d:false,visited:new Set()};
const MODS=[];

function M(c,o){o=o||{};const m=new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.8,metalness:.05},o));
  m.userData.base={e:o.emissive!=null?new THREE.Color(o.emissive).getHex():0,i:o.emissiveIntensity!=null?o.emissiveIntensity:1};return m;}
function addMesh(geo,mat,x,y,z,p){const m=new THREE.Mesh(geo,mat);m.position.set(x||0,y||0,z||0);m.castShadow=true;m.receiveShadow=true;(p||G.world).add(m);return m;}
function box(w,h,d,c,x,y,z,p,o){return addMesh(new THREE.BoxGeometry(w,h,d),M(c,o),x,y,z,p);}
function boxB(w,h,d,c,x,y,z,p,o){return box(w,h,d,c,x,(y||0)+h/2,z,p,o);}
function cyl(rt,rb,h,c,x,y,z,p,o,seg){return addMesh(new THREE.CylinderGeometry(rt,rb,h,seg||20),M(c,o),x,y,z,p);}
function sph(r,c,x,y,z,p,o){return addMesh(new THREE.SphereGeometry(r,20,14),M(c,o),x,y,z,p);}
function grp(x,y,z,p){const g=new THREE.Group();g.position.set(x||0,y||0,z||0);(p||G.world).add(g);return g;}
function line(pts,color,p){const g=new THREE.BufferGeometry().setFromPoints(pts.map(a=>new THREE.Vector3(a[0],a[1],a[2])));
  const l=new THREE.Line(g,new THREE.LineBasicMaterial({color:color||0x222222}));(p||G.world).add(l);return l;}
function sag(a,b,s,n){n=n||18;const pts=[];for(let i=0;i<=n;i++){const t=i/n;pts.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t-s*4*t*(1-t),a[2]+(b[2]-a[2])*t]);}return pts;}
/* cilindro entre dois pontos (cabos, hastes) */
function rod(a,b,r,c,p,o){const A=new THREE.Vector3(...a),B=new THREE.Vector3(...b);const L=A.distanceTo(B);
  const m=addMesh(new THREE.CylinderGeometry(r,r,L,10),M(c,o),0,0,0,p);m.position.copy(A).add(B).multiplyScalar(.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),B.clone().sub(A).normalize());return m;}

function canvasTex(lines,o){o=Object.assign({bg:'#ffffff',fg:'#111111',h:128,aspect:2,weight:700,border:null,radius:0,
    family:'"Barlow Condensed","Arial Narrow",Arial,sans-serif',scale:.82},o||{});
  const c=document.createElement('canvas');c.height=o.h;c.width=Math.round(o.h*o.aspect);const x=c.getContext('2d');
  const L=Array.isArray(lines)?lines:[lines];
  if(o.bg){x.fillStyle=o.bg;if(o.radius){const r=o.radius*o.h;x.beginPath();x.moveTo(r,0);x.arcTo(c.width,0,c.width,c.height,r);x.arcTo(c.width,c.height,0,c.height,r);x.arcTo(0,c.height,0,0,r);x.arcTo(0,0,c.width,0,r);x.closePath();x.fill();}else x.fillRect(0,0,c.width,c.height);}
  if(o.border){const lw=o.h*.07;x.strokeStyle=o.border;x.lineWidth=lw;x.strokeRect(lw/2,lw/2,c.width-lw,c.height-lw);}
  const lh=c.height/(L.length+.35);let fs=lh*o.scale;x.font=`${o.weight} ${fs}px ${o.family}`;
  const maxW=Math.max(...L.map(t=>x.measureText(t).width));if(maxW>c.width*.9){fs*=c.width*.9/maxW;x.font=`${o.weight} ${fs}px ${o.family}`;}
  x.textAlign='center';x.textBaseline='middle';x.fillStyle=o.fg;
  L.forEach((t,i)=>x.fillText(t,c.width/2,lh*(i+.5)+lh*.175));
  const tex=new THREE.CanvasTexture(c);tex.anisotropy=4;return tex;}
function plate(lines,w,h,o,x,y,z,p,ry){o=o||{};const tex=canvasTex(lines,Object.assign({aspect:w/h,h:Math.max(64,Math.round(160*h/Math.max(h,.25)))},o));
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tex,transparent:!!o.transparent,side:o.double?THREE.DoubleSide:THREE.FrontSide}));
  m.position.set(x||0,y||0,z||0);m.rotation.y=ry||0;(p||G.world).add(m);return m;}
function label(lines,x,y,z,p,o){o=Object.assign({bg:'rgba(21,32,43,.88)',fg:'#ffffff',s:.42,aspect:null,radius:.22},o||{});
  const L=Array.isArray(lines)?lines:[lines];const asp=o.aspect||Math.max(1.6,Math.max(...L.map(t=>t.length))*.42/L.length+.6);
  const tex=canvasTex(L,{bg:o.bg,fg:o.fg,aspect:asp,h:96*L.length,radius:o.radius/L.length,weight:600});
  const s=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:o.depthTest!==false}));
  s.scale.set(o.s*asp,o.s*L.length,1);s.position.set(x,y,z);s.renderOrder=o.depthTest===false?10:0;(p||G.world).add(s);return s;}

function person(o){o=Object.assign({helmet:'#f4f4f2',shirt:'#2f5d8a',pants:'#2b3440',skin:'#c48f6c',boots:'#3b2c22'},o||{});
  const g=grp(o.x||0,0,o.z||0,o.p);const P={};
  P.legL=box(.15,.82,.17,o.pants,-.1,.49,0,g);P.legR=box(.15,.82,.17,o.pants,.1,.49,0,g);
  P.bootL=box(.16,.1,.25,o.boots,-.1,.05,.03,g);P.bootR=box(.16,.1,.25,o.boots,.1,.05,.03,g);
  P.torso=box(.46,.64,.26,o.shirt,0,1.2,0,g);
  P.shL=grp(-.3,1.47,0,g);P.armL=box(.12,.6,.13,o.shirt,0,-.3,0,P.shL);P.handL=sph(.066,o.skin,0,-.65,0,P.shL);
  P.shR=grp(.3,1.47,0,g);P.armR=box(.12,.6,.13,o.shirt,0,-.3,0,P.shR);P.handR=sph(.066,o.skin,0,-.65,0,P.shR);
  P.neck=cyl(.06,.06,.08,o.skin,0,1.55,0,g);P.head=sph(.13,o.skin,0,1.68,0,g);
  P.helmet=addMesh(new THREE.SphereGeometry(.158,20,10,0,Math.PI*2,0,Math.PI/2),M(o.helmet),0,1.71,0,g);
  P.brim=cyl(.17,.17,.018,o.helmet,0,1.712,.03,g);
  if(o.noHelmet){P.helmet.visible=false;P.brim.visible=false;}
  g.userData.P=P;return {g,P};}

/* hotspot: torna um objeto clicável e cria um marcador sobre ele */
function hot(obj,id,lab,o){obj.userData.hotId=id;obj.userData.hotLabel=lab;G.hot.push(obj);G.hotMap[id]=obj;
  if(!(o&&o.noPin))G.pendingPins.push({obj,id,lab,dy:(o&&o.dy)||.35,s:(o&&o.pin)||.38});return obj;}

let PIN_TEX=null,PIN_DONE=null;
function pinTex(done){const c=document.createElement('canvas');c.width=c.height=96;const x=c.getContext('2d');
  x.translate(48,48);x.rotate(Math.PI/4);x.fillStyle=done?'#2B7649':'#E3A11B';x.strokeStyle='#15202B';x.lineWidth=7;
  x.beginPath();x.rect(-26,-26,52,52);x.fill();x.stroke();x.rotate(-Math.PI/4);
  x.fillStyle=done?'#ffffff':'#15202B';x.font='700 44px "Barlow Condensed",Arial,sans-serif';x.textAlign='center';x.textBaseline='middle';
  x.fillText(done?'✓':'!',0,3);const t=new THREE.CanvasTexture(c);t.__keep=true;return t;}
function finalizeHot(){G.world.updateMatrixWorld(true);
  G.pendingPins.forEach(p=>{const b=new THREE.Box3().setFromObject(p.obj);if(b.isEmpty())return;
    const s=new THREE.Sprite(new THREE.SpriteMaterial({map:G.visited.has(G.mod.id+':'+p.id)?PIN_DONE:PIN_TEX,depthTest:false,transparent:true,sizeAttenuation:false}));
    s.renderOrder=20;s.scale.set(.042,.042,1);const c=b.getCenter(new THREE.Vector3());s.position.set(c.x,b.max.y+p.dy,c.z);
    s.userData.hotId=p.id;s.userData.hotLabel=p.lab;s.userData.pin=true;s.userData.y0=s.position.y;s.userData.ph=Math.random()*6;
    s.visible=G.showPins;G.world.add(s);G.pins.push(s);G.hot.push(s);});
  G.pendingPins=[];}
function markVisited(id){G.visited.add(G.mod.id+':'+id);G.pins.forEach(p=>{if(p.userData.hotId===id)p.material.map=PIN_DONE;});}
function setPinVisible(id,v){G.pins.forEach(p=>{if(p.userData.hotId===id)p.visible=v&&G.showPins;});}

function clearWorld(){G.tweens=[];G.hot=[];G.hotMap={};G.pins=[];G.pendingPins=[];G.tick=null;G.hover=null;
  if(!G.world)return;G.world.traverse(o=>{if(o.geometry)o.geometry.dispose();
    if(o.material){(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{if(m.map&&!m.map.__keep)m.map.dispose();m.dispose();});}});
  G.scene.remove(G.world);G.world=new THREE.Group();G.scene.add(G.world);}

function tween(dur,fn,done){G.tweens.push({t0:performance.now(),dur,fn,done});}
const ease=k=>k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;

function setEm(mesh,hex,i){mesh.traverse(o=>{if(o.material&&o.material.emissive){o.material.userData.base={e:hex,i:i};if(!o.material.userData.hl){o.material.emissive.setHex(hex);o.material.emissiveIntensity=i;}}});}
function highlight(obj,on){if(!obj||obj.userData.pin)return;obj.traverse(o=>{const m=o.material;if(!m||!m.emissive)return;
  if(on){m.userData.hl=true;m.emissive.setHex(0xE3A11B);m.emissiveIntensity=.38;}
  else{m.userData.hl=false;const b=m.userData.base||{e:0,i:1};m.emissive.setHex(b.e);m.emissiveIntensity=b.i;}});}

function sceneColors(){if(G.no3d)return;const cs=getComputedStyle(document.documentElement);
  const bg=cs.getPropertyValue('--scene-bg').trim()||'#d8dde2',fl=cs.getPropertyValue('--scene-floor').trim()||'#cbd1d7',gr=cs.getPropertyValue('--scene-grid').trim()||'#b6bec6';
  G.renderer.setClearColor(bg);G.floor.material.color.set(fl);G.grid.material.color.set(gr);G.scene.fog.color.set(bg);
  const dark=new THREE.Color(bg).getHSL({}).l<.3;G.hemi.intensity=dark?.62:.78;G.sun.intensity=dark?.8:.9;}

function initGL(){
  if(!window.THREE){G.no3d=true;$('#loading').textContent='O motor 3D não carregou. As tarefas do painel funcionam normalmente.';return;}
  const cv=$('#gl');
  G.renderer=new THREE.WebGLRenderer({canvas:cv,antialias:true});G.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  G.renderer.shadowMap.enabled=true;G.renderer.shadowMap.type=THREE.PCFSoftShadowMap;G.renderer.localClippingEnabled=true;
  G.scene=new THREE.Scene();G.scene.fog=new THREE.Fog(0xd8dde2,38,95);
  G.camera=new THREE.PerspectiveCamera(40,1,.05,400);
  G.hemi=new THREE.HemisphereLight(0xffffff,0x7d8a96,.78);G.scene.add(G.hemi);
  G.sun=new THREE.DirectionalLight(0xffffff,.9);G.sun.position.set(10,18,8);G.sun.castShadow=true;G.sun.shadow.mapSize.set(2048,2048);
  const sc=G.sun.shadow.camera;sc.left=-22;sc.right=22;sc.top=22;sc.bottom=-22;sc.near=1;sc.far=70;G.sun.shadow.bias=-.0005;G.scene.add(G.sun);
  G.floor=new THREE.Mesh(new THREE.PlaneGeometry(300,300),new THREE.MeshStandardMaterial({color:0xcbd1d7,roughness:1}));
  G.floor.rotation.x=-Math.PI/2;G.floor.receiveShadow=true;G.scene.add(G.floor);
  G.grid=new THREE.GridHelper(70,70,0xffffff,0xffffff);G.grid.position.y=.003;G.grid.material.transparent=true;G.grid.material.opacity=.4;G.scene.add(G.grid);
  G.world=new THREE.Group();G.scene.add(G.world);
  PIN_TEX=pinTex(false);PIN_DONE=pinTex(true);
  G.o={theta:.6,phi:1.05,r:18,t:new THREE.Vector3(0,1,0)};G.oT={theta:.6,phi:1.05,r:18,t:new THREE.Vector3(0,1,0)};G.rMin=2;G.rMax=90;
  sceneColors();
  const vp=$('#vp');const ro=new ResizeObserver(()=>{const w=vp.clientWidth,h=vp.clientHeight;if(!w||!h)return;G.renderer.setSize(w,h,false);G.camera.aspect=w/h;G.camera.updateProjectionMatrix();});ro.observe(vp);
  try{matchMedia('(prefers-color-scheme: dark)').addEventListener('change',sceneColors);}catch(e){}
  new MutationObserver(sceneColors).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  bindPointer(cv);$('#loading').hidden=true;requestAnimationFrame(loop);}

function setCam(c,instant){G.oT={theta:c.theta,phi:c.phi,r:c.r,t:new THREE.Vector3(...c.t)};G.rMin=c.rMin||2;G.rMax=c.rMax||Math.max(40,c.r*2.4);G.home=c;
  if(instant)G.o={theta:c.theta,phi:c.phi,r:c.r,t:G.oT.t.clone()};}
function camApply(){const o=G.o,T=G.oT,k=.14;o.theta+=(T.theta-o.theta)*k;o.phi+=(T.phi-o.phi)*k;o.r+=(T.r-o.r)*k;o.t.lerp(T.t,k);
  const sp=Math.sin(o.phi);G.camera.position.set(o.t.x+o.r*sp*Math.sin(o.theta),o.t.y+o.r*Math.cos(o.phi),o.t.z+o.r*sp*Math.cos(o.theta));G.camera.lookAt(o.t);}

function loop(now){requestAnimationFrame(loop);
  for(let i=G.tweens.length-1;i>=0;i--){const t=G.tweens[i];const k=Math.min(1,(now-t.t0)/t.dur);t.fn(ease(k));if(k>=1){G.tweens.splice(i,1);t.done&&t.done();}}
  const s=now*.001;G.pins.forEach(p=>{p.position.y=p.userData.y0+Math.sin(s*2.2+p.userData.ph)*.06;});
  if(G.cvHidden)return;if(G.tick)G.tick(s);camApply();G.renderer.render(G.scene,G.camera);}

const RAY=typeof THREE!=='undefined'?new THREE.Raycaster():null;const NDC=typeof THREE!=='undefined'?new THREE.Vector2():null;
function pickAt(cx,cy){const r=$('#gl').getBoundingClientRect();NDC.set(((cx-r.left)/r.width)*2-1,-((cy-r.top)/r.height)*2+1);
  RAY.setFromCamera(NDC,G.camera);const vis=G.hot.filter(o=>o.visible!==false&&(!o.userData.pin||G.showPins));
  const pins=vis.filter(o=>o.userData.pin);const ph=RAY.intersectObjects(pins,false);if(ph.length)return ph[0].object;
  const hits=RAY.intersectObjects(vis.filter(o=>!o.userData.pin),true);
  for(const h of hits){let o=h.object;let ok=true;let q=o;while(q){if(q.visible===false){ok=false;break;}q=q.parent;}if(!ok)continue;
    while(o&&!o.userData.hotId)o=o.parent;if(o)return o;}return null;}
function bindPointer(cv){const ptr=new Map();let down=null,pinch=0;const tip=$('#tip');
  cv.addEventListener('contextmenu',e=>e.preventDefault());
  cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);ptr.set(e.pointerId,{x:e.clientX,y:e.clientY});
    down={x:e.clientX,y:e.clientY,moved:0,pan:e.button===2||e.shiftKey};if(ptr.size===2){const a=[...ptr.values()];pinch=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);}});
  cv.addEventListener('pointermove',e=>{const p=ptr.get(e.pointerId);
    if(!p){if(e.pointerType==='mouse')hoverAt(e);return;}
    const dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;if(down)down.moved+=Math.abs(dx)+Math.abs(dy);
    if(ptr.size===2){const a=[...ptr.values()];const d=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);if(pinch){G.oT.r=Math.min(G.rMax,Math.max(G.rMin,G.oT.r*pinch/d));}pinch=d;return;}
    if(down&&down.moved>4){cv.classList.add('dragging');tip.hidden=true;
      if(down.pan){const k=G.oT.r*.0016;const cam=G.camera;const right=new THREE.Vector3().setFromMatrixColumn(cam.matrix,0);const up=new THREE.Vector3().setFromMatrixColumn(cam.matrix,1);
        G.oT.t.addScaledVector(right,-dx*k).addScaledVector(up,dy*k);if(G.oT.t.y<0)G.oT.t.y=0;}
      else{G.oT.theta-=dx*.0065;G.oT.phi=Math.min(1.52,Math.max(.12,G.oT.phi-dy*.0055));}}});
  const end=e=>{const wasDown=down;ptr.delete(e.pointerId);if(ptr.size<2)pinch=0;cv.classList.remove('dragging');
    if(wasDown&&wasDown.moved<7&&ptr.size===0&&e.type==='pointerup'){const o=pickAt(e.clientX,e.clientY);if(o)onPicked(o);}
    if(ptr.size===0)down=null;};
  cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);
  cv.addEventListener('pointerleave',()=>{if(G.hover){highlight(G.hover,false);G.hover=null;}tip.hidden=true;cv.classList.remove('hovering');});
  cv.addEventListener('wheel',e=>{e.preventDefault();G.oT.r=Math.min(G.rMax,Math.max(G.rMin,G.oT.r*(1+Math.sign(e.deltaY)*Math.min(.25,Math.abs(e.deltaY)*.0012))));},{passive:false});
  function hoverAt(e){const o=pickAt(e.clientX,e.clientY);const tgt=o?(o.userData.pin?G.hotMap[o.userData.hotId]:o):null;
    if(tgt!==G.hover){if(G.hover)highlight(G.hover,false);G.hover=tgt;if(tgt)highlight(tgt,true);}
    if(o){const r=$('#vp').getBoundingClientRect();tip.textContent=o.userData.hotLabel;tip.style.left=(e.clientX-r.left)+'px';tip.style.top=(e.clientY-r.top)+'px';tip.hidden=false;cv.classList.add('hovering');}
    else{tip.hidden=true;cv.classList.remove('hovering');}}}
function onPicked(o){const id=o.userData.hotId;markVisited(id);const m=G.mod;
  if(m.onPick&&m.onPick(id)!==false)return;
  if(m.info&&m.info[id]){const i=m.info[id];fb({k:'info',t:i.t,b:i.b,r:i.r});toast(i.t);}}

/* ==================== interface ==================== */
const UI={task:0,lastByPhase:{}};
function toast(t,kind){const el=$('#toast');el.textContent=t;el.className='vp-toast'+(kind?' '+kind:'');el.hidden=false;clearTimeout(UI.tt);UI.tt=setTimeout(()=>{el.hidden=true;},2600);}
function banner(t,kind){const el=$('#banner');if(!t){el.hidden=true;return;}el.textContent=t;el.className='vp-banner'+(kind?' '+kind:'');el.hidden=false;}

const PHASES=[{k:'map',n:'',t:'Mapa',q:'Como a norma se organiza e onde cada item se liga a outro'},
  {k:'H',n:'',t:'História',q:'Uma ordem de serviço contada na instalação em 3D: cada objeto liga a itens da NR-10'},
  {k:'I',n:'I',t:'Aplicação',q:'A NR-10 me alcança? Com que intensidade?'},
  {k:'II',n:'II',t:'Controle',q:'Como o risco é controlado, na ordem da hierarquia do 10.5.4'},
  {k:'III',n:'III',t:'Execução',q:'Como se trabalha: desenergizado ou energizado'},
  {k:'IV',n:'IV',t:'Prova',q:'Como se comprova, e o que paralisa o serviço na hora'},
  {k:'mis',n:'',t:'Missão',q:'Uma ordem de serviço do começo ao fim, cruzando as quatro fases'},
  {k:'T',n:'',t:'Treino',q:'Simulado, revisão espaçada, gerador de questões e cartões para a prova'}];
function modsOf(k){return MODS.filter(m=>m.phase===k);}
function cntDone(m){return m.tasks.filter(t=>!t.free&&isDone(m.id,t.id)).length;}
function realTasks(m){return m.tasks.filter(t=>!t.free);}
function keepVisible(box,el){if(!box||!el)return;const pin=box.querySelector('[data-phase="map"]');const off=pin&&pin!==el?pin.offsetWidth:0;   /* desconta a aba Mapa, presa à esquerda */
  const L=el.offsetLeft,R=L+el.offsetWidth;if(L-off<box.scrollLeft||R>box.scrollLeft+box.clientWidth)box.scrollLeft=Math.max(0,L-off-24);}
function renderNav(){const cur=G.mod?G.mod.phase:'map';
  $('#phases').innerHTML=PHASES.map(p=>{const ms=modsOf(p.k);const tot=ms.reduce((s,m)=>s+realTasks(m).length,0),d=ms.reduce((s,m)=>s+cntDone(m),0);
    return `<button type="button" class="phase ${p.n?'':'aux'}" data-phase="${p.k}" aria-current="${p.k===cur}">${p.n?`<span class="pn">${p.n}</span>`:''}<span class="pt">${p.t}</span>${tot?`<span class="pp num">${d}/${tot}</span>`:''}</button>`;}).join('');
  const P=PHASES.find(p=>p.k===cur);
  $('#mods').innerHTML=`<span class="mq">${P.q}</span><div class="mrow">${modsOf(cur).map((m,i)=>`${i&&cur==='II'?'<span class="arr" aria-hidden="true">→</span>':''}<button type="button" class="mchip" data-mod="${m.id}" aria-current="${G.mod===m}">${m.short}<span class="lp">${realTasks(m).map(t=>`<i class="${isDone(m.id,t.id)?'on':''}"></i>`).join('')}</span></button>`).join('')}</div>`;
  keepVisible($('#phases'),$('#phases [aria-current="true"]'));keepVisible($('#mods .mrow'),$('#mods [aria-current="true"]'));}
function miss(r){if(!r||!r.length)return;const M=Store.data.miss=Store.data.miss||{};r.forEach(x=>{M[x]=(M[x]||0)+1;});Store.save();}

function cardHTML(o){return `<div class="card ${o.k||'info'}"><div class="ct">${o.gir?'<span class="gir">GIR · 10.16.1</span>':''}<span>${o.t}</span></div>${o.b?`<div class="cb">${o.b}</div>`:''}${o.r&&o.r.length?`<div class="cr">${Rs(o.r)}</div>`:''}${o.extra||''}</div>`;}
function fb(o){const el=$('#fb');if(!el)return;const w=document.createElement('div');w.innerHTML=cardHTML(o);el.prepend(w.firstChild);while(el.children.length>4)el.lastChild.remove();}

function primerHTML(m){if(!m.primer)return '';const seen=(Store.data.pr||{})[m.id];
  return `<details class="primer" ${seen?'':'open'}><summary>Como este capítulo pensa</summary><p>${m.primer.logic}</p>${(m.primer.links||[]).length?`<div class="links"><span class="lab">Liga com</span>${m.primer.links.map(([to,why,r])=>{const t=MODS.find(x=>x.id===to);
    return `<div class="lk"><button type="button" class="mlink" data-mod="${to}">${t?t.short:to}</button><span>${why} ${Rs(r)}</span></div>`;}).join('')}</div>`:''}</details>`;}
function renderPanel(){const m=G.mod;const P=PHASES.find(p=>p.k===m.phase);const ms=modsOf(m.phase),ix=ms.indexOf(m);
  $('#panel').innerHTML=`<div class="p-inner"><div class="mod-head"><div class="eyebrow">${P.n?'Fase '+P.n+' · ':''}${P.t}${ms.length>1?` · módulo ${ix+1} de ${ms.length}`:''}</div><h2>${m.name}</h2><p>${m.brief}</p>
  <div class="base"><span class="lab">Base</span>${Rs(m.base)}</div></div>${primerHTML(m)}
  <div class="tasks" role="tablist" id="tasks"></div><div class="tb" id="tb" role="tabpanel"></div><div class="fb" id="fb" aria-live="polite"></div></div>`;
  (Store.data.pr=Store.data.pr||{})[m.id]=1;Store.save();selectTask(0);}

function renderTaskTabs(){const el=$('#tasks');if(!el||!G.mod)return;const m=G.mod;
  el.innerHTML=m.tasks.map((t,i)=>{const d=isDone(m.id,t.id);return `<button type="button" class="task-tab" role="tab" data-task="${i}" aria-selected="${i===UI.task}">${t.free?'':`<span class="ck ${d?'on':''}">${d?'✓':''}</span>`}<span class="k">${String.fromCharCode(65+i)}</span>${t.title}</button>`;}).join('');}
function selectTask(i){const m=G.mod;UI.task=i;renderTaskTabs();const t=m.tasks[i];const el=$('#tb');el.innerHTML='';
  t.render(el,{done:()=>markDone(m.id,t.id),mod:m,id:t.id});if(m.onTask)m.onTask(t.id);}
function activeTask(){return G.mod?G.mod.tasks[UI.task].id:null;}
function gotoTask(id){const i=G.mod.tasks.findIndex(t=>t.id===id);if(i>=0&&i!==UI.task)selectTask(i);}

function loadModule(id,first){const m=MODS.find(x=>x.id===id)||MODS[0];
  if(G.mod&&G.mod.leave)G.mod.leave();
  const isMap=m.view==='map';G.cvHidden=isMap;$('#gl').hidden=isMap;$('#mapView').hidden=!isMap;$('.vp-hint').hidden=isMap;$('.vp-ctl').hidden=isMap;
  if(G.no3d)$('#loading').hidden=isMap;
  if(!G.no3d){clearWorld();}G.mod=m;UI.task=0;UI.lastByPhase[m.phase]=m.id;banner(null);$('#tip').hidden=true;
  if(m.reset)m.reset();
  if(!G.no3d&&!isMap){try{m.build();finalizeHot();}catch(e){console.error(e);}setCam(m.cam,!!first);}
  {const P=PHASES.find(p=>p.k===m.phase);$('#vpE').textContent=m.vpE||((P.n?'Fase '+P.n+' · ':'')+P.t);}$('#vpS').textContent=m.scene;
  renderPanel();renderNav();if(isMap&&m.drawMap)m.drawMap();
  if(location.hash!=='#'+m.id){UI.hashLock=true;location.hash=m.id;}}

function reloadScene(){const m=G.mod;if(G.no3d)return;clearWorld();try{m.build();finalizeHot();}catch(e){console.error(e);}}

/* gaveta da norma */
function openDrawer(title,html){$('#drT').textContent=title;$('#drB').innerHTML=html;$('#drawer').classList.add('open');$('#drawer').setAttribute('aria-hidden','false');$('#scrim').classList.add('open');$('#drB').scrollTop=0;}
function closeDrawer(){$('#drawer').classList.remove('open');$('#drawer').setAttribute('aria-hidden','true');$('#scrim').classList.remove('open');}
function refHTML(id){const r=REF[id];if(!r)return `<div class="dr-item"><span class="id">${esc(id)}</span><p>Item não incluído na base do simulador.</p></div>`;
  return `<div class="dr-item"><span class="id">${esc(refKey(id))}${r.n?' · nota do simulador':''}</span><h5>${r.t}</h5><p>${r.x}</p></div>`;}
function openRef(id){openDrawer('Texto da norma',refHTML(id)+`<p class="note">Texto da Portaria MTE nº 737/2026 (DOU 01/06/2026). A versão oficial é a publicada no Diário Oficial.</p><button type="button" class="btn" data-index="1">Ver todos os itens</button>`);}
function openIndex(q){const keys=Object.keys(REF);const f=(q||'').toLowerCase().trim();
  const list=keys.filter(k=>!f||(k+' '+refKey(k)+' '+REF[k].t+' '+REF[k].x).toLowerCase().includes(f));
  openDrawer('Consultar norma',`<input class="search" id="refSearch" type="search" placeholder="Buscar: aterramento, PT, 10.13, DDR…" value="${esc(q||'')}" aria-label="Buscar na norma">
  <div id="refList">${list.map(k=>`<div class="dr-item compact" data-ref="${k}" tabindex="0"><span class="id">${esc(refKey(k))}</span><h5>${REF[k].t}</h5><p>${REF[k].x}</p></div>`).join('')||'<p class="lead">Nada encontrado.</p>'}</div>`);
  const s=$('#refSearch');s.addEventListener('input',()=>{const v=s.value;const pos=s.selectionStart;openIndex(v);const n=$('#refSearch');n.focus();try{n.setSelectionRange(pos,pos);}catch(e){}});
  if(q!==undefined)s.focus();}

/* ==================== componentes de tarefa ==================== */
function quiz(el,api,qs,o){o=o||{};let i=0,score=0;const L='ABCDEF';
  function draw(){if(i>=qs.length){el.innerHTML=`<div class="score">${score} de ${qs.length}</div><p class="lead">${score===qs.length?'Tudo certo. As citações de cada resposta estão no histórico abaixo das questões.':'Abra os itens citados nas respostas erradas e refaça.'}</p><div class="row-actions"><button type="button" class="btn" data-a="redo">Refazer</button></div>`;
      api.done();el.querySelector('[data-a=redo]').onclick=()=>{i=0;score=0;draw();};return;}
    const q=qs[i];let answered=false;
    el.innerHTML=`<div class="q"><div class="qn">Questão ${i+1} de ${qs.length}</div><div class="qq">${q.q}</div>${q.o.map((t,j)=>`<button type="button" class="opt" data-j="${j}"><span class="ol">${L[j]}</span><span>${t}</span></button>`).join('')}<div class="qfb"></div></div>`;
    $$('.opt',el).forEach(b=>b.onclick=()=>{if(answered)return;answered=true;const j=+b.dataset.j;const ok=j===q.a;if(ok)score++;else miss(q.r);
      $$('.opt',el).forEach(x=>{x.disabled=true;const jj=+x.dataset.j;if(jj===q.a)x.classList.add('right');else if(jj===j)x.classList.add('wrong');});
      el.querySelector('.qfb').innerHTML=cardHTML({k:ok?'ok':'err',t:ok?'Correto':'Não é essa',b:q.x,r:q.r,gir:q.gir,extra:typeof whyHTML==='function'?whyHTML(q,j):''})+`<div class="row-actions" style="margin-top:8px"><button type="button" class="btn primary" data-a="next">${i+1<qs.length?'Próxima':'Ver resultado'}</button></div>`;
      el.querySelector('[data-a=next]').onclick=()=>{i++;draw();};if(o.onAnswer)o.onAnswer(q,ok);});}
  draw();}

function classify(el,api,c){const id=c.id||('cl'+Math.random().toString(36).slice(2,7));
  el.innerHTML=(c.intro?`<p class="lead">${c.intro}</p>`:'')+`<div class="cl">${c.items.map((it,i)=>`<div class="cl-row" data-i="${i}"><div class="t">${it.t}</div><select id="${id}-${i}" aria-label="Classificação do item ${i+1}"><option value="">Escolha…</option>${c.options.map(o=>`<option value="${o.v}">${o.l}</option>`).join('')}</select></div>`).join('')}</div>
  <div class="row-actions"><button type="button" class="btn primary" data-a="check">${c.btn||'Conferir'}</button><span class="res lead"></span></div>`;
  const missed=new Set();el.querySelector('[data-a=check]').onclick=()=>{let ok=0;$$('.cl-row',el).forEach(row=>{const it=c.items[+row.dataset.i];const v=row.querySelector('select').value;
      const good=v===it.a;if(good)ok++;else if(!missed.has(row.dataset.i)){missed.add(row.dataset.i);miss(it.r);}row.classList.toggle('good',good);row.classList.toggle('bad',!good);
      let ex=row.querySelector('.ex');if(!ex){ex=document.createElement('div');ex.className='ex';row.appendChild(ex);}
      const lab=(c.options.find(o=>o.v===it.a)||{}).l;
      ex.innerHTML=`${good?'✓':'✗ Resposta: <b>'+lab+'</b> ·'} ${it.x||''} ${Rs(it.r)}${it.gir?' <span class="gir">GIR</span>':''}`;});
    el.querySelector('.res').textContent=`${ok} de ${c.items.length} corretas`+(ok<c.items.length?' · ajuste as vermelhas e confira de novo':'');
    if(ok===c.items.length)api.done();if(c.onCheck)c.onCheck(ok);};}

function pickList(el,api,c){const id=c.id||('pk'+Math.random().toString(36).slice(2,7));
  el.insertAdjacentHTML('beforeend',`<div class="pk-wrap">${c.title?`<div class="h3">${c.title}</div>`:''}${c.intro?`<p class="lead">${c.intro}</p>`:''}<div class="pick">${c.items.map((it,i)=>`<label for="${id}-${i}"><input type="checkbox" id="${id}-${i}" data-i="${i}"><span>${it.t}</span></label>`).join('')}</div>
  <div class="row-actions" style="margin-top:8px"><button type="button" class="btn primary">Conferir</button><span class="res lead"></span></div><div class="pk-fb"></div></div>`);
  const w=el.lastElementChild;w.querySelector('button').onclick=()=>{let right=0,wrong=0,miss=0;
    $$('input',w).forEach(inp=>{const it=c.items[+inp.dataset.i];const lab=inp.parentElement;lab.classList.remove('good','bad','miss');
      if(inp.checked&&it.c){lab.classList.add('good');right++;}else if(inp.checked&&!it.c){lab.classList.add('bad');wrong++;}else if(!inp.checked&&it.c){lab.classList.add('miss');miss++;}});
    const all=right===c.items.filter(x=>x.c).length&&wrong===0;if(!all&&!w.dataset.m){w.dataset.m=1;miss(c.r);}
    w.querySelector('.res').textContent=all?'Completo':`${right} certos · ${wrong} indevidos · ${miss} faltando (tracejado)`;
    w.querySelector('.pk-fb').innerHTML=cardHTML({k:all?'ok':'err',t:all?'Conteúdo mínimo completo':'Revise',b:c.x,r:c.r});
    if(all&&c.onDone)c.onDone();};}
