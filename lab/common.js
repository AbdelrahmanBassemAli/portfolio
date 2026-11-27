"use strict";
/* Shared helpers for the Space / AI / Listen modules */
window.EXT_RENDER=[];
window.CHIPSX={home:CHIPS,robotics:CHIPS,space:{en:[],ar:[]},ai:{en:[],ar:[]}};
Object.assign(STR.en,{subtitle:"Robotics, orbits & space, and AI in Python — with NOVA, your AI teacher. English & العربية",
 areaRobotics:"Robotics",areaSpace:"Orbits & Space",areaAi:"AI in Python",listenOpen:"Listen mode"});
Object.assign(STR.ar,{subtitle:"الروبوتكس، المدارات والفضاء، والذكاء الاصطناعي بالبايثون — مع نوفا معلّمك الذكي. بالعربي وEnglish",
 areaRobotics:"الروبوتكس",areaSpace:"المدارات والفضاء",areaAi:"الذكاء الاصطناعي",listenOpen:"وضع الاستماع"});

let curArea="home";
function setArea(a,noHash){
  if(!["home","robotics","space","ai"].includes(a))a="robotics";
  curArea=a;
  document.querySelectorAll(".area").forEach(x=>x.classList.toggle("on",x.id==="area-"+a));
  document.querySelectorAll(".areas button").forEach(b=>{const on=b.dataset.area===a;b.classList.toggle("on",on);b.setAttribute("aria-selected",String(on))});
  if(!noHash)window.history.replaceState(null,"","#"+a);
  renderChips2();
  window.dispatchEvent(new Event("areachange"));
}
document.querySelectorAll(".areas button").forEach(b=>b.addEventListener("click",()=>setArea(b.dataset.area)));
{const h=(location.hash||"").slice(1);if(["home","robotics","space","ai"].includes(h))curArea=h}
document.querySelectorAll(".area").forEach(x=>x.classList.toggle("on",x.id==="area-"+curArea));
document.querySelectorAll(".areas button").forEach(b=>b.classList.toggle("on",b.dataset.area===curArea));

/* accordion: items [{en:{title,tag,body,cap},ar:{...},code?}] */
function slug(s){return 'c-'+s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,40)}
function accHTML(items,openIdx){
  return items.map((L,i)=>{
    const d=L[LANG];
    return `<div class="lesson${i===openIdx?" open":""}" id="${slug(L.en.title)}">
      <button type="button" aria-expanded="${i===openIdx}">
        <span class="l-num">${i+1}</span>
        <span><span class="l-title">${d.title}</span><span class="l-tag">${d.tag||""}</span></span>
        <span class="l-arrow">▾</span>
      </button>
      <div class="l-body">${L.img&&typeof PHOTOS!=="undefined"&&PHOTOS[L.img]?`<figure class="l-fig"><img loading="lazy" src="${PHOTOS[L.img].src}" alt="${PHOTOS[L.img].cap[LANG]}"><figcaption>${PHOTOS[L.img].cap[LANG]} · <a href="${PHOTOS[L.img].page}" target="_blank" rel="noopener">${PHOTOS[L.img].by}, ${PHOTOS[L.img].lic}</a></figcaption></figure>`:""}${L.dg&&typeof DIAG!=="undefined"&&DIAG[L.dg]?`<figure class="l-fig dg">${DIAG[L.dg](LANG)}</figure>`:""}<p>${d.body}</p>${L.code?`<pre class="l-code"><code>${hi(L.code)}</code></pre>`:""}${d.cap?`<span class="l-cap">${d.cap}</span>`:""}<button type="button" class="l-done" data-k="${L.en.title.replace(/"/g,"&quot;")}"></button></div>
    </div>`;}).join("");
}
function accBind(root){
  root.querySelectorAll(".lesson>button").forEach(b=>b.addEventListener("click",()=>{
    const l=b.parentElement,open=l.classList.contains("open");
    root.querySelectorAll(".lesson").forEach(x=>{x.classList.remove("open");x.firstElementChild.setAttribute("aria-expanded","false")});
    if(!open){l.classList.add("open");b.setAttribute("aria-expanded","true")}
  }));
}
function mountAcc(el,items,openIdx){el.innerHTML=accHTML(items,openIdx);accBind(el)}
/* canvas helper: crisp on retina, returns ctx and logical size */
function fitCanvas(c,w,h){
  const dpr=Math.min(window.devicePixelRatio||1,2);
  c.width=w*dpr;c.height=h*dpr;const x=c.getContext("2d");x.setTransform(dpr,0,0,dpr,0,0);return x;
}
function canvasPt(c,e,w,h){
  const r=c.getBoundingClientRect();return {x:(e.clientX-r.left)*w/r.width,y:(e.clientY-r.top)*h/r.height};
}
