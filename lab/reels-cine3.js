"use strict";
/* Mission Lab Reels CINE v20, part 3: sun, spin, rocket, machine, gauge, flow, cycle, box, radar, motor, gnss. */
(function(){
if(!window.CN)return;
const {PAL,col,sp,ease,eo,eb,clamp,lerp,rng,TAU}=CN;const M=Math,sin=M.sin,cos=M.cos,PI=M.PI;
const SC=CN.sc,IN=CN.ini,rl=x=>rsL(x);
const hz=S=>S.W/S.H>1.15;
const cp=(S,txt,rgb)=>{if(txt)CN.cap(S,rl(txt),14,14,rgb||"yl")};
const fib=n=>{const o=[],ga=PI*(3-M.sqrt(5));for(let i=0;i<n;i++){const y=1-i/(n-1)*2,r=M.sqrt(1-y*y);o.push([r*cos(ga*i),y,r*sin(ga*i)])}return o};

/* ============ sun: flares + solar wind, or Van Allen belts ============ */
IN.sun=S=>{S.v={yaw:0,tilt:.25};const r=rng(21);S.st.sph=fib(300);S.st.cme=[];
 S.st.belt=Array.from({length:420},(_,i)=>{const o=i%3===0;return{u:r()*TAU,v:r()*TAU,R:o?64:40,th:o?9:6,s:(r()-.5)*.6,o}});
 S.st.rad=Array.from({length:70},()=>({x:-130-r()*80,y:(r()-.5)*150,v:50+r()*50}))};
SC.sun=S=>{const c=S.c,t=S.t,st=S.st;
 if(S.p.v==="belts"){S.v.yaw=t*.18;S.v.tilt=.5+.1*sin(t*.2);
  CN.earth(S,0,0,20,t*.2,{});
  const tilt=.19,ct=cos(tilt),stt=sin(tilt);
  for(const b of st.belt){const u=b.u+t*b.s,rr=b.R+b.th*cos(b.v),x=rr*cos(u),z=rr*sin(u),y=b.th*.8*sin(b.v);
   const q=CN.pr(S,x*ct-y*stt,x*stt+y*ct,z);if(q[2]<0&&q[0]*q[0]+q[1]*q[1]<400)continue;
   CN.glow(c,q[0],q[1],1.5*q[3],b.o?PAL.vi:PAL.or,(.35+.4*(q[2]+70)/140)*.9)}
  /* incoming radiation hits the shielded satellite */
  const sa=t*.9,sx=cos(sa)*88,sz=sin(sa)*88,q=CN.pr(S,sx,0,sz);
  for(const p of st.rad){p.x+=p.v*S.dt;if(p.x>140){p.x=-150;p.y=(Math.random()-.5)*150}
   const dx=p.x-q[0],dy=p.y-q[1],d=M.hypot(dx,dy);let x=p.x,y=p.y;if(d<24){x=q[0]+dx/d*24;y=q[1]+dy/d*24}
   CN.glow(c,x,y,1.4,d<28?PAL.cy:PAL.pk,.65)}
  CN.sat(S,q[0],q[1],sa+PI/2,1.4,PAL.cy,q[2]<0?.35:1);
  CN.circle(c,q[0],q[1],24,40,.9,PAL.cy,.5+.3*sin(t*5),0,1);
  CN.callout(S,q[0],q[1],rl(["shield: ECC + watchdog","درع: ECC + watchdog"]),-30,34,"cy",S.b>=1?1:.6);
  CN.callout(S,0,-52,rl(["Van Allen belt","حزام فان ألين"]),-24,-18,"or",.95);
  S.camT=S.b===1?{z:1.5,x:q[0]*.7,y:q[1]*.7}:S.b===2?{z:.9,x:0,y:0}:{z:1,x:0,y:0};cp(S,S.p.tag);return}
 /* solar wind */
 S.v.yaw=0;S.v.tilt=0;const sx=-84,sy=0,R=44;
 CN.glow(c,sx,sy,R*2.2,[255,150,60],.4+.1*sin(t*2));CN.glow(c,sx,sy,R*1.4,[255,200,90],.4);
 for(const p of st.sph){const a=t*.15,x=p[0]*cos(a)+p[2]*sin(a),z=-p[0]*sin(a)+p[2]*cos(a);if(z<-.1)continue;
  CN.glow(c,sx+x*R,sy+p[1]*R,1.7+z,z>.5?PAL.yl:PAL.or,.3+.6*z)}
 /* flare loops */
 for(let k=0;k<3;k++){const a0=-.7+k*.4,ph=(t*.5+k*.33)%1,h=22+30*ph,x0=sx+cos(a0)*R,y0=sy+sin(a0)*R;
  for(let i=0;i<22;i++){const u=i/21,ang=PI*u,px=x0+cos(a0)*h*sin(ang)*1.1-sin(a0)*(u-.5)*34,py=y0+sin(a0)*h*sin(ang)*1.1+cos(a0)*(u-.5)*34;CN.glow(c,px,py,2,PAL.yl,(1-ph)*.9)}}
 /* CME particles */
 if(S.dt>0&&st.cme.length<260)for(let i=0;i<3;i++){const a=-.45+(Math.random()-.5)*.5;st.cme.push({x:sx+cos(a)*R,y:sy+sin(a)*R,vx:44+Math.random()*50,vy:(Math.random()-.5)*30,l:1})}
 const ex=96,ey=0,er=21;
 for(const p of st.cme){p.x+=p.vx*S.dt;p.y+=p.vy*S.dt;p.l-=S.dt*.28;const dx=p.x-ex,dy=p.y-ey,d=M.hypot(dx,dy);if(p.x>ex-36&&d<44&&p.x<ex+10){p.vy+=(dy>=0?1:-1)*140*S.dt;p.vx*=.985}
  if(p.l>0)CN.glow(c,p.x,p.y,1.7,PAL.or,p.l*.8)}
 st.cme=st.cme.filter(p=>p.l>0&&p.x<150);
 CN.earth(S,ex,ey,er,t*.3,{sun:[-1,0,.2]});
 for(let k=0;k<2;k++)CN.circle(c,ex+6,ey,34+k*7,34,1,PAL.cy,.5,0,1.15);
 /* mask back half of the shock arcs: draw only front */
 CN.callout(S,sx+cos(-.7)*R,sy+sin(-.7)*R,rl(["flare","توهج"]),22,-34,"yl",1);
 CN.callout(S,10,-8,rl(["particles","جسيمات"]),0,-38,"or",.95);
 CN.callout(S,ex,ey+er,rl(["Earth's field","مجال الأرض"]),-6,40,"cy",.95);
 S.camT=S.b===1?{z:1.5,x:-60,y:-10}:S.b===2?{z:1.5,x:70,y:0}:{z:.95,x:0,y:0};cp(S,S.p.tag)};

/* ============ spin: attitude + actuators on a glowing 3D satellite ============ */
const CUBE=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],EDG=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
function rot3(p,a,b,c2){let [x,y,z]=p;let y1=y*cos(a)-z*sin(a),z1=y*sin(a)+z*cos(a);y=y1;z=z1;let x1=x*cos(b)+z*sin(b);z1=-x*sin(b)+z*cos(b);x=x1;z=z1;x1=x*cos(c2)-y*sin(c2);y1=x*sin(c2)+y*cos(c2);return[x1,y1,z]}
function satBox(S,cx,cy,sc,a,b,g,rgb,al){const c=S.c;
 const V=CUBE.map(p=>rot3([p[0]*sc,p[1]*sc,p[2]*sc],a,b,g)),pr=V.map(v=>CN.pr(S,v[0]+cx,v[1]+cy,v[2]));
 for(const e of EDG){CN.dline(c,pr[e[0]][0],pr[e[0]][1],pr[e[1]][0],pr[e[1]][1],10,1,rgb,al,0)}
 for(const q of pr)CN.glow(c,q[0],q[1],2.5,rgb,al);
 /* solar panels */
 [-1,1].forEach(s=>{const P=[[s*sc*1.3,-sc*.8,0],[s*sc*3.2,-sc*.8,0],[s*sc*3.2,sc*.8,0],[s*sc*1.3,sc*.8,0]].map(p=>{const r=rot3(p,a,b,g),q=CN.pr(S,r[0]+cx,r[1]+cy,r[2]);return q});
  c.globalAlpha=.16*al;c.fillStyle="rgb(86,160,255)";c.beginPath();P.forEach((q,i)=>i?c.lineTo(q[0],q[1]):c.moveTo(q[0],q[1]));c.closePath();c.fill();
  for(let i=0;i<4;i++)CN.line(c,P[i][0],P[i][1],P[(i+1)%4][0],P[(i+1)%4][1],PAL.bl,.8*al,.9)});
 return{rot:p=>{const r=rot3(p,a,b,g);return CN.pr(S,r[0]+cx,r[1]+cy,r[2])}}}
IN.spin=S=>{S.v={yaw:.4,tilt:.35}};
SC.spin=S=>{const c=S.c,t=S.t,wheel=/wheel/.test(rl(S.p.tag));
 if(!wheel){/* attitude: tumble settles, then points at the sun */
  const u=t%11,w=1.5*M.exp(-.38*u),ang=(1.5/.38)*(1-M.exp(-.38*u)),al=M.min(1,u*2,(11-u)*2.5);
  const bx=satBox(S,10,6,21,ang*.9,ang*.6+.4,ang*.4,PAL.cy,al);
  const axes=[[1,0,0,PAL.pk,"x"],[0,1,0,PAL.gr,"y"],[0,0,1,PAL.cy,"z"]],o=bx.rot([0,0,0]);
  for(const a of axes){const q=bx.rot([a[0]*38,a[1]*38,a[2]*38]);CN.line(c,o[0],o[1],q[0],q[1],a[3],.85*al,1.2);CN.glow(c,q[0],q[1],3,a[3],al);CN.txt(S,a[4],q[0]+(q[0]-o[0])*.12,q[1]+(q[1]-o[1])*.12,{sz:11,col:a[3].join?(a===axes[0]?"pk":a===axes[1]?"gr":"cy"):"cy",a:al})}
  /* sun, magnetic field, stars */
  CN.glow(c,-100,-70,18,PAL.yl,.9);CN.glow(c,-100,-70,6,[255,255,255],1);CN.dline(c,-92,-62,-30,-20,14,1.1,PAL.yl,.7,-t*.5);CN.callout(S,-100,-70,rl(["sun","الشمس"]),-6,24,"yl",1);
  for(let k=0;k<3;k++){c.globalAlpha=.55;c.strokeStyle="rgb(172,139,255)";c.lineWidth=.9;c.beginPath();c.ellipse(96,10,16+k*10,30+k*14,0,-PI/2.2,PI/2.2);c.stroke()}
  CN.callout(S,106,-4,rl(["magnetic field","المجال المغناطيسي"]),-4,-52,"vi",1);
  for(let k=0;k<4;k++){const x=[-70,50,-30,90][k],y=[50,-70,70,60][k];CN.glow(c,x,y,3+sin(t*3+k)*1.5,PAL.wh,.9)}CN.callout(S,-30,70,rl(["stars","النجوم"]),-4,18,"wh",.9);
  c.globalAlpha=1;S.camT=S.b===1?{z:1.5,x:10,y:6}:S.b===2?{z:1.05,x:0,y:0}:{z:1,x:0,y:0}}
 else{/* reaction wheel: wheel spins one way, body turns the other */
  const w=sin(t*.9),ang=-(1-cos(t*.9))*1.1;
  const wx=-62,wy=4,R=32;c.globalAlpha=1;
  CN.circle(c,wx,wy,R,60,1.3,PAL.or,.9,0,1);CN.circle(c,wx,wy,R*.55,28,1,PAL.or,.5,0,1);
  const wa=(1-cos(t*.9))*5;for(let k=0;k<6;k++){const a=wa+k*TAU/6;CN.dline(c,wx,wy,wx+cos(a)*R,wy+sin(a)*R,10,1.1,PAL.or,.8,0)}
  CN.glow(c,wx,wy,6,PAL.yl,.9);
  CN.txt(S,w>0?"\u21BB":"\u21BA",wx,wy-R-14,{sz:20,col:"or"});CN.txt(S,rl(["reaction wheel","عجلة رد الفعل"]),wx,wy+R+16,{sz:12,col:"or"});
  const bx=satBox(S,64,4,17,.35,.6,-ang*2.2,PAL.cy,1);CN.txt(S,w>0?"\u21BA":"\u21BB",64,-48,{sz:20,col:"cy"});CN.txt(S,rl(["satellite turns the other way","القمر بيلف عكسها"]),64,56,{sz:11,col:"cy"});
  /* magnetorquer: field loop lights up on later beats */
  const on=S.b>=1;if(on){c.globalAlpha=.6+.3*sin(t*4);c.strokeStyle="rgb(172,139,255)";c.lineWidth=1.2;for(let k=0;k<3;k++){c.beginPath();c.ellipse(64,4,36+k*9,22+k*7,0,0,TAU);c.stroke()}CN.txt(S,rl(["magnetorquer","ملف مغناطيسي"]),64,-68,{sz:11,col:"vi"})}
  S.camT=S.b===1?{z:1.2,x:50,y:0}:S.b===2?{z:1.35,x:-60,y:0}:{z:1,x:0,y:0}}
 cp(S,S.p.tag)};

/* ============ rocket: particle rocket, plume, curving horizon ============ */
IN.rocket=S=>{S.st.ex=[];S.st.str=Array.from({length:34},()=>({x:(Math.random()-.5)*260,y:(Math.random()-.5)*200,z:.3+Math.random()}))};
SC.rocket=S=>{const c=S.c,t=S.t,st=S.st,stg=!!S.p.side,cyc=10,u=t%cyc,al=M.min(1,u*2,(cyc-u)*2.5),sp0=.3+M.min(1,u/6)*1.4;
 /* speed streaks */
 for(const s of st.str){s.y+=S.dt*140*s.z*sp0;if(s.y>110)s.y=-110;c.globalAlpha=.5*s.z*al;c.strokeStyle="rgb(255,255,255)";c.lineWidth=.8;c.beginPath();c.moveTo(s.x,s.y);c.lineTo(s.x,s.y-10*s.z*sp0);c.stroke()}
 /* horizon */
 const hy=78+u*10;CN.glow(c,0,hy+210,260,[60,130,255],.28*al);c.globalAlpha=.7*al;
 for(let i=0;i<110;i++){const x=-140+i*2.6,y=hy+(x*x)/420;CN.glow(c,x,y,1.6,PAL.bl,.7*al)}
 /* rocket body (shaken) */
 const sh=sin(t*70)*.5,rx=sh,ry=-6+(u<1?-u*0:0);
 const sepAt=4.6,sep=stg&&u>sepAt,lowY=sep?(u-sepAt)*60:0;
 const body=[[0,-40],[8,-24],[8,16],[-8,16],[-8,-24],[0,-40]];
 const outline=(pts,dx,dy,rgb,a,n)=>{for(let i=0;i<pts.length-1;i++)CN.dline(c,pts[i][0]+dx,pts[i][1]+dy,pts[i+1][0]+dx,pts[i+1][1]+dy,M.max(3,n||8),1.1,rgb,a,0)};
 const upperY=sep?-(u-sepAt)*6:0;
 outline(stg?[[0,-40],[8,-24],[8,-4],[-8,-4],[-8,-24],[0,-40]]:body,rx,ry+upperY,PAL.wh,.95*al,12);
 CN.glow(c,rx,ry-20+upperY,5,PAL.cy,.9*al);
 /* fins */
 outline([[8,8],[16,24],[8,16]],rx,ry+(stg?0:0)+lowY*(stg?1:0),PAL.wh,.8*al,6);outline([[-8,8],[-16,24],[-8,16]],rx,ry+lowY*(stg?1:0),PAL.wh,.8*al,6);
 if(stg){outline([[8,-4],[8,16],[-8,16],[-8,-4]],rx+(sep?(u-sepAt)*-7:0),ry+lowY,PAL.or,.85*al*(sep?M.max(0,1-(u-sepAt)/3):1),10);CN.line(c,-8,ry-4+upperY,8,ry-4+upperY,PAL.yl,sep?.2:.7*al,1)}
 /* plume */
 const ny=stg&&sep?(-4+upperY+ry):(16+ry+(stg?0:0));
 if(S.dt>0)for(let i=0;i<5;i++)st.ex.push({x:rx+(Math.random()-.5)*8,y:ny,vx:(Math.random()-.5)*14,vy:80+Math.random()*70,l:1});
 for(const p of st.ex){p.x+=p.vx*S.dt;p.y+=p.vy*S.dt;p.l-=S.dt*1.5;if(p.l>0){const rgb=p.l>.65?[255,245,200]:p.l>.35?PAL.yl:PAL.or;CN.glow(c,p.x,p.y,1.5+p.l*3,rgb,p.l*.75*al)}}
 st.ex=st.ex.filter(p=>p.l>0);if(st.ex.length>420)st.ex.splice(0,60);
 CN.glow(c,rx,ny+4,16,PAL.or,.7*al);
 /* readouts */
 if(!stg){/* mass vs time: fuel column shrinks, delta-v grows */
  const fuel=1-M.min(1,u/8.5)*.62,bx=92;
  for(let i=0;i<24;i++){const y=60-i*4.6,on=i/24<fuel;CN.glow(c,bx,y,2.2,on?PAL.yl:PAL.wh,on?.8*al:.14)}
  CN.txt(S,"m0",bx,-56,{sz:12,col:"yl"});CN.txt(S,"mf",bx,72,{sz:12,col:"yl"});
  const dv=M.log(1/fuel)*3.1;CN.txt(S,"\u0394v = "+dv.toFixed(1)+" km/s",-70,-62,{sz:15,col:"cy",a:al})}
 else{const v=M.min(9.4,u*1.55);CN.txt(S,v.toFixed(1)+" km/s",-70,-62,{sz:16,col:"cy",a:al});
  if(sep)CN.callout(S,rx-8,ry+lowY,rl(["stage 1 drops","المرحلة ١ بتسقط"]),-24,10,"or",M.min(1,(u-sepAt)*2));
  if(u>sepAt+.5)CN.callout(S,rx,ry-30+upperY,rl(["stage 2 burns on","المرحلة ٢ بتكمل"]),26,-14,"cy",1)}
 S.camT=S.b===1?{z:1.9,x:0,y:10}:S.b===2?{z:1.15,x:0,y:0}:{z:1.4,x:0,y:0};cp(S,S.p.tag)};

/* ============ machine: a function that takes input and returns output ============ */
SC.machine=S=>{const c=S.c,t=S.t,p=S.p,cyc=5.4,u=t%cyc,R=36;
 const hexA=t*.35;for(let k=0;k<6;k++){const a=hexA+k*PI/3,b=hexA+(k+1)*PI/3;CN.dline(c,cos(a)*R,sin(a)*R,cos(b)*R,sin(b)*R,9,1.4,PAL.vi,.9,0)}
 CN.circle(c,0,0,R*.7,30,1,PAL.cy,.5,-t*1.6,1);const act=M.exp(-M.pow((u-1.9)/.5,2));
 CN.glow(c,0,0,R*1.6,PAL.vi,.22+.5*act);CN.glow(c,0,0,R*.8,PAL.cy,.18+.5*act);
 CN.txt(S,p.name,0,0,{mono:1,sz:13,col:"wh",glow:12});
 const tok=(x,y,s,rgb,a)=>{if(a<=0)return;CN.glow(c,x,y,19,rgb,.4*a);CN.circle(c,x,y,13,22,1.1,rgb,.9*a,t,1);CN.txt(S,s,x,y,{sz:15,col:"wh",a:a,glow:6})};
 const ix=-112+M.min(1,u/1.7)*(112-R-14)*(u<1.9?1:1);
 if(u<1.9)tok(-112+ease(u/1.7)*(112-R-22),0,p.inp,PAL.cy,1);
 if(u<1.7)CN.txt(S,p.inl,-96,-26,{sz:11,col:"cy"});
 if(u>1.9){const o=ease((u-1.9)/1.6);tok(R+22+o*(112-R-30),0,p.out,PAL.gr,1);CN.txt(S,p.outl,92,-26,{sz:11,col:"gr",a:o})}
 for(let i=0;i<14;i++){const a=i/14*TAU+t*3;CN.glow(c,cos(a)*R*.9*act,sin(a)*R*.9*act,2,PAL.wh,act*.9)}
 CN.dline(c,-100,0,-R-4,0,10,.8,PAL.wh,.25,-t*.3);CN.dline(c,R+4,0,100,0,10,.8,PAL.wh,.25,-t*.3);
 S.camT=S.b===1?{z:1.4,x:0,y:0}:S.b===2?{z:1.35,x:60,y:0}:{z:1,x:0,y:0};cp(S,S.p.tag)};

/* ============ gauge: night-light dial / NDVI plants ============ */
SC.gauge=S=>{const c=S.c,t=S.t,p=S.p,v=rl(p.val);
 if(/NDVI/.test(v)){/* NIR beam scans a row of plants, healthy ones glow green */
  const n=16,sw=((t*.22)%1.3),gy=44;
  CN.dline(c,-124,gy+6,124,gy+6,70,.6,PAL.wh,.18,0);
  for(let i=0;i<n;i++){const x=-110+i*14.6,h=14+((i*37)%5)*6+(i%3)*4,hl=1-M.abs((i%5)-2)*.28,lit=sw*n>i?1:0,rgb=lit?[lerp(255,109,hl),lerp(154,240,hl),lerp(86,168,hl)].map(Math.round):[150,120,90];
   for(let k=0;k<h/3;k++)CN.glow(c,x+sin(t*1.5+i)*.6*k/5,gy-k*3,1.5,rgb,.55+.35*lit);
   for(let k=0;k<6;k++){const a=k/6*TAU+i;CN.glow(c,x+cos(a)*5,gy-h+sin(a)*3,1.8,rgb,.55*(lit?1:.4))}}
  const bx=-124+sw/1.3*248;CN.line(c,bx,-60,bx,gy,PAL.vi,.5,1);CN.glow(c,bx,-60,9,PAL.vi,.9);CN.dline(c,bx,-60,bx,gy,18,1.5,PAL.vi,.8,-t*.8);
  CN.txt(S,"NIR",bx,-72,{sz:12,col:"vi"});
  const nd=clamp(sw/1.3*1.2,0,.82);CN.glow(c,-100,-30,30,PAL.gr,.18);CN.txt(S,"NDVI",-100,-48,{sz:12,col:"gr"});CN.txt(S,nd.toFixed(2),-100,-30,{sz:22,col:"gr",glow:14});
  S.camT=S.b===1?{z:1.5,x:bx*.6,y:10}:{z:1,x:0,y:0};cp(S,v,"gr");CN.txt(S,p.tag,0,0,{abs:1,dy:36*S.k,mono:1,sz:11,col:"wh",glow:6});return}
 /* night light: ambient light -> LDR reading -> LED brightness (PWM) */
 const L=.5+.5*sin(t*.7-.5),cx=0,cy=-4,R=46;
 CN.glow(c,cx,-74,30+14*L,L>.5?PAL.yl:[170,200,255],.35+.4*(L>.5?L:1-L));CN.circle(c,cx,-74,11,22,1.2,L>.5?PAL.yl:[170,200,255],.95,t*.4,1);
 if(L<.5){c.globalAlpha=.9;c.fillStyle="#02030a";c.beginPath();c.arc(cx+5,-76,10,0,TAU);c.fill()}
 CN.txt(S,L>.5?rl(["light","نور"]):rl(["dark","ضلمة"]),cx+34,-74,{al:"left",sz:12,col:"yl"});
 for(let i=0;i<=30;i++){const a=PI+i/30*PI;CN.glow(c,cx+cos(a)*R,cy+sin(a)*R+30,i%5?1.4:2.4,PAL.wh,i%5?.4:.9)}
 const na=PI+L*PI;CN.line(c,cx,cy+30,cx+cos(na)*(R-6),cy+30+sin(na)*(R-6),PAL.cy,.95,1.8);CN.glow(c,cx,cy+30,6,PAL.cy,1);CN.glow(c,cx+cos(na)*(R-6),cy+30+sin(na)*(R-6),4,PAL.cy,.9);
 CN.txt(S,"LDR  A0",cx,cy+46,{sz:11,col:"cy"});
 const br=1-L,lx=0,ly=70;CN.glow(c,lx,ly,34*br+8,PAL.yl,.5*br+.05);CN.glow(c,lx,ly,12,PAL.yl,.3+.7*br);CN.circle(c,lx,ly,10,16,1,PAL.yl,.8,t,1);
 CN.txt(S,"LED",lx+30,ly,{al:"left",sz:11,col:"yl"});CN.txt(S,Math.round(br*255),lx-30,ly,{al:"right",sz:12,col:"yl",mono:1});
 CN.dline(c,cx,-62,cx,-8,10,1,PAL.wh,.3,-t*.4);CN.dline(c,cx,cy+54,cx,ly-14,6,1.3,PAL.yl,.7,-t*.4);
 S.camT=S.b===1?{z:1.4,x:0,y:-20}:S.b===2?{z:1.4,x:0,y:50}:{z:1,x:0,y:0};cp(S,v,"yl");if(p.tag)CN.txt(S,p.tag,0,0,{abs:1,dy:36*S.k,sz:11,col:"wh",glow:6})};

/* ============ flow: current as glowing particles through a resistor ============ */
SC.flow=S=>{const c=S.c,t=S.t,p=S.p,r=p.r||2,x0=-92,x1=92,y0=-44,y1=44,per=2*(x1-x0)+2*(y1-y0);
 const at=d=>{d=((d%per)+per)%per;if(d<x1-x0)return[x0+d,y0];d-=x1-x0;if(d<y1-y0)return[x1,y0+d];d-=y1-y0;if(d<x1-x0)return[x1-d,y1];d-=x1-x0;return[x0,y1-d]};
 for(let i=0;i<160;i++){const q=at(i/160*per);CN.glow(c,q[0],q[1],1,PAL.cy,.3)}
 /* battery */
 CN.glow(c,x0,0,18,PAL.gr,.28);CN.line(c,x0-10,-8,x0+10,-8,PAL.gr,.95,2.4);CN.line(c,x0-6,2,x0+6,2,PAL.gr,.95,2.4);CN.line(c,x0-10,12,x0+10,12,PAL.gr,.95,2.4);CN.txt(S,p.v||"5V",x0-24,2,{sz:13,col:"gr"});
 /* resistor zig-zag on top edge */
 const heat=.4+.5*sin(t*6);c.globalAlpha=.95;c.strokeStyle="rgb(255,154,86)";c.lineWidth=1.8;c.beginPath();c.moveTo(-26,y0);for(let i=0;i<7;i++)c.lineTo(-26+(i+1)*52/8,y0+(i%2?-7:7));c.lineTo(26,y0);c.stroke();
 CN.glow(c,0,y0,28,PAL.or,.15+.2*heat*r/3);CN.txt(S,p.rl||"R",0,y0-18,{sz:14,col:"or"});
 /* LED */
 const br=clamp(1.15-r*.28,.15,1),lx=x1,ly=0;CN.glow(c,lx,ly,34*br+8,PAL.yl,.4*br+.05);CN.glow(c,lx,ly,12,PAL.yl,.3+.7*br);CN.circle(c,lx,ly,10,16,1,PAL.yl,.8,t,1);
 /* current particles: slow and bright through the resistor */
 const n=9-r*2+2,spd=22+(5-r)*5;
 for(let i=0;i<n*3;i++){const d=(t*spd+i/(n*3)*per)%per,q=at(d),inR=q[1]===y0&&q[0]>-26&&q[0]<26;CN.glow(c,q[0]+(inR?sin(t*30+i)*1.2:0),q[1]+(inR?cos(t*28+i)*2:0),inR?2.6:2.1,inR?PAL.or:PAL.yl,inR?1:.85)}
 CN.txt(S,p.i||"I",0,y1+16,{sz:14,col:"yl"});
 if(p.note)CN.txt(S,p.note,0,0,{sz:15,col:"wh"});
 S.camT=S.b===1?{z:1.5,x:0,y:y0}:S.b===2?{z:1.35,x:x1-20,y:0}:{z:1,x:0,y:0}};

/* ============ cycle: a head that hops around a ring ============ */
SC.cycle=S=>{const c=S.c,t=S.t,p=S.p,it=p.items,n=it.length,ghost=!!p.col,m=n+(ghost?1:0),R=M.min(74,S.H/S.U*.36),sp0=1.05,k=M.floor(t*sp0)%n,fr=(t*sp0)%1,rgb=col(p.col||C.vi);
 for(let i=0;i<m;i++){const a=-PI/2+i/m*TAU,x=cos(a)*R,y=sin(a)*R*.92,isG=ghost&&i===n,act=!isG&&i===k;
  const g=eb((t-i*.15)/.5),rr=(act?15:12)*g;if(g<=0)continue;
  if(isG){c.globalAlpha=.5;c.strokeStyle="rgb(255,95,95)";c.setLineDash([2,3]);c.lineWidth=1;c.beginPath();c.arc(x,y,12,0,TAU);c.stroke();c.setLineDash([]);CN.txt(S,"5 \u2715",x,y,{sz:13,col:"rd",a:.9})}
  else{CN.orb(c,x,y,rr,rgb,act?1:.55,t,.5);if(act)CN.glow(c,x,y,rr*1.2,rgb,.5);CN.txt(S,it[i],x,y,{sz:act?17:14,col:act?"wh":(p.col?"or":"vi"),a:act?1:.8})}}
 /* head travelling between the nodes */
 const a0=-PI/2+k/m*TAU,a1=-PI/2+((k+1)%m)/m*TAU+(k+1>=m?TAU:0),a=lerp(a0,a1,ease(fr));
 for(let j=0;j<10;j++){const aa=a-j*.05;CN.glow(c,cos(aa)*R,sin(aa)*R*.92,3-j*.2,rgb,.8-j*.07)}
 CN.glow(c,cos(a)*R,sin(a)*R*.92,5,[255,255,255],1);
 CN.txt(S,p.mid||"",0,-3,{mono:1,sz:17,col:"wh",glow:14});CN.txt(S,rl(["loop","لفّة"])+" "+(M.floor(t*sp0/n)+1),0,14,{sz:11,col:"cy",a:.8});
 S.camT=S.b===1?{z:1.45,x:cos(a0)*R*.6,y:sin(a0)*R*.55}:{z:S.b===2?1.15:1,x:0,y:0};cp(S,p.tag,"yl")};

/* ============ box: variables as glowing containers that fill ============ */
SC.box=S=>{const c=S.c,t=S.t,it=S.p.items,n=it.length,two=n<=2,cols=two?n:2,cw=two?104:112,rh=two?0:92;
 it.forEach((d,i)=>{const cx=two?(i-(n-1)/2)*cw:((i%2)-.5)*cw,cy=two?0:(M.floor(i/2)-(M.ceil(n/2)-1)/2)*rh,g=eb((t-.3-i*.45)/.8);if(g<=0)return;
  const rgb=col(d[2]),w=two?30:23,y=cy+(1-g)*-40,h=two?28:21;
  /* iso box wireframe */
  const A=[[cx-w,y-h+6],[cx+w,y-h+6],[cx+w,y+h+6],[cx-w,y+h+6]],T=[[cx-w+9,y-h-4],[cx+w+9,y-h-4]];
  for(let k=0;k<4;k++)CN.dline(c,A[k][0],A[k][1],A[(k+1)%4][0],A[(k+1)%4][1],10,1.1,rgb,.9,0);
  CN.dline(c,A[0][0],A[0][1],T[0][0],T[0][1],4,1,rgb,.7,0);CN.dline(c,A[1][0],A[1][1],T[1][0],T[1][1],4,1,rgb,.7,0);CN.dline(c,T[0][0],T[0][1],T[1][0],T[1][1],10,1,rgb,.7,0);CN.dline(c,T[1][0],T[1][1],A[1][0]+9,A[2][1]-10,6,1,rgb,.7,0);
  CN.glow(c,cx,y+6,w*1.5,rgb,.14+.1*sin(t*2+i));
  CN.txt(S,d[1],cx,y+6,{sz:d[1].length>5?14:19,col:d[2],mono:1});
  CN.txt(S,d[0],cx,y-h-(two?14:11),{sz:13,col:d[2],mono:1});if(d[3])CN.txt(S,d[3],cx,y+h+(two?20:15),{sz:11,col:"wh",a:.85});
  if(g<1)for(let k=0;k<8;k++)CN.glow(c,cx+(Math.random()-.5)*w*2,y+(Math.random()-.5)*h*2,2,rgb,.5)});
 S.camT=S.b===1?{z:1.35,x:(two?-cw/2:-cw/2)*.6,y:0}:S.b===2?{z:1.1,x:0,y:0}:{z:1,x:0,y:0};cp(S,S.p.tag&&S.p.tag[0]?S.p.tag:"",S.p.tag?"yl":null)};

/* ============ radar: the Doppler effect, wavefronts bunch up ahead of the satellite ============ */
IN.radar=S=>{S.st.em=[]};
SC.radar=S=>{const c=S.c,t=S.t,st=S.st,cyc=9,u=(t%cyc)/cyc,sx=-112+u*224,sy=-34+M.sin(u*PI)*-8,gx=0,gy=62;
 if(S.dt>0&&(st.last==null||t-st.last>.42||t<st.last)){st.em.push({x:sx,y:sy,t0:t});st.last=t}
 st.em=st.em.filter(e=>t-e.t0<4.2);
 const app=sx<gx;
 for(const e of st.em){const r=(t-e.t0)*44;c.globalAlpha=.6*M.max(0,1-r/180);c.strokeStyle=`rgb(${app?PAL.bl:PAL.pk})`;c.lineWidth=1;c.beginPath();c.arc(e.x,e.y,r,0,TAU);c.stroke()}
 CN.sat(S,sx,sy,0,1.8,app?PAL.cy:PAL.pk,1);
 CN.line(c,gx,gy,gx,gy-12,PAL.wh,.9,1.2);c.globalAlpha=.9;c.strokeStyle="rgb(255,255,255)";c.lineWidth=1.2;c.beginPath();c.arc(gx,gy-12,8,PI,0);c.stroke();CN.glow(c,gx,gy-12,6,PAL.or,.9);
 /* received wave: dense when approaching, stretched when leaving */
 const fq=app?.5:.2,wx=-26;
 CN.trace(S,x=>gy+20+sin((x-wx)*fq*1+t*0)*7+0,-60,60,160,app?PAL.cy:PAL.pk,.95,1.4);
 CN.txt(S,app?rl(["higher","أعلى"]):rl(["lower","أقل"]),0,gy+38,{sz:12,col:app?"cy":"pk"});
 CN.txt(S,app?"\u2191":"\u2193",sx,sy-16,{sz:20,col:app?"cy":"pk"});
 S.camT=S.b===1?{z:1.6,x:sx*.7,y:sy*.5}:S.b===2?{z:1.5,x:0,y:50}:{z:1.2,x:0,y:10};cp(S,S.p.sub,"pk");if(S.p.tag)CN.txt(S,S.p.tag,0,-76,{sz:18,col:"wh",glow:14})};

/* ============ motor: a particle rotor, speed from PWM, direction from the H-bridge ============ */
SC.motor=S=>{const c=S.c,t=S.t,cyc=12,u=t%cyc,dir=u<6?1:-1,duty=u<6?.25+.65*ease(u/5):.25+.65*ease((u-6)/5),w=dir*duty*6;
 S.st.a=(S.st.a||0)+w*S.dt;const a0=S.st.a,R=34,cx=0,cy=-12;
 CN.glow(c,cx,cy,R*1.7,PAL.cy,.1+.18*duty);CN.circle(c,cx,cy,R,56,1.3,PAL.cy,.9,a0,1);CN.circle(c,cx,cy,R*.5,24,1,PAL.vi,.7,-a0,1);
 for(let k=0;k<3;k++){const a=a0+k*TAU/3;CN.dline(c,cx,cy,cx+cos(a)*R,cy+sin(a)*R,12,1.3,PAL.cy,.85,0);CN.glow(c,cx+cos(a)*R,cy+sin(a)*R,4,PAL.yl,.9)}
 CN.glow(c,cx,cy,7,[255,255,255],1);
 for(let i=0;i<4;i++){const a=dir*(t*1.6+i*TAU/4),rr=R+13;CN.glow(c,cx+cos(a)*rr,cy+sin(a)*rr,2.4,dir>0?PAL.gr:PAL.or,.9)}
 CN.txt(S,dir>0?rl(["FORWARD","للأمام"]):rl(["REVERSE","للخلف"]),cx,cy-R-16,{sz:14,col:dir>0?"gr":"or"});
 CN.dline(c,-110,cy,-R-6,cy,10,1,PAL.wh,.3,0);CN.dline(c,R+6,cy,110,cy,10,1,PAL.wh,.3,0);
 CN.txt(S,dir>0?"+":"-",-100,cy-10,{sz:15,col:dir>0?"gr":"or"});CN.txt(S,dir>0?"-":"+",100,cy-10,{sz:15,col:dir>0?"or":"gr"});
 /* PWM trace shows the duty */
 const per=44;CN.trace(S,x=>66-(((x+t*40)%per+per)%per/per<duty?1:0)*18,-100,100,220,PAL.yl,.9,1.2);
 CN.txt(S,"PWM "+Math.round(duty*100)+"%",-100,48,{al:"left",sz:11,col:"yl"});
 S.camT=S.b===1?{z:1.4,x:0,y:-12}:S.b===2?{z:1.3,x:0,y:50}:{z:1,x:0,y:0};cp(S,S.p.tag,"cy");if(S.p.sub)CN.txt(S,S.p.sub,0,0,{abs:1,dy:34*S.k,mono:1,sz:11,col:"wh",glow:6})};

/* ============ gnss: ranges from satellites intersect on the receiver ============ */
SC.gnss=S=>{const c=S.c,t=S.t,gx=0,gy=58,n=Math.min(4,S.p.n||4),sats=[];
 const cyc=9,u=t%cyc,err=M.max(2,22*M.exp(-u*.48));
 for(let i=0;i<n;i++){const x=-96+i*64+sin(t*.5+i)*5,y=-66-(i%2)*8+cos(t*.4+i)*3,rgb=[PAL.cy,PAL.pk,PAL.vi,PAL.or][i];sats.push([x,y,rgb])}
 for(const s of sats){const d=M.hypot(s[0]-gx,s[1]-gy),a0=M.atan2(gy-s[1],gx-s[0]);
  CN.sat(S,s[0],s[1],.3,2.6,s[2],1);CN.dline(c,s[0],s[1],gx,gy,12,1.2,s[2],.6,-t*.4);
  c.globalAlpha=.9;c.strokeStyle=`rgb(${s[2]})`;c.lineWidth=1.3;c.beginPath();c.arc(s[0],s[1],d+((err/22)-.1)*sin(t)*4,a0-.17,a0+.17);c.stroke();
  c.globalAlpha=.14;c.lineWidth=.8;c.beginPath();c.arc(s[0],s[1],d,a0-.6,a0+.6);c.stroke()}
 for(let i=0;i<46;i++){const a=i*2.4+t*.7,r=err*(.3+.7*((i*37)%10)/10);CN.glow(c,gx+cos(a)*r,gy+sin(a)*r*.7,1.5,PAL.yl,.7)}
 CN.glow(c,gx,gy,8,PAL.gr,.9);CN.glow(c,gx,gy,3,[255,255,255],1);CN.circle(c,gx,gy,err+4,M.max(12,err*2|0),1,PAL.yl,.6,t,.7);
 CN.callout(S,gx,gy,err>8?rl(["~"+Math.round(err*.3)+" m","~"+Math.round(err*.3)+" م"]):rl(["a few cm","سنتيمترات"]),30,22,err>8?"yl":"gr",1);
 S.camT=S.b===1?{z:1.7,x:gx,y:gy-6}:S.b===2?{z:1.2,x:0,y:0}:{z:1.25,x:0,y:10};cp(S,S.p.tag,"gr")};

/* any unknown scene: a pulsing orb with its tag */
SC.fallback=S=>{CN.orb(S.c,0,0,30,PAL.cy,1,S.t,.6);cp(S,S.p.tag)};
})();
