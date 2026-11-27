"use strict";
/* Motion layer: scroll reveals, area-switch transitions and small entrance
   animations. Everything is transform/opacity only, off under
   prefers-reduced-motion, and re-arms itself after every re-render. */
const RM=matchMedia("(prefers-reduced-motion: reduce)");
const RV_SEL=".panel,.area-card,.g-item,.lesson,.readouts div,.hero,.quiz-panel";
let rvIO=null;
function rvObserve(){
  if(RM.matches){document.querySelectorAll(".rv").forEach(el=>el.classList.add("in"));return}
  if(!rvIO){
    rvIO=new IntersectionObserver(es=>{
      es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");rvIO.unobserve(e.target)}});
    },{rootMargin:"0px 0px -8% 0px",threshold:.06});
  }
  document.querySelectorAll(RV_SEL).forEach(el=>{
    if(el.classList.contains("rv"))return;
    el.classList.add("rv");
    const r=el.getBoundingClientRect();
    if(r.top<innerHeight*.92&&r.bottom>0){requestAnimationFrame(()=>el.classList.add("in"))}
    else rvIO.observe(el);
  });
}
/* area switch: restart the entrance animation */
let lastArea="";
function areaAnim(){
  const a=document.querySelector(".area.on");
  if(!a)return;
  if(a.id!==lastArea){lastArea=a.id;a.classList.remove("sweep");void a.offsetWidth;a.classList.add("sweep")}
  rvObserve();
}
window.addEventListener("areachange",()=>setTimeout(areaAnim,10));
/* chat + lesson entrances get re-armed after language switches and re-renders */
EXT_RENDER.push(()=>setTimeout(rvObserve,30));
window.addEventListener("load",()=>setTimeout(rvObserve,60));
