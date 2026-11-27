"use strict";
/* Mission Lab glow-up: motion + enrichment layer. No dependencies, additive, fails soft.
   Honors prefers-reduced-motion. */
(function(){
const RM=matchMedia("(prefers-reduced-motion: reduce)");
const $=(s,r)=>(r||document).querySelector(s),$$=(s,r)=>[...(r||document).querySelectorAll(s)];

/* scroll progress + back-to-top */
const bar=document.createElement("div");bar.className="g-progress";bar.setAttribute("aria-hidden","true");document.body.appendChild(bar);
const up=document.createElement("button");up.type="button";up.className="g-top";up.textContent="↑";up.setAttribute("aria-label","Back to top");document.body.appendChild(up);
up.addEventListener("click",()=>scrollTo({top:0,behavior:RM.matches?"auto":"smooth"}));
let tick=false;
function onScroll(){if(tick)return;tick=true;requestAnimationFrame(()=>{tick=false;
  const h=document.documentElement,max=h.scrollHeight-innerHeight;
  bar.style.transform="scaleX("+(max>0?Math.min(1,scrollY/max):0)+")";
  up.classList.toggle("on",scrollY>700)})}
addEventListener("scroll",onScroll,{passive:true});onScroll();

/* spotlight + tilt on cards (pointer devices only) */
const fine=matchMedia("(hover:hover) and (pointer:fine)");
const SPOT=".panel,.hero,.area-card,.lesson,.part-card,.chat,.quiz-panel";
document.addEventListener("pointermove",e=>{
  if(!fine.matches||RM.matches)return;
  const c=e.target.closest&&e.target.closest(SPOT);if(!c)return;
  c.classList.add("g-spot");
  const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
  c.style.setProperty("--mx",x+"px");c.style.setProperty("--my",y+"px");
  if(c.classList.contains("area-card")){
    c.style.setProperty("--ry",((x/r.width-.5)*6).toFixed(2)+"deg");
    c.style.setProperty("--rx",((.5-y/r.height)*6).toFixed(2)+"deg");
  }
},{passive:true});

/* ripple on buttons */
document.addEventListener("pointerdown",e=>{
  if(RM.matches)return;
  const b=e.target.closest&&e.target.closest(".quick button,.primary,.chat-form button,.areas button,.msg-act button");
  if(!b)return;
  const r=b.getBoundingClientRect(),d=Math.max(r.width,r.height)*.8,s=document.createElement("span");
  s.className="g-ripple";s.style.cssText="width:"+d+"px;height:"+d+"px;left:"+(e.clientX-r.left-d/2)+"px;top:"+(e.clientY-r.top-d/2)+"px";
  b.appendChild(s);setTimeout(()=>s.remove(),650);
});

/* a shooting star every so often */
if(!RM.matches){
  const st=document.createElement("div");st.className="g-shoot";st.setAttribute("aria-hidden","true");document.body.appendChild(st);
  setInterval(()=>{
    if(document.hidden)return;
    st.classList.remove("go");void st.offsetWidth;
    st.style.left=(Math.random()*innerWidth*.6)+"px";st.style.top=(Math.random()*innerHeight*.35)+"px";
    st.classList.add("go");
  },11000);
}

/* hero orbit rings */
function decorateHero(){
  $$(".hero").forEach(h=>{if(h.querySelector(".orb"))return;
    ["o1","o2"].forEach(c=>{const o=document.createElement("span");o.className="orb "+c;o.setAttribute("aria-hidden","true");h.prepend(o)})});
}

/* ---------- enrichment ("go deeper") ---------- */
const LBL={
 why:{i:"💡",en:"Why it matters",ar:"ليه ده مهم"},
 mist:{i:"⚠️",en:"Common mistake",ar:"غلطة شائعة"},
 tryit:{i:"🧪",en:"Try it",ar:"جرّبها"},
 fun:{i:"✨",en:"Pro tip",ar:"نصيحة محترف"}};
const ANIM={
 orbit:`<svg viewBox="0 0 200 160" role="img" aria-label="A satellite orbiting Earth"><ellipse class="a-dash" cx="100" cy="80" rx="82" ry="50" fill="none" stroke="#56e4ff66" stroke-width="1.5"/><circle cx="100" cy="80" r="22" fill="#2b6bff"/><path d="M84 72q8-8 18-2t6 14q-10 6-20 0z" fill="#3fd18a" opacity=".85"/><g class="a-orbit"><g transform="translate(100,80)"><ellipse rx="82" ry="50" fill="none"/></g><circle cx="182" cy="80" r="6" fill="#ffd479"/><rect x="168" y="78" width="10" height="4" fill="#56e4ff"/></g><text x="100" y="152" text-anchor="middle">falling, and always missing the ground</text></svg>`,
 orbit2:`<svg viewBox="0 0 200 160" role="img" aria-label="Two satellites orbiting Earth"><circle cx="100" cy="80" r="62" fill="none" class="a-dash" stroke="#ac8bff66"/><circle cx="100" cy="80" r="40" fill="none" class="a-dash" stroke="#56e4ff66"/><circle cx="100" cy="80" r="22" fill="#2b6bff"/><path d="M84 72q8-8 18-2t6 14q-10 6-20 0z" fill="#3fd18a" opacity=".85"/><g class="a-orbit2"><circle cx="140" cy="80" r="5" fill="#56e4ff"/></g><g class="a-orbit"><circle cx="162" cy="80" r="5" fill="#ffd479"/></g><text x="100" y="152" text-anchor="middle">lower orbit = faster lap</text></svg>`,
 led:`<svg viewBox="0 0 200 160" role="img" aria-label="Blinking LED"><path class="a-dash" d="M20 100H70M130 100H180" stroke="#56e4ff" stroke-width="2" fill="none"/><rect x="70" y="90" width="12" height="20" fill="#a0aec5"/><circle class="a-led" cx="110" cy="70" r="22" fill="#ffd479"/><path d="M96 92v10m28-10v10" stroke="#a0aec5" stroke-width="3"/><text x="100" y="146" text-anchor="middle">HIGH, wait, LOW, wait, repeat</text></svg>`,
 pwm:`<svg viewBox="0 0 200 160" role="img" aria-label="PWM square wave"><path class="a-pwm" d="M10 110h20V50h30v60h20V50h30v60h20V50h30v60h20" fill="none" stroke="#56e4ff" stroke-width="3"/><text x="100" y="140" text-anchor="middle">more ON time = brighter / faster</text></svg>`,
 loop:`<svg viewBox="0 0 200 160" role="img" aria-label="A loop repeating"><g class="a-loop"><path d="M100 30a50 50 0 1 1-35 14" fill="none" stroke="#5ef0b8" stroke-width="5" stroke-linecap="round"/><path d="M58 28l8 20 18-12z" fill="#5ef0b8"/></g><text x="100" y="152" text-anchor="middle">read, decide, act, repeat</text></svg>`,
 ping:`<svg viewBox="0 0 200 160" role="img" aria-label="A signal spreading out"><circle class="a-ping" cx="100" cy="80" r="26" fill="none" stroke="#56e4ff" stroke-width="2"/><circle class="a-ping" style="animation-delay:.6s" cx="100" cy="80" r="26" fill="none" stroke="#ac8bff" stroke-width="2"/><circle class="a-ping" style="animation-delay:1.2s" cx="100" cy="80" r="26" fill="none" stroke="#ffd479" stroke-width="2"/><circle cx="100" cy="80" r="9" fill="#56e4ff"/><text x="100" y="152" text-anchor="middle">signal out, answer back</text></svg>`,
 bounce:`<svg viewBox="0 0 200 160" role="img" aria-label="A value being stored"><rect x="70" y="86" width="60" height="44" rx="8" fill="#0f1c4a" stroke="#56e4ff" stroke-width="2"/><g class="a-bounce"><rect x="88" y="52" width="24" height="24" rx="6" fill="#ffd479"/></g><text x="100" y="116" text-anchor="middle" style="fill:#56e4ff">name</text><text x="100" y="150" text-anchor="middle">a labelled box for a value</text></svg>`};
function esc(s){return String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]))}
function gdHTML(d,lang){
  const i=lang==="ar"?1:0;let h='<div class="gd" data-gd="1">';
  if(d.anim&&ANIM[d.anim])h+='<div class="gd-anim">'+ANIM[d.anim]+'</div>';
  ["why","mist","tryit","fun"].forEach(k=>{
    if(!d[k])return;const l=LBL[k];
    h+='<div class="gd-row gd-'+(k==="tryit"?"try":k)+'"><i aria-hidden="true">'+l.i+'</i><div><b>'+l[lang]+'</b><p>'+esc(d[k][i])+'</p></div></div>';
  });
  if(d.q){
    h+='<div class="gd-row gd-q gd-try"><i aria-hidden="true">🎯</i><div><b>'+(lang==="ar"?"اختبر نفسك":"Quick check")+'</b><p>'+esc(d.q[i])+'</p><button type="button">'+(lang==="ar"?"أظهر الإجابة":"Show answer")+'</button><p class="ans">'+esc(d.q[i+2])+'</p></div></div>';
  }
  return h+"</div>";
}
let DATA=null;
function enrich(){
  if(!window.GD_DATA||typeof slug!=="function")return;
  if(!DATA){DATA={};Object.keys(GD_DATA).forEach(t=>{DATA[slug(t)]=GD_DATA[t]})}
  const lang=(typeof LANG!=="undefined"&&LANG)||"en";
  $$(".lesson").forEach(el=>{
    const d=DATA[el.id];if(!d)return;
    const body=$(".l-body",el);if(!body)return;
    const have=$(".gd",body);
    if(have&&have.dataset.lang===lang)return;
    if(have)have.remove();
    body.insertAdjacentHTML("beforeend",gdHTML(d,lang));
    const g=$(".gd",body);g.dataset.lang=lang;
    const btn=$(".gd-q button",g);
    if(btn)btn.addEventListener("click",()=>{const r=btn.closest(".gd-q");r.classList.toggle("shown");btn.textContent=r.classList.contains("shown")?(lang==="ar"?"أخفِ":"Hide"):(lang==="ar"?"أظهر الإجابة":"Show answer")});
  });
}
let to=null;
function schedule(){clearTimeout(to);to=setTimeout(()=>{enrich();decorateHero()},40)}
new MutationObserver(schedule).observe(document.querySelector("main")||document.body,{childList:true,subtree:true});
addEventListener("areachange",schedule);addEventListener("load",schedule);schedule();
})();
