/* Najm for Mission Lab: mascot guide + presentation/navigation polish.
   Vanilla JS, no deps, no network calls. Additive: touches only .najm-* / .nj-* nodes. */
(function(){
"use strict";
/* ===== MASCOT NAME: edit these two lines only to rename ===== */
var NAME_AR="نجم";
var NAME_EN="Najm";

var LS_HELLO="najm-lab-hello-v1",LS_VISITS="najm-lab-visits",SS_HIDE="najm-lab-hidden";
var REDUCE=matchMedia("(prefers-reduced-motion:reduce)").matches;
function isAr(){try{return LANG==="ar"}catch(e){return false}}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function el(t,c){var e=document.createElement(t);if(c)e.className=c;return e}
function $(s,r){return (r||document).querySelector(s)}

/* ---------------- presentation + navigation polish ---------------- */
var INTRO={
 home:{i:"🧭",ar:"إزاي تذاكر هنا؟",en:"How to use Mission Lab",
  steps:[["1","اختار مسار","Pick a track"],["2","اتعلم درس درس وعلّم اللي خلصته","Learn lesson by lesson, tick what's done"],["3","اختبر نفسك ثم Mock interview","Quiz yourself, then a mock interview"],["✦","علقت؟ اسأل NOVA","Stuck? Ask NOVA"]]},
 ow:{i:"🚀",ar:"التحضير للمقابلة",en:"Interview prep",
  steps:[["1","افهم المراحل","Know the stages"],["2","جهّز نقاط الكلام","Prepare your talking points"],["3","جرّب Mock interview","Rehearse with a mock interview"]]},
 robotics:{i:"🤖",ar:"مسار الروبوتات",en:"Robotics track",
  steps:[["1","دوس على أجزاء البورد","Tap the parts of the board"],["2","دروس بايثون واحد واحد","Python lesson by lesson"],["3","اختبار ٥ أسئلة","A 5-question quiz"]]},
 space:{i:"🛰",ar:"مسار المدارات والفضاء",en:"Orbits & Space track",
  steps:[["1","العب بالمحاكي","Play with the simulators"],["2","اقرا المفاهيم","Read the concepts"],["3","اختبار سريع","Quick quiz"]]},
 ai:{i:"🧠",ar:"مسار الذكاء الاصطناعي",en:"AI in Python track",
  steps:[["1","جرّب الديموهات الحية","Try the live demos"],["2","دروس خطوة خطوة","Lessons step by step"],["3","اختبار","Quiz"]]}
};
var NEXT={
 robotics:{go:"space",ar:"التالي: المدارات والفضاء",en:"Next: Orbits & Space"},
 space:{go:"ai",ar:"التالي: الذكاء الاصطناعي",en:"Next: AI in Python"},
 ai:{mock:1,ar:"جاهز؟ جرّب Mock interview",en:"Ready? Try a mock interview"},
 ow:{mock:1,ar:"تدرّب: Mock interview",en:"Practise: mock interview"}
};
function decorate(){
 var area=null;try{area=curArea}catch(e){}
 if(!area)return;
 var root=document.getElementById("area-"+area);if(!root)return;
 var old=root.querySelectorAll("[data-nj]");for(var i=0;i<old.length;i++)old[i].remove();
 var d=INTRO[area];
 if(d){
  var c=el("div","nj-intro");c.setAttribute("data-nj","1");
  var ar=isAr();
  c.setAttribute("dir",ar?"rtl":"ltr");
  c.innerHTML='<div class="nj-ih"><span class="nj-ii" aria-hidden="true">'+d.i+'</span><b>'+(ar?d.ar:d.en)+'</b></div><ol>'
   +d.steps.map(function(s){return '<li><em>'+s[0]+'</em><span>'+(ar?s[1]:s[2])+'</span></li>'}).join("")+'</ol>';
  root.insertBefore(c,root.firstChild);
 }
 var n=NEXT[area];
 if(n){
  var b=el("button","nj-next");b.type="button";b.setAttribute("data-nj","1");
  b.innerHTML='<span>'+(isAr()?n.ar:n.en)+'</span><i aria-hidden="true">'+(isAr()?"←":"→")+'</i>';
  b.addEventListener("click",function(){
   if(n.mock){var m=document.getElementById("mockOpen");if(m)m.click();}
   else{setArea(n.go);scrollTo({top:0,behavior:REDUCE?"auto":"smooth"})}
  });
  root.appendChild(b);
 }
}
var lastArea=null;
function onArea(){
 var a=null;try{a=curArea}catch(e){}
 decorate();
 if(a!==lastArea){lastArea=a;scrollTo({top:0,behavior:REDUCE?"auto":"smooth"});
  if(a&&wrap&&!touring&&ready)reactArea(a)}
}
window.addEventListener("areachange",function(){setTimeout(onArea,30)});
document.addEventListener("click",function(e){if(e.target.closest&&e.target.closest(".lang button"))setTimeout(decorate,60)});

/* ---------------- character ---------------- */
var SVG=''
+'<svg viewBox="0 0 96 108" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
+'<defs>'
+'<linearGradient id="nj-shell" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f5faff"/><stop offset=".38" stop-color="#c5d8f1"/><stop offset=".7" stop-color="#6882ae"/><stop offset="1" stop-color="#1b3158"/></linearGradient>'
+'<linearGradient id="nj-visor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#183651"/><stop offset=".45" stop-color="#071627"/><stop offset="1" stop-color="#020912"/></linearGradient>'
+'<linearGradient id="nj-jet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ef3ff" stop-opacity=".8"/><stop offset=".4" stop-color="#ae8bff" stop-opacity=".35"/><stop offset="1" stop-color="#ac8bff" stop-opacity="0"/></linearGradient>'
+'<radialGradient id="nj-aura"><stop offset="0" stop-color="#77deff" stop-opacity=".22"/><stop offset="1" stop-color="#77deff" stop-opacity="0"/></radialGradient>'
+'</defs>'
+'<ellipse cx="48" cy="103" rx="24" ry="5" fill="url(#nj-aura)"/>'
+'<g class="nj-float">'
/* hover flame */
+'<path class="nj-flame" d="M42 88 Q40 100 48 103 Q56 100 54 88 Z" fill="url(#nj-jet)"/>'
/* left arm (resting) */
+'<path d="M31 66 q-9 2 -10 12" fill="none" stroke="#7795bc" stroke-width="7" stroke-linecap="round"/>'
+'<path d="M31 66 q-9 2 -10 12" fill="none" stroke="#c5e0f4" stroke-width="3.5" stroke-linecap="round"/>'
+'<circle cx="21" cy="79" r="4.6" fill="url(#nj-shell)" stroke="#8bb7d5" stroke-width="1.4"/>'
/* right arm (raised, waves) */
+'<g class="nj-arm">'
+'<path d="M65 66 q9 -1 11 -10" fill="none" stroke="#7795bc" stroke-width="7" stroke-linecap="round"/>'
+'<path d="M65 66 q9 -1 11 -10" fill="none" stroke="#d0e9fb" stroke-width="3.5" stroke-linecap="round"/>'
+'<circle cx="77" cy="54" r="4.6" fill="url(#nj-shell)" stroke="#86a8d2" stroke-width="1.4"/>'
+'</g>'
/* body */
+'<rect x="29" y="62" width="38" height="27" rx="11" fill="url(#nj-shell)" stroke="#8fbee0" stroke-width="1.6"/>'
+'<circle cx="48" cy="75" r="6.5" fill="#07172e" stroke="#56e4ff" stroke-width="1.2"/>'
+'<ellipse cx="48" cy="75" rx="10" ry="3" transform="rotate(-30 48 75)" fill="none" stroke="#ac8bff" stroke-width="1"/>'
+'<circle cx="52" cy="71.5" r="1.1" fill="#8feeff"/>'
+'<circle cx="41" cy="84.5" r="1.3" fill="#ce1126"/>'
+'<circle cx="48" cy="84.5" r="1.3" fill="#ffffff"/>'
+'<circle cx="55" cy="84.5" r="1.3" fill="#e8a94d"/>'
/* antenna with gold light */
+'<path d="M48 15 V9" stroke="#95bce0" stroke-width="2.6" stroke-linecap="round"/>'
+'<circle cx="48" cy="6.8" r="3" fill="#ffd36b" stroke="#d9a94d" stroke-width="1"><animate attributeName="opacity" values="1;.35;1" dur="1.6s" repeatCount="indefinite"/></circle>'
/* ear pods */
+'<rect x="13" y="33" width="6.5" height="13" rx="3" fill="#1d3d60" stroke="#8499c4" stroke-width="1.2"/>'
+'<rect x="76.5" y="33" width="6.5" height="13" rx="3" fill="#1d3d60" stroke="#8499c4" stroke-width="1.2"/>'
/* head shell + visor */
+'<rect x="17" y="17" width="62" height="42" rx="15" fill="url(#nj-shell)" stroke="#a0d3ef" stroke-width="1.8"/>'
+'<path d="M23 22 h40 q8 0 10 5" fill="none" stroke="#f0fbff" stroke-width="2" stroke-opacity=".8" stroke-linecap="round"/>'
+'<rect x="23" y="23.5" width="50" height="31" rx="11.5" fill="url(#nj-visor)" stroke="#335b7c" stroke-width="1.5"/>'
+'<path d="M27 27 q21 -6 42 -2" fill="none" stroke="#6e9dbd" stroke-width="2.5" stroke-opacity=".25"/>'
/* face (follows the cursor) */
+'<g class="nj-head"><g class="nj-eyes">'
+'<rect class="nj-eye" x="31.5" y="31" width="8.5" height="11" rx="4.2" fill="#71edff"/>'
+'<rect class="nj-eye e2" x="56" y="31" width="8.5" height="11" rx="4.2" fill="#71edff"/>'
+'<circle cx="34.5" cy="34" r="1.3" fill="#e8ffff"/>'
+'<circle cx="59" cy="34" r="1.3" fill="#e8ffff"/>'
+'</g>'
+'<path d="M42 47.5 q6 4.5 12 0" fill="none" stroke="#71edff" stroke-width="2" stroke-linecap="round"/>'
+'</g>'
+'</g></svg>';


var STEPS=[
 ["home",".hero","أهلاً في Mission Lab! هنا بتتعلم روبوتات وفضاء وذكاء اصطناعي من غير ما تحس إنك بتذاكر… تقريباً 😅","Welcome to Mission Lab: robotics, space and AI without feeling like homework. Almost."],
 ["home",".area-cards","ثلاث مسارات: روبوتات، مدارات، ذكاء اصطناعي. اختار اللي نفسك فيه، وكل مسار عليه عداد بيوريك خلصت كام.","Three tracks, each with a progress bar so you can watch yourself win."],
 ["home",".quick","دي اختصارات سريعة: Mock interview، NOVA، وضع الاستماع، واختبار. زي زرار الطوارئ بس للمذاكرة.","Shortcuts to mock interview, NOVA, listen mode and the quiz. The emergency buttons of studying."],
 ["ow","#owRoot","تحضير المقابلة: المراحل، نقاط الكلام، وإيه المتوقع. اقراه مرة وانت مرتاح وهتحس إنك ماسك الخريطة.","Interview prep: the stages, talking points and what to expect. Read it once and you'll hold the map."],
 ["robotics","#boards","هنا بقا الأردوينو والراسبيري باي بجد. دوس على أي رقم وهيقولك الجزء ده بيعمل إيه. مفيش خطر الكهربا 😄","Real Arduino and Raspberry Pi boards. Tap any number to learn that part. No shock risk."],
 ["robotics","#quiz-robotics","بعد الدروس جرّب الكويز. خمس أسئلة، وأنا هشجعك لو غلطت… وهشجعك أكتر لو صح.","After the lessons, take the quiz. Five questions. I cheer for wrong answers too."],
 ["space","#orbits","محاكي المدارات: غيّر الارتفاع واتفرج الستالايت بيعمل إيه. جرّب تخليه يقع… بس لعبة طبعاً.","The orbit simulator: change the altitude and watch the satellite react. Try to crash it. It's only a game."],
 ["ai","#aiLessons","الذكاء الاصطناعي في بايثون: ديموهات حية تشوف فيها الموديل بيتعلم قدامك.","AI in Python: live demos where you watch a model learn in front of you."],
 ["ai","#teacher","ودي NOVA، المدرّسة بتاعتنا. اسألها أي حاجة بالعربي أو الإنجليزي، ومش هتزهق منك.","And this is NOVA, the AI teacher. Ask in Arabic or English. She never gets tired of you."],
 ["ai",".areas .mock-open","وده Mock interview: بتتكلم وبتاخد تقييم وملخص بنقاط القوة والضعف. أحسن تمرين قبل أي مقابلة.","Mock interview: speak your answers, get scored feedback and a summary. The best rehearsal there is."]
];
var JOKES=[
 ["ليه الروبوت ما بيخافش من الامتحان؟ لأنه عنده backup! 😎","Why isn't the robot scared of exams? It has a backup."],
 ["الستالايت بيدور طول اليوم ومش بيزهق. وانت زهقت من ربع ساعة؟ 🛰","A satellite orbits all day and never complains. You've been here fifteen minutes."],
 ["الأردوينو والراسبيري بيتخانقوا؟ لأ، واحد بيفكر والتاني بيفتكر 🤓","Arduino thinks fast, Raspberry Pi remembers a lot. Teamwork."],
 ["خطأ في الكود؟ ده مش bug، ده feature لسه ما اتعلمش 🐛","A bug in your code? It's a feature that hasn't finished learning."],
 ["قهوة ☕ + درس واحد + نجم بيشجعك = معادلة النجاح","Coffee + one lesson + a cheering robot = the success formula."],
 ["أنا مش بنام، بس تعالى نذاكر قبل ما البطارية تخلص 🔋","I never sleep. Let's study before my battery dies."],
 ["الجاذبية مش مسؤولة عن إنك بتأجل المذاكرة… دي إرادتك الحرة 😌","Gravity isn't why you're procrastinating. That's all you."]
];
var CHEER_DONE=[
 ["درس كمان خلص! أنت ماشي زي الصاروخ 🚀","Another lesson down. You're moving like a rocket."],
 ["عاش! كمّل كده وهتبقى أستاذ المدارات 🛰","Nice! Keep going and you'll be the orbit professor."],
 ["تمام! ده اللي بيتسمى تقدم 📈","That's what progress looks like."],
 ["ممتاز! ريّح دقيقتين وبعدين كمّل 😄","Great. Rest two minutes, then continue."]
];
var CHEER_RIGHT=[["صح! 👏","Correct!"],["ضربة معلم 🎯","Right on target."],["إجابة نضيفة ✨","Clean answer."]];
var CONSOLE_WRONG=[["ولا يهمك، الغلط بيعلّم أكتر من الصح 🙂","No stress, mistakes teach more than hits."],["قريبة! الإجابة الصح متظللة، خدها تمرين 💪","Close! The right one is highlighted. Free practice."]];

var wrap,bud,bub,pAr,pEn,btns,tourIdx=-1,touring=false,spotEl=null,idleT=null,hideT=null,ready=false,clicks=[],doneCount=0,lastToast=0;

function build(){
 wrap=el("div","najm-wrap");
 bud=el("button","najm-bud");bud.type="button";
 bud.setAttribute("aria-label",NAME_AR+" - "+NAME_EN+", your Mission Lab guide");
 bud.innerHTML=SVG;
 bub=el("div","najm-bubble");bub.setAttribute("role","status");bub.setAttribute("aria-live","polite");
 var nm=el("p","name");nm.textContent=NAME_AR+" · "+NAME_EN;bub.appendChild(nm);
 pAr=el("p","ar");pEn=el("p","en");btns=el("div","najm-btns");
 bub.appendChild(pAr);bub.appendChild(pEn);bub.appendChild(btns);
 wrap.appendChild(bub);wrap.appendChild(bud);document.body.appendChild(wrap);

 bud.addEventListener("click",function(){
  var now=Date.now();clicks=clicks.filter(function(t){return now-t<1800});clicks.push(now);
  if(clicks.length>=5){clicks=[];dizzy();return}
  if(touring)return;
  bub.classList.contains("on")?hideBubble():menu();
 });
 document.addEventListener("keydown",function(e){if(e.key==="Escape"){touring?endTour():hideBubble()}});
 if(!REDUCE){
  document.addEventListener("pointermove",function(e){
   var r=bud.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
   var dx=Math.max(-1,Math.min(1,(e.clientX-cx)/260)),dy=Math.max(-1,Math.min(1,(e.clientY-cy)/200));
   var h=bud.querySelector(".nj-head");if(h)h.style.transform="translate("+(dx*1.6)+"px,"+(dy*1.2)+"px)";
  },{passive:true});
 }
 /* easter egg: type "najm" (not inside inputs) */
 var buf="";
 document.addEventListener("keydown",function(e){
  var t=e.target;if(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable))return;
  if(e.key&&e.key.length===1){buf=(buf+e.key.toLowerCase()).slice(-4);if(buf==="najm"){buf="";wave();confetti();toast("نجم نادوه؟ أنا هنا! 😄","Someone called?")}}
 });
 setTimeout(wave,600);
 watch();
}
function wave(){wrap.dataset.wave="1";setTimeout(function(){delete wrap.dataset.wave},3200)}
function dizzy(){
 if(touring)return;
 bud.classList.add("nj-spin");setTimeout(function(){bud.classList.remove("nj-spin")},1300);
 toast(pick([["أنا دايخ! بالراحة عليّا 🥴","Easy! I'm dizzy."],["كفاية بقى، أنا مش دوّارة ملاهي 🎡","Okay okay, I'm not a theme park ride."]]));
}
function hideBubble(){clearTimeout(hideT);bub.classList.remove("on")}
function show(ar,en,list){
 clearTimeout(hideT);
 pAr.textContent=ar;pEn.textContent=en;btns.innerHTML="";
 list.forEach(function(b){var x=el("button",b[2]?"ghost":"");x.type="button";x.textContent=b[0];x.addEventListener("click",b[1]);btns.appendChild(x)});
 bub.classList.add("on");
}
/* short, self-dismissing reaction (never interrupts a tour or an open menu) */
function toast(ar,en,force){
 if(!ready||touring)return;
 if(arguments.length===1&&Array.isArray(ar)){en=ar[1];ar=ar[0]}
 if(!force&&bub.classList.contains("on")&&btns.children.length)return;
 show(ar,en,[]);hideT=setTimeout(hideBubble,5200);
}
function react(list,gap){
 var now=Date.now();if(now-lastToast<(gap||6000))return;lastToast=now;toast(pick(list));
}

function greet(){
 show("أهلاً بيك في Mission Lab! أنا "+NAME_AR+"، دليلك هنا. أفهّمك الأقسام في دقيقة وبعدها تذاكر وانت فاهم كل حاجة. يلا؟",
  "Welcome to Mission Lab! I'm "+NAME_EN+". One-minute tour of how everything works, then you study knowing where things are. Ready?",
  [["يلا بينا 🚀",startTour],["بعدين / Later",function(){hideBubble();idleNudge()},true]]);
}
function menu(){
 show("تحب أعملك إيه؟","What can I do for you?",
  [["جولة سريعة 🚀",startTour],["نكتة 😄",joke,true],["مين انت؟",who,true],["اختفي 👋",bye,true]]);
}
function joke(){var j=pick(JOKES);show(j[0],j[1],[["نكتة تانية 😄",joke],["كفاية 👍",hideBubble,true]])}
function who(){
 show("أنا "+NAME_AR+"، روبوت صغير ساكن في Mission Lab. بشرحلك الأقسام وبشجعك وانت بتذاكر.","I'm "+NAME_EN+", a small robot who lives in Mission Lab. I explain sections and cheer you on.",
  [["جولة 🚀",startTour],["تمام 👍",hideBubble,true]]);
}
function bye(){hideBubble();sessionStorage.setItem(SS_HIDE,"1");setTimeout(function(){wrap.dataset.hidden="1"},250)}

function visible(e){return e&&e.getClientRects().length>0}
function spot(a,sel){
 if(spotEl)spotEl.classList.remove("najm-spot");spotEl=null;
 try{setArea(a,true)}catch(e){}
 setTimeout(function(){
  var e=null,s=sel.split(",");
  for(var i=0;i<s.length&&!e;i++){var c=$(s[i].trim());if(visible(c))e=c}
  if(!e)return;
  spotEl=e;e.classList.add("najm-spot");
  e.scrollIntoView({behavior:REDUCE?"auto":"smooth",block:"center"});
 },REDUCE?30:260);
}
function step(i){
 tourIdx=i;var s=STEPS[i];
 spot(s[0],s[1]);
 setTimeout(function(){
  var last=i===STEPS.length-1;
  var back=i>0?[["← ارجع",function(){step(i-1)},true]]:[];
  show(s[2],s[3],last
   ?[["خلصت ✨",endTour]].concat(back)
   :[["التالي ("+(i+1)+"/"+STEPS.length+")",function(){step(i+1)}]].concat(back,[["بطل جولة",endTour,true]]));
 },REDUCE?80:820);
}
function startTour(){touring=true;step(0)}
function endTour(){
 touring=false;
 if(spotEl)spotEl.classList.remove("najm-spot");spotEl=null;
 try{setArea("home");scrollTo({top:0,behavior:REDUCE?"auto":"smooth"})}catch(e){}
 confetti();
 show("كده عرفت كل حاجة! دوس عليّا في أي وقت لو تهت أو عايز نكتة.","That's the full tour! Tap me anytime if you get lost or need a joke.",
  [["يلا نذاكر 💪",function(){hideBubble();idleNudge()}]]);
}

function confetti(){
 if(REDUCE)return;
 var c=el("canvas");c.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:70";
 c.width=innerWidth;c.height=innerHeight;document.body.appendChild(c);
 var x=c.getContext("2d"),cols=["#ce1126","#e8a94d","#56e4ff","#ffffff","#7dffb0","#ac8bff"],ps=[],t0=performance.now();
 var ox=innerWidth-56,oy=innerHeight-110;
 for(var i=0;i<90;i++)ps.push({x:ox+(Math.random()-.5)*90,y:oy,vx:(Math.random()-.8)*9,vy:-Math.random()*11-4,g:.22,r:Math.random()*4+2,c:cols[i%6],a:Math.random()*6.28,va:(Math.random()-.5)*.3});
 (function fr(t){
  x.clearRect(0,0,c.width,c.height);
  ps.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.a+=p.va;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillStyle=p.c;x.fillRect(-p.r,-p.r/2,p.r*2,p.r);x.restore()});
  if(t-t0<1900)requestAnimationFrame(fr);else c.remove();
 })(t0);
}

/* ---------------- playful reactions to what the visitor does ---------------- */
var AREA_LINES={
 ow:["هنا التحضير. خد نفس عميق… إنت جاهز أكتر مما تتخيل 💪","Prep zone. Deep breath. You're readier than you think."],
 robotics:["الروبوتات! أحلى قسم… رأيي أنا طبعاً 🤖","Robotics! Best section. Totally unbiased opinion."],
 space:["مدارات! اربط الحزام 🛰","Orbits! Buckle up."],
 ai:["الذكاء الاصطناعي… يعني هعلّمك تعلّم الآلة تتعلم 🧠","AI: teaching machines to learn. Meta, I know."]
};
function reactArea(a){
 if(AREA_LINES[a]&&Math.random()<.45)react([AREA_LINES[a]],9000);
}
function watch(){
 document.addEventListener("click",function(e){
  var t=e.target;if(!t||!t.closest)return;
  var d=t.closest(".l-done");
  if(d){setTimeout(function(){
   if(!d.classList.contains("on"))return;
   doneCount++;
   if(doneCount%5===0){wave();confetti();toast("خمس دروس! أنت وحش 🔥 ريّح شوية","Five lessons! Beast mode.",true)}
   else react(CHEER_DONE,2500);
  },120);return}
  var o=t.closest(".q-opts button");
  if(o){setTimeout(function(){
   if(o.classList.contains("right"))react(CHEER_RIGHT,5000);
   else if(o.classList.contains("wrong")&&Math.random()<.7)react(CONSOLE_WRONG,5000);
  },160)}
 },true);
 /* quiz finished */
 new MutationObserver(function(ms){
  ms.forEach(function(m){m.addedNodes.forEach(function(n){
   if(n.nodeType!==1)return;
   var q=n.matches&&n.matches(".q-end")?n:(n.querySelector&&n.querySelector(".q-end"));
   if(!q)return;
   var s=parseInt((q.querySelector(".q-score")||{}).textContent,10),tot=5;
   if(isNaN(s))return;
   var r=s>=tot?[["علامة كاملة! 🏆 أنت كده تقدر تعلّمني أنا","Perfect score! You could teach me."],true]
    :s>=4?[["تقريباً كاملة! شغل عالي 👏","Almost perfect! Strong work."],true]
    :s>=3?[["كويس! جولة كمان وتبقى ٥ من ٥ 💪","Solid! One more round for a perfect score."],false]
    :[["مش مشكلة! ارجع للدروس وجرب تاني، أنا مصدقك 🤝","No problem. Revisit the lessons and retry. I believe in you."],false];
   if(r[1]){wave();confetti()}
   toast(r[0][0],r[0][1],true);
  })});
 }).observe(document.body,{childList:true,subtree:true});
 /* mock interview summary */
 var sum=document.getElementById("mqSum");
 if(sum)new MutationObserver(function(){
  if(sum.hidden)return;
  setTimeout(function(){
   var v=parseFloat((document.getElementById("mqSumScore")||{}).textContent);
   var line=isNaN(v)?[["خلصت الجلسة! عاش على المجهود 👏","Session done. Well played."]]
    :v>=8?[["أداء قوي جداً! 🔥 كده المقابلة في الجيب","Very strong! Interview-ready."]]
    :v>=6?[["كويس جداً. صلّح النقاط اللي فوق وهتبقى ممتاز 💪","Good. Fix the pointers above and you're excellent."]]
    :[["البداية دايماً أصعب حاجة. اقرا الملخص وجرّب تاني، هتفرق جداً 🌱","The start is always hardest. Read the summary and go again."]];
   var z=line[0];if(!isNaN(v)&&v>=8){wave();confetti()}
   toast(z[0],z[1],true);
  },1500);
 }).observe(sum,{attributes:true,attributeFilter:["hidden"]});
 /* NOVA / mock / listen openers get a quick wink */
 var ps={navNova:["هتلاقيها تحت! NOVA مستنياك ✦","NOVA is waiting below."],mockOpen:["بالتوفيق! اتكلم براحة وبثقة 🎙","Good luck! Speak calmly and clearly."]};
 Object.keys(ps).forEach(function(id){var b=document.getElementById(id);if(b)b.addEventListener("click",function(){setTimeout(function(){react([ps[id]],3000)},700)})});
}

function idleNudge(){
 clearTimeout(idleT);
 idleT=setTimeout(function(){
  if(touring||bub.classList.contains("on"))return;
  var j=pick(JOKES);
  show(j[0],j[1],[["نكتة تانية 😄",joke],["تمام 👌",hideBubble,true]]);
 },60000);
}

function init(){
 if(sessionStorage.getItem(SS_HIDE))return;
 build();ready=true;
 var v=0;try{v=parseInt(localStorage.getItem(LS_VISITS)||"0",10)||0;localStorage.setItem(LS_VISITS,String(v+1))}catch(e){}
 decorate();lastArea=(typeof curArea!=="undefined")?curArea:null;
 if(!localStorage.getItem(LS_HELLO)){
  localStorage.setItem(LS_HELLO,"1");setTimeout(greet,1800);
 }else{
  var h=new Date().getHours();
  if(h>=0&&h<5)setTimeout(function(){toast("لسه صاحي؟ الفضاء مش هيهرب، بس خد استراحة 😴","Still up? Space isn't going anywhere.")},2200);
  else setTimeout(function(){toast("أهلاً تاني! نكمّل من فين؟ 😄","Welcome back! Where do we continue?")},2200);
  idleNudge();
 }
}
if(document.readyState==="complete")setTimeout(init,50);else window.addEventListener("load",function(){setTimeout(init,50)});
})();
