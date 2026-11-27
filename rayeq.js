/* El-Rayeq — the chill guide. Vanilla JS, no deps, no network calls. */
(function(){
"use strict";
var LS_HELLO="rayeq-hello-v1", SS_HIDE="rayeq-hidden";
var REDUCE=matchMedia("(prefers-reduced-motion:reduce)").matches;
if(sessionStorage.getItem(SS_HIDE))return;

var STEPS=[
 ["home","دي البداية… عبد الرحمن، مهندس فضاء وذكاء اصطناعي وروبوتات، ساكن في دبي وبيحلم بالمدارات.","Home base. Abdelrahman: space, AI and robotics engineer, Dubai-based, orbit-minded."],
 ["about","هنا حكايته بنفسه: منين بدأ، وإيه اللي خلاه ماسك في الفضاء من صغره.","His own story: where he started and why space never let go of him."],
 ["skills","عدة الشغل كلها هنا… لغات وأنظمة وأدوات، كل واحدة اتعلمها بمشروع حقيقي.","The full toolkit. Every skill here was earned on a real build."],
 ["projects","دي التحف! مشاريع مكسّرة الدنيا، دوس على أي واحد وشوف التفاصيل.","The good stuff. Tap any project, the details are worth it."],
 ["rover","الروفر بقا… ده شغل عجول وكاميرات حقيقية، مش رسم على ورق. شغّل الفيديو واستمتع.","The rover. Real wheels, real footage, not slideware. Press play."],
 ["experience","الخبرات الحقيقية: شغل اتعمل بإيد، ومهمات اتسلمت بجد.","Hands-on experience. Real missions, actually shipped."],
 ["mentorship","وبيعلّم كمان! بياخد عيال وشباب ويدخلهم عالم التكنولوجيا من أوسع أبوابه.","He teaches too, bringing young builders into tech properly."],
 ["teaching-portfolio","خطط الدروس والمناهج بتاعته، منظمها زي مهندس ما ينظم محطة فضاء.","His lesson plans and curriculum, organized like a mission checklist."],
 ["credentials","الشهادات والاعتمادات… الورق الرسمي اللي ورا الكلام.","The official paper trail behind all the talk."],
 ["lab","معمل المهام! ديموهات تفاعلية وروبوت صاحبه أوربيت… جرب وانت ساكت.","Mission Lab: interactive demos and his robot buddy. Go play."],
 ["systems","شيك على الأنظمة… كل حاجة nominal، زي ما بيقولوا في الفضاء.","Systems check. Everything nominal, as they say up there."],
 ["contact","وصلنا الآخر الرحلة! عجبك اللي شوفته؟ كلمه من هنا، بيرد بجد.","End of the ride. Like what you saw? Say hi from here, he actually replies."]
];

var SVG=''
+'<svg viewBox="0 0 72 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
+'<defs>'
+'<linearGradient id="rq-glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dff4ff"/><stop offset="1" stop-color="#9fd8f2"/></linearGradient>'
+'<linearGradient id="rq-suit" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dfe7f2"/></linearGradient>'
+'</defs>'
+'<line x1="36" y1="11" x2="36" y2="4" stroke="#c8d6ea" stroke-width="2.4" stroke-linecap="round"/>'
+'<circle cx="36" cy="3.6" r="2.6" fill="#ffb84d"><animate attributeName="opacity" values="1;.4;1" dur="1.6s" repeatCount="indefinite"/></circle>'
+'<g class="rq-float">'
+'<g class="rq-arm"><circle cx="57" cy="47" r="6.4" fill="url(#rq-suit)" stroke="#b9c6da" stroke-width="1.6"/></g>'
+'<path d="M20 74c0-10 7-15 16-15s16 5 16 15z" fill="url(#rq-suit)" stroke="#b9c6da" stroke-width="1.6"/>'
+'<path d="M26 64h20" stroke="#ce1126" stroke-width="2.6" stroke-linecap="round"/>'
+'<path d="M29 67.5h14" stroke="#e8a94d" stroke-width="2.2" stroke-linecap="round"/>'
+'<rect x="31" y="62" width="10" height="7" rx="2.4" fill="#56e4ff" opacity=".9"/>'
+'<circle cx="36" cy="34" r="23" fill="url(#rq-glass)" stroke="#ffffff" stroke-width="2.6" opacity=".97"/>'
+'<ellipse cx="27" cy="25" rx="7" ry="4.4" fill="#ffffff" opacity=".55" transform="rotate(-24 27 25)"/>'
+'<circle cx="36" cy="37" r="14.5" fill="#f4c491"/>'
+'<g class="rq-head">'
+'<rect x="24.5" y="31.5" width="10" height="7.2" rx="3.2" fill="#1c2233"/>'
+'<rect x="37.5" y="31.5" width="10" height="7.2" rx="3.2" fill="#1c2233"/>'
+'<path d="M34.5 34.4h3" stroke="#1c2233" stroke-width="2" stroke-linecap="round"/>'
+'<path d="M26.5 33.4l3-1.4M39.5 33.4l3-1.4" stroke="#ffffff88" stroke-width="1.4" stroke-linecap="round"/>'
+'<path d="M31.5 44.5q4.5 3 9 .4" fill="none" stroke="#8a5a2b" stroke-width="1.8" stroke-linecap="round"/>'
+'</g>'
+'</g></svg>';

var CSS_ANIM=''
+'.rq-float{animation:rq-bob 3.4s ease-in-out infinite;transform-origin:36px 40px}'
+'@keyframes rq-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3.4px)}}'
+'.rayeq-wrap[data-wave="1"] .rq-arm{animation:rq-wave 1s ease-in-out 3;transform-origin:57px 47px}'
+'@keyframes rq-wave{0%,100%{transform:rotate(0)}25%{transform:rotate(-40deg) translateY(-3px)}75%{transform:rotate(14deg)}}'
+'.rq-head{transition:transform .18s ease-out;transform-origin:36px 37px}'
+'@media(prefers-reduced-motion:reduce){.rq-float,.rq-arm{animation:none!important}}';

var wrap,bud,bub,pAr,pEn,btns,tourIdx=-1,touring=false,spotEl=null,idleT=null;

function el(t,c){var e=document.createElement(t);if(c)e.className=c;return e}

function build(){
 wrap=el("div","rayeq-wrap");
 bud=el("button","rayeq-bud");
 bud.type="button";
 bud.setAttribute("aria-label","الرايق — El-Rayeq, your chill site guide");
 bud.innerHTML=SVG;
 var st=document.createElement("style");st.textContent=CSS_ANIM;document.head.appendChild(st);
 bub=el("div","rayeq-bubble");
 bub.setAttribute("role","status");bub.setAttribute("aria-live","polite");
 var nm=el("p","name");nm.textContent="الرايق · El-Rayeq";bub.appendChild(nm);
 pAr=el("p","ar");pEn=el("p","en");btns=el("div","rayeq-btns");
 bub.appendChild(pAr);bub.appendChild(pEn);bub.appendChild(btns);
 wrap.appendChild(bub);wrap.appendChild(bud);
 document.body.appendChild(wrap);
 bud.addEventListener("click",function(){touring?null:(bub.classList.contains("on")?hideBubble():menu())});
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
 show("أهلاً بيك في موقع عبد الرحمن! أنا الرايق، هلفّ بيك المكان كله في دقيقة… يلا؟",
  "Welcome to Abdelrahman's site! I'm El-Rayeq, your chill guide. One-minute tour?",
  [["يلا بينا 🚀",startTour],["بعدين / Later",function(){hideBubble();idleNudge()},true]]);
}

function menu(){
 show("تحب أعملك إيه؟","What can I do for you?",
  [["وريني الموقع 🚀",startTour],["مين انت؟",who,true],["اختفي 👋",bye,true]]);
}
function who(){
 show("أنا الرايق… أهدى مرشد في المجرة. شغلتي أشرحلك الموقع وانت مرتاح على كرسيك.","I'm El-Rayeq, the chillest guide in the galaxy. I explain the site, you stay comfy.",
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
  [["شكراً يا رايق ❤️",function(){hideBubble();idleNudge()}]]);
}

function confetti(){
 if(REDUCE)return;
 var c=el("canvas");c.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:70";
 c.width=innerWidth;c.height=innerHeight;document.body.appendChild(c);
 var x=c.getContext("2d"),cols=["#ce1126","#e8a94d","#56e4ff","#ffffff","#7dffb0"],ps=[],t0=performance.now();
 for(var i=0;i<90;i++)ps.push({x:innerWidth/2+(Math.random()-.5)*140,y:innerHeight-90,vx:(Math.random()-.5)*9,vy:-Math.random()*11-4,g:.22,r:Math.random()*4+2,c:cols[i%5],a:Math.random()*6.28,va:(Math.random()-.5)*.3});
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
