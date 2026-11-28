"use strict";
/* Mission Lab FUN layer v23: XP, levels, streaks, daily missions, badges, mystery chest,
   combo quizzes, lucky stars, secret easter eggs, synth sound rewards.
   Additive and DOM-driven (reads existing events/classes). Honors prefers-reduced-motion.
   All progress lives in localStorage ("lab-fun-v1"); nothing leaves the device. */
(function(){
const LS="lab-fun-v1";
const RM=matchMedia("(prefers-reduced-motion: reduce)");
const $=(s,r)=>(r||document).querySelector(s),$$=(s,r)=>[...(r||document).querySelectorAll(s)];
const isAr=()=>typeof LANG!=="undefined"&&LANG==="ar";
const T=(e,a)=>isAr()?a:e;
const ESC={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};
const esc=s=>String(s).replace(/[&<>"]/g,c=>ESC[c]);
const rlOpen=()=>typeof RL!=="undefined"&&RL&&RL.open;

/* ---------- state ---------- */
function fresh(){return{xp:0,streak:0,best:0,last:"",days:[],badges:{},lessons:{},opened:{},qkeys:{},correct:0,answered:0,quizzes:0,reels:{},nova:{d:"",n:0},areas:{},langs:{},sound:1,q:{d:"",l:0,c:0,r:0,done:{},chest:0},lucky:{d:"",n:0},maxCombo:0,tutorial:0}}
function load(){let s={};try{s=JSON.parse(localStorage.getItem(LS))||{}}catch(e){}return Object.assign(fresh(),s)}
let S=load();
function save(){try{localStorage.setItem(LS,JSON.stringify(S))}catch(e){}}
const dk=d=>{d=d||new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
const ago=n=>{const d=new Date();d.setDate(d.getDate()-n);return dk(d)};
const today=()=>dk();
const streakNow=()=>S.last===today()||S.last===ago(1)?S.streak:0;

/* ---------- levels ---------- */
const LV_EN=["Cadet","Rookie Pilot","Engineer","Navigator","Commander","Astronaut","Mission Legend","Galaxy Master"];
const LV_AR=["متدرب","طيار مبتدئ","مهندس","ملاح","قائد","رائد فضاء","أسطورة المهمة","سيد المجرة"];
const lvOf=xp=>Math.floor(Math.sqrt(xp/40))+1;
const lvName=l=>(isAr()?LV_AR:LV_EN)[Math.min(l,LV_EN.length)-1];
function lvInfo(){const l=lvOf(S.xp),lo=40*(l-1)*(l-1),hi=40*l*l;return{l,lo,hi,p:Math.round((S.xp-lo)/(hi-lo)*100)}}

/* ---------- badges ---------- */
const B=[
 ["first","🚀","First Launch","أول انطلاقة","Finish your first lesson","خلّص أول درس"],
 ["hunter","📚","Lesson Hunter","صيّاد الدروس","Finish 10 lessons","خلّص ١٠ دروس"],
 ["machine","🧠","Knowledge Machine","ماكينة المعرفة","Finish 25 lessons","خلّص ٢٥ درس"],
 ["quiz1","🎯","Quiz Rookie","مبتدئ الكويز","Finish a quiz","خلّص كويز"],
 ["perfect","🏆","Flawless","علامة كاملة","Score full marks on a quiz","هات الدرجة النهائية في كويز"],
 ["combo","🔥","On Fire","نار","Answer 5 in a row correctly","جاوب ٥ صح ورا بعض"],
 ["reel3","🎬","Reel Fan","محب الريلز","Watch 3 reels to the end","شوف ٣ ريلز لحد الآخر"],
 ["reel20","🍿","Binge Pilot","طيار الريلز","Watch 20 reels","شوف ٢٠ ريل"],
 ["st3","📅","3-Day Streak","٣ أيام ورا بعض","Learn 3 days in a row","ذاكر ٣ أيام ورا بعض"],
 ["st7","🌟","Weekly Legend","أسطورة الأسبوع","Learn 7 days in a row","ذاكر ٧ أيام ورا بعض"],
 ["owl","🦉","Night Owl","بومة الليل","Learn after 10 PM","ذاكر بعد ١٠ بالليل"],
 ["poly","🌍","Bilingual","ثنائي اللغة","Use both English and Arabic","استخدم الإنجليزي والعربي"],
 ["curious","💬","Curious Mind","عقل فضولي","Ask NOVA a question","اسأل NOVA سؤال"],
 ["mock","🎤","Interview Ready","جاهز للمقابلة","Finish a mock interview","خلّص مقابلة تجريبية"],
 ["explore","🧭","Explorer","مستكشف","Visit all four areas","زور الأقسام الأربعة"],
 ["lvl5","👑","Commander","القائد","Reach level 5","وصّل لمستوى ٥"],
 ["lucky","🍀","Star Catcher","صائد النجوم","Catch a lucky star","امسك نجمة الحظ"],
 ["najm","✨","Najm's Friend","صديق نجم","Secret","سر"],
 ["konami","🕹","Hyperdrive","السرعة الفائقة","Secret","سر"],
 ["rocket","🛸","Liftoff!","انطلاق!","Secret","سر"],
 ["speed","⚡","Speed Demon","شيطان السرعة","Score 8+ in the Lightning Round","جيب ٨+ في الجولة السريعة"]
];
const SECRET={najm:1,konami:1,rocket:1};
const bdef=id=>B.find(b=>b[0]===id);
const bname=b=>isAr()?b[3]:b[2];

/* ---------- daily missions ---------- */
const QDEF=[["l",2,"📖","Finish 2 lessons","خلّص درسين"],["c",5,"✅","Get 5 quiz answers right","جاوب ٥ إجابات صح"],["r",3,"🎬","Watch 3 reels","شوف ٣ ريلز"]];
function dayRoll(){
 const t=today();
 if(S.q.d!==t)S.q={d:t,l:0,c:0,r:0,done:{},chest:0};
 if(S.nova.d!==t)S.nova={d:t,n:0};
 if(S.lucky.d!==t)S.lucky={d:t,n:0};
}
function touchDay(){
 dayRoll();
 const t=today();
 if(S.last!==t){
  S.streak=S.last===ago(1)?S.streak+1:1;
  S.last=t;S.days=S.days.filter(d=>d!==t).concat(t).slice(-14);
  S.best=Math.max(S.best,S.streak);save();
  if(S.streak>=2)setTimeout(()=>note("🔥",T("Streak: "+S.streak+" days!","سلسلة: "+S.streak+" أيام!"),T("Come back tomorrow to keep it alive","ارجع بكرة عشان تكمّلها"),"gold"),900);
  if(S.streak>=3)unlock("st3");if(S.streak>=7)unlock("st7");
 }
 const h=new Date().getHours();if(h>=22||h<5)unlock("owl");
}

/* ---------- sound (WebAudio synth, optional) ---------- */
let ac=null;
function ctx(){
 if(!ac){const C=window.AudioContext||window.webkitAudioContext;if(C)try{ac=new C()}catch(e){}}
 if(ac&&ac.state==="suspended")ac.resume().catch(()=>{});
 return ac;
}
function tone(f,t0,d,type,v,f2){
 const a=ac,o=a.createOscillator(),g=a.createGain();
 o.type=type||"sine";o.frequency.setValueAtTime(f,t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t0+d);
 g.gain.setValueAtTime(0.0001,t0);g.gain.exponentialRampToValueAtTime(v||.12,t0+.012);g.gain.exponentialRampToValueAtTime(.0001,t0+d);
 o.connect(g);g.connect(a.destination);o.start(t0);o.stop(t0+d+.03);
}
function sfx(k){
 if(!S.sound)return;
 if(rlOpen()&&(k==="coin"||k==="ok"||k==="no"))return;
 const a=ctx();if(!a)return;const n=a.currentTime;
 try{
  if(k==="coin"){tone(988,n,.09,"square",.05);tone(1319,n+.07,.16,"square",.05)}
  else if(k==="ok"){tone(660,n,.1,"triangle",.12);tone(880,n+.08,.18,"triangle",.12)}
  else if(k==="no"){tone(220,n,.22,"triangle",.1,120)}
  else if(k==="level"){[523,659,784,1047,1319].forEach((f,i)=>tone(f,n+i*.09,.34,"triangle",.13));tone(2093,n+.5,.5,"sine",.05)}
  else if(k==="badge"){[784,988,1175,1568].forEach((f,i)=>tone(f,n+i*.07,.26,"sine",.12))}
  else if(k==="chest"){tone(200,n,.5,"sawtooth",.05,900);[880,1175,1480].forEach((f,i)=>tone(f,n+.5+i*.08,.3,"triangle",.1))}
  else if(k==="whoosh"){tone(150,n,.9,"sawtooth",.04,1400)}
  else if(k==="pop"){tone(520,n,.07,"sine",.1,900)}
 }catch(e){}
}
function buzz(ms){if(navigator.vibrate&&!RM.matches)try{navigator.vibrate(ms)}catch(e){}}
document.addEventListener("pointerdown",()=>{if(S.sound)ctx()},{once:true,capture:true});

/* ---------- visual effects ---------- */
const COLS=["#56e4ff","#ac8bff","#ffd479","#5ef0b8","#ff7ab6"];
function confetti(x,y,n,spread){
 if(RM.matches)return;
 n=n||(innerWidth<520?16:28);spread=spread||200;
 for(let i=0;i<n;i++){
  const d=document.createElement("i");d.className="fun-c";
  d.style.cssText="left:"+x+"px;top:"+y+"px;background:"+COLS[i%5]+";--dx:"+((Math.random()*2-1)*spread).toFixed(0)+"px;--dy:"+(-60+Math.random()*260).toFixed(0)+"px;--rot:"+(Math.random()*720-360).toFixed(0)+"deg";
  document.body.appendChild(d);setTimeout(()=>d.remove(),1700);
 }
}
function centerOf(el){const r=(el||document.body).getBoundingClientRect();return el?{x:r.left+r.width/2,y:r.top+r.height/2}:{x:innerWidth/2,y:innerHeight*.4}}
function pop(text,anchor,cls){
 const p=centerOf(anchor),d=document.createElement("div");
 d.dir="ltr";d.className="fun-pop"+(cls?" "+cls:"");d.textContent=text;
 d.style.left=Math.max(40,Math.min(innerWidth-40,p.x))+"px";d.style.top=Math.max(60,p.y)+"px";
 document.body.appendChild(d);setTimeout(()=>d.remove(),1500);
}
const noteQ=[];let noteBusy=false;
function note(icon,title,sub,cls){noteQ.push([icon,title,sub,cls]);if(!noteBusy)noteNext()}
function noteNext(){
 const it=noteQ.shift();if(!it){noteBusy=false;return}
 noteBusy=true;
 let host=$("#funNotes");if(!host){host=document.createElement("div");host.id="funNotes";host.setAttribute("aria-live","polite");document.body.appendChild(host)}
 const d=document.createElement("div");d.className="fun-note "+(it[3]||"");
 d.innerHTML='<i>'+it[0]+'</i><div><b>'+esc(it[1])+'</b>'+(it[2]?'<small>'+esc(it[2])+'</small>':'')+'</div>';
 host.appendChild(d);
 requestAnimationFrame(()=>d.classList.add("in"));
 setTimeout(()=>{d.classList.remove("in");setTimeout(()=>{d.remove();noteNext()},320)},2500);
}

/* ---------- core: XP, badges, quests ---------- */
let pendingLevel=0;
function hop(){const b=$(".najm-bud");if(!b||RM.matches)return;b.classList.remove("fun-hop");void b.offsetWidth;b.classList.add("fun-hop")}
function add(xp,why,anchor){
 touchDay();
 const l0=lvOf(S.xp);S.xp+=xp;save();
 pop("+"+xp+" XP",anchor);hop();
 const l1=lvOf(S.xp);
 if(l1>l0){pendingLevel=l1;if(l1>=5)unlock("lvl5");setTimeout(flushLevel,700)}
 refresh();
}
function flushLevel(){if(!pendingLevel||rlOpen()||$(".fun-modal"))return;const l=pendingLevel;pendingLevel=0;levelModal(l)}
function unlock(id){
 if(S.badges[id])return;
 const b=bdef(id);if(!b)return;
 S.badges[id]=Date.now();save();
 sfx("badge");buzz([30,40,30]);
 note(b[1],T("Badge unlocked: ","شارة جديدة: ")+bname(b),(isAr()?b[5]:b[4]).replace(/^Secret$|^سر$/,"")||T("Secret found!","اكتشفت سر!"),"badge");
 if(!RM.matches)confetti(innerWidth/2,90,18,160);
 const bonus=SECRET[id]?50:15;
 S.xp+=bonus;const l0=lvOf(S.xp-bonus),l1=lvOf(S.xp);save();
 if(l1>l0){pendingLevel=l1;if(l1>=5&&id!=="lvl5")unlock("lvl5");setTimeout(flushLevel,2800)}
 refresh();
}
function qprog(kind,n){
 dayRoll();S.q[kind]=(S.q[kind]||0)+(n||1);
 const def=QDEF.find(q=>q[0]===kind);
 if(def&&S.q[kind]>=def[1]&&!S.q.done[kind]){
  S.q.done[kind]=1;save();
  setTimeout(()=>{note("🎯",T("Mission complete!","المهمة اتنفذت!"),T(def[3],def[4]),"gold");sfx("level");add(20,"mission")},600);
  if(QDEF.every(q=>S.q.done[q[0]]))setTimeout(()=>note("🎁",T("Daily chest is ready!","صندوق اليوم جاهز!"),T("Open it from Trophy Room or Home","افتحه من غرفة الجوائز أو الرئيسية"),"gold"),3400);
 }else save();
}
const lessonCount=()=>Object.keys(S.lessons).length;
const reelCount=()=>Object.keys(S.reels).length;

/* ---------- event hooks ---------- */
let combo=0;
document.addEventListener("click",e=>{
 const t=e.target;if(!t||!t.closest)return;
 /* lesson marked done */
 const d=t.closest(".l-done");
 if(d){setTimeout(()=>{
  if(!d.classList.contains("on"))return;
  const k=d.dataset.k||("x"+lessonCount());
  if(S.lessons[k])return;
  S.lessons[k]=1;save();
  const c=centerOf(d);confetti(c.x,c.y,18,130);sfx("coin");buzz(20);
  add(15,"lesson",d);qprog("l");
  unlock("first");if(lessonCount()>=10)unlock("hunter");if(lessonCount()>=25)unlock("machine");
 },30);return}
 /* lesson opened (curiosity XP, once each) */
 const lb=t.closest(".lesson>button");
 if(lb){const l=lb.parentElement;setTimeout(()=>{
  if(l.classList.contains("open")&&l.id&&!S.opened[l.id]){S.opened[l.id]=1;save();add(2,"open",lb)}
 },40);return}
 /* quiz answer */
 const o=t.closest(".q-opts button");
 if(o&&o.closest(".lightning"))return;
 if(o){setTimeout(()=>{
  const root=o.closest(".quiz"),q=root&&$(".q-text",root);
  const key=(root?root.dataset.area:"")+"|"+(q?q.textContent.slice(0,60):"");
  S.answered++;
  if(o.classList.contains("right")){
   combo++;S.correct++;if(combo>S.maxCombo)S.maxCombo=combo;
   const first=!S.qkeys[key];S.qkeys[key]=1;
   const xp=first?10+Math.min(combo-1,4)*2:2;
   o.classList.add("fun-glow");const c=centerOf(o);confetti(c.x,c.y,10,90);
   sfx("ok");buzz(15);add(xp,"quiz",o);qprog("c");
   if(combo>=2)comboPill(combo);
   if(combo>=5)unlock("combo");
  }else if(o.classList.contains("wrong")){
   if(combo>=3)note("💪",T("Combo ended at "+combo,"الكومبو وقف عند "+combo),T("Shake it off, go again!","ولا يهمك، كمّل!"));
   combo=0;o.classList.add("fun-shake");sfx("no");save();
  }
 },30);return}
 /* quiz finished */
 const nv=t.closest(".q-nav button");
 if(nv){
  const root=nv.closest(".quiz"),top=root&&$(".q-top span",root),m=top&&top.textContent.match(/(\d+)\s*\/\s*(\d+)/);
  if(m&&m[1]===m[2]){setTimeout(()=>{
   const sc=$(".q-score",root);if(!sc)return;
   const s=parseInt(sc.textContent,10),n=+m[2];if(isNaN(s))return;
   S.quizzes++;save();
   add(15+s*5,"quiz done",sc);unlock("quiz1");
   if(s>=n){unlock("perfect");sfx("level");const c=centerOf(sc);confetti(c.x,c.y,36,260)}
   else sfx("coin");
   const bar=$(".q-end",root);
   if(bar&&!$(".fun-q-xp",bar)){const x=document.createElement("p");x.className="fun-q-xp";x.textContent=T("+"+(15+s*5)+" XP earned"+(s>=n?" · perfect!":""),"+"+(15+s*5)+" نقطة"+(s>=n?" · درجة كاملة!":""));$(".q-score",bar).insertAdjacentElement("afterend",x)}
  },120)}
  return;
 }
 /* language switch */
 if(t.closest("#langEn,#langAr")){
  setTimeout(()=>{S.langs[isAr()?"ar":"en"]=1;save();if(S.langs.en&&S.langs.ar)unlock("poly")},80);
 }
 /* logo taps: 7 quick taps launch a rocket */
 if(t.closest("#brand")){
  const n=Date.now();logoT=logoT.filter(x=>n-x<4000).concat(n);
  if(logoT.length>=7){logoT=[];rocket()}
 }
},true);
let logoT=[];
function comboPill(n){
 let p=$("#funCombo");if(!p){p=document.createElement("div");p.id="funCombo";document.body.appendChild(p)}
 p.innerHTML='<b>🔥 x'+n+'</b><span>'+T("combo","كومبو")+'</span>';
 p.classList.remove("on");void p.offsetWidth;p.classList.add("on");
 clearTimeout(p._t);p._t=setTimeout(()=>p.classList.remove("on"),1500);
}
/* NOVA chat */
document.addEventListener("submit",e=>{
 if(!e.target||e.target.id!=="chatForm")return;
 const inp=$("#chatInput");if(!inp||!inp.value.trim())return;
 dayRoll();unlock("curious");
 if(S.nova.n<5){S.nova.n++;save();add(4,"nova",$("#chatSend"))}
},true);
/* areas explored */
addEventListener("areachange",()=>{
 const a=typeof curArea!=="undefined"?curArea:"";
 if(a&&a!=="home"){S.areas[a]=1;save();if(["robotics","space","ai","ow"].every(x=>S.areas[x])){unlock("explore")}}
 setTimeout(mountHome,0);
});
/* mock interview summary + reels poll + level queue */
let mockSeen=false;
setInterval(()=>{
 const sum=$("#mqSum");
 if(sum){if(!sum.hidden&&!mockSeen){mockSeen=true;add(40,"mock",sum);unlock("mock");sfx("level")}else if(sum.hidden)mockSeen=false}
 if(rlOpen()&&RL.finished&&!S.reels[RL.idx]){
  S.reels[RL.idx]=1;save();
  add(3,"reel");qprog("r");
  if(reelCount()>=3)unlock("reel3");if(reelCount()>=20)unlock("reel20");
 }
 if(!rlOpen()&&pendingLevel)flushLevel();
},900);

/* ---------- secrets ---------- */
const KON=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
let kbuf=[],tbuf="";
document.addEventListener("keydown",e=>{
 const t=e.target;if(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable))return;
 const k=e.key.length===1?e.key.toLowerCase():e.key;
 kbuf=kbuf.concat(k).slice(-10);
 if(kbuf.length===10&&kbuf.every((x,i)=>x===KON[i])){kbuf=[];warp()}
 if(e.key.length===1){
  tbuf=(tbuf+e.key.toLowerCase()).slice(-4);
  if(tbuf==="najm"){tbuf="";setTimeout(()=>{unlock("najm");if(!RM.matches)confetti(innerWidth/2,innerHeight*.45,30,260)},400)}
  else if(tbuf==="nova"){tbuf="";const c=centerOf();confetti(c.x,c.y,22,200);sfx("pop");note("✦",T("NOVA says hi!","NOVA بتسلم عليك!"),"")}
 }
});
function warp(){
 unlock("konami");sfx("whoosh");
 if(RM.matches)return;
 const cv=document.createElement("canvas");cv.className="fun-warp";document.body.appendChild(cv);
 const W=cv.width=innerWidth,H=cv.height=innerHeight,c=cv.getContext("2d"),N=innerWidth<520?90:160;
 const st=Array.from({length:N},()=>({a:Math.random()*6.283,r:Math.random()*40,v:2+Math.random()*7,col:COLS[(Math.random()*5)|0]}));
 const t0=performance.now();
 (function f(ts){
  const p=(ts-t0)/2600;if(p>=1){cv.remove();return}
  c.fillStyle="rgba(5,11,27,.28)";c.fillRect(0,0,W,H);
  const g=Math.min(1,p*3)*(p>.8?(1-p)*5:1);
  for(const s of st){
   const x0=W/2+Math.cos(s.a)*s.r,y0=H/2+Math.sin(s.a)*s.r;s.r+=s.v*(1+p*9);
   const x1=W/2+Math.cos(s.a)*s.r,y1=H/2+Math.sin(s.a)*s.r;
   c.globalAlpha=g;c.strokeStyle=s.col;c.lineWidth=1+s.r/260;c.beginPath();c.moveTo(x0,y0);c.lineTo(x1,y1);c.stroke();
   if(s.r>Math.max(W,H)){s.r=Math.random()*30}
  }
  requestAnimationFrame(f);
 })(t0);
}
function rocket(){
 unlock("rocket");sfx("whoosh");buzz(40);
 if(RM.matches)return;
 const r=document.createElement("div");r.className="fun-rocket";r.textContent="🚀";document.body.appendChild(r);
 setTimeout(()=>r.remove(),2600);
}

/* ---------- lucky star ---------- */
function luckyLoop(){
 setTimeout(()=>{
  dayRoll();
  if(!document.hidden&&!rlOpen()&&!$(".fun-modal")&&S.lucky.n<3&&!$("#funStar")){
   const s=document.createElement("button");s.type="button";s.id="funStar";s.className="fun-star";s.textContent="⭐";
   s.setAttribute("aria-label",T("Lucky star! Tap to catch","نجمة الحظ! اضغط عشان تمسكها"));
   s.style.top=(18+Math.random()*50)+"vh";
   s.addEventListener("click",()=>{
    const c=centerOf(s);s.remove();S.lucky.n++;save();
    confetti(c.x,c.y,26,200);sfx("chest");buzz(25);add(10+((Math.random()*15)|0),"star",null);unlock("lucky");
   });
   document.body.appendChild(s);setTimeout(()=>s.remove(),RM.matches?10000:8200);
  }
  luckyLoop();
 },45000+Math.random()*60000);
}

/* ---------- chest ---------- */
const FACTS=[
 ["A day on Venus is longer than its year.","اليوم على الزهرة أطول من سنتها."],
 ["The ISS circles Earth every ~90 minutes: about 16 sunrises a day.","محطة الفضاء بتلف حوالين الأرض كل ٩٠ دقيقة تقريباً: ١٦ شروق في اليوم."],
 ["The UAE's Hope probe reached Mars orbit in February 2021.","مسبار الأمل الإماراتي وصل لمدار المريخ في فبراير ٢٠٢١."],
 ["GPS needs at least 4 satellites to fix your position and the time.","الـGPS محتاج ٤ أقمار على الأقل عشان يحدد مكانك والوقت."],
 ["Python is named after Monty Python, not the snake.","اسم بايثون جاي من فرقة Monty Python مش من الثعبان."],
 ["The first computer 'bug' was a real moth stuck in a relay, in 1947.","أول 'باج' في الكمبيوتر كان فراشة حقيقية عالقة في ريليه سنة ١٩٤٧."],
 ["Sputnik 1 launched in 1957 and kept beeping for about three weeks.","سبوتنيك ١ اتطلق سنة ١٩٥٧ وفضل يصفّر حوالي ٣ أسابيع."],
 ["Sunlight takes about 8 minutes to reach Earth.","ضوء الشمس بياخد حوالي ٨ دقايق عشان يوصل الأرض."],
 ["A 1U CubeSat is just a 10 cm cube.","القمر الصناعي 1U مكعب حجمه ١٠ سم بس."],
 ["A Raspberry Pi can run a full Linux desktop for the price of a snack dinner.","الراسبيري باي بيشغّل ديسكتوب لينكس كامل بسعر رخيص جداً."],
 ["An Arduino Uno runs at 16 MHz; your phone's clock is over 100 times faster.","الأردوينو أونو بيشتغل على ١٦ ميجاهرتز؛ موبايلك أسرع بأكتر من ١٠٠ مرة."]
];
function openChest(){
 dayRoll();
 if(!QDEF.every(q=>S.q.done[q[0]])||S.q.chest)return;
 S.q.chest=1;save();sfx("chest");
 const f=FACTS[(Math.random()*FACTS.length)|0],xp=25+((Math.random()*5)|0)*10;
 const m=modal('<div class="fun-chest'+(RM.matches?" rm":"")+'"><div class="fc-box" aria-hidden="true">🎁</div><div class="fc-rev" hidden><h3>'+esc(T("Mystery chest!","صندوق المفاجآت!"))+'</h3><p class="fc-xp" dir="ltr">+'+xp+' XP</p><p class="fc-fact"><small>'+esc(T("Did you know?","تعرف إن؟"))+'</small><br>'+esc(T(f[0],f[1]))+'</p><button type="button" class="primary fm-ok">'+esc(T("Awesome","جامد"))+'</button></div></div>');
 setTimeout(()=>{
  const box=$(".fc-box",m),rev=$(".fc-rev",m);if(!box)return;
  box.classList.add("open");rev.hidden=false;
  const c=centerOf(box);confetti(c.x,c.y,40,280);add(xp,"chest",null);sfx("level");
  buzz(60);refresh();
 },RM.matches?100:1100);
}


/* ---------- lightning round ---------- */
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=(Math.random()*(i+1))|0;[a[i],a[j]]=[a[j],a[i]]}return a}
function lightning(){
 if(typeof QUIZ==="undefined")return;
 const P=[];["robotics","space","ai","ow"].forEach(a=>(QUIZ[a]||[]).forEach(q=>P.push(q)));
 if(P.length<4)return;
 const Q=shuffle(P).slice(0,10),DUR=9000;
 let i=0,score=0,run=0,best=0,locked=false,t0=0,raf=0;
 const m=modal('<button type="button" class="fm-x" aria-label="'+esc(T("Close","إغلاق"))+'">✕</button><div class="ln"></div>',"lightning");
 const box=$(".ln",m);
 function done(){
  cancelAnimationFrame(raf);
  const xp=score*6+best*2;
  S.rounds=(S.rounds||0)+1;S.lbest=Math.max(S.lbest||0,score);save();
  box.innerHTML='<div class="ln-end"><p class="lv-k">'+esc(T("ROUND COMPLETE","خلصت الجولة"))+'</p><div class="lv-n">'+score+'<small>/10</small></div><p class="fc-xp" dir="ltr">+'+xp+' XP</p><p class="lv-s">'+esc(T("Best streak in the round: "+best+" · Your record: "+S.lbest+"/10","أطول سلسلة صح: "+best+" · رقمك القياسي: "+S.lbest+"/10"))+'</p><div class="ln-btns"><button type="button" class="primary" data-again="1">'+esc(T("Again ⚡","كمان مرة ⚡"))+'</button><button type="button" class="fm-ok">'+esc(T("Done","تمام"))+'</button></div></div>';
  add(xp,"lightning",null);if(score>=8){unlock("speed");sfx("level");const c=centerOf(box);confetti(c.x,c.y-40,44,280)}else sfx("coin");
  if(score>=1)qprog("c",0);
  const ag=$("[data-again]",box);if(ag)ag.addEventListener("click",()=>{closeModals();setTimeout(lightning,80)});
 }
 function show(){
  if(!m.isConnected)return;
  if(i>=Q.length){done();return}
  const q=Q[i][isAr()?"ar":"en"],a=Q[i].a;locked=false;
  box.innerHTML='<div class="ln-top"><span>'+(i+1)+'/10</span><span class="ln-sc">⚡ '+score+'</span><span class="ln-cb">'+(run>=2?"🔥 x"+run:"")+'</span></div><div class="ln-t"><b></b></div><h3 class="q-text" dir="auto">'+q.q+'</h3><div class="q-opts">'+q.o.map((o,k)=>'<button type="button" data-i="'+k+'" dir="auto">'+o+'</button>').join("")+'</div>';
  $$(".q-opts button",box).forEach(b=>b.addEventListener("click",()=>pick(+b.dataset.i,b)));
  t0=performance.now();
  (function tick(ts){
   if(!m.isConnected||locked)return;
   const p=Math.min(1,(ts-t0)/DUR),bar=$(".ln-t b",box);if(bar){bar.style.width=((1-p)*100)+"%";bar.classList.toggle("low",p>.66)}
   if(p>=1){pick(-1)}else raf=requestAnimationFrame(tick);
  })(t0);
 }
 function pick(k,btn){
  if(locked)return;locked=true;cancelAnimationFrame(raf);
  const a=Q[i].a,ok=k===a;
  $$(".q-opts button",box).forEach((b,j)=>{b.disabled=true;if(j===a)b.classList.add("right");else if(j===k)b.classList.add("wrong")});
  if(ok){score++;run++;best=Math.max(best,run);sfx("ok");buzz(12);if(btn){const c=centerOf(btn);confetti(c.x,c.y,8,80)}}
  else{run=0;sfx("no");if(btn)btn.classList.add("fun-shake")}
  const sc=$(".ln-sc",box);if(sc)sc.textContent="⚡ "+score;
  setTimeout(()=>{i++;show()},ok?650:1100);
 }
 show();
}
document.addEventListener("click",e=>{if(e.target.closest&&e.target.closest("[data-lightning]")){if($(".fun-modal"))closeModals();setTimeout(lightning,40)}});

/* ---------- modal helper ---------- */
let lastFocus=null;
function modal(html,cls){
 closeModals();lastFocus=document.activeElement;
 const m=document.createElement("div");m.className="fun-modal "+(cls||"");m.setAttribute("role","dialog");m.setAttribute("aria-modal","true");
 m.innerHTML='<div class="fm-card">'+html+'</div>';
 document.body.appendChild(m);
 requestAnimationFrame(()=>m.classList.add("in"));
 m.addEventListener("click",e=>{if(e.target===m||e.target.closest(".fm-ok,.fm-x"))closeModals()});
 const f=$(".fm-ok,.fm-x",m);if(f)f.focus();
 return m;
}
function closeModals(){
 $$(".fun-modal").forEach(m=>m.remove());
 if(lastFocus&&lastFocus.focus)try{lastFocus.focus()}catch(e){}
 setTimeout(flushLevel,300);
}
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&$(".fun-modal"))closeModals()});

function levelModal(l){
 sfx("level");buzz([40,50,40,50,80]);
 const nj=typeof NJ_SVG!=="undefined"?'<div class="lv-nj">'+NJ_SVG+'</div>':'<div class="lv-nj">⭐</div>';
 modal(nj+'<p class="lv-k">'+esc(T("LEVEL UP","مستوى جديد"))+'</p><div class="lv-n">'+l+'</div><h3>'+esc(lvName(l))+'</h3><p class="lv-s">'+esc(T("Najm is proud of you. Keep the streak going!","نجم فخور بيك. كمّل بنفس الحماس!"))+'</p><button type="button" class="primary fm-ok">'+esc(T("Let's go","يلا نكمّل"))+'</button>',"lvl");
 setTimeout(()=>confetti(innerWidth/2,innerHeight*.35,52,320),150);
 setTimeout(()=>confetti(innerWidth*.25,innerHeight*.5,24,200),450);
 setTimeout(()=>confetti(innerWidth*.75,innerHeight*.5,24,200),650);
}

/* ---------- HUD ---------- */
function hudHTML(){
 const i=lvInfo(),st=streakNow();
 return '<span class="fh-ring" style="--p:'+i.p+'"><b>'+i.l+'</b></span><span class="fh-xp">'+S.xp+'<small>XP</small></span><span class="fh-fire'+(st?" on":"")+'">🔥'+st+'</span>';
}
function mountHud(){
 const tools=$(".top-tools");if(!tools)return;
 let b=$("#funHud");
 if(!b){b=document.createElement("button");b.id="funHud";b.type="button";b.className="fun-hud";b.addEventListener("click",openPanel);tools.insertBefore(b,$(".lang",tools)||null)}
 b.setAttribute("aria-label",T("Trophy room. Level "+lvOf(S.xp)+", "+S.xp+" XP","غرفة الجوائز. مستوى "+lvOf(S.xp)+"، "+S.xp+" نقطة"));
 const html=hudHTML();if(b.innerHTML!==html){b.innerHTML=html;if(!RM.matches){b.classList.remove("bump");void b.offsetWidth;b.classList.add("bump")}}
}

/* ---------- home card ---------- */
function questRows(){
 dayRoll();
 return QDEF.map(q=>{
  const v=Math.min(S.q[q[0]]||0,q[1]),done=!!S.q.done[q[0]];
  return '<li class="'+(done?"done":"")+'"><i>'+(done?"✔":q[2])+'</i><span>'+esc(T(q[3],q[4]))+'</span><em dir="ltr">'+v+'/'+q[1]+'</em><div class="qbar"><b style="width:'+(v/q[1]*100)+'%"></b></div></li>';
 }).join("");
}
function chestBtn(cls){
 const ready=QDEF.every(q=>S.q.done[q[0]]),got=!!S.q.chest;
 return '<button type="button" class="fun-chestbtn '+cls+(ready&&!got?" ready":"")+'" '+(ready&&!got?"":"disabled")+' data-chest="1"><i>'+(got?"✨":"🎁")+'</i><span>'+esc(got?T("Chest opened today","فتحت صندوق النهارده"):ready?T("Open today's chest!","افتح صندوق اليوم!"):T("Finish all 3 missions to unlock the chest","خلّص المهام التلاتة وافتح الصندوق"))+'</span></button>';
}
function homeHTML(){
 const i=lvInfo(),st=streakNow();
 return '<div class="fh-top"><div class="fh-big" style="--p:'+i.p+'"><b>'+i.l+'</b></div><div class="fh-info"><small>'+esc(T("Your rank","رتبتك"))+'</small><h2>'+esc(lvName(i.l))+'</h2><div class="xbar"><b style="width:'+i.p+'%"></b></div><p><bdi dir="ltr">'+S.xp+' XP</bdi> · '+esc(T((i.hi-S.xp)+" to level "+(i.l+1),"فاضل "+(i.hi-S.xp)+" للمستوى "+(i.l+1)))+'</p></div><div class="fh-stat"><b>🔥 '+st+'</b><small>'+esc(T("day streak","يوم ورا بعض"))+'</small></div></div>'
 +'<h3 class="fh-h">'+esc(T("Today's missions","مهام النهارده"))+'</h3><ul class="fun-quests">'+questRows()+'</ul>'+chestBtn("")+'<button type="button" class="fun-lightning" data-lightning="1"><i>⚡</i><span><b>'+esc(T("Lightning Round","الجولة السريعة"))+'</b><small>'+esc(T("10 questions · 9 seconds each · beat your record","١٠ أسئلة · ٩ ثواني لكل سؤال · اكسر رقمك"))+'</small></span></button>'
 +'<button type="button" class="fun-trophy-btn" data-trophy="1">🏆 '+esc(T("Trophy room","غرفة الجوائز"))+' <small>'+Object.keys(S.badges).length+'/'+B.length+'</small></button>';
}
function mountHome(){
 const root=$("#homeRoot");if(!root)return;
 const hero=$(".hero",root);if(!hero)return;
 let c=$("#funHome",root);
 if(!c){c=document.createElement("section");c.id="funHome";c.className="panel fun-home";hero.insertAdjacentElement("afterend",c)}
 c.innerHTML=homeHTML();
}
document.addEventListener("click",e=>{
 const t=e.target;if(!t.closest)return;
 if(t.closest("[data-trophy]"))openPanel();
 const cb=t.closest("[data-chest]");if(cb&&!cb.disabled)openChest();
});

/* ---------- trophy room ---------- */
function weekDots(){
 let h="";
 for(let n=6;n>=0;n--){const d=ago(n),on=S.days.includes(d),dt=new Date();dt.setDate(dt.getDate()-n);
  const lbl=dt.toLocaleDateString(isAr()?"ar":"en",{weekday:"short"});
  h+='<span class="wd'+(on?" on":"")+(n===0?" now":"")+'"><i>'+(on?"🔥":"")+'</i><small>'+esc(lbl)+'</small></span>';
 }
 return h;
}
function panelHTML(){
 const i=lvInfo(),st=streakNow(),have=Object.keys(S.badges).length;
 return '<button type="button" class="fm-x" aria-label="'+esc(T("Close","إغلاق"))+'">✕</button>'
 +'<div class="fp-head"><div class="fh-big" style="--p:'+i.p+'"><b>'+i.l+'</b></div><div><h3>'+esc(lvName(i.l))+'</h3><div class="xbar"><b style="width:'+i.p+'%"></b></div><p><bdi dir="ltr">'+S.xp+' XP</bdi> · '+esc(T((i.hi-S.xp)+" to level "+(i.l+1),"فاضل "+(i.hi-S.xp)+" للمستوى "+(i.l+1)))+'</p></div></div>'
 +'<div class="fp-streak"><div><b>🔥 '+st+'</b><small>'+esc(T("current streak","السلسلة الحالية"))+'</small></div><div class="wk">'+weekDots()+'</div><div><b>'+S.best+'</b><small>'+esc(T("best","أفضل"))+'</small></div></div>'
 +'<h4>'+esc(T("Today's missions","مهام النهارده"))+'</h4><ul class="fun-quests">'+questRows()+'</ul>'+chestBtn("in-panel")+'<button type="button" class="fun-lightning" data-lightning="1"><i>⚡</i><span><b>'+esc(T("Lightning Round","الجولة السريعة"))+'</b><small>'+esc(T("10 questions · 9 seconds each · beat your record","١٠ أسئلة · ٩ ثواني لكل سؤال · اكسر رقمك"))+'</small></span></button>'
 +'<h4>'+esc(T("Badges","الشارات"))+' <small>'+have+'/'+B.length+'</small></h4><div class="fp-badges">'
 +B.map(b=>{const on=!!S.badges[b[0]],hid=SECRET[b[0]]&&!on;
  return '<button type="button" class="bd'+(on?" on":"")+'" data-bd="'+b[0]+'" aria-label="'+esc(hid?T("Secret badge","شارة سرية"):bname(b)+": "+(isAr()?b[5]:b[4]))+'"><i>'+(hid?"❔":b[1])+'</i><span>'+esc(hid?"???":bname(b))+'</span></button>'}).join("")
 +'</div><p class="fp-hint" id="fpHint" role="status">'+esc(T("Tap a badge to see how to earn it. Some are secret.","اضغط على أي شارة تعرف تكسبها إزاي. فيه شارات سرية."))+'</p>'
 +'<label class="fp-snd"><input type="checkbox" id="fpSnd"'+(S.sound?" checked":"")+'> '+esc(T("Reward sounds","أصوات المكافآت"))+'</label>';
}
function openPanel(){
 const m=modal(panelHTML(),"panel-room");
 $("#fpSnd",m).addEventListener("change",e=>{S.sound=e.target.checked?1:0;save();if(S.sound){ctx();sfx("coin")}});
 m.addEventListener("click",e=>{
  const bd=e.target.closest&&e.target.closest("[data-bd]");
  if(bd){const b=bdef(bd.dataset.bd),on=!!S.badges[b[0]],hid=SECRET[b[0]]&&!on;
   $("#fpHint",m).textContent=hid?T("A secret badge. Try odd things: a famous cheat code, a name, a tap spree...","شارة سرية. جرّب حاجات غريبة: كود مشهور، اسم، ضغطات كتير..."):bname(b)+" — "+(isAr()?b[5]:b[4]);sfx("pop")}
  const cb=e.target.closest&&e.target.closest("[data-chest]");if(cb&&!cb.disabled){closeModals();setTimeout(openChest,60)}
 });
}

/* ---------- refresh everything visible ---------- */
function refresh(){
 mountHud();mountHome();
 const pr=$(".panel-room .fm-card");if(pr){const sc=pr.scrollTop;pr.innerHTML=panelHTML();pr.scrollTop=sc;const sn=$("#fpSnd",pr);if(sn)sn.addEventListener("change",e=>{S.sound=e.target.checked?1:0;save()})}
}

/* ---------- boot ---------- */
dayRoll();save();
S.langs[isAr()?"ar":"en"]=1;
(window.EXT_RENDER=window.EXT_RENDER||[]).push(()=>{mountHud();mountHome()});
mountHud();mountHome();
{const hr=$("#homeRoot");if(hr)new MutationObserver(()=>{if($(".hero",hr)&&!$("#funHome",hr))mountHome()}).observe(hr,{childList:true})}
luckyLoop();
window.__fun={add,unlock,state:()=>S,reset:()=>{S=fresh();save();refresh()}};
})();
