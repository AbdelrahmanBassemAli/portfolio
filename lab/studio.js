"use strict";
/* Mission Lab STUDIO v22: hero canvas, area accents, count-ups, code copy, quiz celebrations.
   Additive, no dependencies, honors prefers-reduced-motion. */
(function(){
const RM=matchMedia("(prefers-reduced-motion: reduce)");
const $=(s,r)=>(r||document).querySelector(s),$$=(s,r)=>[...(r||document).querySelectorAll(s)];
const isAr=()=>typeof LANG!=="undefined"&&LANG==="ar";

/* ---------- per-area accent ---------- */
function setAcc(){document.body.dataset.area=(typeof curArea!=="undefined"&&curArea)||"home"}
addEventListener("areachange",setAcc);

/* ---------- hero: orbital particle canvas ---------- */
function heroFx(){
 const cv=$(".hero-cv");if(!cv||cv._init)return;cv._init=1;
 const c=cv.getContext("2d");
 let W=0,H=0,dpr=1,on=true;
 const N=innerWidth<520?26:44;
 const stars=Array.from({length:N},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.4+.4,p:Math.random()*6.28,s:.4+Math.random()}));
 const rings=[
  {rx:.30,ry:.115,n:2,col:"#56e4ff",sp:.17,ph:0},
  {rx:.42,ry:.175,n:3,col:"#ac8bff",sp:-.11,ph:2.1},
  {rx:.54,ry:.235,n:2,col:"#ffd479",sp:.075,ph:4.2}];
 function size(){const r=cv.parentElement.getBoundingClientRect();if(!r.width||!r.height)return;
  dpr=Math.min(devicePixelRatio||1,2);W=r.width;H=r.height;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr)}
 function draw(t){
  if(!W)return;
  c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,W,H);
  const cx=W/2,cy=H*.46,R=Math.min(W,H*2.6);
  for(const s of stars){c.globalAlpha=.18+.42*Math.abs(Math.sin(t*s.s+s.p));c.fillStyle="#cfe4ff";c.fillRect(s.x*W,s.y*H,s.r,s.r)}
  for(const g of rings){
   const rx=g.rx*R,ry=g.ry*R;
   c.beginPath();c.ellipse(cx,cy,rx,ry,0,0,6.2832);c.globalAlpha=.13;c.strokeStyle=g.col;c.lineWidth=1;c.stroke();
   for(let k=0;k<g.n;k++){
    const a=t*g.sp+g.ph+k*6.2832/g.n;
    for(let j=13;j>=1;j--){const a2=a-j*.035*Math.sign(g.sp);c.globalAlpha=.26*(1-j/14);c.fillStyle=g.col;
     c.beginPath();c.arc(cx+Math.cos(a2)*rx,cy+Math.sin(a2)*ry,1.7*(1-j/16),0,6.2832);c.fill()}
    const x=cx+Math.cos(a)*rx,y=cy+Math.sin(a)*ry;
    c.globalAlpha=.28;c.fillStyle=g.col;c.beginPath();c.arc(x,y,5.5,0,6.2832);c.fill();
    c.globalAlpha=1;c.fillStyle="#fff";c.beginPath();c.arc(x,y,2.1,0,6.2832);c.fill();
   }
  }
  const g2=c.createRadialGradient(cx,cy,0,cx,cy,R*.2);g2.addColorStop(0,"rgba(120,190,255,.14)");g2.addColorStop(1,"rgba(0,0,0,0)");
  c.globalAlpha=1;c.fillStyle=g2;c.fillRect(cx-R*.2,cy-R*.2,R*.4,R*.4);
 }
 size();addEventListener("resize",size);
 if(RM.matches){draw(3);return}
 new IntersectionObserver(es=>{on=es[0].isIntersecting}).observe(cv);
 let t0=0;
 (function loop(ts){
  if(!cv.isConnected)return;
  if(on&&!document.hidden)draw((ts-(t0||(t0=ts)))/1000);
  requestAnimationFrame(loop);
 })(performance.now());
}

/* ---------- hero stat count-up ---------- */
function countUp(){
 $$(".hero-stats b[data-cv]").forEach(b=>{
  if(b._done)return;b._done=1;
  const v=+b.dataset.cv;
  if(RM.matches){b.textContent=v;return}
  const t0=performance.now(),d=1000;
  (function f(ts){const p=Math.min(1,(ts-t0)/d),e=1-Math.pow(1-p,3);
   b.textContent=Math.round(v*e);if(p<1)requestAnimationFrame(f)})(t0);
 });
}

/* ---------- copy buttons on code blocks ---------- */
function codeCopy(){
 $$("pre.l-code").forEach(pre=>{
  if(pre.querySelector(".code-copy"))return;
  const b=document.createElement("button");b.type="button";b.className="code-copy";
  b.textContent=isAr()?"نسخ":"Copy";
  b.addEventListener("click",()=>{
   const code=pre.querySelector("code");if(!code)return;
   const done=()=>{b.classList.add("ok");b.textContent=isAr()?"اتنسخ ✓":"Copied ✓";
    setTimeout(()=>{b.classList.remove("ok");b.textContent=isAr()?"نسخ":"Copy"},1300)};
   if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(code.innerText).then(done,done);
   else{const ta=document.createElement("textarea");ta.value=code.innerText;document.body.appendChild(ta);ta.select();try{document.execCommand("copy")}catch(e){}ta.remove();done()}
  });
  pre.appendChild(b);
 });
}

/* ---------- quiz celebrations ---------- */
function burst(host){
 if(RM.matches)return;
 const r=host.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+Math.min(r.height*.3,140);
 const cols=["#56e4ff","#ac8bff","#ffd479","#5ef0b8","#ff7ab6"];
 for(let i=0;i<26;i++){
  const d=document.createElement("i");d.className="g-confetti";
  d.style.cssText="left:"+cx+"px;top:"+cy+"px;background:"+cols[i%5]+";--dx:"+((Math.random()*2-1)*190).toFixed(0)+"px;--dy:"+(60+Math.random()*210).toFixed(0)+"px;--rot:"+(Math.random()*540-270).toFixed(0)+"deg";
  document.body.appendChild(d);setTimeout(()=>d.remove(),1600);
 }
}
function quizEnd(root){
 const sc=root.querySelector(".q-score");
 if(!sc||sc._done)return;
 const s=parseInt(sc.textContent,10),m=(sc.textContent.match(/\/\s*(\d+)/)||[])[1],n=+(m||5);
 sc._done=1;
 sc.style.setProperty("--p",(isNaN(s)?0:s/n*100).toFixed(1));
 sc.classList.add("pop");
 if(!isNaN(s)&&s/n>=.8)setTimeout(()=>burst(root),350);
}
function quizWatch(){
 $$(".quiz").forEach(root=>{
  if(root._w)return;root._w=1;
  quizEnd(root);
  new MutationObserver(()=>quizEnd(root)).observe(root,{childList:true});
 });
}

/* ---------- run + re-run after each render ---------- */
function all(){setAcc();heroFx();countUp();codeCopy();quizWatch()}
(window.EXT_RENDER=window.EXT_RENDER||[]).push(all);
all();
})();
