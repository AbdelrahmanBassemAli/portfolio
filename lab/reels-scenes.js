"use strict";
/* Mission Lab Reels: cartoon scene library. Each scene is a function(params) -> SVG string.
   Pure SVG + CSS/SMIL, no media files. Labels may be [en, ar] pairs. */
const RS={};
const rsL=x=>Array.isArray(x)?x[(typeof LANG!=="undefined"&&LANG==="ar")?1:0]:(x==null?"":x);
const rsO='stroke="#0b1230" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';
const C={cy:"#56e4ff",yl:"#ffd479",pk:"#ff7ab6",gr:"#6df0a8",vi:"#ac8bff",or:"#ff9a56",bl:"#3aa6ff",wh:"#f4f8ff",dk:"#0b1230"};
const rsT=(x,y,s,sz=12,f="#fff",an="middle",ex="")=>`<text x="${x}" y="${y}" text-anchor="${an}" font-size="${sz}" font-weight="800" fill="${f}" stroke="#0b1230" stroke-width="3" paint-order="stroke" stroke-linejoin="round" ${ex}>${rsL(s)}</text>`;
const rsEyes=(x,y,s=1,d=0)=>`<g class="a-blink" style="animation-delay:${d}s"><circle cx="${x-6*s}" cy="${y}" r="${5*s}" fill="#fff" ${rsO.replace('width="3"','width="2"')}/><circle cx="${x+6*s}" cy="${y}" r="${5*s}" fill="#fff" ${rsO.replace('width="3"','width="2"')}/><circle cx="${x-5*s}" cy="${y+1}" r="${2.4*s}" fill="#0b1230"/><circle cx="${x+7*s}" cy="${y+1}" r="${2.4*s}" fill="#0b1230"/></g>`;
const rsEarth=(cx,cy,r)=>`<g class="a-bob"><circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.bl}" ${rsO}/><path d="M${cx-r*.55} ${cy-r*.2}q${r*.25}-${r*.4} ${r*.55}-${r*.2}q${r*.1} ${r*.35}-${r*.25} ${r*.45}q-${r*.3} ${r*.05}-${r*.3}-${r*.25}z" fill="${C.gr}"/><path d="M${cx+r*.1} ${cy+r*.25}q${r*.35}-${r*.1} ${r*.5} ${r*.1}q-${r*.1} ${r*.3}-${r*.4} ${r*.25}z" fill="${C.gr}"/><ellipse cx="${cx-r*.4}" cy="${cy-r*.45}" rx="${r*.18}" ry="${r*.1}" fill="#fff" opacity=".5" transform="rotate(-30 ${cx-r*.4} ${cy-r*.45})"/>${rsEyes(cx,cy-r*.02,r/36)}<path d="M${cx-r*.14} ${cy+r*.22}q${r*.14} ${r*.12} ${r*.28} 0" stroke="#0b1230" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`;
const rsSat=(s=1)=>`<g transform="scale(${s})"><rect x="-26" y="-4" width="16" height="8" rx="2" fill="${C.bl}" ${rsO.replace('width="3"','width="2.4"')}/><rect x="10" y="-4" width="16" height="8" rx="2" fill="${C.bl}" ${rsO.replace('width="3"','width="2.4"')}/><rect x="-10" y="-9" width="20" height="18" rx="5" fill="${C.yl}" ${rsO.replace('width="3"','width="2.4"')}/><circle cx="-3" cy="-1" r="2" fill="#0b1230"/><circle cx="4" cy="-1" r="2" fill="#0b1230"/></g>`;
const rsSvg=(inner,vb="0 0 300 190",cls="")=>`<svg viewBox="${vb}" class="rl-svg ${cls}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;
const rsDur=(p,d)=>p.dur||d;

/* ---- flow: battery -> resistor -> bulb, particles are the current ---- */
RS.flow=p=>{const r=p.r||2,n=9-r*2,du=2.2+r*1.6;
 let z="";for(let i=0;i<6;i++)z+=`${112+i*13},${i%2?58:36} `;
 const dots=Array.from({length:n},(_,i)=>`<circle r="5" fill="${C.yl}" stroke="#0b1230" stroke-width="1.6"><animateMotion dur="${du}s" begin="${(-du*i/n).toFixed(2)}s" repeatCount="indefinite" path="M50,47 H250 V143 H50 Z"/></circle>`).join("");
 return rsSvg(`<path d="M50,47 H250 V143 H50 Z" fill="none" stroke="#0b1230" stroke-width="9" stroke-linejoin="round"/><path d="M50,47 H250 V143 H50 Z" fill="none" stroke="${C.cy}" stroke-width="4" stroke-linejoin="round" opacity=".85"/>
 <polyline points="104,47 ${z}" fill="none" stroke="#0b1230" stroke-width="${7+r*2}" stroke-linejoin="round"/><polyline points="104,47 ${z}" fill="none" stroke="${C.or}" stroke-width="${3+r*1.4}" stroke-linejoin="round"/>
 <rect x="32" y="75" width="36" height="40" rx="8" fill="${C.gr}" ${rsO}/><rect x="42" y="68" width="16" height="9" rx="3" fill="${C.wh}" ${rsO}/>${rsT(50,102,p.v||"5V",13,"#fff")}
 <g class="a-glow" style="--g:${(1.15-r*.25).toFixed(2)}"><circle cx="250" cy="95" r="26" fill="${C.yl}" opacity=".35"/><circle cx="250" cy="95" r="17" fill="${C.yl}" ${rsO}/>${rsEyes(250,93,.8)}<path d="M244 102q6 5 12 0" stroke="#0b1230" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>
 ${rsT(150,24,p.rl||"220Ω",14,C.or)}${rsT(150,174,p.i||"I →",13,C.yl)}${p.note?rsT(150,100,p.note,15,C.wh):""}`)};

/* ---- orbit: planet + satellites on ellipses ---- */
RS.orbit=p=>{const cx=150,cy=95,rx=p.rx||90,ry=p.ry||rx,e=p.e||0,n=p.n||1,du=p.dur||8,f=e?Math.round(rx*e):0;
 const fx=cx+f;let s="";
 for(let k=0;k<n;k++){const rot=(p.tilt||0)+(k*(p.spread==null?0:p.spread));
  const path=`M${cx+rx},${cy} a${rx},${ry} 0 1,0 ${-2*rx},0 a${rx},${ry} 0 1,0 ${2*rx},0`;
  s+=`<g transform="rotate(${rot} ${cx} ${cy})"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${p.col||C.cy}" stroke-width="2.5" stroke-dasharray="6 6" opacity=".8"/>
  <g><animateMotion dur="${du}s" begin="${(-k*du/n).toFixed(2)}s" repeatCount="indefinite" ${e?'calcMode="linear" keyPoints="0;.35;.65;1" keyTimes="0;.2;.8;1"':""} path="${path}"/>${p.sat==="none"?"":rsSat(p.ss||.8)}</g></g>`}
 const wedge=p.wedge?`<path d="M${fx},${cy} L${cx-rx},${cy} A${rx},${ry} 0 0,1 ${cx-rx*.6},${cy-ry*.8} Z" fill="${C.pk}" opacity=".55" class="a-pulse"/><path d="M${fx},${cy} L${cx+rx},${cy} A${rx},${ry} 0 0,0 ${cx+rx-6},${cy-ry*.35} Z" fill="${C.gr}" opacity=".55" class="a-pulse" style="animation-delay:.6s"/>`:"";
 const ground=p.ground?`<g transform="translate(${cx},${cy+(p.er||26)+6})"><path d="M-9 0 L9 0 L0 -14Z" fill="${C.or}" ${rsO}/></g>`:"";
 const labs=(p.labels||[]).map(l=>rsT(l[0],l[1],l[2],l[3]||12,l[4]||C.wh)).join("");
 return rsSvg(`${wedge}${rsEarth(fx,cy,p.er||26)}${s}${ground}${labs}`)};

/* ---- wave: digital / analog / pwm / clock signals scrolling, with a lamp ---- */
RS.wave=p=>{const k=p.kind||"digital",du=p.dur||3;let path="",bulb=1;
 const W=60,seg=(x)=>{
  if(k==="digital")return `M${x},120 h15 v-50 h30 v50 h15`;
  if(k==="analog")return `M${x},95 q15,-60 30,0 t30,0`;
  if(k==="clock")return `M${x},120 v-50 h15 v50 h15 v-50 h15 v50 h15`;
  const d=(p.duty||50)/100*W;return `M${x},120 v-50 h${d} v50 h${W-d}`};
 for(let i=0;i<7;i++)path+=seg(i*W-W)+" ";
 const lampO=k==="pwm"?(p.duty||50)/100:(k==="analog"?.6:.9);
 return rsSvg(`<defs><clipPath id="wvc"><rect x="20" y="40" width="190" height="100" rx="12"/></clipPath></defs>
 <rect x="20" y="40" width="190" height="100" rx="12" fill="#0e1a44" ${rsO}/>
 <line x1="20" y1="120" x2="210" y2="120" stroke="#ffffff33" stroke-width="2" stroke-dasharray="4 5"/><line x1="20" y1="70" x2="210" y2="70" stroke="#ffffff33" stroke-width="2" stroke-dasharray="4 5"/>
 <g clip-path="url(#wvc)"><g style="animation:rs-scroll ${du}s linear infinite"><path d="${path}" fill="none" stroke="${k==="analog"?C.pk:C.cy}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/></g></g>
 ${rsT(32,58,p.hi||"HIGH",11,C.cy,"start")}${rsT(32,136,p.lo||"LOW",11,C.cy,"start")}
 <g transform="translate(250,90)"><circle r="${22+lampO*8}" fill="${C.yl}" opacity="${(lampO*.5).toFixed(2)}" class="a-pulse"/><circle r="19" fill="${C.yl}" fill-opacity="${(.25+lampO*.75).toFixed(2)}" ${rsO}/>${rsEyes(0,-2,.9)}<path d="M-6 9q6 5 12 0" stroke="#0b1230" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>
 ${rsT(150,24,p.tag||"",15,C.yl)}${rsT(150,168,p.sub||"",13,C.wh)}`)};

/* ---- code: editor window with lines typing in, then output ---- */
RS.code=p=>{const ls=p.lines||[],h=Math.min(ls.length,7);let s="";
 ls.slice(0,7).forEach((l,i)=>{const hl=p.hi===i;s+=`<g class="a-line" style="animation-delay:${(.4+i*.9).toFixed(1)}s">${hl?`<rect x="22" y="${48+i*19-12}" width="256" height="18" rx="4" fill="${C.pk}" opacity=".28" class="a-pulse"/>`:""}<text x="30" y="${48+i*19}" font-size="12.5" font-family="ui-monospace,Menlo,Consolas,monospace" font-weight="700" fill="${hl?C.yl:"#d6f6ff"}">${l.replace(/&/g,"&amp;").replace(/</g,"&lt;")}</text></g>`});
 const out=p.out!=null?`<g class="a-line" style="animation-delay:${(.8+h*.9).toFixed(1)}s"><rect x="40" y="${52+h*19}" width="220" height="30" rx="10" fill="${C.gr}" ${rsO}/><text x="150" y="${72+h*19}" text-anchor="middle" font-size="13" font-weight="800" fill="#0b1230" font-family="ui-monospace,Menlo,monospace">${String(rsL(p.out)).replace(/&/g,"&amp;").replace(/</g,"&lt;")}</text></g>`:"";
 return rsSvg(`<rect x="12" y="14" width="276" height="${60+h*19+(p.out!=null?40:0)}" rx="14" fill="#0e1a44" ${rsO}/><circle cx="30" cy="30" r="4.5" fill="${C.pk}"/><circle cx="46" cy="30" r="4.5" fill="${C.yl}"/><circle cx="62" cy="30" r="4.5" fill="${C.gr}"/>${rsT(270,34,p.file||"main.py",10,"#8fb3d9","end")}${s}${out}`,"0 0 300 200")};

/* ---- chain: nodes lighting up in order ---- */
RS.chain=p=>{const nd=p.nodes||[],n=nd.length,two=n>3&&!p.row,per=two?Math.ceil(n/2):n,w=Math.min(64,(280-(per-1)*18)/per);
 let s="",pos=[];
 nd.forEach((x,i)=>{const row=two?Math.floor(i/per):0,col=two?i%per:i,tot=two?(row===0?per:n-per):n;
  const x0=150-((tot*w+(tot-1)*18)/2)+col*(w+18),y0=two?(row?112:30):62;pos.push([x0,y0]);
  s+=`<g class="a-node" style="animation-delay:${(i*(p.gap||1.1)).toFixed(2)}s;--c:${x[2]||C.cy}"><rect x="${x0}" y="${y0}" width="${w}" height="${two?58:66}" rx="14" fill="${x[2]||C.cy}" ${rsO}/><text x="${x0+w/2}" y="${y0+(two?32:38)}" text-anchor="middle" font-size="${w>56?28:24}">${x[0]}</text>${rsT(x0+w/2,y0+(two?52:58),x[1],w>56?10:9,"#fff")}</g>`});
 let ar="";for(let i=0;i<n-1;i++){const a=pos[i],b=pos[i+1];const sameRow=a[1]===b[1];
  ar+=sameRow?`<path d="M${a[0]+w+3} ${a[1]+(two?29:33)} H${b[0]-3}" stroke="#0b1230" stroke-width="3" fill="none" marker-end="url(#ah)"/>`:`<path d="M${a[0]+w/2} ${a[1]+60} Q${a[0]+w/2} 100 ${b[0]+w/2} 108" stroke="#0b1230" stroke-width="3" fill="none" marker-end="url(#ah)"/>`}
 return rsSvg(`<defs><marker id="ah" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto"><path d="M0 0L8 4L0 8z" fill="#fff" stroke="#0b1230" stroke-width="1"/></marker></defs>${ar}${s}${p.tag?rsT(150,two?182:162,p.tag,14,C.yl):""}`)};

/* ---- duel: two things side by side, bouncing in turn ---- */
RS.duel=p=>{const a=p.a,b=p.b;const side=(o,x,d,c)=>`<g class="a-hop" style="animation-delay:${d}s"><rect x="${x}" y="40" width="116" height="100" rx="22" fill="${c}" ${rsO}/><text x="${x+58}" y="94" text-anchor="middle" font-size="42">${o[0]}</text>${rsT(x+58,122,o[1],13)}${o[2]?`<rect x="${x+14}" y="130" width="${88*o[2]}" height="0" />`:""}</g>`;
 const bar=(o,x,c)=>o[2]!=null?`<rect x="${x+12}" y="152" width="92" height="12" rx="6" fill="#0e1a44" ${rsO.replace('width="3"','width="2"')}/><rect x="${x+12}" y="152" width="${92*o[2]}" height="12" rx="6" fill="${C.yl}" class="a-bar" ${rsO.replace('width="3"','width="2"')}/>`:"";
 return rsSvg(`${side(a,16,0,C.vi)}${side(b,168,.9,C.or)}<g class="a-pulse"><circle cx="150" cy="90" r="17" fill="${C.pk}" ${rsO}/>${rsT(150,95,"VS",12)}</g>${bar(a,16)}${bar(b,168)}${p.tag?rsT(150,16,p.tag,13,C.yl):""}`)};

/* ---- radar: pulses from a source, bounce off a target ---- */
RS.radar=p=>{const du=p.dur||2.6,r=p.sq?"a-ping sq":"a-ping";let rings="";
 for(let i=0;i<3;i++)rings+=`<circle cx="70" cy="95" r="14" fill="none" stroke="${p.col||C.cy}" stroke-width="4" class="${r}" style="animation-delay:${(i*du/3).toFixed(2)}s;animation-duration:${du}s"/>`;
 const echo=p.noecho?"":`<circle cx="228" cy="95" r="12" fill="none" stroke="${C.pk}" stroke-width="3.5" class="a-ping back" style="animation-delay:${(du*.55).toFixed(2)}s;animation-duration:${du}s"/>`;
 return rsSvg(`${rings}${echo}<text x="70" y="108" text-anchor="middle" font-size="36" class="a-bob">${p.from||"📡"}</text><text x="232" y="108" text-anchor="middle" font-size="40" class="a-bob" style="animation-delay:.5s">${p.to||"🚗"}</text>${p.tag?rsT(150,22,p.tag,15,C.yl):""}${p.sub?rsT(150,172,p.sub,13,C.wh):""}`)};

/* ---- bars: animated bar chart ---- */
RS.bars=p=>{const bs=p.bars||[],n=bs.length,w=Math.min(54,250/n-10);let s="";
 bs.forEach((b,i)=>{const x=150-(n*(w+12)-12)/2+i*(w+12),h=Math.max(8,b[1]*110);
  s+=`<g class="a-bar" style="animation-delay:${(i*.35).toFixed(2)}s"><rect x="${x}" y="${148-h}" width="${w}" height="${h}" rx="9" fill="${b[2]||C.cy}" ${rsO}/>${rsT(x+w/2,142-h+(h>26?18:-18+4),b[3]||"",12)}</g>${rsT(x+w/2,170,b[0],11,C.wh)}`});
 return rsSvg(`${p.line!=null?`<line x1="20" y1="${148-p.line*110}" x2="280" y2="${148-p.line*110}" stroke="${C.pk}" stroke-width="3" stroke-dasharray="7 6"/>`:""}<line x1="14" y1="149" x2="286" y2="149" stroke="#0b1230" stroke-width="4"/>${s}${p.tag?rsT(150,20,p.tag,14,C.yl):""}`)};

/* ---- gauge: dial with swinging needle ---- */
RS.gauge=p=>rsSvg(`<path d="M50 140 A100 100 0 0 1 250 140" fill="none" stroke="#0b1230" stroke-width="30" stroke-linecap="round"/><path d="M50 140 A100 100 0 0 1 130 44" fill="none" stroke="${C.gr}" stroke-width="22" stroke-linecap="round"/><path d="M130 44 A100 100 0 0 1 195 54" fill="none" stroke="${C.yl}" stroke-width="22"/><path d="M195 54 A100 100 0 0 1 250 140" fill="none" stroke="${C.pk}" stroke-width="22" stroke-linecap="round"/>
 <g class="a-needle"><line x1="150" y1="140" x2="150" y2="62" stroke="#0b1230" stroke-width="9" stroke-linecap="round"/><line x1="150" y1="140" x2="150" y2="62" stroke="#fff" stroke-width="4" stroke-linecap="round"/></g><circle cx="150" cy="140" r="14" fill="${C.cy}" ${rsO}/>${rsEyes(150,139,.6)}
 ${rsT(150,176,p.val||"0 … 1023",15,C.yl)}${p.tag?rsT(150,22,p.tag,14,C.wh):""}`);

/* ---- net: neurons and pulses ---- */
RS.net=p=>{const L=p.layers||[3,4,2],xs=L.map((_,i)=>46+i*(208/(L.length-1)));let e="",nd="",pts=[];
 L.forEach((c,i)=>{pts[i]=[];for(let j=0;j<c;j++)pts[i].push([xs[i],95+(j-(c-1)/2)*34])});
 for(let i=0;i<L.length-1;i++)pts[i].forEach((a,ja)=>pts[i+1].forEach((b,jb)=>{e+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#ffffff55" stroke-width="2"/>`;
  if((ja+jb)%2===0)e+=`<circle r="4.5" fill="${C.yl}" stroke="#0b1230" stroke-width="1.5"><animateMotion dur="1.8s" begin="${((i*.6+(ja+jb)*.2)%1.8).toFixed(2)}s" repeatCount="indefinite" path="M${a[0]},${a[1]} L${b[0]},${b[1]}"/></circle>`}));
 pts.forEach((col,i)=>col.forEach((q,j)=>{nd+=`<circle cx="${q[0]}" cy="${q[1]}" r="13" fill="${[C.cy,C.vi,C.gr,C.pk][i%4]}" ${rsO} class="a-pulse" style="animation-delay:${(i*.4+j*.12).toFixed(2)}s"/>`}));
 return rsSvg(`${e}${nd}${p.tag?rsT(150,20,p.tag,14,C.yl):""}${p.sub?rsT(150,176,p.sub,12,C.wh):""}`)};

/* ---- table: messy data getting cleaned ---- */
RS.table=p=>{const rows=p.rows||[["12","NaN","7"],["9","4","???"],["NaN","6","5"]],fixed=p.fixed||[["12","8","7"],["9","4","6"],["10","6","5"]];let s="";
 rows.forEach((r,i)=>r.forEach((c,j)=>{const x=40+j*74,y=48+i*38,bad=c==="NaN"||c==="???";
  s+=`<rect x="${x}" y="${y}" width="68" height="32" rx="8" fill="${bad?C.pk:"#16255a"}" ${rsO.replace('width="3"','width="2.4"')}/><g class="${bad?"a-swapout":""}" style="animation-delay:${(1+i*.5+j*.2).toFixed(1)}s"><text x="${x+34}" y="${y+22}" text-anchor="middle" font-size="14" font-weight="800" fill="#fff" font-family="ui-monospace,Menlo,monospace">${c}</text></g>${bad?`<g class="a-swapin" style="animation-delay:${(1+i*.5+j*.2).toFixed(1)}s"><rect x="${x}" y="${y}" width="68" height="32" rx="8" fill="${C.gr}" ${rsO.replace('width="3"','width="2.4"')}/><text x="${x+34}" y="${y+22}" text-anchor="middle" font-size="14" font-weight="800" fill="#0b1230" font-family="ui-monospace,Menlo,monospace">${fixed[i][j]}</text></g>`:""}`}));
 return rsSvg(`${s}<text x="262" y="40" font-size="30" class="a-wig">🧹</text>${p.tag?rsT(150,26,p.tag,13,C.yl,"middle").replace('y="26"','y="28"').replace(/x="150"/,'x="120"'):""}${rsT(150,180,p.sub||"df.fillna(df.mean())",13,C.wh)}`)};

/* ---- rocket ---- */
RS.rocket=p=>rsSvg(`<g class="a-rocket"><path d="M150 18 q22 28 22 64 v22 h-44 v-22 q0-36 22-64z" fill="${C.wh}" ${rsO}/><path d="M128 100 l-18 26 l18-8z M172 100 l18 26 l-18-8z" fill="${C.pk}" ${rsO}/><circle cx="150" cy="64" r="10" fill="${C.cy}" ${rsO}/>${rsEyes(150,63,.5)}<path d="M138 104 h24 l-12 40z" fill="${C.or}" ${rsO} class="a-flame"/><path d="M144 106 h12 l-6 22z" fill="${C.yl}" class="a-flame"/></g>
 <g stroke="#ffffff66" stroke-width="3" stroke-linecap="round" class="a-streak"><line x1="60" y1="20" x2="60" y2="52"/><line x1="240" y1="40" x2="240" y2="84"/><line x1="90" y1="110" x2="90" y2="146"/><line x1="214" y1="130" x2="214" y2="160"/></g>
 ${p.tag?rsT(150,174,p.tag,14,C.yl):""}${p.side?rsT(48,100,p.side,12,C.gr):""}`);

/* ---- sun: flare particles hit Earth's magnetic bubble ---- */
RS.sun=p=>{let ps="";for(let i=0;i<6;i++)ps+=`<circle r="5" fill="${C.yl}" stroke="#0b1230" stroke-width="1.5"><animateMotion dur="2.6s" begin="${(i*.43).toFixed(2)}s" repeatCount="indefinite" path="M60,${70+i*10} Q150,${40+i*20} 214,${90+(i-3)*6}"/></circle>`;
 return rsSvg(`<g class="a-bob"><circle cx="40" cy="95" r="34" fill="${C.or}" ${rsO}/>${rsEyes(44,92,1)}<path d="M32 108q10 8 20 0" stroke="#0b1230" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>
 <path d="M236 40 q40 55 0 110" fill="none" stroke="${C.cy}" stroke-width="5" opacity=".7" class="a-pulse"/>${rsEarth(256,95,26)}${ps}${p.tag?rsT(150,172,p.tag,14,C.yl):""}`)};

/* ---- bot: little robot with sensors on a track ---- */
RS.bot=p=>{const m=p.mode||"line";
 const body=`<g class="${m==="line"?"a-drive":"a-bob"}"><rect x="-22" y="-20" width="44" height="34" rx="12" fill="${C.cy}" ${rsO}/>${rsEyes(0,-5,1.1)}<path d="M-6 6q6 5 12 0" stroke="#0b1230" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="-14" cy="16" r="7" fill="${C.dk}"/><circle cx="14" cy="16" r="7" fill="${C.dk}"/><circle cx="-12" cy="-26" r="3" fill="${C.pk}" class="a-pulse"/></g>`;
 if(m==="line")return rsSvg(`<path d="M10 150 C80 150 90 70 150 80 S 230 150 292 60" fill="none" stroke="#0b1230" stroke-width="22" stroke-linecap="round"/><path d="M10 150 C80 150 90 70 150 80 S 230 150 292 60" fill="none" stroke="#e7ecff" stroke-width="4" stroke-dasharray="10 9"/><g><animateMotion dur="6s" repeatCount="indefinite" rotate="auto" path="M10,128 C80,128 90,48 150,58 S 230,128 292,38"/>${body}</g>${p.tag?rsT(150,178,p.tag,13,C.yl):""}`);
 if(m==="park")return rsSvg(`<rect x="0" y="140" width="300" height="50" fill="#16255a"/><rect x="236" y="40" width="44" height="100" rx="8" fill="${C.pk}" ${rsO}/>${rsT(258,96,"🧱",20)}<g><animateMotion dur="5s" repeatCount="indefinite" path="M60,114 L170,114 L170,114 L60,114" keyTimes="0;.6;.75;1" calcMode="linear" keyPoints="0;1;1;0"/>${body}</g><circle cx="190" cy="108" r="14" fill="none" stroke="${C.cy}" stroke-width="3.5" class="a-ping" /><circle cx="190" cy="108" r="14" fill="none" stroke="${C.cy}" stroke-width="3.5" class="a-ping" style="animation-delay:.9s"/>${rsT(150,24,p.tag||"BEEP… BEEP… BEEP",15,C.yl)}`);
 return rsSvg(`<rect x="0" y="140" width="300" height="50" fill="#16255a"/><g transform="translate(70,122)">${body}</g><g class="a-hop"><text x="210" y="130" font-size="38" text-anchor="middle">🚶</text></g><g class="a-pulse"><rect x="30" y="30" width="240" height="120" rx="14" fill="none" stroke="${C.gr}" stroke-width="3.5" stroke-dasharray="8 6"/></g>${rsT(150,22,p.tag||"Δ pixels",14,C.yl)}`)};

/* ---- motor ---- */
RS.motor=p=>rsSvg(`<circle cx="150" cy="86" r="52" fill="${C.yl}" ${rsO}/><g class="a-spinrev"><circle cx="150" cy="86" r="38" fill="${C.or}" ${rsO}/><path d="M150 52v68M116 86h68M126 62l48 48M174 62l-48 48" stroke="#0b1230" stroke-width="5" stroke-linecap="round"/></g><circle cx="150" cy="86" r="10" fill="${C.wh}" ${rsO}/>${rsEyes(150,85,.55)}
 <g class="a-swap"><text x="52" y="52" font-size="34" font-weight="800" fill="${C.gr}" stroke="#0b1230" stroke-width="3" paint-order="stroke">↻</text></g><g class="a-swap2"><text x="52" y="52" font-size="34" font-weight="800" fill="${C.pk}" stroke="#0b1230" stroke-width="3" paint-order="stroke">↺</text></g>
 ${rsT(150,170,p.tag||"H-bridge: + / −",14,C.yl)}${p.sub?rsT(250,58,p.sub,12,C.wh):""}`);

/* ---- sw: button + signal trace ---- */
RS.sw=p=>{const m=p.mode||"press";
 const tr={press:`M20,130 h60 v-40 h70 v40 h60 v-40 h50`,float:`M20,110 l12,-18 l10,30 l12,-34 l14,40 l12,-26 l10,22 l14,-30 l12,34 l12,-20 l14,28 l12,-30 l16,24 l16,-14 l14,20 l14,-16`,pullup:`M20,90 h70 v40 h70 v-40 h120`,bounce:`M20,90 h50 v40 l5,-26 l5,26 l5,-30 l5,32 l4,-18 l4,18 h70 v-40 h110`}[m];
 return rsSvg(`<g class="a-press"><rect x="40" y="26" width="64" height="40" rx="10" fill="#16255a" ${rsO}/><circle cx="72" cy="40" r="17" fill="${C.pk}" ${rsO}/>${rsEyes(72,38,.7)}</g>
 <g class="a-glow2"><circle cx="228" cy="46" r="20" fill="${C.yl}" ${rsO}/>${rsEyes(228,44,.7)}</g>
 <rect x="16" y="76" width="268" height="70" rx="12" fill="#0e1a44" ${rsO}/><path d="${tr}" transform="translate(0,${m==="press"?-4:0})" fill="none" stroke="${m==="float"?C.pk:C.cy}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round" style="stroke-dasharray:900;animation:rs-draw 4s linear infinite"/>
 ${rsT(30,92,"HIGH",10,C.cy,"start")}${rsT(30,138,"LOW",10,C.cy,"start")}${p.tag?rsT(150,172,p.tag,13,C.yl):""}`)};

/* ---- gnss: satellites beaming to a receiver ---- */
RS.gnss=p=>{const n=p.n||4,sx=[50,120,190,255,150],sy=[34,22,32,46,60];let s="";
 for(let i=0;i<n;i++)s+=`<line x1="${sx[i]}" y1="${sy[i]+10}" x2="150" y2="150" stroke="${C.yl}" stroke-width="2.5" stroke-dasharray="6 6" class="a-dash" style="animation-delay:${i*.2}s"/><g transform="translate(${sx[i]},${sy[i]})" class="a-bob" style="animation-delay:${i*.3}s">${rsSat(.65)}</g>`;
 return rsSvg(`${s}<circle cx="150" cy="150" r="${p.err||14}" fill="${C.pk}" opacity=".35" class="a-pulse"/><text x="150" y="162" text-anchor="middle" font-size="28">📱</text>${p.tag?rsT(150,184,p.tag,13,C.yl):""}`)};

/* ---- bread: breadboard ---- */
RS.bread=p=>{const m=p.mode||"strips";let h="";
 for(let i=0;i<10;i++){for(let j=0;j<5;j++){h+=`<circle cx="${62+i*20}" cy="${66+j*11}" r="3" fill="#0b1230"/><circle cx="${62+i*20}" cy="${124+j*11}" r="3" fill="#0b1230"/>`}}
 let hi="";
 if(m==="strips")hi=[2,6].map((c,k)=>`<rect x="${55+c*20}" y="60" width="14" height="58" rx="6" fill="${C.cy}" opacity=".55" class="a-pulse" style="animation-delay:${k*.7}s"/>`).join("")+`<rect x="${55+4*20}" y="118" width="14" height="58" rx="6" fill="${C.gr}" opacity=".55" class="a-pulse" style="animation-delay:1.2s"/>`;
 if(m==="rails")hi=`<rect x="34" y="30" width="232" height="10" rx="5" fill="${C.pk}" class="a-pulse"/><rect x="34" y="176" width="232" height="10" rx="5" fill="${C.cy}" class="a-pulse" style="animation-delay:.6s"/>`;
 if(m==="gap")hi=`<g class="a-hop"><rect x="106" y="104" width="88" height="40" rx="8" fill="${C.dk}" ${rsO}/>${[0,1,2,3].map(i=>`<rect x="${112+i*20}" y="98" width="8" height="8" fill="#ccd"/><rect x="${112+i*20}" y="142" width="8" height="8" fill="#ccd"/>`).join("")}${rsEyes(150,122,.9)}</g>`;
 return rsSvg(`<rect x="22" y="22" width="256" height="164" rx="16" fill="#e9eefb" ${rsO}/><rect x="34" y="30" width="232" height="10" rx="5" fill="${C.pk}" opacity=".5"/><rect x="34" y="176" width="232" height="10" rx="5" fill="${C.cy}" opacity=".5"/><rect x="36" y="110" width="228" height="10" fill="#c5cfe8"/>${h}${hi}${p.tag?rsT(150,15,p.tag,12,C.yl):""}`)};

/* ---- box: labeled variable boxes dropping in ---- */
RS.box=p=>{const it=p.items||[];const w=Math.min(110,270/it.length-8);let s="";
 it.forEach((b,i)=>{const x=150-(it.length*(w+10)-10)/2+i*(w+10);
  s+=`<g class="a-drop" style="animation-delay:${(i*.7).toFixed(1)}s"><rect x="${x}" y="64" width="${w}" height="70" rx="12" fill="${b[2]||C.cy}" ${rsO}/><rect x="${x+w/2-24}" y="48" width="48" height="22" rx="7" fill="#fff" ${rsO}/>${rsT(x+w/2,64,b[0],10,"#0b1230").replace('stroke="#0b1230" stroke-width="3" paint-order="stroke"','')}${rsT(x+w/2,106,b[1],w>80?15:12,"#fff")}</g>${rsT(x+w/2,154,b[3]||"",11,C.yl)}`});
 return rsSvg(`${s}${p.tag?rsT(150,24,p.tag,14,C.wh):""}`)};

/* ---- cycle: items going round a loop ---- */
RS.cycle=p=>{const it=p.items||["0","1","2","3","4"],n=it.length;let s="";
 it.forEach((x,i)=>{const a=-Math.PI/2+i*2*Math.PI/n,cx=150+Math.cos(a)*62,cy=92+Math.sin(a)*58;
  s+=`<g class="a-node" style="animation-delay:${(i*(p.gap||.8)).toFixed(2)}s;animation-duration:${(n*(p.gap||.8)).toFixed(1)}s"><circle cx="${cx}" cy="${cy}" r="19" fill="${p.col||C.vi}" ${rsO}/>${rsT(cx,cy+5,x,14,"#fff")}</g>`});
 return rsSvg(`<circle cx="150" cy="92" r="60" fill="none" stroke="#ffffff44" stroke-width="3" stroke-dasharray="3 9"/><g class="a-spin slow"><path d="M150 26 a66 66 0 0 1 60 38" fill="none" stroke="${C.yl}" stroke-width="6" stroke-linecap="round" marker-end="url(#ah2)"/></g><defs><marker id="ah2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0L8 4L0 8z" fill="${C.yl}"/></marker></defs>${rsT(150,98,p.mid||"↻",20,C.yl)}${p.tag?rsT(150,184,p.tag,13,C.wh):""}`)};

/* ---- machine: input -> function box -> output ---- */
RS.machine=p=>rsSvg(`<g class="a-slide"><text x="38" y="102" font-size="34" text-anchor="middle">${p.inp||"🥔"}</text>${rsT(38,128,p.inl||"in",11,C.wh)}</g>
 <rect x="92" y="38" width="116" height="116" rx="20" fill="${C.vi}" ${rsO}/><g class="a-spin slow" style="transform-origin:150px 80px"><circle cx="150" cy="80" r="18" fill="${C.yl}" ${rsO}/><path d="M150 56v48M126 80h48" stroke="#0b1230" stroke-width="5"/></g>${rsEyes(150,80,.7)}${rsT(150,138,p.name||"f(x)",15)}
 <g class="a-slide2"><text x="262" y="102" font-size="34" text-anchor="middle">${p.out||"🍟"}</text>${rsT(262,128,p.outl||"return",11,C.wh)}</g>${p.tag?rsT(150,22,p.tag,14,C.yl):""}`);

/* ---- spin: a satellite turning, with things to point at ---- */
RS.spin=p=>rsSvg(`<g class="a-spinrev slow"><g transform="translate(150,92)"><rect x="-70" y="-10" width="46" height="20" rx="4" fill="${C.bl}" ${rsO}/><rect x="24" y="-10" width="46" height="20" rx="4" fill="${C.bl}" ${rsO}/><rect x="-26" y="-26" width="52" height="52" rx="12" fill="${C.yl}" ${rsO}/><circle cx="-8" cy="-4" r="5" fill="#fff" stroke="#0b1230" stroke-width="2"/><circle cx="10" cy="-4" r="5" fill="#fff" stroke="#0b1230" stroke-width="2"/><circle cx="-7" cy="-3" r="2.4" fill="#0b1230"/><circle cx="11" cy="-3" r="2.4" fill="#0b1230"/><path d="M-6 9q6 5 12 0" stroke="#0b1230" stroke-width="2.4" fill="none" stroke-linecap="round"/></g></g>
 <text x="40" y="40" font-size="30" class="a-bob">☀️</text><text x="252" y="48" font-size="26" class="a-bob" style="animation-delay:.4s">⭐</text><text x="250" y="150" font-size="26" class="a-bob" style="animation-delay:.8s">🧲</text>${p.tag?rsT(150,180,p.tag,13,C.yl):""}`);
