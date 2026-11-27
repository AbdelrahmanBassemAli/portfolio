"use strict";
/* Diagram library: clean self-made SVG illustrations for lessons and cards.
   Every diagram is a function DIAG[key](lang) -> svg string, bilingual labels,
   minimal text inside, dark Mission Lab palette. Wired into lesson arrays at
   the bottom by English title prefix. */
const DG_BG="#0a1230",DG_C="#56e4ff",DG_V="#ac8bff",DG_G="#ffd479",DG_A="#5ef0b8",DG_M="#8fa0cf",DG_I="#f0f4ff",DG_R="#ff7a8a";
function dgWrap(inner,vb){return `<svg viewBox="0 0 ${vb||"320 180"}" role="img" aria-hidden="true"><rect width="100%" height="100%" fill="${DG_BG}"/>${inner}</svg>`}
function dgT(x,y,s,fill,size,anchor){return `<text x="${x}" y="${y}" fill="${fill||DG_M}" font-size="${size||11}" font-family="inherit" text-anchor="${anchor||"middle"}">${s}</text>`}
const DIAG={
/* --- Python lessons --- */
"py-print":l=>dgWrap(`
 <rect x="24" y="26" width="272" height="74" rx="10" fill="#071026" stroke="${DG_C}44"/>
 <circle cx="40" cy="40" r="4" fill="${DG_R}"/><circle cx="54" cy="40" r="4" fill="${DG_G}"/><circle cx="68" cy="40" r="4" fill="${DG_A}"/>
 <text x="40" y="68" fill="${DG_A}" font-size="13" font-family="ui-monospace,monospace">print("Hello, Space!")</text>
 <path d="M160 104v22" stroke="${DG_G}" stroke-width="2.5" marker-end="url(#dgAr)"/>
 <rect x="60" y="130" width="200" height="34" rx="8" fill="#0d1a3f" stroke="${DG_V}55"/>
 <text x="160" y="152" fill="${DG_I}" font-size="13" font-family="ui-monospace,monospace" text-anchor="middle">Hello, Space!</text>
 <defs><marker id="dgAr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6z" fill="${DG_G}"/></marker></defs>`),
"py-var":l=>dgWrap(`
 <rect x="30" y="44" width="120" height="60" rx="10" fill="#071026" stroke="${DG_C}" stroke-width="1.6"/>
 <rect x="30" y="44" width="120" height="22" rx="10" fill="${DG_C}22"/>
 ${dgT(90,60,'name',DG_C,12)}
 <text x="90" y="90" fill="${DG_G}" font-size="14" font-family="ui-monospace,monospace" text-anchor="middle">"ORBIT"</text>
 <rect x="170" y="44" width="120" height="60" rx="10" fill="#071026" stroke="${DG_V}" stroke-width="1.6"/>
 <rect x="170" y="44" width="120" height="22" rx="10" fill="${DG_V}22"/>
 ${dgT(230,60,'wheels',DG_V,12)}
 <text x="230" y="90" fill="${DG_G}" font-size="14" font-family="ui-monospace,monospace" text-anchor="middle">6</text>
 ${dgT(160,140,l==="ar"?"الاسم على العلبة، والقيمة جواها":"name on the box, value inside it",DG_M,11)}`),
"py-loop":l=>dgWrap(`
 <circle cx="160" cy="92" r="46" fill="none" stroke="${DG_C}55" stroke-width="2" stroke-dasharray="5 6"/>
 <path d="M160 46a46 46 0 0 1 40 23" fill="none" stroke="${DG_C}" stroke-width="3" marker-end="url(#dgAr2)"/>
 ${[0,1,2,3,4].map(i=>{const a=-Math.PI/2+i*(2*Math.PI/5),x=160+46*Math.cos(a),y=92+46*Math.sin(a);return `<circle cx="${x}" cy="${y}" r="13" fill="#071026" stroke="${DG_V}" stroke-width="1.6"/><text x="${x}" y="${y+4}" fill="${DG_G}" font-size="12" text-anchor="middle">${i}</text>`}).join("")}
 ${dgT(160,97,"for i",DG_I,13)}
 ${dgT(160,164,l==="ar"?"range(5) بتعد من 0 لـ 4":"range(5) counts 0 to 4",DG_M,11)}
 <defs><marker id="dgAr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6z" fill="${DG_C}"/></marker></defs>`),
"py-func":l=>dgWrap(`
 <path d="M52 90h54" stroke="${DG_G}" stroke-width="2.5" marker-end="url(#dgAr3)"/>
 ${dgT(79,80,'"Sara"',DG_G,12)}
 <rect x="112" y="56" width="96" height="68" rx="12" fill="#071026" stroke="${DG_C}" stroke-width="1.8"/>
 ${dgT(160,82,"greet()",DG_C,13)}
 ${dgT(160,106,l==="ar"?"خطوات مرتبة":"your steps",DG_M,10.5)}
 <path d="M208 90h60" stroke="${DG_A}" stroke-width="2.5" marker-end="url(#dgAr4)"/>
 ${dgT(238,80,"return",DG_A,11)}
 <rect x="236" y="106" width="60" height="26" rx="7" fill="#0d1a3f" stroke="${DG_A}66"/>
 ${dgT(266,123,l==="ar"?"أهلًا":"Hello",DG_I,11)}
 ${dgT(160,160,l==="ar"?"مدخل واحد، نتيجة واحدة، استخدام لا نهائي":"one input, one result, endless reuse",DG_M,11)}
 <defs><marker id="dgAr3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6z" fill="${DG_G}"/></marker><marker id="dgAr4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6z" fill="${DG_A}"/></marker></defs>`),
"gpio-blink":l=>dgWrap(`
 <rect x="26" y="46" width="86" height="92" rx="10" fill="#071026" stroke="${DG_C}" stroke-width="1.6"/>
 ${dgT(69,64,l==="ar"?"راسبيري باي":"Raspberry Pi",DG_C,10.5)}
 <circle cx="100" cy="86" r="5" fill="${DG_G}"/>
 ${dgT(76,90,"GPIO17",DG_G,9.5)}
 <circle cx="100" cy="118" r="5" fill="${DG_M}"/>
 ${dgT(72,122,"GND",DG_M,9.5)}
 <path d="M105 86h40l6-8 12 16 12-16 12 16 6-8h20" fill="none" stroke="${DG_G}" stroke-width="2"/>
 ${dgT(160,72,"220Ω",DG_G,10)}
 <path d="M213 86h24" stroke="${DG_G}" stroke-width="2"/>
 <path d="M237 74l14 12-14 12z" fill="none" stroke="${DG_R}" stroke-width="2"/>
 <path d="M251 74v24" stroke="${DG_R}" stroke-width="2"/>
 <path d="M255 78l8-8M255 86l10-10" stroke="${DG_G}" stroke-width="1.6"/>
 ${dgT(272,68,"LED",DG_R,10)}
 <path d="M265 86v32H105" fill="none" stroke="${DG_M}" stroke-width="2"/>
 <path d="M252 118h20M256 122h12M259 126h6" stroke="${DG_M}" stroke-width="2"/>
 ${dgT(160,164,l==="ar"?"دايرة الوميض: طرف ← مقاومة ← LED ← أرضي":"blink circuit: pin → resistor → LED → ground",DG_M,11)}`),
"gpio-button":l=>dgWrap(`
 <path d="M60 30v34" stroke="${DG_G}" stroke-width="2"/>
 ${dgT(60,24,"3.3V",DG_G,10)}
 <path d="M52 64l6-8 12 16 12-16 6 8" fill="none" stroke="${DG_G}" stroke-width="2"/>
 ${dgT(96,58,"10kΩ",DG_G,9.5)}
 <path d="M84 64v26" stroke="${DG_G}" stroke-width="2"/>
 <circle cx="84" cy="90" r="4" fill="${DG_C}"/>
 <path d="M84 90h70" stroke="${DG_C}" stroke-width="2"/>
 ${dgT(130,82,l==="ar"?"الطرف بيقرا":"pin reads",DG_C,10)}
 <rect x="154" y="70" width="70" height="40" rx="9" fill="#071026" stroke="${DG_C}" stroke-width="1.6"/>
 ${dgT(189,94,l==="ar"?"LOW لمضغوط":"LOW when pressed",DG_I,9.5)}
 <path d="M60 128v-22h48M60 128h24" stroke="${DG_M}" stroke-width="2" fill="none"/>
 <circle cx="60" cy="128" r="3.5" fill="none" stroke="${DG_M}" stroke-width="2"/>
 <path d="M63 121l21-10" stroke="${DG_M}" stroke-width="2.4"/>
 ${dgT(48,148,l==="ar"?"زرار":"button",DG_M,10)}
 <path d="M52 132h16M55 136h10M58 140h4" stroke="${DG_M}" stroke-width="1.8"/>
 ${dgT(160,168,l==="ar"?"Pull-up: مش مضغوط = HIGH، مضغوط = LOW":"pull-up: released = HIGH, pressed = LOW",DG_M,11)}`),
/* --- electronics --- */
"ohm":l=>dgWrap(`
 <path d="M160 30L70 140h180z" fill="#071026" stroke="${DG_C}" stroke-width="2" stroke-linejoin="round"/>
 <path d="M115 98h90" stroke="${DG_C}" stroke-width="1.6"/>
 <path d="M160 98v42" stroke="${DG_C}" stroke-width="1.6"/>
 ${dgT(160,78,"V",DG_G,22)}
 ${dgT(112,128,"I",DG_C,20)}
 ${dgT(208,128,"R",DG_V,20)}
 ${dgT(160,164,l==="ar"?"غطّي اللي عايزه: V = I × R":"cover the one you want: V = I × R",DG_M,11)}`),
"breadboard":l=>dgWrap(`
 <rect x="40" y="26" width="240" height="128" rx="10" fill="#071026" stroke="${DG_C}55"/>
 <rect x="52" y="38" width="216" height="10" rx="5" fill="${DG_R}33" stroke="${DG_R}88"/>
 <rect x="52" y="56" width="216" height="10" rx="5" fill="${DG_C}22" stroke="${DG_C}88"/>
 ${[0,1,2,3,4,5,6,7].map(r=>[0,1,2,3,4,5,6,7,8,9,10,11].map(c=>`<circle cx="${60+c*18}" cy="${82+r*9.5}" r="1.7" fill="${DG_M}88"/>`).join("")).join("")}
 <rect x="52" y="77.5" width="90" height="42" rx="4" fill="${DG_G}14" stroke="${DG_G}"/>
 <rect x="154" y="112" width="18" height="36" rx="3" fill="${DG_V}22" stroke="${DG_V}"/>
 ${dgT(97,132,l==="ar"?"صفوف متوصلة":"connected rows",DG_G,9.5)}
 ${dgT(163,164,l==="ar"?"الفاصل بيعزل النصفين":"the gap isolates the halves",DG_M,10)}
 ${dgT(268,48,"+",DG_R,11)}${dgT(268,66,"−",DG_C,11)}`),
"dig-analog":l=>dgWrap(`
 ${dgT(80,24,l==="ar"?"رقمي":"digital",DG_C,12)}
 <path d="M30 70h25V40h25v30h25V40h25v30" fill="none" stroke="${DG_C}" stroke-width="2.4"/>
 ${dgT(42,92,"0",DG_M,9)}${dgT(42,42,"1",DG_M,9)}
 ${dgT(240,24,l==="ar"?"تناظري":"analog",DG_V,12)}
 <path d="M190 65q15-38 30 0t30 0 30 0 30 0" fill="none" stroke="${DG_V}" stroke-width="2.4"/>
 <path d="M30 130q10-26 20 0t20 0 20 0 20 0 20 0 20 0 20 0 20 0" fill="none" stroke="${DG_G}" stroke-width="2"/>
 ${dgT(160,158,l==="ar"?"الحساسات أرقام بين 0 و1023":"sensors read as numbers from 0 to 1023",DG_M,11)}`),
"pwm":l=>dgWrap(`
 ${[[36,"25%",20],[86,"50%",40],[136,"100%",80]].map(([y,lab,w])=>`
 ${dgT(34,y+4,lab,DG_G,10,"start")}
 <path d="M70 ${y}h${w}v-14h${80-w>0?80-w:0}v14h${w>40?w:0}v-14" fill="none" stroke="${DG_C}" stroke-width="2.2"/>
 ${w<80?`<path d="M150 ${y}h${Math.max(0,w-0)}v-14" fill="none" stroke="${DG_C}" stroke-width="2.2"/>`:""}`).join("")}
 <rect x="238" y="24" width="14" height="120" rx="7" fill="#071026" stroke="${DG_V}66"/>
 <rect x="238" y="84" width="14" height="60" rx="7" fill="${DG_G}"/>
 ${dgT(245,162,l==="ar"?"سطوع":"glow",DG_M,9.5)}
 ${dgT(150,166,l==="ar"?"نسبة التشغيل = السطوع أو السرعة":"duty cycle = brightness or speed",DG_M,11)}`),
"buses":l=>dgWrap(`
 <rect x="36" y="34" width="52" height="26" rx="7" fill="#071026" stroke="${DG_C}"/><rect x="36" y="80" width="52" height="26" rx="7" fill="#071026" stroke="${DG_C}"/>
 <path d="M88 42h60M88 98h60" stroke="${DG_C}" stroke-width="2"/>
 <path d="M148 42l0 56" stroke="${DG_C}44" stroke-width="1" stroke-dasharray="3 4"/>
 <rect x="148" y="34" width="52" height="26" rx="7" fill="#071026" stroke="${DG_C}"/>
 ${dgT(120,50,"TX→RX",DG_G,9)}
 ${dgT(120,106,"RX←TX",DG_G,9)}
 ${dgT(62,26,"UART",DG_C,10.5)}
 <rect x="216" y="26" width="68" height="14" rx="7" fill="#071026" stroke="${DG_V}"/>
 <path d="M222 40v50M278 40v50" stroke="${DG_V}" stroke-width="2"/>
 ${[[232,58],[252,74],[268,58]].map(([x,y])=>`<rect x="${x-9}" y="${y-8}" width="18" height="16" rx="4" fill="#071026" stroke="${DG_V}"/><path d="M${x} ${y-8}V40" stroke="${DG_V}" stroke-width="1.6"/>`).join("")}
 ${dgT(250,26,"I2C",DG_V,10.5)}
 ${dgT(250,108,l==="ar"?"عناوين على سلكين":"addresses on 2 wires",DG_M,9)}
 ${dgT(62,140,l==="ar"?"سلكين بين جهازين":"2 wires, 2 devices",DG_M,9)}
 <path d="M176 128h96M176 142h96M176 156h96" stroke="${DG_A}" stroke-width="2"/>
 ${dgT(160,142,"SPI",DG_A,10.5,"end")}
 ${dgT(224,170,l==="ar"?"الأسرع، 4 أسلاك":"fastest, 4 wires",DG_M,9)}`),
"hbridge":l=>dgWrap(`
 <path d="M110 34v112M210 34v112M110 90h100" stroke="${DG_M}" stroke-width="2.4"/>
 ${[[110,52],[210,52],[110,128],[210,128]].map(([x,y])=>`<rect x="${x-13}" y="${y-11}" width="26" height="22" rx="5" fill="#071026" stroke="${DG_C}" stroke-width="1.6"/>`).join("")}
 <circle cx="160" cy="90" r="20" fill="#071026" stroke="${DG_G}" stroke-width="2"/>
 ${dgT(160,95,"M",DG_G,16)}
 <path d="M160 34V14M138 24l8-10M182 24l-8-10" stroke="${DG_A}" stroke-width="2"/>
 ${dgT(160,168,l==="ar"?"أربع مفاتيح بتعكس اتجاه الموتور":"four switches reverse the motor",DG_M,11)}
 ${dgT(64,90,l==="ar"?"اتجاه":"dir A",DG_C,10)}${dgT(258,90,l==="ar"?"عكس":"dir B",DG_V,10)}`),
"level-shift":l=>dgWrap(`
 <circle cx="52" cy="52" r="6" fill="${DG_R}"/>
 ${dgT(52,36,"5V",DG_R,11)}
 <path d="M58 52h40l6-8 12 16 12-16 6 8" fill="none" stroke="${DG_G}" stroke-width="2"/>
 <circle cx="136" cy="52" r="4" fill="${DG_C}"/>
 <path d="M136 52v34l6 8 12-16 6-8" fill="none" stroke="${DG_V}" stroke-width="2"/>
 <path d="M140 52h60" stroke="${DG_C}" stroke-width="2"/>
 <circle cx="200" cy="52" r="6" fill="${DG_A}"/>
 ${dgT(200,36,"3.3V",DG_A,11)}
 ${dgT(96,36,"R1",DG_G,9.5)}${dgT(158,100,"R2",DG_V,9.5)}
 <path d="M148 104h20M152 108h12M155 112h6" stroke="${DG_M}" stroke-width="1.8"/>
 <path d="M232 40l14 12-14 12zM246 40l14 12-14 12z" fill="none" stroke="${DG_G}" stroke-width="2"/>
 ${dgT(160,158,l==="ar"?"مقسّم الجهد بيحمي أطراف الباي من 5 فولت":"a divider protects Pi pins from 5 V",DG_M,11)}`),
"pullup":l=>dgWrap(`
 <path d="M160 26v22" stroke="${DG_G}" stroke-width="2"/>${dgT(160,20,"VCC",DG_G,10)}
 <path d="M152 48l6-8 12 16 12-16 6 8" fill="none" stroke="${DG_G}" stroke-width="2"/>
 <path d="M160 56v30" stroke="${DG_G}" stroke-width="2"/>
 <circle cx="160" cy="86" r="4.5" fill="${DG_C}"/>
 <path d="M164 86h56" stroke="${DG_C}" stroke-width="2"/>
 <rect x="220" y="66" width="66" height="40" rx="9" fill="#071026" stroke="${DG_C}" stroke-width="1.6"/>
 ${dgT(253,90,"INPUT",DG_I,10)}
 <path d="M160 90v30" stroke="${DG_M}" stroke-width="2"/>
 <circle cx="160" cy="124" r="4" fill="none" stroke="${DG_M}" stroke-width="2"/>
 <path d="M164 118l22-12" stroke="${DG_M}" stroke-width="2.4"/>
 <path d="M160 128v12" stroke="${DG_M}" stroke-width="2"/>
 <path d="M148 140h24M153 144h14M157 148h6" stroke="${DG_M}" stroke-width="1.8"/>
 ${dgT(96,70,"pull-up",DG_G,9.5)}${dgT(96,124,l==="ar"?"زرار":"button",DG_M,9.5)}
 ${dgT(160,168,l==="ar"?"من غير مقاومة الطرف بيبقى عايم":"without it the pin floats and reads noise",DG_M,11)}`),
"vdivider":l=>dgWrap(`
 <path d="M120 24v20" stroke="${DG_G}" stroke-width="2"/>${dgT(120,18,"5V",DG_G,10)}
 <circle cx="120" cy="56" r="14" fill="#071026" stroke="${DG_G}" stroke-width="2"/>
 <path d="M112 48l16 16M112 64l16-16" stroke="${DG_G}" stroke-width="1.4"/>
 ${dgT(84,60,"LDR",DG_G,9.5)}
 <path d="M120 70v22" stroke="${DG_G}" stroke-width="2"/>
 <circle cx="120" cy="92" r="4.5" fill="${DG_C}"/>
 <path d="M124 92h76" stroke="${DG_C}" stroke-width="2"/>${dgT(168,84,"A0",DG_C,10)}
 <path d="M120 96v10l6 8 12-16 12 16 6-8" fill="none" stroke="${DG_V}" stroke-width="2"/>
 ${dgT(160,126,"10kΩ",DG_V,9.5)}
 <path d="M120 122v18" stroke="${DG_M}" stroke-width="2"/>
 <path d="M108 140h24M113 144h14M117 148h6" stroke="${DG_M}" stroke-width="1.8"/>
 <path d="M226 60a26 26 0 0 1 0 64" fill="${DG_C}18" stroke="${DG_C}" stroke-width="1.6"/>
 ${dgT(258,96,l==="ar"?"ضلمة":"dark",DG_C,9)}
 ${dgT(160,168,l==="ar"?"النور بيغيّر المقاومة، فالجهد بيغيّر القراءة":"light changes resistance, so the voltage changes",DG_M,11)}`),
"ultrasonic":l=>dgWrap(`
 <rect x="36" y="60" width="64" height="56" rx="10" fill="#071026" stroke="${DG_C}" stroke-width="1.8"/>
 <circle cx="58" cy="88" r="12" fill="none" stroke="${DG_C}" stroke-width="2"/>
 <circle cx="80" cy="88" r="12" fill="none" stroke="${DG_C}" stroke-width="2"/>
 ${dgT(68,130,"HC-SR04",DG_M,9)}
 ${[0,1,2].map(i=>`<path d="M${108+i*16} ${72-i*3}q14 16 0 32" fill="none" stroke="${DG_G}" stroke-width="2" opacity="${1-i*0.3}"/>`).join("")}
 <rect x="238" y="66" width="16" height="44" rx="4" fill="${DG_V}55" stroke="${DG_V}"/>
 ${[0,1].map(i=>`<path d="M${228-i*14} ${76-i*2}q-12 12 0 24" fill="none" stroke="${DG_A}" stroke-width="2" opacity="${0.9-i*0.35}"/>`).join("")}
 ${dgT(160,160,l==="ar"?"بيبعت صوت وبيقيس زمن الصدى = المسافة":"it shouts a ping and times the echo = distance",DG_M,11)}`),
/* --- space concepts --- */
"newton":l=>dgWrap(`
 <path d="M30 150q130 26 260 0" fill="none" stroke="${DG_A}" stroke-width="2.4"/>
 <path d="M30 150q130 26 260 0l-6 18H36z" fill="${DG_A}18"/>
 <circle cx="52" cy="52" r="7" fill="#071026" stroke="${DG_M}" stroke-width="2"/>
 <path d="M52 44V22M52 44l16-8" stroke="${DG_M}" stroke-width="2"/>
 <path d="M59 44q26 8 40 44" fill="none" stroke="${DG_R}" stroke-width="2" stroke-dasharray="5 5" marker-end="url(#dgN1)"/>
 <path d="M59 42q70 4 108 58" fill="none" stroke="${DG_G}" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#dgN1)"/>
 <path d="M59 40q140-8 210 66" fill="none" stroke="${DG_C}" stroke-width="2.4" marker-end="url(#dgN1)"/>
 <circle cx="269" cy="106" r="5" fill="${DG_C}"/>
 <path d="M269 111q-6 22 -24 30" fill="none" stroke="${DG_C}" stroke-width="1.6" stroke-dasharray="3 4"/>
 ${dgT(160,172,l==="ar"?"سرعة كفاية = بيقع بس بيفوت الأرض":"fast enough = falls but keeps missing Earth",DG_M,10.5)}
 <defs><marker id="dgN1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6z" fill="${DG_C}"/></marker></defs>`),
"kepler":l=>dgWrap(`
 <ellipse cx="170" cy="90" rx="110" ry="52" fill="none" stroke="${DG_C}" stroke-width="2"/>
 <circle cx="94" cy="90" r="14" fill="url(#dgE)" stroke="${DG_C}66"/>
 <path d="M94 90L262 66A110 52 0 0 1 274 96z" fill="${DG_G}33" stroke="${DG_G}99"/>
 <path d="M94 90L112 42A110 52 0 0 1 140 39z" fill="${DG_G}33" stroke="${DG_G}99"/>
 <circle cx="266" cy="80" r="5" fill="${DG_A}"/><circle cx="126" cy="40" r="5" fill="${DG_A}"/>
 <path d="M240 62q26 4 34 22" fill="none" stroke="${DG_A}" stroke-width="2" marker-end="url(#dgK1)"/>
 <path d="M146 36q-18-6-30 2" fill="none" stroke="${DG_A}" stroke-width="2" marker-end="url(#dgK1)"/>
 ${dgT(160,168,l==="ar"?"مساحتين متساويتين في نفس الزمن: قريب = أسرع":"equal areas in equal times: near = faster",DG_M,10.5)}
 <defs><radialGradient id="dgE"><stop offset="0" stop-color="#4aa8ff"/><stop offset="1" stop-color="#0b3b8c"/></radialGradient><marker id="dgK1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6z" fill="${DG_A}"/></marker></defs>`),
"hohmann":l=>dgWrap(`
 <circle cx="140" cy="92" r="16" fill="url(#dgH1)"/>
 <circle cx="140" cy="92" r="40" fill="none" stroke="${DG_C}" stroke-width="2"/>
 <circle cx="140" cy="92" r="72" fill="none" stroke="${DG_V}" stroke-width="2"/>
 <ellipse cx="140" cy="92" rx="56" ry="56" fill="none" stroke="${DG_G}" stroke-width="2" stroke-dasharray="7 6" transform="scale(1 0.999)"/>
 <circle cx="140" cy="148" r="5" fill="${DG_G}"/>
 <path d="M132 150l-12 8" stroke="${DG_G}" stroke-width="2.6" marker-end="url(#dgH2)"/>
 <circle cx="196" cy="92" r="5" fill="${DG_G}"/>
 <path d="M198 84l10-10" stroke="${DG_G}" stroke-width="2.6" marker-end="url(#dgH2)"/>
 ${dgT(58,150,l==="ar"?"حرقة 1":"burn 1",DG_G,9.5)}
 ${dgT(240,70,l==="ar"?"حرقة 2":"burn 2",DG_G,9.5)}
 ${dgT(160,172,l==="ar"?"حرقتين بيغيّروا المدار":"two burns change the orbit",DG_M,10.5)}
 <defs><radialGradient id="dgH1"><stop offset="0" stop-color="#4aa8ff"/><stop offset="1" stop-color="#0b3b8c"/></radialGradient><marker id="dgH2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6z" fill="${DG_G}"/></marker></defs>`),
"gnss-trilat":l=>dgWrap(`
 <circle cx="160" cy="112" r="58" fill="none" stroke="${DG_C}" stroke-width="1.8"/>
 <circle cx="160" cy="112" r="76" fill="none" stroke="${DG_V}" stroke-width="1.8" opacity=".8"/>
 <circle cx="160" cy="112" r="90" fill="none" stroke="${DG_A}" stroke-width="1.8" opacity=".6"/>
 <rect x="96" y="28" width="13" height="13" fill="${DG_C}"/><rect x="154" y="14" width="13" height="13" fill="${DG_V}"/><rect x="212" y="30" width="13" height="13" fill="${DG_A}"/>
 <circle cx="160" cy="112" r="6" fill="${DG_G}"/>
 <circle cx="160" cy="112" r="11" fill="none" stroke="${DG_G}" stroke-width="1.6" opacity=".7"/>
 ${dgT(160,166,l==="ar"?"مكانك هو نقطة التقاطع الوحيدة":"you are where all the circles meet",DG_M,10.5)}`),
"stages":l=>dgWrap(`
 <path d="M120 30q0-16 20-16t20 16v10h-40z" fill="${DG_G}33" stroke="${DG_G}" stroke-width="1.8"/>
 <rect x="120" y="40" width="40" height="30" rx="4" fill="#071026" stroke="${DG_C}" stroke-width="1.8"/>
 <rect x="114" y="76" width="52" height="40" rx="4" fill="#071026" stroke="${DG_V}" stroke-width="1.8"/>
 <rect x="108" y="122" width="64" height="34" rx="4" fill="#071026" stroke="${DG_A}" stroke-width="1.8"/>
 <path d="M126 156q4 12 14 14M154 156q-4 12-14 14" stroke="${DG_R}" stroke-width="2" fill="none"/>
 ${dgT(196,58,l==="ar"?"حمولة":"payload",DG_G,9.5)}
 ${dgT(200,100,l==="ar"?"مرحلة 2":"stage 2",DG_V,9.5)}
 ${dgT(206,142,l==="ar"?"مرحلة 1":"stage 1",DG_A,9.5)}
 <path d="M76 120V56" stroke="${DG_M}" stroke-width="2" stroke-dasharray="4 4" marker-end="url(#dgS1)"/>
 ${dgT(70,90,"Δv",DG_M,12,"middle")}
 <defs><marker id="dgS1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6z" fill="${DG_M}"/></marker></defs>`),
"linkbudget":l=>dgWrap(`
 <path d="M52 128a40 40 0 0 1 40-40" fill="none" stroke="${DG_C}" stroke-width="2.4"/>
 <path d="M52 128l26-26" stroke="${DG_C}" stroke-width="2"/>
 <path d="M40 140h34" stroke="${DG_C}" stroke-width="2.4"/>
 <circle cx="78" cy="102" r="4" fill="${DG_C}"/>
 ${[0,1,2].map(i=>`<path d="M${108+i*24} ${92-i*14}q10-8 20-4" fill="none" stroke="${DG_G}" stroke-width="2" opacity="${1-i*0.28}"/>`).join("")}
 <rect x="224" y="34" width="34" height="20" rx="4" fill="#071026" stroke="${DG_V}" stroke-width="1.8"/>
 <rect x="206" y="38" width="16" height="12" fill="${DG_C}55" stroke="${DG_C}"/>
 <rect x="260" y="38" width="16" height="12" fill="${DG_C}55" stroke="${DG_C}"/>
 ${dgT(160,158,l==="ar"?"الإشارة بتضعف بالمسافة والتردد: من هنا link budget":"signal fades with distance and frequency: the link budget",DG_M,10.5)}
 ${dgT(241,72,l==="ar"?"قمر":"sat",DG_V,9.5)}`),
/* --- AI lessons --- */
"neuron":l=>dgWrap(`
 ${[[46,52],[46,90],[46,128]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="11" fill="#071026" stroke="${DG_C}" stroke-width="1.6"/>${dgT(x,y+4,"x"+(i+1),DG_C,10)}<path d="M${x+11} ${y}L128 90" stroke="${DG_V}" stroke-width="1.6" opacity=".8"/>`).join("")}
 ${dgT(88,58,"w1",DG_V,9)}${dgT(88,86,"w2",DG_V,9)}${dgT(88,120,"w3",DG_V,9)}
 <circle cx="160" cy="90" r="26" fill="#071026" stroke="${DG_G}" stroke-width="2"/>
 ${dgT(160,86,"Σ",DG_G,15)}${dgT(160,102,"ReLU",DG_M,8.5)}
 <path d="M186 90h44" stroke="${DG_A}" stroke-width="2.4" marker-end="url(#dgNn)"/>
 <circle cx="252" cy="90" r="11" fill="#071026" stroke="${DG_A}" stroke-width="1.8"/>
 ${dgT(252,94,"y",DG_A,11)}
 ${dgT(160,160,l==="ar"?"اضرب، اجمع، مرّر في دالة تنشيط":"multiply, add, pass through activation",DG_M,10.5)}
 <defs><marker id="dgNn" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6z" fill="${DG_A}"/></marker></defs>`),
"confusion":l=>dgWrap(`
 <rect x="90" y="40" width="60" height="50" fill="${DG_A}26" stroke="${DG_A}"/>
 <rect x="150" y="40" width="60" height="50" fill="${DG_R}1e" stroke="${DG_R}88"/>
 <rect x="90" y="90" width="60" height="50" fill="${DG_R}1e" stroke="${DG_R}88"/>
 <rect x="150" y="90" width="60" height="50" fill="${DG_A}26" stroke="${DG_A}"/>
 ${dgT(120,69,"TP",DG_A,13)}${dgT(180,69,"FP",DG_R,13)}${dgT(120,119,"FN",DG_R,13)}${dgT(180,119,"TN",DG_A,13)}
 ${dgT(150,30,l==="ar"?"توقّع خطأ/صح":"predicted fault / ok",DG_M,9.5)}
 ${dgT(66,90,l==="ar"?"الحقيقة":"actual",DG_M,9.5)}
 ${dgT(150,164,l==="ar"?"Precision: إنذاراتك الصح · Recall: الأعطال اللي لقطتها":"precision: alarms that were real · recall: faults you caught",DG_M,10)}`),
"pandas":l=>dgWrap(`
 <rect x="30" y="44" width="110" height="90" rx="8" fill="#071026" stroke="${DG_R}99"/>
 ${[0,1,2,3].map(r=>`<path d="M30 ${64+r*18}h110" stroke="${DG_R}44"/>`).join("")}
 <path d="M52 58l10 8M96 76l-12 6M70 112l14-10" stroke="${DG_R}" stroke-width="2"/>
 ${dgT(85,36,l==="ar"?"بيانات بايظة":"messy data",DG_R,10)}
 <path d="M146 88h28" stroke="${DG_G}" stroke-width="2.6" marker-end="url(#dgP1)"/>
 <rect x="180" y="44" width="110" height="90" rx="8" fill="#071026" stroke="${DG_A}"/>
 ${[0,1,2,3].map(r=>`<path d="M180 ${64+r*18}h110" stroke="${DG_A}44"/>`).join("")}
 ${dgT(235,36,l==="ar"?"بعد pandas":"after pandas",DG_A,10)}
 ${dgT(160,164,l==="ar"?"نضّف، عوّض الناقص، وحّد الأنواع":"clean, fill the gaps, fix the types",DG_M,10.5)}
 <defs><marker id="dgP1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6z" fill="${DG_G}"/></marker></defs>`),
"zscore":l=>dgWrap(`
 <path d="M40 140h250" stroke="${DG_M}" stroke-width="1.6"/>
 <path d="M60 140q60-110 105-108t105 108" fill="${DG_C}14" stroke="${DG_C}" stroke-width="2"/>
 <path d="M112 140V66M218 140V66" stroke="${DG_V}" stroke-width="1.4" stroke-dasharray="4 4"/>
 ${dgT(112,60,"−2σ",DG_V,9)}${dgT(218,60,"+2σ",DG_V,9)}
 <circle cx="262" cy="128" r="6" fill="${DG_R}"/>
 <path d="M262 122v-22" stroke="${DG_R}" stroke-width="1.6" stroke-dasharray="3 3"/>
 ${dgT(262,96,"35.2!",DG_R,10)}
 ${dgT(160,168,l==="ar"?"اللي بره الانحرافين يستاهل نظرة":"beyond 2σ deserves a look",DG_M,10.5)}`)
};
/* attach diagrams to lessons by English title prefix. Runs after every render
   (content.js arrays exist by then); idempotent thanks to the !x.dg guard. */
function dgWire(){
  const wire=(arr,map)=>{if(!arr)return;for(const pre in map){const x=arr.find(y=>y.en&&y.en.title&&y.en.title.startsWith(pre));if(x&&!x.dg)x.dg=map[pre]}};
  const g=n=>typeof window[n]!=="undefined"?window[n]:null;
  try{wire(typeof LESSONS!=="undefined"?LESSONS:null,{"Hello, Space!":"py-print","Variables":"py-var","Loops":"py-loop","Functions":"py-func","GPIO":"gpio-blink","Button input":"gpio-button"})}catch(e){}
  try{wire(typeof ELEC!=="undefined"?ELEC:null,{"Ohm's law":"ohm","Breadboard":"breadboard","Digital vs analog":"dig-analog","PWM":"pwm","Talking to chips":"buses","Motors and drivers":"hbridge","Power and safety":"level-shift","Buttons: pull-ups":"pullup"})}catch(e){}
  try{wire(typeof PROJECTS!=="undefined"?PROJECTS:null,{"Night light":"vdivider","Parking sensor":"ultrasonic"})}catch(e){}
  try{wire(typeof CONCEPTS!=="undefined"?CONCEPTS:null,{"What is an orbit?":"newton","Hohmann":"hohmann","GNSS constellations":"gnss-trilat","Rockets":"stages","Radio links":"linkbudget"})}catch(e){}
  try{wire(typeof ORBTYPES!=="undefined"?ORBTYPES:null,{"HEO":"kepler"})}catch(e){}
  try{wire(typeof AILESS!=="undefined"?AILESS:null,{"A neuron":"neuron","Is the model any good?":"confusion","Cleaning data":"pandas","Space project: spot a bad sensor":"zscore"})}catch(e){}
}
/* run after all scripts have parsed, then re-render so every area picks up its diagrams */
window.addEventListener("load",()=>{dgWire();try{applyLang()}catch(e){}});
