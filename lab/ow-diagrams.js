"use strict";
/* Orbitworks prep: diagrams (same dark Mission Lab style as diagrams.js). Loaded after diagrams.js. */
(function(){
const ar=l=>l==="ar";
const earth=(cx,cy,r)=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#0f2a63" stroke="${DG_C}88" stroke-width="1.4"/><path d="M${cx-r*.6} ${cy-r*.3}q${r*.4} ${-r*.4} ${r*.9} ${-r*.1}M${cx-r*.7} ${cy+r*.35}q${r*.5} ${r*.2} ${r*1.1} ${-r*.05}" fill="none" stroke="${DG_A}66" stroke-width="1.6"/>`;
const arrowDef=(id,c)=>`<marker id="${id}" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6z" fill="${c}"/></marker>`;

Object.assign(DIAG,{
"ow-kepler":l=>dgWrap(`
 <ellipse cx="170" cy="92" rx="124" ry="62" fill="none" stroke="${DG_V}" stroke-width="1.8" stroke-dasharray="1 0"/>
 ${earth(214,92,22)}
 <circle cx="262" cy="52" r="6" fill="${DG_G}"/>
 <path d="M262 52l14 8" stroke="${DG_G}" stroke-width="2" marker-end="url(#owK1)"/>
 ${dgT(236,114,ar(l)?"الحضيض":"perigee",DG_C,10)}<path d="M236 118v0" />
 ${dgT(46,98,ar(l)?"الأوج":"apogee",DG_C,10)}
 <path d="M236 92h54M46 92h-0" stroke="${DG_C}55" stroke-dasharray="3 4"/>
 ${dgT(160,170,"v² = μ ( 2/r − 1/a )",DG_G,13)}
 ${dgT(160,18,ar(l)?"أسرع عند الحضيض، أبطأ عند الأوج":"fastest at perigee, slowest at apogee",DG_M,10.5)}
 <defs>${arrowDef("owK1",DG_G)}</defs>`),
"ow-sso":l=>dgWrap(`
 <g stroke="${DG_G}" stroke-width="2" opacity=".9">${[30,56,82,108,134].map(y=>`<path d="M14 ${y}h34" marker-end="url(#owS1)"/>`).join("")}</g>
 <circle cx="28" cy="16" r="9" fill="${DG_G}"/>${dgT(30,40,ar(l)?"الشمس":"Sun",DG_G,10,"start")}
 ${earth(190,92,44)}
 <ellipse cx="190" cy="92" rx="22" ry="76" fill="none" stroke="${DG_V}" stroke-width="2" transform="rotate(7 190 92)"/>
 <circle cx="196" cy="16" r="5" fill="${DG_C}"/>
 <path d="M252 30q18 20 0 44" fill="none" stroke="${DG_C}" stroke-width="1.4" marker-end="url(#owS2)"/>
 ${dgT(280,56,"97.4°",DG_C,12)}
 ${dgT(160,172,ar(l)?"المدار بيلف 0.9856° في اليوم: نفس الوقت الشمسي المحلي دايمًا":"plane turns 0.9856°/day: same local solar time every pass",DG_M,10)}
 <defs>${arrowDef("owS1",DG_G)}${arrowDef("owS2",DG_C)}</defs>`),
"ow-frames":l=>dgWrap(`
 ${earth(100,92,40)}
 <path d="M100 92V28M100 92h70M100 92l-34 30" stroke="${DG_V}" stroke-width="1.8" marker-end="url(#owF1)"/>
 ${dgT(100,22,"Z",DG_V,11)}${dgT(178,96,"X ECI",DG_V,10,"start")}${dgT(60,134,"Y",DG_V,11)}
 <path d="M100 92l-26-52M100 92l56 -30" stroke="${DG_A}" stroke-width="1.8" marker-end="url(#owF2)"/>
 ${dgT(70,34,"X ECEF",DG_A,10,"end")}
 <path d="M140 54a50 50 0 0 1 4 36" fill="none" stroke="${DG_G}" stroke-width="1.6" marker-end="url(#owF3)"/>
 ${dgT(206,60,"ECI",DG_V,12,"start")}${dgT(244,60,ar(l)?"ثابت في الفضاء":"inertial",DG_M,9.5,"start")}
 ${dgT(206,84,"ECEF",DG_A,12,"start")}${dgT(244,84,ar(l)?"بيلف مع الأرض":"spins w/ Earth",DG_M,9.5,"start")}
 ${dgT(206,108,"LVLH",DG_G,12,"start")}${dgT(244,108,ar(l)?"مع القمر":"on the sat",DG_M,9.5,"start")}
 ${dgT(160,170,ar(l)?"اتأكد دايمًا إنت في أنهي إطار قبل أي معادلة":"always ask: which frame is this vector in?",DG_M,10.5)}
 <defs>${arrowDef("owF1",DG_V)}${arrowDef("owF2",DG_A)}${arrowDef("owF3",DG_G)}</defs>`),
"ow-kf":l=>dgWrap(`
 <rect x="22" y="54" width="104" height="56" rx="12" fill="#071026" stroke="${DG_V}" stroke-width="1.6"/>
 ${dgT(74,78,ar(l)?"توقّع":"PREDICT",DG_V,12)}${dgT(74,96,ar(l)?"نموذج المدار":"orbit model",DG_M,9.5)}
 <rect x="194" y="54" width="104" height="56" rx="12" fill="#071026" stroke="${DG_A}" stroke-width="1.6"/>
 ${dgT(246,78,ar(l)?"صحّح":"UPDATE",DG_A,12)}${dgT(246,96,ar(l)?"قياس GNSS":"GNSS fix",DG_M,9.5)}
 <path d="M126 70h66" stroke="${DG_G}" stroke-width="2.2" marker-end="url(#owQ1)"/>
 <path d="M246 54V30H74v24" fill="none" stroke="${DG_G}" stroke-width="2.2" marker-end="url(#owQ1)"/>
 <ellipse cx="160" cy="132" rx="46" ry="14" fill="none" stroke="${DG_R}" stroke-width="1.6"/>
 <ellipse cx="160" cy="132" rx="20" ry="6" fill="${DG_A}33" stroke="${DG_A}" stroke-width="1.6"/>
 ${dgT(160,26,ar(l)?"كل خطوة":"every step",DG_G,10)}
 ${dgT(160,164,ar(l)?"عدم اليقين بيكبر بالتوقّع ويصغر بالقياس":"uncertainty grows when predicting, shrinks when measuring",DG_M,10)}
 <defs>${arrowDef("owQ1",DG_G)}</defs>`),
"ow-triad":l=>dgWrap(`
 <path d="M90 130L90 40" stroke="${DG_G}" stroke-width="2.4" marker-end="url(#owT1)"/>${dgT(90,32,ar(l)?"الشمس":"sun",DG_G,10.5)}
 <path d="M90 130L150 64" stroke="${DG_C}" stroke-width="2.4" marker-end="url(#owT2)"/>${dgT(160,58,ar(l)?"مغناطيسي":"mag field",DG_C,10.5,"start")}
 <path d="M200 130L168 56" stroke="${DG_G}" stroke-width="2.4" stroke-dasharray="4 3" marker-end="url(#owT1)"/>
 <path d="M200 130L266 80" stroke="${DG_C}" stroke-width="2.4" stroke-dasharray="4 3" marker-end="url(#owT2)"/>
 ${dgT(90,150,ar(l)?"الإطار المرجعي (معروف)":"reference frame (known)",DG_M,10)}
 ${dgT(220,150,ar(l)?"إطار القمر (مقاس)":"body frame (measured)",DG_M,10)}
 <path d="M124 100q36 -26 58 0" fill="none" stroke="${DG_V}" stroke-width="2" marker-end="url(#owT3)"/>
 ${dgT(154,78,"R ?",DG_V,13)}
 ${dgT(160,14,ar(l)?"اتجاهين معروفين = اتجاه القمر":"two known directions give the attitude",DG_M,10.5)}
 <defs>${arrowDef("owT1",DG_G)}${arrowDef("owT2",DG_C)}${arrowDef("owT3",DG_V)}</defs>`),
"ow-adcs":l=>dgWrap(`
 <rect x="112" y="48" width="96" height="76" rx="8" fill="#071026" stroke="${DG_C}" stroke-width="1.8"/>
 <circle cx="160" cy="86" r="22" fill="none" stroke="${DG_V}" stroke-width="2.4"/>
 <path d="M160 86l14 -10" stroke="${DG_V}" stroke-width="2"/>
 ${dgT(160,90,"RW",DG_V,10)}
 <path d="M120 140h80" stroke="${DG_A}" stroke-width="5" stroke-linecap="round"/>${dgT(160,157,ar(l)?"ملف مغناطيسي":"magnetorquer",DG_A,10)}
 <path d="M60 60q-16 30 0 60M260 60q16 30 0 60" fill="none" stroke="${DG_G}" stroke-width="1.5" stroke-dasharray="3 3"/>
 ${dgT(40,92,"B",DG_G,13)}${dgT(282,92,"B",DG_G,13)}
 <path d="M104 56a62 62 0 0 1 112 0" fill="none" stroke="${DG_C}" stroke-width="1.6" marker-end="url(#owA1)"/>
 ${dgT(160,32,ar(l)?"عزم على القمر = عكس تسارع العجلة":"wheel speeds up, satellite turns the other way",DG_M,10)}
 <defs>${arrowDef("owA1",DG_C)}</defs>`),
"ow-bus":l=>{const b=(x,y,w,h,c,s,s2)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="#071026" stroke="${c}" stroke-width="1.5"/>${dgT(x+w/2,y+h/2-1,s,c,10.5)}${s2?dgT(x+w/2,y+h/2+12,s2,DG_M,8.5):""}`;
 return dgWrap(`
 ${b(118,66,84,48,DG_C,"OBC",ar(l)?"الكمبيوتر":"computer")}
 ${b(18,18,84,40,DG_G,"EPS",ar(l)?"الطاقة":"power")}${b(118,12,84,40,DG_V,"ADCS",ar(l)?"التوجيه":"attitude")}${b(218,18,84,40,DG_A,"TT&C",ar(l)?"الاتصال":"radio")}
 ${b(18,122,84,40,DG_R,ar(l)?"حراري":"Thermal","")}${b(118,122,84,40,DG_M,ar(l)?"دفع":"Propulsion","")}${b(218,122,84,40,DG_C,ar(l)?"الحمولة":"Payload",ar(l)?"حسّاسات + AI":"sensors + AI")}
 <g stroke="${DG_M}88" stroke-width="1.2"><path d="M160 66V52M102 40h16M202 40h16M60 58L130 66M260 58L190 66M60 122L130 114M260 122L190 114M160 114v8"/></g>`)},
"ow-eo":l=>dgWrap(`
 <rect x="146" y="14" width="28" height="14" rx="3" fill="${DG_C}" /><rect x="132" y="18" width="12" height="6" fill="${DG_V}"/><rect x="176" y="18" width="12" height="6" fill="${DG_V}"/>
 <path d="M160 28L84 140M160 28L236 140" stroke="${DG_C}66" stroke-width="1.4"/>
 <path d="M160 28V150" stroke="${DG_M}" stroke-dasharray="3 4"/>
 <path d="M40 150Q160 128 280 150" fill="none" stroke="${DG_A}" stroke-width="2.4"/>
 <path d="M160 28L204 140" stroke="${DG_R}" stroke-width="1.6"/>
 <path d="M160 142 204 142" stroke="${DG_R}" stroke-width="3"/>
 ${dgT(210,132,ar(l)?"خطأ على الأرض":"ground error",DG_R,10,"start")}
 <path d="M160 70a46 46 0 0 1 17 3" fill="none" stroke="${DG_G}" stroke-width="1.6"/>${dgT(188,66,"Δθ",DG_G,12,"start")}
 ${dgT(110,100,"GSD",DG_C,11)}
 ${dgT(160,172,ar(l)?"خطأ الأرض ≈ الارتفاع × خطأ الاتجاه":"ground error ≈ altitude × pointing error",DG_M,10.5)}`),
"ow-pass":l=>dgWrap(`
 <path d="M0 150Q160 118 320 150V180H0z" fill="#0f2a63" stroke="${DG_C}88"/>

 <path d="M20 120Q160 -10 300 120" fill="none" stroke="${DG_V}" stroke-width="1.8" stroke-dasharray="4 4"/>
 <path d="M70 80Q160 22 250 80" fill="none" stroke="${DG_G}" stroke-width="3.2"/>
 <circle cx="250" cy="80" r="6" fill="${DG_C}"/>
 <rect x="150" y="118" width="20" height="12" rx="2" fill="${DG_A}"/><path d="M160 118V104" stroke="${DG_A}" stroke-width="2"/>
 <path d="M160 118L70 80M160 118L250 80" stroke="${DG_A}66" stroke-width="1.3"/>
 ${dgT(160,148,ar(l)?"محطة أبوظبي":"Abu Dhabi station",DG_A,10.5)}
 ${dgT(160,52,ar(l)?"نافذة اتصال: حوالي 5 لـ 10 دقايق":"contact window: about 5 to 10 min",DG_G,10.5)}
 ${dgT(160,170,ar(l)?"كل مدار 95 دقيقة، والتمريرة قصيرة، فالتخطيط هو الأساس":"orbit is 95 min, the pass is short, so planning is everything",DG_M,10)}`),
"ow-ait":l=>{const s=(x,c,a,b)=>`<rect x="${x}" y="50" width="62" height="58" rx="10" fill="#071026" stroke="${c}" stroke-width="1.6"/>${dgT(x+31,76,a,c,10.5)}${dgT(x+31,92,b,DG_M,8.5)}`;
 return dgWrap(`
 ${s(14,DG_C,ar(l)?"اهتزاز":"Vibe",ar(l)?"شيكر":"shaker")}${s(84,DG_R,"TVAC",ar(l)?"حرارة+فاكيوم":"heat+vacuum")}${s(154,DG_V,"EMC",ar(l)?"تداخل":"interference")}${s(224,DG_A,ar(l)?"جاهز":"Ready",ar(l)?"للإطلاق":"to launch")}
 <path d="M78 79h6M148 79h6M218 79h6" stroke="${DG_G}" stroke-width="2.4"/>
 ${dgT(160,26,ar(l)?"اختبر زي ما هتطير":"test as you fly",DG_G,12)}
 ${dgT(160,150,ar(l)?"المصنع: أبوظبي (KEZAD)":"facility: Abu Dhabi (KEZAD)",DG_M,10.5)}`)},
"ow-constel":l=>dgWrap(`
 ${earth(160,92,36)}
 ${[0,60,120].map((r,i)=>`<ellipse cx="160" cy="92" rx="28" ry="78" fill="none" stroke="${[DG_C,DG_V,DG_G][i]}88" stroke-width="1.5" transform="rotate(${r} 160 92)"/>`).join("")}
 ${[[160,14,DG_C],[160,170,DG_C],[104,66,DG_V],[216,118,DG_V],[222,64,DG_G],[98,120,DG_G]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="4.5" fill="${p[2]}"/>`).join("")}
 ${dgT(40,172,ar(l)?"10 أقمار، كل كام ساعة بتزور أي نقطة":"10 satellites revisit any point about every 4 h",DG_M,10,"start")}`)
});
})();
