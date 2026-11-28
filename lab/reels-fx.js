"use strict";
/* Mission Lab Reels FX: cinematic layer. Particle galaxy + parallax stars on one canvas behind the scenes,
   camera moves per narrated beat, word-by-word captions, scene sparkle/orbit decorations, livelier Najm.
   Wraps the reels.js hooks (rlBeat, rlGo, rlScenes, rlStatic, rlClose); no media files. */
(function(){
if(typeof RL==="undefined"||typeof rlBeat!=="function")return;
const TINT={space:[255,210,130],robotics:[255,150,90],python:[110,240,170],ai:[175,140,255]};
const ZOOMS=[1,1.5,.85,1.25];
const FX={cv:null,cx:null,w:0,h:0,dpr:1,cx0:0,cy0:0,stars:[],gal:[],zoom:1,zt:1,rot:0,kick:0,raf:0,last:0,tint:TINT.space,comet:null,run:false,ring:null,sty:0};
const small=()=>innerWidth<520;
function rnd(a,b){return a+Math.random()*(b-a)}
function seed(){
 FX.stars=Array.from({length:small()?90:150},()=>({x:Math.random(),y:Math.random(),z:rnd(.2,1),p:rnd(0,6.28),s:rnd(.6,2)}));
 const n=small()?520:760;FX.gal=[];
 for(let i=0;i<n;i++){const arm=i%2,r=Math.pow(Math.random(),.7),th=arm*Math.PI+r*5.2+rnd(-.28,.28)*(.4+r);
  FX.gal.push({r,th,s:rnd(.7,1.9),b:rnd(.4,1),w:rnd(0,6.28)})}
}
function size(){
 const wr=RL.els.wrap,sg=wr.querySelector(".rl-stage");if(!sg)return;
 const a=wr.getBoundingClientRect(),b=sg.getBoundingClientRect();
 FX.dpr=Math.min(devicePixelRatio||1,2);FX.w=a.width;FX.h=a.height;
 FX.cv.width=Math.round(a.width*FX.dpr);FX.cv.height=Math.round(a.height*FX.dpr);
 FX.cx0=a.width/2;FX.cy0=(b.top-a.top)+b.height*.5;
}
function init(){
 if(FX.cv)return;
 const cv=document.createElement("canvas");cv.className="rl-fx";cv.setAttribute("aria-hidden","true");
 RL.els.wrap.insertBefore(cv,RL.els.wrap.firstChild);
 FX.cv=cv;FX.cx=cv.getContext("2d");
 const ring=document.createElement("div");ring.className="rl-ring";RL.els.wrap.appendChild(ring);FX.ring=ring;
 const gr=document.createElement("div");gr.className="rl-grade";gr.setAttribute("aria-hidden","true");RL.els.wrap.appendChild(gr);
 const gn=document.createElement("div");gn.className="rl-grain";gn.setAttribute("aria-hidden","true");
 try{const nc=document.createElement("canvas");nc.width=nc.height=96;const g=nc.getContext("2d"),im=g.createImageData(96,96);for(let i=0;i<im.data.length;i+=4){const v=Math.random()*255;im.data[i]=im.data[i+1]=im.data[i+2]=v;im.data[i+3]=255}g.putImageData(im,0,0);gn.style.backgroundImage="url("+nc.toDataURL()+")"}catch(e){}
 RL.els.wrap.appendChild(gn);
 seed();size();
 addEventListener("resize",()=>{if(RL.open)size()});
}
function frame(ts){
 FX.raf=0;
 if(!RL.open)return;
 const rm=RL_RM.matches;
 if(!rm&&(document.hidden||RL.paused)){FX.last=0;FX.raf=requestAnimationFrame(frame);return}
 const dt=FX.last?Math.min((ts-FX.last)/1000,.05):.016;FX.last=ts;
 draw(rm?0:dt,ts/1000);
 if(!rm)FX.raf=requestAnimationFrame(frame);
}
function draw(dt,t){
 const c=FX.cx,W=FX.w,H=FX.h,D=FX.dpr,T=FX.tint;
 c.setTransform(D,0,0,D,0,0);c.globalCompositeOperation="source-over";
 c.fillStyle="#02030a";c.fillRect(0,0,W,H);
 FX.zoom+=(FX.zt-FX.zoom)*Math.min(1,dt*1.6);
 FX.kick*=Math.pow(.0008,dt);
 FX.rot+=dt*.12;
 /* nebula */
 const nb=(x,y,r,a)=>{const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(${T[0]},${T[1]},${T[2]},${a})`);g.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2)};
 nb(W*(.3+.06*Math.sin(t*.12)),H*.3,W*.75,.1);nb(W*(.75+.05*Math.cos(t*.1)),H*.75,W*.85,.08);
 c.save();const nc=(x,y,r,rgb,a)=>{const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(${rgb},${a})`);g.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2)};
 nc(W*.85,H*.18,W*.7,"30,70,200",.1);nc(W*.1,H*.85,W*.7,"120,40,160",.08);c.restore();
 /* stars: three parallax depths, streak on swipe */
 c.fillStyle="#fff";c.strokeStyle="#fff";
 for(const s of FX.stars){
  s.y+=dt*(.006+.02*s.z)*(1+FX.kick*8);if(s.y>1.02)s.y=-.02;
  const x=s.x*W,y=s.y*H,a=(.35+.65*Math.abs(Math.sin(t*s.s+s.p)))*s.z;
  c.globalAlpha=a;
  if(FX.kick>.5&&s.z>.55){c.lineWidth=s.z*1.2;c.beginPath();c.moveTo(x,y);c.lineTo(x,y-FX.kick*14*s.z);c.stroke()}
  else c.fillRect(x,y,s.z*1.9,s.z*1.9);
 }
 /* galaxy */
 const R=Math.min(W*1.15,H*.8)*.5*FX.zoom,gx=FX.cx0,gy=FX.cy0,tilt=.5,cr=FX.rot,cs=Math.cos(.35),sn=Math.sin(.35);
 c.globalCompositeOperation="lighter";
 const g=c.createRadialGradient(gx,gy,0,gx,gy,R*.5);
 g.addColorStop(0,"rgba(255,244,214,.75)");g.addColorStop(.25,`rgba(${T[0]},${T[1]},${T[2]},.28)`);g.addColorStop(1,"rgba(0,0,0,0)");
 c.globalAlpha=.14;c.fillStyle=g;c.fillRect(gx-R,gy-R,R*2,R*2);
 for(const p of FX.gal){
  const th=p.th+cr/(.25+p.r),rr=p.r*R,px=Math.cos(th)*rr,py=Math.sin(th)*rr*tilt;
  const x=gx+px*cs-py*sn,y=gy+px*sn+py*cs;
  const core=p.r<.28;
  c.globalAlpha=.2*p.b*(.55+.45*Math.abs(Math.sin(t*.9+p.w)))*(1-p.r*.4);
  c.fillStyle=core?"#fff2d0":`rgb(${T[0]},${T[1]},${T[2]})`;
  c.fillRect(x,y,p.s*(core?1.1:1.25),p.s*(core?1.1:1.25));
 }
 /* comet */
 if(!FX.comet&&dt&&Math.random()<dt*.25)FX.comet={x:rnd(.3,1.1)*W,y:rnd(-.05,.3)*H,v:rnd(260,420),l:0};
 if(FX.comet){const k=FX.comet;k.x-=k.v*dt;k.y+=k.v*dt*.55;k.l+=dt;
  const gr=c.createLinearGradient(k.x,k.y,k.x+90,k.y-50);gr.addColorStop(0,"rgba(255,255,255,.95)");gr.addColorStop(1,"rgba(255,255,255,0)");
  c.globalAlpha=1;c.strokeStyle=gr;c.lineWidth=2;c.beginPath();c.moveTo(k.x,k.y);c.lineTo(k.x+90,k.y-50);c.stroke();
  if(k.x<-100||k.y>H+60)FX.comet=null}
 c.globalAlpha=1;c.globalCompositeOperation="source-over";
}
function start(){
 init();size();
 const tr=REELS[RL.idx]&&REELS[RL.idx].track;FX.tint=TINT[tr]||TINT.space;
 
 if(!FX.raf){FX.last=0;FX.raf=requestAnimationFrame(frame)}
}
/* ---- helpers ---- */
const E=s=>String(s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
function restart(el,cls){el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls)}
function decorate(box){
 const sv=box.querySelector("svg");if(!sv||sv.querySelector(".rs-fx"))return;
 const vb=(sv.getAttribute("viewBox")||"0 0 300 190").split(/\s+/).map(Number),W=vb[2],H=vb[3],cx=vb[0]+W/2,cy=vb[1]+H/2;
 const col=`rgb(${FX.tint})`;
 let s=`<g class="rs-fx" pointer-events="none"><ellipse class="fx-spin" cx="${cx}" cy="${cy}" rx="${W*.46}" ry="${H*.44}" fill="none" stroke="${col}" stroke-opacity=".22" stroke-width="1.6" stroke-dasharray="2 9" stroke-linecap="round"/>`+
 `<ellipse class="fx-spinrev" cx="${cx}" cy="${cy}" rx="${W*.34}" ry="${H*.3}" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="1.2" stroke-dasharray="1 7" stroke-linecap="round"/>`;
 for(let i=0;i<5;i++){const rx=W*(.3+i*.045),ry=H*(.25+i*.04),du=7+i*2.3;
  s+=`<circle r="${i%2?1.6:2.4}" fill="${i%2?"#fff":col}" opacity=".8"><animateMotion dur="${du}s" begin="-${(i*1.7).toFixed(1)}s" repeatCount="indefinite" path="M${cx+rx},${cy} a${rx},${ry} 0 1,${i%2} ${-2*rx},0 a${rx},${ry} 0 1,${i%2} ${2*rx},0"/></circle>`}
 for(let i=0;i<9;i++){const x=vb[0]+W*rnd(.04,.96),y=vb[1]+H*rnd(.04,.96),z=rnd(2.5,5);
  s+=`<path class="fx-tw" style="animation-delay:-${(i*.47).toFixed(2)}s;animation-duration:${(1.8+i%4*.5).toFixed(1)}s" d="M${x},${y-z} Q${x},${y} ${x+z},${y} Q${x},${y} ${x},${y+z} Q${x},${y} ${x-z},${y} Q${x},${y} ${x},${y-z}Z" fill="#fff"/>`}
 s+="</g>";
 sv.insertAdjacentHTML("afterbegin",s);
 if(RL_RM.matches)return;
 const kids=[...sv.children].filter(k=>!k.classList.contains("rs-fx")&&k.tagName!=="defs").slice(0,18);
 kids.forEach((k,i)=>{k.style.translate="0 22px";k.style.transition="translate .7s cubic-bezier(.2,1.5,.4,1) "+(i*.06).toFixed(2)+"s"});
 requestAnimationFrame(()=>requestAnimationFrame(()=>kids.forEach(k=>{k.style.translate="0 0"})));
}
function wordsCap(){
 const el=RL.els.cap,tx=el.textContent;el.textContent="";
 tx.split(/\s+/).filter(Boolean).forEach((w,i,a)=>{const sp=document.createElement("span");sp.className="rl-w";sp.style.animationDelay=(i*Math.min(.09,1.3/a.length)).toFixed(2)+"s";sp.textContent=w;el.appendChild(sp);if(i<a.length-1)el.appendChild(document.createTextNode(" "))});
}
/* ---- wrappers ---- */
const oBeat=rlBeat,oGo=rlGo,oScenes=rlScenes,oClose=rlClose;
window.rlBeat=rlBeat=function(n){
 oBeat(n);
 if(RL_RM.matches||!FX.cv)return;
 wordsCap();
 const box=RL.els.reels[RL.idx]&&RL.els.reels[RL.idx].querySelector(".rl-scene");
 if(box){box.style.setProperty("--bd",(Math.max(RL.dur,3.5)+1.2).toFixed(1)+"s");void box.offsetWidth}
 FX.zt=1;FX.kick=.5;
 restart(FX.ring,"go");restart(RL.els.najm,"hop");
};
window.rlScenes=rlScenes=function(i){
 oScenes(i);
 const box=RL.els.reels[i]&&RL.els.reels[i].querySelector(".rl-scene");
 if(box&&FX.cv)decorate(box);
};
window.rlGo=rlGo=function(i){
 init();
 const prev=RL.idx;
 FX.tint=TINT[(REELS[Math.max(0,Math.min(REELS.length-1,i))]||{}).track]||TINT.space;
 
 oGo(i);
 FX.zoom=.55;FX.zt=1;if(RL.idx!==prev)FX.kick=1.6;
 start();
 if(RL_RM.matches){size();draw(0,0)}
};
window.rlClose=rlClose=function(){oClose();cancelAnimationFrame(FX.raf);FX.raf=0};
})();
