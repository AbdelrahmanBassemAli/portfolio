"use strict";
/* Mission Lab hub: home, navigation, search, progress, photo gallery, quizzes, credits, install (PWA). */

Object.assign(STR.en,{
 tagline:"Robotics · Space · AI",navHome:"Home",navNova:"Ask NOVA",install:"Install app",
 homeTitle:"Your learning hub for robotics, space and AI",
 homeSub:"Real boards, live simulators, Python lessons and NOVA, an AI teacher that answers in English and Arabic.",
 searchPh:"Search lessons, parts and topics…",noRes:"Nothing found. Try another word, or ask NOVA.",
 startArea:"Open",learnedOf:"learned",bestQuiz:"Best quiz",
 areaDescRobotics:"Tap the real Arduino Uno and Raspberry Pi 4, learn electronics, build projects, and code in Python.",
 areaDescSpace:"Orbit and GNSS simulators, satellite photos, and the ideas behind navigation, launch and communication.",
 areaDescAi:"Machine learning from zero: live regression and k-NN demos, and Python lessons you can run.",
 qaNova:"Ask NOVA",qaListen:"Listen mode",qaQuiz:"Quick quiz",
 contTitle:"Continue where you stopped",contNone:"Open any lesson and it will appear here.",
 factTitle:"Did you know?",
 installTitle:"Use it like an app",installBody:"Install Mission Lab on your phone: it opens full screen from its own icon and the lessons and photos still work without internet. NOVA's live answers need internet.",
 installAndroid:"Android (Chrome): menu ⋮ → Install app (or Add to Home screen).",installIos:"iPhone (Safari): Share → Add to Home Screen.",
 installNow:"Install now",installedOk:"Installed. Open Mission Lab from your home screen.",
 markDone:"Mark as learned",isDone:"Learned ✓",
 subBoards:"Boards",subPython:"Python",subElec:"Electronics",subProjects:"Projects",subQuiz:"Quiz",
 subSim:"Orbit simulator",subTypes:"Orbit types",subGnss:"GNSS demo",subGallery:"Photos",subConcepts:"Concepts",subCareer:"Career",
 subRegress:"Regression",subKnn:"k-NN",subLessons:"Lessons",
 elecTitle:"Electronics essentials",elecHint:"The short theory behind every circuit, from Ohm's law to safe power.",
 projTitle:"Build projects",projHint:"Six projects from a night light to a CanSat-style probe. Each lists parts, the idea, and starter code.",
 galTitle:"Real satellites and missions",galHint:"Photographs of real spacecraft and ground stations. Tap a photo to enlarge it.",
 quizTitle:"Check yourself",quizHint:"Five quick questions. Your best score is saved on this device.",
 quizCorrect:"Correct!",quizWrong:"Not quite. The right answer is highlighted.",quizNext:"Next",quizFinish:"See score",quizAgain:"Try again",quizScore:"Your score",
 credTitle:"Photo credits and licences",credBody:"Photographs come from Wikimedia Commons and are shown under their original licences. Tap a photo name to open its source page. The NOVA icon and the diagrams are original to Mission Lab.",
 close:"Close",profileBtn:"My notes",profileTitle:"My notes for NOVA",profileHint:"Optional. Write a few facts about yourself (role, skills, projects). They stay on this device and are only used to personalise Listen mode suggestions. Never include secrets.",profileSave:"Save",
 openSource:"Source page",resPart:"Board part",resLesson:"Lesson"});
Object.assign(STR.ar,{
 tagline:"روبوتكس · فضاء · ذكاء اصطناعي",navHome:"الرئيسية",navNova:"اسأل نوفا",install:"ثبّت التطبيق",
 homeTitle:"مركز تعلّمك للروبوتكس والفضاء والذكاء الاصطناعي",
 homeSub:"لوحات حقيقية ومحاكيات حية ودروس بايثون ونوفا، معلّم ذكي بيرد بالعربي والإنجليزي.",
 searchPh:"ابحث في الدروس والأجزاء والمواضيع…",noRes:"مفيش نتيجة. جرّب كلمة تانية أو اسأل نوفا.",
 startArea:"افتح",learnedOf:"اتعلّمت",bestQuiz:"أفضل اختبار",
 areaDescRobotics:"دوس على صورة أردوينو أونو وراسبيري باي 4 الحقيقية، وتعلّم الإلكترونيات، وابني مشاريع، وبرمج ببايثون.",
 areaDescSpace:"محاكيات للمدارات والـGNSS، وصور أقمار حقيقية، وأفكار الملاحة والإطلاق والاتصالات.",
 areaDescAi:"تعلّم الآلة من الصفر: عروض حية للانحدار وk-NN، ودروس بايثون تقدر تشغلها.",
 qaNova:"اسأل نوفا",qaListen:"وضع الاستماع",qaQuiz:"اختبار سريع",
 contTitle:"كمّل من حيث وقفت",contNone:"افتح أي درس وهيظهر هنا.",
 factTitle:"هل تعلم؟",
 installTitle:"استخدمه زي أي تطبيق",installBody:"ثبّت معمل المهام على موبايلك: بيفتح بملء الشاشة من أيقونته والدروس والصور بتشتغل من غير إنترنت. إجابات نوفا الحية محتاجة إنترنت.",
 installAndroid:"أندرويد (كروم): القائمة ⋮ ← تثبيت التطبيق (أو إضافة إلى الشاشة الرئيسية).",installIos:"آيفون (سفاري): مشاركة ← إضافة إلى الشاشة الرئيسية.",
 installNow:"ثبّت الآن",installedOk:"اتثبّت. افتح معمل المهام من الشاشة الرئيسية.",
 markDone:"علّم إنه اتعلّم",isDone:"اتعلّم ✓",
 subBoards:"اللوحات",subPython:"بايثون",subElec:"الإلكترونيات",subProjects:"المشاريع",subQuiz:"اختبار",
 subSim:"محاكي المدارات",subTypes:"أنواع المدارات",subGnss:"عرض GNSS",subGallery:"الصور",subConcepts:"المفاهيم",subCareer:"الوظائف",
 subRegress:"الانحدار",subKnn:"k-NN",subLessons:"الدروس",
 elecTitle:"أساسيات الإلكترونيات",elecHint:"النظرية المختصرة ورا كل دايرة، من قانون أوم لحد الكهربا الآمنة.",
 projTitle:"ابني مشاريع",projHint:"ستة مشاريع من أباجورة لحد مجس على طريقة CanSat. كل مشروع فيه القطع والفكرة وكود البداية.",
 galTitle:"أقمار ومهمات حقيقية",galHint:"صور حقيقية لمركبات فضائية ومحطات أرضية. دوس على الصورة لتكبيرها.",
 quizTitle:"اختبر نفسك",quizHint:"خمس أسئلة سريعة. أفضل نتيجة بتتحفظ على جهازك.",
 quizCorrect:"صح!",quizWrong:"مش بالظبط. الإجابة الصح متظللة.",quizNext:"التالي",quizFinish:"شوف النتيجة",quizAgain:"حاول تاني",quizScore:"نتيجتك",
 credTitle:"حقوق الصور والتراخيص",credBody:"الصور من ويكيميديا كومنز وبتظهر بتراخيصها الأصلية. دوس على اسم الصورة لفتح صفحة المصدر. أيقونة نوفا والرسوم التوضيحية أصلية لمعمل المهام.",
 close:"إغلاق",profileBtn:"ملاحظاتي",profileTitle:"ملاحظاتي لنوفا",profileHint:"اختياري. اكتب كام معلومة عنك (شغلك ومهاراتك ومشاريعك). بتفضل على جهازك وبتستخدم بس لتخصيص اقتراحات وضع الاستماع. متكتبش أسرار.",profileSave:"حفظ",
 openSource:"صفحة المصدر",resPart:"جزء من اللوحة",resLesson:"درس"});

/* ---------- extra content wired into the existing arrays ---------- */
(function wire(){
  const byEn=(arr,pre)=>arr.find(x=>x.en.title.startsWith(pre));
  const set=(arr,pre,img)=>{const x=byEn(arr,pre);if(x)x.img=img};
  set(ORBTYPES,"LEO","iss");set(ORBTYPES,"MEO","galileo");
  set(CONCEPTS,"The UAE","hope");set(CONCEPTS,"Space debris","cubesat");
  set(CONCEPTS,"Navigation for robots","hopemodel");
  if(typeof ORBTYPES!=="undefined")set(ORBTYPES,"GEO","ground");
  CONCEPTS.push(...SPACE_MORE);
  AILESS.push(...AI_MORE);
  const sub=byEn(CONCEPTS,"Anatomy");if(sub)sub.img="sputnik";
  const gnss=byEn(CONCEPTS,"GNSS constellations");if(gnss)gnss.img="gps";
})();
/* Anatomy/GNSS are in CONCEPTS or ORBTYPES depending on the build; also try the other arrays */
[ORBTYPES,CONCEPTS].forEach(arr=>arr.forEach(x=>{
  if(!x.img&&/^Anatomy/.test(x.en.title))x.img="sputnik";
  if(!x.img&&/^GNSS constellations/.test(x.en.title))x.img="gps";
  if(!x.img&&/^Ground stations/.test(x.en.title))x.img="ground";
}));

/* ---------- small helpers ---------- */
const $=(s,r)=>(r||document).querySelector(s),$$=(s,r)=>Array.from((r||document).querySelectorAll(s));
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const AREAS=["home","robotics","space","ai"];
const IC={
 home:'<path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"/>',
 robotics:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
 space:'<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)"/>',
 ai:'<circle cx="5" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><path d="M7 6l3.5 5M7 18l3.5-5M14 12h3"/>',
 nova:'<path d="M12 2c.6 6 3.4 8.4 10 10-6.600 1.600-9.400 4-10 10-.6-6-3.400-8.400-10-10 6.600-1.600 9.400-4 10-10z"/>',
 mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/>',
 quiz:'<circle cx="12" cy="12" r="9"/><path d="M9.500 9.500a2.500 2.500 0 115 0c0 1.500-2.500 2-2.500 4M12 17v.5"/>'};
const ic=k=>`<svg class="ic" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[k]||""}</svg>`;
const ICON=new Proxy({},{get:(_,k)=>ic(k)});
const nrm=s=>String(s||"").toLowerCase().replace(/[\u0640\u064B-\u0652]/g,"").replace(/[إأآ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه");

/* modal */
function openModal(html,cls){
  const r=$("#modalRoot");
  r.innerHTML=`<div class="modal" role="dialog" aria-modal="true"><div class="modal-card ${cls||""}"><button type="button" class="modal-x" aria-label="${t("close")}">✕</button>${html}</div></div>`;
  const m=$(".modal",r);document.body.classList.add("noscroll");
  const close=()=>{r.innerHTML="";document.body.classList.remove("noscroll");document.removeEventListener("keydown",esc)};
  const esc=e=>{if(e.key==="Escape")close()};
  document.addEventListener("keydown",esc);
  m.addEventListener("click",e=>{if(e.target===m)close()});
  $(".modal-x",r).addEventListener("click",close);
  return close;
}

/* ---------- panels injected into the existing areas ---------- */
function injectPanels(){
  const rob=$("#area-robotics");
  const python=$("#python");
  python.insertAdjacentHTML("afterend",`
   <section class="panel" id="elec"><h2 data-i18n="elecTitle"></h2><p class="hint" data-i18n="elecHint"></p><div class="lessons" id="elecList"></div></section>
   <section class="panel" id="projects"><h2 data-i18n="projTitle"></h2><p class="hint" data-i18n="projHint"></p><div class="lessons" id="projList"></div></section>
   <section class="panel quiz-panel" id="quiz-robotics"><h2 data-i18n="quizTitle"></h2><p class="hint" data-i18n="quizHint"></p><div class="quiz" data-area="robotics"></div></section>`);
  const conc=$("#spConcepts").closest(".panel");
  conc.insertAdjacentHTML("beforebegin",`<section class="panel" id="gallery"><h2 data-i18n="galTitle"></h2><p class="hint" data-i18n="galHint"></p><div class="gallery" id="galGrid"></div></section>`);
  $("#spInterview").closest(".panel").insertAdjacentHTML("afterend",`<section class="panel quiz-panel" id="quiz-space"><h2 data-i18n="quizTitle"></h2><p class="hint" data-i18n="quizHint"></p><div class="quiz" data-area="space"></div></section>`);
  $("#aiLessons").closest(".panel").insertAdjacentHTML("afterend",`<section class="panel quiz-panel" id="quiz-ai"><h2 data-i18n="quizTitle"></h2><p class="hint" data-i18n="quizHint"></p><div class="quiz" data-area="ai"></div></section>`);
}
injectPanels();

function renderGallery(){
  const keys=["iss","hubble","sputnik","galileo","gps","cubesat","starlink","hope","hopemodel","ground"];
  $("#galGrid").innerHTML=keys.map(k=>{const p=PHOTOS[k];return `<button type="button" class="g-item" data-k="${k}"><img loading="lazy" src="${p.src}" alt="${p.cap[LANG]}"><span>${p.cap[LANG]}</span></button>`}).join("");
  $$("#galGrid .g-item").forEach(b=>b.addEventListener("click",()=>{
    const p=PHOTOS[b.dataset.k];
    openModal(`<figure class="lightbox"><img src="${p.src}" alt="${p.cap[LANG]}"><figcaption><b>${p.cap[LANG]}</b><br><a href="${p.page}" target="_blank" rel="noopener">${p.by}</a> · ${p.lic} · ${t("openSource")}</figcaption></figure>`,"wide");
  }));
}
function renderExtraLists(){
  mountAcc($("#elecList"),ELEC,-1);
  mountAcc($("#projList"),PROJECTS,-1);
}

/* ---------- progress ("learned") ---------- */
const doneSet=()=>new Set(store.get("lab-done",[]));
function refreshDone(){
  const ds=doneSet();
  $$(".l-done").forEach(b=>{const on=ds.has(b.dataset.k);b.classList.toggle("on",on);b.textContent=on?t("isDone"):t("markDone");b.closest(".lesson").classList.toggle("is-done",on)});
}
document.addEventListener("click",e=>{
  const b=e.target.closest(".l-done");
  if(b){const ds=doneSet();ds.has(b.dataset.k)?ds.delete(b.dataset.k):ds.add(b.dataset.k);store.set("lab-done",[...ds]);refreshDone();renderHomeProgress();return}
  const lb=e.target.closest(".lesson>button");
  if(lb){const l=lb.parentElement,area=l.closest(".area");if(area&&l.id&&l.classList.contains("open"))store.set("lab-last",{id:l.id,area:area.id.replace("area-","")})}
});
function areaStats(a){
  const ds=doneSet(),ls=$$(".lesson",$("#area-"+a));
  const done=ls.filter(l=>{const k=$(".l-done",l);return k&&ds.has(k.dataset.k)}).length;
  return {done,total:ls.length};
}

/* ---------- home ---------- */
const AREA_PHOTO={robotics:"uno",space:"iss"};
const NEURAL=`<svg viewBox="0 0 320 180" aria-hidden="true"><defs><linearGradient id="nn" x1="0" x2="1"><stop offset="0" stop-color="#56e4ff"/><stop offset="1" stop-color="#ac8bff"/></linearGradient></defs><rect width="320" height="180" fill="#0a1230"/>
${[[50,40],[50,90],[50,140],[130,25],[130,70],[130,110],[130,155],[210,55],[210,105],[210,150],[285,90]].map(()=>"").join("")}
<g stroke="url(#nn)" stroke-width="1.2" opacity=".5">${(()=>{const L=[[[50,40],[50,90],[50,140]],[[130,25],[130,70],[130,110],[130,155]],[[210,55],[210,105],[210,150]],[[285,90]]];let s="";for(let i=0;i<3;i++)for(const a of L[i])for(const b of L[i+1])s+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`;return s})()}</g>
<g fill="#ffd479">${[[50,40],[50,90],[50,140],[130,25],[130,70],[130,110],[130,155],[210,55],[210,105],[210,150]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="8"/>`).join("")}</g><circle cx="285" cy="90" r="11" fill="#5ef0b8"/></svg>`;

function renderHome(){
  const fact=FACTS[(new Date().getDate())%FACTS.length];
  const last=store.get("lab-last",null);
  let lastHTML=`<p class="muted">${t("contNone")}</p>`;
  if(last){const el=document.getElementById(last.id);if(el){const ti=$(".l-title",el).textContent;lastHTML=`<button type="button" class="cont-btn" data-go="${last.area}" data-id="${last.id}"><i>${ICON[last.area]}</i><span>${ti}</span><em>→</em></button>`}}
  const cards=["robotics","space","ai"].map(a=>{
    const key=a==="robotics"?"Robotics":a==="space"?"Space":"Ai";
    const media=AREA_PHOTO[a]?`<img src="${PHOTOS[AREA_PHOTO[a]==="uno"?"uno":"iss"].src}" alt="" loading="lazy">`:NEURAL;
    const q=store.get("lab-quiz",{})[a];
    return `<article class="area-card" data-go="${a}" tabindex="0" role="link">
      <div class="ac-media">${media}</div>
      <div class="ac-body"><h3><i>${ICON[a]}</i>${t("area"+key)}</h3><p>${t("areaDesc"+key)}</p>
      <div class="prog"><div class="bar"><b id="pb-${a}"></b></div><small id="pt-${a}"></small></div>
      ${q!=null?`<small class="qbest">${t("bestQuiz")}: ${q}/5</small>`:""}
      <span class="ac-go">${t("startArea")} →</span></div></article>`}).join("");
  $("#homeRoot").innerHTML=`
  <section class="hero">
    <img class="hero-logo" src="assets/nova.svg" alt="" width="84" height="84">
    <h2>${t("homeTitle")}</h2><p>${t("homeSub")}</p>
    <div class="search"><input id="hubSearch" type="search" autocomplete="off" placeholder="${t("searchPh")}" aria-label="${t("searchPh")}"><div class="search-res" id="searchRes" hidden></div></div>
    <div class="quick"><button type="button" data-qa="mock">${ic("nova")} ${t("mqOpen")}</button><button type="button" data-qa="nova">${ic("nova")} ${t("qaNova")}</button><button type="button" data-qa="listen">${ic("mic")} ${t("qaListen")}</button><button type="button" data-qa="quiz">${ic("quiz")} ${t("qaQuiz")}</button></div>
  </section>
  <div class="area-cards">${cards}</div>
  <div class="home-row">
    <section class="panel"><h2>${t("contTitle")}</h2>${lastHTML}</section>
    <section class="panel fact"><h2>${t("factTitle")}</h2><p>${fact[LANG]}</p></section>
  </div>
  <section class="panel install-card"><div><h2>${t("installTitle")}</h2><p>${t("installBody")}</p><p class="muted">${t("installAndroid")}<br>${t("installIos")}</p></div><button type="button" class="primary" id="installNow">${t("installNow")}</button></section>`;
  $$("[data-go]",$("#homeRoot")).forEach(el=>{
    const go=()=>{setArea(el.dataset.go);if(el.dataset.id)openLesson(el.dataset.id);else window.scrollTo({top:0,behavior:"smooth"})};
    el.addEventListener("click",go);el.addEventListener("keydown",e=>{if(e.key==="Enter")go()});
  });
  $$("[data-qa]",$("#homeRoot")).forEach(b=>b.addEventListener("click",()=>{
    const q=b.dataset.qa;
    if(q==="mock")$("#mockOpen").click();else if(q==="nova")gotoNova();else if(q==="listen")$("#listenOpen").click();
    else{setArea("robotics");setTimeout(()=>$("#quiz-robotics").scrollIntoView({behavior:"smooth",block:"start"}),60)}
  }));
  $("#installNow").addEventListener("click",doInstall);
  const si=$("#hubSearch");si.addEventListener("input",()=>runSearch(si.value));
  renderHomeProgress();
}
function renderHomeProgress(){
  ["robotics","space","ai"].forEach(a=>{
    const s=areaStats(a),b=$("#pb-"+a),tx=$("#pt-"+a);if(!b)return;
    b.style.width=(s.total?Math.round(s.done/s.total*100):0)+"%";tx.textContent=`${s.done}/${s.total} ${t("learnedOf")}`;
  });
}
function openLesson(id){
  const el=document.getElementById(id);if(!el)return;
  $$(".lesson",el.parentElement).forEach(x=>{x.classList.remove("open");x.firstElementChild.setAttribute("aria-expanded","false")});
  el.classList.add("open");el.firstElementChild.setAttribute("aria-expanded","true");
  setTimeout(()=>el.scrollIntoView({behavior:"smooth",block:"start"}),80);
}
function gotoNova(){const x=$("#teacher");x.scrollIntoView({behavior:"smooth",block:"start"});setTimeout(()=>$("#chatInput").focus({preventScroll:true}),500)}

/* ---------- search ---------- */
function runSearch(q){
  const box=$("#searchRes");q=nrm(q.trim());
  if(q.length<2){box.hidden=true;box.innerHTML="";return}
  const hits=[];
  $$(".lesson").forEach(l=>{
    const title=$(".l-title",l).textContent,txt=nrm(title+" "+$(".l-tag",l).textContent+" "+$(".l-body p",l).textContent);
    if(txt.includes(q)){const a=l.closest(".area").id.replace("area-","");hits.push({kind:"lesson",id:l.id,area:a,title,score:nrm(title).includes(q)?2:1})}
  });
  ["uno","rpi"].forEach(b=>BOARDS[b].parts.forEach((p,i)=>{
    const L=p[LANG],txt=nrm(L.name+" "+L.what+" "+L.does);
    if(txt.includes(q))hits.push({kind:"part",board:b,id:p.id,area:"robotics",title:L.name.split("—")[0].trim()+" ("+(b==="uno"?"Uno":"Pi 4")+")",score:nrm(L.name).includes(q)?2:1});
  }));
  hits.sort((a,b)=>b.score-a.score);
  const top=hits.slice(0,8);
  box.hidden=false;
  box.innerHTML=top.length?top.map((h,i)=>`<button type="button" data-i="${i}"><i>${ICON[h.area]}</i><span>${h.title}</span><small>${h.kind==="part"?t("resPart"):t("resLesson")}</small></button>`).join(""):`<p>${t("noRes")}</p>`;
  $$("button",box).forEach(b=>b.addEventListener("click",()=>{
    const h=top[+b.dataset.i];setArea(h.area);
    if(h.kind==="lesson")openLesson(h.id);
    else{switchBoard(h.board);selectPart(h.id,false);setTimeout(()=>$("#boards").scrollIntoView({behavior:"smooth"}),80)}
  }));
}

/* ---------- quiz ---------- */
const QS={};
function renderQuiz(root){
  const a=root.dataset.area,Q=QUIZ[a],st=QS[a]||(QS[a]={i:0,score:0,done:false,picked:null});
  if(st.done){
    root.innerHTML=`<div class="q-end"><div class="q-score">${st.score}<small>/${Q.length}</small></div><p>${t("quizScore")}</p><button type="button" class="primary" id="qa-${a}">${t("quizAgain")}</button></div>`;
    $("button",root).addEventListener("click",()=>{QS[a]=null;renderQuiz(root)});return;
  }
  const q=Q[st.i][LANG];
  root.innerHTML=`<div class="q-top"><span>${st.i+1}/${Q.length}</span><div class="bar"><b style="width:${st.i/Q.length*100}%"></b></div></div>
   <h3 class="q-text" dir="auto">${q.q}</h3>
   <div class="q-opts">${q.o.map((o,i)=>`<button type="button" data-i="${i}" dir="auto">${o}</button>`).join("")}</div>
   <div class="q-fb" role="status"></div><div class="q-nav"></div>`;
  const opts=$$(".q-opts button",root);
  const pick=i=>{
    if(st.picked!=null)return;st.picked=i;const ok=i===Q[st.i].a;if(ok)st.score++;
    opts.forEach((b,j)=>{b.disabled=true;if(j===Q[st.i].a)b.classList.add("right");else if(j===i)b.classList.add("wrong")});
    $(".q-fb",root).textContent=ok?t("quizCorrect"):t("quizWrong");
    const last=st.i===Q.length-1;
    $(".q-nav",root).innerHTML=`<button type="button" class="primary">${last?t("quizFinish"):t("quizNext")}</button>`;
    $(".q-nav button",root).addEventListener("click",()=>{
      st.picked=null;
      if(last){st.done=true;const best=store.get("lab-quiz",{});if((best[a]||0)<st.score)best[a]=st.score;store.set("lab-quiz",best);renderHome()}else st.i++;
      renderQuiz(root);
    });
  };
  opts.forEach(b=>b.addEventListener("click",()=>pick(+b.dataset.i)));
  if(st.picked!=null){/* language switch mid-question */const p=st.picked;st.picked=null;pick(p);st.score-=(p===Q[st.i].a?1:0)}
}
function renderQuizzes(){$$(".quiz").forEach(renderQuiz)}

/* ---------- subnav ---------- */
const SUB={
 robotics:[["#boards","subBoards"],["#python","subPython"],["#elec","subElec"],["#projects","subProjects"],["#quiz-robotics","subQuiz"]],
 space:[["#orbits","subSim"],["#orbTypes","subTypes",1],["#gnss","subGnss"],["#gallery","subGallery"],["#spConcepts","subConcepts",1],["#spInterview","subCareer",1],["#quiz-space","subQuiz"]],
 ai:[["#regPanel","subRegress"],["#knnPanel","subKnn"],["#aiLessons","subLessons",1],["#quiz-ai","subQuiz"]]
};
function renderSubnav(){
  const nav=$("#subnav"),a=curArea;
  if(a==="home"||!SUB[a]){nav.innerHTML="";nav.hidden=true;return}
  nav.hidden=false;
  nav.innerHTML=SUB[a].map(([sel,k,up])=>`<button type="button" data-sel="${sel}" data-up="${up?1:0}">${t(k)}</button>`).join("");
  $$("button",nav).forEach(b=>b.addEventListener("click",()=>{
    let el=$(b.dataset.sel);if(!el)return;if(b.dataset.up==="1")el=el.closest(".panel");
    const y=el.getBoundingClientRect().top+scrollY-($("#subnav").offsetHeight+10);
    window.scrollTo({top:y,behavior:"smooth"});
  }));
}
/* bottom nav (mobile) */
function renderBnav(){
  const items=[["home","navHome"],["robotics","areaRobotics"],["space","areaSpace"],["ai","areaAi"],["nova","navNova"]];
  $("#bnav").innerHTML=items.map(([k,l])=>`<button type="button" data-k="${k}" class="${k===curArea?"on":""}"><i>${ICON[k]}</i><span>${t(l)}</span></button>`).join("");
  $$("#bnav button").forEach(b=>b.addEventListener("click",()=>{b.dataset.k==="nova"?gotoNova():(setArea(b.dataset.k),window.scrollTo({top:0,behavior:"smooth"}))}));
}

/* ---------- credits, profile, install ---------- */
function openCredits(){
  const rows=Object.keys(PHOTOS).map(k=>{const p=PHOTOS[k];return `<li><a href="${p.page}" target="_blank" rel="noopener">${p.cap[LANG]}</a><small>${p.by} · ${p.licUrl?`<a href="${p.licUrl}" target="_blank" rel="noopener">${p.lic}</a>`:p.lic}</small></li>`}).join("");
  openModal(`<h2>${t("credTitle")}</h2><p class="hint">${t("credBody")}</p><ul class="credits">${rows}</ul>`);
}
function openProfile(){
  const close=openModal(`<h2>${t("profileTitle")}</h2><p class="hint">${t("profileHint")}</p><textarea id="profTxt" rows="7" dir="auto" maxlength="1500">${(localStorage.getItem("lab-profile")||"").replace(/</g,"&lt;")}</textarea><button type="button" class="primary" id="profSave">${t("profileSave")}</button>`);
  $("#profSave").addEventListener("click",()=>{localStorage.setItem("lab-profile",$("#profTxt").value.trim());close()});
}
let deferredPrompt=null;
const standalone=()=>matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;updateInstallBtn()});
window.addEventListener("appinstalled",()=>{deferredPrompt=null;updateInstallBtn()});
function updateInstallBtn(){$("#installBtn").hidden=standalone()}
async function doInstall(){
  if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice.catch(()=>{});deferredPrompt=null;return}
  openModal(`<h2>${t("installTitle")}</h2><p>${t("installBody")}</p><p>${t("installAndroid")}</p><p>${t("installIos")}</p>`);
}
$("#installBtn").addEventListener("click",doInstall);
$("#creditsOpen").addEventListener("click",openCredits);
if("serviceWorker" in navigator&&(location.protocol==="https:"||location.hostname==="localhost"))
  window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));

/* ---------- wiring ---------- */
$("#navNova").addEventListener("click",gotoNova);
$$(".areas button[data-area]").forEach(b=>$("i",b).innerHTML=ic(b.dataset.area));
$("#navNova i").innerHTML=ic("nova");$("#listenOpen i").innerHTML=ic("mic");
$("#brand").addEventListener("click",e=>{e.preventDefault();setArea("home");window.scrollTo({top:0,behavior:"smooth"})});
$$("#viewSw button").forEach(b=>b.addEventListener("click",()=>setBoardView(b.dataset.v)));
document.body.insertBefore($("#subnav"),$("main"));
/* listen mode: add a "My notes" button */
(function(){const f=document.querySelector(".ls-foot");if(f){const b=document.createElement("button");b.type="button";b.className="linkish";b.id="lsProfile";b.addEventListener("click",openProfile);f.appendChild(b)}})();

function hubRender(){
  renderBoard();renderGallery();renderExtraLists();renderQuizzes();refreshDone();
  const pb=$("#lsProfile");if(pb)pb.textContent=t("profileBtn");
  renderBnav();renderSubnav();renderHome();updateInstallBtn();
}
EXT_RENDER.push(hubRender);
window.addEventListener("areachange",()=>{renderBnav();renderSubnav();$$(".areas button[data-area]").forEach(b=>b.classList.toggle("on",b.dataset.area===curArea));if(curArea==="home")renderHome()});
window.addEventListener("hashchange",()=>{const h=location.hash.slice(1);if(h==="nova")gotoNova();else if(AREAS.includes(h)&&h!==curArea)setArea(h,true)});
window.addEventListener("load",()=>{if(location.hash==="#nova")setTimeout(gotoNova,400)});
/* deep links: ?board=rpi&part=gpio  and  ?open=<lesson id> */
window.addEventListener("load",()=>{
  const q=new URLSearchParams(location.search),b=q.get("board");
  if(b&&BOARDS[b]){switchBoard(b);if(q.get("part"))selectPart(q.get("part"),false)}
  if(q.get("open")&&document.getElementById(q.get("open")))openLesson(q.get("open"));
  const solo=q.get("solo");if(solo&&/^[A-Za-z0-9_-]+$/.test(solo)){const el=document.getElementById(solo);if(el){const p=el.closest(".panel")||el;$$(".panel").forEach(x=>{if(x!==p&&!x.contains(p)&&!p.contains(x)&&x.id!=="teacher")x.style.display="none"})}}
  const go=q.get("go");if(go&&/^[A-Za-z0-9_-]+$/.test(go)){const el=document.getElementById(go);if(el)setTimeout(()=>el.scrollIntoView({block:"start"}),300)}
  if(q.get("lang")==="ar"&&LANG!=="ar")setLang("ar");
});
