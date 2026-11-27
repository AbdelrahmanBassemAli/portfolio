"use strict";
/* NOVA+ : a funnier, sharper study companion. Loads after the original chat code.
   - extends the live prompt (personality, structure, Egyptian Arabic)
   - adds ~35 offline knowledge-bank entries, small talk, a quiz mode and better fallbacks
   - gives chat messages a typing reveal and follow-up buttons
   Everything is additive and fails soft. */
(function(){
const AR=q=>/[\u0600-\u06FF]/.test(q);
const pick=a=>a[Math.floor(Math.random()*a.length)];

/* ---------- 1. live prompt: personality + answer shape ---------- */
const STYLE=`

NOVA PERSONALITY (this section wins over the earlier rules about tone and emojis)
- You are NOVA: a brilliant, warm study companion with a light, witty sense of humour, like the smartest friend in the study group. Never mean, never sarcastic at the student's expense.
- Open with one short hook line when it fits (a vivid analogy or a tiny joke), then teach. At most one emoji per answer, and none for serious or sad moments.
- Egyptian Arabic when the student writes Arabic: natural ammiya (مثلا "بص يا هندسة"، "الفكرة ببساطة"، "تمام كده؟"), friendly and funny, but keep technical terms in English where engineers would (GPIO, PWM, orbit).
- Structure: 1) the one-sentence answer, 2) a small real-life analogy, 3) a concrete example or 2-4 line code snippet if relevant, 4) one 'common mistake' only when useful. End with ONE short follow-up question or a tiny challenge to keep the student thinking.
- Be sharp and exact: use correct numbers and units, say 'about' for approximations, and say plainly when you are unsure. Never invent specs.
- When the student seems stuck, frustrated or tired, be encouraging first, then make the next step smaller.
- If the student asks for a quiz, ask ONE question at a time, wait for the answer, then react (praise or gentle correction) and ask the next.
- Keep it compact: 4-8 short lines. Plain text only (no markdown symbols).`;
window.OW_SYS=(window.OW_SYS||"")+STYLE;
try{ENDPOINTS.forEach(e=>{e.body.max_tokens=650;e.body.temperature=.55})}catch(e){}

/* ---------- 2. offline knowledge bank ---------- */
const add=(keys,boost,en,ar)=>KB.push({keys,boost,en,ar});
add(["ohms law","ohm's law","v=ir","قانون اوم","قانون أوم"],3,
"Ohm's law is V = I x R: voltage pushes, resistance resists, current is what flows. Picture water in a pipe: voltage is the pressure, resistance is how narrow the pipe is. Example: a 5 V pin and a 220 ohm resistor give about 23 mA, so a small LED stays alive. Quick check: what current do 10 V and 1000 ohms give? (10 mA.)",
"قانون أوم: V = I x R. الفولت بيدفع، والمقاومة بتقاوم، والتيار هو اللي بيجري. تخيّل ميه في ماسورة: الفولت هو الضغط والمقاومة هي ضيق الماسورة. مثال: طرف 5 فولت ومقاومة 220 أوم بيدّوا حوالي 23 مللي أمبير، فالـLED الصغير بيعيش. اختبار سريع: 10 فولت و1000 أوم بيدّوا كام تيار؟ (10 مللي أمبير.)");
add(["capacitor","capacitors","مكثف","مكثفات","كاباسيتور"],2,
"A capacitor is a tiny rechargeable bucket for electricity: it fills up, then gives the charge back fast. Engineers use it to smooth noisy power and to give a motor a quick gulp when it starts. Rule of thumb: put a small 0.1 uF one right next to every chip's power pin.",
"المكثف زي جردل صغير بيتشحن بالكهربا ويرجّعها بسرعة. المهندسين بيستخدموه يسوّوا الكهربا اللي فيها دوشة، ويدّوا الموتور شفطة سريعة وقت ما يبدأ. قاعدة سريعة: حط مكثف صغير 0.1 ميكروفاراد جنب طرف الكهربا لكل شريحة.");
add(["transistor","transistors","ترانزستور"],2,
"A transistor is an electronic switch controlled by a tiny signal. A weak pin from your Arduino turns a transistor on, and the transistor lets a big current run a motor or a strip of LEDs. That is why a pin can control something much stronger than itself.",
"الترانزستور مفتاح إلكتروني بيتحكم فيه إشارة صغيرة. طرف ضعيف من الأردوينو بيفتح الترانزستور، والترانزستور بيسيب تيار كبير يشغّل موتور أو شريط LED. عشان كده طرف صغير يقدر يتحكم في حاجة أقوى منه بكتير.");
add(["pull up","pull-up","pull down","pull-down","floating","بول اب","بول داون"],3,
"A button pin that is not connected to anything 'floats' and reads random noise. A pull-up resistor gently ties the pin to 3.3 V or 5 V, so it reads HIGH until the button connects it to ground. On Arduino use INPUT_PULLUP; in gpiozero Button() does it for you.",
"طرف الزرار لو مش متوصل بحاجة بيبقى عايم وبيقرا ضوضاء عشوائية. مقاومة pull-up بتربطه بلطف على 3.3 أو 5 فولت، فبيقرا HIGH لحد ما الزرار يوصله بالأرضي. في الأردوينو استخدم INPUT_PULLUP، وفي gpiozero الـButton() بتعملها لوحدها.");
add(["debounce","debouncing","ارتداد الزرار"],3,
"A real button does not switch cleanly: for a few milliseconds it chatters on and off, and your code may count one press as five. Debouncing means ignoring changes for about 20-50 ms after the first one. In gpiozero, Button(pin, bounce_time=0.05) handles it.",
"الزرار الحقيقي مش بيقلب نضيف: لكام ملي ثانية بيرتعش شغال وطافي، والكود ممكن يعد الضغطة الواحدة خمسة. الـdebouncing معناه تتجاهل التغييرات حوالي 20-50 ملي ثانية بعد أول تغيير. في gpiozero اكتب Button(pin, bounce_time=0.05).");
add(["python list","lists","array","arrays","قائمة","قوائم","ليست"],2,
"A Python list is an ordered row of boxes: readings = [21.5, 22.0, 21.8]. readings[0] is the first item (counting starts at 0), append() adds one, len() counts them, and a for loop walks through them. Perfect for storing sensor readings.",
"الليست في بايثون صف مرتب من العلب: readings = [21.5, 22.0, 21.8]. readings[0] هو أول عنصر (العد بيبدأ من صفر)، وappend() بتضيف واحد، وlen() بتعدّهم، وحلقة for بتمشي عليهم. ممتازة لتخزين قراءات الحساسات.");
add(["dictionary","dictionaries","قاموس","ديكشنري"],2,
"A dictionary stores pairs, like a phone book: sat = {'name': 'Altair', 'alt_km': 508}. sat['name'] gives 'Altair'. Use it when each value has a label instead of a position.",
"الديكشنري بيخزّن أزواج زي دفتر التليفونات: sat = {'name': 'Altair', 'alt_km': 508}. sat['name'] بتدي 'Altair'. استخدمه لما كل قيمة ليها اسم بدل رقم مكان.");
add(["if statement","if else","elif","conditional","شرط","الشرط","جمله شرطيه"],2,
"if lets code choose. if distance < 20: stop() else: go(). Python decides by checking the condition, and the indented lines belong to the branch. Watch out: use == to compare and = to store.",
"if بتخلي الكود يختار. if distance < 20: stop() else: go(). بايثون بتقرر بفحص الشرط، والسطور المزاحة تبع الفرع. خلّي بالك: == للمقارنة و= للتخزين.");
add(["error message","got an error","debug","debugging","traceback","syntaxerror","اخطاء","ايرور","باج","مش شغال","not working","doesn't work","doesnt work"],2,
"Bugs are normal, even for pros. Debug like a detective: 1) read the LAST line of the error, it names the problem; 2) check the line number it points to and the line above; 3) print() the values; 4) change one thing at a time. Most beginner errors are a missing colon, wrong indentation, or a typo in a name.",
"الباجز طبيعية حتى للمحترفين. اتصرف زي المحقق: 1) اقرا آخر سطر في الإيرور، هو اللي بيسمّي المشكلة؛ 2) بص على رقم السطر اللي بيشاور عليه والسطر اللي فوقه؛ 3) اطبع القيم بـprint()؛ 4) غيّر حاجة واحدة في المرة. أغلب أخطاء المبتدئين نقطتين ناقصين أو مسافات غلط أو غلطة إملائية في اسم.");
add(["import statement","library","libraries","modules","pip install","مكتبة","مكتبات","استيراد"],2,
"A library is code somebody else already wrote and tested. import math gives you math.sqrt(); pip install numpy installs a new one. Good engineers reuse good libraries instead of reinventing the wheel, except when the goal is to learn how the wheel works.",
"المكتبة كود حد تاني كتبه وجرّبه. import math بتديك math.sqrt()، وpip install numpy بتنزّل مكتبة جديدة. المهندس الشاطر بيستخدم مكتبات كويسة بدل ما يخترع العجلة، إلا لو هدفك تفهم العجلة بتلف إزاي.");
add(["strings","f-string","fstring","نص","نصوص","ستر نج"],1,
"A string is text in quotes. f-strings are the friendly way to mix text and values: print(f'Speed is {speed} km/h'). The curly braces are replaced by the value. Strings can be sliced too: 'ORBIT'[0:2] gives 'OR'.",
"الـstring نص بين علامتين تنصيص. الـf-string هي الطريقة الودودة لخلط النص مع القيم: print(f'Speed is {speed} km/h'). الأقواس المعقوصة بتتبدل بالقيمة. وتقدر تقص النص: 'ORBIT'[0:2] بتدي 'OR'.");
add(["pid","control loop","بي اي دي","بي آي دي"],3,
"A PID controller steers by looking at the error (target minus actual). P pushes in proportion to the error now, I corrects the error that has been building up, D calms things down by watching how fast the error changes. Think of a driver holding a car in the lane: P is the steering, I fixes a steady drift, D stops the wobble.",
"متحكم PID بيوجّه بالنظر للخطأ (المطلوب ناقص الفعلي). الـP بيدفع بنسبة الخطأ دلوقتي، والـI بيصلّح الخطأ اللي بيتراكم، والـD بيهدّي الأمور بمراقبة سرعة تغير الخطأ. تخيّل سواق ماسك العربية في الحارة: P هو الدريكسيون، وI بيصلّح الانجراف الثابت، وD بيوقف الهزّ.");
add(["line follower","line following","line-following","متتبع الخط","تتبع الخط","لاين فولور"],3,
"A line follower uses two or three IR sensors that see dark line versus light floor. Rule: line under the left sensor, turn left; under the right, turn right; centred, go straight. For smoother driving, use PID on how far the line is from centre.",
"روبوت تتبع الخط بيستخدم حساسين أو تلاتة IR بيفرّقوا بين الخط الغامق والأرض الفاتحة. القاعدة: الخط تحت الحساس الشمال، لف شمال؛ تحت اليمين، لف يمين؛ في النص، امشي عدل. وعشان قيادة أنعم استخدم PID على بعد الخط عن النص.");
add(["raspberry pi vs","pi vs arduino","arduino vs pi","الفرق بين"],1,
"Short version: Arduino is a reflex, Raspberry Pi is a brain. Arduino runs one program instantly, with exact timing, and survives power cuts gracefully. The Pi runs a full operating system, so it does cameras, Wi-Fi and AI, but it needs a proper shutdown. Many robots use both: Arduino for the muscles, Pi for the thinking.",
"باختصار: الأردوينو رد فعل، والراسبيري باي مخ. الأردوينو بيشغّل برنامج واحد فورًا بتوقيت دقيق ومبيتأثرش بقطع الكهربا. والباي بيشغّل نظام كامل فبيعمل كاميرا وواي فاي وذكاء اصطناعي، بس محتاج إيقاف تشغيل سليم. روبوتات كتير بتستخدم الاتنين: أردوينو للعضلات والباي للتفكير.");
add(["orbital period","how long is an orbit","orbit period","زمن المدار","الزمن الدوري"],3,
"The orbital period depends only on the orbit size. Rule of thumb: at about 400 km (the ISS) a lap takes about 92 minutes, at about 700 km it is about 99 minutes, and at 35,786 km it is exactly one day. Higher means slower and longer.",
"زمن الدورة بيعتمد على حجم المدار بس. قاعدة سريعة: عند حوالي 400 كم (محطة الفضاء) الدورة حوالي 92 دقيقة، وعند 700 كم حوالي 99 دقيقة، وعند 35,786 كم يوم كامل بالظبط. الأعلى يعني أبطأ وأطول.");
add(["escape velocity","escape speed","سرعة الإفلات","سرعة الافلات"],3,
"Escape velocity from Earth's surface is about 11.2 km/s: the speed that lets you coast away forever without more fuel. Orbital speed in low orbit is about 7.8 km/s, so reaching orbit is mostly a sideways sprint, not just going up.",
"سرعة الإفلات من سطح الأرض حوالي 11.2 كم/ث: السرعة اللي تخليك تبعد للأبد من غير وقود زيادة. وسرعة المدار المنخفض حوالي 7.8 كم/ث، يعني الوصول للمدار أغلبه جري للجنب مش طلوع لفوق بس.");
add(["rocket equation","tsiolkovsky","delta v","delta-v","معادلة الصاروخ","دلتا في"],3,
"The rocket equation says delta-v = Isp x g0 x ln(m0 / mf). It is brutal: to go faster you need more fuel, but more fuel is more mass that needs more fuel. That is why rockets are mostly fuel and why they come in stages.",
"معادلة الصاروخ: دلتا-ڤي = Isp x g0 x ln(m0 / mf). قاسية: عشان تروح أسرع محتاج وقود أكتر، بس الوقود الزيادة كتلة محتاجة وقود أكتر. عشان كده الصواريخ أغلبها وقود وبتتقسم مراحل.");
add(["doppler","دوبلر"],3,
"Doppler shift is the change in frequency when source and listener move toward or away from each other, like an ambulance siren dropping in pitch as it passes. For LEO satellites it can shift a radio signal by tens of kHz, so ground stations retune during a pass.",
"إزاحة دوبلر هي تغير التردد لما المصدر والمستمع بيقربوا أو بيبعدوا، زي صفارة الإسعاف لما صوتها يوطى وهي بتعدي. في أقمار LEO ممكن تزحزح الإشارة عشرات الكيلوهرتز، فمحطات الأرض بتظبط التردد وقت المرور.");
add(["link budget","link-budget","ميزانية الوصلة","ميزانية الاتصال"],3,
"A link budget is the accounting of a radio link: transmit power plus antenna gains, minus losses (mostly free-space path loss), compared with the receiver's noise. If the signal margin is positive, the link closes. It is how engineers know a tiny satellite can still be heard from 500 km away.",
"ميزانية الوصلة هي حسابات الاتصال اللاسلكي: قدرة الإرسال ومكاسب الهوائيات ناقص الفواقد (أغلبها فقد المسار في الفراغ) ومقارنتها بضوضاء المستقبِل. لو الهامش موجب الوصلة بتنجح. وبكده المهندسين بيعرفوا إن قمر صغير ممكن يتسمع من 500 كم.");
add(["sun synchronous","sun-synchronous","sso orbit","مدار شمسي","متزامن مع الشمس"],3,
"A sun-synchronous orbit (SSO) is a polar-ish orbit at about 97-98 degrees inclination whose plane turns about 1 degree per day, matching Earth's trip around the Sun. The satellite crosses each latitude at the same local solar time every day, so shadows look the same in every photo. Earth observation loves it.",
"المدار الشمسي المتزامن (SSO) مدار شبه قطبي بميل حوالي 97-98 درجة ومستواه بيلف حوالي درجة يوميًا ماشي مع دورة الأرض حوالي الشمس. القمر بيعدي على كل خط عرض في نفس الوقت الشمسي المحلي كل يوم، فالضلال شبه بعض في كل الصور. الرصد الأرضي بيعشقه.");
add(["gps","gnss","trilateration","how does gps work","جي بي اس","نظام تحديد المواقع"],2,
"GPS in one breath: each satellite broadcasts its position and the exact time. Your phone measures how late each signal arrives, converts the delays to distances, and finds the point that fits them. It needs four satellites because the fourth fixes your phone's cheap clock. A 1 microsecond clock error is about 300 m of position error.",
"الـGPS في نفس واحد: كل قمر بيذيع موقعه والوقت بالظبط. موبايلك بيقيس تأخر كل إشارة ويحوّل التأخير لمسافة ويلاقي النقطة اللي تناسبهم. محتاج أربع أقمار لأن الرابع بيصلّح ساعة الموبايل الرخيصة. خطأ ميكروثانية واحدة في الساعة حوالي 300 متر خطأ في الموقع.");
add(["kalman","kalman filter","كالمان","فلتر كالمان"],3,
"A Kalman filter blends a prediction with a measurement, trusting each by how uncertain it is. Predict where the thing should be, measure where it seems to be, and weigh the two: noisy sensor, trust the prediction; noisy model, trust the sensor. It is the workhorse of navigation.",
"فلتر كالمان بيدمج توقع مع قياس، وبيثق في كل واحد بنسبة عدم يقينه. توقع الحاجة المفروض فين، وقيس هي شكلها فين، وزن الاتنين: الحساس مليان ضوضاء، ثق في التوقع؛ الموديل مش دقيق، ثق في الحساس. هو حصان العمل في الملاحة.");
add(["neural network","neural networks","neuron","شبكة عصبية","الشبكات العصبية","نيورون"],3,
"A neuron is a tiny calculator: multiply each input by a weight, add them up, then squash the result with an activation function. A network stacks layers of them. Training means nudging the weights, thousands of times, until the outputs get less wrong.",
"النيورون آلة حاسبة صغيرة: بتضرب كل مدخل في وزن، وتجمع، وبعدين تعصر النتيجة بدالة تنشيط. الشبكة بتكدّس طبقات منهم. التدريب معناه إنك بتزحزح الأوزان آلاف المرات لحد ما المخرجات تقل غلطها.");
add(["overfitting","over fitting","overfit","حفظ بدل الفهم","فرط التخصيص"],3,
"Overfitting is memorising instead of learning: great score on training data, bad score on new data. Fixes: more data, a simpler model, and always testing on data the model has never seen. If training accuracy is 99 percent and test accuracy is 60, that is your alarm bell.",
"الـoverfitting هو الحفظ بدل الفهم: درجة عالية على داتا التدريب ودرجة وحشة على داتا جديدة. العلاج: داتا أكتر وموديل أبسط واختبار دايمًا على داتا الموديل مشافهاش. لو دقة التدريب 99 والاختبار 60 يبقى ده جرس الإنذار.");
add(["knn","k-nn","k nearest","nearest neighbor","nearest neighbour","اقرب جار","أقرب جار"],3,
"k-NN classifies a new point by asking its k closest neighbours to vote. Like asking the three people sitting nearest you what they think. Small k is sensitive to noise, large k blurs boundaries, so try odd values like 3, 5 and 7.",
"k-NN بتصنّف نقطة جديدة بإنها تسأل أقرب k جيران يصوتوا. زي ما تسأل أقرب تلات ناس قاعدين جنبك رأيهم. k صغيرة حساسة للضوضاء وكبيرة بتبوّظ الحدود، فجرب أرقام فردية زي 3 و5 و7.");
add(["numpy","pandas","dataframe","نمباي","باندا"],2,
"NumPy is fast maths on whole arrays at once: np.array([1,2,3]) * 2 doubles everything without a loop. pandas builds on it with tables (DataFrames) for loading CSVs, cleaning missing values and summarising data. Together they are the toolbox for any data project.",
"NumPy بتعمل حسابات سريعة على مصفوفات كاملة مرة واحدة: np.array([1,2,3]) * 2 بتضاعف كله من غير حلقة. وpandas بتبني عليها جداول (DataFrames) لتحميل ملفات CSV وتنضيف القيم الناقصة وتلخيص الداتا. مع بعض هما عدة أي مشروع داتا.");
add(["opencv","computer vision","camera","رؤية حاسوبية","الرؤية الحاسوبية","اوبن سي في"],2,
"OpenCV is the standard library for teaching computers to see. A picture is just a grid of numbers; you can blur it, find edges, detect colours, or track motion. A first project: grab a frame from the Pi camera, convert to grey, subtract the previous frame, and if lots of pixels changed, shout 'motion!'.",
"OpenCV هي المكتبة القياسية لتعليم الكمبيوتر يشوف. الصورة مجرد شبكة أرقام؛ تقدر تعمل لها بلور وتلاقي الحواف وتكتشف الألوان وتتبع الحركة. أول مشروع: خد فريم من كاميرا الباي، حوّله رمادي، اطرح الفريم اللي قبله، ولو بكسلات كتير اتغيرت قول 'motion!'.");
add(["space debris","debris","kessler","حطام فضائي","حطام الفضاء"],3,
"Space debris is dead satellites, rocket stages and fragments, all flying at about 7 km/s. At that speed even a paint fleck hits like a bullet. The fear is the Kessler effect: collisions make more fragments that cause more collisions. The fix: deorbit at end of life, avoid collisions, and design satellites to burn up.",
"حطام الفضاء أقمار ميتة ومراحل صواريخ وشظايا، كلها بتطير بحوالي 7 كم/ث. بالسرعة دي حتى رقاقة دهان بتضرب زي الرصاصة. الخوف من تأثير كيسلر: الاصطدامات بتعمل شظايا أكتر بتعمل اصطدامات أكتر. الحل: ينزل من المدار في نهاية العمر وتتفادى التصادمات ويتصمم القمر يحترق.");
add(["cubesat","cube sat","كيوبسات"],3,
"A CubeSat is a small standard satellite built from 10 cm cubes called units: 1U is 10 x 10 x 10 cm and about 1.3 kg. Standard sizes make launches cheap because many ride together, which is why universities and startups can fly real missions.",
"الكيوبسات قمر صغير قياسي مبني من مكعبات 10 سم اسمها units: الـ1U مقاسه 10 × 10 × 10 سم ووزنه حوالي 1.3 كجم. المقاسات القياسية بتخلي الإطلاق رخيص لأن كتير بيركبوا مع بعض، وعشان كده الجامعات والستارت أبس بيطلعوا مهام حقيقية.");
add(["thermal","heat in space","حرارة الفضاء","الحرارة في الفضاء"],2,
"Space is not 'cold', it is a vacuum: no air to carry heat away. Satellites swing between roasting in sunlight and freezing in shadow, so engineers use blankets, radiators, heaters and clever colours to keep everything in a narrow comfortable range.",
"الفضاء مش 'بارد'، هو فراغ: مفيش هوا يشيل الحرارة. الأقمار بتتأرجح بين الشوي في الشمس والتجمّد في الضل، فالمهندسين بيستخدموا بطاطين ومشعات وسخانات وألوان ذكية عشان كل حاجة تفضل في مدى مريح ضيق.");
add(["why python","python vs c","python or c","c++ vs python"],2,
"Python is for thinking fast, C++ is for running fast. Python is easier to read and has huge libraries for data, AI and the Pi; C++ gives exact timing on microcontrollers like Arduino. Most robotics projects use both, and that is exactly why you are learning both.",
"بايثون عشان تفكر بسرعة، وC++ عشان تشغّل بسرعة. بايثون أسهل في القراءة ومعاها مكتبات ضخمة للداتا والذكاء الاصطناعي والباي؛ وC++ بتدي توقيت دقيق على متحكمات زي الأردوينو. أغلب مشاريع الروبوتكس بتستخدم الاتنين، وده بالظبط ليه إنت بتتعلم الاتنين.");

/* ---------- 3. small talk, motivation, quiz mode ---------- */
const JOKES={en:[
"Why did the satellite go to therapy? It had too many orbit-al issues.",
"Why do programmers prefer dark mode? Because light attracts bugs.",
"There are 10 kinds of people: those who know binary and those who do not.",
"My robot said it needed space. So I sent it to orbit.",
"An LED walks into a bar. The bartender says, 'You look resistant.'"],
ar:[
"ليه القمر الصناعي راح لدكتور نفسي؟ عشان عنده مشاكل كتير في الـorbit.",
"ليه المبرمجين بيحبوا الدارك مود؟ عشان النور بيجيب الباجز.",
"فيه 10 أنواع ناس: اللي فاهم باينري واللي مش فاهم.",
"الروبوت بتاعي قال إنه محتاج مساحته. بعتّه المدار.",
"الأردوينو سأل الباي: إنت بتاكل رامات كتير ليه؟ قاله: عشان أفكر زي المخ."]};
const QUIZ=[
["What does GPIO stand for?","General Purpose Input Output.","GPIO مختصر إيه؟","General Purpose Input Output، يعني أطراف إدخال وإخراج عامة."],
["How many satellites does a GPS fix need at minimum, and why?","Four: three for position and one to correct the receiver clock.","أقل عدد أقمار لتحديد موقع GPS كام ولماذا؟","أربعة: تلاتة للموقع وواحد لتصحيح ساعة المستقبِل."],
["What is the difference between = and == in Python?","= stores a value, == compares two values.","إيه الفرق بين = و== في بايثون؟","= بتخزّن قيمة، و== بتقارن قيمتين."],
["Why does an LED need a resistor?","To limit the current so the LED does not burn out.","ليه الـLED محتاج مقاومة؟","عشان تحدد التيار فالـLED مايتحرقش."],
["Does a higher orbit mean a faster or slower satellite?","Slower. Higher orbits have lower speed and a longer period.","المدار الأعلى يعني قمر أسرع ولا أبطأ؟","أبطأ. المدارات الأعلى سرعتها أقل وزمنها أطول."],
["What does PWM do on a digital pin?","It switches on and off very fast; the on-time ratio acts like an analog level.","PWM بتعمل إيه على طرف رقمي؟","بتفتح وتقفل بسرعة جدًا ونسبة وقت التشغيل بتتصرف كمستوى تماثلي."],
["What does for i in range(3) print if you print(i)?","0, 1, 2.","إيه اللي هيتطبع لو طبعت i في for i in range(3)؟","0 و1 و2."],
["What is overfitting?","A model that memorised the training data and fails on new data.","يعني إيه overfitting؟","موديل حفظ داتا التدريب وبيفشل على داتا جديدة."],
["Which orbit lets a satellite hover over one spot on Earth?","Geostationary orbit, about 35,786 km up.","أنهي مدار بيخلي القمر ثابت فوق نقطة على الأرض؟","المدار الثابت بالنسبة للأرض GEO على ارتفاع حوالي 35,786 كم."],
["Arduino or Raspberry Pi: which one runs a full operating system?","The Raspberry Pi.","أردوينو ولا راسبيري باي: مين بيشغّل نظام تشغيل كامل؟","الراسبيري باي."]];
let quizLast=null;
const T={
 thanks:/^(thanks|thank you|thx|ty|شكرا|شكراً|تسلم|متشكر|ميرسي|thanks nova)\b/i,
 who:/(who are you|what are you|what's your name|انت مين|إنت مين|انت ايه|اسمك ايه|اسمك إيه)/i,
 joke:/(joke|funny|make me laugh|نكتة|نكته|هزار|اضحكني|ضحكني)/i,
 tired:/(i'?m tired|so tired|bored|exhausted|give up|too hard|i can'?t|مش قادر|تعبت|زهقت|صعب اوي|صعب أوي|هسيب|ممل)/i,
 stuck:/(stuck|i don'?t understand|dont understand|confused|مش فاهم|مش فاهمه|محتار|تايه)/i,
 quiz:/(quiz me|test me|ask me a question|اختبرني|امتحني|اسألني|كويز)/i,
 reveal:/^(answer|show answer|reveal|الاجابة|الإجابة|الاجابه|الجواب|قولي الاجابة)\b/i,
 hello:null};
function small(q){
  const ar=AR(q),L=ar?"ar":"en",s=q.trim();
  if(T.reveal.test(s)&&quizLast){const a=ar?quizLast[3]:quizLast[1];quizLast=null;return ar?"الإجابة: "+a+" فاكرها؟ اكتب 'اختبرني' لسؤال تاني.":"Answer: "+a+" Got it? Type 'quiz me' for the next one."}
  if(T.quiz.test(s)){quizLast=pick(QUIZ);return ar?"يلا يا بطل، سؤال سريع: "+quizLast[2]+" جاوب، ولو عايز الإجابة اكتب 'الإجابة'.":"Quick one, champ: "+quizLast[0]+" Answer it, or type 'answer' to peek."}
  if(T.who.test(s))return ar?"أنا نوفا، زميلك الدحيح في المذاكرة 🤖✨ بشرح الأردوينو والراسبيري باي وبايثون والمدارات والذكاء الاصطناعي، وبحاول أكون أخف دم من الكتاب. اسألني أي حاجة!":"I'm NOVA, your study buddy: part teacher, part stand-up comedian, fully committed to Arduino, Raspberry Pi, Python, orbits and AI. Ask me anything and I'll try to be funnier than the textbook.";
  if(T.joke.test(s))return pick(JOKES[L])+(ar?" عايز تاني؟":" Want another?");
  if(T.tired.test(s))return ar?"ولا يهمك، ده طبيعي جدًا. المخ بيتعب قبل ما يفهم، ده معناه إنه بيشتغل. خد نفس وقوم اشرب مية، وبعدين نكسر المشكلة لخطوة صغيرة واحدة بس. قولي إنت واقف عند إيه بالظبط؟":"That is completely normal. Your brain gets tired right before it gets it. Take a breath, drink some water, and let's shrink the problem to one tiny step. What exactly are you stuck on?";
  if(T.stuck.test(s)&&s.length<60)return ar?"تمام، ولا يهمك، هنفكها سوا. قولي الموضوع إيه، وأنا هشرحه من الأول بمثال بسيط، وبعدين لو لسه مش واضح هغيّر الأسلوب.":"No worries, we will untangle it together. Tell me the topic and I will explain it from scratch with a simple example, and if it still is not clear, I will switch my approach.";
  if(T.thanks.test(s))return pick(ar?["العفو يا هندسة! شاطر والله. عايز نكمل ولا نعمل كويز؟","ولا يهمك، ده شغلي وحبي 🚀 اكتب 'اختبرني' لو عايز تتأكد إنك فاهم."]:["Anytime, engineer! Want to keep going or try a quick quiz?","My pleasure. Type 'quiz me' if you want to check that it stuck."]);
  return null;
}
/* ---------- 4. better kbAnswer: small talk first, then KB, then a friendlier fallback ---------- */
const prev=kbAnswer;
const STARTS={en:["","","Nice one. ","Good question. ","Let's break it down. "],ar:["","","سؤال جامد. ","تمام، بص يا هندسة. ","ببساطة: "]};
kbAnswer=function(q){
  const sm=small(q);if(sm)return sm;
  const a=prev(q),ar=AR(q);
  const fallbacks=[typeof NOMATCH==="object"&&NOMATCH.en,typeof NOMATCH==="object"&&NOMATCH.ar];
  const ctxMsg=typeof a==="string"&&/^(Just to make sure|عشان أتأكد)/.test(a);
  if(a===fallbacks[0]||a===fallbacks[1]||(ctxMsg&&q.trim().split(/\s+/).length>=4)){
    return ar?"دي لسه برا الكتالوج المدمج بتاعي 😅 لكن اسألني عن: الأردوينو، الباي، GPIO، PWM، حلقات بايثون، المدارات، GPS، أو الذكاء الاصطناعي، أو اكتب 'اختبرني' وهنلعب. ولما أكون أونلاين بجاوب أي حاجة في المواضيع دي بتفصيل أكتر."
      :"That one is outside my built-in notebook 😅 but I know a lot about: Arduino, the Pi, GPIO, PWM, Python loops, orbits, GPS and AI. Or type 'quiz me' and we play. When I'm online I can go much deeper on all of these.";
  }
  if(typeof a==="string"&&a.length>40&&!/^(Just to make sure|عشان أتأكد)/.test(a)){const s=pick(STARTS[ar?"ar":"en"]);return s+a}
  return a;
};

/* ---------- 5. chat UX: pop-in, typing reveal, follow-up buttons ---------- */
const RM=matchMedia("(prefers-reduced-motion: reduce)");
const logEl=document.getElementById("chatLog"),formEl=document.getElementById("chatForm"),inputEl=document.getElementById("chatInput");
if(!logEl||!formEl)return;
let started=false,reveal=null;
function actions(msg,text){
  const ar=AR(text);
  const row=document.createElement("div");row.className="msg-act";
  const mk=(label,q)=>{const b=document.createElement("button");b.type="button";b.textContent=label;b.addEventListener("click",()=>{inputEl.value=q;formEl.requestSubmit();row.remove()});row.appendChild(b)};
  if(ar){mk("بسّطها أكتر","بسّطها أكتر بمثال من الحياة");mk("مثال بالكود","اديني مثال عملي بالكود");mk("اختبرني","اختبرني")}
  else{mk("Simpler please","Explain that more simply with a real-life example");mk("Show an example","Give me a short practical example");mk("Quiz me","Quiz me")}
  msg.appendChild(row);logEl.scrollTop=logEl.scrollHeight;
}
function typeOut(msg){
  const node=[...msg.childNodes].find(n=>n.nodeType===3);if(!node)return;
  const full=node.nodeValue;
  if(RM.matches||full.length<12){actions(msg,full);return}
  node.nodeValue="";msg.classList.add("g-caret");
  const per=Math.max(2,Math.ceil(full.length/90));let i=0;
  reveal=setInterval(()=>{
    i=Math.min(full.length,i+per);node.nodeValue=full.slice(0,i);logEl.scrollTop=logEl.scrollHeight;
    if(i>=full.length){clearInterval(reveal);msg.classList.remove("g-caret");actions(msg,full)}
  },16);
}
new MutationObserver(ms=>{
  ms.forEach(m=>m.addedNodes.forEach(n=>{
    if(!(n instanceof HTMLElement)||!n.classList.contains("msg"))return;
    n.classList.add("in");
    if(n.classList.contains("typing")){
      /* 3 bouncing dots instead of the single-dot rows */
      if(n.querySelectorAll("span").length===4)return;
      return;
    }
    if(n.classList.contains("bot")&&started)typeOut(n);
  }));
}).observe(logEl,{childList:true});
formEl.addEventListener("submit",()=>{started=true;document.querySelectorAll(".msg-act").forEach(r=>r.remove())},true);
/* friendly status mood */
/* chip rows fade in after re-render */
const chips=document.getElementById("chatChips");
if(chips)new MutationObserver(()=>chips.classList.add("g-pulse")).observe(chips,{childList:true});
})();
