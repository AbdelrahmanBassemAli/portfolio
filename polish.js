/* Site polish: progress bar, aurora cursor, El-Rayeq easter egg. Vanilla, no deps. */
(function(){
"use strict";
var REDUCE=matchMedia("(prefers-reduced-motion:reduce)").matches;

/* scroll progress */
var bar=document.createElement("div");bar.className="pls-bar";bar.setAttribute("aria-hidden","true");
document.body.appendChild(bar);
var ticking=false;
function prog(){
 ticking=false;
 var h=document.documentElement,max=h.scrollHeight-h.clientHeight;
 bar.style.width=(max>0?(h.scrollTop/max)*100:0)+"%";
}
addEventListener("scroll",function(){if(!ticking){ticking=true;requestAnimationFrame(prog)}},{passive:true});
addEventListener("resize",prog,{passive:true});prog();

/* day/night sync for the glow */
var mm=new MutationObserver(function(){
 document.body.classList.toggle("pls-day",document.documentElement.dataset.theme==="day"||document.body.classList.contains("day")||document.documentElement.classList.contains("day"));
});
mm.observe(document.documentElement,{attributes:true,attributeFilter:["data-theme","class"]});
mm.observe(document.body,{attributes:true,attributeFilter:["class"]});

/* aurora cursor glow */
if(!REDUCE&&matchMedia("(pointer:fine)").matches){
 var g=document.createElement("div");g.className="pls-glow";g.setAttribute("aria-hidden","true");
 document.body.appendChild(g);
 var tx=innerWidth/2,ty=innerHeight/3,x=tx,y=ty,seen=false;
 g.style.opacity="0";
 addEventListener("pointermove",function(e){
  tx=e.clientX;ty=e.clientY;
  if(!seen){seen=true;g.style.opacity=""}
 },{passive:true});
 (function loop(){
  x+=(tx-x)*.08;y+=(ty-y)*.08;
  g.style.transform="translate("+(x-260)+"px,"+(y-260)+"px)";
  requestAnimationFrame(loop);
 })();
}

/* easter egg: type "rayeq" anywhere -> El-Rayeq waves + confetti */
var buf="";
addEventListener("keydown",function(e){
 if(e.target&&/INPUT|TEXTAREA/.test(e.target.tagName))return;
 buf=(buf+e.key).toLowerCase().slice(-6);
 if(buf.indexOf("rayeq")>=0){
  buf="";
  var w=document.querySelector(".rayeq-wrap");
  if(w){w.dataset.wave="1";setTimeout(function(){delete w.dataset.wave},3200)}
  /* reuse the mascot's confetti canvas style: light burst */
  var c=document.createElement("canvas");c.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:70";
  c.width=innerWidth;c.height=innerHeight;document.body.appendChild(c);
  var cx=c.getContext("2d"),cols=["#ce1126","#e8a94d","#56e4ff","#ffffff","#7dffb0"],ps=[],t0=performance.now();
  for(var i=0;i<70;i++)ps.push({x:90,y:innerHeight-90,vx:Math.random()*10-2,vy:-Math.random()*10-4,g:.2,r:Math.random()*4+2,c:cols[i%5],a:Math.random()*6.28,va:(Math.random()-.5)*.3});
  (function fr(t){cx.clearRect(0,0,c.width,c.height);
   ps.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.a+=p.va;
    cx.save();cx.translate(p.x,p.y);cx.rotate(p.a);cx.fillStyle=p.c;cx.fillRect(-p.r,-p.r/2,p.r*2,p.r);cx.restore();});
   if(t-t0<1700)requestAnimationFrame(fr);else c.remove();})(t0);
 }
});
})();
