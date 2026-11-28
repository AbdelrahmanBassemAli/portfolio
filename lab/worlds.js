"use strict";
/* Mission Lab v24: track worlds. Each area gets its own background (canvas + CSS), accent colours and teaching style.
   Additive. 30 fps cap, pauses when hidden, static frame under reduced motion, auto-degrades on slow devices. */
(function(){
const RMq=matchMedia("(prefers-reduced-motion: reduce)");
const L=()=>((typeof LANG!=="undefined"&&LANG)||document.documentElement.lang||"en")==="ar"?"ar":"en";
const WORLDS={
 home:{},
 ow:{i:"📡",en:["Mission Control","Practice like an interview"],ar:["مركز التحكم","تدرّب كأنها مقابلة"],
  teachEn:["Interview coach","Say it out loud in 60 seconds: answer, example, result. Use your own real experience."],
  teachAr:["مدرب المقابلات","قولها بصوت عالي في ٦٠ ثانية: الإجابة، مثال، النتيجة. استخدم خبرتك الحقيقية."],
  move:{en:["🎤","60-second drill","Say this lesson out loud like you are answering the interviewer: answer first, one example, then the result."],ar:["🎤","تمرين ٦٠ ثانية","قول الدرس ده بصوت عالي كأنك بترد على المحاور: الإجابة الأول، مثال واحد، وبعدين النتيجة."]},
  rail:{en:["Answer first","One example","Result","Stop at 60s"],ar:["الإجابة الأول","مثال واحد","النتيجة","وقف عند ٦٠ ثانية"]},
  lbl:{why:["🎯","Why they ask","ليه بيسألوا"],mist:["🚫","Red flag answer","إجابة تقلق"],tryit:["🎤","Say it aloud","قولها بصوت عالي"],fun:["💬","Power phrase","جملة قوية"]}},
 robotics:{i:"🛠",en:["The Workshop","Build it, wire it, test it"],ar:["الورشة","ابنيه، وصّله، جرّبه"],
  teachEn:["Learn by building","Every idea is a bench job: parts, wire, code, test. If it does not work, check the wiring first."],
  teachAr:["اتعلم بالبناء","كل فكرة شغلانة على الورشة: قطع، توصيل، كود، اختبار. لو مشتغلش راجع التوصيل الأول."],
  move:{en:["🛠","Bench challenge","Change one number or pin in the code, run it, and see what moves. Then break it on purpose and fix it. That is how it sticks."],ar:["🛠","تحدي الورشة","غيّر رقم أو دبوس واحد في الكود وشغّله وشوف إيه اللي اتغير. وبعدين اكسره عمدًا وصلّحه. كده بتثبت."]},
  rail:{en:["Parts","Wire","Code","Test"],ar:["القطع","التوصيل","الكود","الاختبار"]},
  lbl:{why:["🔧","What it does on the bench","بتعمل إيه على الورشة"],mist:["⚡","Smoke test: what breaks","اختبار الدخان: إيه اللي بيعطل"],tryit:["🛠","Build step","خطوة البناء"],fun:["💡","Workshop tip","نصيحة الورشة"]}},
 space:{i:"🪐",en:["Deep Space","Picture first, then the numbers"],ar:["الفضاء العميق","الصورة أولا، وبعدين الأرقام"],
  teachEn:["Learn like a mission","Start with the big picture and a story, then the numbers, then fly it yourself in the simulator."],
  teachAr:["اتعلم زي مهمة فضائية","ابدأ بالصورة الكبيرة وحكاية، بعدين الأرقام، وبعدين طيّرها بنفسك في المحاكي."],
  move:{en:["🚀","Mission challenge","Guess the answer in your head first. Then open the simulator or reels and check how close you were."],ar:["🚀","تحدي المهمة","خمّن الإجابة في دماغك الأول. وبعدين افتح المحاكي أو الريلز وشوف قربت قد إيه."]},
  rail:{en:["Big picture","The story","The numbers","Fly it"],ar:["الصورة الكبيرة","الحكاية","الأرقام","طيّرها"]},
  lbl:{why:["🌍","The big picture","الصورة الكبيرة"],mist:["🛰","Space myth","خرافة فضائية"],tryit:["🚀","Fly it yourself","طيّرها بنفسك"],fun:["✨","Astro fact","معلومة فلكية"]}},
 ai:{i:"🧠",en:["The Notebook","Idea, predict, run, check"],ar:["الدفتر","فكرة، توقّع، شغّل، اتأكد"],
  teachEn:["Learn like a data scientist","Read the idea, guess the output, run the cell, then check if you were right."],
  teachAr:["اتعلم زي عالم بيانات","اقرا الفكرة، خمّن الناتج، شغّل الخلية، وبعدين اتأكد إنت صح ولا لأ."],
  move:{en:["▶","Predict, then run","Write down what you expect the output to be. Run the code. If it differs, find out why. That gap is the lesson."],ar:["▶","توقّع وبعدين شغّل","اكتب الناتج اللي متوقعه. شغّل الكود. لو اختلف، دوّر ليه. الفرق ده هو الدرس."]},
  rail:{en:["Idea","Predict","Run","Check"],ar:["الفكرة","توقّع","شغّل","اتأكد"]},
  lbl:{why:["💡","Idea","الفكرة"],mist:["🐛","Bug hunt","صيد الأخطاء"],tryit:["▶","Run the cell","شغّل الخلية"],fun:["📊","Output","الناتج"]}}
};
const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
let cv=$("#worldCv");if(!cv){cv=document.createElement("canvas");cv.id="worldCv";cv.setAttribute("aria-hidden","true");document.body.insertBefore(cv,document.body.firstChild)}
let deco=$("#worldDeco");if(!deco){deco=document.createElement("div");deco.id="worldDeco";deco.setAttribute("aria-hidden","true");deco.innerHTML='<i id="wdPlanet"></i>';document.body.insertBefore(deco,document.body.firstChild)}
const ctx=cv.getContext("2d");
let W=0,H=0,world="home",scene=null,raf=0,last=0,slow=0,frames=0,lite=false,t0=0;
const mobile=()=>Math.min(innerWidth,innerHeight)<700;
const rnd=(a,b)=>a+Math.random()*(b-a);
function fit(){const d=1;W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;if(scene)build(world)}

/* ---------- scenes ---------- */
function build(w){
  const n=lite?.5:1,m=mobile()?.6:1,k=n*m;scene={w,parts:[]};
  if(w==="robotics"){
    const g=44,cols=Math.ceil(W/g),rows=Math.ceil(H/g),N=Math.round(16*k+4);
    scene.traces=[];
    for(let i=0;i<N;i++){let x=Math.floor(rnd(0,cols)),y=Math.floor(rnd(0,rows)),pts=[[x,y]],dir=Math.random()<.5?0:1;
      const segs=Math.floor(rnd(3,7));
      for(let s=0;s<segs;s++){const len=Math.floor(rnd(2,7))*(Math.random()<.5?-1:1);if(dir===0)x+=len;else y+=len;x=Math.max(0,Math.min(cols,x));y=Math.max(0,Math.min(rows,y));pts.push([x,y]);dir^=1}
      const P=pts.map(p=>[p[0]*g+.5,p[1]*g+.5]);let len=0;const cum=[0];for(let j=1;j<P.length;j++){len+=Math.abs(P[j][0]-P[j-1][0])+Math.abs(P[j][1]-P[j-1][1]);cum.push(len)}
      scene.traces.push({P,len:len||1,cum,p:Math.random(),sp:rnd(.05,.12),led:Math.random()<.35,ph:Math.random()*6,col:Math.random()<.7?"255,179,71":"109,255,160"})}
  }
  if(w==="ai"){
    const layers=mobile()?[3,5,5,3]:[4,7,8,7,4];const lx=layers.map((_,i)=>W*(.08+.84*i/(layers.length-1)));
    scene.nodes=layers.map((c,i)=>Array.from({length:c},(_,j)=>({x:lx[i]+rnd(-14,14),y:H*(.12+.76*(j+.5)/c)+rnd(-10,10),r:rnd(3,5.5),ph:rnd(0,6)})));
    scene.edges=[];for(let i=0;i<layers.length-1;i++)scene.nodes[i].forEach(a=>scene.nodes[i+1].forEach(b=>{if(Math.random()<(lite?.45:.7))scene.edges.push({a,b})}));
    scene.pulses=Array.from({length:Math.round(14*k)},()=>({e:null,p:Math.random(),sp:rnd(.25,.5)}));scene.pulses.forEach(p=>p.e=scene.edges[Math.floor(Math.random()*scene.edges.length)]);
    const toks=["def","import","print()","for i in","return","if x>0:","X_train","fit()","predict()","np.array","loss","lr=0.01","class","0.97","[1,2,3]","# TODO"];
    scene.toks=Array.from({length:Math.round(16*k)},()=>({s:toks[Math.floor(Math.random()*toks.length)],x:rnd(0,W),y:rnd(0,H),v:rnd(8,22),a:rnd(.07,.16),f:rnd(11,15)}));
  }
  if(w==="space"){
    scene.sh=[];scene.sat={a:0};scene.stars=Array.from({length:Math.round(70*k)},()=>({x:rnd(0,W),y:rnd(0,H*.8),r:rnd(.4,1.6),p:rnd(0,6),s:rnd(.6,2)}));
  }
  if(w==="ow"){
    scene.blips=Array.from({length:Math.round(7*k)+2},()=>({a:rnd(0,6.28),r:rnd(.15,.95),ph:0}));scene.ang=0;
  }
}
function drawScene(dt,t,still){
  ctx.clearRect(0,0,W,H);if(!scene)return;const s=scene;
  if(s.w==="robotics"){
    for(const tr of s.traces){
      ctx.strokeStyle="rgba("+tr.col+",.16)";ctx.lineWidth=2;ctx.beginPath();tr.P.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();
      ctx.fillStyle="rgba("+tr.col+",.35)";const a=tr.P[0],b=tr.P[tr.P.length-1];ctx.beginPath();ctx.arc(a[0],a[1],4,0,7);ctx.arc(b[0],b[1],4,0,7);ctx.fill();
      if(!still)tr.p=(tr.p+dt*tr.sp)%1;const d=tr.p*tr.len;let j=1;while(j<tr.cum.length-1&&tr.cum[j]<d)j++;
      const f=(d-tr.cum[j-1])/((tr.cum[j]-tr.cum[j-1])||1),x=tr.P[j-1][0]+(tr.P[j][0]-tr.P[j-1][0])*f,y=tr.P[j-1][1]+(tr.P[j][1]-tr.P[j-1][1])*f;
      const gr=ctx.createRadialGradient(x,y,0,x,y,12);gr.addColorStop(0,"rgba("+tr.col+",.95)");gr.addColorStop(1,"rgba("+tr.col+",0)");ctx.fillStyle=gr;ctx.beginPath();ctx.arc(x,y,12,0,7);ctx.fill();
      if(tr.led){const on=still||Math.sin(t*2+tr.ph)>0;ctx.fillStyle=on?"rgba(109,255,160,.9)":"rgba(109,255,160,.15)";ctx.beginPath();ctx.arc(b[0],b[1],4.5,0,7);ctx.fill()}
    }
  }else if(s.w==="ai"){
    ctx.lineWidth=1;ctx.strokeStyle="rgba(111,183,255,.24)";ctx.beginPath();for(const e of s.edges){ctx.moveTo(e.a.x,e.a.y);ctx.lineTo(e.b.x,e.b.y)}ctx.stroke();
    for(const L of s.nodes)for(const n of L){const g=.5+.5*Math.sin(t*1.5+n.ph);ctx.fillStyle="rgba(255,212,59,"+(still?.6:.35+.45*g)+")";ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,7);ctx.fill();ctx.strokeStyle="rgba(111,183,255,.4)";ctx.beginPath();ctx.arc(n.x,n.y,n.r+3,0,7);ctx.stroke()}
    for(const p of s.pulses){if(!still){p.p+=dt*p.sp;if(p.p>1){p.p=0;p.e=s.edges[Math.floor(Math.random()*s.edges.length)]}}const e=p.e;if(!e)continue;const x=e.a.x+(e.b.x-e.a.x)*p.p,y=e.a.y+(e.b.y-e.a.y)*p.p;const gr=ctx.createRadialGradient(x,y,0,x,y,9);gr.addColorStop(0,"rgba(255,212,59,.95)");gr.addColorStop(1,"rgba(255,212,59,0)");ctx.fillStyle=gr;ctx.beginPath();ctx.arc(x,y,9,0,7);ctx.fill()}
    for(const k of s.toks){if(!still){k.y-=dt*k.v;if(k.y<-20){k.y=H+20;k.x=rnd(0,W)}}ctx.font=k.f+"px ui-monospace,Menlo,monospace";ctx.fillStyle="rgba(125,255,178,"+k.a+")";ctx.fillText(k.s,k.x,k.y)}
  }else if(s.w==="space"){
    for(const st of s.stars){ctx.fillStyle="rgba(255,255,255,"+(.3+.5*(still?.6:.5+.5*Math.sin(t*st.s+st.p)))+")";ctx.beginPath();ctx.arc(st.x,st.y,st.r,0,7);ctx.fill()}
    const cx=W/2,cy=H+H*.38,rx=Math.max(W,H)*.78,ry=rx*.2;if(!still)s.sat.a+=dt*.12;
    ctx.strokeStyle="rgba(127,212,255,.22)";ctx.setLineDash([3,9]);ctx.lineWidth=1.2;ctx.beginPath();ctx.ellipse(cx,H*.82,Math.min(W*.46,rx),H*.11,-.08,0,7);ctx.stroke();ctx.setLineDash([]);
    const sx=cx+Math.cos(s.sat.a)*Math.min(W*.46,rx),sy=H*.82+Math.sin(s.sat.a)*H*.11;ctx.save();ctx.translate(sx,sy);ctx.fillStyle="#ffd479";ctx.fillRect(-4,-2.5,8,5);ctx.fillStyle="#7fd4ff";ctx.fillRect(-12,-1.5,7,3);ctx.fillRect(5,-1.5,7,3);ctx.restore();
    if(!still){if(Math.random()<dt*.35)s.sh.push({x:rnd(0,W*.8),y:rnd(0,H*.35),l:0});for(const m of s.sh){m.l+=dt*1.3;const x=m.x+m.l*260,y=m.y+m.l*130,a=Math.max(0,1-m.l);const g=ctx.createLinearGradient(x,y,x-90,y-45);g.addColorStop(0,"rgba(255,255,255,"+a+")");g.addColorStop(1,"rgba(255,255,255,0)");ctx.strokeStyle=g;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-90,y-45);ctx.stroke()}s.sh=s.sh.filter(m=>m.l<1)}
  }else if(s.w==="ow"){
    const cx=W*(mobile()?.5:.72),cy=H*.5,R=Math.max(W,H)*.62;if(!still)s.ang+=dt*.9;
    ctx.lineWidth=1;ctx.strokeStyle="rgba(79,243,200,.12)";for(let i=1;i<=5;i++){ctx.beginPath();ctx.arc(cx,cy,R*i/5,0,7);ctx.stroke()}
    ctx.beginPath();ctx.moveTo(cx-R,cy);ctx.lineTo(cx+R,cy);ctx.moveTo(cx,cy-R);ctx.lineTo(cx,cy+R);ctx.stroke();
    for(let i=0;i<40;i++){const a=s.ang-i*.03;ctx.strokeStyle="rgba(79,243,200,"+(.22*(1-i/40))+")";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);ctx.stroke()}
    for(const b of s.blips){const d=((s.ang-b.a)%6.2832+6.2832)%6.2832;const al=still?.6:Math.max(0,1-d/3.2);if(al<=0)continue;ctx.fillStyle="rgba(255,157,92,"+al+")";ctx.beginPath();ctx.arc(cx+Math.cos(b.a)*R*b.r,cy+Math.sin(b.a)*R*b.r,4,0,7);ctx.fill();ctx.strokeStyle="rgba(255,157,92,"+al*.5+")";ctx.beginPath();ctx.arc(cx+Math.cos(b.a)*R*b.r,cy+Math.sin(b.a)*R*b.r,9,0,7);ctx.stroke()}
  }
}
function loop(ts){
  raf=requestAnimationFrame(loop);
  if(document.hidden||!scene)return;
  const dtm=ts-last;if(dtm<32)return;last=ts;
  const dt=Math.min(.08,dtm/1000);
  if(!lite){frames++;if(dtm>55)slow++;if(frames===90){if(slow>20){lite=true;build(world)}frames=0;slow=0}}
  drawScene(dt,ts/1000,false);
}
function start(){cancelAnimationFrame(raf);if(!scene)return;if(RMq.matches){drawScene(0,0,true);return}last=0;raf=requestAnimationFrame(loop)}

/* ---------- world switching ---------- */
function labelFor(){return WORLDS[world]||{}}
function applyTeach(){
  const wd=WORLDS[world]||{},lang=L();
  $$(".ts-banner").forEach(b=>b.remove());
  const area=$("#area-"+world);
  if(wd.teachEn&&area){
    const t=lang==="ar"?wd.teachAr:wd.teachEn;
    const el=document.createElement("div");el.className="ts-banner";el.innerHTML='<i aria-hidden="true">'+wd.i+'</i><div><b>'+t[0]+'</b><span>'+t[1]+'</span></div>';
    area.insertBefore(el,area.firstChild);
  }
  // per lesson: step rail + relabelled rows
  $$(".lesson").forEach(les=>{
    const inA=les.closest(".area");const id=inA&&inA.id.replace("area-","");const w=WORLDS[id];if(!w||!w.rail)return;
    const body=$(".l-body",les);if(!body)return;
    let rail=$(".ts-rail",body);
    if(!rail||rail.dataset.l!==lang+id){if(rail)rail.remove();rail=document.createElement("ul");rail.className="ts-rail";rail.dataset.l=lang+id;rail.innerHTML=w.rail[lang].map(x=>"<li>"+x+"</li>").join("");body.insertBefore(rail,body.firstChild)}
    let mv=$(".ts-move",body);
    if(w.move&&(!mv||mv.dataset.l!==lang+id)){if(mv)mv.remove();const m=w.move[lang];mv=document.createElement("div");mv.className="ts-move";mv.dataset.l=lang+id;mv.innerHTML='<i aria-hidden="true">'+m[0]+'</i><div><b>'+m[1]+'</b><p>'+m[2]+'</p></div>';body.appendChild(mv)}
    $$(".gd-row",body).forEach(r=>{const key=["why","mist","try","fun"].find(k=>r.classList.contains("gd-"+k));if(!key||r.classList.contains("gd-q"))return;const lb=w.lbl[key==="try"?"tryit":key];if(!lb)return;const ic=$("i",r),b=$("b",r);const want=lb[1+(lang==="ar"?1:0)];if(b&&b.textContent!==want){b.textContent=want;if(ic)ic.textContent=lb[0]}});
  });
}
let enterT=0;
function announce(w){
  const wd=WORLDS[w];if(!wd||!wd.en)return;let el=$("#worldEnter");if(!el){el=document.createElement("div");el.id="worldEnter";el.setAttribute("role","status");document.body.appendChild(el)}
  const lang=L();el.innerHTML="<i aria-hidden='true'>"+wd.i+"</i><div>"+wd[lang][0]+"<small>"+wd[lang][1]+"</small></div>";
  el.classList.remove("go");void el.offsetWidth;el.classList.add("go");
  let fl=$("#worldFlash");if(!fl){fl=document.createElement("div");fl.id="worldFlash";document.body.appendChild(fl)}fl.classList.remove("go");void fl.offsetWidth;if(!RMq.matches)fl.classList.add("go");
}
function setWorld(w,first){
  if(!(w in WORLDS))w="home";const changed=w!==world;world=w;document.body.dataset.world=w;
  cv.classList.remove("on");
  const has=["robotics","ai","space","ow"].includes(w);
  setTimeout(()=>{if(world!==w)return;if(has){build(w);cv.classList.add("on");start()}else{scene=null;cancelAnimationFrame(raf);ctx.clearRect(0,0,W,H)}},first?0:180);
  document.documentElement.style.setProperty("--world-accent","var(--cyan)");
  if(!first&&changed)announce(w);
  setTimeout(applyTeach,60);
  try{window.dispatchEvent(new CustomEvent("worldchange",{detail:{world:w}}))}catch(e){}
}
window.addEventListener("areachange",()=>setWorld(typeof curArea!=="undefined"?curArea:"home"));
window.addEventListener("resize",()=>{clearTimeout(fit.t);fit.t=setTimeout(fit,200)});
document.addEventListener("visibilitychange",()=>{if(!document.hidden&&scene&&!RMq.matches)start()});
document.addEventListener("click",e=>{if(e.target.closest&&e.target.closest("#langEn,#langAr"))setTimeout(applyTeach,120)},true);
/* lessons rendered later (accordions, gd rows added on open): re-apply lightly */
let mo=null,tmr=0;
function watch(){const m=$("main");if(!m)return;mo=new MutationObserver(()=>{clearTimeout(tmr);tmr=setTimeout(()=>{mo.disconnect();applyTeach();mo.observe(m,{childList:true,subtree:true})},150)});mo.observe(m,{childList:true,subtree:true})}
if(RMq.addEventListener)RMq.addEventListener("change",()=>{if(RMq.matches){cancelAnimationFrame(raf);drawScene(0,0,true)}else start()});
W=innerWidth;H=innerHeight;cv.width=W;cv.height=H;
setWorld(typeof curArea!=="undefined"?curArea:"home",true);watch();
window.LabWorlds={set:setWorld,get:()=>world};
})();
