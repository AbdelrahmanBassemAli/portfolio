"use strict";
/* Mission Lab Reels CINE v20, part 2: concept visuals drawn as glowing particles.
   chain, bars, duel, code, wave, net (kalman / knn / neuron / training), bot, table, sw, bread. */
(function(){
if(!window.CN)return;
const {PAL,col,sp,ease,eo,eb,clamp,lerp,rng,TAU}=CN;const M=Math,sin=M.sin,cos=M.cos,PI=M.PI;
const SC=CN.sc,IN=CN.ini,rl=x=>rsL(x);
const hz=S=>S.W/S.H>1.15;
const cp=(S,txt,rgb)=>{if(txt)CN.cap(S,rl(txt),14,14,rgb||"yl")};
const mono=(c,px)=>{c.font=`700 ${px}px ui-monospace,Menlo,Consolas,monospace`};

/* ============ chain: glowing nodes linked by flowing particles ============ */
IN.chain=S=>{const n=S.p.nodes.length,h=hz(S);S.st.h=h;
 S.st.pos=S.p.nodes.map((_,i)=>h?[(i-(n-1)/2)*(n>3?64:80),(i%2?11:-11)]:[(i%2?1:-1)*36,(i-(n-1)/2)*(n>3?50:62)]);
 S.st.r=h?(n>3?19:23):(n>3?17:20)};
SC.chain=S=>{const c=S.c,t=S.t,nd=S.p.nodes,n=nd.length,P=S.st.pos,r=S.st.r,head=(t*.5)%(n+.7);
 for(let i=0;i<n-1;i++){const a=P[i],b=P[i+1],on=ease((t-.25-i*.4)/.7),dx=b[0]-a[0],dy=b[1]-a[1],L=M.hypot(dx,dy),ux=dx/L,uy=dy/L;
  const x1=a[0]+ux*r*1.25,y1=a[1]+uy*r*1.25,x2=b[0]-ux*r*1.25,y2=b[1]-uy*r*1.25,act=M.exp(-M.pow(head-i-.5,2)*2.2);
  CN.dline(c,x1,y1,x2,y2,16,.7,PAL.wh,.22*on,0);
  CN.dline(c,x1,y1,x2,y2,6,1.6+act,col(nd[i+1][2]),(.3+.7*act)*on,-t*.8+i*.3);
  if(S.p.k&&0)0}
 for(let i=0;i<n;i++){const[x,y]=P[i],g=eb((t-i*.4)/.7),act=M.exp(-M.pow(head-i,2)*3),rgb=col(nd[i][2]),rr=r*g*(1+.08*act);if(g<=0)continue;
  CN.orb(c,x,y,rr,rgb,.55+.45*act,t,i%2?.5:-.5);CN.glow(c,x,y,rr*.95,rgb,.2+.4*act);
  CN.circle(c,x,y,rr*.62,18,.8,[255,255,255],.35+.4*act,-t*.9,1);
  CN.txt(S,nd[i][0],x,y,{px:rr*S.U*S.cam.z*1.05,glow:0,fill:"#fff",w:400,a:g});
  CN.txt(S,nd[i][1],x,y+rr*1.62,{sz:12,col:nd[i][2],a:g})}
 const f=Math.floor(n/2);
 S.camT=S.b===1?{z:1.28,x:P[f][0]*.7,y:P[f][1]*.7}:S.b===2?{z:1.15,x:P[n-1][0]*.7,y:P[n-1][1]*.7}:{z:1,x:0,y:0};
 cp(S,S.p.tag)};

/* ============ bars: columns of streaming particles ============ */
SC.bars=S=>{const c=S.c,t=S.t,B=S.p.bars,n=B.length,rowH=n>4?31:37,top=-(n-1)/2*rowH-2,xs=-62,Lm=138;let mx=0,mi=0;
 B.forEach((b,i)=>{if(b[1]>mx){mx=b[1];mi=i}});
 B.forEach((b,i)=>{const y=top+i*rowH,g=ease((t-.25-i*.3)/1.2),len=b[1]*Lm*g,rgb=col(b[2]);
  CN.txt(S,b[0],-124,y,{al:"left",sz:12,col:b[2],a:ease((t-i*.3)/.5)});
  CN.dline(c,xs,y,xs+Lm,y,40,.55,PAL.wh,.16,0);
  const cnt=len/2.6|0;
  for(let j=0;j<cnt;j++){const x=xs+j*2.6,w=.55+.45*sin(t*5-j*.4+i);for(let k=-1;k<=1;k++){CN.glow(c,x,y+k*3.2,1.5,rgb,.4*w+.1)}}
  if(g>0){CN.glow(c,xs+len,y,10,rgb,.5);CN.glow(c,xs+len,y,4,[255,255,255],.95);
   if(b[3])CN.txt(S,b[3],xs+len+8,y,{al:"left",sz:12,col:b[2],a:g})}});
 if(S.p.line!=null){const x=xs+S.p.line*Lm,h=n*rowH/2+6;CN.dline(c,x,-h,x,h,22,.9,PAL.pk,.8,-t*.3);CN.glow(c,x,-h,5,PAL.pk,.9)}
 const hy=top+mi*rowH;
 S.camT=S.b===1?{z:1.3,x:xs+mx*Lm*.5,y:hy*.8}:S.b===2?{z:1.05,x:0,y:0}:{z:1,x:0,y:0};
 cp(S,S.p.tag)};

/* ============ duel: two glowing subjects, a spark gap between ============ */
SC.duel=S=>{const c=S.c,t=S.t,A=S.p.a,B=S.p.b,h=hz(S),ra=h?27:24;
 const pa=h?[-66,0]:[0,-54],pb=h?[66,0]:[0,54];
 [[A,pa,PAL.cy,0],[B,pb,PAL.pk,1]].forEach(([d,p,rgb,i])=>{const g=eb((t-i*.35)/.8),bob=sin(t*1.7+i*2)*3,x=p[0],y=p[1]+(h?bob:bob*.7),r=ra*g;if(g<=0)return;
  CN.orb(c,x,y,r,rgb,.9,t,i?-.5:.5);CN.glow(c,x,y,r*.9,rgb,.25);CN.circle(c,x,y,r*.66,16,.8,[255,255,255],.3,t*.8,1);
  if(d[2]!=null){const v=d[2]*ease((t-.6)/1.4);CN.circle(c,x,y,r*1.45,M.max(2,56*v|0),1.1,rgb,.9,-PI/2,1);
   for(let k=0;k<56*v;k+=2){const a=-PI/2+k/56*TAU;c.globalAlpha=.9;c.drawImage(sp(rgb),x+cos(a)*r*1.45-1.1,y+sin(a)*r*1.45-1.1,2.2,2.2)}}
  CN.txt(S,d[0],x,y,{px:r*S.U*S.cam.z*1.1,glow:0,fill:"#fff",w:400,a:g});
  CN.txt(S,d[1],x,y+(h?r*1.95:r*1.85),{sz:13,col:i?"pk":"cy",a:g})});
 /* sparks between */
 const mx=(pa[0]+pb[0])/2,my=(pa[1]+pb[1])/2;
 CN.glow(c,mx,my,10+3*sin(t*5),PAL.yl,.5);
 for(let i=0;i<16;i++){const u=((t*.45+i/16)%1),dir=i%2?1:-1,x=lerp(pa[0],pb[0],i%2?u:1-u),y=lerp(pa[1],pb[1],i%2?u:1-u)+sin(u*12+i)*3;CN.glow(c,x,y,1.8,i%2?PAL.pk:PAL.cy,.8*M.sin(u*PI))}
 CN.txt(S,"VS",mx,my,{sz:15,col:"yl",glow:14});
 S.camT=S.b===1?{z:1.3,x:pa[0]*.8,y:pa[1]*.8}:S.b===2?{z:1.3,x:pb[0]*.8,y:pb[1]*.8}:{z:1,x:0,y:0};
 cp(S,S.p.tag)};

/* ============ code: glowing terminal that types itself ============ */
const KW=/^(def|for|in|while|return|from|import|print|range|if|else|True|False)$/;
function tokz(l){const out=[],re=/(#.*$)|("[^"]*"|'[^']*')|([A-Za-z_]\w*)|(\d+(?:\.\d+)?)|([^A-Za-z_\d#"']+)/g;let m;
 while((m=re.exec(l))){out.push([m[0],m[1]?"#7f93c4":m[2]?"#7dffb0":m[3]?(KW.test(m[3])?(m[3]==="print"||m[3]==="range"?"#8ef3ff":"#d7a8ff"):"#ffffff"):m[4]?"#ffd479":"#cfe2ff"])}
 return out}
IN.code=S=>{const L=S.p.lines;S.st.mx=M.max(12,...L.map(l=>l.length));S.st.tot=L.reduce((a,l)=>a+l.length+4,0);S.st.burst=[]};
SC.code=S=>{const c=S.c,t=S.t,L=S.p.lines,n=L.length,fs=M.min(222*.9/(S.st.mx*.6),13),cw=fs*.6,lh=fs*1.6,pw=222,ph=n*lh+lh*3.7,px0=-pw/2,py0=-ph/2;
 const typed=t*20-4;let cum=0,lineY={};
 /* frame */
 c.strokeStyle="rgb(86,228,255)";c.lineWidth=.9;c.globalAlpha=.16;CN.rrect(c,px0-3,py0-3,pw+6,ph+6,9);c.lineWidth=5;c.stroke();
 c.globalAlpha=.8;c.lineWidth=.9;CN.rrect(c,px0,py0,pw,ph,7);c.stroke();
 c.globalAlpha=.07;c.fillStyle="#56e4ff";CN.rrect(c,px0,py0,pw,ph,7);c.fill();
 [[PAL.rd],[PAL.yl],[PAL.gr]].forEach((q,i)=>CN.glow(c,px0+9+i*9,py0+8,3.4,q[0],.95));
 c.globalCompositeOperation="source-over";mono(c,fs*.75);c.fillStyle="rgba(150,175,225,.75)";c.textAlign="right";c.fillText(S.p.file||"main.py",px0+pw-8,py0+10);
 /* lines */
 mono(c,fs);c.textAlign="left";c.textBaseline="middle";
 let curX=0,curY=0,done=true;
 for(let i=0;i<n;i++){const y=py0+lh*1.9+i*lh,l=L[i],cnt=clamp(typed-cum,0,l.length);cum+=l.length+4;if(cnt<l.length)done=false;lineY[i]=y;
  if(i===S.p.hi&&cnt>0){c.globalCompositeOperation="lighter";const pulse=.1+.07*sin(t*4);c.fillStyle=`rgba(255,212,121,${pulse+(S.b===1?.1:0)})`;c.fillRect(px0+3,y-lh/2,pw-6,lh);c.fillStyle="rgba(255,212,121,.95)";c.fillRect(px0+3,y-lh/2,2,lh);c.globalCompositeOperation="source-over"}
  let x=px0+12,used=0;for(const tk of tokz(l)){if(used>=cnt)break;const s=tk[0].slice(0,cnt-used);used+=tk[0].length;c.fillStyle=tk[1];c.shadowColor=tk[1];c.shadowBlur=i===S.p.hi?7:3;c.fillText(s,x,y);x+=tk[0].length*cw}
  c.shadowBlur=0;
  if(cnt>0&&cnt<=l.length&&!(cnt===l.length&&typed-cum+l.length+4>4)){curX=px0+12+cnt*cw;curY=y}}
 if(typed>0&&(((t*2)|0)%2===0||!done)){c.fillStyle="#fff";c.fillRect(curX+1,curY-lh*.4,cw*.6,lh*.8)}
 /* output */
 const oy=py0+ph-lh*1.1;c.globalCompositeOperation="lighter";c.fillStyle="rgba(109,240,168,.1)";c.fillRect(px0+3,oy-lh*.62,pw-6,lh*1.24);c.globalCompositeOperation="source-over";
 const ot=clamp(typed-S.st.tot-6,0,99)/16;
 mono(c,fs);c.fillStyle="#6df0a8";c.shadowColor="#6df0a8";c.shadowBlur=9;const outT=rl(S.p.out||"");c.fillText("> "+outT.slice(0,M.min(outT.length,M.floor(ot*outT.length)+(ot>0?1:0))),px0+12,oy);c.shadowBlur=0;
 c.globalCompositeOperation="lighter";
 if(ot>0&&ot<.15&&S.st.burst.length<60)for(let k=0;k<6;k++)S.st.burst.push({x:px0+20,y:oy,vx:(Math.random()-.2)*60,vy:(Math.random()-.5)*60,l:1});
 for(const b of S.st.burst){b.x+=b.vx*S.dt;b.y+=b.vy*S.dt;b.l-=S.dt*1.6;if(b.l>0)CN.glow(c,b.x,b.y,2.4,PAL.gr,b.l)}
 S.st.burst=S.st.burst.filter(b=>b.l>0);
 const hy=lineY[S.p.hi!=null?S.p.hi:0]||0;
 S.camT=S.b===1?{z:1.28,x:0,y:hy*.7}:S.b===2?{z:1.22,x:0,y:oy*.7}:{z:1,x:0,y:0}};

/* ============ wave: oscilloscope trace + lamp ============ */
SC.wave=S=>{const c=S.c,t=S.t,p=S.p,k=p.kind,duty=(p.duty||50)/100,sc=44;
 const f=u=>{if(k==="digital"){const b=[0,1,1,0,1,0,0,1,1,0][M.floor(u/26+100)%10];const e=(u/26)%1;return b}
  if(k==="analog")return .5+.36*sin(u/17)+.12*sin(u/6.3);if(k==="clock")return(M.floor(u/16)%2)?1:0;return(((u%62)+62)%62)/62<duty?1:0};
 /* axes + levels */
 CN.dline(c,-122,34,86,34,50,.6,PAL.wh,.25,0);CN.dline(c,-122,-36,86,-36,50,.6,PAL.wh,.25,0);
 CN.txt(S,p.hi||"HIGH",-124,-47,{al:"left",sz:11,col:"gr",a:.9});CN.txt(S,p.lo||"LOW",-124,45,{al:"left",sz:11,col:"or",a:.9});
 const u0=t*38;
 if(k==="pwm"){/* shade ON windows */
  c.fillStyle="rgba(109,240,168,.14)";c.globalAlpha=1;
  for(let m=-3;m<6;m++){const x0=-122+((m*62-u0)%(62*8)+62*8)%(62*8)-62;if(x0<-122||x0+duty*62>86)continue;c.fillRect(x0,-36,duty*62,70)}}
 const pts=CN.trace(S,x=>34-f(x+u0)*70,-122,86,k==="analog"?120:240,PAL.cy,.95,1.5);
 for(let i=0;i<pts.length;i+=5){CN.glow(c,pts[i][0],pts[i][1],2.2,PAL.cy,.55)}
 /* the lamp */
 let br=k==="pwm"?duty:k==="analog"?f(86+u0):f(86+u0)*.9+.1;if(k==="clock")br=f(86+u0);
 const lx=108,ly=0;
 CN.dline(c,86,34-f(86+u0)*70,lx-14,ly,8,.8,PAL.cy,.5,-t*.5);
 CN.glow(c,lx,ly,40*br+8,PAL.yl,.5*br+.05);CN.glow(c,lx,ly,15,PAL.yl,.35+.6*br);CN.circle(c,lx,ly,13,18,.9,PAL.yl,.6+.4*br,t,1);
 for(let i=0;i<10;i++){const a=i/10*TAU+t*.4;CN.glow(c,lx+cos(a)*(20+8*br),ly+sin(a)*(20+8*br),1.3,PAL.yl,br*.8)}
 CN.txt(S,p.tag,0,-72,{sz:19,col:"wh",glow:14});
 if(p.sub)CN.txt(S,p.sub,0,0,{abs:1,dy:14*S.k,sz:13,col:"yl",glow:10});
 S.camT=S.b===1?{z:1.35,x:-40,y:0}:S.b===2?{z:1.3,x:80,y:0}:{z:1,x:0,y:0}};

/* ============ net: neural net / kalman / knn / neuron / training ============ */
IN.net=S=>{const L=S.p.layers,nl=L.length,sx=nl>3?66:nl>2?84:112;
 S.st.pos=L.map((m,i)=>Array.from({length:m},(_,j)=>[(i-(nl-1)/2)*sx,(j-(m-1)/2)*(m>3?30:36)]));
 const r=rng(S.idx+5);S.st.pts=Array.from({length:48},(_,i)=>{const cl=i%2;return{x:(cl?32:-30)+(r()-.5)*70,y:(cl?-12:20)+(r()-.5)*56,c:cl}})};
function nn(S,oy,sc){const c=S.c,t=S.t,P=S.st.pos,nl=P.length,wv=(t*.55)%(nl+1),train=S.p.v==="train",neuron=S.p.v==="neuron";
 c.save();c.translate(0,oy);c.scale(sc,sc);
 for(let i=0;i<nl-1;i++)P[i].forEach((a,ai)=>P[i+1].forEach((b,bi)=>{
  const ph=(((t*.5-i*.28+ai*.13+bi*.07)%1)+1)%1,w=sin(ai*2.1+bi*1.3+i);
  const rgb=train?(sin(t*1.2+ai+bi)>0?PAL.cy:PAL.pk):(w>0?PAL.cy:PAL.vi);
  const ex=M.exp(-M.pow(wv-i-.5,2)*1.6);
  c.globalAlpha=.1+.28*ex;c.strokeStyle=`rgb(${rgb})`;c.lineWidth=.6;c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();
  CN.glow(c,lerp(a[0],b[0],ph),lerp(a[1],b[1],ph),1.8,rgb,.35+.6*ex);
  if(neuron&&i===0&&bi===0){CN.txt(S,"w"+(ai+1),(a[0]+b[0])/2*sc,(a[1]+b[1])/2*sc+oy-5*sc,{sz:11,col:"yl"})}}));
 for(let i=0;i<nl;i++)P[i].forEach((a,j)=>{const act=M.exp(-M.pow(wv-i,2)*2.4),g=eb((t-i*.25-j*.05)/.6),rgb=i===nl-1?PAL.yl:i?PAL.cy:PAL.gr;if(g<=0)return;
  CN.orb(c,a[0],a[1],(neuron&&i===nl-1?13:8)*g*(1+.18*act),rgb,.5+.5*act,t,.8);CN.glow(c,a[0],a[1],7,rgb,.25+.5*act);
  if(neuron&&i===0)CN.txt(S,"x"+(j+1),(a[0]-20)*sc,a[1]*sc+oy,{sz:12,col:"gr"})});
 c.restore()}
function kalman(S){const c=S.c,t=S.t,u0=t*26,tr=x=>-4+30*sin((x+u0)/30);
 CN.dline(c,-122,0,122,0,60,.5,PAL.wh,.12,0);
 const r=rng(3+(t*7|0)%5);
 for(let i=0;i<86;i++){const x=-118+i*2.75,y=tr(x),w=sin(i*12.9898+t*1.9)*43758.5453;const n1=(w-M.floor(w)-.5)*44,n2=(M.sin(i*7.1+t*2.3)*5e4%1)*40;
  CN.glow(c,x,y+n1,2.3,PAL.pk,.8);if(S.b>=1)CN.glow(c,x+1,y+n2,2.3,PAL.or,.75)}
 CN.dline(c,-118,tr(-118),118,tr(118),1,.1,PAL.gr,0,0);
 const est=S.b>=2?1:S.b===1?.6:.25;
 CN.trace(S,x=>tr(x)+sin(x*.9+t*3)*5*(1-est)*1.4,-118,118,120,PAL.cy,est,2);
 const px=(i)=>[-118+i*2.75];
 CN.callout(S,-52,tr(-52)-22,rl(["noisy sensor","حساس مزعج"]),14,-22,"pk",.9);
 if(S.b>=1)CN.callout(S,40,tr(40)+22,rl(["sensor B","حساس ب"]),12,26,"or",.9);
 CN.callout(S,100,tr(100),rl(["best estimate","أفضل تقدير"]),-8,-42,"cy",est);
 S.camT=S.b===1?{z:1.25,x:-20,y:0}:S.b===2?{z:1.1,x:30,y:0}:{z:1,x:0,y:0};cp(S,S.p.tag)}
function knn(S){const c=S.c,t=S.t,Pt=S.st.pts,Q=[2,2],cyc=7,u=t%cyc,k=5;
 const d=Pt.map((p,i)=>({i,d:M.hypot(p.x-Q[0],p.y-Q[1])})).sort((a,b)=>a.d-b.d),kr=d[k-1].d;
 const rad=eo(clamp((u-1)/2.2,0,1))*(kr+3),sel=new Set(d.slice(0,k).map(o=>o.i));
 Pt.forEach((p,i)=>{const rgb=p.c?PAL.pk:PAL.cy,on=sel.has(i)&&rad>=d.find(o=>o.i===i).d;const g=eb((t-i*.02)/.5);
  CN.glow(c,p.x,p.y,on?5.5:2.8,rgb,(on?1:.55)*g);if(on){CN.line(c,Q[0],Q[1],p.x,p.y,rgb,.7,.8)}});
 CN.circle(c,Q[0],Q[1],rad,M.max(10,rad*1.6|0),1.1,PAL.yl,.9,t,1);
 const votes=d.slice(0,k).filter(o=>Pt[o.i].c).length,win=votes>k/2?PAL.pk:PAL.cy,done=u>3.4;
 CN.orb(c,Q[0],Q[1],done?10:7,done?win:PAL.wh,1,t,1.2);CN.txt(S,done?"?"+" → "+(votes>k/2?"B":"A"):"?",Q[0],Q[1]-17,{sz:13,col:done?(votes>k/2?"pk":"cy"):"wh"});
 CN.txt(S,"k = "+k,-100,-70,{al:"left",sz:14,col:"yl"});
 S.camT=S.b===1?{z:1.35,x:Q[0],y:Q[1]}:{z:S.b===2?1.15:1,x:0,y:0};cp(S,S.p.tag)}
SC.net=S=>{const v=S.p.v;
 if(v==="kalman")return kalman(S);if(v==="knn")return knn(S);
 const c=S.c,t=S.t;
 if(v==="train"){nn(S,-26,.78);
  /* loss valley with a ball rolling downhill */
  const lo=64,val=x=>lo-34*(1-(x/90)*(x/90)),pts=[];CN.trace(S,x=>lo+4-34*(1-M.min(1,(x/88)*(x/88))),-90,90,60,PAL.vi,.9,1.4);
  const tt=(t%8),bx=80*M.exp(-.55*tt)*(tt<7.4?1:0)+(tt>=7.4?80*M.exp(-.55*0):0)*0;const x=tt<7.4?80*M.exp(-.55*tt):80;const y=lo+4-34*(1-M.min(1,(x/88)*(x/88)));
  CN.glow(c,x,y-5,11,PAL.yl,.9);CN.glow(c,x,y-5,4,[255,255,255],1);
  CN.txt(S,rl(["loss","الخطأ"]),-96,lo-26,{al:"left",sz:11,col:"vi"});
  S.camT=S.b===1?{z:1.25,x:0,y:-10}:S.b===2?{z:1.2,x:0,y:44}:{z:1,x:0,y:0}}
 else if(v==="neuron"){nn(S,0,1);
  /* sum + ReLU */
  const rx=84;c.save();c.translate(rx,-4);CN.line(c,-22,0,22,0,PAL.wh,.35,.7);CN.line(c,0,-22,0,22,PAL.wh,.35,.7);
  CN.trace(S,x=>x<0?0:-x*.9,-22,22,30,PAL.yl,.95,1.6);c.restore();
  CN.txt(S,"ReLU",rx,22,{sz:11,col:"yl"});CN.txt(S,"b",0,-22,{sz:12,col:"vi"});CN.txt(S,"\u03A3",0,0,{px:15*S.k,fill:"#fff"});
  S.camT=S.b===1?{z:1.4,x:0,y:0}:S.b===2?{z:1.25,x:50,y:0}:{z:1,x:0,y:0}}
 else{nn(S,0,1);S.camT=S.b===1?{z:1.3,x:-20,y:0}:S.b===2?{z:1.2,x:30,y:0}:{z:1,x:0,y:0}}
 cp(S,S.p.tag)};

/* ============ bot: parking sonar / line follower / SLAM / motion alarm ============ */
const car=(S,x,y,rgb,a)=>{const c=S.c;c.globalAlpha=.9*a;c.strokeStyle=`rgb(${rgb})`;c.lineWidth=1.3;CN.rrect(c,x-15,y-8,30,12,4);c.stroke();c.globalAlpha=.25*a;c.fillStyle=`rgb(${rgb})`;c.fill();
 CN.glow(c,x-9,y+5,3.5,PAL.wh,.8*a);CN.glow(c,x+9,y+5,3.5,PAL.wh,.8*a);CN.glow(c,x+15,y-2,3,PAL.yl,.9*a)};
IN.bot=S=>{S.st.map=[];S.st.trail=[]};
SC.bot=S=>{const c=S.c,t=S.t,m=S.p.mode;
 if(m==="park"){const gy=38,wall=104,u=t%7,cx=-92+(wall-48+92)*ease(clamp(u/5.2,0,1)),d=wall-(cx+15);
  CN.dline(c,-124,gy+8,124,gy+8,60,.6,PAL.wh,.2,0);
  for(let i=0;i<14;i++)CN.glow(c,wall,gy-i*5.5+4,1.8,PAL.pk,.6+.3*sin(t*3+i));
  const near=d<30,rgb=near?PAL.rd:PAL.cy;car(S,cx,gy,rgb,1);
  for(let w=0;w<5;w++){const r=((t*.9-w*.55)%2.75+2.75)%2.75*60,ang=.55;
   const reach=r<d;c.globalAlpha=reach?.55*(1-r/(d+1)):0;c.strokeStyle=`rgb(${rgb})`;c.lineWidth=1.1;c.beginPath();c.arc(cx+15,gy-2,r,-ang,ang);c.stroke();
   if(r>=d&&r<d*2){const e=r-d;c.globalAlpha=.55*(1-e/(d+1));c.strokeStyle="rgb(255,122,182)";c.beginPath();c.arc(wall,gy-2,e,PI-ang,PI+ang);c.stroke()}}
  c.globalAlpha=.85;CN.line(c,cx+15,gy-24,wall,gy-24,PAL.yl,.8,.8);CN.glow(c,cx+15,gy-24,2.4,PAL.yl,1);CN.glow(c,wall,gy-24,2.4,PAL.yl,1);
  CN.txt(S,Math.round(d*1.1)+" cm",(cx+15+wall)/2,gy-35,{sz:15,col:near?"rd":"yl"});
  if(near&&((t*6)|0)%2)CN.txt(S,"BEEP",cx,gy-42,{sz:13,col:"rd"});
  S.camT=S.b===1?{z:1.3,x:cx+30,y:0}:S.b===2?{z:1.25,x:wall-30,y:10}:{z:1,x:0,y:0}}
 else if(m==="line"&&S.p.tag==="SLAM"){slam(S)}
 else if(m==="line"){
  const pth=u=>[-112+u*224,M.sin(u*TAU*1.3)*34];
  for(let i=0;i<=120;i++){const a=pth(i/120);CN.glow(c,a[0],a[1],1.6,PAL.wh,.5);CN.glow(c,a[0],a[1]+(i%2?2:-2),1,PAL.cy,.4)}
  const u=clamp((t*.1)%1.08,0,1),a=pth(u),b=pth(M.min(1,u+.01)),h=M.atan2(b[1]-a[1],b[0]-a[0]),a2=pth(M.min(1,u+.04)),cur=M.atan2(a2[1]-b[1],a2[0]-b[0])-h;
  const nx=-sin(h),ny=cos(h),L=[a[0]+nx*-8,a[1]+ny*-8],R=[a[0]+nx*8,a[1]+ny*8];
  c.save();c.translate(a[0],a[1]);c.rotate(h);c.globalAlpha=.9;c.strokeStyle="rgb(255,154,86)";c.lineWidth=1.4;CN.rrect(c,-12,-9,24,18,5);c.stroke();c.fillStyle="rgba(255,154,86,.25)";c.fill();c.restore();
  const lOn=cur<-.02||sin(t*5)>.9,rOn=cur>.02;
  [[L,lOn,"L"],[R,rOn,"R"]].forEach(([p,on,n])=>{const q=[p[0]+cos(h)*14,p[1]+sin(h)*14];CN.line(c,p[0],p[1],q[0],q[1],on?PAL.gr:PAL.cy,on?.9:.35,1);CN.glow(c,q[0],q[1],on?6:3,on?PAL.gr:PAL.cy,on?.95:.5);CN.txt(S,n,q[0]+nx*(n==="L"?-1:1)*11,q[1]+ny*(n==="L"?-1:1)*11,{sz:11,col:on?"gr":"cy"})});
  S.camT=S.b===1?{z:1.5,x:a[0],y:a[1]}:S.b===2?{z:1.1,x:0,y:0}:{z:1,x:0,y:0};cp(S,S.p.tag)}
 else{/* motion: frame differencing */
  const cols=18,rows=10,cs=12,x0=-cols*cs/2,y0=-rows*cs/2-6,tt=t*.9;
  const blob=(tm)=>({x:M.sin(tm*.9)*56,y:M.cos(tm*.7)*22,r:26});
  const b1=blob(tt),b0=blob(tt-.4);let ch=0;
  for(let i=0;i<cols;i++)for(let j=0;j<rows;j++){const x=x0+i*cs+cs/2,y=y0+j*cs+cs/2,in1=M.hypot(x-b1.x,y-b1.y)<b1.r,in0=M.hypot(x-b0.x,y-b0.y)<b0.r,chg=in1!==in0;
   if(chg){ch++;c.globalAlpha=.85;c.fillStyle="rgb(255,122,182)";c.fillRect(x-cs/2+1,y-cs/2+1,cs-2,cs-2);CN.glow(c,x,y,cs*.8,PAL.pk,.35)}
   else if(in1){c.globalAlpha=.22;c.fillStyle="rgb(86,228,255)";c.fillRect(x-cs/2+1,y-cs/2+1,cs-2,cs-2)}
   else CN.glow(c,x,y,1.3,PAL.wh,.3)}
  c.globalAlpha=.7;c.strokeStyle="rgb(86,228,255)";c.lineWidth=.9;c.strokeRect(x0,y0,cols*cs,rows*cs);
  CN.txt(S,rl(["frame now","الفريم الحالي"]),x0,y0-9,{al:"left",sz:11,col:"cy"});
  if(ch>5&&((t*5)|0)%2===0)CN.txt(S,rl(["MOTION!","حركة!"]),x0+cols*cs,y0-9,{al:"right",sz:14,col:"pk"});
  CN.txt(S,ch+" "+rl(["pixels changed","بكسل اتغيّر"]),0,y0+rows*cs+16,{sz:13,col:"pk"});
  S.camT=S.b===1?{z:1.35,x:b1.x*.5,y:b1.y*.5}:{z:1,x:0,y:0};cp(S,S.p.tag)}};
function slam(S){const c=S.c,t=S.t,st=S.st;
 const room=[-104,-66,104,66],ob=[-24,-18,24,18];
 const pos=u=>[M.cos(u)*70,M.sin(u)*40];
 const u=t*.5,rp=pos(u),h=u+PI/2;
 if(!st.rays)st.rays=0;
 /* raycast */
 const rc=(ox,oy,dx,dy)=>{let best=1e9;
  const seg=(x1,y1,x2,y2)=>{const ex=x2-x1,ey=y2-y1,den=dx*ey-dy*ex;if(M.abs(den)<1e-9)return;const tt=((x1-ox)*ey-(y1-oy)*ex)/den,uu=((x1-ox)*dy-(y1-oy)*dx)/den;if(tt>0&&uu>=0&&uu<=1&&tt<best)best=tt};
  seg(room[0],room[1],room[2],room[1]);seg(room[2],room[1],room[2],room[3]);seg(room[2],room[3],room[0],room[3]);seg(room[0],room[3],room[0],room[1]);
  seg(ob[0],ob[1],ob[2],ob[1]);seg(ob[2],ob[1],ob[2],ob[3]);seg(ob[2],ob[3],ob[0],ob[3]);seg(ob[0],ob[3],ob[0],ob[1]);return best};
 const sw=t*3.1;
 for(let i=0;i<20;i++){const a=sw+i/20*TAU,d=rc(rp[0],rp[1],cos(a),sin(a));if(d>400)continue;const hx=rp[0]+cos(a)*d,hy=rp[1]+sin(a)*d;
  c.globalAlpha=.1;c.strokeStyle="rgb(86,228,255)";c.lineWidth=.6;c.beginPath();c.moveTo(rp[0],rp[1]);c.lineTo(hx,hy);c.stroke();
  if(i%2===0&&(st.map.length<700)&&Math.random()<.45&&S.dt>0)st.map.push([hx,hy])}
 const tm=S.t>7;
 for(const q of st.map)CN.glow(c,q[0],q[1],1.5,PAL.gr,.8);
 st.tr=st.tr||[];if(S.dt>0&&(S.t*30|0)%2===0)st.tr.push(rp.slice());if(st.tr.length>90)st.tr.shift();
 st.tr.forEach((q,i)=>CN.glow(c,q[0],q[1],1.4,PAL.yl,i/90*.8));
 c.save();c.translate(rp[0],rp[1]);c.rotate(h);CN.glow(c,0,0,14,PAL.or,.55);c.globalAlpha=1;c.strokeStyle="rgb(255,212,121)";c.lineWidth=1.4;CN.rrect(c,-7,-6,14,12,3);c.stroke();CN.glow(c,6,0,3,PAL.wh,1);c.restore();
 CN.callout(S,rp[0],rp[1],rl(["robot pose","موضع الروبوت"]),26,-34,"yl",.95);
 CN.callout(S,-104,-30,rl(["map","الخريطة"]),16,-30,"gr",.9);
 S.camT=S.b===1?{z:1.5,x:rp[0],y:rp[1]}:S.b===2?{z:1,x:0,y:0}:{z:1,x:0,y:0};cp(S,S.p.tag==="SLAM"?"SLAM":S.p.tag)}

/* ============ table: grids of numbers that transform under a scan ============ */
IN.table=S=>{const p=S.p;let src=p.rows,dst=p.fixed&&p.fixed[0]&&p.fixed[0][0]!==""?p.fixed:null;
 if(!src){src=[["10","NaN","9"],["12","4","NaN"],["NaN","5","7"]];dst=[["10","6","9"],["12","4","7"],["8","5","7"]]}
 if(!dst)dst=src.map(r=>r.map(v=>String(Number(v)*2)));S.st.src=src;S.st.dst=dst};
SC.table=S=>{const c=S.c,t=S.t,src=S.st.src,dst=S.st.dst,cw=33,rh=32,sweep=((t*.4)%1.5)*1.25-.12;
 const bad=v=>/NaN|\?|999/.test(v);
 [[-72,src,0],[72,dst,1]].forEach(([gx,g,side])=>{
  c.globalCompositeOperation="lighter";c.globalAlpha=.7;c.strokeStyle=side?"rgb(109,240,168)":"rgb(86,228,255)";c.lineWidth=.9;CN.rrect(c,gx-cw*1.5-4,-rh*1.5-4,cw*3+8,rh*3+8,6);c.stroke();
  c.globalAlpha=.06;c.fillStyle=side?"#6df0a8":"#56e4ff";c.fill();
  g.forEach((row,i)=>row.forEach((v,j)=>{const x=gx+(j-1)*cw,y=(i-1)*rh,reveal=side?(((j+(i*.3))/3)<sweep*1.2):true;
   const show=side&&!reveal?(rl(["·","·"])):(reveal?v:src[i][j]);const isBad=!side&&bad(v)||(side&&!reveal&&bad(src[i][j]));
   const rgb=isBad?PAL.pk:side?PAL.gr:PAL.cy;
   CN.glow(c,x,y,15,rgb,(isBad?.22+.12*sin(t*8+i+j):.12));
   CN.txt(S,show,x,y,{mono:1,sz:13,col:isBad?"pk":side?"gr":"cy",glow:6,a:side&&!reveal?.45:1})}))});
 const sx=-72+ ( (sweep-.12)/ .0001 )*0;const gx2=72-cw*1.5-4+(sweep/1.25)*(cw*3+8);
 if(sweep>0&&sweep<1.2){c.globalAlpha=.85;CN.line(c,gx2,-rh*1.5-8,gx2,rh*1.5+8,PAL.wh,.9,1.4);CN.glow(c,gx2,0,16,PAL.wh,.3)}
 CN.dline(c,-22,0,22,0,6,1.4,PAL.yl,.9,-t*.8);CN.txt(S,S.p.sub&&/\*/.test(S.p.sub)?"x 2":"fix",0,-14,{sz:14,col:"yl"});
 S.camT=S.b===1?{z:1.4,x:72,y:0}:S.b===2?{z:1.1,x:0,y:0}:{z:1,x:0,y:0};
 cp(S,S.p.tag||S.p.sub,S.p.tag?"pk":"yl");if(S.p.tag&&S.p.sub)CN.txt(S,S.p.sub,0,0,{abs:1,dy:(14+22)*S.k,mono:1,sz:12,col:"gr"})};

/* ============ sw: button / floating pin / bounce ============ */
SC.sw=S=>{const c=S.c,t=S.t,m=S.p.mode,u=t%8;
 /* the switch (top) */
 const sx=-60,sy=-52;let closed=0,level=m==="float"?0:0;
 const press=(u>1.4&&u<5.4);
 if(m==="press")closed=(t%5>1.2&&t%5<3.2)?1:0;
 if(m==="bounce")closed=(u>1&&u<5.6)?1:0;
 CN.dline(c,-100,sy,sx-14,sy,12,.8,PAL.wh,.3,0);CN.dline(c,sx+14,sy,100,sy,16,.8,PAL.wh,.3,0);
 CN.glow(c,sx-14,sy,3.4,PAL.wh,.9);CN.glow(c,sx+14,sy,3.4,PAL.wh,.9);
 const ang=closed?0:-.55;c.globalAlpha=.95;c.strokeStyle="rgb(255,212,121)";c.lineWidth=2;c.beginPath();c.moveTo(sx-14,sy);c.lineTo(sx-14+cos(ang)*28,sy+sin(ang)*28);c.stroke();
 if(m!=="float"){CN.glow(c,sx,sy-26,10,PAL.yl,closed?.8:.25);CN.txt(S,rl(["press","اضغط"]),sx,sy-26,{sz:11,col:"yl",a:closed?1:.55})}
 CN.txt(S,rl(["GPIO pin","طرف GPIO"]),100,sy-13,{al:"right",sz:11,col:"cy"});
 if(m==="float"){const pu=u>4;/* pull-up resistor */
  if(pu){c.globalAlpha=.9;c.strokeStyle="rgb(255,154,86)";c.lineWidth=1.4;c.beginPath();c.moveTo(40,sy-30);c.lineTo(40,sy-20);for(let i=0;i<6;i++)c.lineTo(40+(i%2?-5:5),sy-20+(i+1)*3);c.lineTo(40,sy);c.stroke();CN.txt(S,rl(["3.3V","3.3V"]),40,sy-37,{sz:11,col:"or"});CN.txt(S,rl(["pull-up","بول-أب"]),40,sy-49,{sz:11,col:"or"})}
  else CN.txt(S,rl(["floating?","عايم؟"]),40,sy-24,{sz:12,col:"pk",a:.8+.2*sin(t*8)})}
 /* the trace (bottom) */
 const rn=(x)=>M.sin(x*.71+t*13)*M.cos(x*.37-t*9);
 let f;
 if(m==="press")f=x=>34-((t%5>1.2&&t%5<3.2)?1:0)*60;
 else if(m==="float")f=x=>u>4?-26:(8+rn(x)*28);
 else{/* bounce: rapid chatter after the press at u=1 */
  const raw=x=>{const tt=u-(86-x)/38;if(tt<1)return 0;if(tt>5.6)return 0;const k=tt-1;if(k<.55)return(M.sin(k*95)>-.1?1:0);return 1};
  f=x=>34-raw(x)*60}
 CN.dline(c,-120,34,100,34,60,.6,PAL.wh,.18,0);CN.dline(c,-120,-26,100,-26,60,.6,PAL.wh,.18,0);
 CN.trace(S,f,-120,86,m==="float"?150:m==="bounce"?260:150,m==="float"&&u>4?PAL.gr:PAL.cy,.95,1.5);
 if(m==="bounce"){const db=u>=3.6;
  if(db){c.globalAlpha=.16;c.fillStyle="rgb(255,122,182)";c.fillRect(-4,-28,60,64);CN.txt(S,rl(["ignore 20-50 ms","تجاهل 20-50 مللي"]),26,-34,{sz:11,col:"pk"})}
  CN.txt(S,rl(["count","العد"])+": "+(db?1:(u>1?M.min(7,M.floor((u-1)*9)):0)),-76,18,{sz:16,col:db?"gr":"pk"})}
 CN.txt(S,"HIGH",-124,-30,{al:"left",sz:10,col:"gr",a:.8});CN.txt(S,"LOW",-124,40,{al:"left",sz:10,col:"or",a:.8});
 S.camT=S.b===1?{z:1.35,x:30,y:20}:S.b===2?{z:1.3,x:-30,y:-40}:{z:1,x:0,y:0};cp(S,S.p.tag)};

/* ============ bread: a breadboard of glowing holes ============ */
SC.bread=S=>{const c=S.c,t=S.t,m=S.p.mode,cols=20,x0=-95,dx=10,up=[-38,-29,-20,-11,-2],lo=[14,23,32,41,50],rails=[-58,-49,66,75];
 const hole=(x,y,rgb,a,r)=>CN.glow(c,x,y,r||1.5,rgb,a);
 c.globalAlpha=.4;c.strokeStyle="rgb(150,175,230)";c.lineWidth=.8;CN.rrect(c,-108,-67,216,150,8);c.stroke();
 const lit=M.floor(t*.9)%cols;
 for(let i=0;i<cols;i++){const x=x0+i*dx;
  up.forEach(y=>hole(x,y,PAL.wh,.3));lo.forEach(y=>hole(x,y,PAL.wh,.3));
  if(m==="strips"&&i===lit){const g=.65+.35*sin(t*8);[up,lo].forEach(r=>{CN.line(c,x,r[0],x,r[4],PAL.cy,.55*g,1.4);r.forEach(y=>hole(x,y,PAL.cy,g,3.2));CN.dline(c,x,r[4],x,r[0],7,1.8,PAL.cy,.9,-t*1.1)})}}
 const rg=(y,rgb)=>{for(let i=0;i<cols;i++)hole(x0+i*dx+(i>9?3:0),y,rgb,.45,1.5)};
 rails.forEach((y,i)=>rg(y,i%2?PAL.bl:PAL.rd));
 CN.txt(S,"+",-103,-58,{sz:12,col:"rd"});CN.txt(S,"-",-103,-49,{sz:12,col:"bl"});CN.txt(S,"+",-103,66,{sz:12,col:"rd"});CN.txt(S,"-",-103,75,{sz:12,col:"bl"});
 if(m==="rails"){[-58,66].forEach(y=>CN.dline(c,x0,y,x0+190,y,22,1.3,PAL.rd,.85,-t*.35));[-49,75].forEach(y=>CN.dline(c,x0,y,x0+190,y,22,1.3,PAL.bl,.85,-t*.35));
  const j=(xa,ya,xb,yb,rgb)=>{c.globalAlpha=.8;c.strokeStyle=`rgb(${rgb})`;c.lineWidth=1.6;c.beginPath();c.moveTo(xa,ya);c.bezierCurveTo(xa-34,(ya+yb)/2,xa-34,(ya+yb)/2,xb,yb);c.stroke();CN.dline(c,xa,ya,xb,yb,6,1.8,rgb,.9,-t*.5)};
  j(-75,-49,-75,75,PAL.bl);j(-55,-58,-55,66,PAL.rd);
  CN.callout(S,-75,12,rl(["common ground","أرضي مشترك"]),-6,0,"bl",.9)}
 if(m==="gap"){const gl=.4+.4*sin(t*5);c.globalAlpha=.9;c.strokeStyle="rgb(255,122,182)";c.lineWidth=1.4;CN.rrect(c,-31,-4,62,20,3);c.stroke();c.globalAlpha=.22;c.fillStyle="rgb(255,122,182)";c.fill();
  CN.dline(c,-110,6,110,6,40,1,PAL.pk,.28+gl*.2,-t*.1);
  for(let k=0;k<4;k++){const x=x0+(7+k*2)*dx;CN.line(c,x,-2,x,2,PAL.wh,.8,1);hole(x,-2,PAL.gr,1,3.4);hole(x,14,PAL.gr,1,3.4);CN.line(c,x,12,x,16,PAL.wh,.8,1)}
  CN.txt(S,"IC",0,6,{sz:12,col:"pk"});CN.callout(S,-80,6,rl(["gap = no short","الفجوة تفصل"]),-6,26,"pk",.9)}
 if(m==="strips")CN.callout(S,x0+lit*dx,up[0],rl(["5 holes = 1 wire","٥ فتحات = سلك"]),-10,-22,"cy",.95);
 S.camT=S.b===1?{z:1.5,x:m==="gap"?0:m==="strips"?x0+lit*dx*.6:-40,y:m==="rails"?10:0}:S.b===2?{z:1.15,x:0,y:0}:{z:1,x:0,y:0};cp(S,S.p.tag)};
})();
