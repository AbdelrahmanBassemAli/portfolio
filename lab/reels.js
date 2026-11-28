"use strict";
/* Mission Lab Reels: short self-playing concept explainers in a vertical
   swipeable feed. Additive layer: owns only .rl-* nodes and #reelsRoot.
   Pure code animation (SVG+CSS), bilingual, reduced-motion aware, offline. */
Object.assign(STR.en,{
 rlOpen:"Reels",rlWatch:"▶ Watch the reel",rlSwipe:"Swipe up · tap to pause",
 rlReplay:"↻ Watch again",rlClose:"Close reels",rlNext:"Next reel",rlPrev:"Previous reel",
 rlDone:"That's the set — pick any lesson to go deeper"});
Object.assign(STR.ar,{
 rlOpen:"ريلز",rlWatch:"▶ اتفرّج على الريل",rlSwipe:"اسحب لفوق · دوس للإيقاف",
 rlReplay:"↻ اتفرّج تاني",rlClose:"قفل الريلز",rlNext:"الريل اللي بعده",rlPrev:"الريل اللي قبله",
 rlDone:"خلصت المجموعة — افتح أي درس تتعمق أكتر"});

const RL_RM=matchMedia("(prefers-reduced-motion: reduce)");
const rlT=k=>STR[LANG][k]||k;

const NAJM_SVG='<svg viewBox="0 0 96 108" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
+'<ellipse cx="48" cy="103" rx="22" ry="4" fill="#77deff" opacity=".18"/>'
+'<rect x="30" y="56" width="36" height="40" rx="14" fill="#c5d8f1" stroke="#6882ae" stroke-width="2"/>'
+'<circle cx="48" cy="38" r="26" fill="#dce9f8" stroke="#6882ae" stroke-width="2.5"/>'
+'<rect x="28" y="24" width="40" height="26" rx="13" fill="#071627" stroke="#183651" stroke-width="2"/>'
+'<circle cx="40" cy="37" r="4" fill="#8ef3ff"/><circle cx="56" cy="37" r="4" fill="#8ef3ff"/>'
+'<path d="M42 45 Q48 49 54 45" stroke="#8ef3ff" stroke-width="2" fill="none" stroke-linecap="round"/>'
+'<rect x="40" y="64" width="16" height="10" rx="3" fill="#0b153a"/>'
+'<circle cx="48" cy="69" r="3" fill="#56e4ff"/></svg>';

const REELS=[
{id:"blink",track:"robotics",dur:13,
 title:{en:"Blink: the hello-world of hardware",ar:"بلينك: «أهلًا بالعالم» بتاع الهاردوير"},
 caps:[[0,"One LED. One pin. Zero excuses.","LED واحد. طرف واحد. ومفيش أعذار."],
   [3.5,"digitalWrite(HIGH): 5 volts flow, the LED lights up.","digitalWrite(HIGH) يعني ٥ فولت ماشيين، والنور ولّع."],
   [7,"delay(1000): the chip just counts milliseconds and waits.","delay(1000) الشريحة بتعد ميلي ثانية وتستنى."],
   [10.3,"Loop it forever: that's every robot's heartbeat.","ويكررها للأبد: دي ضربات قلب أي روبوت."]],
 najm:{at:5.5,en:"My first blink made me prouder than graduation day 🎓",ar:"أول بلينك عملته فرّحني أكتر من يوم تخرجي 🎓"},
 scene:`<svg viewBox="0 0 300 226" class="rl-svg rls-blink">
  <rect x="18" y="26" width="170" height="120" rx="12" class="bd"/>
  <text x="30" y="46" class="lb" style="font-size:11px;fill:#bfe9f2">ARDUINO UNO</text>
  <circle cx="60" cy="80" r="8" class="chipb"/>
  <line x1="150" y1="70" x2="196" y2="70" class="wire pinpulse" stroke-width="3"/>
  <circle cx="212" cy="70" r="16" class="led"/>
  <text x="204" y="104" class="lb">D13 · LED</text>
  <rect x="150" y="52" width="10" height="36" rx="2" class="chipb"/>
  <g><rect x="26" y="158" width="192" height="15" class="hl"/><text x="30" y="169" class="codet">pinMode(13, OUTPUT);</text>
  <text x="30" y="184" class="codet">digitalWrite(13, HIGH);  // ON</text>
  <text x="30" y="199" class="codet">delay(1000);             // wait</text>
  <text x="30" y="214" class="codet">digitalWrite(13, LOW);   // OFF ↩</text></g></svg>`},
{id:"ohm",track:"robotics",dur:13,
 title:{en:"Ohm's law: V = I × R",ar:"قانون أوم: V = I × R"},
 caps:[[0,"Voltage pushes. Current flows. Resistance says no.","الفولت بيدفع. التيار بيمشي. والمقاومة بتقول لأ."],
   [4.3,"Same push, more resistance: less current gets through.","نفس الدفعة مع مقاومة أكبر: تيار أقل بيعدّي."],
   [8.6,"That's why your LED needs a resistor, or it burns out fast.","عشان كده الLED محتاج مقاومة، وإلا هيتحرق بسرعة."]],
 najm:{at:5.5,en:"Three letters holding up all of electronics 🤯",ar:"تلات حروف شايلين الإلكترونيات كلها 🤯"},
 scene:`<svg viewBox="0 0 300 210" class="rl-svg rls-ohm">
  <path d="M150 30 L220 130 L80 130 Z" class="tri"/>
  <text x="150" y="88" text-anchor="middle" class="numt vv" style="font-size:26px;fill:#ffd479;color:#ffd479">V</text>
  <text x="112" y="124" text-anchor="middle" class="numt vi" style="font-size:26px;fill:#56e4ff;color:#56e4ff">I</text>
  <text x="188" y="124" text-anchor="middle" class="numt vr" style="font-size:26px;fill:#ac8bff;color:#ac8bff">R</text>
  <text x="150" y="118" text-anchor="middle" class="lb" style="fill:#8fb3d9">×</text>
  <line x1="30" y1="170" x2="270" y2="170" class="wire" opacity=".35"/>
  <rect x="120" y="162" width="60" height="16" rx="3" class="chipb"/>
  <g class="flow" style="color:#56e4ff"><circle cx="40" cy="170" r="4" class="cyn"/><circle cx="40" cy="170" r="4" class="cyn"/><circle cx="40" cy="170" r="4" class="cyn"/></g>
  <text x="150" y="200" text-anchor="middle" class="lb">5V ÷ 220Ω ≈ 23mA</text></svg>`},
{id:"pwm",track:"robotics",dur:14,
 title:{en:"PWM: faking analog with a digital pin",ar:"PWM: التماثلي المزيّف من طرف رقمي"},
 caps:[[0,"A digital pin only knows ON and OFF.","الطرف الرقمي مبيعرفش غير شغال وطافي."],
   [3.8,"So it switches thousands of times a second…","فبيقلّب آلاف المرات في الثانية…"],
   [7.6,"…and your eyes read the average: 10% dim, 50% half, 90% bright.","…وعينك بتاخد المتوسط: ١٠٪ خافت، ٥٠٪ نص، ٩٠٪ نور."],
   [11.2,"Same trick drives motor speed and servo angles.","نفس الحيلة بتظبط سرعة الموتور وزاوية السيرفو."]],
 najm:{at:6,en:"It's lying to the LED and the LED totally believes it 😂",ar:"بيضحك على الLED والLED مصدّق 😂"},
 scene:`<svg viewBox="0 0 300 210" class="rl-svg rls-pwm">
  <circle cx="150" cy="46" r="20" class="gld lume" opacity=".15"/>
  <text x="150" y="84" text-anchor="middle" class="lb">LED</text>
  <g class="ph ph1"><polyline points="40,150 40,120 60,120 60,150 100,150 100,120 120,120 120,150 160,150 160,120 180,120 180,150 220,150 220,120 240,120 240,150 260,150" fill="none" stroke="#56e4ff" stroke-width="2.5"/>
  <text x="150" y="180" text-anchor="middle" class="numt" style="font-size:13px">duty 10%</text></g>
  <g class="ph ph2"><polyline points="40,150 40,120 80,120 80,150 120,150 120,120 160,120 160,150 200,150 200,120 240,120 240,150 260,150" fill="none" stroke="#ac8bff" stroke-width="2.5"/>
  <text x="150" y="180" text-anchor="middle" class="numt" style="font-size:13px">duty 50%</text></g>
  <g class="ph ph3"><polyline points="40,150 40,120 100,120 100,150 110,150 110,120 170,120 170,150 180,150 180,120 240,120 240,150 260,150" fill="none" stroke="#ffd479" stroke-width="2.5"/>
  <text x="150" y="180" text-anchor="middle" class="numt" style="font-size:13px">duty 90%</text></g>
  <line x1="36" y1="150" x2="264" y2="150" stroke="#33436b" stroke-width="1"/></svg>`},
{id:"vars",track:"python",dur:12,
 title:{en:"Variables: labeled boxes",ar:"المتغيرات: علب عليها أسماء"},
 caps:[[0,"A variable is a box with a name written on it.","المتغير علبة مكتوب عليها اسم."],
   [4,"x = 42 — now the box holds a number.","x = 42 — العلبة بقت شايلة رقم."],
   [8,'x = "hi" — same box, new contents. Python keeps up.','x = "أهلًا" — نفس العلبة، محتوى جديد. وبايثون مش بتزعل.']],
 najm:{at:4.5,en:"Name them well. Future-you says thanks 🙏",ar:"سمّيهم صح. إنت اللي في المستقبل هيقولك متشكر 🙏"},
 scene:`<svg viewBox="0 0 300 210" class="rl-svg rls-vars">
  <rect x="85" y="55" width="130" height="90" rx="10" class="box" fill="#0b153a" stroke="#56e4ff" stroke-width="2.5"/>
  <rect x="120" y="40" width="60" height="24" rx="6" fill="#ac8bff"/>
  <text x="150" y="57" text-anchor="middle" class="numt" style="font-size:14px;font-weight:700">x</text>
  <text x="150" y="112" text-anchor="middle" class="numt val1" style="font-size:30px">42</text>
  <text x="150" y="112" text-anchor="middle" class="numt val2" style="font-size:30px;fill:#5ef0b8">"hi"</text>
  <text x="150" y="136" text-anchor="middle" class="lb val1">int</text>
  <text x="150" y="136" text-anchor="middle" class="lb val2" style="fill:#5ef0b8">str</text>
  <text x="150" y="180" text-anchor="middle" class="codet" style="font-size:12px">x = 42   →   x = "hi"</text></svg>`},
{id:"loops",track:"python",dur:13,
 title:{en:"Loops: do it again (and again)",ar:"الحلقات: كرّرها تاني (وتاني)"},
 caps:[[0,"for i in range(5): count with me.","for i in range(5): تعالوا نعد."],
   [4,"0, 1, 2, 3, 4 — yes, counting starts at zero.","٠، ١، ٢، ٣، ٤ — أيوه، العد بيبدأ من صفر."],
   [8.3,"while True: — that's how a robot blinks forever.","while True: — كده الروبوت بيومض للأبد."]],
 najm:{at:5.5,en:"range(5) never reaches 5. Don't fight it 😄",ar:"range(5) عمرها ما بتوصل لـ٥. متزعلش 😄"},
 scene:`<svg viewBox="0 0 300 210" class="rl-svg rls-loops">
  <circle cx="70" cy="90" r="16" class="d d1"/><circle cx="110" cy="90" r="16" class="d d2"/>
  <circle cx="150" cy="90" r="16" class="d d3"/><circle cx="190" cy="90" r="16" class="d d4"/>
  <circle cx="230" cy="90" r="16" class="d d5"/>
  <g class="cnt"><text x="150" y="150" text-anchor="middle" class="numt c0" style="font-size:24px">i = 0</text>
  <text x="150" y="150" text-anchor="middle" class="numt c1" style="font-size:24px">i = 1</text>
  <text x="150" y="150" text-anchor="middle" class="numt c2" style="font-size:24px">i = 2</text>
  <text x="150" y="150" text-anchor="middle" class="numt c3" style="font-size:24px">i = 3</text>
  <text x="150" y="150" text-anchor="middle" class="numt c4" style="font-size:24px">i = 4</text></g>
  <text x="150" y="185" text-anchor="middle" class="codet" style="font-size:12px">for i in range(5): blink()</text></svg>`},
{id:"orbit",track:"space",dur:14,
 title:{en:"Orbits: falling and missing the ground",ar:"المدار: بتقع… وبتفوّت الأرض"},
 caps:[[0,"A satellite is falling. Constantly.","القمر الصناعي واقع. طول الوقت."],
   [4.3,"But it moves sideways so fast, it keeps missing Earth.","بس ماشي جنبي بسرعة جدًا، فبيفوّت الأرض كل مرة."],
   [8.8,"That balance between falling and speed is called an orbit.","الاتزان بين الوقوع والسرعة ده اسمه مدار."]],
 najm:{at:5.5,en:"Falling with style since 1957 🛰",ar:"واقعين بستايل من 1957 🛰"},
 scene:`<svg viewBox="0 0 300 210" class="rl-svg rls-orbit">
  <ellipse cx="150" cy="100" rx="95" ry="62" class="path"/>
  <circle cx="150" cy="100" r="26" class="earth"/>
  <path d="M138 96 q6 8 12 2 q8 -6 14 4" stroke="#5ef0b8" stroke-width="3" fill="none" opacity=".7"/>
  <line x1="245" y1="100" x2="176" y2="100" class="fall"/>
  <g class="orb"><g transform="translate(245 100)"><rect x="-8" y="-5" width="16" height="10" rx="2" fill="#c5d8f1" stroke="#6882ae"/><rect x="-22" y="-3" width="12" height="6" fill="#56e4ff" opacity=".8"/><rect x="10" y="-3" width="12" height="6" fill="#56e4ff" opacity=".8"/></g></g>
  <text x="150" y="192" text-anchor="middle" class="lb">sideways speed ≈ 7.8 km/s in LEO</text></svg>`},
{id:"gps",track:"space",dur:14,
 title:{en:"GPS: four satellites find you",ar:"GPS: أربع أقمار بيلاقوك"},
 caps:[[0,"Every satellite broadcasts its exact time, nonstop.","كل قمر بيذيع التوقيت المظبوط بتاعه، من غير توقف."],
   [4.6,"Your phone hears each one a tiny bit late.","موبايلك بيسمع كل واحد متأخر جزء من الثانية."],
   [9,"Four tiny delays become one exact dot: you.","أربع فروق صغيرة بتتحول لنقطة واحدة مظبوطة: إنت."]],
 najm:{at:6,en:"And it still loses me inside the mall 😅",ar:"ومع ذلك بيضيّعني جوه المول 😅"},
 scene:`<svg viewBox="0 0 300 210" class="rl-svg rls-gps">
  <g class="s1" transform="translate(60 45)"><circle r="9" fill="#c5d8f1" stroke="#6882ae"/><rect x="-20" y="-3" width="10" height="6" fill="#56e4ff"/><rect x="10" y="-3" width="10" height="6" fill="#56e4ff"/><circle r="12" class="sig"/></g>
  <g class="s2" transform="translate(150 28)"><circle r="9" fill="#c5d8f1" stroke="#6882ae"/><rect x="-20" y="-3" width="10" height="6" fill="#56e4ff"/><rect x="10" y="-3" width="10" height="6" fill="#56e4ff"/><circle r="12" class="sig"/></g>
  <g class="s3" transform="translate(240 45)"><circle r="9" fill="#c5d8f1" stroke="#6882ae"/><rect x="-20" y="-3" width="10" height="6" fill="#56e4ff"/><rect x="10" y="-3" width="10" height="6" fill="#56e4ff"/><circle r="12" class="sig"/></g>
  <line x1="60" y1="60" x2="140" y2="150" stroke="#56e4ff55" stroke-dasharray="3 5"/>
  <line x1="150" y1="42" x2="150" y2="150" stroke="#56e4ff55" stroke-dasharray="3 5"/>
  <line x1="240" y1="60" x2="160" y2="150" stroke="#56e4ff55" stroke-dasharray="3 5"/>
  <rect x="128" y="148" width="44" height="26" rx="5" class="chipb"/>
  <g transform="translate(150 142)"><path d="M0 -10 a8 8 0 1 1 -0.01 0 M0 2 L-6 -6 M0 2 L6 -6" class="pin" fill="#ffd479" stroke="#b8860b"/></g>
  <text x="150" y="196" text-anchor="middle" class="lb">trilateration · need ≥ 4 satellites</text></svg>`},
{id:"sensors",track:"robotics",dur:13,
 title:{en:"Ultrasonic: seeing with sound",ar:"الألتراسونيك: يشوف بالصوت"},
 caps:[[0,"The sensor shouts a ping too high for you to hear.","الحساس بيصوّت صوت أعلى من إنك تسمعه."],
   [4.3,"The ping hits the wall and echoes back.","الصوت بيخبط في الحيطة ويرجع صدى."],
   [8.6,"Echo time × speed of sound = distance. Physics did the math.","زمن الصدى × سرعة الصوت = المسافة. الفيزيا حلّت المسألة."]],
 najm:{at:5,en:"Bats invented this millions of years ago 🦇",ar:"الخفافيش مخترعينها من ملايين السنين 🦇"},
 scene:`<svg viewBox="0 0 300 210" class="rl-svg rls-sonic">
  <rect x="30" y="70" width="52" height="34" rx="6" fill="#1d4ed8" stroke="#56e4ff" stroke-width="1.5"/>
  <circle cx="44" cy="87" r="9" class="eye"/><circle cx="68" cy="87" r="9" class="eye"/>
  <text x="56" y="120" text-anchor="middle" class="lb">HC-SR04</text>
  <rect x="228" y="45" width="14" height="110" rx="3" class="wall"/>
  <g class="ping"><path d="M92 80 q12 7 0 14" stroke="#ffd479" stroke-width="2.5" fill="none"/><path d="M100 74 q18 13 0 26" stroke="#ffd479" stroke-width="2" fill="none" opacity=".6"/></g>
  <g class="dst"><text x="150" y="185" text-anchor="middle" class="numt dA" style="font-size:17px">120 cm</text>
  <text x="150" y="185" text-anchor="middle" class="numt dB" style="font-size:17px">84 cm</text>
  <text x="150" y="185" text-anchor="middle" class="numt dC" style="font-size:17px">37 cm</text></g></svg>`},
{id:"nn",track:"ai",dur:14,
 title:{en:"A neural net in 14 seconds",ar:"شبكة عصبية في ١٤ ثانية"},
 caps:[[0,"Numbers go in. Each connection multiplies by a weight.","أرقام بتدخل. كل وصلة بتضربها في وزن."],
   [4.6,"Layers add up, squash, and pass the signal forward.","طبقات بتجمع، بتضغط، وبتعدّي الإشارة قدام."],
   [9,"Training nudges the weights until answers come out right.","التدريب بيظبط الأوزان لحد ما الإجابات تطلع صح."],
   [11.8,"That's it. The rest is math and patience.","دي كل الحكاية. الباقي رياضيات وصبر."]],
 najm:{at:6,en:"I'm basically this, plus a jetpack ✨",ar:"أنا بالظبط كده، زائد جيت باك ✨"},
 scene:`<svg viewBox="0 0 300 210" class="rl-svg rls-nn">
  <g class="lnk"><line x1="60" y1="60" x2="140" y2="45"/><line x1="60" y1="60" x2="140" y2="105"/><line x1="60" y1="60" x2="140" y2="165"/>
  <line x1="60" y1="105" x2="140" y2="45"/><line x1="60" y1="105" x2="140" y2="105"/><line x1="60" y1="105" x2="140" y2="165"/>
  <line x1="60" y1="150" x2="140" y2="45"/><line x1="60" y1="150" x2="140" y2="105"/><line x1="60" y1="150" x2="140" y2="165"/>
  <line x1="160" y1="45" x2="240" y2="105"/><line x1="160" y1="105" x2="240" y2="105"/><line x1="160" y1="165" x2="240" y2="105"/></g>
  <g class="w1"><circle cx="60" cy="60" r="12" class="nd"/><circle cx="60" cy="105" r="12" class="nd"/><circle cx="60" cy="150" r="12" class="nd"/></g>
  <g class="w2"><circle cx="150" cy="45" r="12" class="nd"/><circle cx="150" cy="105" r="12" class="nd"/><circle cx="150" cy="165" r="12" class="nd"/></g>
  <circle cx="240" cy="105" r="14" class="nd out"/>
  <text x="240" y="110" text-anchor="middle" class="numt ok" style="font-size:14px;fill:#050b1b;font-weight:800">✓</text>
  <text x="60" y="185" text-anchor="middle" class="lb">inputs</text>
  <text x="150" y="195" text-anchor="middle" class="lb">hidden layers</text>
  <text x="240" y="140" text-anchor="middle" class="lb">reading OK?</text></svg>`},
{id:"motors",track:"robotics",dur:13,
 title:{en:"H-bridge: how motors reverse",ar:"الـH-bridge: إزاي الموتور بيلف بالعكس"},
 caps:[[0,"A motor spins whichever way the current flows.","الموتور بيلف على حسب اتجاه التيار."],
   [4.3,"An H-bridge is four switches that flip the flow.","الـH-bridge أربع مفاتيح بيقلبوا الاتجاه."],
   [8.6,"Forward… reverse… that's how a robot turns around.","قدام… ورا… كده الروبوت بيلف مكانه."]],
 najm:{at:5.5,en:"Never close all four switches at once. Boom 💥",ar:"متقفلش الأربع مفاتيح مع بعض أبدًا. بوم 💥"},
 scene:`<svg viewBox="0 0 300 210" class="rl-svg rls-hb">
  <line x1="70" y1="40" x2="230" y2="40" class="wire"/>
  <line x1="70" y1="152" x2="230" y2="152" class="wire"/>
  <line x1="90" y1="40" x2="90" y2="152" class="wire" opacity=".5"/>
  <line x1="210" y1="40" x2="210" y2="152" class="wire" opacity=".5"/>
  <rect x="80" y="52" width="20" height="14" rx="3" class="swA"/><rect x="200" y="52" width="20" height="14" rx="3" class="swA"/>
  <rect x="80" y="126" width="20" height="14" rx="3" class="swB"/><rect x="200" y="126" width="20" height="14" rx="3" class="swB"/>
  <circle cx="150" cy="96" r="26" fill="#0b153a" stroke="#ac8bff" stroke-width="2.5"/>
  <g class="rot"><line x1="150" y1="96" x2="150" y2="76" stroke="#ffd479" stroke-width="4" stroke-linecap="round"/><circle cx="150" cy="96" r="4" fill="#ffd479"/></g>
  <text x="150" y="140" text-anchor="middle" class="lb">M</text>
  <text x="56" y="44" class="numt pol1" style="font-size:16px;font-weight:800">+</text>
  <text x="240" y="44" class="numt pol2" style="font-size:16px;font-weight:800">−</text>
  <text x="150" y="185" text-anchor="middle" class="lb">L298N does this for you</text></svg>`}
];

/* lesson accordions that get a "watch the reel" button, by slug id */
const RL_HOOKS={
 "c-digital-vs-analog-signals":0,
 "c-ohm-s-law-and-resistors":1,
 "c-pwm-faking-analog-with-a-digital-pin":2,
 "c-variables-naming-things":3,
 "c-loops-do-it-again":4,
 "c-what-is-an-orbit":5,
 "c-gnss-constellations-and-accuracy":6,
 "c-gnss-positioning-on-the-ground-and-in-orbit":6,
 "c-parking-sensor-with-ultrasonic-distance":7,
 "c-night-light-with-a-light-sensor":7,
 "c-a-tiny-neural-network":8,
 "c-a-neuron-and-a-neural-network":8,
 "c-motors-and-drivers":9};

const RL={open:false,idx:0,elapsed:0,playing:false,paused:false,finished:false,raf:0,lastTs:0,els:null,seen:0};
const rlTrackName=tr=>({robotics:"areaRobotics",space:"areaSpace",ai:"areaAi",python:"tabPython"}[tr]||"areaRobotics");

function rlBuild(){
 const root=document.getElementById("reelsRoot");
 root.innerHTML=`<div class="rl-wrap${RL_RM.matches?" rm":""}" hidden role="dialog" aria-modal="true" aria-label="Reels">
  <div class="rl-top">
   <div class="rl-segs">${REELS.map(()=>"<i><b></b></i>").join("")}</div>
   <div class="rl-meta"><span class="rl-count"></span><span class="rl-trackchip"></span>
    <button type="button" class="rl-x" aria-label="${rlT("rlClose")}">✕</button></div>
  </div>
  <div class="rl-stage"><div class="rl-track">${REELS.map((r,i)=>`<section class="rl-reel" data-i="${i}">
    <div class="rl-title" data-rl="title"></div>
    <div class="rl-scene">${r.scene}</div>
    <div class="rl-caps"><div class="rl-cap" data-rl="cap"></div></div>
    <div class="rl-najm" data-rl="najm">${NAJM_SVG}<div class="rl-bubble" data-rl="bubble"></div></div>
   </section>`).join("")}</div></div>
  <div class="rl-paused-badge" aria-hidden="true">❚❚</div>
  <div class="rl-navd"><button type="button" data-d="-1" aria-label="${rlT("rlPrev")}">▲</button><button type="button" data-d="1" aria-label="${rlT("rlNext")}">▼</button></div>
  <button type="button" class="rl-replay" hidden></button>
  <div class="rl-hint">☝ <span data-rl="hint"></span></div>
 </div>`;
 const w=root.firstElementChild;
 RL.els={wrap:w,track:w.querySelector(".rl-track"),segs:[...w.querySelectorAll(".rl-segs i")],
  count:w.querySelector(".rl-count"),chip:w.querySelector(".rl-trackchip"),x:w.querySelector(".rl-x"),
  navUp:w.querySelector('.rl-navd [data-d="-1"]'),navDn:w.querySelector('.rl-navd [data-d="1"]'),
  replay:w.querySelector(".rl-replay"),hint:w.querySelector(".rl-hint"),hintTxt:w.querySelector("[data-rl=hint]"),
  reels:[...w.querySelectorAll(".rl-reel")]};
 RL.els.x.addEventListener("click",rlClose);
 RL.els.navUp.addEventListener("click",()=>rlGo(RL.idx-1));
 RL.els.navDn.addEventListener("click",()=>{if(RL.finished)rlReplayCur();else rlGo(RL.idx+1)});
 RL.els.replay.addEventListener("click",rlReplayCur);
 /* swipe up/down + tap to pause */
 let py=0,pt=0,moved=0;
 w.addEventListener("pointerdown",e=>{py=e.clientY;pt=Date.now();moved=0},{passive:true});
 w.addEventListener("pointermove",e=>{moved=Math.max(moved,Math.abs(e.clientY-py))},{passive:true});
 w.addEventListener("pointerup",e=>{
  const dy=e.clientY-py;
  if(Math.abs(dy)>56&&Date.now()-pt<600){dy<0?(RL.finished?rlReplayCur():rlGo(RL.idx+1)):rlGo(RL.idx-1)}
  else if(moved<8&&e.target.closest(".rl-scene,.rl-caps,.rl-reel"))rlTogglePause();
 },{passive:true});
 let wl=0;
 w.addEventListener("wheel",e=>{const n=Date.now();if(n-wl<450||Math.abs(e.deltaY)<24)return;wl=n;e.deltaY>0?rlGo(RL.idx+1):rlGo(RL.idx-1)},{passive:true});
 window.addEventListener("keydown",rlKeys);
 document.addEventListener("visibilitychange",()=>{if(document.hidden&&RL.open&&!RL.paused)rlTogglePause()});
}
function rlKeys(e){
 if(!RL.open)return;
 if(e.key==="Escape")rlClose();
 else if(e.key==="ArrowDown"||e.key==="PageDown"){e.preventDefault();RL.finished?rlReplayCur():rlGo(RL.idx+1)}
 else if(e.key==="ArrowUp"||e.key==="PageUp"){e.preventDefault();rlGo(RL.idx-1)}
 else if(e.key===" "){e.preventDefault();rlTogglePause()}
}
function rlTick(ts){
 if(!RL.playing)return;
 if(!RL.lastTs)RL.lastTs=ts;
 const dt=Math.min((ts-RL.lastTs)/1000,.1);RL.lastTs=ts;
 if(!RL.paused)RL.elapsed+=dt;
 const r=REELS[RL.idx],p=Math.min(RL.elapsed/r.dur,1);
 RL.els.segs[RL.idx].firstElementChild.style.width=(p*100)+"%";
 rlSetCaption(r);
 if(RL.elapsed>=r.dur){RL.playing=false;rlFinish();return}
 RL.raf=requestAnimationFrame(rlTick);
}
function rlSetCaption(r){
 const el=RL.els.reels[RL.idx].querySelector("[data-rl=cap]");
 let cur=r.caps[0];
 for(const c of r.caps)if(RL.elapsed>=c[0])cur=c;
 const txt=LANG==="ar"?cur[2]:cur[1];
 if(el.dataset.v!==txt){el.dataset.v=txt;el.textContent=txt;el.dir=isAr(txt)?"rtl":"ltr"}
 el.classList.add("show");
 const nj=RL.els.reels[RL.idx].querySelector("[data-rl=najm]");
 if(RL.elapsed>=r.najm.at){
  if(!nj.dataset.v){nj.dataset.v="1";const b=nj.querySelector("[data-rl=bubble]");const t2=LANG==="ar"?r.najm.ar:r.najm.en;b.textContent=t2;b.dir=isAr(t2)?"rtl":"ltr"}
  nj.classList.add("show");
 }
}
function rlFinish(){
 RL.finished=true;
 RL.els.segs[RL.idx].classList.add("done");
 RL.els.segs[RL.idx].firstElementChild.style.width="100%";
 RL.els.replay.hidden=false;
 if(RL.idx<REELS.length-1)setTimeout(()=>{if(RL.open&&RL.finished)rlGo(RL.idx+1)},900);
 else{const cap=RL.els.reels[RL.idx].querySelector("[data-rl=cap]");cap.textContent=rlT("rlDone");cap.dataset.v=rlT("rlDone");cap.dir=LANG==="ar"?"rtl":"ltr"}
}
function rlGo(i){
 i=Math.max(0,Math.min(REELS.length-1,i));
 if(i===RL.idx&&RL.open&&!RL.finished&&RL.playing)return;
 RL.idx=i;RL.elapsed=0;RL.finished=false;RL.paused=false;RL.lastTs=0;
 const w=RL.els.wrap;
 w.classList.remove("paused");
 RL.els.track.style.transform=`translateY(${-i*100}%)`;
 RL.els.reels.forEach((s,k)=>{
  s.classList.toggle("act",k===i);
  if(k!==i){const c=s.querySelector("[data-rl=cap]");c.classList.remove("show");c.dataset.v="";
   const n=s.querySelector("[data-rl=najm]");n.classList.remove("show");n.dataset.v=""}
 });
 RL.els.segs.forEach((g,k)=>{g.classList.toggle("done",k<i);if(k>i){g.classList.remove("done");g.firstElementChild.style.width="0"}else if(k===i)g.firstElementChild.style.width="0"});
 RL.els.replay.hidden=true;
 RL.els.hint.classList.toggle("gone",RL.seen>1||i>0);
 rlTexts();
 cancelAnimationFrame(RL.raf);
 if(RL_RM.matches){rlStatic(r=>{});return}
 RL.playing=true;RL.raf=requestAnimationFrame(rlTick);
}
function rlStatic(){
 /* reduced motion: show every caption and the cameo as static text */
 const r=REELS[RL.idx],s=RL.els.reels[RL.idx];
 const cap=s.querySelector("[data-rl=cap]");
 cap.innerHTML=r.caps.map(c=>{const t2=LANG==="ar"?c[2]:c[1];return `<div class="rl-cap" dir="${isAr(t2)?"rtl":"ltr"}">${t2}</div>`}).join("");
 cap.classList.add("show");cap.dataset.v="static";
 const nj=s.querySelector("[data-rl=najm]");const b=nj.querySelector("[data-rl=bubble]");
 const t2=LANG==="ar"?r.najm.ar:r.najm.en;b.textContent=t2;b.dir=isAr(t2)?"rtl":"ltr";nj.classList.add("show");
 RL.els.segs[RL.idx].classList.add("done");
}
function rlTogglePause(){
 if(RL_RM.matches||RL.finished)return;
 RL.paused=!RL.paused;
 RL.els.wrap.classList.toggle("paused",RL.paused);
}
function rlReplayCur(){RL.finished=false;RL.els.segs[RL.idx].classList.remove("done");rlGo(RL.idx)}
function rlTexts(){
 const r=REELS[RL.idx];
 RL.els.count.textContent=`${RL.idx+1} / ${REELS.length}`;
 RL.els.chip.textContent=t(rlTrackName(r.track));
 RL.els.reels[RL.idx].querySelector("[data-rl=title]").textContent=LANG==="ar"?r.title.ar:r.title.en;
 RL.els.hintTxt.textContent=rlT("rlSwipe");
 RL.els.replay.textContent=rlT("rlReplay");
 RL.els.x.setAttribute("aria-label",rlT("rlClose"));
}
function openReels(i){
 if(!RL.els)rlBuild();
 RL.open=true;RL.seen++;
 document.body.style.overflow="hidden";
 RL.els.wrap.hidden=false;
 rlGo(typeof i==="number"?i:0);
 const btn=document.getElementById("reelsOpen");if(btn)btn.setAttribute("aria-expanded","true");
}
function rlClose(){
 RL.open=false;RL.playing=false;cancelAnimationFrame(RL.raf);
 document.body.style.overflow="";
 RL.els.wrap.hidden=true;
 const btn=document.getElementById("reelsOpen");if(btn)btn.setAttribute("aria-expanded","false");
}
window.openReels=openReels;

/* per-lesson "watch the reel" hooks: re-injected after every re-render */
function rlInjectHooks(){
 Object.keys(RL_HOOKS).forEach(sl=>{
  const el=document.getElementById(sl);if(!el)return;
  if(el.querySelector(".rl-watch"))return;
  const body=el.querySelector(".l-body");if(!body)return;
  const b=document.createElement("button");
  b.type="button";b.className="rl-watch";b.textContent=rlT("rlWatch");
  b.addEventListener("click",e=>{e.stopPropagation();openReels(RL_HOOKS[sl])});
  const done=body.querySelector(".l-done");
  body.insertBefore(b,done||null);
 });
}
(window.EXT_RENDER=window.EXT_RENDER||[]).push(()=>{rlInjectHooks();if(RL.open)rlTexts()});

/* nav entry */
{const nb=document.getElementById("reelsOpen");
 if(nb){nb.addEventListener("click",()=>openReels(0));
  const sp=nb.querySelector("[data-i18n=rlOpen]")||nb.querySelector("span");
  if(sp)sp.textContent=rlT("rlOpen");}}
rlInjectHooks();
