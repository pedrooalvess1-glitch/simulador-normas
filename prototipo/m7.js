/* ===== Camada 7 · Zonas e proximidade ===== */
(()=>{
  let st={row:4,d:1.0,ext:'none',si:false,who:'aut'},O={},seenZ=new Set();
  const EXT={none:['Nenhuma',0,false],tubo:['Tubo de alumínio · 1,0 m',1.0,true],escada:['Escada de alumínio · 1,5 m',1.5,true],vara:['Vara de manobra isolante · 1,0 m',1.0,false]};
  const WHO={aut:['Eletricista autorizado','#1d3a5c',true],aju:['Ajudante sem autorização','#7a5a3a',false],pin:['Pintor · atividade não elétrica','#e9e6df',false]};
  const XS=.14;
  function zoneOf(){const z=ZTAB[st.row];const e=EXT[st.ext];const eff=Math.max(0,st.d-(e[2]?e[1]:0));if(st.si)return {z:'ZL',eff};return {z:eff<=z[2]?'ZR':eff<=z[3]?'ZC':'ZL',eff};}
  function build(){O={};
    const post=grp(0,0,0);cyl(.12,.16,1.0,'#8e979e',0,.5,0,post);for(let i=0;i<5;i++)cyl(.11,.11,.05,'#d8d2c4',0,1.05+i*.075,0,post);
    O.pe=rod([0,1.47,-.9],[0,1.47,.9],.035,'#c27a3a',null,{metalness:.6,roughness:.35});hot(post,'pe','Parte energizada (PE)',{noPin:true});
    const mk=(c,op)=>{const m=new THREE.MeshStandardMaterial({color:c,transparent:true,opacity:op,depthWrite:false,side:THREE.DoubleSide,roughness:1});m.userData.base={e:0,i:1};return m;};
    O.zc=addMesh(new THREE.SphereGeometry(1,48,32),mk('#E3A11B',.13),0,1.47,0);O.zc.castShadow=false;O.zc.receiveShadow=false;O.zc.renderOrder=1;
    O.zr=addMesh(new THREE.SphereGeometry(1,48,32),mk('#C0392B',.24),0,1.47,0);O.zr.castShadow=false;O.zr.receiveShadow=false;O.zr.renderOrder=2;
    const ring=(c)=>{const pts=[];for(let i=0;i<=64;i++){const a=i/64*Math.PI*2;pts.push([Math.cos(a),0,Math.sin(a)]);}const l=line(pts,c);l.position.y=.02;return l;};
    O.rr=ring(0xC0392B);O.rc=ring(0xD98A0B);
    O.plane=new THREE.Plane(new THREE.Vector3(-1,0,0),XS);
    O.si=box(.05,2.8,2.6,'#2f6b5a',XS+.03,1.4,0,null,{transparent:true,opacity:.55});
    O.w=person({x:2,z:-.3,shirt:WHO[st.who][1]});O.w.g.rotation.y=-Math.PI/2;O.w.P.shR.rotation.x=-Math.PI/2;
    O.ext=rod([0,0,0],[1,0,0],.03,'#b9c2c9',null,{metalness:.7,roughness:.3});
    O.dim=line([[0,.03,.75],[1,.03,.75]],0x15202b);
    O.dl=null;O.lr=null;O.lc=null;
    hot(O.w.g,'worker','Trabalhador',{noPin:true});
    update3d();}
  function update3d(){if(!O.zr)return;const z=ZTAB[st.row],e=EXT[st.ext];
    O.zr.scale.setScalar(z[2]);O.zc.scale.setScalar(z[3]);O.rr.scale.set(z[2],1,z[2]);O.rc.scale.set(z[3],1,z[3]);
    const clip=st.si?[O.plane]:null;O.zr.material.clippingPlanes=clip;O.zc.material.clippingPlanes=clip;O.zr.material.needsUpdate=true;O.zc.material.needsUpdate=true;O.si.visible=st.si;
    const L=e[1],handX=st.d;O.w.g.position.x=handX+.65;
    const r=zoneOf();const col=WHO[st.who][1];[O.w.P.torso,O.w.P.armL,O.w.P.armR].forEach(m=>m.material.color.set(col));
    const tint=r.z==='ZR'?0xC0392B:r.z==='ZC'?0xD98A0B:0;setEm(O.w.g,tint,tint?.22:1);
    O.ext.visible=L>0;if(L>0){O.ext.position.set(handX-L/2,1.47,0);O.ext.scale.set(1,L,1);O.ext.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(-1,0,0));
      O.ext.material.color.set(e[2]?'#b9c2c9':'#e6c229');}
    const tip=e[2]?Math.max(0,handX-L):handX;O.dim.geometry.setFromPoints([new THREE.Vector3(0,.03,.75),new THREE.Vector3(tip,.03,.75)]);
    [O.dl,O.lr,O.lc].forEach(s=>{if(s){G.world.remove(s);s.material.map.dispose();s.material.dispose();}});
    O.dl=label([`d = ${fmt(tip)} m`],tip/2,.3,.75,null,{s:.24});O.lr=label([`Rr ${fmt(z[2])} m`],0,1.47+z[2]+.12,0,null,{s:.22,bg:'rgba(192,57,43,.92)'});O.lc=label([`Rc ${fmt(z[3])} m`],0,1.47+z[3]+.14,0,null,{s:.22,bg:'rgba(176,112,8,.92)'});}
  function camFor(){const z=ZTAB[st.row];return {theta:.32,phi:1.18,r:Math.max(6.5,z[3]*2.6+3.5),t:[Math.min(z[3],3)*.55,1.25,0],rMax:40};}
  function req(){const z=ZTAB[st.row];const r=zoneOf();const mtat=st.row>=1;const aut=WHO[st.who][2];const nonEl=st.who==='pin';const out=[];
    out.push(`<div class="tile full ${r.z==='ZL'?'good':r.z==='ZR'||!aut?'alert':''}"><span class="tk">Onde está a ponta mais próxima</span><div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span class="zone-pill z-${r.z}">${r.z}</span><span class="ts num">a ${fmt(r.eff)} m da PE · Rr ${fmt(z[2])} m · Rc ${fmt(z[3])} m ${R('AII')}</span></div></div>`);
    if(EXT[st.ext][1]>0)out.push(`<div class="tile full"><span class="tk">Extensão</span><span class="ts">${EXT[st.ext][2]?`Extensão condutora conta como parte do corpo: a aproximação é medida pela ponta. ${R('10.2.2')}${R('g-prox')}`:`Vara isolante não é extensão condutora. Para MT/AT, ferramentas isolantes passam por ensaio dielétrico. ${R('10.14.4')}`}</span></div>`);
    if(st.si)out.push(`<div class="tile full good"><span class="tk">Superfície isolante interposta</span><span class="ts">Com separação física adequada, o lado oposto é zona livre (Figura 2 do Anexo II).</span></div>`);
    if(r.z==='ZL'){out.push(`<div class="tile full"><span class="tk">Zona livre</span><span class="ts">${nonEl?`Atividade não elétrica na vizinhança da ZC: análise de risco e instrução formal. ${R('10.14.1.2')} EPI de arco pode ser dispensado se a análise de risco indicar ausência de exposição. ${R('10.11.2.4')}`:'Sem entrada na zona controlada.'} A norma vale mesmo aqui se houver exposição ao arco. ${R('10.2.3')}</span></div>`);}
    else{if(!aut)out.push(`<div class="tile full alert"><span class="tk">Irregular</span><span class="ts">${WHO[st.who][0]} não pode estar na ${r.z==='ZC'?'zona controlada':'zona de risco'}. Trabalho em proximidade por quem não atende ao 10.10 é grave e iminente risco. ${R('10.10.2')}${R('10.16.1')}</span></div>`);
      out.push(`<div class="tile full"><span class="tk">${r.z==='ZC'?'Zona controlada · trabalho em proximidade':'Zona de risco'}</span><span class="ts">${r.z==='ZC'?`Só profissionais autorizados. ${R('g-zc')}${R('10.2.2')}${R('10.10.2')}`:`Só autorizados, com técnicas e instrumentos apropriados. ${R('g-zr')}`}</span></div>`);
      if(r.z==='ZR'&&mtat)out.push(`<div class="tile full"><span class="tk">Energizado em MT/AT dentro da ZR</span><ul><li>Bloquear o religamento automático e sinalizar a desativação ${R('10.14.3')}${R('10.14.3.1')}</li><li>Nunca individualmente ${R('10.14.2')}</li><li>Ferramentas e dispositivos isolantes com ensaio dielétrico ${R('10.14.4')}</li></ul></div>`);
      if(r.z==='ZR'&&!mtat)out.push(`<div class="tile full"><span class="tk">Energizado em BT dentro da ZR</span><span class="ts">Luvas e mangas isolantes com ensaio dielétrico em dia; EPI de arco pela categoria do Anexo IV. ${R('10.14.4')}${R('10.11.2')}</span></div>`);}
    seenZ.add(r.z);return out.join('');}
  const QS=[
    {q:'Rede de 13,8 kV. Um pintor está a 1,0 m da parte energizada.',o:['Zona livre: pode trabalhar','Zona controlada: só trabalhador autorizado pode estar ali','Zona de risco'],a:1,x:'Faixa ≥ 10 e < 15 kV: Rr 0,38 m e Rc 1,38 m. 1,0 m está entre os dois: zona controlada, cuja aproximação só é permitida a profissionais autorizados (glossário). O pintor ali está em trabalho em proximidade sem atender ao capítulo 10.10: grave e iminente risco (10.16.1 c).',r:['AII','g-zc','10.2.2','10.16.1']},
    {q:'QGBT de 380 V. Eletricista a 0,50 m do barramento, segurando um tubo de alumínio de 0,40 m apontado para ele.',o:['ZL','ZC','ZR'],a:2,x:'Extensão condutora conta: a ponta fica a 0,10 m, dentro de Rr = 0,20 m.',r:['10.2.2','AII']},
    {q:'Linha de 138 kV. A ponta da lança de um caminhão guindauto chega a 3,0 m do condutor.',o:['ZL','ZC','ZR'],a:1,x:'Faixa ≥ 132 e < 150 kV: Rr 1,20 m e Rc 3,20 m. A lança metálica é extensão condutora, então o operador está em trabalho em proximidade.',r:['AII','g-prox']},
    {q:'Cubículo de 13,8 kV com superfície isolante adequada entre a parte viva e o trabalhador, que está a 0,30 m do outro lado.',o:['ZR','ZC','ZL'],a:2,x:'Pela Figura 2 do Anexo II, do lado oposto da superfície isolante (SI) a região é zona livre. A legenda define a SI: superfície isolante construída com material resistente e dotada de todos os dispositivos de segurança.',r:['AII']},
    {q:'Intervenção energizada em 13,8 kV dentro da zona de risco. O religador do alimentador está em automático.',o:['Pode seguir com EPI adequado','Desativar (bloquear) o religamento automático e sinalizar essa condição antes de intervir','Basta avisar o centro de operação'],a:1,r:['10.14.3','10.14.3.1']},
    {q:'Uma pessoa sem treinamento liga o disjuntor de iluminação num quadro de BT projetado para operação segura.',o:['Proibido: só autorizados','Permitido: é operação elementar','Exige permissão de trabalho'],a:1,r:['10.14.1.1','g-opel']}];
  function onPick(id){if(id==='pe'){fb({k:'info',t:'Parte energizada',b:'O centro das esferas. Em sistema trifásico, a faixa da tabela usa a tensão entre fases.',r:['AII']});return true;}
      if(id==='worker'){const r=zoneOf();toast(`${WHO[st.who][0]} · ${r.z}`);return true;}return false;}
  const ZQ=QS.slice(0,4).concat([{q:'Operador a 2,0 m de um CCM de 480 V com a porta aberta. Está fora da zona controlada (Rc 0,70 m), mas exposto a arco. A NR-10 se aplica a ele?',o:['Não: está fora da ZC','Sim: a norma vale onde há exposição ao arco, mesmo sem entrada na ZC'],a:1,x:'Choque depende de contato; arco irradia energia a distância. Por isso o 10.2.3 estende o alcance da norma para além da geometria das zonas.',r:['10.2.3','g-dseg']}]);
  const EQ=[QS[4],QS[5],
    {q:'Serviço energizado em 13,8 kV na cabine de uma indústria (SEC). Um eletricista pode fazê-lo sozinho?',o:['Sim, se for PLH','Não: serviço energizado em MT/AT nunca é individual'],a:1,x:'Quem está sozinho não tem quem desligue a fonte, chame socorro ou faça o resgate. O 10.14.2 vale para MT/AT energizada e para todo serviço no SEP.',r:['10.14.2']},
    {q:'Sem outra previsão em regulamento, fabricante ou critério do PLH, com que frequência se ensaiam luvas isolantes de BT?',o:['A cada 2 anos','Anualmente','Só quando apresentarem defeito'],a:1,x:'Vale o menor intervalo entre regulamentações, fabricante e PLH; na ausência de previsão, anual. Não ensaiar é GIR.',r:['10.14.4','10.14.4.1','10.16.1']},
    {q:'Ensaios elétricos de campo e o comissionamento de uma instalação seguem qual regime?',o:['Livre, pois a instalação ainda não opera','O do 10.14 (energizado), sob responsabilidade de PLH, realizados por profissional autorizado'],a:1,r:['10.12.9','10.14.1']},
    {q:'O eletricista no pátio não vê o colega na sala de comando. O que a norma exige?',o:['Nada, se houver procedimento','Equipamentos de comunicação em perfeito estado, com comunicação permanente com a equipe e a sala de comando'],a:1,r:['10.12.4','10.12.4.1']},
    {q:'Uma fábrica tem cogeração própria. O que ela precisa garantir em relação à rede?',o:['Nada, a concessionária se protege','Medidas que impeçam a energização de instalações de outras organizações, salvo condições autorizadas pela ANEEL'],a:1,x:'É o retorno de tensão pela rede, que pega desprevenido quem trabalha num circuito que deveria estar sem fonte.',r:['10.14.5']},
    {q:'Um circuito foi desligado, mas um gerador portátil pode realimentá-lo. Como ele deve ser tratado?',o:['Como desenergizado','Como energizado, seguindo o capítulo 10.14, até que toda a sequência de desenergização seja cumprida'],a:1,r:['10.5.2','10.13.1']}];
  const zonas={id:'zonas',phase:'I',name:'Zonas e alcance da norma',short:'Zonas',scene:'Esferas do Anexo II em escala real',primer:{logic:"O alcance da norma sobre a pessoa é geométrico. Em volta de cada parte energizada há duas esferas: a zona de risco e a zona controlada. Quem pode entrar na zona controlada, com o corpo ou com uma extensão condutora, está em trabalho em proximidade e precisa ser autorizado. O arco é a exceção: a norma alcança quem está exposto a ele mesmo fora da ZC.",links:[["pessoas", "Quem trabalha em proximidade entra na lista de autorizados.", ["10.10.2"]], ["desenergizado", "A etapa (e) protege o que continua energizado dentro da ZC.", ["10.13.1"]], ["energizado", "Dentro da ZR, em MT/AT, o religamento automático é bloqueado.", ["10.14.3"]], ["documentacao", "Não autorizado na ZC é grave e iminente risco.", ["10.16.1"]]]},
    brief:'As zonas de risco e controlada são esferas em torno da parte energizada, com raios que dependem da tensão. Aqui elas estão desenhadas em metros reais. Mova o trabalhador, dê a ele uma extensão e veja o que muda.',
    base:['AII','g-zr','g-zc','g-zl','10.2.2','10.2.3'],
    cam:camFor(),reset(){this.cam=camFor();},build,onPick,
    tasks:[{id:'a',title:'Bancada',render(el,api){
        el.innerHTML=`<p class="lead">Ajuste os controles. As esferas e o trabalhador na cena acompanham. Passe pelas três zonas para concluir.</p>
        <div class="form"><div class="fld full"><label for="z-row">Tensão nominal da instalação</label><select id="z-row">${ZTAB.map((z,i)=>`<option value="${i}" ${i===st.row?'selected':''}>${z[4]}${z[5]?' · ex.: '+z[5]:''}</option>`).join('')}</select></div>
        <div class="fld full"><label for="z-d">Distância da mão à parte energizada: <b class="num" id="z-dv">${fmt(st.d)} m</b></label><input type="range" id="z-d" min="0.05" max="9" step="0.05" value="${st.d}"></div>
        <div class="fld"><label for="z-ext">Na mão</label><select id="z-ext">${Object.entries(EXT).map(([k,v])=>`<option value="${k}" ${k===st.ext?'selected':''}>${v[0]}</option>`).join('')}</select></div>
        <div class="fld"><label for="z-who">Quem</label><select id="z-who">${Object.entries(WHO).map(([k,v])=>`<option value="${k}" ${k===st.who?'selected':''}>${v[0]}</option>`).join('')}</select></div>
        <label class="chk full"><input type="checkbox" id="z-si" ${st.si?'checked':''}> Superfície isolante entre a parte viva e o trabalhador</label></div>
        <div class="out" id="z-out"></div><div class="prog" id="z-p"></div>`;
        const upd=(recam)=>{st.row=+$('#z-row',el).value;st.d=Math.max(st.si?XS+.06:.05,parseFloat($('#z-d',el).value));st.ext=$('#z-ext',el).value;st.who=$('#z-who',el).value;st.si=$('#z-si',el).checked;
          $('#z-dv',el).textContent=fmt(st.d)+' m';update3d();if(recam&&!G.no3d)setCam(camFor());
          $('#z-out',el).innerHTML=req();$('#z-p',el).innerHTML=`Zonas visitadas: <b>${['ZR','ZC','ZL'].filter(z=>seenZ.has(z)).join(' · ')||'—'}</b>`;if(seenZ.has('ZR')&&seenZ.has('ZC')&&seenZ.has('ZL'))api.done();};
        $('#z-row',el).addEventListener('change',()=>upd(true));['#z-d','#z-ext','#z-who','#z-si'].forEach(s=>$(s,el).addEventListener('input',()=>upd(false)));upd(false);}},
      {id:'b',title:'Situações',render(el,api){quiz(el,api,ZQ);}}]};
  const energizado={id:'energizado',phase:'III',name:'Energizado e proximidade',short:'Energizado',scene:'Parte energizada e zonas',primer:{logic:"Quando não dá para desenergizar, a norma aperta as condições: só trabalhadores autorizados; nunca sozinho em MT/AT ou no SEP; religamento automático bloqueado e sinalizado dentro da ZR em MT/AT; ferramentas, luvas e mangas com ensaio dielétrico. No outro extremo, operações elementares em BT, em equipamento feito para isso, ficam livres para qualquer pessoa.",links:[["zonas", "ZR e ZC definem até onde cada regra alcança.", ["AII"]], ["pessoas", "Só autorizados atuam.", ["10.14.1", "10.10.2"]], ["organizacao", "Atividade não elétrica na vizinhança da ZC pede análise de risco e instrução formal.", ["10.14.1.2"]], ["documentacao", "Ensaio dielétrico não realizado é GIR.", ["10.16.1"]]]},
    brief:'Quando a instalação não pode ser desenergizada, ou ainda pode ser energizada por qualquer meio, valem as regras do 10.14. Aqui estão elas, com os pontos do 10.12 que valem em qualquer estado.',
    base:['10.5.2','10.14.1','10.14.2','10.14.3','10.14.4','10.12.1'],
    cam:camFor(),reset(){this.cam=camFor();},build,onPick,
    tasks:[{id:'a',title:'Regras',render(el,api){quiz(el,api,EQ);}},
      {id:'b',title:'Bancada',render(el,api){
        el.innerHTML=`<p class="lead">Ajuste os controles. As esferas e o trabalhador na cena acompanham. Passe pelas três zonas para concluir.</p>
        <div class="form"><div class="fld full"><label for="z-row">Tensão nominal da instalação</label><select id="z-row">${ZTAB.map((z,i)=>`<option value="${i}" ${i===st.row?'selected':''}>${z[4]}${z[5]?' · ex.: '+z[5]:''}</option>`).join('')}</select></div>
        <div class="fld full"><label for="z-d">Distância da mão à parte energizada: <b class="num" id="z-dv">${fmt(st.d)} m</b></label><input type="range" id="z-d" min="0.05" max="9" step="0.05" value="${st.d}"></div>
        <div class="fld"><label for="z-ext">Na mão</label><select id="z-ext">${Object.entries(EXT).map(([k,v])=>`<option value="${k}" ${k===st.ext?'selected':''}>${v[0]}</option>`).join('')}</select></div>
        <div class="fld"><label for="z-who">Quem</label><select id="z-who">${Object.entries(WHO).map(([k,v])=>`<option value="${k}" ${k===st.who?'selected':''}>${v[0]}</option>`).join('')}</select></div>
        <label class="chk full"><input type="checkbox" id="z-si" ${st.si?'checked':''}> Superfície isolante entre a parte viva e o trabalhador</label></div>
        <div class="out" id="z-out"></div><div class="prog" id="z-p"></div>`;
        const upd=(recam)=>{st.row=+$('#z-row',el).value;st.d=Math.max(st.si?XS+.06:.05,parseFloat($('#z-d',el).value));st.ext=$('#z-ext',el).value;st.who=$('#z-who',el).value;st.si=$('#z-si',el).checked;
          $('#z-dv',el).textContent=fmt(st.d)+' m';update3d();if(recam&&!G.no3d)setCam(camFor());
          $('#z-out',el).innerHTML=req();$('#z-p',el).innerHTML=`Zonas visitadas: <b>${['ZR','ZC','ZL'].filter(z=>seenZ.has(z)).join(' · ')||'—'}</b>`;if(seenZ.has('ZR')&&seenZ.has('ZC')&&seenZ.has('ZL'))api.done();};
        $('#z-row',el).addEventListener('change',()=>upd(true));['#z-d','#z-ext','#z-who','#z-si'].forEach(s=>$(s,el).addEventListener('input',()=>upd(false)));upd(false);}}]};
  QB.add('zonas',ZQ);QB.add('energizado',EQ);
  MODS.push(zonas,energizado);})();
