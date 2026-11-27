/* Mascot guide — ORBIT's little sibling. Vanilla JS, no deps, no network calls. */
(function(){
"use strict";

/* ============================================================
   MASCOT NAME — edit these two lines only to rename the guide.
   ============================================================ */
var NAME_AR="نجم";
var NAME_EN="Najm";

var LS_HELLO="rayeq-hello-v1", SS_HIDE="rayeq-hidden";
var REDUCE=matchMedia("(prefers-reduced-motion:reduce)").matches;
if(sessionStorage.getItem(SS_HIDE))return;

var STEPS=[
 ["home","دي البداية… عبد الرحمن، مهندس فضاء وذكاء اصطناعي وروبوتات، ساكن في دبي وبيحلم بالمدارات.","Home base. Abdelrahman: space, AI and robotics engineer, Dubai-based, orbit-minded."],
 ["about","هنا حكايته بنفسه: منين بدأ، وإيه اللي خلاه ماسك في الفضاء من صغره.","His own story: where he started and why space never let go of him."],
 ["skills","عدة الشغل كلها هنا… لغات وأنظمة وأدوات، كل واحدة اتعلمها بمشروع حقيقي.","The full toolkit. Every skill here was earned on a real build."],
 ["projects","دي التحف! مشاريع مكسّرة الدنيا، دوس على أي واحد وشوف التفاصيل.","The good stuff. Tap any project, the details are worth it."],
 ["rover","الروفر بقا… ده شغل عجلات وكاميرات حقيقية، مش رسم على ورق. شغّل الفيديو واستمتع.","The rover. Real wheels, real footage, not slideware. Press play."],
 ["experience","الخبرات الحقيقية: شغل اتعمل بإيد، ومهمات اتسلمت بجد.","Hands-on experience. Real missions, actually shipped."],
 ["mentorship","وبيعلّم كمان! بياخد عيال وشباب ويدخلهم عالم التكنولوجيا من أوسع أبوابه.","He teaches too, bringing young builders into tech properly."],
 ["teaching-portfolio","خطط الدروس والمناهج بتاعته، منظمها زي مهندس ما ينظم محطة فضاء.","His lesson plans and curriculum, organized like a mission checklist."],
 ["credentials","الشهادات والاعتمادات… الورق الرسمي اللي ورا الكلام.","The official paper trail behind all the talk."],
 ["lab","معمل المهام! ديموهات تفاعلية وروبوت صاحبه أوربيت… جرب وانت ساكت.","Mission Lab: interactive demos and his robot buddy. Go play."],
 ["systems","شيك على الأنظمة… كل حاجة nominal، زي ما بيقولوا في الفضاء.","Systems check. Everything nominal, as they say up there."],
 ["contact","وصلنا الآخر الرحلة! عجبك اللي شوفته؟ كلمه من هنا، بيرد بجد.","End of the ride. Like what you saw? Say hi from here, he actually replies."]
];

/* Chibi hover-robot in ORBIT's flat design family: same shell/visor gradients,
   cyan visor eyes, chest planet badge, jet flame — with a gold antenna light. */
var SVG=''
+'<svg viewBox="0 0 96 108" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
+'<defs>'
+'<linearGradient id="rq-shell" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f5faff"/><stop offset=".38" stop-color="#c5d8f1"/><stop offset=".7" stop-color="#6882ae"/><stop offset="1" stop-color="#1b3158"/></linearGradient>'
+'<linearGradient id="rq-visor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#183651"/><stop offset=".45" stop-color="#071627"/><stop offset="1" stop-color="#020912"/></linearGradient>'
+'<linearGradient id="rq-jet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ef3ff" stop-opacity=".8"/><stop offset=".4" stop-color="#ae8bff" stop-opacity=".35"/><stop offset="1" stop-color="#ac8bff" stop-opacity="0"/></linearGradient>'
+'<radialGradient id="rq-aura"><stop offset="0" stop-color="#77deff" stop-opacity=".22"/><stop offset="1" stop-color="#77deff" stop-opacity="0"/></radialGradient>'
+'</defs>'
+'<ellipse cx="48" cy="103" rx="24" ry="5" fill="url(#rq-aura)"/>'
+'<g class="rq-float">'
/* hover flame */
+'<path class="rq-flame" d="M42 88 Q40 100 48 103 Q56 100 54 88 Z" fill="url(#rq-jet)"/>'
/* left arm (resting) */
+'<path d="M31 66 q-9 2 -10 12" fill="none" stroke="#7795bc" stroke-width="7" stroke-linecap="round"/>'
+'<path d="M31 66 q-9 2 -10 12" fill="none" stroke="#c5e0f4" stroke-width="3.5" stroke-linecap="round"/>'
+'<circle cx="21" cy="79" r="4.6" fill="url(#rq-shell)" stroke="#8bb7d5" stroke-width="1.4"/>'
/* right arm (raised, waves) */
+'<g class="rq-arm">'
+'<path d="M65 66 q9 -1 11 -10" fill="none" stroke="#7795bc" stroke-width="7" stroke-linecap="round"/>'
+'<path d="M65 66 q9 -1 11 -10" fill="none" stroke="#d0e9fb" stroke-width="3.5" stroke-linecap="round"/>'
+'<circle cx="77" cy="54" r="4.6" fill="url(#rq-shell)" stroke="#86a8d2" stroke-width="1.4"/>'
+'</g>'
/* body */
+'<rect x="29" y="62" width="38" height="27" rx="11" fill="url(#rq-shell)" stroke="#8fbee0" stroke-width="1.6"/>'
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
+'<rect x="17" y="17" width="62" height="42" rx="15" fill="url(#rq-shell)" stroke="#a0d3ef" stroke-width="1.8"/>'
+'<path d="M23 22 h40 q8 0 10 5" fill="none" stroke="#f0fbff" stroke-width="2" stroke-opacity=".8" stroke-linecap="round"/>'
+'<rect x="23" y="23.5" width="50" height="31" rx="11.5" fill="url(#rq-visor)" stroke="#335b7c" stroke-width="1.5"/>'
+'<path d="M27 27 q21 -6 42 -2" fill="none" stroke="#6e9dbd" stroke-width="2.5" stroke-opacity=".25"/>'
/* face (follows the cursor) */
+'<g class="rq-head"><g class="rq-eyes">'
+'<rect class="rq-eye" x="31.5" y="31" width="8.5" height="11" rx="4.2" fill="#71edff"/>'
+'<rect class="rq-eye e2" x="56" y="31" width="8.5" height="11" rx="4.2" fill="#71edff"/>'
+'<circle cx="34.5" cy="34" r="1.3" fill="#e8ffff"/>'
+'<circle cx="59" cy="34" r="1.3" fill="#e8ffff"/>'
+'</g>'
+'<path d="M42 47.5 q6 4.5 12 0" fill="none" stroke="#71edff" stroke-width="2" stroke-linecap="round"/>'
+'</g>'
+'</g></svg>';

var wrap,bud,bub,pAr,pEn,btns,tourIdx=-1,touring=false,spotEl=null,idleT=null;

function el(t,c){var e=document.createElement(t);if(c)e.className=c;return e}

function build(){
 wrap=el("div","rayeq-wrap");
 bud=el("button","rayeq-bud");
 bud.type="button";
 bud.setAttribute("aria-label",NAME_AR+" — "+NAME_EN+", your site guide");
 bud.innerHTML=SVG;
 bub=el("div","rayeq-bubble");
 bub.setAttribute("role","status");bub.setAttribute("aria-live","polite");
 var nm=el("p","name");nm.textContent=NAME_AR+" · "+NAME_EN;bub.appendChild(nm);
 pAr=el("p","ar");pEn=el("p","en");btns=el("div","rayeq-btns");
 bub.appendChild(pAr);bub.appendChild(pEn);bub.appendChild(btns);
 wrap.appendChild(bub);wrap.appendChild(bud);
 document.body.appendChild(wrap);

 bud.addEventListener("click",function(){
  touring?null:(bub.classList.contains("on")?hideBubble():menu());
 });
 document.addEventListener("keydown",function(e){if(e.key==="Escape"){touring?endTour():hideBubble()}});
 if(!REDUCE){
  document.addEventListener("pointermove",function(e){
   var r=bud.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
   var dx=Math.max(-1,Math.min(1,(e.clientX-cx)/260)),dy=Math.max(-1,Math.min(1,(e.clientY-cy)/200));
   var h=bud.querySelector(".rq-head");if(h)h.style.transform="translate("+(dx*1.6)+"px,"+(dy*1.2)+"px)";
  },{passive:true});
 }
 setTimeout(function(){wrap.dataset.wave="1";setTimeout(function(){delete wrap.dataset.wave},3200)},600);
}

function hideBubble(){bub.classList.remove("on")}
function show(ar,en,list){
 pAr.textContent=ar;pEn.textContent=en;
 btns.innerHTML="";
 list.forEach(function(b){
  var x=el("button",b[2]?"ghost":"");x.type="button";x.textContent=b[0];
  x.addEventListener("click",b[1]);btns.appendChild(x);
 });
 bub.classList.add("on");
}

function greet(){
 show("أهلاً بيك في موقع عبد الرحمن! أنا "+NAME_AR+"، هلفّ بيك المكان كله في دقيقة… يلا؟",
  "Welcome to Abdelrahman's site! I'm "+NAME_EN+", your guide. One-minute tour?",
  [["يلا بينا 🚀",startTour],["بعدين / Later",function(){hideBubble();idleNudge()},true]]);
}

function menu(){
 show("تحب أعملك إيه؟","What can I do for you?",
  [["وريني الموقع 🚀",startTour],["مين انت؟",who,true],["اختفي 👋",bye,true]]);
}
function who(){
 show("أنا "+NAME_AR+"… مرشدك هنا. شغلتي أشرحلك الموقع وانت مرتاح على كرسيك.","I'm "+NAME_EN+", your guide. I explain the site, you stay comfy.",
  [["وريني الموقع 🚀",startTour],["تمام 👍",hideBubble,true]]);
}
function bye(){
 hideBubble();sessionStorage.setItem(SS_HIDE,"1");
 setTimeout(function(){wrap.dataset.hidden="1"},250);
}

function spot(id){
 if(spotEl)spotEl.classList.remove("rayeq-spot");spotEl=null;
 var e=document.getElementById(id);
 if(!e)return;
 spotEl=e;e.classList.add("rayeq-spot");
 e.scrollIntoView({behavior:REDUCE?"auto":"smooth",block:"center"});
}
function step(i){
 tourIdx=i;var s=STEPS[i];
 spot(s[0]);
 setTimeout(function(){
  var last=i===STEPS.length-1;
  show(s[1],s[2],last
   ?[["خلاص، عرفت كل حاجة ✨",endTour],["ارجع خطوة",function(){step(i-1)},true]]
   :[["التالي ←",function(){step(i+1)}],["بطل جولة",endTour,true]]);
 },REDUCE?60:520);
}
function startTour(){touring=true;step(0)}
function endTour(){
 touring=false;
 if(spotEl)spotEl.classList.remove("rayeq-spot");spotEl=null;
 confetti();
 show("كده شفت كل حاجة! أي حتة عجبتك ارجعلها براحتك… وأنا موجود لو احتجتني.","That's the whole tour! Wander anywhere you like, I'm right here if you need me.",
  [["شكراً ❤️",function(){hideBubble();idleNudge()}]]);
}

function confetti(){
 if(REDUCE)return;
 var c=el("canvas");c.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:70";
 c.width=innerWidth;c.height=innerHeight;document.body.appendChild(c);
 var x=c.getContext("2d"),cols=["#ce1126","#e8a94d","#56e4ff","#ffffff","#7dffb0"],ps=[],t0=performance.now();
 var ox=innerWidth-225,oy=innerHeight-90;
 for(var i=0;i<90;i++)ps.push({x:ox+(Math.random()-.5)*140,y:oy,vx:(Math.random()-.5)*9,vy:-Math.random()*11-4,g:.22,r:Math.random()*4+2,c:cols[i%5],a:Math.random()*6.28,va:(Math.random()-.5)*.3});
 (function fr(t){
  x.clearRect(0,0,c.width,c.height);
  ps.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.a+=p.va;
   x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillStyle=p.c;x.fillRect(-p.r,-p.r/2,p.r*2,p.r);x.restore();});
  if(t-t0<1900)requestAnimationFrame(fr);else c.remove();
 })(t0);
}

/* gentle re-nudge if the visitor idles with no tour */
function idleNudge(){
 clearTimeout(idleT);
 idleT=setTimeout(function(){
  if(touring||bub.classList.contains("on"))return;
  show("لو تايه في أي حتة، دوس عليّا وأنا أرجعك للطريق.","Lost? Tap me and I'll get you back on track.",
   [["تمام 👌",hideBubble]]);
 },45000);
}

function init(){
 build();
 if(!localStorage.getItem(LS_HELLO)){
  localStorage.setItem(LS_HELLO,"1");
  setTimeout(greet,1600);
 }else{idleNudge()}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);
else init();
})();
