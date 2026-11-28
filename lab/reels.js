"use strict";
/* Mission Lab Reels v3: Najm narrates one short reel per explained point of each lesson.
   Needs reels-scenes.js (RS) and reels-data.js (REELS). Narration = Web Speech API (device voices),
   sound effects + light music = WebAudio synth (no audio files). Audio starts only after a user tap. */
Object.assign(STR.en,{
 rlOpen:"Reels",rlWatch:"▶ Watch the reels",rlSwipe:"Swipe up · tap to pause",
 rlReplay:"↻ Watch again",rlClose:"Close reels",rlNext:"Next reel",rlPrev:"Previous reel",
 rlDone:"That's every reel. Pick any lesson to go deeper!",rlSnd:"Sound on or off",rlNoVoice:"No Arabic voice on this device: captions only",
 rlNoVoiceEn:"No voice on this device: captions only"});
Object.assign(STR.ar,{
 rlOpen:"ريلز",rlWatch:"▶ اتفرّج على الريلز",rlSwipe:"اسحب لفوق · دوس للإيقاف",
 rlReplay:"↻ اتفرّج تاني",rlClose:"قفل الريلز",rlNext:"الريل اللي بعده",rlPrev:"الريل اللي قبله",
 rlDone:"خلصت كل الريلز. افتح أي درس وتعمّق أكتر!",rlSnd:"الصوت شغال أو مقفول",rlNoVoice:"مفيش صوت عربي على الجهاز ده: الكلام مكتوب بس",
 rlNoVoiceEn:"مفيش صوت على الجهاز ده: الكلام مكتوب بس"});

const RL_RM=matchMedia("(prefers-reduced-motion: reduce)");
const rlT=k=>STR[LANG][k]||k;
const rlTrackName=tr=>({robotics:"areaRobotics",space:"areaSpace",ai:"areaAi",python:"tabPython"}[tr]||"areaRobotics");

/* ---------- Najm the narrator ---------- */
const NJ_SVG='<svg viewBox="0 -14 120 154" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="nj">'
+'<ellipse cx="60" cy="134" rx="30" ry="5" fill="#000" opacity=".25"/>'
+'<g class="nj-body"><g class="nj-arm-l"><rect x="26" y="78" width="12" height="30" rx="6" fill="#c5d8f1" stroke="#0b1230" stroke-width="3"/><circle cx="32" cy="110" r="7" fill="#dce9f8" stroke="#0b1230" stroke-width="3"/></g>'
+'<g class="nj-arm-r"><rect x="82" y="78" width="12" height="30" rx="6" fill="#c5d8f1" stroke="#0b1230" stroke-width="3"/><circle cx="88" cy="110" r="7" fill="#dce9f8" stroke="#0b1230" stroke-width="3"/></g>'
+'<rect x="36" y="72" width="48" height="52" rx="20" fill="#c5d8f1" stroke="#0b1230" stroke-width="3"/><circle cx="60" cy="98" r="8" fill="#56e4ff" stroke="#0b1230" stroke-width="2.5" class="nj-pulse"/>'
+'<g class="nj-head"><line x1="60" y1="8" x2="60" y2="-4" stroke="#0b1230" stroke-width="3.5" stroke-linecap="round"/><circle cx="60" cy="-6" r="6" fill="#ffd479" stroke="#0b1230" stroke-width="3" class="nj-pulse"/>'
+'<circle cx="60" cy="42" r="35" fill="#dce9f8" stroke="#0b1230" stroke-width="3.5"/><rect x="31" y="22" width="58" height="38" rx="19" fill="#0b1230"/>'
+'<g class="nj-eyes"><circle cx="48" cy="40" r="6.5" fill="#8ef3ff"/><circle cx="72" cy="40" r="6.5" fill="#8ef3ff"/><circle cx="50" cy="38" r="2" fill="#fff"/><circle cx="74" cy="38" r="2" fill="#fff"/></g>'
+'<ellipse cx="60" cy="52" rx="7" ry="3" fill="#8ef3ff" class="nj-mouth"/><circle cx="37" cy="58" r="4.5" fill="#ff7ab6" opacity=".65"/><circle cx="83" cy="58" r="4.5" fill="#ff7ab6" opacity=".65"/></g></g></svg>';

/* ---------- Audio: WebAudio SFX + light music, all synthesized ---------- */
const AU={ctx:null,on:(()=>{try{const v=localStorage.getItem("lab-reel-snd");return v===null?!RL_RM.matches:v==="1"}catch(e){return true}})(),mus:null,track:null,step:0,gMus:null};
function auInit(){
 try{
  if(!AU.ctx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return false;AU.ctx=new AC();
   AU.master=AU.ctx.createGain();AU.master.gain.value=.9;AU.master.connect(AU.ctx.destination);
   AU.gMus=AU.ctx.createGain();AU.gMus.gain.value=.55;AU.gMus.connect(AU.master);}
  if(AU.ctx.state==="suspended")AU.ctx.resume();
  return true;
 }catch(e){return false}
}
function auTone(f,t0,dur,type,vol,dest,slideTo){
 const c=AU.ctx,o=c.createOscillator(),g=c.createGain();
 o.type=type;o.frequency.setValueAtTime(f,t0);if(slideTo)o.frequency.exponentialRampToValueAtTime(slideTo,t0+dur);
 g.gain.setValueAtTime(0.0001,t0);g.gain.exponentialRampToValueAtTime(vol,t0+.012);g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
 o.connect(g);g.connect(dest||AU.master);o.start(t0);o.stop(t0+dur+.05);
}
function sfx(kind){
 if(!AU.on||!AU.ctx||AU.ctx.state!=="running")return;
 const c=AU.ctx,t=c.currentTime+.01;
 if(kind==="pop"){auTone(520,t,.12,"sine",.16,null,980)}
 else if(kind==="chirp"){auTone(660,t,.1,"triangle",.14);auTone(990,t+.1,.16,"triangle",.14)}
 else if(kind==="ding"){auTone(880,t,.5,"sine",.13);auTone(1320,t+.08,.5,"sine",.09)}
 else if(kind==="boop"){auTone(300,t,.14,"square",.06,null,200)}
 else if(kind==="whoosh"){
  const n=c.sampleRate*.28,b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);
  const s=c.createBufferSource();s.buffer=b;const f=c.createBiquadFilter();f.type="bandpass";f.Q.value=1.2;f.frequency.setValueAtTime(300,t);f.frequency.exponentialRampToValueAtTime(2400,t+.26);
  const g=c.createGain();g.gain.value=.16;s.connect(f);f.connect(g);g.connect(AU.master);s.start(t);}
}
const AU_CFG={
 space:{sc:[0,3,7,10,12,15,19],base:174.6,w:"sine",ms:950,dec:2.4,v:.05,p:.65,drone:true},
 robotics:{sc:[0,4,7,12,7,4,9,12],base:220,w:"triangle",ms:330,dec:.28,v:.04,p:.85,seq:true},
 python:{sc:[0,2,4,7,9,12,9,7],base:261.6,w:"sine",ms:430,dec:.55,v:.05,p:.8,seq:true},
 ai:{sc:[0,5,7,12,14,12,7,5],base:196,w:"square",ms:360,dec:.2,v:.022,p:.8,seq:true}};
function auMusicStop(){
 if(AU.mus){clearInterval(AU.mus);AU.mus=null}
 if(AU.drone){try{AU.drone.forEach(o=>o.stop(AU.ctx.currentTime+.4))}catch(e){}AU.drone=null}
}
function auMusic(track){
 if(!AU.on||!AU.ctx||RL.paused||document.hidden){auMusicStop();AU.track=null;return}
 if(AU.track===track&&AU.mus)return;
 auMusicStop();AU.track=track;const cf=AU_CFG[track]||AU_CFG.robotics;AU.step=0;
 if(cf.drone){const c=AU.ctx,g=c.createGain();g.gain.setValueAtTime(0.0001,c.currentTime);g.gain.linearRampToValueAtTime(.03,c.currentTime+1.5);g.connect(AU.gMus);
  const o1=c.createOscillator(),o2=c.createOscillator();o1.type=o2.type="sine";o1.frequency.value=cf.base/2;o2.frequency.value=cf.base/2*1.5;o1.connect(g);o2.connect(g);o1.start();o2.start();AU.drone=[o1,o2];}
 AU.mus=setInterval(()=>{
  if(!AU.ctx||AU.ctx.state!=="running")return;
  const i=AU.step++;let k=cf.seq?cf.sc[i%cf.sc.length]:cf.sc[Math.floor(Math.random()*cf.sc.length)];
  if(Math.random()>cf.p)return;
  const f=cf.base*Math.pow(2,k/12);auTone(f,AU.ctx.currentTime+.02,cf.dec,cf.w,cf.v,AU.gMus);
  if(i%4===0)auTone(f/2,AU.ctx.currentTime+.02,cf.dec*1.4,"sine",cf.v*.8,AU.gMus);
 },cf.ms);
}

/* ---------- Speech: device voices via Web Speech API ---------- */
const SP={ok:("speechSynthesis" in window)&&typeof SpeechSynthesisUtterance!=="undefined",cur:null,wd:0,warned:""};
function spVoice(ar){
 if(!SP.ok)return null;const vs=speechSynthesis.getVoices();if(!vs.length)return undefined;
 const pre=ar?["ar-EG","ar-SA","ar"]:["en-US","en-GB","en"];
 for(const p of pre){const v=vs.find(v=>v.lang&&v.lang.replace("_","-").toLowerCase().startsWith(p.toLowerCase()));if(v)return v}
 return null;
}
if(SP.ok){try{speechSynthesis.getVoices();speechSynthesis.addEventListener("voiceschanged",()=>{})}catch(e){SP.ok=false}}
function spCancel(){clearTimeout(SP.wd);SP.cur=null;if(SP.ok){try{speechSynthesis.cancel()}catch(e){}}}
function spSay(text,ar,onStart,onEnd){
 /* returns false when no usable voice (caller falls back to timed captions) */
 if(!SP.ok||!AU.on)return false;
 const v=spVoice(ar);if(v===null||v===undefined)return false;
 spCancel();
 let u;try{u=new SpeechSynthesisUtterance(text);u.voice=v;u.lang=v.lang;u.rate=ar?.95:1.02;u.pitch=1.18;u.volume=1}catch(e){return false}
 let done=false;const fin=()=>{if(done)return;done=true;clearTimeout(SP.wd);if(SP.cur===u)SP.cur=null;onEnd()};
 u.onstart=()=>{onStart&&onStart()};u.onend=fin;u.onerror=fin;SP.cur=u;
 setTimeout(()=>{if(SP.cur===u){try{speechSynthesis.speak(u)}catch(e){fin()}}},70);
 SP.wd=setTimeout(fin,Math.max(5000,text.length*190));
 return true;
}
function spPrime(){
 if(!SP.ok)return;try{const u=new SpeechSynthesisUtterance(" ");u.volume=0;speechSynthesis.speak(u)}catch(e){}
}

/* ---------- state ---------- */
const RL={open:false,idx:0,beat:0,t:0,dur:3,speech:false,spDone:false,tail:0,tok:0,playing:false,paused:false,finished:false,raf:0,lastTs:0,els:null,seen:0};
const rlText=b=>LANG==="ar"?b[1]:b[0];
function rlLessonName(key){
 const lists=[typeof LESSONS!=="undefined"&&LESSONS,typeof ORBTYPES!=="undefined"&&ORBTYPES,typeof CONCEPTS!=="undefined"&&CONCEPTS,typeof ELEC!=="undefined"&&ELEC,typeof PROJECTS!=="undefined"&&PROJECTS,typeof SPACE_MORE!=="undefined"&&SPACE_MORE,typeof AI_MORE!=="undefined"&&AI_MORE,typeof AILESS!=="undefined"&&AILESS];
 for(const L of lists){if(!L)continue;const x=L.find(i=>i.en&&i.en.title===key);if(x)return LANG==="ar"&&x.ar?x.ar.title:key}
 return key;
}
const RL_PART=REELS.map((r,i)=>{const same=REELS.filter(x=>x.lesson===r.lesson);return{n:same.indexOf(r)+1,m:same.length}});

function rlBuild(){
 const root=document.getElementById("reelsRoot");
 root.innerHTML=`<div class="rl-wrap${RL_RM.matches?" rm":""}" hidden role="dialog" aria-modal="true" aria-label="Reels">
  <div class="rl-top">
   <div class="rl-segs"><i><b></b></i><i><b></b></i><i><b></b></i></div>
   <div class="rl-meta"><span class="rl-count"></span><span class="rl-trackchip"></span><span class="rl-part"></span>
    <button type="button" class="rl-snd" aria-label=""></button>
    <button type="button" class="rl-x" aria-label="">✕</button></div>
  </div>
  <div class="rl-stage"><div class="rl-track">${REELS.map((r,i)=>`<section class="rl-reel" data-i="${i}"><div class="rl-title"></div><div class="rl-scene"></div></section>`).join("")}</div></div>
  <div class="rl-narr"><div class="rl-najm">${NJ_SVG}</div><div class="rl-say" dir="auto"><span class="rl-cap"></span></div></div>
  <div class="rl-paused-badge" aria-hidden="true">❚❚</div>
  <div class="rl-navd"><button type="button" data-d="-1">▲</button><button type="button" data-d="1">▼</button></div>
  <button type="button" class="rl-replay" hidden></button>
  <div class="rl-hint"><span data-rl="hint"></span></div>
 </div>`;
 const w=root.firstElementChild;
 RL.els={wrap:w,track:w.querySelector(".rl-track"),segs:[...w.querySelectorAll(".rl-segs i")],
  count:w.querySelector(".rl-count"),chip:w.querySelector(".rl-trackchip"),part:w.querySelector(".rl-part"),x:w.querySelector(".rl-x"),snd:w.querySelector(".rl-snd"),
  navUp:w.querySelector('.rl-navd [data-d="-1"]'),navDn:w.querySelector('.rl-navd [data-d="1"]'),
  replay:w.querySelector(".rl-replay"),hint:w.querySelector(".rl-hint"),hintTxt:w.querySelector("[data-rl=hint]"),
  najm:w.querySelector(".rl-najm"),say:w.querySelector(".rl-say"),cap:w.querySelector(".rl-cap"),reels:[...w.querySelectorAll(".rl-reel")]};
 RL.els.x.addEventListener("click",rlClose);
 RL.els.snd.addEventListener("click",e=>{e.stopPropagation();rlSoundToggle()});
 RL.els.navUp.addEventListener("click",()=>rlGo(RL.idx-1));
 RL.els.navDn.addEventListener("click",()=>{if(RL.finished)rlReplayCur();else rlGo(RL.idx+1)});
 RL.els.replay.addEventListener("click",rlReplayCur);
 let py=0,pt=0,moved=0;
 w.addEventListener("pointerdown",e=>{py=e.clientY;pt=Date.now();moved=0;auInit()},{passive:true});
 w.addEventListener("pointermove",e=>{moved=Math.max(moved,Math.abs(e.clientY-py))},{passive:true});
 w.addEventListener("pointerup",e=>{
  const dy=e.clientY-py;
  if(Math.abs(dy)>56&&Date.now()-pt<600){dy<0?(RL.finished?rlReplayCur():rlGo(RL.idx+1)):rlGo(RL.idx-1)}
  else if(moved<8&&e.target.closest(".rl-scene,.rl-reel,.rl-narr"))rlTogglePause();
 },{passive:true});
 let wl=0;
 w.addEventListener("wheel",e=>{const n=Date.now();if(n-wl<450||Math.abs(e.deltaY)<24)return;wl=n;e.deltaY>0?rlGo(RL.idx+1):rlGo(RL.idx-1)},{passive:true});
 window.addEventListener("keydown",rlKeys);
 document.addEventListener("visibilitychange",()=>{if(document.hidden&&RL.open&&!RL.paused)rlTogglePause()});
}
function rlKeys(e){
 if(!RL.open)return;
 if(e.key==="Escape")rlClose();
 else if(e.key==="ArrowDown"||e.key==="PageDown"){e.preventDefault();RL.finished?rlReplayCur():rlGo(RL.idx+1)}
 else if(e.key==="ArrowUp"||e.key==="PageUp"){e.preventDefault();rlGo(RL.idx-1)}
 else if(e.key===" "){e.preventDefault();rlTogglePause()}
 else if(e.key==="m"||e.key==="M")rlSoundToggle();
}
function rlSoundToggle(){
 AU.on=!AU.on;try{localStorage.setItem("lab-reel-snd",AU.on?"1":"0")}catch(e){}
 if(AU.on){auInit();spPrime();rlBeat(RL.beat)}else{spCancel();auMusicStop();AU.track=null;RL.speech=false;RL.els.najm.classList.remove("talk")}
 rlTexts();
}
function rlScenes(i){
 RL.els.reels.forEach((s,k)=>{
  const box=s.querySelector(".rl-scene");
  if(Math.abs(k-i)<=1){
   if(box.dataset.l!==LANG||!box.firstChild){const r=REELS[k];try{box.innerHTML=RS[r.scene.k](r.scene)}catch(e){box.innerHTML=""}box.dataset.l=LANG}
   const sv=box.querySelector("svg");
   if(sv&&sv.pauseAnimations){if(k===i&&!RL.paused)sv.unpauseAnimations();else sv.pauseAnimations()}
  }else if(box.firstChild){box.innerHTML="";box.dataset.l=""}
 });
}
function rlSetPose(p){
 const n=RL.els.najm;n.className="rl-najm "+(RL.speech?"talk ":"")+"pose-"+(p||"happy");
}
/* one narrated beat of the current reel */
function rlBeat(n){
 const r=REELS[RL.idx];if(!r)return;
 RL.beat=n;RL.t=0;RL.spDone=false;RL.tail=0;const tok=++RL.tok;
 const b=r.beats[n],txt=rlText(b),ar=LANG==="ar";
 RL.els.wrap.classList.toggle("cameo",n===r.beats.length-1);
 RL.els.cap.textContent=txt;RL.els.say.dir=ar?"rtl":"ltr";
 RL.els.say.classList.remove("pop");void RL.els.say.offsetWidth;RL.els.say.classList.add("pop");
 RL.dur=Math.max(3.2,txt.length*(ar?.11:.09));
 RL.els.segs.forEach((g,k)=>{g.firstElementChild.style.width=k<n?"100%":"0"});
 RL.speech=false;
 sfx(n===r.beats.length-1?"chirp":"pop");
 const ok=spSay(txt,ar,()=>{if(tok===RL.tok){RL.speech=true;rlSetPose(b[2]);}},()=>{if(tok===RL.tok){RL.spDone=true;RL.speech=false;RL.els.najm.classList.remove("talk")}});
 RL.speech=ok;RL.usingSpeech=ok;
 rlSetPose(b[2]);
 if(ok)RL.dur=Math.max(RL.dur,4);
 if(!ok&&AU.on&&SP.ok&&spVoice(ar)===null&&SP.warned!==LANG){SP.warned=LANG;RL.els.hintTxt.textContent=rlT(ar?"rlNoVoice":"rlNoVoiceEn");RL.els.hint.classList.remove("gone");setTimeout(()=>RL.els.hint.classList.add("gone"),3500)}
 auMusic(r.track);
}
function rlTick(ts){
 if(!RL.playing)return;
 if(!RL.lastTs)RL.lastTs=ts;
 const dt=Math.min((ts-RL.lastTs)/1000,.1);RL.lastTs=ts;
 const r=REELS[RL.idx];
 if(!RL.paused){
  RL.t+=dt;
  const seg=RL.els.segs[RL.beat];if(seg)seg.firstElementChild.style.width=Math.min(RL.t/RL.dur*100,98)+"%";
  let next=false;
  if(RL.usingSpeech){if(RL.spDone){RL.tail+=dt;if(RL.tail>.65)next=true}}
  else if(RL.t>=RL.dur){RL.els.najm.classList.remove("talk");RL.tail+=dt;if(RL.tail>.35)next=true}
  else if(AU.on||true)RL.els.najm.classList.add("talk");
  if(next){
   if(seg)seg.firstElementChild.style.width="100%";
   if(RL.beat<r.beats.length-1){rlBeat(RL.beat+1)}
   else{RL.playing=false;rlFinish();return}
  }
 }
 RL.raf=requestAnimationFrame(rlTick);
}
function rlFinish(){
 RL.finished=true;RL.els.najm.classList.remove("talk");
 RL.els.replay.hidden=false;sfx("ding");
 if(RL.idx<REELS.length-1)setTimeout(()=>{if(RL.open&&RL.finished&&!RL.paused)rlGo(RL.idx+1)},1100);
 else{RL.els.cap.textContent=rlT("rlDone");RL.els.say.dir=LANG==="ar"?"rtl":"ltr";rlSetPose("wow")}
}
function rlGo(i){
 i=Math.max(0,Math.min(REELS.length-1,i));
 const moved=i!==RL.idx;
 RL.idx=i;RL.finished=false;RL.paused=false;RL.lastTs=0;RL.beat=0;
 RL.els.wrap.classList.remove("paused");
 RL.els.track.style.transform=`translateY(${-i*100}%)`;
 RL.els.reels.forEach((s,k)=>s.classList.toggle("act",k===i));
 RL.els.replay.hidden=true;
 RL.els.hint.classList.toggle("gone",RL.seen>1||i>0);
 if(moved)sfx("whoosh");
 RL.els.wrap.classList.remove("cameo");
 {const bx=RL.els.reels[i].querySelector('.rl-scene');bx.dataset.l=''}
 rlScenes(i);rlTexts();
 cancelAnimationFrame(RL.raf);spCancel();RL.tok++;
 if(RL_RM.matches){rlStatic();return}
 rlBeat(0);
 RL.playing=true;RL.raf=requestAnimationFrame(rlTick);
}
function rlStatic(){
 /* reduced motion: no autoplay, no timers, all beats shown as static text, scenes frozen */
 const r=REELS[RL.idx];RL.playing=false;spCancel();auMusicStop();
 RL.els.cap.innerHTML=r.beats.map(b=>`<span class="rl-line" dir="${LANG==="ar"?"rtl":"ltr"}">${rlText(b)}</span>`).join("");
 RL.els.say.dir=LANG==="ar"?"rtl":"ltr";rlSetPose("happy");
 RL.els.segs.forEach(g=>g.firstElementChild.style.width="100%");
}
function rlTogglePause(){
 if(RL_RM.matches||RL.finished)return;
 RL.paused=!RL.paused;
 RL.els.wrap.classList.toggle("paused",RL.paused);
 if(RL.paused){spCancel();auMusicStop();AU.track=null;RL.els.najm.classList.remove("talk")}
 else{RL.lastTs=0;rlBeat(RL.beat)}
 rlScenes(RL.idx);
}
function rlReplayCur(){RL.finished=false;rlGo(RL.idx)}
function rlTexts(){
 const r=REELS[RL.idx],p=RL_PART[RL.idx];
 RL.els.count.textContent=`${RL.idx+1} / ${REELS.length}`;
 RL.els.chip.textContent=rlLessonName(r.lesson);
 RL.els.part.textContent=`${p.n}/${p.m}`;
 RL.els.reels[RL.idx].querySelector(".rl-title").textContent=LANG==="ar"?r.title.ar:r.title.en;
 RL.els.hintTxt.textContent=rlT("rlSwipe");
 RL.els.replay.textContent=rlT("rlReplay");
 RL.els.x.setAttribute("aria-label",rlT("rlClose"));
 RL.els.navUp.setAttribute("aria-label",rlT("rlPrev"));RL.els.navDn.setAttribute("aria-label",rlT("rlNext"));
 RL.els.snd.textContent=AU.on?"🔊":"🔇";RL.els.snd.setAttribute("aria-label",rlT("rlSnd"));RL.els.snd.setAttribute("aria-pressed",AU.on?"true":"false");
}
function openReels(i){
 if(!RL.els)rlBuild();
 auInit();spPrime();            /* inside the user's tap: unlocks WebAudio and speech */
 RL.open=true;RL.seen++;
 document.body.style.overflow="hidden";
 RL.els.wrap.hidden=false;
 rlGo(typeof i==="number"?i:0);
 const btn=document.getElementById("reelsOpen");if(btn)btn.setAttribute("aria-expanded","true");
}
function rlClose(){
 RL.open=false;RL.playing=false;cancelAnimationFrame(RL.raf);RL.tok++;spCancel();auMusicStop();AU.track=null;
 document.body.style.overflow="";
 RL.els.wrap.hidden=true;
 const btn=document.getElementById("reelsOpen");if(btn)btn.setAttribute("aria-expanded","false");
}
window.openReels=openReels;

/* every lesson that has reels gets a "watch the reels" button that opens at its first reel */
function rlInjectHooks(){
 const seen={};
 REELS.forEach((r,i)=>{
  if(seen[r.lesson]!=null)return;seen[r.lesson]=i;
  const el=document.getElementById(slug(r.lesson));if(!el)return;
  if(el.querySelector(".rl-watch"))return;
  const body=el.querySelector(".l-body");if(!body)return;
  const m=RL_PART[i].m;
  const b=document.createElement("button");
  b.type="button";b.className="rl-watch";b.textContent=rlT("rlWatch")+(m>1?" ("+m+")":"");
  b.addEventListener("click",e=>{e.stopPropagation();openReels(i)});
  const done=body.querySelector(".l-done");
  body.insertBefore(b,done||null);
 });
}
(window.EXT_RENDER=window.EXT_RENDER||[]).push(()=>{rlInjectHooks();if(RL.open){rlScenes(RL.idx);rlTexts();if(RL_RM.matches)rlStatic();else if(!RL.paused&&!RL.finished)rlBeat(RL.beat)}});

{const nb=document.getElementById("reelsOpen");
 if(nb){nb.addEventListener("click",()=>openReels(0));
  const sp=nb.querySelector("[data-i18n=rlOpen]")||nb.querySelector("span");
  if(sp)sp.textContent=rlT("rlOpen");}}
rlInjectHooks();
