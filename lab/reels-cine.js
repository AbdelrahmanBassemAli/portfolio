"use strict";
/* Mission Lab Reels CINE v20: the subject of every reel is drawn on a canvas as glowing particles
   (reference style: black space, particle formations, cinematic camera). Replaces the cartoon SVG scenes.
   Engine + helpers + orbit family. More scene kinds live in reels-cine2.js. No media files. */
(function(){
if(typeof RL==="undefined"||typeof RS==="undefined"||typeof REELS==="undefined")return;
const TAU=Math.PI*2,M=Math,sin=M.sin,cos=M.cos,PI=M.PI;
const CN=window.CN={sc:{},ini:{}};
const PAL={cy:[86,228,255],yl:[255,212,121],pk:[255,122,182],gr:[109,240,168],vi:[172,139,255],or:[255,154,86],bl:[58,166,255],wh:[244,248,255],rd:[255,95,95]};
const cc={};
const col=x=>{if(!x)return PAL.cy;if(Array.isArray(x))return x;if(PAL[x])return PAL[x];if(cc[x])return cc[x];
 const h=String(x).replace("#","");const r=[parseInt(h.slice(0,2),16)||0,parseInt(h.slice(2,4),16)||0,parseInt(h.slice(4,6),16)||0];return cc[x]=r};
const spr={};
function sp(rgb){const k=rgb.join();if(spr[k])return spr[k];const c=document.createElement("canvas");c.width=c.height=64;const g=c.getContext("2d"),r=g.createRadialGradient(32,32,0,32,32,32);
 r.addColorStop(0,"rgba(255,255,255,1)");r.addColorStop(.09,"rgba(255,255,255,.92)");r.addColorStop(.2,`rgba(${rgb},.8)`);r.addColorStop(.42,`rgba(${rgb},.2)`);r.addColorStop(.72,`rgba(${rgb},.05)`);r.addColorStop(1,`rgba(${rgb},0)`);g.fillStyle=r;g.fillRect(0,0,64,64);return spr[k]=c}
const ease=t=>t<0?0:t>1?1:t*t*(3-2*t);
const eo=t=>t<0?0:t>1?1:1-Math.pow(1-t,3);
const eb=t=>{if(t<=0)return 0;if(t>=1)return 1;const c=1.70158+1;return 1+c*Math.pow(t-1,3)+1.70158*Math.pow(t-1,2)};
const clamp=(v,a,b)=>v<a?a:v>b?b:v;
const lerp=(a,b,t)=>a+(b-a)*t;
function rng(seed){let a=seed>>>0||1;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
Object.assign(CN,{PAL,col,sp,ease,eo,eb,clamp,lerp,rng,TAU});

/* ---- drawing helpers (world units, additive) ---- */
CN.glow=(c,x,y,r,rgb,a)=>{c.globalAlpha=a<0?0:a>1?1:a;c.drawImage(sp(rgb),x-r,y-r,r*2,r*2)};
CN.dots=(c,pts,r,rgb,a)=>{const s=sp(rgb);for(const p of pts){c.globalAlpha=(p[2]==null?1:p[2])*a;c.drawImage(s,p[0]-r,p[1]-r,r*2,r*2)}};
/* dotted line from a to b with n dots */
CN.dline=(c,x1,y1,x2,y2,n,r,rgb,a,ph)=>{const s=sp(rgb);for(let i=0;i<n;i++){const u=(i+(ph||0))/n%1;c.globalAlpha=a;c.drawImage(s,x1+(x2-x1)*u-r,y1+(y2-y1)*u-r,r*2,r*2)}};
CN.line=(c,x1,y1,x2,y2,rgb,a,w)=>{c.globalAlpha=a;c.strokeStyle=`rgb(${rgb})`;c.lineWidth=w||.8;c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke()};
CN.circle=(c,x,y,r,n,sz,rgb,a,rot,sy)=>{const s=sp(rgb);for(let i=0;i<n;i++){const t=rot+i/n*TAU;c.globalAlpha=a;c.drawImage(s,x+cos(t)*r-sz,y+sin(t)*r*(sy||1)-sz,sz*2,sz*2)}};
/* particle disc / orb: glow + ring */
CN.orb=(c,x,y,r,rgb,a,t,spin)=>{CN.glow(c,x,y,r*2.4,rgb,a*.45);CN.glow(c,x,y,r*1.15,rgb,a*.35);CN.circle(c,x,y,r,Math.max(14,r*2.2|0),r*.07+.5,rgb,a,t*(spin||.6))};
/* text in screen space at world position */
CN.txt=(S,str,wx,wy,o)=>{o=o||{};const c=S.c,sx=o.abs?S.W/2+(o.dx||0):S.sx(wx)+(o.dx||0),sy=o.abs?S.H-(o.dy||0):S.sy(wy)+(o.dy||0),px=o.px||(o.sz||13)*S.k;
 c.save();c.setTransform(S.dpr,0,0,S.dpr,0,0);c.globalCompositeOperation="source-over";c.globalAlpha=(o.a==null?1:o.a)*S.fade;
 c.font=`${o.w||800} ${px}px ${o.mono?"ui-monospace,Menlo,Consolas,monospace":'"DM Sans",system-ui,sans-serif'}`;c.textAlign=o.al||"center";c.textBaseline=o.bl||"middle";
 const rgb=col(o.col||"wh");c.shadowColor=`rgba(${rgb},.9)`;c.shadowBlur=o.glow==null?10:o.glow;c.fillStyle=o.fill||"#fff";
 if(o.col&&!o.fill)c.fillStyle=`rgb(${rgb.map(v=>Math.round(v*.45+140))})`;
 c.fillText(rsL(str),sx,sy);c.restore()};
/* thin leader-line label like the reference */
CN.callout=(S,wx,wy,str,dx,dy,rgb,a)=>{const c=S.c,sx=S.sx(wx),sy=S.sy(wy),k=S.k;a=(a==null?1:a);
 c.save();c.setTransform(S.dpr,0,0,S.dpr,0,0);c.globalCompositeOperation="lighter";c.globalAlpha=.8*a*S.fade;c.strokeStyle=`rgb(${col(rgb)})`;c.lineWidth=1;
 c.beginPath();c.moveTo(sx,sy);c.lineTo(sx+dx*k,sy+dy*k);c.lineTo(sx+dx*k+(dx>=0?18:-18)*k,sy+dy*k);c.stroke();c.restore();
 CN.glow(c,wx,wy,3,col(rgb),.9*a);
 CN.txt(S,str,wx,wy,{dx:(dx+(dx>=0?22:-22))*k,dy:dy*k,al:dx>=0?"left":"right",sz:12,col:rgb,a:a,glow:6})};
/* caption (tag / sub) pinned to the bottom of the scene */
CN.cap=(S,str,y,sz,rgb)=>{if(!str)return;CN.txt(S,str,0,0,{abs:1,dy:y*S.k,sz:sz||15,col:rgb||"yl",glow:12})};

CN.trace=(S,fn,x0,x1,n,rgb,a,w)=>{const c=S.c,pts=[];for(let i=0;i<=n;i++){const x=x0+(x1-x0)*i/n;pts.push([x,fn(x,i)])}
 const path=()=>{c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]))};
 c.strokeStyle=`rgb(${rgb})`;c.lineJoin="round";
 c.globalAlpha=.16*a;c.lineWidth=(w||1.4)*4;path();c.stroke();c.globalAlpha=.95*a;c.lineWidth=w||1.4;path();c.stroke();
 const h=pts[pts.length-1];CN.glow(c,h[0],h[1],6,rgb,.95*a);return pts};
CN.rrect=(c,x,y,w,h,r)=>{c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()};
/* ---- 3D ---- */
CN.pr=(S,x,y,z)=>{const v=S.v,cy=cos(v.yaw),sy=sin(v.yaw),ct=cos(v.tilt),st=sin(v.tilt);
 const x1=x*cy+z*sy,z1=-x*sy+z*cy,y2=y*ct-z1*st,z2=y*st+z1*ct,k=520/(520-z2);return[x1*k,y2*k,z2,k]};
CN.kep=(a,e,M0)=>{let E=M0;for(let i=0;i<6;i++)E=M0+e*sin(E);return[a*(cos(E)-e),a*M.sqrt(1-e*e)*sin(E),E]};
/* position on an inclined orbit: orbital-plane coords (px,pz) rotated by inc around x then Om around y */
CN.o3=(px,pz,inc,Om)=>{const y=pz*sin(inc),z=pz*cos(inc),x=px;return[x*cos(Om)+z*sin(Om),y,-x*sin(Om)+z*cos(Om)]};

/* ---- the particle Earth ---- */
const EP=(()=>{const n=innerWidth<520?820:1300,o=[],ga=PI*(3-M.sqrt(5)),r=rng(7);
 for(let i=0;i<n;i++){const y=1-i/(n-1)*2,rr=M.sqrt(1-y*y),th=ga*i,lat=M.asin(y),lon=th%TAU;
  const L=sin(lon*1.7+1)*cos(lat*2.1)+sin(lon*3.1+lat*1.3)*.6+cos(lon*.9-2)*.5+cos(lat*3+lon*2)*.25;
  o.push({x:rr*cos(th),y:-y,z:rr*sin(th),land:L>.5,city:r()<.1})}
 return o})();
CN.earth=(S,cx,cy,R,rot,o)=>{o=o||{};const c=S.c,v=S.v,sun=o.sun||[-.7,-.25,.62],al=(o.a==null?1:o.a);
 const ca=cos(rot),sa=sin(rot),tilt=.41,ct=cos(tilt),st=sin(tilt);
 CN.glow(c,cx,cy,R*1.75,[40,110,255],.5*al);CN.glow(c,cx,cy,R*1.28,[90,170,255],.34*al);
 const dsz=R*.075+.5,so=sp(PAL.bl),sl=sp(PAL.gr),sc=sp([255,200,110]);
 for(const p of EP){
  let x=p.x*ca+p.z*sa,z=-p.x*sa+p.z*ca,y=p.y;
  const y2=y*ct-x*st,x2=y*st+x*ct;x=x2;y=y2;
  const lit=clamp(x*sun[0]+y*sun[1]+z*sun[2],-1,1),q=CN.pr(S,x*R,y*R,z*R),front=q[2]>0;
  const night=lit<0;let a;
  if(p.land){a=front?(.35+.65*clamp(lit+.25,0,1)):.07;c.globalAlpha=a*al;c.drawImage(night&&p.city&&front?sc:sl,cx+q[0]-dsz,cy+q[1]-dsz,dsz*2,dsz*2)}
  else{a=front?(.16+.7*clamp(lit+.2,0,1)):.04;c.globalAlpha=a*al;c.drawImage(so,cx+q[0]-dsz*.8,cy+q[1]-dsz*.8,dsz*1.6,dsz*1.6)}
 }
 {const sa=sp([150,205,255]),sb=sp([90,150,255]),n=150;
  for(let i=0;i<n;i++){const th=i/n*TAU,nx=cos(th),ny=sin(th),lit=clamp(nx*sun[0]+ny*sun[1]+.35,0,1.2),fl=.75+.25*sin(S.t*1.3+i*.7);
   c.globalAlpha=(.1+.55*lit)*fl*al;c.drawImage(sa,cx+nx*R*1.045-1.3,cy+ny*R*1.045-1.3,2.6,2.6);
   c.globalAlpha=(.04+.22*lit)*al;c.drawImage(sb,cx+nx*R*1.1-2.4,cy+ny*R*1.1-2.4,4.8,4.8)}
  const gx=cx+sun[0]*-R*.2,gy=cy+sun[1]*-R*.2;CN.glow(c,cx-sun[0]*R*1.04,cy-sun[1]*R*1.04,R*.5,[190,225,255],.16*al)}};
/* occlusion test: is a screen offset (relative to the globe centre) hidden behind the globe? */
const hid=(q,R)=>q[2]<0&&q[0]*q[0]+q[1]*q[1]<R*R*.9;

/* satellite icon: bright core + two panels */
CN.sat=(S,x,y,ang,sz,rgb,a)=>{const c=S.c;CN.glow(c,x,y,sz*2.8,rgb,.45*a);CN.glow(c,x,y,sz*.75,[255,255,255],.8*a);
 c.save();c.globalAlpha=.95*a;c.strokeStyle=`rgb(${rgb})`;c.lineWidth=sz*.55;c.lineCap="round";c.translate(x,y);c.rotate(ang);
 c.beginPath();c.moveTo(-sz*3.2,0);c.lineTo(-sz*1.2,0);c.moveTo(sz*1.2,0);c.lineTo(sz*3.2,0);c.stroke();
 c.lineWidth=sz*1.1;c.strokeStyle="#fff";c.beginPath();c.moveTo(-sz*.6,0);c.lineTo(sz*.6,0);c.stroke();c.restore()};

/* ================= ORBIT FAMILY ================= */
/* per-reel specs (picked by p.v, set in reels-data) */
const OSPEC={
 leo:{R:34,a:54,e:0,inc:[0,.95,1.9],n:3,T:5.5,lab:"160 - 2,000 km",tilt:.5,sat:1},
 meo:{R:21,a:70,e:0,inc:[.9,.9,.9,.9],Om:[0,1.57,3.14,4.7],n:4,T:11,lab:"~20,200 km  GPS",tilt:.55,beams:1},
 geo:{R:19,a:80,e:0,inc:[0],n:1,T:16,lab:"35,786 km",tilt:.5,geo:1},
 sso:{R:27,a:56,e:0,inc:[1.71],n:1,T:6,lab:"~98 deg",tilt:.45,sun:1},
 mol:{R:15,a:78,e:.72,inc:[1.1],n:1,T:12,lab:"63.4 deg   12 h",tilt:.6,om:-1.57},
 fall:{R:32,a:54,e:0,inc:[0],n:1,T:6.5,lab:"7.7 km/s",tilt:.55,arrows:1},
 kep1:{R:17,a:74,e:.5,inc:[.12],n:1,T:10,lab:"Earth at one focus",tilt:.8,foci:1},
 kep2:{R:15,a:74,e:.55,inc:[.1],n:1,T:10,lab:"equal areas",tilt:.85,wedge:1},
 hoh:{R:20,a:50,e:0,inc:[.08],n:1,T:6,tilt:.7,hoh:1},
 pass:{R:36,a:58,e:0,inc:[1.25],n:1,T:7,lab:"5 - 15 min",tilt:.4,gs:1},
 deb:{R:26,a:50,e:0,inc:[0],n:1,T:6,lab:"7 - 8 km/s",tilt:.5,deb:1}};
CN.ini.orbit=S=>{const s=OSPEC[S.p.v]||OSPEC.leo;S.o=s;S.v={yaw:0,tilt:s.tilt};S.st.yaw=S.p.v==="geo"?0:.3;
 if(s.deb){const r=rng(11);S.st.deb=Array.from({length:70},()=>({a:s.R*(1.4+r()*1.35),inc:r()*PI*.9,Om:r()*TAU,ph:r()*TAU,T:3.5+r()*6,s:.6+r()*.7}))}
 if(s.hoh)S.st.hl=0};
const orbPos=(s,k,Mm,a,e)=>{const m=CN.kep(a,e,Mm),om=s.om||0,px=m[0]*cos(om)-m[1]*sin(om),pz=m[0]*sin(om)+m[1]*cos(om);
 return CN.o3(px,pz,(s.inc[k%s.inc.length]),s.Om?s.Om[k%s.Om.length]:(k*2.1))};
CN.sc.orbit=S=>{
 const c=S.c,s=S.o,t=S.t,b=S.b,st=S.st,R=s.R;
 /* camera: wide -> follow the satellite -> pull back and tilt */
 const spd=.12+(b===2?.18:0);st.yaw+=S.dt*spd;
 S.v.yaw=st.yaw;S.v.tilt+=((b===2?s.tilt*.45:b===1?s.tilt*1.15:s.tilt)-S.v.tilt)*S.dt*1.2;
 const R3=[0,0];
 /* satellites */
 const cols=[PAL.cy,PAL.yl,PAL.pk,PAL.gr,PAL.or];
 const sats=[];
 const n=s.hoh?1:s.n;
 for(let k=0;k<n;k++){
  let a=s.a,e=s.e,Mm=t/s.T*TAU+k*TAU/n;
  if(s.geo)Mm=t/s.T*TAU;
  if(s.hoh){/* hohmann sequence */
   const a1=s.a,a2=s.a*1.95,at=(a1+a2)/2,et=(a2-a1)/(a2+a1),cyc=17,u=t%cyc;
   if(u<6){a=a1;e=0;Mm=u/s.T*TAU}
   else if(u<12){a=at;e=et;/* periapsis at angle 0: transfer ellipse starts where inner orbit ended */Mm=(u-6)/6*PI;
    st.hl=Math.max(st.hl,0)}
   else{a=a2;e=0;Mm=PI+(u-12)/5*PI}
  }
  const q0=orbPos(s,k,Mm,a,e);
  /* hohmann: inner orbit angle must match transfer start (angle 0) - rotate inner phase */
  sats.push({k,a,e,Mm,w:q0})
 }
 /* rotation of globe */
 const rot=s.geo?t/s.T*TAU:t*.16;
 /* ground sun */
 CN.earth(S,0,0,R,rot,{a:1});
 const R2=R;
 /* orbit paths */
 const pathAt=(a,e,k,u)=>CN.pr(S,...orbPos(s,k,u,a,e));
 const drawPath=(a,e,k,rgb,al,np)=>{const sps=sp(rgb);for(let i=0;i<np;i++){const q=pathAt(a,e,k,i/np*TAU);if(hid(q,R2*q[3]))continue;c.globalAlpha=al*(.45+.55*(q[2]+a)/(2*a+1));const r=1.1+1.1*q[3];c.drawImage(sps,q[0]-r,q[1]-r,r*2,r*2)}};
 const np=170;
 if(s.hoh){const a1=s.a,a2=s.a*1.95,et=(a2-a1)/(a2+a1),at=(a1+a2)/2;
  drawPath(a1,0,0,PAL.cy,.55,110);drawPath(a2,0,0,PAL.vi,.55,160);
  /* transfer half-ellipse only */
  {const sps=sp(PAL.or);for(let i=0;i<70;i++){const q=pathAt(at,et,0,i/70*PI);c.globalAlpha=.8*(.5+.5*sin(t*3+i*.2));c.drawImage(sps,q[0]-1.4,q[1]-1.4,2.8,2.8)}}
 }else{
  const nk=s.deb?0:(s.inc.length>1&&!s.Om?s.inc.length:(s.Om?s.Om.length:1));
  if(s.Om){for(let k=0;k<s.Om.length;k++)drawPath(s.a,s.e,k,PAL.vi,.4,np)}
  else if(s.inc.length>1){for(let k=0;k<s.inc.length;k++)drawPath(s.a,s.e,k,cols[k],.5,np)}
  else if(!s.deb)drawPath(s.a,s.e,0,PAL.cy,.65+(b===1?.2:0),np);
 }
 /* debris cloud */
 if(s.deb){const sps=sp(PAL.pk),sw=sp([210,220,255]);
  for(let i=0;i<st.deb.length;i++){const d=st.deb[i],pos=CN.o3(d.a*cos(t/d.T*TAU+d.ph),d.a*sin(t/d.T*TAU+d.ph),d.inc,d.Om),q=CN.pr(S,...pos);
   if(hid(q,R2*q[3]))continue;const tr=i<8;c.globalAlpha=tr?.95:.55;const r=(tr?2.2:1.1)*q[3];c.drawImage(tr?sps:sw,q[0]-r,q[1]-r,r*2,r*2);
   if(tr){c.globalAlpha=.7;c.strokeStyle="rgb(255,122,182)";c.lineWidth=.8;const z=5*q[3];c.strokeRect(q[0]-z,q[1]-z,z*2,z*2)}}
  const ang=t*1.3,rr=R2*3.2;c.globalAlpha=.25;c.strokeStyle="rgb(255,122,182)";c.lineWidth=1;c.beginPath();c.arc(0,0,rr*(.6+.4*((t*.5)%1)),0,TAU);c.stroke()}
 /* foci strings for kepler 1 */
 let focusXY=[0,0];
 for(const sa of sats){
  const q=CN.pr(S,...sa.w),qa=CN.pr(S,...orbPos(s,sa.k,sa.Mm+.04,sa.a,sa.e)),ang=M.atan2(qa[1]-q[1],qa[0]-q[0]);
  const occ=hid(q,R2*q[3]),al=occ?.25:1,rgb=s.geo?PAL.yl:cols[sa.k%cols.length];
  /* trail */
  const sps=sp(rgb);for(let j=1;j<30;j++){const qq=CN.pr(S,...orbPos(s,sa.k,sa.Mm-j*.045*(s.e?1:1),sa.a,sa.e));if(hid(qq,R2*qq[3]))continue;c.globalAlpha=(1-j/30)*.7;const r=(1.9-j*.04)*qq[3];c.drawImage(sps,qq[0]-r,qq[1]-r,r*2,r*2)}
  CN.sat(S,q[0],q[1],ang,2.3*q[3],rgb,al);
  if(sa.k===0)focusXY=[q[0],q[1]];
  if(s.arrows&&sa.k===0){/* velocity + gravity */
   const dx=qa[0]-q[0],dy=qa[1]-q[1],l=M.hypot(dx,dy)||1,ux=dx/l,uy=dy/l;
   c.globalAlpha=.9;c.strokeStyle="rgb(255,212,121)";c.lineWidth=1.4;c.beginPath();c.moveTo(q[0],q[1]);c.lineTo(q[0]+ux*30,q[1]+uy*30);c.stroke();
   c.strokeStyle="rgb(255,122,182)";const gl=M.hypot(q[0],q[1])||1;c.beginPath();c.moveTo(q[0],q[1]);c.lineTo(q[0]-q[0]/gl*24,q[1]-q[1]/gl*24);c.stroke();
   CN.txt(S,"v",q[0]+ux*34,q[1]+uy*34,{sz:13,col:"yl"});CN.txt(S,"g",q[0]-q[0]/gl*30,q[1]-q[1]/gl*30,{sz:13,col:"pk"})}
  if(s.foci&&sa.k===0){const f2=CN.pr(S,...CN.o3(-2*s.a*s.e,0,s.inc[0],0)),f1=[0,0];
   c.globalAlpha=.5;c.strokeStyle="rgb(255,212,121)";c.lineWidth=.9;c.setLineDash([3,3]);c.beginPath();c.moveTo(q[0],q[1]);c.lineTo(0,0);c.moveTo(q[0],q[1]);c.lineTo(f2[0],f2[1]);c.stroke();c.setLineDash([]);
   CN.glow(c,f2[0],f2[1],5,PAL.yl,.9);CN.txt(S,"F2",f2[0],f2[1]-10,{sz:11,col:"yl"});CN.txt(S,"F1",f1[0]+R2*.55,-R2*.55,{sz:11,col:"yl"})}
  if(s.wedge&&sa.k===0){/* swept sector for a fixed time slice, plus the same slice on the far side */
   for(let w=0;w<2;w++){const m0=sa.Mm+(w?PI:0),pts=[[0,0]];for(let j=0;j<=14;j++){const qq=CN.pr(S,...orbPos(s,0,m0-j*.05,sa.a,sa.e));pts.push([qq[0],qq[1]])}
    c.globalAlpha=w?.22:.3;c.fillStyle=w?"rgb(109,240,168)":"rgb(255,122,182)";c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.fill();
    c.globalAlpha=.7;c.strokeStyle=w?"rgb(109,240,168)":"rgb(255,122,182)";c.lineWidth=.8;c.stroke();
    if(w===0){const qq=CN.pr(S,...orbPos(s,0,m0,sa.a,sa.e));if(!w)CN.txt(S,"A",qq[0]*.5,qq[1]*.5,{sz:12,col:"pk"})}
    else{const qq=CN.pr(S,...orbPos(s,0,m0-.35,sa.a,sa.e));CN.txt(S,"A",qq[0]*.55,qq[1]*.55,{sz:12,col:"gr"})}}}
 }
 /* geo ground pin & beam */
 if(s.geo){const sa=sats[0],ground=CN.pr(S,...[sa.w[0]/(s.a)*R2*1.02,sa.w[1]/(s.a)*R2*1.02,sa.w[2]/(s.a)*R2*1.02]),q=CN.pr(S,...sa.w);
  CN.dline(c,ground[0],ground[1],q[0],q[1],22,1,PAL.yl,.6,-t*.4);CN.glow(c,ground[0],ground[1],4,PAL.or,.95)}
 if(s.beams){const q=CN.pr(S,...sats[0].w);const gp=CN.pr(S,...[sats[0].w[0]/s.a*R2,sats[0].w[1]/s.a*R2,sats[0].w[2]/s.a*R2]);
  for(let k=0;k<n;k++){const q=CN.pr(S,...sats[k].w),gp=CN.pr(S,...[sats[k].w[0]/s.a*R2,sats[k].w[1]/s.a*R2,sats[k].w[2]/s.a*R2]);if(hid(q,R2*q[3]))continue;CN.dline(c,q[0],q[1],gp[0],gp[1],14,.7,PAL.cy,.35,-t*.3)}}
 if(s.gs){/* ground station on the surface near the top, visibility cone */
  const gl=CN.pr(S,0,-R2*.99*cos(.2),R2*.99*sin(.2)*0),gq=CN.pr(S,R2*.55,-R2*.8,R2*.2);
  const sa=sats[0],q=CN.pr(S,...sa.w),dx=q[0]-gq[0],dy=q[1]-gq[1],d=M.hypot(dx,dy);const vis=d<R2*2.1&&q[2]>-R2*.3;
  CN.glow(c,gq[0],gq[1],5,PAL.or,.95);
  c.globalAlpha=vis?.5:.15;c.strokeStyle=vis?"rgb(109,240,168)":"rgb(255,154,86)";c.lineWidth=vis?1.4:.7;c.setLineDash([4,4]);c.beginPath();c.moveTo(gq[0],gq[1]);c.lineTo(q[0],q[1]);c.stroke();c.setLineDash([]);
  CN.circle(c,gq[0],gq[1],R2*.5+(t*30)%(R2*1.3),40,.7,vis?PAL.gr:PAL.or,.28*(1-((t*30)%(R2*1.3))/(R2*1.3)),0,.45);
  if(vis)CN.txt(S,rsL(["LINK","اتصال"]),gq[0],gq[1]+14,{sz:11,col:"gr"});
  CN.callout(S,gq[0],gq[1],rsL(["ground station","محطة أرضية"]),-26,-30,"or",.9)}
 /* hohmann burn flashes + labels */
 if(s.hoh){const u=t%17,a1=s.a,a2=s.a*1.95;
  const fl=(pos,a)=>{const q=CN.pr(S,...pos);CN.glow(c,q[0],q[1],14+8*sin(t*18),PAL.pk,a);CN.glow(c,q[0],q[1],5,[255,255,255],a)};
  const p0=CN.pr(S,...orbPos(s,0,0,a1,0)),p1=CN.pr(S,...orbPos(s,0,PI,(a1+a2)/2,(a2-a1)/(a2+a1)));
  if(u>5.4&&u<7.2)fl(orbPos(s,0,0,a1,0),.9);
  if(u>11.4&&u<13.2)fl(orbPos(s,0,PI,(a1+a2)/2,(a2-a1)/(a2+a1)),.9);
  CN.callout(S,p0[0],p0[1],rsL(["burn 1","دفعة ١"]),-34,26,"pk",u>5?1:.55);
  CN.callout(S,p1[0],p1[1],rsL(["burn 2","دفعة ٢"]),30,-26,"pk",u>11?1:.55);
  CN.txt(S,rsL(["LOW ORBIT","مدار منخفض"]),-s.a*.8,s.a*.9,{sz:11,col:"cy",a:.8});CN.txt(S,rsL(["HIGH ORBIT","مدار عالٍ"]),s.a*1.1,-s.a*1.35,{sz:11,col:"vi",a:.8})}
 /* camera targets */
 const fx=focusXY[0],fy=focusXY[1];
 const zb=s.R<25&&!s.hoh&&!s.foci&&!s.wedge&&!s.deb?1.1:1.28;S.camT=b===1?{z:zb*1.45,x:fx*.55,y:fy*.55}:b===2?{z:zb*.9,x:0,y:0}:{z:zb,x:0,y:0};
 if(s.hoh)S.camT=b===1?{z:1.4,x:0,y:0}:b===2?{z:.95,x:0,y:0}:{z:1.1,x:0,y:0};
 if(s.lab&&!s.hoh&&!s.foci&&!s.gs){const q=sats[0]&&CN.pr(S,...sats[0].w);CN.cap(S,rsL(S.p.labels&&S.p.labels[0]?S.p.labels[0][2]:s.lab),12,15,"yl")}
 if(s.foci||s.wedge||s.gs)CN.cap(S,rsL(S.p.labels&&S.p.labels[0]?S.p.labels[0][2]:s.lab),12,15,"yl");
 if(s.hoh)CN.cap(S,rsL(S.p.labels&&S.p.labels[0]?"":""),12,15,"yl");
};

/* ================= POST: bloom (two soft passes at low res, additive) ================= */
const BK=(i)=>{const r=rng(i*977+3),o=[];for(let k=0;k<9;k++)o.push({x:r(),y:r(),z:.4+r()*.9,s:.02+r()*.05,p:r()*TAU,c:r()<.5?[120,170,255]:[255,170,110],d:r()*.5+.2});return o};
CN.post=S=>{
 const W=S.cv.width,H=S.cv.height;if(!W||!H)return;
 if(!S.bl||S.bl.w!==W){const mk=(d)=>{const k=document.createElement("canvas");k.width=M.max(8,W/d|0);k.height=M.max(8,H/d|0);const g=k.getContext("2d");g.imageSmoothingQuality="high";return k};
  S.bl={w:W,a:mk(5),b:mk(18)};S.bl.ac=S.bl.a.getContext("2d");S.bl.bc=S.bl.b.getContext("2d")}
 const B=S.bl;
 B.ac.globalCompositeOperation="copy";B.ac.drawImage(S.cv,0,0,B.a.width,B.a.height);
 B.bc.globalCompositeOperation="copy";B.bc.drawImage(B.a,0,0,B.b.width,B.b.height);
 const c=S.c;c.setTransform(1,0,0,1,0,0);c.globalCompositeOperation="lighter";c.imageSmoothingEnabled=true;c.imageSmoothingQuality="high";
 c.globalAlpha=.5;c.drawImage(B.a,0,0,W,H);c.globalAlpha=.55;c.drawImage(B.b,0,0,W,H);
 
if(CN.lite){c.globalAlpha=1;c.globalCompositeOperation="source-over";return}
 const D=S.dpr,t=S.t,px=S.pxs||0,py=S.pys||0;
 /* foreground bokeh drifting with the pointer (depth) */
 if(!S.bk)S.bk=BK(S.idx+1);
 for(const o of S.bk){const x=((o.x+t*o.s*.08*o.d+px*.03*o.z)%1.2-.1)*W,y=(o.y+sin(t*.2*o.d+o.p)*.03+py*.03*o.z)*H,r=(34+70*o.z)*D;
  c.globalAlpha=(.03+.04*o.z)*(.6+.4*sin(t*.5+o.p))*S.fade;c.drawImage(sp(o.c),x-r,y-r,r*2,r*2)}
 /* anamorphic flare on every beat */
 if(S.bt<1.6&&S.bt>=0&&!RL_RM.matches){const a=M.exp(-S.bt*2.4)*.55*S.fade,y=H*.5,cx=W*.5;
  c.globalAlpha=a;c.drawImage(sp([140,190,255]),cx-W*.55,y-9*D,W*1.1,18*D);c.globalAlpha=a*.8;c.drawImage(sp([255,255,255]),cx-W*.18,y-3*D,W*.36,6*D)}
 /* finger glow trail */
 if(S.tr&&S.tr.length){for(let i=S.tr.length-1;i>=0;i--){const q=S.tr[i];q.l-=S.dt*1.6;if(q.l<=0){S.tr.splice(i,1);continue}
  const r=(10+14*q.l)*D;c.globalAlpha=q.l*.55;c.drawImage(sp(q.c),q.x*D-r,q.y*D-r,r*2,r*2)}}
 c.globalAlpha=1;c.globalCompositeOperation="source-over"};

/* ================= ENGINE ================= */
const INST=[];let raf=0,last=0;
function mount(host,k,idx){
 const r=REELS[idx];if(!r)return;
 const cv=document.createElement("canvas");cv.className="cn-cv";host.appendChild(cv);
 const S={host,cv,c:cv.getContext("2d"),idx,kind:r.scene.k,p:r.scene,st:{},t:0,bt:0,b:0,tok:-1,dt:.016,w:0,h:0,dpr:1,k:1,fade:1,
  cam:{z:.7,x:0,y:0},camT:{z:1,x:0,y:0},v:{yaw:0,tilt:.5},ar:LANG==="ar",done:false};
 S.sx=x=>S.W/2+(x-S.cam.x)*S.U*S.cam.z;S.sy=y=>S.H/2+(y-S.cam.y)*S.U*S.cam.z;
 S.pxs=0;S.pys=0;S.px=0;S.py=0;S.tr=[];
 if(!host._pp){host._pp=1;host.addEventListener("pointermove",e=>{const b=host.getBoundingClientRect(),x=e.clientX-b.left,y=e.clientY-b.top;S.px=(x/b.width-.5)*2;S.py=(y/b.height-.5)*2;
  if(!RL_RM.matches&&S.tr.length<40)S.tr.push({x,y,l:1,c:[[120,200,255],[255,200,120],[200,150,255]][(S.tr.length+(S.idx|0))%3]})});
  host.addEventListener("pointerleave",()=>{S.px=0;S.py=0})}
 INST.push(S);fit(S);
 try{(CN.ini[S.kind]||(()=>{}))(S)}catch(e){S.err=e;console.warn("cine init",S.kind,e)}
 /* start state for static neighbours / reduced motion */
 if(idx!==RL.idx||RL_RM.matches){S.t=RL_RM.matches?7:2.4;S.b=RL_RM.matches?2:0;S.cam.z=1;S.dt=.016;S.camT.z=1;drawS(S,0);S.cam.z=S.camT.z;S.cam.x=S.camT.x;S.cam.y=S.camT.y;drawS(S,0);S.stat=true}
 return S}
function fit(S){
 const w=S.host.clientWidth,h=S.host.clientHeight;if(!w||!h)return false;
 if(w===S.w&&h===S.h)return true;
 S.w=w;S.h=h;S.dpr=Math.min(devicePixelRatio||1,2);S.cv.width=Math.round(w*S.dpr);S.cv.height=Math.round(h*S.dpr);
 S.W=w;S.H=h;S.U=M.min(w/274,h/200);S.k=w<520?1:1.18;return true}
function drawS(S,dt){
 if(!fit(S))return;
 const c=S.c;S.dt=dt||.016;
 /* camera */
 const k=1-Math.exp(-S.dt*1.35);S.cam.z+=(S.camT.z-S.cam.z)*k;S.cam.x+=((S.camT.x||0)-S.cam.x)*k;S.cam.y+=((S.camT.y||0)-S.cam.y)*k;
 const iq=M.min(1,S.t/2.6),intro=1+.4*M.pow(1-iq,4);
 S.fade=ease(S.t/.7);
 c.setTransform(S.dpr,0,0,S.dpr,0,0);c.clearRect(0,0,S.W,S.H);c.globalCompositeOperation="lighter";c.globalAlpha=1;c.lineCap="round";
 /* beat punch: tiny zoom kick */
 const kick=1+.028*Math.exp(-S.bt*2.2)*(S.bt>0?1:0),br=1+.012*sin(S.t*.33),dx=sin(S.t*.19)*2.2+S.pxs*4,dy=cos(S.t*.15)*1.6+S.pys*3;S.pxs+=(S.px-S.pxs)*M.min(1,S.dt*3);S.pys+=(S.py-S.pys)*M.min(1,S.dt*3);
 const z=S.cam.z*intro*kick*br;
 c.save();c.translate(S.W/2,S.H/2);c.scale(S.U*z,S.U*z);c.translate(-S.cam.x-dx,-S.cam.y-dy);
 const zs=S.cam.z;S.cam.z=z;
 try{(CN.sc[S.kind]||CN.sc.fallback)(S)}catch(e){if(!S.err){S.err=e;console.warn("cine draw",S.kind,e)}}
 S.cam.z=zs;
 c.restore();c.globalAlpha=1;c.globalCompositeOperation="source-over";if(CN.post)CN.post(S)}
function loop(ts){
 raf=0;if(!RL.open)return;
 const dt=last?M.min((ts-last)/1000,.05):.016;last=ts;CN.ema=(CN.ema||.016)*.96+dt*.04;CN.lite=!window.__hq&&CN.ema>.046;
 for(let i=INST.length-1;i>=0;i--){const S=INST[i];if(!S.host.isConnected){INST.splice(i,1);continue}
  if(S.idx!==RL.idx||S.stat)continue;
  if(RL_RM.matches)continue;
  if(document.hidden||RL.paused)continue;
  if(S.tok!==RL.tok){S.tok=RL.tok}
  if(S.b!==RL.beat){S.b=RL.beat;S.bt=0}
  S.t+=dt;S.bt+=dt;drawS(S,dt)}
 raf=requestAnimationFrame(loop)}
function ensure(){if(!raf){last=0;raf=requestAnimationFrame(loop)}}

/* replace the SVG scenes with canvas hosts */
Object.keys(RS).forEach(k=>{RS[k]=p=>`<div class="cn-host" data-k="${k}"></div>`});
const pScenes=rlScenes;
window.rlScenes=rlScenes=function(i){
 pScenes(i);
 RL.els.reels.forEach((s,k)=>{if(Math.abs(k-i)>1)return;
  const h=s.querySelector(".cn-host");if(h&&!h.firstChild){mount(h,k,k)}
  if(k===i){const S=INST.find(x=>x.host===h);if(S&&!S.stat&&!RL_RM.matches){/* fresh start */ }}});
 ensure()};
const pGo=rlGo;
window.rlGo=rlGo=function(i){pGo(i);ensure()};
const pStatic=rlStatic;
window.rlStatic=rlStatic=function(){pStatic();INST.forEach(S=>{if(S.host.isConnected&&S.idx===RL.idx){S.t=7;S.b=2;S.stat=false;fit(S);S.cam.z=1;drawS(S,0);S.cam.z=S.camT.z;drawS(S,0);S.stat=true}})};
addEventListener("resize",()=>{INST.forEach(S=>{if(S.stat&&fit(S)){drawS(S,0)}})});
CN.inst=INST;CN.mount=mount;
})();
