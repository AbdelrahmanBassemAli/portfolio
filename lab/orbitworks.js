"use strict";
/* Orbitworks interview prep area: countdown, company briefing, study track, playbook, formulas, quiz.
   Depends on lab.js (STR, t, LANG), common.js (mountAcc), hub.js (IC, SUB, areaStats, store), ow-content.js, ow-nova.js. */
const OW_TARGET=Date.parse("2026-12-01T13:00:00+04:00");   /* Tue 1 Dec 2026, 1:00 pm Dubai */
const OW_END=OW_TARGET+30*60000;
const OW_SRC=[
 ["Orbitworks: About","https://orbitworks.space/about/"],
 ["Orbitworks: Altair","https://orbitworks.space/altair/"],
 ["Press release: Altair-1 launch (2 Oct 2026)","https://orbitworks.space/orbitworks-launches-altair-1-the-uaes-first-commercial-satellite/"],
 ["Orbitworks: Our facility","https://orbitworks.space/about/our-facility/"],
 ["Orbitworks: Careers (process)","https://orbitworks.space/careers/"],
 ["Job ad: Satellite Operations Engineer","https://jobs.lever.co/loftorbital/bc16e2e5-65a3-412d-a186-1b9ea2a4e61c"],
 ["Job ad: Onboard Software Solutions Engineer","https://jobs.lever.co/loftorbital/796c6606-7834-4f9b-a3ea-22f57efdb4bb"],
 ["Early Careers Talent Pool","https://jobs.lever.co/loftorbital/8a38ed2d-48af-4b25-8b57-a75def3f3b70"],
 ["Altair-1 orbit data (OrbitalWiki, NORAD 100897)","https://www.orbitalwiki.com/satellites/100897"],
 ["Orbitworks on LinkedIn","https://linkedin.com/company/orbitworksuae"]
];
Object.assign(STR.en,{areaOw:"Orbitworks prep",navOw:"Orbitworks",
 areaDescOw:"Interview prep for Tuesday: company briefing, space navigation study track, playbook and NOVA mock interviews.",
 subOwBrief:"Briefing",subOwStudy:"Study track",subOwFormulas:"Formulas",subOwPlay:"Playbook",subOwQuiz:"Quiz",
 owTitle:"Orbitworks interview prep",owSub:"Recruiter call with Lobhana Ahale",owWhen:"Tue 1 Dec 2026 · 1:00 to 1:30 pm Dubai",
 owPractice:"Practise with NOVA",owAsk:"Ask NOVA",owStudy:"Start studying",owOpen:"Open prep",
 owLeft:"to go",owLive:"Call window now. You've got this.",owDone:"The call is done. Well done.",
 owBriefTitle:"Company briefing",owBriefHint:"What to know about Orbitworks before you speak to them. Every fact comes from public sources listed at the bottom.",
 owStudyTitle:"Space navigation study track",owStudyHint:"Twelve cards in the order a space-navigation graduate is most likely to be asked, each tied to what Orbitworks does. Open a card, read it, run the code, tap Mark as learned.",
 owFormTitle:"Formula and number sheet",owFormHint:"Numbers worth knowing by heart.",
 owPlayTitle:"Interview playbook",owPlayHint:"How the call works, your pitch, answer frames and what to ask.",
 owQuizTitle:"Space and Orbitworks quiz",owQuizHint:"Eight quick questions. Your best score is saved on this device.",
 owStats:"At a glance",owAccess:"Three ways to reach space",owTime:"Timeline",owProcess:"Hiring process",owHere:"Your call is most likely here",
 owMap:"Where your skills fit",owTalk:"Talking points",owSrc:"Sources",owVerify:"Facts as of 27 Nov 2026 from the sources below. Check the website once more on Monday for news.",
 owProg:"learned",
 mqTrackL:"Interview track",mqTrackOw:"Orbitworks (space)",mqTrackTr:"AI & Robotics Trainer",
 mqIntroOw:"NOVA plays the interviewer for an early-career role at Orbitworks, the UAE satellite company. Questions cover your story, the company, space navigation and fit. After every answer you get a score, what was strong, what was missing and the key points to cover.",
 mqKp:"Key points to cover",mqSrcOw:"curated Orbitworks question bank + live AI feedback",
 mqOwCat1:"Recruiter screen",mqOwCat2:"Orbitworks and the mission",mqOwCat3:"Space navigation and systems",mqOwCat4:"Behavioural and fit"});
Object.assign(STR.ar,{areaOw:"تحضير Orbitworks",navOw:"Orbitworks",
 areaDescOw:"تحضير مقابلة الثلاثاء: ملخص الشركة ومسار مذاكرة ملاحة الفضاء ودليل المقابلة ومقابلات تجريبية مع نوفا.",
 subOwBrief:"الملخص",subOwStudy:"المذاكرة",subOwFormulas:"المعادلات",subOwPlay:"الدليل",subOwQuiz:"اختبار",
 owTitle:"تحضير مقابلة Orbitworks",owSub:"مكالمة الريكروتر مع Lobhana Ahale",owWhen:"الثلاثاء 1 ديسمبر 2026 · 1:00 لـ 1:30 ظهرًا بتوقيت دبي",
 owPractice:"اتمرن مع نوفا",owAsk:"اسأل نوفا",owStudy:"ابدأ المذاكرة",owOpen:"افتح التحضير",
 owLeft:"فاضل",owLive:"وقت المكالمة دلوقتي. إنت قدها.",owDone:"المكالمة خلصت. برافو عليك.",
 owBriefTitle:"ملخص الشركة",owBriefHint:"اللي لازم تعرفه عن Orbitworks قبل ما تكلمهم. كل معلومة من مصادر عامة مذكورة تحت.",
 owStudyTitle:"مسار مذاكرة ملاحة الفضاء",owStudyHint:"اتناشر كارت بالترتيب اللي خريج ملاحة فضاء غالبًا هيتسأل بيه، وكل واحد مربوط بشغل Orbitworks. افتح الكارت واقرا وشغّل الكود وعلّم إنه اتعلّم.",
 owFormTitle:"ورقة المعادلات والأرقام",owFormHint:"أرقام تستاهل تحفظها.",
 owPlayTitle:"دليل المقابلة",owPlayHint:"المكالمة بتمشي إزاي وتعريفك وهياكل الإجابات وتسأل إيه.",
 owQuizTitle:"اختبار الفضاء وOrbitworks",owQuizHint:"تمان أسئلة سريعة. أفضل نتيجة بتتحفظ على جهازك.",
 owStats:"نظرة سريعة",owAccess:"تلات طرق للوصول للفضاء",owTime:"الخط الزمني",owProcess:"مراحل التوظيف",owHere:"مكالمتك غالبًا هنا",
 owMap:"فين مهاراتك تناسب",owTalk:"نقاط للكلام",owSrc:"المصادر",owVerify:"المعلومات لحد 27 نوفمبر 2026 من المصادر تحت. بص على الموقع تاني يوم الاثنين لأي أخبار.",
 owProg:"اتعلّم",
 mqTrackL:"مسار المقابلة",mqTrackOw:"Orbitworks (الفضاء)",mqTrackTr:"مدرّب ذكاء اصطناعي وروبوتكس",
 mqIntroOw:"نوفا هيلعب دور المحقق في وظيفة مبتدئين عند Orbitworks، شركة الأقمار الإماراتية. الأسئلة عن قصتك والشركة وملاحة الفضاء والتوافق. بعد كل إجابة هتاخد درجة واللي كان قوي واللي كان ناقص والنقاط اللي لازم تغطيها.",
 mqKp:"النقاط اللي لازم تغطيها",mqSrcOw:"بنك أسئلة Orbitworks مختار + تقييم ذكاء اصطناعي مباشر",
 mqOwCat1:"مكالمة الريكروتر",mqOwCat2:"Orbitworks والمهمة",mqOwCat3:"ملاحة الفضاء والأنظمة",mqOwCat4:"سلوك وتوافق"});

IC.ow='<circle cx="12" cy="12" r="2.4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-25 12 12)"/><path d="M19.500 4.500l-1.500 3 3-.5"/>';
AREAS.push("ow");
SUB.ow=[["#owBrief","subOwBrief"],["#owStudy","subOwStudy",1],["#owFormulas","subOwFormulas"],["#owPlay","subOwPlay",1],["#quiz-ow","subOwQuiz"]];

const owT=(en,ar)=>LANG==="ar"?ar:en;
function owCountdown(){
  const now=Date.now(),d=OW_TARGET-now;
  let big,small="";
  if(d>0){
    const days=Math.floor(d/864e5),h=Math.floor(d%864e5/36e5),m=Math.floor(d%36e5/6e4);
    const nf=n=>LANG==="ar"?String(n).replace(/\d/g,x=>"٠١٢٣٤٥٦٧٨٩"[x]):String(n);
    big=LANG==="ar"?`${nf(days)} يوم ${nf(h)} ساعة ${nf(m)} دقيقة`:`${days}d ${h}h ${m}m`;
    small=t("owLeft");
  }else if(now<OW_END){big=t("owLive")}else{big=t("owDone")}
  return {big,small,live:d<=0&&now<OW_END};
}
function owTick(){
  const c=owCountdown();
  document.querySelectorAll(".ow-cd").forEach(el=>{el.querySelector("b").textContent=c.big;el.querySelector("small").textContent=c.small;el.classList.toggle("live",c.live)});
}
setInterval(owTick,30000);
const owCdHTML=()=>{const c=owCountdown();return `<div class="ow-cd${c.live?" live":""}" role="timer"><span class="ow-dot" aria-hidden="true"></span><b>${c.big}</b><small>${c.small}</small></div>`};
const OW_RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
const OW_ORBIT=(()=>{
 const mot=(d,path)=>OW_RM?"":`<animateMotion dur="${d}" repeatCount="indefinite" path="${path}" rotate="auto"/>`;
 const P1="M14 110a96 34 0 1 0 192 0a96 34 0 1 0 -192 0",P2="M30 110a80 22 0 1 1 160 0a80 22 0 1 1 -160 0";
 return `<svg class="ow-orbsvg" viewBox="0 0 220 220" aria-hidden="true"><defs><radialGradient id="owE" cx="35%" cy="30%"><stop offset="0" stop-color="#3f8bff"/><stop offset=".6" stop-color="#143a8a"/><stop offset="1" stop-color="#0a1a4a"/></radialGradient></defs>
<g transform="rotate(38 110 110)"><path d="${P2}" fill="none" stroke="#ac8bff" stroke-opacity=".4" stroke-width="1.2"/><circle r="3.5" fill="#5ef0b8" cx="${OW_RM?190:0}" cy="${OW_RM?110:0}">${mot("22s",P2)}</circle></g>
<circle cx="110" cy="110" r="34" fill="url(#owE)"/><path d="M84 100q14-10 30-4t22 18M88 124q16 8 34 2" fill="none" stroke="#5ef0b8" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>
<g transform="rotate(-24 110 110)"><path d="${P1}" fill="none" stroke="#56e4ff" stroke-opacity=".55" stroke-width="1.4"/><g transform="${OW_RM?"translate(206 110)":""}"><rect x="-6" y="-3" width="12" height="6" rx="1.5" fill="#ffd479"/><rect x="-17" y="-2" width="9" height="4" fill="#56e4ff"/><rect x="8" y="-2" width="9" height="4" fill="#56e4ff"/>${mot("14s",P1)}</g></g></svg>`;
})();

function owBrief(){
  const s=owT;
  const stats=[["2024",s("Founded as a joint venture","تأسست كشراكة")],["50,000",s("sq ft facility in KEZAD, Abu Dhabi","قدم مربع منشأة في KEZAD بأبوظبي")],["10",s("Altair satellites planned","قمر Altair مخطط")],["1 Oct 2026",s("Altair-1 launched","إطلاق Altair-1")],["5",s("sensors on each satellite","حساسات على كل قمر")],["50 / yr",s("production capacity at scale","طاقة إنتاج عند الاكتمال")]];
  const access=[
   ["🛰",s("Physical missions","مهام فيزيائية"),s("Bring your payload. Orbitworks supplies the platform, integration, launch and operations. Dedicated spacecraft or hosted payload.","هات حمولتك. Orbitworks بتوفر المنصة والتكامل والإطلاق والتشغيل. مركبة مخصصة أو حمولة مستضافة.")],
   ["💻",s("Virtual missions","مهام افتراضية"),s("Bring your software. Deploy it to onboard compute and multi-sensor systems without building hardware.","هات برمجياتك. انشرها على حاسوب المتن وأنظمة الحساسات من غير ما تبني عتاد.")],
   ["📡",s("On-demand missions","مهام عند الطلب"),s("Use sensing, data and connectivity from satellites already in orbit, without building or launching one.","استخدم الاستشعار والبيانات والاتصال من أقمار موجودة في المدار من غير بناء أو إطلاق.")]];
  const time=[["2024",s("Orbitworks established: joint venture of Loft Orbital and Marlan Space","تأسيس Orbitworks: شراكة بين Loft Orbital وMarlan Space")],["2025",s("Altair unveiled","الإعلان عن Altair")],["Nov 2025",s("50,000 sq ft KEZAD facility inaugurated; Altair production starts","افتتاح منشأة KEZAD وبدء إنتاج Altair")],["Aug 2026",s("Altair-1 flown from the UAE to California","شحن Altair-1 من الإمارات لكاليفورنيا")],["1 Oct 2026",s("Altair-1 launches on SpaceX Transporter-18 from Vandenberg and deploys","إطلاق Altair-1 على Transporter-18 من Vandenberg والانفصال بنجاح")],["2027",s("Remaining nine Altair satellites follow","التسعة الباقيين من Altair")]];
  const proc=[[s("Initial contact","تواصل مبدئي")],[s("Introductory video call","مكالمة فيديو تعريفية"),1],[s("Technical or role screening","فرز تقني أو حسب الدور")],[s("Challenge or task (some roles)","مهمة أو تحدي (لبعض الوظائف)")],[s("Final interviews","مقابلات نهائية")]];
  const map=[
   [s("Satellite operations","عمليات الأقمار"),s("Flight dynamics, pass planning, telemetry, anomaly response. The ops job ad asks for Python, Git and automation, and Arabic is a plus.","ديناميكا الطيران وتخطيط التمريرات والتليمترية ومعالجة الأعطال. إعلان العمليات بيطلب بايثون وGit وأتمتة، والعربي ميزة.")],
   [s("Onboard software","برمجيات المتن"),s("There is an Onboard Software Solutions Engineer ad in Abu Dhabi. Attitude and navigation algorithms live here.","فيه إعلان Onboard Software Solutions Engineer في أبوظبي. خوارزميات الاتجاه والملاحة بتعيش هنا.")],
   [s("Test and integration","الاختبار والتكامل"),s("The company says it is growing in engineering infrastructure, satellite testing and operations. Sensor alignment and ADCS checks need navigation people.","الشركة بتقول إنها بتكبر في البنية الهندسية واختبار الأقمار والعمليات. محاذاة الحساسات وفحوص ADCS محتاجة ناس ملاحة.")],
   [s("Early Careers Talent Pool","مجمع المواهب للمبتدئين"),s("A graduate pool for engineers, not tied to one vacancy. They want curiosity, willingness to learn and getting hands-on.","مجمع للخريجين المهندسين مش مربوط بوظيفة واحدة. عايزين فضول واستعداد للتعلم والشغل العملي.")]];
  const talk=[
   s("'I want to build and operate navigation for satellites that are made right here in Abu Dhabi.'","'عايز أبني وأشغّل ملاحة لأقمار بتتصنع هنا في أبوظبي.'"),
   s("'Altair means the flying one, a star used to navigate by. As a navigation graduate that name made me smile.'","'Altair يعني الطائر، نجم بيتستخدم في الملاحة. كخريج ملاحة الاسم ده خلاني أبتسم.'"),
   s("'Onboard AI turns data into answers in minutes. That only works if orbit and attitude knowledge are accurate.'","'الذكاء على المتن بيحوّل البيانات لإجابات في دقايق. وده مش بيشتغل إلا لو معرفة المدار والاتجاه دقيقة.'"),
   s("'Going from design to launch inside the UAE in two years shows the whole chain works. I want to learn from that.'","'الانتقال من التصميم للإطلاق جوه الإمارات في سنتين بيثبت إن السلسلة كلها شغالة. عايز أتعلم من ده.'")];
  return `
  <div class="ow-stats">${stats.map(([a,b])=>`<div><b>${a}</b><span>${b}</span></div>`).join("")}</div>
  <h3 class="ow-h">${t("owAccess")}</h3>
  <div class="ow-cards">${access.map(([i,a,b])=>`<article><i>${i}</i><h4>${a}</h4><p>${b}</p></article>`).join("")}</div>
  <h3 class="ow-h">${t("owTime")}</h3>
  <ol class="ow-time">${time.map(([a,b])=>`<li><b>${a}</b><span>${b}</span></li>`).join("")}</ol>
  <h3 class="ow-h">${t("owProcess")}</h3>
  <ol class="ow-steps">${proc.map(([a,h],i)=>`<li class="${h?"here":""}"><em>${i+1}</em><span>${a}</span>${h?`<small>${t("owHere")}</small>`:""}</li>`).join("")}</ol>
  <h3 class="ow-h">${t("owMap")}</h3>
  <div class="ow-cards two">${map.map(([a,b])=>`<article><h4>${a}</h4><p>${b}</p></article>`).join("")}</div>
  <h3 class="ow-h">${t("owTalk")}</h3>
  <ul class="ow-talk">${talk.map(x=>`<li dir="auto">${x}</li>`).join("")}</ul>
  <h3 class="ow-h">${t("owSrc")}</h3>
  <p class="ow-note">${t("owVerify")}</p>
  <ul class="ow-src">${OW_SRC.map(([a,u])=>`<li><a href="${u}" target="_blank" rel="noopener">${a}</a></li>`).join("")}</ul>`;
}
function owFormulas(){
  return OW_FORMULAS.map(([a,b])=>`<div><small>${a}</small><b dir="ltr">${b}</b></div>`).join("");
}
function buildOw(){
  const root=document.getElementById("owRoot");
  root.innerHTML=`
  <section class="panel ow-hero" id="owHero"></section>
  <section class="panel" id="owBrief"><h2 data-i18n="owBriefTitle"></h2><p class="hint" data-i18n="owBriefHint"></p><div id="owBriefBody"></div></section>
  <section class="panel" id="owStudy"><h2 data-i18n="owStudyTitle"></h2><p class="hint" data-i18n="owStudyHint"></p><div class="lessons" id="owStudyList"></div></section>
  <section class="panel" id="owFormulas"><h2 data-i18n="owFormTitle"></h2><p class="hint" data-i18n="owFormHint"></p><div class="ow-form" id="owFormBody"></div></section>
  <section class="panel" id="owPlay"><h2 data-i18n="owPlayTitle"></h2><p class="hint" data-i18n="owPlayHint"></p><div class="lessons" id="owPlayList"></div></section>
  <section class="panel quiz-panel" id="quiz-ow"><h2 data-i18n="owQuizTitle"></h2><p class="hint" data-i18n="owQuizHint"></p><div class="quiz" data-area="ow"></div></section>`;
}
function renderOw(){
  if(!document.getElementById("owRoot"))return;
  const s=areaStats("ow");
  document.getElementById("owHero").innerHTML=`
   <div class="ow-hero-txt">
    <span class="ow-kicker">${t("owSub")}</span>
    <h2>${t("owTitle")}</h2>
    <p class="ow-when">${t("owWhen")}</p>
    ${owCdHTML()}
    <div class="prog"><div class="bar"><b style="width:${s.total?Math.round(s.done/s.total*100):0}%"></b></div><small>${s.done}/${s.total} ${t("owProg")}</small></div>
    <div class="ow-cta"><button type="button" class="primary" id="owGoMock">${t("owPractice")}</button><button type="button" class="ghost" id="owGoStudy">${t("owStudy")}</button><button type="button" class="ghost" id="owGoNova">${t("owAsk")}</button></div>
   </div>
   <div class="ow-hero-art" aria-hidden="true">${OW_ORBIT}</div>`;
  document.getElementById("owBriefBody").innerHTML=owBrief();
  mountAcc(document.getElementById("owStudyList"),OW_STUDY,-1);
  mountAcc(document.getElementById("owPlayList"),OW_PLAY,-1);
  document.getElementById("owFormBody").innerHTML=owFormulas();
  document.getElementById("owGoMock").addEventListener("click",owOpenMock);
  document.getElementById("owGoNova").addEventListener("click",()=>gotoNova());
  document.getElementById("owGoStudy").addEventListener("click",()=>document.getElementById("owStudy").scrollIntoView({behavior:"smooth",block:"start"}));
  if(typeof refreshDone==="function")refreshDone();
}
function owOpenMock(){
  try{MQ.track="ow";localStorage.setItem("lab-mock-track","ow")}catch(e){}
  document.getElementById("mockOpen").click();
}
/* keep the hero progress bar in step when a card is marked */
document.addEventListener("click",e=>{if(e.target.closest(".l-done")&&curArea==="ow")setTimeout(()=>{const s=areaStats("ow"),h=document.querySelector("#owHero .prog");if(h){h.querySelector("b").style.width=(s.total?Math.round(s.done/s.total*100):0)+"%";h.querySelector("small").textContent=`${s.done}/${s.total} ${t("owProg")}`}},30)});

/* ---------- home banner ---------- */
const _renderHome=renderHome;
renderHome=function(){
  _renderHome();
  const hero=document.querySelector("#homeRoot .hero");if(!hero)return;
  hero.insertAdjacentHTML("afterend",`<article class="ow-banner" id="owBanner" tabindex="0" role="link" aria-label="${t("owTitle")}">
    <div class="ow-b-art" aria-hidden="true">${OW_ORBIT}</div>
    <div class="ow-b-txt"><span class="ow-kicker">${t("owWhen")}</span><h3>${t("owTitle")}</h3><p>${t("areaDescOw")}</p>${owCdHTML()}
    <div class="ow-cta"><button type="button" class="primary" data-owgo="open">${t("owOpen")} →</button><button type="button" class="ghost" data-owgo="mock">${t("owPractice")}</button></div></div></article>`);
  const b=document.getElementById("owBanner");
  const go=()=>{setArea("ow");window.scrollTo({top:0,behavior:"smooth"})};
  b.addEventListener("click",e=>{const g=e.target.closest("[data-owgo]");if(g&&g.dataset.owgo==="mock"){e.stopPropagation();owOpenMock();return}go()});
  b.addEventListener("keydown",e=>{if(e.key==="Enter")go()});
};

/* ---------- wiring ---------- */
buildOw();
EXT_RENDER.push(renderOw);
window.addEventListener("areachange",()=>{if(curArea==="ow")owTick()});

/* ---------- mock interview: Orbitworks track helpers ---------- */
const OW_ORDER=[1,2,3,3,4,3,2,3,3,4];
function owShowKp(){
  let el=document.getElementById("owKp");
  const host=document.querySelector("#mqFb .mq-fbcards");
  if(!host)return;
  if(!el){el=document.createElement("div");el.id="owKp";el.className="mq-fbc kp";host.insertAdjacentElement("afterend",el)}
  if(MQ.track==="ow"&&MQ.kp){
    const ar=LANG==="ar";
    el.hidden=false;
    el.innerHTML=`<i>${t("mqKp")}</i><ul>${MQ.kp.map(k=>`<li dir="auto">${ar?k[1]:k[0]}</li>`).join("")}</ul>`;
  }else el.hidden=true;
}
function owHeuristic(ans,kp){
  const ar=LANG==="ar",n=mqNorm(ans),w=ans.split(/\s+/).filter(Boolean).length;
  const scored=kp.filter(k=>k[2]);
  const hit=scored.filter(k=>{try{return new RegExp(k[2]).test(n)}catch(e){return false}});
  const miss=scored.filter(k=>!hit.includes(k));
  let s;
  if(scored.length){s=Math.round(2+6*(hit.length/scored.length));if(w<12)s=Math.min(s,4);else if(w>=30&&hit.length)s+=1}
  else{s=w<8?2:w<20?4:w<45?6:7;if(/\d/.test(ans))s++;if(/مثال|example|for instance|such as|when i|لما/i.test(ans))s++}
  s=Math.max(1,Math.min(9,s));
  const strong=hit.length?(ar?"غطيت: ":"You covered: ")+(ar?hit[0][1]:hit[0][0])+".":(ar?"بدأت وجاوبت بصوتك، وده أهم خطوة.":"You answered out loud, which is the hardest step.");
  const missing=miss.length?(ar?"ناقص: ":"Missing: ")+(ar?miss[0][1]:miss[0][0])+".":(w<20?(ar?"الإجابة قصيرة. زوّد مثال محدد.":"The answer is short. Add one concrete example."):(ar?"ممكن تضيف رقم أو نتيجة تثبت الكلام.":"A number or result would make it land harder."));
  const hint=ar?"قسّمها: الفكرة في جملة، بعدين مثال أو رقم، وبعدين ليه ده مهم لـOrbitworks.":"Structure it: the idea in one sentence, then an example or number, then why it matters for Orbitworks.";
  return {score:s,strong,missing,hint};
}
document.querySelectorAll(".areas button[data-area=ow] i").forEach(i=>{i.innerHTML=ic("ow")});
window.OW_SYS=`\n\nINTERVIEW PREP MODE: The student is a fresh space-navigation graduate preparing for a recruiter call with Orbitworks (UAE satellite company) on Tuesday 1 Dec 2026. Orbitworks interview preparation, company questions, space navigation (orbital mechanics, GNSS, orbit determination, attitude determination and control, satellite subsystems, Earth observation, ground operations) and interview technique are all on topic, in addition to the topics above. When asked to quiz, ask ONE question at a time, wait for the answer, then give short feedback.\n\n${OW_FACTS}`;
