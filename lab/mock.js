"use strict";
/* Mock interview mode: NOVA plays the interviewer for an AI & Robotics Trainer
   role. Questions come one at a time from the live AI (keyless, same endpoints
   as NOVA) with a bilingual offline bank as fallback. The candidate answers by
   voice (same hardened recognition pattern as listen mode: explicit tap to
   start, cross-restart segment dedupe, language picker) or by typing. Each
   answer gets scored feedback; the session ends with strengths, weaknesses and
   the top 3 fixes. */
Object.assign(STR.en,{
 mqOpen:"Mock interview",mqTitle:"Mock interview with NOVA",
 mqIntro:"NOVA plays the interviewer for an AI & Robotics Trainer role. Answer out loud or by typing, get instant feedback after every answer, and a summary at the end.",
 mqHowMany:"How many questions?",mqStart:"Start the interview",
 mqBest:"Best overall so far",
 mqQof:"Question",mqOf:"of",mqScore:"Score",
 mqAnswerNow:"Your answer",mqTapMic:"Tap the mic, answer, then tap it again to stop",
 mqListening:"Listening",mqThinking:"NOVA is reading your answer…",
 mqType:"Type your answer here, or speak it…",mqSubmit:"Submit answer",
 mqSkip:"Skip",mqEnd:"End",
 mqStrong:"What was strong",mqMissing:"What was missing",mqHint:"Say it better",
 mqNext:"Next question",mqFinish:"See my summary",
 mqSumTitle:"Interview summary",mqOverall:"Overall",
 mqStrengths:"Your strengths",mqWeak:"Work on these",mqFixes:"Fix these 3 before the real interview",
 mqAgain:"Practice again",mqClose:"Close",
 mqLive:"live AI interviewer",mqOff:"offline question bank",
 mqCat1:"Getting to know you",mqCat2:"Robotics & hardware",mqCat3:"Python & AI",mqCat4:"Teaching scenarios",
 mqEmpty:"Say or type an answer first — even a rough one counts.",
 mqNewQ:"NOVA is preparing the next question…"});
Object.assign(STR.ar,{
 mqOpen:"مقابلة تجريبية",mqTitle:"مقابلة تجريبية مع نوفا",
 mqIntro:"نوفا هيلعب دور المحقق في مقابلة لوظيفة مدرّب ذكاء اصطناعي وروبوتكس. جاوب بصوتك أو بالكتابة، وخد تقييم فوري بعد كل إجابة، وملخص في الآخر.",
 mqHowMany:"كام سؤال؟",mqStart:"ابدأ المقابلة",
 mqBest:"أحسن نتيجة لحد دلوقتي",
 mqQof:"سؤال",mqOf:"من",mqScore:"النتيجة",
 mqAnswerNow:"إجابتك",mqTapMic:"دوس على المايك، جاوب، ودوس عليه تاني عشان يوقف",
 mqListening:"بيسمعك",mqThinking:"نوفا بيراجع إجابتك…",
 mqType:"اكتب إجابتك هنا، أو قولها…",mqSubmit:"سلّم الإجابة",
 mqSkip:"تخطَّ",mqEnd:"إنهاء",
 mqStrong:"اللي كان قوي",mqMissing:"اللي كان ناقص",mqHint:"قولها أحسن كده",
 mqNext:"السؤال اللي بعده",mqFinish:"شوف الملخص",
 mqSumTitle:"ملخص المقابلة",mqOverall:"الإجمالي",
 mqStrengths:"نقاط قوتك",mqWeak:"اشتغل على دول",mqFixes:"ظبط الـ3 دول قبل المقابلة الحقيقية",
 mqAgain:"اتمرّن تاني",mqClose:"إغلاق",
 mqLive:"محقق ذكاء اصطناعي مباشر",mqOff:"بنك أسئلة بدون إنترنت",
 mqCat1:"نتعرف عليك",mqCat2:"روبوتكس وهاردوير",mqCat3:"بايثون وذكاء اصطناعي",mqCat4:"مواقف تدريس",
 mqEmpty:"قول أو اكتب إجابة الأول — حتى لو مش مظبوطة.",
 mqNewQ:"نوفا بيحضّر السؤال اللي بعده…"});

/* ---------- offline question bank (bilingual, 4 categories) ---------- */
const MQ_BANK=[
 {c:1,en:"Tell me about yourself and why you want to be an AI and robotics trainer.",ar:"عرّفنا بنفسك، وليه عايز تبقى مدرّب ذكاء اصطناعي وروبوتكس؟"},
 {c:1,en:"What is your greatest strength as a teacher or engineer? Give a real example.",ar:"إيه أقوى نقطة فيك كمدرس أو مهندس؟ ادينا مثال حقيقي."},
 {c:1,en:"Tell me about a project you are proud of. What was your exact role in it?",ar:"احكيلنا عن مشروع فخور بيه. كان إيه دورك فيه بالظبط؟"},
 {c:1,en:"Why should we hire you for this trainer role?",ar:"ليه نعيّنك إنت في وظيفة المدرّب دي؟"},
 {c:2,en:"What is the difference between Arduino and Raspberry Pi, and when would you use each?",ar:"إيه الفرق بين الأردوينو والراسبيري باي، وإمتى تستخدم كل واحد؟"},
 {c:2,en:"A student connects a 5V sensor straight to a Raspberry Pi pin. What is wrong, and how do you fix it?",ar:"طالب وصّل حساس 5 فولت مباشرة بطرف راسبيري باي. إيه الغلط، وتصلّحه إزاي؟"},
 {c:2,en:"Explain PWM to a beginner, and name two projects that need it.",ar:"اشرح الـPWM لمبتدئ، وسمّي مشروعين محتاجينه."},
 {c:2,en:"How would you build a simple obstacle-avoiding robot? Walk me through the parts and the logic.",ar:"هتعمل روبوت بيتفادى العوائق إزاي؟ ورّيني القطع والمنطق خطوة بخطوة."},
 {c:3,en:"Explain Python loops and functions to a 12-year-old, with one tiny example.",ar:"اشرح حلقات ودوال بايثون لطفل عنده 12 سنة، بمثال صغير واحد."},
 {c:3,en:"What is machine learning, in simple words? Give one example a student could build.",ar:"يعني ايه تعلم الآلة بكلام بسيط؟ ادينا مثال طالب يقدر يبنيه."},
 {c:3,en:"How would you explain a neural network to a class that only knows basic Python?",ar:"هتشرح الشبكة العصبية إزاي لفصل مش عارف غير أساسيات بايثون؟"},
 {c:3,en:"A student's code throws an error and they panic. What debugging steps do you teach?",ar:"كود طالب طلّع خطأ والطالب اتوتر. إيه خطوات حل الأخطاء اللي بتعلّمها؟"},
 {c:4,en:"How do you keep a class of beginners engaged when the topic gets dry?",ar:"بتحافظ على حماس فصل مبتدئين إزاي لما الموضوع يبقى تقيل؟"},
 {c:4,en:"One student is far ahead and another is lost. What do you do in that lesson?",ar:"طالب متفوق جدًا وطالب تاني تايه خالص. تعمل ايه في الحصة دي؟"},
 {c:4,en:"How do you check that students actually understood, beyond asking 'any questions?'",ar:"بتتأكد إن الطلبة فهموا فعلًا إزاي، غير إنك تسأل: حد عنده سؤال؟"},
 {c:4,en:"Describe how you would run your very first session with a new robotics class.",ar:"اوصفلنا هتعمل أول حصة ليك مع فصل روبوتكس جديد إزاي."}];

const mqRole=()=>MQ.track==="ow"?OW_ROLE:MQ_ROLE;
const MQ_ROLE="AI and Robotics Trainer (teaching Arduino, Raspberry Pi, Python and beginner AI/ML to students)";
const MQ_QSYS=lng=>`You are NOVA, a warm but professional interviewer running a mock job interview for the role: ${mqRole()}.
Write the NEXT interview question, one only.
Rules:
- Output ONLY the question text: 1-2 sentences, plain text, no numbering, no quotes, no emojis.
- Write the question in ${lng}.
- Match the requested CATEGORY. Do not repeat or rephrase any earlier question.
- Keep it realistic for a junior-to-mid trainer candidate.${MQ.track==="ow"?OW_CTX:""}`;
const MQ_FBSYS=lng=>`You are NOVA, an interview coach evaluating one answer in a mock interview for the role: ${mqRole()}.
The candidate's answer came from speech-to-text and may contain recognition errors; judge the meaning, not the spelling.
Reply with STRICT JSON only, no other text:
{"score": <integer 1-10>, "strong": "<one short sentence>", "missing": "<one short sentence>", "hint": "<one short sentence>"}
- score: 9-10 specific, structured, real example; 7-8 good but could be sharper; 5-6 generic; 3-4 very thin; 1-2 off-topic.
- strong: what was strongest. missing: the single most important thing missing. hint: a better way to phrase or structure it that the candidate can reuse.
- Write strong, missing and hint in ${lng}. Be honest but encouraging.${MQ.track==="ow"?OW_CTX+"\nThe user message may include KEY POINTS the ideal answer covers: use them as the reference, reward the ones covered, and name the most important missing one in 'missing'.":""}`;
const MQ_SMSYS=lng=>`You are NOVA, an interview coach closing a mock interview for the role: ${mqRole()}.
Given the transcript (JSON array of {question, answer, score}), reply with STRICT JSON only, no other text:
{"strengths": ["..", ".."], "weaknesses": ["..", ".."], "fixes": ["..", "..", ".."]}
- strengths: 2-3 short items, weaknesses: 2-3 short items, fixes: exactly 3 concrete things to fix before the real interview.
- Write everything in ${lng}. Short, specific, actionable. No emojis.`;

const MQ={open:false,step:"intro",total:5,qi:0,q:null,cat:1,answers:[],hist:[],busy:false,
 mic:false,rec:null,active:false,spoken:"",interim:"",seen:[],timer:null,lang:"",picked:false,
 online:true,usedBank:[],dbg:[],track:(localStorage.getItem("lab-mock-track")||"ow"),kp:null};
const MQDEMO=/[?&#]demo=mock/.test(location.search+location.hash);
const MQDEBUG=/[?&#]debug=1/.test(location.search+location.hash);
const mqLangName=()=>LANG==="ar"?"Egyptian Arabic":"English";
const MQSRC=window.SpeechRecognition||window.webkitSpeechRecognition;
const mqCatName=()=>MQ.track==="ow"?t("mqOwCat"+MQ.cat):t("mqCat"+MQ.cat);
function mqEl(id){return document.getElementById(id)}
function mqNorm(s){return (s||"").toLowerCase()
 .replace(/[ً-ْٰ]/g,"")
 .replace(/[أإآ]/g,"ا").replace(/ة/g,"ه").replace(/ى/g,"ي")
 .replace(/[^\p{L}\p{N} ]/gu," ").replace(/\s+/g," ").trim()}
function mqDbg(m){if(!MQDEBUG)return;const el=mqEl("mqDebug");if(!el)return;
 const d=new Date(),st=String(d.getMinutes()).padStart(2,"0")+":"+String(d.getSeconds()).padStart(2,"0");
 MQ.dbg.push(st+" "+m);if(MQ.dbg.length>4)MQ.dbg.shift();el.textContent=MQ.dbg.join("  ·  ")}

function mqBuild(){
  mqEl("mockRoot").innerHTML=`
  <div class="mock" id="mqOverlay" hidden role="dialog" aria-modal="true" aria-label="Mock interview">
    <div class="ls-bg mq-bg" aria-hidden="true"><i></i><i></i><i></i></div>
    <header class="ls-top">
      <button type="button" class="ls-x" id="mqClose">✕</button>
      <div class="ls-status" id="mqStatusPill"><b id="mqDot"></b><span id="mqState"></span></div>
      <div class="mq-score" id="mqScorePill" hidden><span id="mqScoreL"></span> <b id="mqScoreV">–</b></div>
      <div class="ls-lang" id="mqLangBtns" role="group">
        <button type="button" data-l="ar-EG"></button>
        <button type="button" data-l="ar-SA"></button>
        <button type="button" data-l="en-US"></button>
      </div>
    </header>
    <main class="mq-stage" id="mqStage">
      <section class="mq-screen" id="mqIntro">
        <img class="mq-logo" src="assets/nova.svg" alt="" width="76" height="76">
        <h2 id="mqTitle"></h2>
        <p class="mq-sub" id="mqIntroTxt"></p>
        <p class="mq-best" id="mqBestLine" hidden></p>
        <div class="mq-track" id="mqTrack" role="group"><button type="button" data-tr="ow"></button><button type="button" data-tr="tr"></button></div>
        <div class="mq-count" id="mqCount" role="group">
          <button type="button" data-n="3">3</button>
          <button type="button" data-n="5" class="on">5</button>
          <button type="button" data-n="7">7</button>
          <button type="button" data-n="10">10</button>
        </div>
        <button type="button" class="mq-go" id="mqStart"></button>
        <p class="mq-src"><small id="mqSrc"></small></p>
      </section>
      <section class="mq-screen" id="mqPlay" hidden>
        <div class="mq-prog"><div class="mq-prog-l"><span id="mqQLabel"></span> · <em id="mqCat"></em></div><div class="bar"><b id="mqBar"></b></div></div>
        <div class="mq-qcard" id="mqQCard"><div class="mq-ava"><img src="assets/nova.svg" alt="" width="34" height="34"></div><p id="mqQ" dir="auto"></p></div>
        <div class="ls-msg" id="mqMsg" role="alert" hidden></div>
        <div class="mq-answer">
          <i id="mqAnswerL"></i>
          <div class="mq-heard" id="mqHeard" hidden><p dir="auto"><span id="mqDone"></span><span id="mqLive"></span></p></div>
          <textarea id="mqIn" rows="4" dir="auto"></textarea>
        </div>
        <div class="mq-actions">
          <button type="button" class="ls-mic" id="mqMic"><span class="ls-ring"></span><span class="ls-ring r2"></span><span id="mqMicIco">🎙</span></button>
          <button type="button" class="ls-now" id="mqSubmit"><span aria-hidden="true">➤</span> <span id="mqSubmitT"></span></button>
        </div>
        <div class="mq-row"><button type="button" class="linkish" id="mqSkip"></button><button type="button" class="linkish" id="mqEndB"></button></div>
      </section>
      <section class="mq-screen" id="mqFb" hidden>
        <div class="mq-fbhead"><div class="mq-ring" id="mqRing"><b id="mqFbScore">0</b><small>/10</small></div>
        <div class="mq-fbq"><i id="mqQL2"></i><p id="mqFbQ" dir="auto"></p></div></div>
        <div class="mq-fbcards">
          <div class="mq-fbc good"><i id="mqStrongL"></i><p id="mqStrong" dir="auto"></p></div>
          <div class="mq-fbc miss"><i id="mqMissingL"></i><p id="mqMissing" dir="auto"></p></div>
          <div class="mq-fbc hint"><i id="mqHintL"></i><p id="mqHint" dir="auto"></p></div>
        </div>
        <button type="button" class="mq-go" id="mqNext"></button>
      </section>
      <section class="mq-screen" id="mqSum" hidden>
        <div class="mq-ring big" id="mqRingSum"><b id="mqSumScore">0</b><small>/10</small></div>
        <h2 id="mqSumTitle"></h2>
        <div class="mq-sumgrid">
          <div class="mq-fbc good"><i id="mqStrengthsL"></i><ul id="mqStrengths"></ul></div>
          <div class="mq-fbc miss"><i id="mqWeakL"></i><ul id="mqWeak"></ul></div>
        </div>
        <div class="mq-fbc hint mq-fixes"><i id="mqFixesL"></i><ol id="mqFixes"></ol></div>
        <div class="mq-actions row"><button type="button" class="mq-go" id="mqAgain"></button><button type="button" class="mq-ghost" id="mqDone2"></button></div>
      </section>
    </main>
    <footer class="ls-dock mq-dock"><div class="ls-debug" id="mqDebug" dir="ltr" hidden></div></footer>
  </div>`;
  MQ.lang=lsSavedLang()||(LANG==="ar"?"ar-EG":"en-US");
  if(MQ.lang==="auto")MQ.lang=LANG==="ar"?"ar-EG":"en-US";
  mqEl("mqClose").addEventListener("click",mqCloseFn);
  mqEl("mqDone2").addEventListener("click",mqCloseFn);
  mqEl("mqStart").addEventListener("click",mqStartSession);
  mqEl("mqAgain").addEventListener("click",()=>{mqShow("intro");mqLabels()});
  mqEl("mqMic").addEventListener("click",()=>{MQ.mic?mqMicStop():mqMicStart()});
  mqEl("mqSubmit").addEventListener("click",mqSubmitAnswer);
  mqEl("mqSkip").addEventListener("click",()=>{if(!MQ.busy)mqNextQuestion(true)});
  mqEl("mqEndB").addEventListener("click",()=>{if(!MQ.busy)mqSummary()});
  mqEl("mqNext").addEventListener("click",()=>{if(MQ.qi>=MQ.total)mqSummary();else mqNextQuestion(false)});
  document.querySelectorAll("#mqCount button").forEach(b=>b.addEventListener("click",()=>{
    MQ.total=+b.dataset.n;document.querySelectorAll("#mqCount button").forEach(x=>x.classList.toggle("on",x===b))}));
  document.querySelectorAll("#mqTrack button").forEach(b=>b.addEventListener("click",()=>{MQ.track=b.dataset.tr;try{localStorage.setItem("lab-mock-track",MQ.track)}catch(e){}mqLabels()}));
  document.querySelectorAll("#mqLangBtns button").forEach(b=>b.addEventListener("click",()=>{
    MQ.lang=b.dataset.l;MQ.picked=true;try{localStorage.setItem("lab-ls-lang",MQ.lang)}catch(e){}
    mqRenderLang();if(MQ.mic)mqRestart()}));
  mqEl("mockOpen").addEventListener("click",mqOpenFn);
  const mi=document.querySelector("#mockOpen i");if(mi)mi.innerHTML=`<svg class="ic" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.6-3.4 2.8-5 5.5-5s4.9 1.6 5.5 5"/><path d="M16 5.5l1.7 3.4 3.8.6-2.7 2.7.6 3.8-3.4-1.8-3.4 1.8.6-3.8-2.7-2.7 3.8-.6z" transform="translate(3.5,-1) scale(.62)"/></svg>`;
}
function mqRenderLang(){
  document.querySelectorAll("#mqLangBtns button").forEach(b=>{
    b.textContent=b.dataset.l==="ar-EG"?t("lsEg"):b.dataset.l==="ar-SA"?t("lsMsa"):t("lsEn");
    b.classList.toggle("on",b.dataset.l===MQ.lang)});
  mqEl("mqLangBtns").setAttribute("aria-label",t("lsLangLabel"));
}
function mqLabels(){
  if(!mqEl("mqOverlay"))return;
  if(!MQ.picked){MQ.lang=lsSavedLang()||(LANG==="ar"?"ar-EG":"en-US");if(MQ.lang==="auto")MQ.lang=LANG==="ar"?"ar-EG":"en-US"}
  mqEl("mqTitle").textContent=t("mqTitle");
  mqEl("mqIntroTxt").textContent=MQ.track==="ow"?t("mqIntroOw"):t("mqIntro");
  document.querySelectorAll("#mqTrack button").forEach(b=>{b.textContent=b.dataset.tr==="ow"?t("mqTrackOw"):t("mqTrackTr");b.classList.toggle("on",b.dataset.tr===MQ.track)});
  mqEl("mqTrack").setAttribute("aria-label",t("mqTrackL"));
  mqEl("mqStart").textContent=t("mqStart");
  document.querySelector("#mqCount").setAttribute("aria-label",t("mqHowMany"));
  mqEl("mqScoreL").textContent=t("mqScore");
  mqEl("mqAnswerL").textContent=t("mqAnswerNow");
  mqEl("mqIn").placeholder=t("mqType");
  mqEl("mqSubmitT").textContent=t("mqSubmit");
  mqEl("mqSkip").textContent=t("mqSkip");
  mqEl("mqEndB").textContent=t("mqEnd");
  mqEl("mqStrongL").textContent=t("mqStrong");mqEl("mqMissingL").textContent=t("mqMissing");mqEl("mqHintL").textContent=t("mqHint");
  mqEl("mqQL2").textContent=t("mqQof");
  mqEl("mqSumTitle").textContent=t("mqSumTitle");
  mqEl("mqStrengthsL").textContent=t("mqStrengths");mqEl("mqWeakL").textContent=t("mqWeak");mqEl("mqFixesL").textContent=t("mqFixes");
  mqEl("mqAgain").textContent=t("mqAgain");mqEl("mqDone2").textContent=t("mqClose");
  mqEl("mqNext").textContent=MQ.qi>=MQ.total?t("mqFinish"):t("mqNext");
  mqEl("mqSrc").textContent=MQ.track==="ow"?"✦ "+t("mqSrcOw"):MQ.online?"✦ "+t("mqLive"):t("mqOff");
  const best=store.get("lab-mock-best",null);
  mqEl("mqBestLine").hidden=best==null;
  if(best!=null)mqEl("mqBestLine").textContent="★ "+t("mqBest")+": "+best+"/10";
  mqRenderLang();mqState();
  mqEl("mqDebug").hidden=!MQDEBUG;
}
function mqShow(s){
  MQ.step=s;
  ["intro","play","fb","sum"].forEach(k=>mqEl("mq"+(k==="play"?"Play":k==="fb"?"Fb":k==="sum"?"Sum":"Intro")).hidden=k!==s);
  mqEl("mqScorePill").hidden=s==="intro";
}
function mqState(){
  if(!mqEl("mqOverlay"))return;
  const o=mqEl("mqOverlay");
  o.classList.toggle("live",MQ.mic&&MQ.active);
  o.classList.toggle("think",MQ.busy);
  mqEl("mqState").textContent=MQ.busy?t("mqThinking"):MQ.mic?t("mqListening")+" · "+(MQ.lang==="ar-EG"?t("lsEg"):MQ.lang==="ar-SA"?t("lsMsa"):t("lsEn")):t("mqTitle");
  mqEl("mqMicIco").textContent=MQ.mic?"■":"🎙";
  mqEl("mqMic").classList.toggle("cta",MQ.step==="play"&&!MQ.mic&&!MQ.busy);
  mqEl("mqMic").setAttribute("aria-label",MQ.mic?t("lsStop"):t("lsStart"));
  const m=!MQSRC?t("lsUnsupported"):MQ.err==="denied"?t("lsDenied"):MQ.err==="nomic"?t("lsNoMic"):MQ.err==="net"?t("lsNet"):"";
  mqEl("mqMsg").textContent=m;mqEl("mqMsg").hidden=!m;
  if(MQ.step==="play"){mqEl("mqQLabel").textContent=t("mqQof")+" "+MQ.qi+" "+t("mqOf")+" "+MQ.total;
    mqEl("mqCat").textContent=mqCatName();
    mqEl("mqBar").style.width=((MQ.qi-1)/MQ.total*100)+"%"}
  const avg=MQ.answers.length?(MQ.answers.reduce((a,x)=>a+x.score,0)/MQ.answers.length):0;
  mqEl("mqScoreV").textContent=MQ.answers.length?avg.toFixed(1):"–";
}
function mqOpenFn(){
  MQ.open=true;mqEl("mqOverlay").hidden=false;document.body.classList.add("ls-open");
  mqShow("intro");mqLabels();
}
function mqCloseFn(){
  mqMicStop(true);MQ.open=false;mqEl("mqOverlay").hidden=true;document.body.classList.remove("ls-open");
}
/* ---------- session flow ---------- */
async function mqStartSession(){
  MQ.answers=[];MQ.hist=[];MQ.usedBank=[];MQ.qi=0;
  mqShow("play");mqState();
  mqNextQuestion(false);
}
async function mqNextQuestion(skipped){
  if(MQ.busy)return;MQ.busy=true;mqMicStop(true);mqState();
  MQ.qi=skipped?MQ.qi:MQ.qi+1;
  if(MQ.qi>MQ.total){MQ.busy=false;mqSummary();return}
  MQ.cat=MQ.track==="ow"?OW_ORDER[(MQ.qi-1)%OW_ORDER.length]:((MQ.qi-1)%4)+1;MQ.kp=null;
  MQ.spoken="";MQ.interim="";MQ.seen=[];
  mqEl("mqIn").value="";mqEl("mqHeard").hidden=true;mqEl("mqDone").textContent="";mqEl("mqLive").textContent="";
  mqEl("mqQ").textContent=t("mqNewQ");
  mqShow("play");mqState();
  let q=null;
  if(MQ.track==="ow"){
    const pool=OW_BANK.filter(x=>x.c===MQ.cat&&!MQ.usedBank.includes(OW_BANK.indexOf(x)));
    const pick=(pool.length?pool:OW_BANK.filter(x=>!MQ.usedBank.includes(OW_BANK.indexOf(x))))[0]||OW_BANK[0];
    MQ.usedBank.push(OW_BANK.indexOf(pick));q=pick[LANG];MQ.kp=pick.kp;MQ.online=true;
  }
  else if(!forceOffline){
    const prev=MQ.hist.filter(h=>h.q).map(h=>h.q).slice(-8);
    const msgs=[{role:"system",content:MQ_QSYS(mqLangName())},
      {role:"user",content:"CATEGORY: "+mqCatName()+" ("+MQ.cat+" of 4).\nEarlier questions (do not repeat): "+JSON.stringify(prev)+"\nCandidate profile: "+(localStorage.getItem("lab-profile")||"(none)")}];
    const raw=await askRemote(msgs);
    if(raw){q=clean(raw).replace(/^["'\d.\-\s]+/,"").split("\n")[0].trim();if(q.length<12)q=null}
  }
  if(MQ.track!=="ow")MQ.online=!!q;
  if(!q){
    const pool=MQ_BANK.filter(x=>x.c===MQ.cat&&!MQ.usedBank.includes(MQ_BANK.indexOf(x)));
    const pick=(pool.length?pool:MQ_BANK.filter(x=>!MQ.usedBank.includes(MQ_BANK.indexOf(x))))[0];
    MQ.usedBank.push(MQ_BANK.indexOf(pick));q=pick[LANG];
  }
  MQ.q=q;
  mqEl("mqQ").textContent=q;
  mqEl("mqQCard").classList.remove("pop");void mqEl("mqQCard").offsetWidth;mqEl("mqQCard").classList.add("pop");
  MQ.busy=false;mqState();
}
function mqRenderHeard(){
  const has=!!(MQ.spoken||MQ.interim);
  mqEl("mqHeard").hidden=!has;
  mqEl("mqDone").textContent=MQ.spoken?MQ.spoken+" ":"";
  mqEl("mqLive").textContent=MQ.interim;
  const o=mqEl("mqOverlay");o.classList.add("hot");
  clearTimeout(MQ.hotT);MQ.hotT=setTimeout(()=>o.classList.remove("hot"),650);
}
/* ---------- recognition (same hardening as listen mode) ---------- */
function mqSegSeen(n){
  if(!n)return true;
  for(const s of MQ.seen){
    if(s===n)return true;
    if(n.length>=8&&s.includes(n))return true;
    if(s.length>=8&&n.includes(s)&&n.length-s.length<10)return true;
  }
  return false;
}
function mqSegAdd(n){if(!n)return;MQ.seen.push(n);if(MQ.seen.length>120)MQ.seen.shift()}
function mqMicStart(){
  MQ.err="";
  if(!MQSRC){mqState();return}
  MQ.mic=true;MQ.netTries=0;mqStartRec();mqState();
}
function mqMicStop(silent){
  MQ.mic=false;clearTimeout(MQ.timer);
  try{MQ.rec&&MQ.rec.abort()}catch(e){}
  MQ.rec=null;MQ.active=false;
  /* merge any live interim into the textarea so nothing is lost */
  if(!silent&&MQ.interim){mqCommitToInput(MQ.interim)}
  MQ.interim="";mqRenderHeard();mqState();
}
function mqCommitToInput(s){
  const ta=mqEl("mqIn"),cur=ta.value.trim();
  ta.value=(cur?cur+" ":"")+s.trim();
}
function mqRestart(){try{MQ.rec&&MQ.rec.abort()}catch(e){}MQ.rec=null;MQ.active=false;if(MQ.mic)setTimeout(mqStartRec,60)}
function mqStartRec(){
  if(!MQ.mic||MQ.active||!MQSRC)return;
  let r;try{r=new MQSRC()}catch(e){MQ.mic=false;mqState();return}
  MQ.rec=r;r.continuous=true;r.interimResults=true;r.maxAlternatives=1;r.lang=MQ.lang;
  r.onstart=()=>{MQ.active=true;mqDbg("▶ "+r.lang);mqState()};
  r.onresult=e=>{
    let interim="";
    for(let i=e.resultIndex;i<e.results.length;i++){
      const res=e.results[i],txt=res[0].transcript;
      if(res.isFinal){
        const s=txt.trim(),n=mqNorm(s);
        if(n&&!mqSegSeen(n)){mqSegAdd(n);MQ.spoken=(MQ.spoken+" "+s).trim();mqDbg("F: "+s.slice(0,50))}
        else if(n)mqDbg("dup-seg ignored");
      }else interim+=" "+txt;
    }
    MQ.interim=interim.trim();mqRenderHeard();
    clearTimeout(MQ.timer);
    if(MQ.spoken||MQ.interim)MQ.timer=setTimeout(()=>{ /* 2.2s silence: stop mic, keep text */
      if(MQ.mic){const rest=(MQ.spoken+" "+MQ.interim).trim();MQ.spoken="";MQ.interim="";mqCommitToInput(rest);mqRenderHeard();mqMicStop(true)}
    },2200);
  };
  r.onerror=e=>{
    const k=e&&e.error;mqDbg("err: "+k);
    if(k==="not-allowed"||k==="service-not-allowed"){MQ.err="denied";MQ.mic=false}
    else if(k==="audio-capture"){MQ.err="nomic";MQ.mic=false}
    else if(k==="network"){MQ.err="net";MQ.netTries=(MQ.netTries||0)+1;if(MQ.netTries>6)MQ.mic=false}
    mqState();
  };
  r.onend=()=>{
    MQ.active=false;MQ.rec=null;mqDbg("end");
    if(MQ.mic&&MQ.open)setTimeout(mqStartRec,MQ.err==="net"?2000:60);
  };
  try{r.start()}catch(e){MQ.active=false;setTimeout(mqStartRec,400)}
}
/* ---------- scoring ---------- */
function mqHeuristic(ans){
  const w=ans.split(/\s+/).filter(Boolean).length;
  const ex=/مثال|مثلًا|زي |مثلا|example|for instance|such as/i.test(ans);
  const num=/\d/.test(ans);
  let s=w<5?2:w<15?4:w<45?6:7;
  if(ex)s+=1;if(num)s+=1;if(w>=45&&ex)s=Math.min(9,s+1);
  s=Math.max(1,Math.min(9,s));
  const ar=LANG==="ar";
  const pack=s>=7?{strong:ar?"إجابة مرتبة وفيها تفاصيل كويسة.":"A well-structured, detailed answer.",
      missing:ar?"ممكن تضيف نتيجة أو رقم يثبت الكلام.":"A concrete result or number would make it land harder.",
      hint:ar?"اختم بجملة: والنتيجة كانت…":"Close with: and the result was…"}:
    s>=5?{strong:ar?"الفكرة الأساسية موجودة وواضحة.":"The core idea is there and clear.",
      missing:ar?"ناقص مثال حقيقي من خبرتك.":"A real example from your own experience is missing.",
      hint:ar?"قسّمها: جملة فكرة، جملة مثال، جملة نتيجة.":"Structure it: one idea sentence, one example, one result."}:
    {strong:ar?"بدأت بشجاعة ودي أهم خطوة.":"You started, and that is the hardest step.",
      missing:ar?"الإجابة قصيرة جدًا وعامة.":"The answer is too short and too general.",
      hint:ar?"جاوب بثلاث جمل: إيه، إزاي، وليه مهم.":"Answer in three sentences: what, how, and why it matters."};
  return {score:s,strong:pack.strong,missing:pack.missing,hint:pack.hint};
}
function mqParseJson(raw){
  const m=String(raw||"").match(/\{[\s\S]*\}/);
  if(!m)return null;
  try{const j=JSON.parse(m[0]);return j&&typeof j==="object"?j:null}catch(e){return null}
}
async function mqSubmitAnswer(){
  if(MQ.busy||MQ.step!=="play")return;
  const rest=(MQ.spoken+" "+MQ.interim).trim();
  if(rest){mqCommitToInput(rest);MQ.spoken="";MQ.interim="";mqRenderHeard()}
  mqMicStop(true);
  const ans=mqEl("mqIn").value.trim();
  if(!ans){mqEl("mqMsg").textContent=t("mqEmpty");mqEl("mqMsg").hidden=false;
    setTimeout(()=>{mqEl("mqMsg").hidden=true},2200);return}
  MQ.busy=true;mqState();
  let fb=null;
  if(!forceOffline){
    const msgs=[{role:"system",content:MQ_FBSYS(mqLangName())},
      {role:"user",content:"QUESTION: "+MQ.q+(MQ.kp?"\nKEY POINTS: "+MQ.kp.map(k=>k[0]).join(" | "):"")+"\nANSWER: "+ans}];
    const raw=await askRemote(msgs);
    const j=mqParseJson(raw);
    if(j&&j.score!=null){
      fb={score:Math.max(1,Math.min(10,Math.round(+j.score||5))),
        strong:clean(j.strong||""),missing:clean(j.missing||""),hint:clean(j.hint||"")};
      if(!fb.strong&&!fb.missing)fb=null;
    }
  }
  if(!fb)fb=MQ.track==="ow"&&MQ.kp?owHeuristic(ans,MQ.kp):mqHeuristic(ans);
  MQ.answers.push({q:MQ.q,a:ans,score:fb.score});
  MQ.hist.push({q:MQ.q});
  mqEl("mqFbQ").textContent=MQ.q;
  mqEl("mqStrong").textContent=fb.strong;mqEl("mqMissing").textContent=fb.missing;mqEl("mqHint").textContent=fb.hint;
  owShowKp();
  mqShow("fb");MQ.busy=false;mqLabels();mqState();
  mqCountUp(mqEl("mqFbScore"),fb.score,mqEl("mqRing"));
}
function mqCountUp(el,target,ring){
  const rm=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(rm){el.textContent=target;if(ring)ring.style.setProperty("--p",target*10);return}
  const t0=performance.now(),dur=700;
  const step=ts=>{const p=Math.min(1,(ts-t0)/dur),v=Math.round(target*(1-Math.pow(1-p,3)));
    el.textContent=v;if(ring)ring.style.setProperty("--p",v*10);
    if(p<1)requestAnimationFrame(step)};
  requestAnimationFrame(step);
}
async function mqSummary(){
  if(MQ.busy)return;MQ.busy=true;mqMicStop(true);mqState();
  const n=MQ.answers.length;
  const avg=n?Math.round(MQ.answers.reduce((a,x)=>a+x.score,0)/n*10)/10:0;
  let sum=null;
  if(n&&!forceOffline){
    const msgs=[{role:"system",content:MQ_SMSYS(mqLangName())},
      {role:"user",content:JSON.stringify(MQ.answers.map(x=>({question:x.q,answer:x.a,score:x.score})))}];
    const raw=await askRemote(msgs);
    const j=mqParseJson(raw);
    if(j&&(j.strengths||j.weaknesses||j.fixes)){
      const arr=v=>Array.isArray(v)?v.map(x=>clean(String(x))).filter(Boolean):[];
      sum={strengths:arr(j.strengths),weaknesses:arr(j.weaknesses),fixes:arr(j.fixes)};
      if(!sum.strengths.length&&!sum.fixes.length)sum=null;
    }
  }
  if(!sum){
    const ar=LANG==="ar";
    sum=avg>=7?{
      strengths:ar?["بتجاوب بثقة وبأسلوب مرتب","أفكارك التقنية سليمة"]:["You answer with confidence and structure","Your technical ideas are sound"],
      weaknesses:ar?["بعض الإجابات ممكن تبقى أقصر وأحدد","محتاج أرقام ونتائج أكتر"]:["Some answers could be shorter and sharper","More numbers and results would help"],
      fixes:ar?["حضّر 3 قصص نجاح بأرقام واضحة وقولها بصوت عالي","اتمرّن على إجابة 'عرّفنا بنفسك' في 30 ثانية","جهّز سؤالين تسألهم للمحقق في الآخر"]:["Prepare 3 success stories with clear numbers and say them aloud","Rehearse a 30-second 'tell me about yourself'","Prepare two questions to ask the interviewer at the end"]}:
    avg>=4?{
      strengths:ar?["بتجاوب على كل الأسئلة ومابتهربش","عندك أساس كويس تبني عليه"]:["You attempt every question without dodging","You have a good base to build on"],
      weaknesses:ar?["الإجابات عامة وناقصها أمثلة حقيقية","التفاصيل التقنية محتاجة تتعمق"]:["Answers are general and miss real examples","Technical details need more depth"],
      fixes:ar?["لكل سؤال متوقع، اكتب مثال حقيقي واحد من شغلك","استخدم هيكل: فكرة، مثال، نتيجة","راجع أساسيات الأردوينو والبايثون في القسم التعليمي"]:["For each expected question, write one real example from your work","Use the structure: idea, example, result","Review Arduino and Python basics in the lessons here"]}:
    {strengths:ar?["إنك بتتمرّن دلوقتي ده تصرف صح"]:["Practising now is exactly the right move"],
      weaknesses:ar?["الإجابات قصيرة جدًا ومحتاجة تفاصيل","الثقة بتيجي بالتكرار"]:["Answers are very short and need substance","Confidence comes with repetition"],
      fixes:ar?["اتمرّن على كل سؤال بصوت عالي 3 مرات","جاوب في 3 جمل على الأقل: إيه، إزاي، ليه","افتح الدروس وراجع Arduino وPython قبل المقابلة"]:["Rehearse each question out loud 3 times","Answer in at least 3 sentences: what, how, why","Open the lessons and review Arduino and Python before the interview"]};
  }
  while(sum.fixes.length<3)sum.fixes.push(sum.fixes[0]||"");
  const best=store.get("lab-mock-best",null);
  if(n&&(best==null||avg>best))store.set("lab-mock-best",Math.round(avg*10)/10);
  mqEl("mqStrengths").innerHTML=sum.strengths.map(x=>`<li dir="auto"></li>`).join("");
  mqEl("mqWeak").innerHTML=sum.weaknesses.map(x=>`<li dir="auto"></li>`).join("");
  mqEl("mqFixes").innerHTML=sum.fixes.slice(0,3).map(x=>`<li dir="auto"></li>`).join("");
  sum.strengths.forEach((x,i)=>mqEl("mqStrengths").children[i].textContent=x);
  sum.weaknesses.forEach((x,i)=>mqEl("mqWeak").children[i].textContent=x);
  sum.fixes.slice(0,3).forEach((x,i)=>mqEl("mqFixes").children[i].textContent=x);
  mqShow("sum");MQ.busy=false;mqLabels();mqState();
  mqCountUp(mqEl("mqSumScore"),Math.round(avg),mqEl("mqRingSum"));
  mqEl("mqSumScore").nextElementSibling.textContent="/10";
}
document.addEventListener("visibilitychange",()=>{
  if(!MQ.open)return;
  if(document.visibilityState==="hidden"){try{MQ.rec&&MQ.rec.abort()}catch(e){}MQ.active=false}
  else if(MQ.mic)mqStartRec();
});
mqBuild();
if(MQDEMO)window.addEventListener("load",()=>setTimeout(mqOpenFn,500));
EXT_RENDER.push(mqLabels);
