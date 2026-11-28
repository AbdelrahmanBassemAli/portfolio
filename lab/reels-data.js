"use strict";
/* Mission Lab Reels catalog: one short narrated reel per explained point of each lesson.
   R(lessonEnglishTitle, track, titleEN, titleAR, scene, [[en, ar, pose] x3]) - pose: point|wow|think|laugh|wave|happy. Last beat is Najm's quip. */
const REELS=[];
const R=(lesson,track,te,ta,scene,beats)=>REELS.push({lesson,track,title:{en:te,ar:ta},scene,beats});
const PY="Hello, Space! — your first program";

/* ===== Python ===== */
R(PY,"python","print(): your program talks","print(): برنامجك بيتكلم",{k:"code",lines:['print("Hello, Mission Lab!")','print("I am learning Python")'],out:"Hello, Mission Lab!",hi:0},[
 ["print shows text on the screen. It is how your program talks to you.","print بتعرض كلام على الشاشة. دي طريقة برنامجك إنه يكلمك.","point"],
 ["Put the text inside quotes, and Python writes it out line by line.","حط الكلام بين علامتين تنصيص، وبايثون يطبعه سطر ورا سطر.","happy"],
 ["My first print made me prouder than my graduation day.","أول print عملتها فرّحتني أكتر من يوم تخرجي.","laugh"]]);
R(PY,"python","Comments: notes Python ignores","التعليقات: ملاحظات بايثون بيتجاهلها",{k:"code",lines:['print("Hello")','# Comments start with #','# Python ignores this line','print("Still running")'],out:"Hello · Still running",hi:1},[
 ["A line that starts with a hash sign is a comment, a note for humans.","السطر اللي بيبدأ بعلامة الهاش تعليق، يعني ملاحظة للبني آدمين.","point"],
 ["Python skips it completely, so write notes to your future self.","بايثون بيعدّي عليه خالص، فاكتب ملاحظات لنفسك في المستقبل.","happy"],
 ["Future me always says thank you. Past me never explains anything.","أنا بعد شهر بشكر أنا دلوقتي. وأنا الماضي عمره ما شرح حاجة.","laugh"]]);
R(PY,"python","Indentation is grammar","المسافات في أول السطر قواعد مش زينة",{k:"code",lines:['for i in range(2):','    print("inside")','print("outside")'],out:"inside · inside · outside",hi:1},[
 ["Python reads from top to bottom, one line after another.","بايثون بيقرا من فوق لتحت، سطر ورا سطر.","point"],
 ["The spaces at the start of a line are grammar. They tell Python what belongs together.","المسافات في أول السطر جزء من القواعد. بتقول لبايثون إيه مع إيه.","think"],
 ["One wrong space and Python gets dramatic. Welcome to the club.","مسافة غلط واحدة وبايثون يعمل دراما. أهلا بيك في النادي.","laugh"]]);
R("Variables — naming things","python","A variable is a labeled box","المتغير علبة عليها اسم",{k:"box",items:[["robot",'"ORBIT"',C.cy,"string"],["wheels","6",C.vi,"int"]],tag:["robot = 'ORBIT'","robot = 'ORBIT'"]},[
 ["A variable is a box with a label. It stores a value for you.","المتغير علبة عليها اسم. بتخزن لك قيمة جواها.","point"],
 ["You pick the name, and Python figures out the type on its own.","إنت بتختار الاسم، وبايثون بيعرف النوع لوحده.","happy"],
 ["Good names are half of good code. Please don't call everything x.","الأسماء الكويسة نص الكود الكويس. بلاش تسمي كله x.","laugh"]]);
R("Variables — naming things","python","Four types: str, int, float, bool","أربع أنواع: نص، صحيح، كسر، صح/غلط",{k:"box",items:[["str",'"ORBIT"',C.cy,"text"],["int","6",C.vi,"whole"],["float","3.3",C.or,"decimal"],["bool","True",C.gr,"yes/no"]]},[
 ["Text is a string. Whole numbers are int. Decimals are float.","النص اسمه string. الأرقام الصحيحة int. والكسور float.","point"],
 ["And True or False is a bool. That is every basic type you need today.","وصح أو غلط اسمه bool. دي كل الأنواع الأساسية اللي محتاجها.","wow"],
 ["Four boxes only. Even I can remember that.","أربع علب بس. حتى أنا أقدر أحفظهم.","laugh"]]);
R("Loops — do it again","python","for: count through a range","for: عد في مدى",{k:"cycle",items:["0","1","2","3","4"],tag:"for i in range(5):",mid:"for"},[
 ["A loop repeats an action without copy and paste.","الحلقة بتكرر الأمر من غير نسخ ولزق.","point"],
 ["for counts through a range, one step at a time, until the range ends.","for بتعد في مدى، خطوة خطوة، لحد ما المدى يخلص.","happy"],
 ["Five blinks in two lines. Copy paste would cry.","خمس ومضات في سطرين. النسخ واللزق هيعيط.","laugh"]]);
R("Loops — do it again","python","range(5) starts at zero","range(5) بيبدأ من صفر",{k:"cycle",items:["0","1","2","3","4"],col:C.or,tag:["no 5 in the list!","مفيش 5 في القايمة!"],mid:"0→4"},[
 ["range(5) gives you 0, 1, 2, 3, 4. Counting starts at zero.","range(5) بتديك 0 و1 و2 و3 و4. العد بيبدأ من صفر.","point"],
 ["Five numbers, but the number five itself never shows up.","خمس أرقام، بس الرقم خمسة نفسه عمره ما بيظهر.","think"],
 ["Programmers start counting at zero. Do not ask us why.","المبرمجين بيعدوا من صفر. متسألش ليه.","laugh"]]);
R("Loops — do it again","python","while: keep going while it is true","while: كمّل طول ما الشرط صح",{k:"code",lines:['count = 3','while count > 0:','    print(count)','    count = count - 1','print("Liftoff!")'],out:"3 · 2 · 1 · Liftoff!",hi:1},[
 ["while keeps looping as long as its condition is true.","while بتفضل تلف طول ما الشرط صح.","point"],
 ["Each lap the count goes down by one. At zero the condition turns false, and the loop stops.","كل لفة العداد بينقص واحد. عند الصفر الشرط يبقى غلط، والحلقة بتقف.","happy"],
 ["Forget to lower the count and it loops forever. Ask me how I know.","انسى تنقص العداد وهتلف للأبد. اسألني عرفت إزاي.","laugh"]]);
R("Functions — your own commands","python","def: package steps under a name","def: لمّ الخطوات تحت اسم",{k:"machine",name:"greet()",inp:"👋",inl:"call",out:"💬",outl:"hello!",tag:"def greet(name):"},[
 ["A function packages steps under one name, so you can reuse them.","الدالة بتجمّع خطوات تحت اسم واحد عشان تعيد استخدامها.","point"],
 ["def creates it. Then you call it by name whenever you want.","def بتنشئها. وبعد كده تناديها باسمها وقت ما تحب.","happy"],
 ["Write once, call a thousand times. That is the real superpower.","اكتب مرة، نادِ ألف مرة. دي القوة الخارقة بجد.","laugh"]]);
R("Functions — your own commands","python","Arguments feed the function","المدخلات بتغذّي الدالة",{k:"machine",name:"area(r)",inp:"2",inl:"radius",out:"12.57",outl:"area",tag:"area(2)"},[
 ["Arguments are the data you hand to a function, inside the brackets.","المدخلات هي البيانات اللي بتدّيها للدالة جوه القوسين.","point"],
 ["The same function works with different inputs, and gives different results.","نفس الدالة بتشتغل بمدخلات مختلفة وبتدّيك نتايج مختلفة.","happy"],
 ["Feed it a radius, get an area. Better than my cooking.","ادّيها نصف قطر تطلعلك مساحة. أحسن من طبخي.","laugh"]]);
R("Functions — your own commands","python","return hands back a result","return بترجّع النتيجة",{k:"code",lines:['def area(radius):','    return 3.14159 * radius ** 2','','print(area(2))'],out:"12.56636",hi:1},[
 ["return sends a result back to the code that called the function.","return بترجّع نتيجة للكود اللي نادى الدالة.","point"],
 ["Without return, the function does its work, but you get nothing back.","من غير return الدالة بتشتغل، بس مش هترجعلك حاجة.","think"],
 ["Good programs are mostly small, well-named functions. Like a tidy toolbox.","البرامج الكويسة أغلبها دوال صغيرة بأسماء واضحة. زي شنطة عدة مترتبة.","laugh"]]);
R("GPIO — Python meets hardware","python","gpiozero: an LED in two lines","gpiozero: LED بسطرين",{k:"code",lines:['from gpiozero import LED','led = LED(17)','led.on()','sleep(1)','led.off()'],out:"💡 blink!",hi:1,file:"blink.py"},[
 ["On the Raspberry Pi, the gpiozero library turns pins into Python objects.","على الراسبيري باي، مكتبة gpiozero بتحوّل الأطراف لكائنات بايثون.","point"],
 ["An LED on GPIO17 blinks with two lines. Same thinking as Arduino, in Python words.","LED على GPIO17 بيومض بسطرين. نفس تفكير الأردوينو بس بكلام بايثون.","happy"],
 ["I blinked an LED and felt like a wizard.","ومّضت LED وحسيت إني ساحر.","laugh"]]);
R("GPIO — Python meets hardware","python","GPIO17 is a BCM number","GPIO17 رقم BCM",{k:"duel",a:["📍","BCM 17",null],b:["🔢","Pin 11",null],tag:["same pin, 2 names","نفس الطرف باسمين"]},[
 ["GPIO17 is the pin number in BCM naming. It is not its position on the header.","GPIO17 هو رقم الطرف في ترقيم BCM. مش مكانه في الصف.","point"],
 ["The same pin sits at physical position 11. Always check which numbering you are using.","نفس الطرف مكانه الفعلي رقم 11. دايما اتأكد إنت بتستخدم أنهي ترقيم.","think"],
 ["Two names for one pin. Electronics loves confusing us.","اسمين لطرف واحد. الإلكترونيات بتحب تلخبطنا.","laugh"]]);
R("Button input — reading the world","python","Button: reading the world","Button: قراءة العالم",{k:"sw",mode:"press",tag:"btn = Button(2)"},[
 ["Output is only half the story. A Button object reads a pin.","الإخراج نص الحكاية بس. كائن Button بيقرا الطرف.","point"],
 ["Now your program can sense the world, the start of every interactive robot.","دلوقتي برنامجك بيحس بالعالم، وده بداية أي روبوت تفاعلي.","happy"],
 ["Press the button, the robot notices. Finally someone listens to me.","دوس الزرار والروبوت يحس. أخيرا حد بيسمعني.","laugh"]]);
R("Button input — reading the world","python","when_pressed: events","when_pressed: الأحداث",{k:"code",lines:['led = LED(17)','btn = Button(2)','btn.when_pressed = led.toggle','print("Press the button!")'],out:"💡 toggles",hi:2},[
 ["No loop needed. when_pressed calls your function for you.","مش محتاج حلقة. when_pressed بتنادي الدالة عنك.","point"],
 ["Every press toggles the LED. You just wait for the event to happen.","كل ضغطة بتقلب الـLED. إنت بس بتستنى الحدث يحصل.","happy"],
 ["I love events. They do the work and I take the credit.","بحب الأحداث. هي بتشتغل وأنا باخد الفضل.","laugh"]]);

/* ===== Electronics ===== */
R("Ohm's law and resistors","robotics","Ohm's law: V = I × R","قانون أوم: V = I × R",{k:"flow",r:2,v:"5V",rl:"R",i:"I →"},[
 ["Voltage pushes current through resistance. Ohm's law links them: V equals I times R.","الفولت بيدفع التيار في مقاومة. قانون أوم بيربطهم: V بتساوي I في R.","point"],
 ["Same push, more resistance, and less current gets through.","نفس الدفعة مع مقاومة أكبر، يبقى تيار أقل بيعدّي.","think"],
 ["Three letters holding up all of electronics. No pressure.","تلات حروف شايلين الإلكترونيات كلها. من غير ضغط.","laugh"]]);
R("Ohm's law and resistors","robotics","Why an LED needs a resistor","ليه الـLED محتاج مقاومة",{k:"flow",r:2,v:"5V",rl:"220Ω",i:"≈ 15 mA"},[
 ["An LED has almost no resistance once it lights, so it would draw too much current and burn out.","الـLED مقاومته شبه صفر بعد ما بينوّر، فهيسحب تيار كتير ويحترق.","wow"],
 ["With 5 volts and an LED that drops 2, you need 200 ohms. Use 220.","مع 5 فولت وLED بيفقد 2، محتاج 200 أوم. استخدم 220.","point"],
 ["Higher value, dimmer LED, safer circuit. When unsure, start at 330.","قيمة أكبر، إضاءة أخفت، ودايرة أأمن. ولو مش متأكد ابدأ بـ 330.","laugh"]]);
R("Breadboard basics","robotics","Hidden strips: 5 holes connected","شرايح مخفية: ٥ فتحات متوصلين",{k:"bread",mode:"strips",tag:["each column of 5 is connected","كل عمود من ٥ فتحات متوصل"]},[
 ["A breadboard has holes connected by hidden metal strips.","البريدبورد فيه فتحات متوصلة بشرائح معدن مخفية.","point"],
 ["In the middle, each short column of five holes is connected together.","في النص، كل عمود قصير من خمس فتحات متوصل ببعضه.","happy"],
 ["No soldering, no tears. Breadboards are the best invention ever.","من غير لحام ومن غير عياط. البريدبورد أحسن اختراع.","laugh"]]);
R("Breadboard basics","robotics","Power rails and common ground","قضبان الطاقة والأرضي المشترك",{k:"bread",mode:"rails",tag:"+  /  −"},[
 ["The two long rails on the sides are for power plus, and ground minus.","القضيبين الطويلين على الجنب للطاقة زائد، والأرضي ناقص.","point"],
 ["Build in order: rails, components, signal wires, and plug the power in last.","ابني بالترتيب: القضبان، القطع، أسلاك الإشارة، وآخر حاجة وصّل الطاقة.","think"],
 ["Always join the grounds of every board. Friends share a ground.","وصّل أرضي كل البوردات دايما. الأصحاب بيتشاركوا الأرضي.","laugh"]]);
R("Breadboard basics","robotics","The middle gap protects chips","الفجوة اللي في النص بتحمي الشرائح",{k:"bread",mode:"gap",tag:["chip straddles the gap","الشريحة راكبة على الفجوة"]},[
 ["The gap in the middle isolates the two halves of the board.","الفجوة اللي في النص بتعزل نصين البورد عن بعض.","point"],
 ["So a chip straddling the gap does not short its pins together.","فالشريحة اللي راكبة على الفجوة مش هتعمل شورت بين أرجلها.","wow"],
 ["The gap is a tiny hero. Nobody thanks it.","الفجوة بطل صغير. ومحدش بيشكرها.","laugh"]]);
R("Digital vs analog signals","robotics","Digital: HIGH or LOW","الرقمي: HIGH أو LOW",{k:"wave",kind:"digital",tag:"Digital",sub:"5V or 0V, nothing between"},[
 ["A digital signal has only two states: HIGH, 5 or 3.3 volts, and LOW, zero volts.","الإشارة الرقمية ليها حالتين بس: HIGH يعني 5 أو 3.3 فولت، وLOW يعني صفر.","point"],
 ["Buttons, switches and motion sensors are all digital.","الأزرار والسويتشات وحساسات الحركة كلها رقمية.","happy"],
 ["Yes or no. No maybe. Like my uncle at dinner.","أيوه أو لأ. مفيش يمكن. زي عمي على الغدا.","laugh"]]);
R("Digital vs analog signals","robotics","Analog: any value 0 to 1023","التماثلي: أي قيمة من 0 لـ 1023",{k:"wave",kind:"analog",tag:"Analog",sub:"analogRead(A0): 0 to 1023",hi:"1023",lo:"0"},[
 ["An analog signal is any value in a range, like a light sensor or a potentiometer.","الإشارة التماثلية أي قيمة في مدى، زي حساس الضوء أو البوتنشيومتر.","point"],
 ["The Uno reads it on A0 to A5, with a 10-bit converter that gives 0 to 1023.","الأونو بيقراها على A0 لـ A5، بمحول 10 بت بيدّي 0 لـ 1023.","think"],
 ["The Raspberry Pi has no analog inputs. Add an ADC chip, like the MCP3008.","الراسبيري باي مفيهوش مداخل تماثلية. زوّد شريحة ADC زي MCP3008.","wow"]]);
R("PWM: faking analog with a digital pin","robotics","Duty cycle: how long it stays ON","دورة التشغيل: بيفضل ON قد إيه",{k:"wave",kind:"pwm",duty:25,tag:"25% duty",sub:"ON a quarter of the time"},[
 ["PWM switches a pin on and off very fast. The share of time it is ON is the duty cycle.","الـPWM بيفتح ويقفل الطرف بسرعة جدا. نسبة وقت الـON اسمها duty cycle.","point"],
 ["25 percent duty looks like a dim LED or a slow motor. 100 percent is full power.","25 في المية تبان LED خافت أو موتور بطيء. و100 في المية قوة كاملة.","happy"],
 ["Blinking fast enough to fool your eyes. Magic, but with math.","بيومض بسرعة تخدع عينك. سحر بس بالرياضة.","laugh"]]);
R("PWM: faking analog with a digital pin","robotics","analogWrite and servo pulses","analogWrite ونبضات السيرفو",{k:"wave",kind:"pwm",duty:50,tag:"analogWrite(9, 128)",sub:"≈ 50% duty",hi:"255",lo:"0"},[
 ["On the Uno, pins marked with a tilde do PWM: 3, 5, 6, 9, 10 and 11.","على الأونو، الأطراف اللي عليها علامة ~ بتعمل PWM: 3 و5 و6 و9 و10 و11.","point"],
 ["analogWrite takes 0 to 255. A value of 128 is about half power.","analogWrite بتاخد من 0 لـ 255. والقيمة 128 تقريبا نص القوة.","think"],
 ["A servo is different: a pulse every 20 milliseconds, one to two wide, sets its angle.","السيرفو مختلف: نبضة كل 20 مللي ثانية، عرضها من 1 لـ 2، بيحدد الزاوية.","wow"]]);
R("Talking to chips: UART, I2C and SPI","robotics","UART: two wires, two devices","UART: سلكين وجهازين",{k:"chain",nodes:[["🖥️","PC",C.vi],["↔️","TX / RX",C.yl],["🤖","Arduino",C.cy]],tag:"2 wires"},[
 ["UART uses two wires, TX and RX, between two devices.","الـUART بيستخدم سلكين، TX وRX، بين جهازين.","point"],
 ["Like your Arduino talking to the PC over USB, or to a GPS module.","زي الأردوينو وهو بيكلم الكمبيوتر على USB، أو موديول GPS.","happy"],
 ["I talk, you listen. Then we swap. Polite wires.","أنا أتكلم وإنت تسمع. وبعدين نبدّل. أسلاك مؤدبة.","laugh"]]);
R("Talking to chips: UART, I2C and SPI","robotics","I2C: one bus, many addresses","I2C: ناقل واحد وعناوين كتير",{k:"chain",nodes:[["🧠","Master",C.vi],["🌡️","0x76",C.cy],["🧭","0x1E",C.gr],["📟","0x3C",C.or]],tag:"SDA + SCL"},[
 ["I2C uses two shared wires: SDA for data and SCL for the clock.","الـI2C بيستخدم سلكين مشتركين: SDA للبيانات وSCL للساعة.","point"],
 ["Every device gets an address, so many sensors can share one bus.","كل جهاز ليه عنوان، فحساسات كتير تتشارك ناقل واحد.","happy"],
 ["On the Uno it is A4 and A5. On the Pi, GPIO 2 and 3.","على الأونو هو A4 وA5. وعلى الباي GPIO 2 و3.","think"]]);
R("Talking to chips: UART, I2C and SPI","robotics","SPI: four wires, fast","SPI: ٤ أسلاك وسريع",{k:"chain",nodes:[["🧠","MOSI",C.vi],["⚡","CLK",C.yl],["💾","SD card",C.cy],["🖼️","Display",C.pk]],tag:"4 wires = speed"},[
 ["SPI uses four wires, and it is faster. Think displays and SD cards.","الـSPI بيستخدم ٤ أسلاك وهو أسرع. فكّر في الشاشات وكروت الذاكرة.","point"],
 ["Rule of thumb: UART for modules, I2C for many slow sensors, SPI for speed.","قاعدة سريعة: UART للموديولز، I2C لحساسات كتير بطيئة، وSPI للسرعة.","think"],
 ["Four wires is my limit. Five and I am lost.","أربع أسلاك أقصى حاجة. خمسة وأتوه.","laugh"]]);
R("Motors and drivers","robotics","Why a pin can't drive a motor","ليه الطرف ميقدرش يشغّل موتور",{k:"bars",bars:[["Pin",.08,C.cy,"20mA"],["Motor",.9,C.pk,"500mA+"]],line:.12,tag:["power gap","فجوة القدرة"]},[
 ["A GPIO pin gives only about 20 milliamps. A small motor needs hundreds.","طرف الـGPIO بيدّي حوالي 20 مللي أمبير بس. والموتور الصغير محتاج مئات.","wow"],
 ["Never drive a motor directly from a pin. Use a driver, like a transistor.","متشغلش موتور من الطرف مباشرة. استخدم درايفر، زي ترانزستور.","point"],
 ["Asking a pin to run a motor is like asking a mouse to pull a truck.","تطلب من الطرف يشغّل موتور زي ما تطلب من فار يسحب عربية نقل.","laugh"]]);
R("Motors and drivers","robotics","H-bridge: reverse and speed","H-bridge: عكس الاتجاه والسرعة",{k:"motor",tag:"H-bridge + PWM",sub:"L298N"},[
 ["An H-bridge, like the L298N, reverses the motor direction.","الـH-bridge، زي L298N، بيعكس اتجاه الموتور.","point"],
 ["Add PWM and you control the speed too. Give the motor its own supply, share the ground, and add a diode.","زوّد PWM وتتحكم في السرعة كمان. ادّي الموتور مصدره، واشتركوا في الأرضي، وحط دايود.","think"],
 ["Servos have the driver built in. Steppers need their own driver.","السيرفو الدرايفر جواه. والستيبر محتاج درايفر خاص.","happy"]]);
R("Power and safety rules","robotics","3.3V Pi vs 5V Uno","باي 3.3 فولت وأونو 5 فولت",{k:"duel",a:["🤖","Uno 5V",1],b:["🍓","Pi 3.3V",.66],tag:["Pi is NOT 5V tolerant","الباي مبيتحملش 5 فولت"]},[
 ["The Arduino Uno works at 5 volts. The Raspberry Pi GPIO works at 3.3 volts.","الأردوينو أونو بيشتغل 5 فولت. وGPIO الراسبيري باي بيشتغل 3.3 فولت.","point"],
 ["The Pi is not 5-volt tolerant. A 5-volt signal can destroy it. Use a level shifter or a voltage divider.","الباي مبيتحملش 5 فولت. إشارة 5 فولت ممكن تحرقه. استخدم level shifter أو مقسّم جهد.","wow"],
 ["Most dead boards come from wrong voltage or a short. Not from code.","أغلب البوردات الميتة سببها فولت غلط أو شورت. مش الكود.","laugh"]]);
R("Power and safety rules","robotics","Polarity, shorts and clean power","القطبية والشورت والطاقة النضيفة",{k:"chain",nodes:[["➕➖","Polarity",C.cy],["⚡","No short",C.pk],["🔌","Power off",C.yl],["🔋","5V / 3A",C.gr]],tag:["check, then power","اتأكد وبعدين شغّل"]},[
 ["Check polarity before powering on. Never short 5 volts to ground.","اتأكد من القطبية قبل التشغيل. وعمرك ما تعمل شورت بين 5 فولت والأرضي.","point"],
 ["Disconnect power before changing wires. Feed the Pi a proper 5 volt, 3 amp supply.","افصل الطاقة قبل ما تغيّر الأسلاك. وادّي الباي شاحن 5 فولت 3 أمبير مظبوط.","think"],
 ["A weak supply gives random reboots and a lightning bolt. Dramatic.","شاحن ضعيف يعني ريستارت عشوائي وصاعقة. دراما.","laugh"]]);
R("Buttons: pull-ups and debouncing","robotics","Floating pins and pull-ups","الأطراف العايمة والـpull-up",{k:"sw",mode:"float",tag:["floating = random readings","عايم = قراءات عشوائية"]},[
 ["A button pin connected to nothing floats, and reads random values.","طرف الزرار اللي مش متوصل بحاجة بيعوم وبيقرا قيم عشوائية.","wow"],
 ["A pull-up resistor ties it to HIGH. Pressing the button connects it to ground, which reads LOW.","مقاومة pull-up بتربطه على HIGH. ولما تدوس الزرار يتوصل بالأرضي ويقرا LOW.","point"],
 ["With INPUT_PULLUP, pressed means LOW. It surprises everyone once.","مع INPUT_PULLUP، الضغط معناه LOW. بيفاجئ الكل مرة.","laugh"]]);
R("Buttons: pull-ups and debouncing","robotics","Debouncing: one press, one count","Debounce: ضغطة واحدة = عدّة واحدة",{k:"sw",mode:"bounce",tag:["ignore changes for 20–50 ms","تجاهل التغيير 20–50 مللي"]},[
 ["Real buttons bounce. They flicker for a few milliseconds when pressed.","الأزرار الحقيقية بتهتز. بتومض كام مللي ثانية لما تدوس.","point"],
 ["Ignore changes for about 20 to 50 milliseconds, or one press counts as many.","تجاهل التغيير حوالي 20 لـ 50 مللي ثانية، وإلا الضغطة الواحدة هتتعد كتير.","think"],
 ["Even buttons get nervous when pressed. Relatable.","حتى الأزرار بتتوتر لما حد يدوس عليها. مفهوم.","laugh"]]);

/* ===== Projects ===== */
R("Night light with a light sensor","robotics","Night light: LDR + PWM","نور ليلي: LDR وPWM",{k:"gauge",val:["dark → LED fades in","ضلمة → الـLED بيفتح"],tag:"LDR → A0"},[
 ["An LDR and a 10 kilo-ohm resistor make a voltage divider. Its middle point goes to A0.","LDR ومقاومة 10 كيلو أوم بيعملوا مقسّم جهد. نقطة النص بتروح A0.","point"],
 ["When the room gets dark, the reading changes, and the LED on pin 9 fades in with PWM.","لما الأوضة تضلم، القراءة بتتغير، والـLED على طرف 9 بينور بالتدريج بـPWM.","happy"],
 ["Stretch goal: a button to switch between auto and always on.","هدف إضافي: زرار يبدّل بين تلقائي وشغال دايما.","laugh"]]);
R("Parking sensor with ultrasonic distance","robotics","Parking sensor: sound time-of-flight","حساس ركن: زمن ذهاب وإياب الصوت",{k:"bot",mode:"park"},[
 ["The HC-SR04 sends a 40 kilohertz ping and times the echo.","الحساس HC-SR04 بيبعت نبضة 40 كيلوهرتز ويقيس زمن الصدى.","point"],
 ["Distance is time times the speed of sound, divided by two, because the ping goes there and back.","المسافة هي الزمن في سرعة الصوت، على اتنين، لأن النبضة رايحة وراجعة.","think"],
 ["The closer the wall, the faster the beeps. Same idea as radar and lidar.","كل ما الحيطة تقرب البيب يسرّع. نفس فكرة الرادار والليدار.","laugh"]]);
R("Line-following robot","robotics","Line follower: two IR eyes","روبوت بيمشي ورا خط: عينين IR",{k:"bot",mode:"line",tag:["left → turn left, right → turn right","يسار → لف يسار، يمين → لف يمين"]},[
 ["Two IR sensors look at the dark line. Left sees it, turn left. Right sees it, turn right.","حساسين IR بيبصوا على الخط الغامق. الشمال شافه، لف شمال. اليمين شافه، لف يمين.","point"],
 ["Both on the line? Go straight. Start slow, then add a proportional correction, the P in PID.","الاتنين على الخط؟ امشي عدل. ابدأ بطيء، وبعدين زوّد تصحيح تناسبي، الـP في PID.","think"],
 ["Power the motors from the battery pack, not from the Arduino 5 volt pin.","شغّل الموتورز من بطارية، مش من طرف الـ5 فولت في الأردوينو.","wow"]]);
R("Pi temperature and humidity logger","robotics","Logger: sense, stamp, store","لوجر: حس، وقّت، خزّن",{k:"chain",nodes:[["🌡️","Sense",C.or],["🕒","Timestamp",C.cy],["📄","CSV file",C.gr],["📈","Plot",C.vi]],tag:"DHT22 → CSV"},[
 ["Read the DHT22 sensor every minute, and add a line with the time to a CSV file.","اقرا حساس DHT22 كل دقيقة، وزوّد سطر فيه الوقت في ملف CSV.","point"],
 ["Later, plot it with Python. Sense, timestamp, store, analyse.","بعدين ارسمه ببايثون. حس، وقّت، خزّن، حلّل.","happy"],
 ["This is the seed of every telemetry system. Even NASA started small.","دي بذرة أي نظام تليمتري. حتى ناسا بدأت صغيرة.","laugh"]]);
R("Pi camera motion alarm","robotics","Motion alarm: frame differencing","إنذار حركة: طرح الفريمات",{k:"bot",mode:"motion",tag:["changed pixels = motion","بكسلات اتغيّرت = حركة"]},[
 ["Grab frames with OpenCV, subtract the previous frame, and count the pixels that changed.","خد فريمات بـOpenCV، اطرح الفريم السابق، وعدّ البكسلات اللي اتغيّرت.","point"],
 ["Many changed? Something moved. Save a photo and turn on an LED or buzzer.","كتير اتغيّر؟ في حاجة اتحركت. احفظ صورة وشغّل LED أو بازر.","wow"],
 ["Lighting changes also trigger it. Raise the threshold if it is too jumpy.","تغيّر الإضاءة بيشغّله كمان. ارفع الحد لو حساس زيادة.","laugh"]]);
R("CanSat-style telemetry probe","space","CanSat: a satellite in a soda can","كان سات: قمر صناعي في علبة صودا",{k:"chain",nodes:[["🥫","CanSat",C.or],["📡","Radio",C.cy],["🛰️","Packet",C.vi],["💻","Ground Pi",C.gr]],tag:"BMP280 + accel"},[
 ["A CanSat is a mini satellite the size of a soda can, launched on a rocket or a drone.","الكان سات قمر صناعي صغير بحجم علبة صودا، بيتطلق بصاروخ أو درون.","point"],
 ["An Arduino reads pressure, temperature and acceleration, and radios a data line every second.","أردوينو بيقرا الضغط والحرارة والتسارع، وبيبعت سطر بيانات بالراديو كل ثانية.","think"],
 ["Add a checksum to every packet, so the ground can reject corrupted lines.","زوّد checksum في كل باكت، عشان الأرض ترفض الأسطر التالفة.","wow"]]);

/* ===== Space: orbit types ===== */
R("LEO — Low Earth Orbit","space","LEO: close, fast, crowded","LEO: قريب وسريع وزحمة",{k:"orbit",rx:62,ry:62,n:3,spread:120,dur:5,er:26,labels:[[150,24,"160–2,000 km",13,C.yl]]},[
 ["LEO is close to Earth: one lap takes about 90 to 127 minutes, at roughly 7.5 kilometres a second.","LEO قريب من الأرض: اللفة بتاخد حوالي 90 لـ 127 دقيقة، بسرعة حوالي 7.5 كم في الثانية.","point"],
 ["Great for Earth imaging, the ISS, CubeSats and Starlink at about 550 kilometres.","ممتاز لتصوير الأرض ومحطة الفضاء والكيوبسات وستارلينك على حوالي 550 كم.","happy"],
 ["Low means low delay, but each satellite sees a small patch, so you need many. And thin air slowly drags them down.","المنخفض يعني تأخير قليل، بس كل قمر بيشوف مساحة صغيرة فمحتاج كتير. والهواء الرفيع بيشدّهم لتحت ببطء.","think"]]);
R("MEO — Medium Earth Orbit","space","MEO: the navigation neighbourhood","MEO: حي أنظمة الملاحة",{k:"orbit",rx:96,ry:96,n:4,spread:90,dur:12,er:20,labels:[[150,20,"~20,200 km · GPS",13,C.yl]]},[
 ["MEO is the home of navigation. GPS flies at about 20,200 kilometres, with a period near 11 hours 58 minutes.","MEO بيت الملاحة. الـGPS بيطير على حوالي 20,200 كم، وزمن دورته قرب 11 ساعة و58 دقيقة.","point"],
 ["Galileo is at about 23,200 kilometres, and GLONASS at about 19,100.","Galileo على حوالي 23,200 كم، وGLONASS على حوالي 19,100.","think"],
 ["Higher orbit means each satellite covers more. About 24 give worldwide coverage, with at least 4 visible almost anywhere.","مدار أعلى يعني القمر يغطي أكتر. حوالي 24 قمر بيغطوا العالم، وعلى الأقل 4 ظاهرين تقريبا في أي مكان.","wow"]]);
R("GEO — Geostationary Orbit","space","GEO: hanging over one spot","GEO: واقف فوق نقطة واحدة",{k:"orbit",rx:104,ry:104,n:1,dur:22,er:18,ground:true,labels:[[150,14,"35,786 km",13,C.yl]]},[
 ["At exactly 35,786 kilometres above the equator, one lap takes a sidereal day, the same as Earth's spin.","على 35,786 كم بالظبط فوق خط الاستواء، اللفة بتاخد يوم نجمي، زي دوران الأرض.","point"],
 ["So the satellite hangs over one spot, and a fixed dish can talk to it forever. TV, weather and communications live here.","فالقمر بيفضل فوق نقطة واحدة، وطبق ثابت يكلمه على طول. التلفزيون والطقس والاتصالات هنا.","happy"],
 ["The price: about a quarter of a second round-trip delay, and poor coverage near the poles.","التمن: تأخير حوالي ربع ثانية رايح جاي، وتغطية ضعيفة قرب القطبين.","think"]]);
R("SSO — Sun-synchronous orbit","space","SSO: same light every pass","SSO: نفس الإضاءة كل عبور",{k:"orbit",rx:42,ry:78,n:1,dur:5,er:24,tilt:8,labels:[[150,20,"~98°",14,C.yl]]},[
 ["SSO is a slightly retrograde, nearly polar LEO, at about 600 to 800 kilometres.","SSO مدار LEO شبه قطبي ورجعي شوية، على حوالي 600 لـ 800 كم.","point"],
 ["Earth's bulge turns the orbit plane about one degree a day, matching the Sun.","انتفاخ الأرض بيلف مستوى المدار حوالي درجة في اليوم، زي الشمس.","think"],
 ["So the satellite passes each place at the same local time. Perfect for imaging, with consistent shadows.","فالقمر بيعدي كل مكان في نفس الوقت المحلي. مثالي للتصوير، والضلال ثابتة.","happy"]]);
R("HEO — Molniya and other elliptical orbits","space","Molniya: a stretched ellipse","مولنيا: قطع ناقص مستطيل",{k:"orbit",rx:110,ry:52,e:.72,n:1,dur:9,er:16,wedge:false,labels:[[150,16,"63.4° · 12 h",13,C.yl]]},[
 ["A very stretched ellipse: low perigee, very high apogee.","قطع ناقص مستطيل جدا: حضيض منخفض وأوج عالي جدا.","point"],
 ["The satellite crawls near apogee, Kepler's second law, so it hangs over high latitudes for hours.","القمر بيزحف قرب الأوج، قانون كبلر التاني، فبيفضل فوق خطوط العرض العالية لساعات.","wow"],
 ["Russia used Molniya orbits because GEO covers its far north poorly. And 63.4 degrees is the special tilt where the ellipse does not rotate.","روسيا استخدمت مولنيا لأن GEO بيغطي أقصى شمالها ضعيف. و63.4 درجة هي الميل الخاص اللي القطع مبيدورش فيه.","think"]]);

/* ===== Space: concepts ===== */
R("What is an orbit?","space","Falling that keeps missing","سقوط بيفضل يغلط الأرض",{k:"orbit",rx:70,ry:70,n:1,dur:6,er:30,labels:[[150,16,"7.7 km/s",14,C.yl]]},[
 ["An orbit is falling that keeps missing the ground.","المدار هو سقوط بيفضل يغلط الأرض.","point"],
 ["The satellite moves sideways so fast, about 7.7 kilometres a second, that as it falls, Earth's surface curves away beneath it.","القمر بيتحرك جنب بسرعة كبيرة، حوالي 7.7 كم في الثانية، فكل ما يقع سطح الأرض بيتحني من تحته.","wow"],
 ["One sentence for the interview: an orbit is a balance between sideways speed and gravity.","جملة للمقابلة: المدار توازن بين السرعة الجانبية والجاذبية.","happy"]]);
R("What is an orbit?","space","Why astronauts float","ليه رواد الفضاء بيعوموا",{k:"duel",a:["👩‍🚀","Astronaut",null],b:["🛰️","Station",null],tag:["both in free fall","الاتنين في سقوط حر"]},[
 ["Gravity never switches off up there. It is still strong at the station's height.","الجاذبية عمرها ما بتقفل هناك. لسه قوية على ارتفاع المحطة.","think"],
 ["Astronauts float because they and the station fall together, in free fall.","رواد الفضاء بيعوموا لأنهم والمحطة بيقعوا مع بعض، سقوط حر.","point"],
 ["So it is not zero gravity. It is the longest fall ever. No landing, though.","يعني مش انعدام جاذبية. دي أطول وقعة في التاريخ. من غير هبوط.","laugh"]]);
R("Kepler's three laws","space","Kepler 1: orbits are ellipses","كبلر ١: المدارات قطع ناقص",{k:"orbit",rx:104,ry:60,e:.5,n:1,dur:9,er:18,labels:[[150,16,"Earth at one focus",12,C.yl]]},[
 ["Kepler's first law: orbits are ellipses.","قانون كبلر الأول: المدارات قطع ناقص.","point"],
 ["And the Earth sits at one focus of the ellipse, not in the middle.","والأرض واقفة في إحدى بؤرتي القطع، مش في النص.","think"],
 ["Planets are not perfect circles. Nobody is perfect. Not even planets.","الكواكب مش دواير مثالية. محدش مثالي. حتى الكواكب.","laugh"]]);
R("Kepler's three laws","space","Kepler 2: equal areas, equal times","كبلر ٢: مساحات متساوية في أزمنة متساوية",{k:"orbit",rx:104,ry:60,e:.55,n:1,dur:9,er:16,wedge:true,labels:[[150,176,"equal areas",13,C.yl]]},[
 ["A line from Earth to the satellite sweeps equal areas in equal times.","الخط من الأرض للقمر بيمسح مساحات متساوية في أزمنة متساوية.","point"],
 ["So the satellite is fastest at perigee, the closest point, and slowest at apogee, the farthest.","فالقمر أسرع ما يكون عند الحضيض، أقرب نقطة، وأبطأ عند الأوج، أبعد نقطة.","wow"],
 ["Close to Earth it speeds up, like me near a pizza.","قرب الأرض بيسرّع، زيي قدام البيتزا.","laugh"]]);
R("Kepler's three laws","space","Kepler 3: the period law","كبلر ٣: قانون زمن الدورة",{k:"bars",bars:[["LEO",.15,C.cy,"1.5 h"],["GPS",.5,C.vi,"12 h"],["GEO",.95,C.or,"24 h"]],tag:["T = 2π √(a³/μ)","T = 2π √(a³/μ)"]},[
 ["The period squared is proportional to the semi-major axis cubed.","مربع زمن الدورة يتناسب مع مكعب نصف المحور الأكبر.","point"],
 ["T equals two pi times the square root of a cubed over mu, where mu is 398,600 for Earth.","T بتساوي 2 باي في جذر a تكعيب على mu، وmu لـ الأرض 398,600.","think"],
 ["Higher orbit, longer lap. Simple, and it runs every GPS.","مدار أعلى، لفة أطول. بسيطة وبتشغّل كل GPS.","happy"]]);
R("Anatomy of a satellite","space","Payload and bus","الحمولة والـbus",{k:"chain",nodes:[["📷","Payload",C.pk],["🔋","Power",C.gr],["🧠","OBC",C.vi],["📡","Comms",C.cy]],tag:"the bus keeps it alive"},[
 ["The payload, a camera, a radio or a navigation signal, is the reason for the mission.","الحمولة، كاميرا أو راديو أو إشارة ملاحة، هي سبب المهمة.","point"],
 ["The bus keeps it alive: power from solar panels and a battery, the on-board computer, and communications.","الـbus بيبقيها شغالة: طاقة من ألواح شمسية وبطارية، والكمبيوتر على المتن، والاتصالات.","happy"],
 ["Also attitude control, thermal control, structure, and sometimes propulsion. A satellite is a tiny flying team.","وكمان تحكم في الاتجاه وحرارة وهيكل، وساعات دفع. القمر فريق صغير طاير.","laugh"]]);
R("Anatomy of a satellite","space","CubeSat: 10 cm units","كيوبسات: وحدات 10 سم",{k:"duel",a:["🧊","1U",.3],b:["🧊🧊🧊","3U",.7],tag:["standard 10 cm cubes","مكعبات قياسية 10 سم"]},[
 ["A CubeSat is a standard small satellite built from 10 centimetre cubes called units.","الكيوبسات قمر صغير قياسي مبني من مكعبات 10 سم اسمها وحدات.","point"],
 ["1U, 3U, 6U. Stack more units, get more room for payload and batteries.","1U و3U و6U. زوّد وحدات تاخد مساحة أكبر للحمولة والبطاريات.","happy"],
 ["Space Lego, basically. Universities love it.","ليغو فضائي بالظبط. الجامعات بتعشقه.","laugh"]]);
R("Attitude control (ADCS)","space","Attitude: which way it faces","Attitude: القمر وشّه ناحية فين",{k:"spin",tag:"sun · magnetic field · stars"},[
 ["Attitude means which way the satellite faces, and it must point the right way.","Attitude معناه القمر وشّه ناحية فين، ولازم يوجّه صح.","point"],
 ["Sensors tell it: sun sensors, magnetometers, gyroscopes, and star trackers, the most accurate.","الحساسات بتقوله: حساسات الشمس والمغناطيسية والجيروسكوب، ومتتبعات النجوم الأدق.","think"],
 ["A star tracker recognises star patterns, like GPS made of stars.","متتبع النجوم بيتعرف على أنماط النجوم، زي GPS مصنوع من نجوم.","wow"]]);
R("Attitude control (ADCS)","space","Actuators: wheels and magnets","المنفّذات: عجلات ومغناطيسات",{k:"spin",tag:"wheel →  ←  satellite"},[
 ["Reaction wheels: spin up a wheel inside, and the satellite turns the other way.","عجلات رد الفعل: دوّر عجلة جوه والقمر يلف عكسها.","point"],
 ["Magnetorquers are coils that push against Earth's magnetic field. Thrusters are the third option.","المغناطيسات ملفات بتدفع ضد مجال الأرض المغناطيسي. والدافعات الاختيار التالت.","think"],
 ["Spin the wheel one way, the satellite goes the other. Newton is always watching.","دوّر العجلة يمين والقمر يلف شمال. نيوتن دايما بيراقب.","laugh"]]);
R("Attitude control (ADCS)","space","Kalman filter: one best guess","فلتر كالمان: أحسن تقدير واحد",{k:"net",layers:[3,1],tag:["noisy sensors → 1 estimate","حساسات مزعجة → تقدير واحد"]},[
 ["Every sensor is noisy. A Kalman filter blends them all into one best estimate.","كل حساس فيه تشويش. فلتر كالمان بيدمجهم في تقدير واحد هو الأحسن.","point"],
 ["Trust each sensor by how reliable it is, then predict, then correct, again and again.","ثق في كل حساس بقد مصداقيته، وبعدين توقّع، وبعدين صحّح، مرة ورا مرة.","think"],
 ["Same ideas as robot localisation. Robots and satellites are cousins.","نفس أفكار تحديد موقع الروبوت. الروبوتات والأقمار أولاد عم.","laugh"]]);
R("Hohmann transfer and delta-v","space","Hohmann: two burns","هومان: حرقتين",{k:"orbit",rx:104,ry:62,e:.45,n:1,dur:9,er:16,labels:[[40,176,"burn 1",12,C.pk],[260,176,"burn 2",12,C.pk]]},[
 ["To go to a higher orbit, you do two burns.","عشان تروح لمدار أعلى، بتعمل حرقتين.","point"],
 ["One at the low point stretches the orbit into an ellipse. One at the high point makes it a circle.","واحدة عند أقل نقطة بتمد المدار لقطع ناقص. وواحدة عند أعلى نقطة بتخليه دايري.","think"],
 ["Burning forward raises the opposite side of the orbit. Space is backwards like that.","الحرق قدام بيرفع الناحية التانية من المدار. الفضاء عكسي كده.","laugh"]]);
R("Hohmann transfer and delta-v","space","Delta-v: the fuel budget","Delta-v: ميزانية الوقود",{k:"bars",bars:[["Ground→LEO",.95,C.or,"9.4"],["LEO→GEO",.4,C.vi,"3.9"],["GEO hold",.05,C.gr,"~0"]],tag:"km/s"},[
 ["The total velocity change of all your burns is called delta-v. It is your fuel budget.","إجمالي تغيير السرعة في كل حرقاتك اسمه delta-v. هو ميزانية الوقود.","point"],
 ["Going from low Earth orbit to GEO costs about 3.9 kilometres a second.","الانتقال من مدار أرضي منخفض لـGEO بيكلّف حوالي 3.9 كم في الثانية.","wow"],
 ["The rocket equation shows why fuel dominates a rocket's mass.","معادلة الصاروخ بتوضح ليه الوقود هو أغلب وزن الصاروخ.","think"]]);
R("Ground stations and Doppler","space","Pass window: 5 to 15 minutes","نافذة العبور: 5 لـ 15 دقيقة",{k:"orbit",rx:58,ry:58,n:1,dur:5,er:26,ground:true,labels:[[150,176,"5–15 min",13,C.yl]]},[
 ["A LEO satellite is above your horizon for only about 5 to 15 minutes per pass.","قمر LEO بيبقى فوق أفقك حوالي 5 لـ 15 دقيقة بس في كل عبور.","point"],
 ["So ground stations plan contact windows, and you must send fast.","فمحطات الأرض بتخطط لنوافذ الاتصال، ولازم تبعت بسرعة.","think"],
 ["Five minutes to say everything. Like a family phone call, but in space.","خمس دقايق تقول فيها كل حاجة. زي مكالمة العيلة بس في الفضاء.","laugh"]]);
R("Ground stations and Doppler","space","Doppler: the frequency shifts","دوبلر: التردد بيتغير",{k:"radar",from:"🛰️",to:"📡",sq:true,noecho:true,tag:"Doppler",sub:["↑ approaching · ↓ leaving","↑ بيقرّب · ↓ بيبعد"],col:C.pk},[
 ["Because the satellite moves fast, the radio frequency shifts. That is the Doppler effect.","لأن القمر سريع، تردد الراديو بيتغير. ده تأثير دوبلر.","point"],
 ["Higher while it approaches, lower while it leaves, by tens of kilohertz at UHF.","أعلى وهو بيقرّب، وأقل وهو بيبعد، بعشرات الكيلوهرتز في UHF.","think"],
 ["Receivers track and correct it. Like an ambulance, but it is a satellite.","المستقبلات بتتبعه وتصحّحه. زي صوت الإسعاف، بس ده قمر.","laugh"]]);
R("Ground stations and Doppler","space","Link budget","ميزانية الوصلة",{k:"bars",bars:[["TX power",.7,C.gr,"+"],["Antennas",.6,C.cy,"+"],["Distance",.9,C.pk,"−"],["Noise",.45,C.or,"−"]],tag:"does it add up?"},[
 ["A link budget adds it all up: transmit power, plus antenna gains, minus distance loss, minus noise.","ميزانية الوصلة بتجمع كله: قدرة الإرسال، زائد ربح الهوائيات، ناقص خسارة المسافة، ناقص التشويش.","point"],
 ["If what is left is strong enough, the link works. If not, bigger dish or more power.","لو اللي فاضل كفاية، الوصلة بتشتغل. لو لأ، طبق أكبر أو قدرة أكتر.","think"],
 ["It is basically a bank account for signals.","هي حساب بنكي للإشارات بالظبط.","laugh"]]);
R("GNSS constellations and accuracy","space","GNSS: a family of constellations","GNSS: عيلة كوكبات",{k:"chain",nodes:[["🇺🇸","GPS",C.cy],["🇷🇺","GLONASS",C.pk],["🇪🇺","Galileo",C.vi],["🇨🇳","BeiDou",C.or]],tag:"+ NavIC · QZSS"},[
 ["GNSS is the family name: GPS from the USA, GLONASS from Russia, Galileo from Europe, BeiDou from China.","GNSS اسم العيلة: GPS أمريكا، GLONASS روسيا، Galileo أوروبا، BeiDou الصين.","point"],
 ["Plus regional systems: NavIC for India and QZSS for Japan.","وأنظمة إقليمية: NavIC للهند وQZSS لليابان.","happy"],
 ["Your phone talks to all of them. It is popular.","تليفونك بيكلمهم كلهم. شعبيته عالية.","laugh"]]);
R("GNSS constellations and accuracy","space","What spoils the accuracy","إيه اللي بيبوّظ الدقة",{k:"bars",bars:[["Iono",.55,C.pk,""],["Tropo",.35,C.or,""],["Multipath",.7,C.vi,""],["Clock",.25,C.cy,""],["DOP",.5,C.gr,""]],tag:["phone: 3–5 m in open sky","التليفون: 3–5 متر في السما المفتوحة"]},[
 ["A phone gets 3 to 5 metres in open sky. Errors come from the ionosphere and the troposphere.","التليفون بياخد 3 لـ 5 متر في السما المفتوحة. الأخطاء من الأيونوسفير والتروبوسفير.","point"],
 ["Multipath, when the signal bounces off buildings. Satellite clock and orbit errors. And poor geometry, called DOP.","الانعكاس لما الإشارة ترتد من المباني. وأخطاء ساعة ومدار القمر. وهندسة ضعيفة اسمها DOP.","think"],
 ["Tall buildings are GPS's worst enemy. Skyscrapers, sorry.","المباني العالية أكبر عدو للـGPS. آسفين يا ناطحات السحاب.","laugh"]]);
R("GNSS constellations and accuracy","space","Fixes: dual-frequency, SBAS, RTK","الحلول: ثنائي التردد وSBAS وRTK",{k:"gnss",n:4,err:6,tag:"RTK → centimetres"},[
 ["Fixes exist: dual-frequency receivers, SBAS, and DGPS.","فيه حلول: مستقبلات ثنائية التردد، وSBAS، وDGPS.","point"],
 ["RTK goes to centimetre level, using a nearby base station.","الـRTK بيوصل لمستوى السنتيمتر، باستخدام محطة قاعدة قريبة.","wow"],
 ["From 5 metres to 2 centimetres. That is a glow-up.","من 5 متر لـ 2 سنتي. ده جلو أب بجد.","laugh"]]);
R("Relativity inside your phone","space","Relativity fixes GPS clocks","النسبية بتظبط ساعات GPS",{k:"bars",bars:[["Gravity",.8,C.gr,"+45µs"],["Speed",.15,C.pk,"−7µs"],["Net",.7,C.yl,"+38µs"]],tag:"per day"},[
 ["GPS clocks run fast by about 45 microseconds a day, because gravity is weaker up there.","ساعات GPS بتجري أسرع بحوالي 45 ميكروثانية في اليوم، لأن الجاذبية أضعف هناك.","point"],
 ["And slow by about 7, because of their speed. Net: plus 38 microseconds a day.","وبتتأخر حوالي 7 بسبب سرعتها. الصافي: زائد 38 ميكروثانية في اليوم.","think"],
 ["Uncorrected, that is about 11 kilometres of error every day. So the clocks are tuned before launch.","من غير تصحيح ده حوالي 11 كم خطأ كل يوم. فالساعات بتتظبط قبل الإطلاق.","wow"]]);
R("Navigation for robots and spacecraft","space","Sensor fusion: no single sensor","دمج الحساسات: مفيش حساس واحد كفاية",{k:"chain",nodes:[["🌀","IMU",C.cy],["🛰️","GNSS",C.vi],["📷","Camera",C.pk],["🧠","Kalman",C.gr]],tag:["fuse them","ادمجهم"]},[
 ["Inertial sensors are fast but they drift. GNSS is absolute, but slow and can be blocked.","حساسات القصور سريعة بس بتنحرف. والـGNSS مطلق بس بطيء وممكن يتحجب.","point"],
 ["Cameras and lidar see the surroundings. A Kalman filter fuses them all.","الكاميرات والليدار بيشوفوا المحيط. وفلتر كالمان بيدمجهم كلهم.","think"],
 ["Same maths for a rover and a robot vacuum. Space is just fancier.","نفس الرياضة لروفر ولمكنسة روبوت. الفضاء بس أشيك.","laugh"]]);
R("Navigation for robots and spacecraft","space","SLAM: map while you locate","SLAM: ارسم الخريطة وإنت بتحدد مكانك",{k:"bot",mode:"line",tag:"SLAM"},[
 ["On Mars or the Moon there is no GNSS. Rovers use visual odometry and star trackers.","على المريخ أو القمر مفيش GNSS. الروفرات بتستخدم odometry بصرية ومتتبعات نجوم.","point"],
 ["SLAM means building a map while locating yourself on it.","SLAM يعني ترسم خريطة وإنت بتحدد مكانك عليها في نفس الوقت.","wow"],
 ["The bridge between your robotics teaching and space navigation.","ده الكوبري بين تدريس الروبوتات وملاحة الفضاء.","happy"]]);
R("Space debris and safety","space","Tracking and avoiding","التتبع وتجنب التصادم",{k:"orbit",rx:76,ry:76,n:5,spread:72,dur:6,er:22,col:C.pk,labels:[[150,176,"7–8 km/s",13,C.yl]]},[
 ["Thousands of dead satellites and fragments circle Earth at 7 to 8 kilometres a second.","آلاف الأقمار الميتة والشظايا بتلف حوالين الأرض بسرعة 7 لـ 8 كم في الثانية.","wow"],
 ["Even a small piece hits with huge energy. Operators track objects and plan avoidance manoeuvres.","حتى قطعة صغيرة بتخبط بطاقة ضخمة. المشغّلون بيتتبعوا ويخططوا مناورات تجنب.","point"],
 ["And satellites must de-orbit at the end of their life. Clean up your mess!","ولازم الأقمار تنزل من المدار في نهاية عمرها. نضّف وراك!","laugh"]]);
R("Space debris and safety","space","Kessler syndrome","متلازمة كيسلر",{k:"chain",nodes:[["💥","Crash",C.pk],["🪨","Debris",C.or],["💥","More crashes",C.pk],["🚫","Orbit lost",C.vi]],tag:"chain reaction"},[
 ["Kessler syndrome is the fear of a chain reaction of collisions.","متلازمة كيسلر هي الخوف من تفاعل متسلسل من التصادمات.","point"],
 ["Each crash makes more debris, which causes more crashes, until an orbit becomes unusable.","كل تصادم بيعمل حطام أكتر، والحطام بيعمل تصادمات أكتر، لحد ما المدار يبقى مش صالح.","wow"],
 ["Space sustainability is a hot topic. A great thing to mention in interviews.","استدامة الفضاء موضوع ساخن. حاجة حلوة تذكرها في المقابلات.","happy"]]);
R("The UAE in space","space","The UAE in space","الإمارات في الفضاء",{k:"chain",nodes:[["🏛️","2014",C.cy],["🛰️","Nayif-1",C.vi],["🔭","KhalifaSat",C.gr],["🔴","Hope",C.pk]],tag:"UAE Space Agency → Mars"},[
 ["The UAE Space Agency was founded in 2014. MBRSC in Dubai built Nayif-1, a CubeSat, and KhalifaSat.","وكالة الإمارات للفضاء اتأسست 2014. ومركز محمد بن راشد في دبي بنى نايف-1، كيوبسات، وخليفة سات.","point"],
 ["And the Hope probe, which entered Mars orbit in February 2021.","ومسبار الأمل، اللي دخل مدار المريخ في فبراير 2021.","wow"],
 ["This is general background. Before any interview, read the company's own website and news.","دي خلفية عامة. قبل أي مقابلة، اقرا موقع الشركة وأخبارها.","think"]]);

/* ===== Space: more ===== */
R("Rockets and the rocket equation","space","Rocket equation: Δv = ve × ln(m0/mf)","معادلة الصاروخ: Δv = ve × ln(m0/mf)",{k:"rocket",tag:"Δv = ve · ln(m0 / mf)"},[
 ["A rocket pushes itself forward by throwing mass backwards.","الصاروخ بيدفع نفسه لقدام برمي كتلة لورا.","point"],
 ["The speed gain depends on the exhaust speed, and the logarithm of the full-to-empty mass ratio.","مكسب السرعة بيعتمد على سرعة العادم ولوغاريتم نسبة الكتلة الممتلية للفاضية.","think"],
 ["Doubling the fuel does not double the speed gain. The logarithm is why space is hard.","تضاعف الوقود مش بيضاعف السرعة. اللوغاريتم هو سبب إن الفضاء صعب.","laugh"]]);
R("Rockets and the rocket equation","space","Reaching orbit: 9.3–10 km/s","الوصول للمدار: 9.3–10 كم/ث",{k:"rocket",tag:"9.3–10 km/s",side:["staging","مراحل"]},[
 ["Reaching low Earth orbit needs about 9.3 to 10 kilometres a second, once gravity and drag are counted.","الوصول لمدار منخفض محتاج حوالي 9.3 لـ 10 كم في الثانية، بعد حساب الجاذبية والمقاومة.","wow"],
 ["So most of a rocket is fuel. Staging drops empty tanks so the rest does not carry dead weight.","فأغلب الصاروخ وقود. والمراحل بتسقط الخزانات الفاضية عشان الباقي ميشيلش وزن ميت.","point"],
 ["Launching eastward gives a free boost of up to 0.46 kilometres a second from Earth's spin.","الإطلاق ناحية الشرق بيدّي دفعة مجانية لحد 0.46 كم في الثانية من دوران الأرض.","happy"]]);
R("Earth observation and remote sensing","space","Bands: seeing more than light","النطاقات: نشوف أكتر من الضوء",{k:"bars",bars:[["Visible",.5,C.cy,""],["NIR",.9,C.gr,"plants"],["Thermal",.6,C.or,"heat"],["Radar",.75,C.vi,"night"]],tag:"each band shows something"},[
 ["Many satellites see more than visible light. Each spectral band shows something different.","أقمار كتير بتشوف أكتر من الضوء المرئي. كل نطاق بيوري حاجة مختلفة.","point"],
 ["Near-infrared reflects strongly from healthy plants. Thermal infrared shows heat.","الأشعة تحت الحمراء القريبة بتنعكس بقوة من النباتات الصحية. والحرارية بتوري الحرارة.","think"],
 ["Radar, called SAR, sees through clouds and at night. Superhero vision.","الرادار SAR بيشوف من خلال السحاب وبالليل. رؤية خارقة.","wow"]]);
R("Earth observation and remote sensing","space","NDVI and resolution","NDVI والدقة",{k:"gauge",val:"NDVI → 1 = healthy plants",tag:"(NIR − Red) / (NIR + Red)"},[
 ["NDVI equals NIR minus Red, over NIR plus Red. Close to 1 means dense healthy vegetation.","NDVI بتساوي NIR ناقص Red، على NIR زائد Red. قريب من 1 يعني نبات كثيف وصحي.","point"],
 ["Near 0 means bare ground. Compare satellites by resolution, metres per pixel, and revisit time.","قريب من 0 يعني أرض فاضية. قارن الأقمار بالدقة، متر لكل بكسل، وزمن إعادة الزيارة.","think"],
 ["Sentinel-2 sees about 10 metres per pixel and revisits every few days.","Sentinel-2 بيشوف حوالي 10 متر لكل بكسل وبيرجع كل كام يوم.","happy"]]);
R("Radio links and frequency bands","space","Bands: low carries, high carries more","النطاقات: الواطي بيعدي والعالي بينقل أكتر",{k:"duel",a:["🌧️","L / S",.4],b:["📶","X Ku Ka",.9],tag:["weather vs data","الطقس مقابل البيانات"]},[
 ["Lower bands, L and S, pass through weather easily. GPS L1 is 1575.42 megahertz.","النطاقات الواطية، L وS، بتعدي الطقس بسهولة. وGPS L1 هو 1575.42 ميجاهرتز.","point"],
 ["Higher bands, X, Ku and Ka, carry far more data but suffer in heavy rain.","النطاقات العالية، X وKu وKa، بتنقل بيانات أكتر بكتير بس بتتأثر بالمطر الشديد.","think"],
 ["Rain hates high frequencies. Bring an umbrella for your signal.","المطر بيكره الترددات العالية. خد شمسية لإشارتك.","laugh"]]);
R("Radio links and frequency bands","space","Path loss: 6 dB per doubling","فقد المسار: 6 ديسيبل لكل ضعف",{k:"bars",bars:[["1×",.3,C.cy,"0 dB"],["2×",.5,C.vi,"+6"],["4×",.7,C.or,"+12"],["8×",.9,C.pk,"+18"]],tag:"distance or frequency"},[
 ["Signals weaken with distance. Free-space path loss grows with distance and frequency.","الإشارات بتضعف مع المسافة. فقد المسار في الفضاء الحر بيزيد مع المسافة والتردد.","point"],
 ["A GEO link at 12 gigahertz loses about 205 decibels. So ground stations use big dishes.","وصلة GEO على 12 جيجاهرتز بتخسر حوالي 205 ديسيبل. فمحطات الأرض بتستخدم أطباق كبيرة.","wow"],
 ["Rule of thumb: doubling the distance or the frequency costs 6 dB.","قاعدة سريعة: تضاعف المسافة أو التردد بيكلّف 6 ديسيبل.","think"]]);
R("Space weather and radiation","space","Solar wind, flares and CMEs","الرياح الشمسية والتوهجات",{k:"sun",tag:["flares + particles","توهجات + جسيمات"]},[
 ["The Sun sends a constant solar wind, and sometimes bursts: flares and coronal mass ejections.","الشمس بتبعت رياح شمسية مستمرة، وساعات انفجارات: توهجات وقذف كتلة إكليلية.","point"],
 ["Charged particles can flip bits in memory, damage solar cells, and charge a satellite's surface.","الجسيمات المشحونة ممكن تقلب بتات في الذاكرة، وتبوّظ الخلايا الشمسية، وتشحن سطح القمر.","wow"],
 ["The Sun is basically a moody neighbour with a very big speaker.","الشمس جار متقلب المزاج ومعاه سماعة كبيرة.","laugh"]]);
R("Space weather and radiation","space","Van Allen belts and protection","أحزمة فان ألين والحماية",{k:"sun",tag:["shield: ECC · watchdog","حماية: ECC · watchdog"]},[
 ["Earth's radiation belts, the Van Allen belts, are dangerous for electronics, so orbits and shielding are chosen carefully.","أحزمة الإشعاع حوالين الأرض، فان ألين، خطر على الإلكترونيات، فبنختار المدارات والتدريع بحذر.","point"],
 ["Spacecraft use error-correcting memory, watchdog timers and radiation-tolerant parts.","المركبات بتستخدم ذاكرة بتصحح الأخطاء، وwatchdog timers، وقطع بتتحمل الإشعاع.","think"],
 ["A watchdog resets the computer if the software freezes. Add one to your own robots too.","الـwatchdog بيعمل ريستارت للكمبيوتر لو البرنامج وقف. حط واحد في روبوتاتك كمان.","happy"]]);

/* ===== AI ===== */
R("What is machine learning?","ai","Rules vs examples","قواعد مقابل أمثلة",{k:"duel",a:["📏","You write rules",.3],b:["🧪","Give examples",.9],tag:"ML"},[
 ["In normal programming, you write the rules. In machine learning, you give examples and the computer finds the rules.","في البرمجة العادية بتكتب إنت القواعد. في الـmachine learning بتدّي أمثلة والكمبيوتر يلاقي القواعد.","point"],
 ["Supervised learning has answers, like photos labelled cat or dog. Unsupervised finds groups with no answers.","التعلم الموجّه فيه إجابات، زي صور عليها قطة أو كلب. وغير الموجّه بيلاقي مجموعات من غير إجابات.","think"],
 ["And reinforcement learning is trial and reward, like a robot learning to walk. Falling is part of it.","والتعلم بالتعزيز تجربة ومكافأة، زي روبوت بيتعلم يمشي. الوقعة جزء من الموضوع.","laugh"]]);
R("Data with NumPy","ai","NumPy arrays: many numbers at once","مصفوفات NumPy: أرقام كتير مرة واحدة",{k:"table",rows:[["2","4","6"],["8","10","12"],["14","16","18"]],fixed:[["","",""],["","",""],["","",""]],tag:"",sub:"arr * 2  →  no loop!"},[
 ["Almost all AI in Python starts with NumPy. An array holds many numbers and works on all of them at once.","تقريبا كل الـAI في بايثون بيبدأ بـNumPy. المصفوفة بتشيل أرقام كتير وبتشتغل عليهم كلهم مرة واحدة.","point"],
 ["No loops needed. Mean, standard deviation, slicing and reshaping, you will use them all the time.","من غير حلقات. المتوسط والانحراف المعياري والقص وإعادة التشكيل هتستخدمهم دايما.","think"],
 ["Pandas builds tables on top of it. NumPy is the foundation. Respect the foundation.","Pandas بتبني جداول فوقيه. NumPy هو الأساس. احترم الأساس.","laugh"]]);
R("Your first model: linear regression","ai","Linear regression: predict a number","الانحدار الخطي: توقّع رقم",{k:"bars",bars:[["1h",.2,C.cy,"40"],["2h",.4,C.cy,"55"],["3h",.6,C.cy,"70"],["4h",.8,C.gr,"?"]],tag:["hours studied → score","ساعات المذاكرة → الدرجة"]},[
 ["Regression predicts a number. You give it inputs, like hours studied, and answers, like scores.","الانحدار بيتوقع رقم. بتدّيه مدخلات زي ساعات المذاكرة، وإجابات زي الدرجات.","point"],
 ["fit finds the best line. predict uses that line on new inputs.","fit بتلاقي أحسن خط. وpredict بتستخدمه على مدخلات جديدة.","happy"],
 ["More hours, higher score. Sadly, the line cannot study for you.","ساعات أكتر، درجة أعلى. للأسف الخط مش هيذاكر عنك.","laugh"]]);
R("Classification with k-NN","ai","k-NN: let the neighbours vote","k-NN: الجيران بيصوّتوا",{k:"net",layers:[4,3,1],tag:["nearest k points vote","أقرب k نقط بيصوّتوا"]},[
 ["Classification predicts a label. k-Nearest Neighbours is the friendliest algorithm.","التصنيف بيتوقع تسمية. k-Nearest Neighbours أحن خوارزمية.","point"],
 ["To classify a new point, look at the k closest known points and take a vote.","عشان تصنّف نقطة جديدة، بص على أقرب k نقط معروفة وخد تصويت.","happy"],
 ["We hold back 20 percent of the data to test on examples the model never saw.","بنحجز 20 في المية من البيانات نختبر بيها على أمثلة الموديل مشافهاش.","think"]]);
R("Overfitting: memorising is not learning","ai","Overfitting: memorising isn't learning","Overfitting: الحفظ مش فهم",{k:"bars",bars:[["Train",.98,C.gr,"99%"],["Test",.55,C.pk,"58%"]],tag:["big gap = overfit","فجوة كبيرة = overfit"]},[
 ["A model that is too flexible memorises the training data, noise included, then fails on new data.","موديل مرن زيادة بيحفظ بيانات التدريب، بالتشويش كمان، وبعدين بيفشل على بيانات جديدة.","point"],
 ["The warning sign: a very high training score, but a much lower test score.","علامة التحذير: درجة تدريب عالية جدا، ودرجة اختبار أقل بكتير.","wow"],
 ["Fixes: more data, a simpler model, or stopping earlier. In k-NN, k equals 1 hugs every mistake.","الحلول: بيانات أكتر، موديل أبسط، أو توقف بدري. في k-NN، k بواحد بيحضن كل الغلطات.","think"]]);
R("A tiny neural network","ai","Neuron: weights, bias, activation","النيورون: أوزان وbias وactivation",{k:"net",layers:[3,1],tag:"Σ w·x + b → ReLU"},[
 ["An artificial neuron multiplies each input by a weight, adds them up with a bias, then applies an activation.","النيورون الصناعي بيضرب كل مدخل في وزن، ويجمعهم مع bias، وبعدين يطبّق activation.","point"],
 ["ReLU keeps positives and turns negatives into zero. Super simple, super useful.","ReLU بتسيب الموجب وتخلّي السالب صفر. بسيطة جدا ومفيدة جدا.","happy"],
 ["One neuron is a tiny calculator with opinions.","النيورون الواحد آلة حاسبة صغيرة ليها رأي.","laugh"]]);
R("A tiny neural network","ai","Layers and training","الطبقات والتدريب",{k:"net",layers:[3,4,4,2],tag:["gradient descent: step downhill","gradient descent: خطوة لتحت"]},[
 ["A layer is many neurons side by side. A network stacks layers.","الطبقة هي نيورونات كتير جنب بعض. والشبكة بتكدّس طبقات.","point"],
 ["Training adjusts all the weights to reduce the error, using gradient descent: small steps downhill, many times.","التدريب بيظبط كل الأوزان عشان يقلل الخطأ، بـgradient descent: خطوات صغيرة لتحت، مرات كتير.","think"],
 ["Deep learning is just many layers. The idea per neuron stays this simple.","الـdeep learning مجرد طبقات كتير. فكرة كل نيورون بتفضل بسيطة كده.","laugh"]]);
R("Is the model any good? Accuracy, precision, recall","ai","Accuracy can fool you","الـaccuracy ممكن تضحك عليك",{k:"bars",bars:[["Accuracy",.99,C.gr,"99%"],["Recall",.0,C.pk,"0%"]],tag:["1% faults, model says 'normal'","1% أعطال، والموديل بيقول عادي"]},[
 ["Accuracy alone can fool you. If only one percent of readings are faults, a model that always says normal is 99 percent accurate.","الـaccuracy لوحدها ممكن تضحك عليك. لو 1 في المية بس أعطال، موديل بيقول عادي دايما دقته 99 في المية.","wow"],
 ["And it is useless, because it never catches a fault.","وهو عديم الفايدة، لأنه عمره ما بيمسك عطل.","point"],
 ["A confusion matrix counts true and false positives and negatives. Always test on unseen data.","الـconfusion matrix بتعدّ الإيجابيات والسلبيات الصح والغلط. واختبر دايما على بيانات متشافتش.","think"]]);
R("Is the model any good? Accuracy, precision, recall","ai","Precision and recall","Precision وrecall",{k:"duel",a:["🔔","Precision",.7],b:["🎯","Recall",.5],tag:["alarms real? / faults caught?","الإنذارات حقيقية؟ / الأعطال اتمسكت؟"]},[
 ["Precision asks: of the alarms it raised, how many were real?","الـprecision بتسأل: من الإنذارات اللي رفعها، كام واحد كان حقيقي؟","point"],
 ["Recall asks: of the real faults, how many did it catch?","والـrecall بتسأل: من الأعطال الحقيقية، كام واحد مسكه؟","think"],
 ["In safety systems, missing a real fault is usually worse than a false alarm.","في أنظمة الأمان، تفويت عطل حقيقي غالبا أسوأ من إنذار كاذب.","wow"]]);
R("Cleaning data with pandas","ai","Cleaning data with pandas","تنضيف البيانات بـpandas",{k:"table",tag:"NaN → clean",sub:"df.fillna(df.mean())"},[
 ["Most of an AI project is data work. pandas gives you tables, called DataFrames.","أغلب مشروع الـAI شغل بيانات. pandas بتدّيك جداول اسمها DataFrames.","point"],
 ["Load a CSV, look at it with head and describe, then handle missing values: drop or fill.","حمّل CSV، بص عليه بـhead وdescribe، وبعدين اتعامل مع القيم الناقصة: احذف أو املا.","think"],
 ["Fix types, remove obvious errors, scale numbers. Good data beats a fancier model.","صحّح الأنواع، شيل الأخطاء الواضحة، وقيّس الأرقام. البيانات الكويسة بتغلب موديل أشيك.","happy"]]);
R("Cleaning data with pandas","ai","Garbage in, garbage out","Garbage in, garbage out",{k:"table",rows:[["???","NaN","999"],["12","4","NaN"],["NaN","???","7"]],fixed:[["10","8","9"],["12","4","6"],["11","5","7"]],tag:"",sub:"plot it before you trust it"},[
 ["Garbage in, garbage out. Always plot the data before you trust it.","Garbage in, garbage out. ارسم البيانات دايما قبل ما تثق فيها.","point"],
 ["A weird spike or a missing block shows up in one plot, and saves you hours.","طلعة غريبة أو جزء ناقص بيبان في رسمة واحدة، وبيوفر عليك ساعات.","wow"],
 ["I plotted my lunch budget once. Never again.","رسمت ميزانية الغدا مرة. مش هعملها تاني.","laugh"]]);
R("Seeing with OpenCV","ai","OpenCV: how a robot sees","OpenCV: الروبوت بيشوف إزاي",{k:"chain",nodes:[["📷","Frame",C.cy],["⬜","Grey",C.vi],["🌫️","Blur",C.gr],["✏️","Edges",C.pk]],tag:["then shapes","وبعدين الأشكال"]},[
 ["OpenCV reads camera frames as NumPy arrays, so everything you learned still applies.","OpenCV بيقرا فريمات الكاميرا كمصفوفات NumPy، فكل اللي اتعلمته لسه ينفع.","point"],
 ["Classic steps: convert to grey, blur, find edges, then find shapes.","الخطوات الكلاسيكية: حوّل لرمادي، بلّر، دوّر على الحواف، وبعدين الأشكال.","think"],
 ["Deep-learning detection runs on a Pi with TensorFlow Lite. This is how a robot sees.","الكشف بالـdeep learning بيشتغل على الباي بـTensorFlow Lite. كده الروبوت بيشوف.","wow"]]);
R("Space project: spot a bad sensor reading","ai","z-score: spot a bad reading","z-score: اكتشف القراءة الغلط",{k:"bars",bars:[["t1",.4,C.cy,""],["t2",.45,C.cy,""],["t3",.42,C.cy,""],["t4",.95,C.pk,"z>3"],["t5",.44,C.cy,""]],line:.7,tag:"anomaly"},[
 ["Satellites send telemetry: temperatures, voltages, currents. How do you spot a bad reading?","الأقمار بتبعت تليمتري: حرارة وفولت وتيار. إزاي تكتشف قراءة غلط؟","point"],
 ["Use the z-score: how many standard deviations a reading is from the average. Beyond 2 or 3 deserves a look.","استخدم الـz-score: القراءة بعيدة كام انحراف معياري عن المتوسط. أكتر من 2 أو 3 تستاهل نظرة.","think"],
 ["Real systems use richer models, but the idea is the same. A nice story for a space interview.","الأنظمة الحقيقية بتستخدم موديلات أغنى، بس الفكرة واحدة. حكاية حلوة لمقابلة فضاء.","happy"]]);
