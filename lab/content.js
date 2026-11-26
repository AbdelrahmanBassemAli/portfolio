"use strict";
/* Mission Lab content pack: photo credits, electronics, projects, extra space + AI cards, quizzes, facts. */

/* ---------- photos (all from Wikimedia Commons; licences listed on the credits sheet) ---------- */
const PHOTOS={
 uno:{src:"assets/img/uno.jpg",page:"https://commons.wikimedia.org/wiki/File:Arduino_Uno_006.jpg",by:"oomlout",lic:"CC BY-SA 2.0",licUrl:"https://creativecommons.org/licenses/by-sa/2.0/",
  cap:{en:"Arduino Uno R3 board, top view",ar:"لوحة Arduino Uno R3 من فوق"}},
 rpi4:{src:"assets/img/rpi4.jpg",page:"https://commons.wikimedia.org/wiki/File:Raspberry_Pi_4_Model_B_-_Top.jpg",by:"Laserlicht",lic:"CC BY-SA 4.0",licUrl:"https://creativecommons.org/licenses/by-sa/4.0/",
  cap:{en:"Raspberry Pi 4 Model B, top view",ar:"راسبيري باي 4 موديل B من فوق"}},
 iss:{src:"assets/img/iss.jpg",page:"https://commons.wikimedia.org/wiki/File:ISS-56_International_Space_Station_fly-around_(05).jpg",by:"NASA / Roscosmos",lic:"Public domain",licUrl:"",
  cap:{en:"The International Space Station in low Earth orbit",ar:"محطة الفضاء الدولية في مدار أرضي منخفض"}},
 hubble:{src:"assets/img/hubble.jpg",page:"https://commons.wikimedia.org/wiki/File:Hubble_2009_close-up.jpg",by:"NASA",lic:"Public domain",licUrl:"",
  cap:{en:"Hubble Space Telescope after its last servicing mission, 2009",ar:"تلسكوب هابل بعد آخر مهمة صيانة سنة 2009"}},
 sputnik:{src:"assets/img/sputnik.jpg",page:"https://commons.wikimedia.org/wiki/File:Sputnik_1.jpg",by:"U.S. Air Force photo",lic:"Public domain",licUrl:"",
  cap:{en:"A replica of Sputnik 1, the first artificial satellite (1957)",ar:"نسخة طبق الأصل من سبوتنيك 1، أول قمر صناعي (1957)"}},
 galileo:{src:"assets/img/galileo.jpg",page:"https://commons.wikimedia.org/wiki/File:Galileo_satellite_in_LEAF_for_acoustic_testing_ESA295941.jpg",by:"European Space Agency",lic:"CC BY-SA 3.0 IGO",licUrl:"https://creativecommons.org/licenses/by-sa/3.0/igo/",
  cap:{en:"A Galileo navigation satellite during acoustic testing",ar:"قمر الملاحة Galileo أثناء اختبار الاهتزاز الصوتي"}},
 hope:{src:"assets/img/hope-mars.jpg",page:"https://commons.wikimedia.org/wiki/File:Mars_-_Valles_Marineris_-_Hope_Mission,_Orbit_25_(52117822101).png",by:"Emirates Mars Mission (processed by Andrea Luck)",lic:"CC BY 2.0",licUrl:"https://creativecommons.org/licenses/by/2.0/",
  cap:{en:"Mars and Valles Marineris, seen by the UAE Hope probe",ar:"المريخ ووادي مارينر كما يراه مسبار الأمل الإماراتي"}},
 hopemodel:{src:"assets/img/hope-model.jpg",page:"https://commons.wikimedia.org/wiki/File:Emirates_Mars_Mission_mockup_at_IAC_2021_01_(cropped).jpg",by:"BugWarp",lic:"CC BY-SA 4.0",licUrl:"https://creativecommons.org/licenses/by-sa/4.0/",
  cap:{en:"Full-size model of the Hope probe (Emirates Mars Mission)",ar:"نموذج بالحجم الحقيقي لمسبار الأمل (مهمة الإمارات للمريخ)"}},
 gps:{src:"assets/img/gps-launch.jpg",page:"https://commons.wikimedia.org/wiki/File:GPS-IIF-11.jpg",by:"Michael Howard / Spaceflight Insider",lic:"Public domain",licUrl:"",
  cap:{en:"An Atlas V launching a GPS IIF navigation satellite",ar:"صاروخ Atlas V بيطلق قمر ملاحة GPS IIF"}},
 cubesat:{src:"assets/img/cubesat.jpg",page:"https://commons.wikimedia.org/wiki/File:ISS-45_Cubesats_deployed_from_the_ISS.jpg",by:"NASA",lic:"Public domain",licUrl:"",
  cap:{en:"CubeSats released from the International Space Station",ar:"كيوبسات بيتم إطلاقها من محطة الفضاء الدولية"}},
 starlink:{src:"assets/img/starlink.jpg",page:"https://commons.wikimedia.org/wiki/File:Starlink_Mission_(47926144123).jpg",by:"Official SpaceX Photos",lic:"CC0",licUrl:"https://creativecommons.org/publicdomain/zero/1.0/",
  cap:{en:"A stack of Starlink satellites just after launch",ar:"مجموعة أقمار Starlink مرصوصة بعد الإطلاق مباشرة"}},
 ground:{src:"assets/img/ground-station.jpg",page:"https://commons.wikimedia.org/wiki/File:Erdfunkstelle_Raisting_2.jpg",by:"Richard Bartz (Makro Freak)",lic:"CC BY-SA 2.5",licUrl:"https://creativecommons.org/licenses/by-sa/2.5/",
  cap:{en:"A satellite ground-station dish (Raisting, Germany)",ar:"طبق محطة أرضية للأقمار الصناعية (رايستينغ، ألمانيا)"}}
};

/* ---------- Robotics: electronics essentials ---------- */
const ELEC=[
{en:{title:"Ohm's law and resistors",tag:"V = I × R",body:"Voltage (V) pushes current (I) through resistance (R). Ohm's law links them: V = I × R. An LED has almost no resistance once it lights, so without a resistor it draws too much current and burns out. Example: a 5 V pin, an LED that drops about 2 V and likes about 15 mA: R = (5 − 2) / 0.015 = 200 Ω, so use 220 Ω.",cap:"Higher resistor value = dimmer LED, safer circuit. When unsure, start with 330 Ω."},
 ar:{title:"قانون أوم والمقاومات",tag:"V = I × R",body:"الجهد (V) بيدفع التيار (I) في مقاومة (R). قانون أوم بيربطهم: V = I × R. الـLED مقاومته شبه صفر بعد ما بينوّر، فمن غير مقاومة بيسحب تيار كبير ويحترق. مثال: طرف 5 فولت وLED بيفقد حوالي 2 فولت وبيحب 15 مللي أمبير: R = (5 − 2) / 0.015 = 200 أوم، يعني استخدم 220 أوم.",cap:"مقاومة أكبر = LED أخفت ودايرة أأمن. لو مش متأكد ابدأ بـ 330 أوم."},
 code:`# Ohm's law as a tiny Python helper
def resistor_for_led(supply_v, led_v, current_a):
    return (supply_v - led_v) / current_a

print(resistor_for_led(5, 2.0, 0.015))   # 200.0 ohms -> pick 220
print(resistor_for_led(3.3, 2.0, 0.010)) # 130.0 ohms -> pick 150`},
{en:{title:"Breadboard basics",tag:"build without soldering",body:"A breadboard has holes connected in hidden strips. The two long rails on the sides are for power (+) and ground (−). In the middle, each short column of five holes (a to e, and f to j) is connected, and the gap in the middle isolates the two halves, so a chip straddling the gap does not short its pins. Build in this order: power rails, components, signal wires, and plug in the power last.",cap:"Always connect GND of every board together (a common ground)."},
 ar:{title:"أساسيات البريدبورد",tag:"ابني من غير لحام",body:"البريدبورد فيه فتحات متوصلة بشرائط مخفية. السكتين الطويلتين على الجنب للكهربا (+) والأرضي (−). في النص كل عمود قصير من خمس فتحات (a لـ e، وf لـ j) متوصل مع بعضه، والفاصل اللي في النص بيعزل النصفين، فالشريحة اللي بتقف على الفاصل أطرافها مبتتلامسش. ابني بالترتيب ده: سكك الكهربا، القطع، أسلاك الإشارة، ووصّل الكهربا في الآخر.",cap:"وصّل الأرضي GND بتاع كل اللوحات مع بعض (أرضي مشترك)."}},
{en:{title:"Digital vs analog signals",tag:"HIGH/LOW or a range",body:"A digital signal has two states, HIGH (5 V or 3.3 V) and LOW (0 V): buttons, switches, motion sensors. An analog signal is any value in a range: a light sensor (LDR), a potentiometer, a temperature sensor. The Arduino Uno reads analog on A0 to A5 with a 10-bit converter, giving numbers 0 to 1023. The Raspberry Pi has no analog inputs, so you add an ADC chip such as the MCP3008.",cap:"analogRead(A0) returns 0 to 1023. Map it to what you need: a percentage, a voltage, an angle."},
 ar:{title:"إشارات رقمية وتناظرية",tag:"HIGH/LOW أو مدى كامل",body:"الإشارة الرقمية ليها حالتين، HIGH (5 أو 3.3 فولت) وLOW (0 فولت): زراير ومفاتيح وحساسات حركة. والتناظرية أي قيمة في مدى: حساس ضوء (LDR) أو بوتنشيومتر أو حساس حرارة. الأردوينو أونو بيقرا التناظري على A0 لـ A5 بمحوّل 10 بت فبيدي أرقام من 0 لـ 1023. الراسبيري باي معندوش مداخل تناظرية، فبتضيف شريحة ADC زي MCP3008.",cap:"analogRead(A0) بترجع 0 لـ 1023. حوّلها للي تحتاجه: نسبة أو فولت أو زاوية."},
 code:`# Arduino C++: read a light sensor and print it
int ldr = A0;
void setup() { Serial.begin(9600); }
void loop() {
  int value = analogRead(ldr);        // 0..1023
  float percent = value * 100.0 / 1023;
  Serial.println(percent);
  delay(500);
}`},
{en:{title:"PWM: faking analog with a digital pin",tag:"dim LEDs, drive servos",body:"PWM switches a pin ON and OFF very fast. The fraction of time it is ON is the duty cycle. 25 percent duty looks like a dim LED or a slow motor; 100 percent is full power. On the Uno, pins marked ~ (3, 5, 6, 9, 10, 11) do PWM with analogWrite(pin, 0 to 255). A hobby servo uses a different kind of PWM: a pulse every 20 ms whose width (about 1 to 2 ms) sets the angle.",cap:"analogWrite(9, 128) is about 50 percent duty."},
 ar:{title:"PWM: نعمل تناظري من طرف رقمي",tag:"تعتيم LED وتشغيل سيرفو",body:"الـPWM بيفتح ويقفل الطرف بسرعة كبيرة. النسبة اللي بيكون فيها شغال اسمها duty cycle. 25 في المية شكلها LED خافت أو موتور بطيء؛ و100 في المية قوة كاملة. في الأونو الأطراف اللي عليها ~ (3 و5 و6 و9 و10 و11) بتعمل PWM بـ analogWrite(pin, من 0 لـ 255). السيرفو بيستخدم نوع تاني: نبضة كل 20 ملي ثانية وعرضها (حوالي 1 لـ 2 ملي ثانية) بيحدد الزاوية.",cap:"analogWrite(9, 128) يعني تقريبًا 50 في المية."},
 code:`from gpiozero import PWMLED, Servo
from time import sleep

led = PWMLED(17)
for level in (0.1, 0.5, 1.0):
    led.value = level          # duty cycle 0..1
    sleep(1)

servo = Servo(18)
servo.min(); sleep(1)
servo.max(); sleep(1)
servo.mid()`},
{en:{title:"Talking to chips: UART, I2C and SPI",tag:"serial buses",body:"UART uses two wires (TX, RX) between two devices: your Arduino and the PC over USB, a GPS module. I2C uses two shared wires (SDA data, SCL clock) and gives every device an address, so many sensors share one bus. SPI uses four wires and is faster: displays, SD cards. Rule of thumb: UART for modules, I2C for many slow sensors, SPI for speed.",cap:"On the Uno: I2C is A4 (SDA) and A5 (SCL). On the Pi: GPIO2 (SDA) and GPIO3 (SCL)."},
 ar:{title:"الكلام مع الشرائح: UART وI2C وSPI",tag:"ناقلات تسلسلية",body:"الـUART بيستخدم سلكين (TX وRX) بين جهازين: الأردوينو والكمبيوتر على USB، أو موديول GPS. الـI2C بيستخدم سلكين مشتركين (SDA للبيانات وSCL للساعة) وكل جهاز ليه عنوان، فحساسات كتير تشارك ناقل واحد. والـSPI بأربع أسلاك وأسرع: الشاشات وكروت SD. قاعدة سريعة: UART للموديولات، وI2C لحساسات كتير بطيئة، وSPI للسرعة.",cap:"في الأونو: I2C هو A4 (SDA) وA5 (SCL). وفي الباي: GPIO2 (SDA) وGPIO3 (SCL)."},
 code:`# Raspberry Pi: scan the I2C bus for sensors (after enabling I2C)
# in a terminal:  i2cdetect -y 1
from smbus2 import SMBus

with SMBus(1) as bus:
    # 0x76 is a common address for the BMP280 pressure sensor
    chip_id = bus.read_byte_data(0x76, 0xD0)
    print(hex(chip_id))`},
{en:{title:"Motors and drivers",tag:"never power a motor from a pin",body:"A GPIO pin can supply only about 20 mA, while a small motor needs hundreds. A pin must never drive a motor directly. Use a driver: a transistor for one direction, or an H-bridge (L298N, L293D, TB6612) to reverse direction and control speed with PWM. Give the motor its own supply, share the ground with the controller, and add a diode across the motor so the voltage spike does not hurt the board.",cap:"Servos have the driver built in. Steppers need a stepper driver."},
 ar:{title:"الموتورات والـDrivers",tag:"متشغلش موتور من طرف مباشرة",body:"الطرف الواحد بيدي حوالي 20 مللي أمبير بس، والموتور الصغير محتاج مئات. فممنوع الطرف يشغل موتور مباشرة. استخدم Driver: ترانزستور لاتجاه واحد، أو H-bridge (زي L298N وL293D وTB6612) لعكس الاتجاه والتحكم في السرعة بالـPWM. اديّ الموتور مصدر كهربا لوحده، وشارك الأرضي مع المتحكم، وحط دايود على الموتور عشان الشرارة العكسية متضرش اللوحة.",cap:"السيرفو فيه الـDriver جواه. والستيبر موتور محتاج Stepper driver."}},
{en:{title:"Power and safety rules",tag:"protect your boards",body:"1) The Arduino Uno works at 5 V; the Raspberry Pi GPIO works at 3.3 V and is NOT 5 V tolerant: a 5 V signal into a Pi pin can destroy it. Use a level shifter or a voltage divider. 2) Check polarity before powering on. 3) Never short 5 V to GND. 4) Disconnect power before changing wires. 5) Keep the Pi on a proper 5 V / 3 A USB-C supply; weak supplies cause random reboots and the lightning-bolt warning.",cap:"Most dead boards come from wrong voltage or a short, not from code."},
 ar:{title:"قواعد الكهربا والأمان",tag:"احمي لوحاتك",body:"1) الأردوينو أونو بيشتغل على 5 فولت؛ وأطراف الراسبيري باي بتشتغل على 3.3 فولت ومش بتتحمل 5 فولت: إشارة 5 فولت داخلة طرف باي ممكن تحرقه. استخدم level shifter أو مقسّم جهد. 2) اتأكد من القطبية قبل التشغيل. 3) متوصلش 5 فولت بالأرضي أبدًا. 4) افصل الكهربا قبل ما تغير الأسلاك. 5) شغّل الباي على شاحن USB-C حقيقي 5 فولت / 3 أمبير؛ الشواحن الضعيفة بتسبب ريستارت عشوائي وعلامة البرق.",cap:"أغلب اللوحات اللي بتموت سببها فولت غلط أو ماس كهربائي، مش الكود."}},
{en:{title:"Buttons: pull-ups and debouncing",tag:"stable inputs",body:"A button pin that is not connected to anything floats and reads random values. A pull-up resistor ties it to HIGH; pressing the button connects it to GND (LOW). Both the Uno (INPUT_PULLUP) and the Pi (gpiozero turns it on for you) have built-in pull-ups. Real buttons also bounce: they flicker for a few milliseconds when pressed. Ignore changes for about 20 to 50 ms (debounce) or you will count one press as many.",cap:"With INPUT_PULLUP, pressed means LOW. It surprises everyone once."},
 ar:{title:"الزراير: Pull-up وDebounce",tag:"مدخلات مستقرة",body:"طرف الزرار لو مش متوصل بحاجة بيبقى عايم وبيقرا قيم عشوائية. مقاومة pull-up بتربطه بـ HIGH؛ ولما تدوس الزرار بيتوصل بالأرضي (LOW). الأونو (INPUT_PULLUP) والباي (مكتبة gpiozero بتفعّلها) فيهم pull-up جاهز. والزراير الحقيقية بتهتز: بتومض كام ملي ثانية وقت الضغط. تجاهل التغييرات حوالي 20 لـ 50 ملي ثانية (debounce) وإلا هتعد ضغطة واحدة كأنها كتير.",cap:"مع INPUT_PULLUP: مضغوط يعني LOW. بتفاجئ الكل مرة."},
 code:`// Arduino C++: button with the built-in pull-up and a simple debounce
const int BTN = 2;
bool last = HIGH;
unsigned long changed = 0;

void setup() { pinMode(BTN, INPUT_PULLUP); Serial.begin(9600); }
void loop() {
  bool now = digitalRead(BTN);
  if (now != last && millis() - changed > 30) {
    changed = millis();
    last = now;
    if (now == LOW) Serial.println("pressed");
  }
}`}
];

/* ---------- Robotics: project builds ---------- */
const PROJECTS=[
{en:{title:"Night light with a light sensor",tag:"Arduino · beginner · 30 min",body:"Parts: Arduino Uno, LDR, 10 kΩ resistor, LED, 220 Ω resistor, breadboard, jumper wires. Build a voltage divider with the LDR and the 10 kΩ resistor, send its middle point to A0, and put the LED with its resistor on pin 9. When the room gets dark, the LED fades in. You practise analog input, PWM and map().",cap:"Stretch goal: add a button that switches between auto and always-on."},
 ar:{title:"أباجورة بحساس ضوء",tag:"أردوينو · مبتدئ · 30 دقيقة",body:"القطع: أردوينو أونو، LDR، مقاومة 10 كيلو، LED، مقاومة 220، بريدبورد، أسلاك. اعمل مقسّم جهد من الـLDR والمقاومة 10 كيلو، ووصّل نقطة المنتصف على A0، وحط الـLED ومقاومته على طرف 9. لما الأوضة تضلّم، الـLED بينوّر تدريجيًا. هتتمرن على المدخل التناظري والـPWM ودالة map().",cap:"تحدّي: ضيف زرار يبدّل بين الوضع التلقائي والتشغيل الدائم."},
 code:`const int LDR = A0, LED = 9;
void setup() { pinMode(LED, OUTPUT); }
void loop() {
  int light = analogRead(LDR);              // 0 dark .. 1023 bright (depends on wiring)
  int glow = map(light, 0, 1023, 255, 0);   // darker room = brighter LED
  analogWrite(LED, constrain(glow, 0, 255));
  delay(20);
}`},
{en:{title:"Parking sensor with ultrasonic distance",tag:"Arduino · beginner · 45 min",body:"Parts: Arduino Uno, HC-SR04 ultrasonic sensor, buzzer, LED, resistor. The sensor sends a 40 kHz ping and times the echo. Distance = time × speed of sound / 2 (about 343 m/s). The closer the object, the faster the buzzer beeps. This is the same time-of-flight idea behind radar altimeters and lidar.",cap:"Sound travels about 29 microseconds per centimetre, and the ping goes there and back."},
 ar:{title:"حساس ركنة بالموجات فوق الصوتية",tag:"أردوينو · مبتدئ · 45 دقيقة",body:"القطع: أردوينو أونو، حساس HC-SR04، بازر، LED، مقاومة. الحساس بيبعت نبضة 40 كيلوهرتز وبيقيس زمن الصدى. المسافة = الزمن × سرعة الصوت / 2 (حوالي 343 م/ث). كل ما الجسم يقرب البازر يزقزق أسرع. نفس فكرة زمن الطيران في رادار الارتفاع والليدار.",cap:"الصوت بيقطع تقريبًا 29 ميكرو ثانية للسنتيمتر، والنبضة بتروح وتيجي."},
 code:`const int TRIG = 7, ECHO = 8, BUZ = 5;
void setup() { pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT); pinMode(BUZ, OUTPUT); }
long cm() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  return pulseIn(ECHO, HIGH) / 58;          // microseconds -> centimetres
}
void loop() {
  long d = cm();
  if (d < 100) { tone(BUZ, 2000, 40); }
  delay(constrain(d * 4, 40, 400));         // closer = faster beeps
}`},
{en:{title:"Line-following robot",tag:"Arduino · intermediate · 2 hours",body:"Parts: Arduino Uno, two IR line sensors, L298N or TB6612 motor driver, two DC motors with wheels, a chassis, a battery pack. The sensors see the dark line. If the left sensor sees the line, turn left; if the right one does, turn right; if both are on the line, go straight. Start slow, then add a proportional correction (the P in PID) for smooth driving.",cap:"Tip: power the motors from the battery pack, not from the Arduino 5 V pin."},
 ar:{title:"روبوت يتتبع الخط",tag:"أردوينو · متوسط · ساعتين",body:"القطع: أردوينو أونو، حساسين IR، درايفر موتور L298N أو TB6612، موتورين بعجل، شاسيه، بطارية. الحساسات بتشوف الخط الغامق. لو الحساس الشمال شاف الخط لف شمال، ولو اليمين لف يمين، ولو الاتنين على الخط امشي عدل. ابدأ ببطء، وبعدين ضيف تصحيح تناسبي (الـP في PID) لحركة أنعم.",cap:"نصيحة: شغّل الموتورات من البطارية، مش من طرف الـ5 فولت في الأردوينو."},
 code:`const int L = A0, R = A1;             // IR sensors
const int ENA = 5, ENB = 6, IN1 = 7, IN2 = 8, IN3 = 9, IN4 = 10;
void drive(int left, int right) {      // -255..255
  digitalWrite(IN1, left > 0);  digitalWrite(IN2, left < 0);
  digitalWrite(IN3, right > 0); digitalWrite(IN4, right < 0);
  analogWrite(ENA, abs(left)); analogWrite(ENB, abs(right));
}
void setup() { for (int p = 5; p <= 10; p++) pinMode(p, OUTPUT); }
void loop() {
  bool l = analogRead(L) > 500, r = analogRead(R) > 500;   // true = on the line
  if (l && r) drive(150, 150);
  else if (l) drive(40, 150);          // line is on the left: steer left
  else if (r) drive(150, 40);
  else drive(0, 0);
}`},
{en:{title:"Pi temperature and humidity logger",tag:"Raspberry Pi · beginner · 1 hour",body:"Parts: Raspberry Pi, DHT22 sensor, 10 kΩ resistor. Read the sensor every minute, append a line with the time to a CSV file, and later plot it with Python. This is the seed of every telemetry system: sense, timestamp, store, analyse.",cap:"Next step: send the numbers to a small web page or a phone app."},
 ar:{title:"مسجّل حرارة ورطوبة بالراسبيري باي",tag:"راسبيري باي · مبتدئ · ساعة",body:"القطع: راسبيري باي، حساس DHT22، مقاومة 10 كيلو. اقرا الحساس كل دقيقة، وسجّل سطر بالوقت في ملف CSV، وبعدين ارسمه ببايثون. دي بذرة أي نظام قياس عن بعد: استشعار، ختم زمني، تخزين، تحليل.",cap:"الخطوة الجاية: ابعت الأرقام لصفحة ويب صغيرة أو تطبيق موبايل."},
 code:`import csv, time
from datetime import datetime
import adafruit_dht, board

sensor = adafruit_dht.DHT22(board.D4)      # data pin on GPIO4

with open("log.csv", "a", newline="") as f:
    w = csv.writer(f)
    while True:
        try:
            w.writerow([datetime.now().isoformat(), sensor.temperature, sensor.humidity])
            f.flush()
        except RuntimeError:
            pass                            # DHT sensors sometimes miss a read
        time.sleep(60)`},
{en:{title:"Pi camera motion alarm",tag:"Raspberry Pi · intermediate · 2 hours",body:"Parts: Raspberry Pi, camera module or USB webcam. Grab frames with OpenCV, subtract the previous frame, and count how many pixels changed. If many changed, something moved: save a photo and turn on an LED or buzzer. It is a first step toward real computer vision on a robot.",cap:"Lighting changes also trigger it. Raise the threshold if it is too sensitive."},
 ar:{title:"إنذار حركة بكاميرا الباي",tag:"راسبيري باي · متوسط · ساعتين",body:"القطع: راسبيري باي، كاميرا أو ويب كام USB. التقط إطارات بـOpenCV، اطرح الإطار السابق، وعد كام بكسل اتغير. لو كتير اتغير يبقى في حاجة اتحركت: احفظ صورة وشغّل LED أو بازر. أول خطوة ناحية الرؤية الحاسوبية الحقيقية على روبوت.",cap:"تغيّر الإضاءة بيشغّله برضو. ارفع الحد لو حساس زيادة."},
 code:`import cv2

cam = cv2.VideoCapture(0)
_, prev = cam.read()
prev = cv2.GaussianBlur(cv2.cvtColor(prev, cv2.COLOR_BGR2GRAY), (21, 21), 0)

while True:
    ok, frame = cam.read()
    if not ok:
        break
    gray = cv2.GaussianBlur(cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY), (21, 21), 0)
    diff = cv2.threshold(cv2.absdiff(prev, gray), 25, 255, cv2.THRESH_BINARY)[1]
    if cv2.countNonZero(diff) > 5000:
        cv2.imwrite("motion.jpg", frame)
        print("Motion!")
    prev = gray`},
{en:{title:"CanSat-style telemetry probe",tag:"Arduino + Pi · advanced · weekend",body:"A CanSat is a mini satellite the size of a soda can, launched on a rocket or a drone. Build the idea: an Arduino reads a pressure and temperature sensor (BMP280) and an accelerometer, sends a data line over a radio module (or a Bluetooth module for testing) every second, and a Raspberry Pi on the ground receives, logs and plots it. You practise sensors, serial protocols, packet design and telemetry, the real skills of a satellite team.",cap:"Design a packet: time, pressure, temperature, acceleration, and a checksum so the receiver can reject corrupted lines."},
 ar:{title:"مجس قياس عن بعد على طريقة CanSat",tag:"أردوينو + باي · متقدم · أجازة",body:"الـCanSat قمر صناعي صغير بحجم علبة مشروب غازي، بيتطلق بصاروخ أو درون. ابني الفكرة: أردوينو بيقرا حساس ضغط وحرارة (BMP280) ومقياس تسارع، وبيبعت سطر بيانات على موديول راديو (أو بلوتوث للتجربة) كل ثانية، وراسبيري باي على الأرض بتستقبل وتسجل وترسم. هتتمرن على الحساسات وبروتوكولات التسلسلي وتصميم الحزم وقياس البيانات عن بعد، المهارات الحقيقية لفريق الأقمار.",cap:"صمّم الحزمة: الوقت والضغط والحرارة والتسارع وchecksum عشان المستقبل يرفض الأسطر التالفة."},
 code:`# Ground-station side (Raspberry Pi): parse and verify a telemetry line
# line format:  t,pressure_hpa,temp_c,accel_g*checksum
def checksum(text):
    c = 0
    for ch in text:
        c ^= ord(ch)
    return c

def parse(line):
    body, _, given = line.strip().partition("*")
    if int(given, 16) != checksum(body):
        return None                       # corrupted packet
    t, p, temp, g = body.split(",")
    return {"t": float(t), "hpa": float(p), "c": float(temp), "g": float(g)}

print(parse("12.0,1012.5,31.2,1.01*" + format(checksum("12.0,1012.5,31.2,1.01"), "02X")))`}
];

/* ---------- Space: more concept cards ---------- */
const SPACE_MORE=[
{en:{title:"Rockets and the rocket equation",tag:"why we need stages",body:"A rocket pushes itself forward by throwing mass backwards. The Tsiolkovsky equation says Δv = ve × ln(m0 / mf): the speed change depends on the exhaust speed (ve) and the logarithm of the full-to-empty mass ratio. Reaching low Earth orbit needs about 9.3 to 10 km/s once gravity and drag losses are counted, so most of a rocket is fuel. Staging drops empty tanks so the rest does not carry dead weight. Launching eastward gives a free boost of up to about 0.46 km/s from Earth's spin.",cap:"Doubling the fuel does not double the speed gain: the logarithm is why space is hard."},
 ar:{title:"الصواريخ ومعادلة الصاروخ",tag:"ليه محتاجين مراحل",body:"الصاروخ بيدفع نفسه لقدام بإنه يرمي كتلة لورا. معادلة تسيولكوفسكي بتقول Δv = ve × ln(m0 / mf): تغير السرعة بيعتمد على سرعة العادم (ve) ولوغاريتم نسبة الكتلة الممتلئة للفاضية. الوصول لمدار أرضي منخفض محتاج حوالي 9.3 لـ 10 كم/ث بعد حساب خسائر الجاذبية والمقاومة، فمعظم الصاروخ وقود. الفصل بين المراحل بيرمي الخزانات الفاضية عشان الباقي ميشيلش وزن ميت. والإطلاق ناحية الشرق بيدي دفعة مجانية لحد حوالي 0.46 كم/ث من دوران الأرض.",cap:"مضاعفة الوقود مش بتضاعف زيادة السرعة: اللوغاريتم هو سبب إن الفضاء صعب."},
 code:`import math

def delta_v(ve_km_s, m0, mf):
    return ve_km_s * math.log(m0 / mf)

# 3.3 km/s exhaust (kerosene/LOX-class engine), 90% of launch mass is propellant
print(round(delta_v(3.3, 100, 10), 2), "km/s")   # about 7.6 km/s from one stage`},
{en:{title:"Earth observation and remote sensing",tag:"satellites that look down",body:"Many satellites carry cameras that see more than visible light. Each spectral band shows something different: near-infrared reflects strongly from healthy plants, thermal infrared shows heat, radar (SAR) sees through clouds and at night. A famous index is NDVI = (NIR − Red) / (NIR + Red): close to 1 means dense healthy vegetation, near 0 bare ground. Resolution (metres per pixel) and revisit time (days between passes) are the two numbers to compare satellites. Sun-synchronous orbits give consistent lighting for comparing images over time.",cap:"Example: Sentinel-2 sees about 10 m per pixel and revisits each place every few days."},
 ar:{title:"رصد الأرض والاستشعار عن بعد",tag:"أقمار بتبص لتحت",body:"أقمار كتير شايلة كاميرات بتشوف أكتر من الضوء المرئي. كل نطاق طيفي بيورّي حاجة مختلفة: الأشعة تحت الحمراء القريبة بتنعكس بقوة من النبات السليم، والحرارية بتوري الحرارة، والرادار (SAR) بيشوف من خلال السحاب وبالليل. مؤشر مشهور هو NDVI = (NIR − Red) / (NIR + Red): قريب من 1 يعني نباتات كثيفة سليمة، وقريب من 0 أرض عارية. الدقة (متر لكل بكسل) وزمن إعادة المرور (أيام بين المرات) هما رقمين المقارنة بين الأقمار. والمدارات المتزامنة مع الشمس بتدي إضاءة ثابتة لمقارنة الصور على مدى الوقت.",cap:"مثال: Sentinel-2 بيشوف حوالي 10 متر للبكسل وبيرجع لنفس المكان كل كام يوم."},
 code:`import numpy as np

nir = np.array([0.50, 0.45, 0.10])   # reflectance of 3 pixels: forest, crop, sand
red = np.array([0.05, 0.08, 0.09])

ndvi = (nir - red) / (nir + red)
print(ndvi.round(2))                 # [0.82 0.7  0.05]`},
{en:{title:"Radio links and frequency bands",tag:"how satellites talk",body:"Satellites talk by radio. Lower bands (L, S) pass through weather easily and suit navigation and mobile services: GPS L1 is 1575.42 MHz. Higher bands (X, Ku, Ka) carry far more data but suffer in heavy rain. Signals weaken with distance: free-space path loss in dB is 20·log10(d in km) + 20·log10(f in MHz) + 32.44. A GEO link at 12 GHz loses about 205 dB, so ground stations use big dishes and satellites use sensitive receivers. Engineers add everything in a link budget to check the signal is strong enough.",cap:"Rule of thumb: doubling the distance or the frequency costs 6 dB."},
 ar:{title:"وصلات الراديو ونطاقات التردد",tag:"الأقمار بتتكلم إزاي",body:"الأقمار بتتكلم بالراديو. النطاقات المنخفضة (L وS) بتعدي الطقس بسهولة وتناسب الملاحة والموبايل: تردد GPS L1 هو 1575.42 ميجاهرتز. والعالية (X وKu وKa) بتشيل بيانات أكتر بكتير بس بتتأثر بالمطر الغزير. الإشارة بتضعف بالمسافة: الفقد في الفضاء الحر بالديسيبل = 20·log10(المسافة بالكم) + 20·log10(التردد بالميجاهرتز) + 32.44. وصلة GEO على 12 جيجاهرتز بتفقد حوالي 205 ديسيبل، عشان كده المحطات الأرضية بأطباق كبيرة والأقمار بمستقبلات حساسة. والمهندسين بيجمعوا كل حاجة في link budget عشان يتأكدوا الإشارة كفاية.",cap:"قاعدة سريعة: مضاعفة المسافة أو التردد بتكلّف 6 ديسيبل."},
 code:`import math

def fspl_db(distance_km, freq_mhz):
    return 20 * math.log10(distance_km) + 20 * math.log10(freq_mhz) + 32.44

print(round(fspl_db(36000, 12000), 1))   # GEO, Ku-band: ~205.1 dB
print(round(fspl_db(550, 2200), 1))      # LEO, S-band: ~153.7 dB`},
{en:{title:"Space weather and radiation",tag:"the Sun affects electronics",body:"The Sun sends out a constant solar wind and sometimes bursts: flares and coronal mass ejections. Charged particles can flip bits in memory (single-event upsets), damage solar cells, and charge a satellite's surface until it discharges. The Earth's radiation belts (Van Allen belts) are dangerous for electronics, so orbits and shielding are chosen carefully. The ionosphere also delays GNSS signals, and storms can degrade positioning. Spacecraft use error-correcting memory, watchdog timers and radiation-tolerant parts.",cap:"A watchdog timer resets the computer if the software stops responding. Add one to your own robots too."},
 ar:{title:"طقس الفضاء والإشعاع",tag:"الشمس بتأثر على الإلكترونيات",body:"الشمس بتبعت رياح شمسية ثابتة وساعات انفجارات: توهجات وانبعاثات كتلة إكليلية. الجسيمات المشحونة ممكن تقلب بتات في الذاكرة (single-event upsets) وتتلف الخلايا الشمسية وتشحن سطح القمر لحد ما يفرّغ. وأحزمة الإشعاع حوالين الأرض (فان ألين) خطر على الإلكترونيات، فبيتم اختيار المدارات والتدريع بعناية. كمان الأيونوسفير بيأخر إشارات الـGNSS والعواصف بتقلل دقة التحديد. والمركبات بتستخدم ذاكرة بتصحيح الأخطاء ومؤقتات watchdog وقطع متحملة للإشعاع.",cap:"الـwatchdog بيعمل ريستارت للكمبيوتر لو البرنامج وقف يرد. ضيفه في روبوتاتك إنت كمان."}}
];

/* ---------- AI: more lessons ---------- */
const AI_MORE=[
{en:{title:"A neuron and a neural network",tag:"weights, bias, activation",body:"An artificial neuron multiplies each input by a weight, adds them up with a bias, and passes the result through an activation function (such as ReLU, which keeps positives and zeroes negatives). A layer is many neurons side by side; a network stacks layers. Training means adjusting all the weights to reduce the error, using gradient descent: take a small step downhill on the error surface, many times.",cap:"Deep learning is just many layers. The idea per neuron stays this simple."},
 ar:{title:"النيورون والشبكة العصبية",tag:"أوزان وانحياز ودالة تنشيط",body:"النيورون الصناعي بيضرب كل مدخل في وزن، ويجمعهم مع انحياز (bias)، ويمرر الناتج في دالة تنشيط (زي ReLU اللي بتسيب الموجب وبتصفّر السالب). الطبقة هي نيورونات كتير جنب بعض؛ والشبكة طبقات فوق بعض. التدريب معناه تعديل كل الأوزان لتقليل الخطأ بطريقة انحدار التدرج: خطوة صغيرة لتحت على سطح الخطأ، مرات كتير.",cap:"التعلم العميق هو طبقات كتير بس. وفكرة كل نيورون بسيطة بالشكل ده."},
 code:`import numpy as np

def relu(x):
    return np.maximum(0, x)

x = np.array([0.5, -1.0, 2.0])       # inputs
w = np.array([0.8, 0.2, -0.5])       # weights
b = 0.1                              # bias

z = np.dot(x, w) + b                 # weighted sum
print(relu(z))                       # the neuron output

# Learning = nudging w and b to reduce the error, many small steps.`},
{en:{title:"Is the model any good? Accuracy, precision, recall",tag:"evaluation",body:"Accuracy alone can fool you. If only 1 percent of sensor readings are faults, a model that always says normal is 99 percent accurate and useless. A confusion matrix counts true and false positives and negatives. Precision answers: of the alarms it raised, how many were real? Recall answers: of the real faults, how many did it catch? Always test on data the model never saw during training.",cap:"In safety systems, missing a real fault (low recall) is usually worse than a false alarm."},
 ar:{title:"النموذج كويس ولا لأ؟ الدقة والـPrecision والـRecall",tag:"التقييم",body:"الدقة (accuracy) لوحدها ممكن تخدعك. لو 1 في المية بس من قراءات الحساس أعطال، نموذج بيقول عادي دايمًا دقته 99 في المية وملوش لازمة. مصفوفة الالتباس بتعد الإيجابيات والسلبيات الصح والغلط. الـPrecision بتجاوب: من الإنذارات اللي أطلقها كام كانت حقيقية؟ والـRecall بتجاوب: من الأعطال الحقيقية كام لقط؟ اختبر دايمًا على بيانات النموذج مشافهاش في التدريب.",cap:"في أنظمة الأمان، تفويت عطل حقيقي (recall قليل) غالبًا أسوأ من إنذار كاذب."},
 code:`from sklearn.metrics import confusion_matrix, precision_score, recall_score

truth = [0, 0, 0, 0, 0, 0, 1, 1, 0, 1]   # 1 = real fault
pred  = [0, 0, 0, 1, 0, 0, 1, 0, 0, 1]   # what the model said

print(confusion_matrix(truth, pred))
print("precision", precision_score(truth, pred))   # 2 of 3 alarms were real
print("recall   ", recall_score(truth, pred))      # caught 2 of 3 real faults`},
{en:{title:"Cleaning data with pandas",tag:"real data is messy",body:"Most of an AI project is data work. pandas gives you tables (DataFrames). Typical steps: load a CSV, look at it (head, describe), handle missing values (drop or fill), fix types, remove obvious errors, and scale numbers so one big feature does not dominate. Good data beats a fancier model.",cap:"Garbage in, garbage out. Always plot the data before you trust it."},
 ar:{title:"تنضيف البيانات بـpandas",tag:"البيانات الحقيقية مش نضيفة",body:"أغلب مشروع الذكاء الاصطناعي شغل بيانات. مكتبة pandas بتديك جداول (DataFrames). الخطوات المعتادة: حمّل ملف CSV، بص عليه (head وdescribe)، تعامل مع القيم الناقصة (احذف أو عوّض)، صحّح الأنواع، شيل الأخطاء الواضحة، وقيّس الأرقام عشان خاصية كبيرة متسيطرش. البيانات الكويسة أحسن من نموذج أعقد.",cap:"مدخلات وحشة = مخرجات وحشة. ارسم البيانات دايمًا قبل ما تثق فيها."},
 code:`import pandas as pd

df = pd.read_csv("log.csv", names=["time", "temp", "humidity"])
print(df.describe())                      # quick statistics

df["temp"] = df["temp"].fillna(df["temp"].median())   # fill missing values
df = df[(df["temp"] > -40) & (df["temp"] < 85)]       # drop impossible readings

# z-score scaling: mean 0, spread 1
df["temp_z"] = (df["temp"] - df["temp"].mean()) / df["temp"].std()
print(df.head())`}
];

/* ---------- Quizzes ---------- */
const QUIZ={
robotics:[
{en:{q:"Which Arduino Uno pins can do PWM?",o:["Pins marked with ~","Only A0 to A5","Only pin 13","All pins"]},ar:{q:"أنهي أطراف في الأردوينو أونو بتعمل PWM؟",o:["الأطراف اللي عليها ~","A0 لـ A5 بس","طرف 13 بس","كل الأطراف"]},a:0},
{en:{q:"What does the Raspberry Pi GPIO tolerate?",o:["5 V","3.3 V only","12 V","Any voltage"]},ar:{q:"الأطراف GPIO في الراسبيري باي بتتحمل إيه؟",o:["5 فولت","3.3 فولت بس","12 فولت","أي فولت"]},a:1},
{en:{q:"A 5 V pin, an LED dropping 2 V, 15 mA. What resistor?",o:["20 Ω","200 Ω","2 kΩ","1 MΩ"]},ar:{q:"طرف 5 فولت وLED بيفقد 2 فولت و15 مللي أمبير. أنهي مقاومة؟",o:["20 أوم","200 أوم","2 كيلو أوم","1 ميجا أوم"]},a:1},
{en:{q:"Why not drive a motor directly from a GPIO pin?",o:["Pins give only about 20 mA","Motors need data not power","It is illegal","Pins are always HIGH"]},ar:{q:"ليه منشغلش موتور مباشرة من طرف GPIO؟",o:["الطرف بيدي حوالي 20 مللي أمبير بس","الموتور محتاج بيانات مش كهربا","ممنوع قانونًا","الأطراف دايمًا HIGH"]},a:0},
{en:{q:"What does INPUT_PULLUP do?",o:["Makes a pin an output","Keeps an open pin HIGH so a button press reads LOW","Doubles the voltage","Disables the pin"]},ar:{q:"INPUT_PULLUP بتعمل إيه؟",o:["بتخلي الطرف خرج","بتسيب الطرف المفتوح HIGH وضغطة الزرار تتقرا LOW","بتضاعف الفولت","بتعطل الطرف"]},a:1}],
space:[
{en:{q:"At what altitude is a geostationary orbit?",o:["400 km","20,200 km","35,786 km","384,000 km"]},ar:{q:"ارتفاع المدار الثابت بالنسبة للأرض (GEO)؟",o:["400 كم","20,200 كم","35,786 كم","384,000 كم"]},a:2},
{en:{q:"Why does GNSS need at least four satellites?",o:["Three for position, one to fix the receiver clock error","Four antennas","For redundancy only","To see the Sun"]},ar:{q:"ليه الـGNSS محتاج 4 أقمار على الأقل؟",o:["تلاتة للموقع وواحد لتصحيح خطأ ساعة المستقبل","أربع هوائيات","للاحتياط بس","عشان يشوف الشمس"]},a:0},
{en:{q:"Kepler's second law says a satellite moves fastest at…",o:["Apogee","Perigee","The equator","Noon"]},ar:{q:"قانون كبلر التاني: القمر بيبقى أسرع ما يمكن عند…",o:["الأوج","الحضيض","خط الاستواء","الظهر"]},a:1},
{en:{q:"What is a Sun-synchronous orbit good for?",o:["Seeing the same place at the same local solar time","Staying over one spot","Cheaper fuel","Talking to the Moon"]},ar:{q:"المدار المتزامن مع الشمس مفيد في إيه؟",o:["شوف نفس المكان في نفس التوقيت الشمسي المحلي","الثبات فوق نقطة واحدة","وقود أرخص","الكلام مع القمر"]},a:0},
{en:{q:"Which sensor combination do rovers use where there is no GNSS?",o:["Only a compass","Visual odometry, IMU and SLAM","Only a clock","Radio stations"]},ar:{q:"مركبات الاستكشاف بتستخدم إيه لما مفيش GNSS؟",o:["بوصلة بس","Visual odometry وIMU وSLAM","ساعة بس","محطات راديو"]},a:1}],
ai:[
{en:{q:"What does supervised learning need?",o:["Labelled examples","A robot","No data","Only a GPU"]},ar:{q:"التعلم المُشرَف عليه محتاج إيه؟",o:["أمثلة معنونة (labels)","روبوت","مفيش بيانات","كارت شاشة بس"]},a:0},
{en:{q:"A model that memorises training data but fails on new data is…",o:["Underfitting","Overfitting","Normalised","Converged"]},ar:{q:"نموذج بيحفظ بيانات التدريب ويفشل على الجديدة اسمه…",o:["Underfitting","Overfitting","Normalised","Converged"]},a:1},
{en:{q:"In k-NN, what does k mean?",o:["Number of neighbours that vote","Number of features","Kilobytes","Number of classes"]},ar:{q:"في k-NN، k معناها إيه؟",o:["عدد الجيران اللي بيصوّتوا","عدد الخصائص","كيلوبايت","عدد الفئات"]},a:0},
{en:{q:"Only 1% of readings are faults and a model says normal every time. Its accuracy is about…",o:["1%","50%","99%","0%"]},ar:{q:"1% بس من القراءات أعطال ونموذج بيقول عادي دايمًا. دقته تقريبًا؟",o:["1%","50%","99%","0%"]},a:2},
{en:{q:"Which library gives fast arrays in Python?",o:["NumPy","Turtle","random","time"]},ar:{q:"أنهي مكتبة بتدي مصفوفات سريعة في بايثون؟",o:["NumPy","Turtle","random","time"]},a:0}]
};

/* ---------- Did you know ---------- */
const FACTS=[
{en:"The ISS circles the Earth about every 92 minutes, so its crew sees around 16 sunrises a day.",ar:"محطة الفضاء بتلف حوالي الأرض كل 92 دقيقة، فطاقمها بيشوف حوالي 16 شروق في اليوم."},
{en:"An Arduino Uno's ATmega328P chip runs at 16 MHz and has only 2 KB of RAM, yet it can run a robot.",ar:"شريحة ATmega328P في الأردوينو أونو بتشتغل على 16 ميجاهرتز وفيها 2 كيلوبايت رام بس، ومع كده بتشغّل روبوت."},
{en:"GPS satellites carry atomic clocks. Without relativity corrections, positions would drift by about 10 km every day.",ar:"أقمار الـGPS فيها ساعات ذرية. ولولا تصحيحات النسبية كانت المواقع هتنحرف حوالي 10 كم كل يوم."},
{en:"The UAE's Hope probe reached Mars orbit in February 2021, the first Arab interplanetary mission.",ar:"مسبار الأمل الإماراتي وصل مدار المريخ في فبراير 2021، أول مهمة عربية بين الكواكب."},
{en:"The Raspberry Pi 4 is a full computer with up to 8 GB of RAM, in a board the size of a credit card.",ar:"الراسبيري باي 4 كمبيوتر كامل بذاكرة لحد 8 جيجا في لوحة بحجم كارت الائتمان."},
{en:"Sputnik 1, launched in 1957, weighed about 83 kg and beeped on two radio frequencies for around three weeks.",ar:"سبوتنيك 1 اتطلق سنة 1957 ووزنه حوالي 83 كجم وفضل يطلق نبضات راديو لحوالي تلات أسابيع."}
];
