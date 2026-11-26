"use strict";
/* Orbits & Space area: orbit simulator, GNSS demo, concept cards, interview prep, NOVA knowledge */
Object.assign(STR.en,{
 orbTitle:"Orbit simulator",orbHint:"Set the lowest and highest point of an orbit. The satellite moves with Kepler's laws: faster near Earth, slower far away. The flag on Earth turns with the planet, so you can see why GEO looks fixed.",
 perigee:"Lowest point (perigee)",apogee:"Highest point (apogee)",alt:"km",
 rPeriod:"Orbital period",rSpeed:"Speed now",rEcc:"Eccentricity",rClass:"Orbit type",
 pISS:"ISS",pStar:"Starlink",pGPS:"GPS",pGEO:"GEO",pMol:"Molniya",
 warp:"Time is sped up. Real periods are shown above; the picture is not to scale.",
 cLEO:"LEO — Low Earth Orbit",cMEO:"MEO — Medium Earth Orbit",cGEO:"GEO — Geostationary",cHEO:"HEO — Highly elliptical",cOther:"Custom orbit",
 typesTitle:"Orbit types, tap to open",
 gnssTitle:"How GNSS finds you",gnssHint:"Tap anywhere on the map to move the receiver. Each satellite measures its distance by signal travel time. Add a clock error and watch the circles stop meeting, then fix it with one more satellite.",
 gClock:"Receiver clock error",gMode2:"2 satellites (ignore clock)",gMode3:"3 satellites (solve clock too)",gErr:"Position error",gErr0:"none",
 gNote:"Toy 2D model. Real GNSS works in 3D, so it needs 4 satellites: x, y, z and time. A clock error of 1 microsecond is about 300 m.",
 conceptsTitle:"Space concepts",interviewTitle:"Interview prep, explain it simply",interviewHint:"Short frameworks you can adapt. Use your own real experience, NOVA only gives the structure."});
Object.assign(STR.ar,{
 orbTitle:"محاكي المدار",orbHint:"حدد أقل وأعلى نقطة في المدار. القمر الصناعي بيتحرك بقوانين كبلر: أسرع قريب من الأرض وأبطأ بعيد عنها. العلم على الأرض بيلف مع الكوكب، فتشوف ليه الـGEO شكله ثابت.",
 perigee:"أقل نقطة (الحضيض)",apogee:"أعلى نقطة (الأوج)",alt:"كم",
 rPeriod:"زمن الدورة",rSpeed:"السرعة دلوقتي",rEcc:"الانحراف المداري",rClass:"نوع المدار",
 pISS:"محطة الفضاء",pStar:"ستارلينك",pGPS:"GPS",pGEO:"GEO",pMol:"مولنيا",
 warp:"الزمن متسرّع. الأزمنة الحقيقية فوق، والرسم مش بمقياس حقيقي.",
 cLEO:"LEO — مدار أرضي منخفض",cMEO:"MEO — مدار أرضي متوسط",cGEO:"GEO — مدار ثابت بالنسبة للأرض",cHEO:"HEO — مدار إهليلجي عالي",cOther:"مدار مخصص",
 typesTitle:"أنواع المدارات، دوس عشان تفتح",
 gnssTitle:"إزاي الـGNSS بيعرف مكانك",gnssHint:"دوس في أي مكان على الخريطة عشان تحرك المستقبِل. كل قمر بيقيس بعده من زمن وصول الإشارة. زوّد خطأ في الساعة وشوف الدواير ما بقتش تتقابل، وبعدين صلّحه بقمر زيادة.",
 gClock:"خطأ ساعة المستقبِل",gMode2:"قمرين (تجاهل الساعة)",gMode3:"3 أقمار (احسب الساعة كمان)",gErr:"خطأ الموقع",gErr0:"صفر",
 gNote:"نموذج ثنائي الأبعاد للتبسيط. الـGNSS الحقيقي ثلاثي الأبعاد فبيحتاج 4 أقمار: x وy وz والوقت. خطأ ساعة ميكروثانية واحدة يساوي حوالي 300 متر.",
 conceptsTitle:"مفاهيم الفضاء",interviewTitle:"تحضير المقابلة، اشرحها ببساطة",interviewHint:"هياكل قصيرة تعدّلها على مزاجك. استخدم خبرتك الحقيقية، ونوفا بيدّيك الشكل بس."});

const MU=398600.4418,RE=6378.137;
const hm=min=>{const h=Math.floor(min/60),m=Math.round(min-h*60);return h?`${h}h ${m}m`:`${m} min`};

const ORBTYPES=[
{en:{title:"LEO — Low Earth Orbit",tag:"160 to 2,000 km",body:"Close to Earth: one lap takes about 90 to 127 minutes, at roughly 7.5 km/s. Great for Earth imaging, the ISS, CubeSats and internet constellations like Starlink (about 550 km). Low altitude means low signal delay, but each satellite sees a small patch of Earth, so you need many of them. Thin air at the bottom of LEO slowly drags satellites down.",cap:"Most satellites live here."},
 ar:{title:"LEO — مدار أرضي منخفض",tag:"من 160 لـ 2,000 كم",body:"قريب من الأرض: اللفة بتاخد حوالي 90 لـ 127 دقيقة، بسرعة حوالي 7.5 كم/ث. ممتاز لتصوير الأرض ومحطة الفضاء والكيوبسات ومجموعات الإنترنت زي ستارلينك (حوالي 550 كم). الارتفاع المنخفض معناه تأخير إشارة قليل، بس كل قمر بيشوف مساحة صغيرة فمحتاج أقمار كتير. الهوا الرفيع في أسفل الـLEO بيسحب الأقمار لتحت ببطء.",cap:"أغلب الأقمار هنا."}},
{en:{title:"MEO — Medium Earth Orbit",tag:"2,000 to 35,000 km",body:"Home of navigation. GPS flies at about 20,200 km with a period near 11 h 58 min (half a sidereal day), Galileo at about 23,200 km, GLONASS at about 19,100 km. At this height a satellite covers a big part of Earth, so about 24 satellites give worldwide coverage, with at least 4 visible almost anywhere.",cap:"Higher orbit means fewer satellites for global coverage."},
 ar:{title:"MEO — مدار أرضي متوسط",tag:"من 2,000 لـ 35,000 كم",body:"بيت أنظمة الملاحة. الـGPS بيطير على ارتفاع حوالي 20,200 كم وزمن دورة حوالي 11 ساعة و58 دقيقة (نص يوم نجمي)، وGalileo على حوالي 23,200 كم، وGLONASS على حوالي 19,100 كم. على الارتفاع ده القمر بيغطي جزء كبير من الأرض، فحوالي 24 قمر بيغطوا العالم، وعلى الأقل 4 ظاهرين تقريبًا في أي مكان.",cap:"مدار أعلى يعني أقمار أقل للتغطية العالمية."}},
{en:{title:"GEO — Geostationary Orbit",tag:"35,786 km, over the equator",body:"At exactly 35,786 km above the equator a satellite takes one sidereal day (23 h 56 min) per lap, the same as Earth's spin, so it hangs over one spot. A fixed dish can talk to it forever. Used for TV, weather satellites and communications. The price is a signal delay of about a quarter second for a round trip and poor coverage near the poles.",cap:"Radius from Earth's centre is about 42,164 km."},
 ar:{title:"GEO — مدار ثابت بالنسبة للأرض",tag:"35,786 كم فوق خط الاستواء",body:"على ارتفاع 35,786 كم بالظبط فوق خط الاستواء القمر بياخد يوم نجمي (23 ساعة و56 دقيقة) للفة، زي دوران الأرض، فبيفضل فوق نقطة واحدة. طبق ثابت يكلمه على طول. بيتستخدم في التلفزيون والطقس والاتصالات. التمن: تأخير إشارة حوالي ربع ثانية رايح جاي، وتغطية ضعيفة قرب القطبين.",cap:"نصف القطر من مركز الأرض حوالي 42,164 كم."}},
{en:{title:"SSO — Sun-synchronous orbit",tag:"about 600 to 800 km, inclination near 98°",body:"A slightly retrograde, nearly polar LEO. Earth's bulge makes the orbit plane turn about one degree per day, matching the Sun, so the satellite passes over each place at the same local solar time. Perfect for imaging, because shadows and light stay consistent from one picture to the next.",cap:"Used by many Earth observation satellites."},
 ar:{title:"SSO — مدار متزامن مع الشمس",tag:"حوالي 600 لـ 800 كم، ميل قرب 98 درجة",body:"مدار LEO شبه قطبي ورجعي شوية. انتفاخ الأرض بيخلي مستوى المدار يلف حوالي درجة في اليوم، زي الشمس، فالقمر بيعدي فوق كل مكان في نفس الساعة الشمسية المحلية. مثالي للتصوير لأن الضل والإضاءة بيفضلوا ثابتين من صورة للتانية.",cap:"بتستخدمه أقمار رصد الأرض الكتير."}},
{en:{title:"HEO — Molniya and other elliptical orbits",tag:"12 h period, inclination 63.4°",body:"A very stretched ellipse: low perigee, very high apogee. The satellite crawls near apogee (Kepler's second law), so it hangs over high latitudes for hours. Russia used Molniya orbits because GEO covers its far north poorly. 63.4° is the special inclination where the ellipse does not rotate.",cap:"Try the Molniya preset in the simulator."},
 ar:{title:"HEO — مولنيا والمدارات الإهليلجية",tag:"زمن دورة 12 ساعة، ميل 63.4 درجة",body:"قطع ناقص مستطيل جدًا: حضيض منخفض وأوج عالي جدًا. القمر بيزحف قرب الأوج (قانون كبلر التاني) فبيفضل فوق خطوط العرض العالية لساعات. روسيا استخدمت مدارات مولنيا لأن الـGEO بيغطي أقصى شمالها ضعيف. 63.4 درجة هو الميل الخاص اللي المدار عنده ما بيلفش.",cap:"جرّب إعداد Molniya في المحاكي."}}];

const CONCEPTS=[
{en:{title:"What is an orbit?",tag:"falling around the Earth",body:"An orbit is falling that keeps missing the ground. A satellite moves sideways so fast (about 7.7 km/s in LEO) that as it falls, the Earth's surface curves away beneath it. Gravity never switches off up there; the astronauts float because they and the station are in free fall together.",cap:"One sentence for the interview: an orbit is a balance between sideways speed and gravity."},
 ar:{title:"يعني إيه مدار؟",tag:"سقوط حوالين الأرض",body:"المدار هو سقوط بيفضل يغلط الأرض. القمر بيتحرك جنب بسرعة كبيرة (حوالي 7.7 كم/ث في LEO) فكل ما يقع سطح الأرض بيتحني من تحته. الجاذبية ما بتقفلش هناك؛ رواد الفضاء بيعوموا لأنهم والمحطة في سقوط حر مع بعض.",cap:"جملة للمقابلة: المدار توازن بين السرعة الجانبية والجاذبية."}},
{en:{title:"Kepler's three laws",tag:"the rules of motion",body:"1) Orbits are ellipses with the Earth at one focus. 2) A line from Earth to the satellite sweeps equal areas in equal times, so the satellite is fastest at perigee and slowest at apogee. 3) The period squared is proportional to the semi-major axis cubed: T = 2π √(a³ / μ), with μ = 398,600 km³/s² for Earth. The speed at distance r is v = √(μ (2/r − 1/a)), called the vis-viva equation.",cap:"The simulator above uses exactly these formulas."},
 ar:{title:"قوانين كبلر التلاتة",tag:"قواعد الحركة",body:"1) المدارات قطع ناقص والأرض في إحدى البؤرتين. 2) الخط من الأرض للقمر بيمسح مساحات متساوية في أزمنة متساوية، فالقمر أسرع ما يكون عند الحضيض وأبطأ عند الأوج. 3) مربع زمن الدورة يتناسب مع مكعب نصف المحور الأكبر: T = 2π √(a³ / μ)، وμ = 398,600 كم³/ث² للأرض. السرعة عند بعد r هي v = √(μ (2/r − 1/a))، واسمها معادلة vis-viva.",cap:"المحاكي فوق بيستخدم المعادلات دي بالظبط."}},
{en:{title:"Anatomy of a satellite",tag:"subsystems",body:"Payload (camera, radio, navigation signal generator) is the reason for the mission. The bus keeps it alive: power (solar panels + battery), on-board computer (OBC), communications (antennas, radio), attitude control (ADCS) to point correctly, thermal control (hot in sun, freezing in shadow), structure, and sometimes propulsion. A CubeSat is a standard small satellite built from 10 cm cubes called units (1U, 3U, 6U).",cap:"Every subsystem trades mass, power and cost."},
 ar:{title:"تشريح القمر الصناعي",tag:"الأنظمة الفرعية",body:"الحمولة (كاميرا، راديو، مولّد إشارة ملاحة) هي سبب المهمة. والـbus هو اللي بيبقيها شغالة: الطاقة (ألواح شمسية وبطارية)، الكمبيوتر على المتن (OBC)، الاتصالات (هوائيات وراديو)، التحكم في الاتجاه (ADCS) عشان يوجّه صح، التحكم الحراري (سخن في الشمس وتلج في الضل)، الهيكل، وأحيانًا الدفع. الكيوبسات قمر صغير قياسي مبني من مكعبات 10 سم اسمها وحدات (1U و3U و6U).",cap:"كل نظام فرعي بيوازن بين الوزن والطاقة والتكلفة."}},
{en:{title:"Attitude control (ADCS)",tag:"pointing the satellite",body:"Attitude means which way the satellite faces. Sensors: sun sensors, magnetometers, gyroscopes and star trackers (the most accurate, they recognise star patterns). Actuators: reaction wheels (spin up a wheel and the satellite turns the other way), magnetorquers (coils that push against Earth's magnetic field) and thrusters. A Kalman filter blends all the noisy sensors into one best estimate.",cap:"Same ideas as robot localisation and balance."},
 ar:{title:"التحكم في الاتجاه (ADCS)",tag:"توجيه القمر",body:"الاتجاه معناه القمر وشّه ناحية فين. الحساسات: حساسات الشمس والمغناطيسية والجيروسكوب ومتتبعات النجوم (الأدق، بتتعرف على أنماط النجوم). المنفّذات: عجلات رد الفعل (تدوّر عجلة فالقمر يلف عكسها)، ومغناطيسات التحكم (ملفات بتدفع ضد مجال الأرض المغناطيسي) والدافعات. فلتر كالمان بيدمج الحساسات الكتير المليانة تشويش في تقدير واحد أحسن.",cap:"نفس أفكار تحديد موقع الروبوت واتزانه."}},
{en:{title:"Hohmann transfer and delta-v",tag:"changing orbits",body:"To move to a higher orbit you do two burns: one at the low point to stretch the orbit into an ellipse, one at the high point to circle it. The total velocity change is called delta-v. Going from low Earth orbit to GEO costs about 3.9 km/s. The rocket equation, Δv = ve · ln(m0 / mf), shows why fuel dominates the mass of a rocket.",cap:"Burning forward raises the opposite side of the orbit."},
 ar:{title:"انتقال هومان والـdelta-v",tag:"تغيير المدار",body:"عشان تنتقل لمدار أعلى بتعمل حرقتين: واحدة عند أقل نقطة تمدّ المدار لقطع ناقص، وواحدة عند أعلى نقطة تخلّيه دايري. إجمالي تغيير السرعة اسمه delta-v. الانتقال من مدار أرضي منخفض لـGEO بيكلّف حوالي 3.9 كم/ث. معادلة الصاروخ Δv = ve · ln(m0 / mf) بتوضح ليه الوقود هو أغلب وزن الصاروخ.",cap:"الحرق للأمام بيرفع الناحية المقابلة من المدار."}},
{en:{title:"Ground stations and Doppler",tag:"talking to a satellite",body:"A LEO satellite is above your horizon for only about 5 to 15 minutes per pass, so ground stations plan contact windows. Because the satellite moves fast, the radio frequency shifts (Doppler effect): higher while approaching, lower while leaving, by tens of kilohertz at UHF. Receivers track and correct it. Frequencies and power are limited by a link budget: transmit power + antenna gains − distance loss − noise.",cap:"Python + SDR radios are a popular way to receive CubeSats."},
 ar:{title:"محطات الأرض والدوبلر",tag:"الكلام مع قمر",body:"قمر LEO بيبقى فوق أفقك حوالي 5 لـ 15 دقيقة بس في كل عبور، فمحطات الأرض بتخطط لنوافذ الاتصال. ولأن القمر سريع، تردد الراديو بيتغير (تأثير دوبلر): أعلى وهو بيقرّب وأقل وهو بيبعد، بعشرات الكيلوهرتز في UHF. المستقبِلات بتتتبعه وتصحّحه. والترددات والقدرة بيحددها ميزانية الوصلة: قدرة الإرسال + كسب الهوائيات − فقد المسافة − الضوضاء.",cap:"بايثون مع راديوهات SDR طريقة مشهورة لاستقبال الكيوبسات."}},
{en:{title:"GNSS constellations and accuracy",tag:"GPS, Galileo, GLONASS, BeiDou",body:"GNSS is the family name: GPS (USA), GLONASS (Russia), Galileo (EU), BeiDou (China), plus regional systems such as NavIC (India) and QZSS (Japan). A phone gets 3 to 5 m in open sky. Error sources: ionosphere delay, troposphere delay, multipath (signal bouncing off buildings), satellite clock and orbit errors, and poor geometry (DOP). Fixes: dual-frequency receivers, SBAS, DGPS and RTK (centimetre level using a nearby base station).",cap:"Multi-constellation receivers see more satellites, so they are more reliable."},
 ar:{title:"كوكبات GNSS والدقة",tag:"GPS وGalileo وGLONASS وBeiDou",body:"GNSS اسم العيلة: GPS (أمريكا) وGLONASS (روسيا) وGalileo (أوروبا) وBeiDou (الصين)، وأنظمة إقليمية زي NavIC (الهند) وQZSS (اليابان). التليفون بياخد 3 لـ 5 متر في السما المفتوحة. مصادر الخطأ: تأخير الأيونوسفير والتروبوسفير، والانعكاس (الإشارة بترتد من المباني)، وأخطاء ساعة ومدار القمر، وسوء الهندسة (DOP). الحلول: مستقبِلات بترددين، SBAS وDGPS وRTK (دقة سنتيمترات بمحطة قاعدة قريبة).",cap:"المستقبِلات متعددة الأنظمة بتشوف أقمار أكتر فبتبقى أوثق."}},
{en:{title:"Relativity inside your phone",tag:"why GPS clocks are adjusted",body:"GPS satellite clocks run fast by about 45 microseconds per day because gravity is weaker up there (general relativity) and slow by about 7 because of their speed (special relativity). Net: about +38 µs per day. Uncorrected, that would add roughly 11 km of position error every day, so the clocks are deliberately tuned before launch.",cap:"A great example of theory solving an engineering problem."},
 ar:{title:"النسبية جوه تليفونك",tag:"ليه ساعات GPS بتتظبط",body:"ساعات أقمار GPS بتجري أسرع بحوالي 45 ميكروثانية في اليوم لأن الجاذبية أضعف هناك (النسبية العامة) وبتتأخر حوالي 7 بسبب سرعتها (النسبية الخاصة). الصافي حوالي +38 ميكروثانية في اليوم. من غير تصحيح ده يضيف حوالي 11 كم خطأ في الموقع كل يوم، فالساعات بتتظبط عمدًا قبل الإطلاق.",cap:"مثال رائع على نظرية بتحل مشكلة هندسية."}},
{en:{title:"Navigation for robots and spacecraft",tag:"dead reckoning, Kalman, SLAM",body:"No single sensor is enough. Inertial sensors (IMU) are fast but drift; GNSS is absolute but slow and can be blocked; cameras and lidar see the surroundings. A Kalman filter fuses them. On Mars or the Moon there is no GNSS, so rovers use visual odometry, star trackers, and SLAM (building a map while locating yourself). This is the bridge between your robotics teaching and space navigation.",cap:"Same maths on a Raspberry Pi robot and on a rover."},
 ar:{title:"الملاحة للروبوتات والمركبات الفضائية",tag:"Dead reckoning وكالمان وSLAM",body:"مفيش حساس واحد كفاية. حساسات القصور (IMU) سريعة بس بتنحرف مع الوقت؛ الـGNSS مطلق بس بطيء وممكن يتحجب؛ والكاميرات والليدار بيشوفوا المحيط. فلتر كالمان بيدمجهم. على المريخ أو القمر مفيش GNSS، فالمركبات بتستخدم الـvisual odometry ومتتبعات النجوم والـSLAM (بناء خريطة وتحديد مكانك فيها في نفس الوقت). ده الجسر بين تدريسك للروبوتكس وملاحة الفضاء.",cap:"نفس الرياضيات على روبوت راسبيري باي وعلى مركبة."}},
{en:{title:"Space debris and safety",tag:"Kessler syndrome",body:"Thousands of dead satellites and fragments circle Earth at 7 to 8 km/s, so even a small piece hits with huge energy. Operators track objects, plan collision-avoidance manoeuvres, and must de-orbit satellites at end of life (many guidelines ask for within 25 years, newer rules are stricter). Kessler syndrome is the fear of a chain reaction of collisions that makes an orbit unusable.",cap:"Space sustainability is a hot topic for every operator."},
 ar:{title:"حطام الفضاء والأمان",tag:"متلازمة كيسلر",body:"آلاف الأقمار الميتة والشظايا بتلف حوالين الأرض بسرعة 7 لـ 8 كم/ث، فحتى قطعة صغيرة بتخبط بطاقة ضخمة. المشغّلون بيتتبعوا الأجسام ويخططوا مناورات تجنب التصادم ولازم ينزّلوا الأقمار من المدار في نهاية العمر (إرشادات كتير بتطلب خلال 25 سنة، والقواعد الأحدث أشد). متلازمة كيسلر هي الخوف من تفاعل متسلسل من التصادمات يخلّي المدار غير صالح.",cap:"استدامة الفضاء موضوع ساخن لكل مشغّل."}},
{en:{title:"The UAE in space",tag:"background for the interview",body:"The UAE Space Agency was founded in 2014. The Mohammed Bin Rashid Space Centre (MBRSC) in Dubai built satellites such as Nayif-1 (2017, a CubeSat) and KhalifaSat (2018), and the Emirates Mars Mission Hope probe, which entered Mars orbit in February 2021. Before any interview, read the company's own website and latest news: this card is general background, not facts about them.",cap:"Check the company's current missions yourself."},
 ar:{title:"الإمارات في الفضاء",tag:"خلفية للمقابلة",body:"وكالة الإمارات للفضاء اتأسست سنة 2014. مركز محمد بن راشد للفضاء (MBRSC) في دبي بنى أقمار زي نايف-1 (2017، كيوبسات) وخليفة سات (2018)، ومسبار الأمل في مهمة الإمارات للمريخ، اللي دخل مدار المريخ في فبراير 2021. قبل أي مقابلة، اقرا موقع الشركة وآخر أخبارها: الكارت ده خلفية عامة مش معلومات عنهم.",cap:"راجع مهام الشركة الحالية بنفسك."}}];

const INTERVIEW=[
{en:{title:"Tell me about yourself (30 seconds)",tag:"present, past, future",body:"Present: who you are now (robotics and AI trainer, what you teach). Past: one or two real projects or results that prove it. Future: why this role connects them (space navigation, AI, robots). End with a question back to them. Practise it aloud until it fits 30 seconds.",cap:"Use your real details. Do not memorise word for word."},
 ar:{title:"عرّفنا بنفسك (30 ثانية)",tag:"الحاضر والماضي والمستقبل",body:"الحاضر: إنت مين دلوقتي (مدرب روبوتكس وذكاء اصطناعي، بتدرّس إيه). الماضي: مشروع أو اتنين حقيقيين أو نتيجة تثبت ده. المستقبل: ليه الوظيفة دي بتربطهم (ملاحة فضاء، ذكاء اصطناعي، روبوتات). اختم بسؤال ليهم. اتمرّن بصوت عالي لحد ما تساع 30 ثانية.",cap:"استخدم تفاصيلك الحقيقية. ما تحفظش كلمة كلمة."}},
{en:{title:"Explain GPS to a non-engineer",tag:"30-second version",body:"Satellites broadcast the time very precisely. Your phone measures how long each signal took to arrive, and since signals travel at the speed of light that gives the distance to each satellite. With distances to four satellites, it solves for where you are and fixes its own clock error. Like finding your spot on a map from several friends telling you how far you are from each of them.",cap:"Mention: 4 satellites = x, y, z and time."},
 ar:{title:"اشرح الـGPS لغير مهندس",tag:"نسخة 30 ثانية",body:"الأقمار بتبث الوقت بدقة عالية. تليفونك بيقيس الإشارة أخدت وقت قد إيه توصل، ولأن الإشارة بتسافر بسرعة الضوء ده بيدّي المسافة لكل قمر. ومع المسافات لأربع أقمار بيحسب مكانك ويصلّح خطأ ساعته. زي إنك تعرف مكانك على خريطة من كذا صاحب كل واحد بيقولك إنت بعيد عنه قد إيه.",cap:"اذكر: 4 أقمار = x وy وz والوقت."}},
{en:{title:"Why do you want to work in space?",tag:"motivation",body:"Structure: a spark (a moment or project that pulled you in), what you bring (teaching, robotics, AI, clear communication), and what you want to learn there. Keep it honest and specific. Connect it to the UAE's space direction if that is true for you.",cap:"Specific beats impressive."},
 ar:{title:"ليه عايز تشتغل في الفضاء؟",tag:"الدافع",body:"الهيكل: شرارة (لحظة أو مشروع شدّك)، وإيه اللي بتقدمه (تدريس، روبوتكس، ذكاء اصطناعي، تواصل واضح)، وعايز تتعلم إيه عندهم. خليها صادقة ومحددة. اربطها باتجاه الإمارات في الفضاء لو ده حقيقي بالنسبة لك.",cap:"المحدد أحسن من المبهر."}},
{en:{title:"How does your teaching experience help?",tag:"transferable skills",body:"Teaching means breaking hard ideas into steps, debugging with beginners, and communicating with non-experts, which every engineering team needs. Add the technical side: Arduino and Raspberry Pi projects, Python, sensors, and the habit of testing in small steps. Give one concrete example of a student problem you solved.",cap:"Tell a short story with a result."},
 ar:{title:"تدريسك بيفيد إزاي؟",tag:"مهارات قابلة للنقل",body:"التدريس معناه تقسيم الأفكار الصعبة لخطوات، وتصحيح أخطاء مع مبتدئين، والتواصل مع غير المتخصصين، وده كل فريق هندسي محتاجه. زوّد الجانب التقني: مشاريع أردوينو وراسبيري باي وبايثون والحساسات وعادة الاختبار على خطوات صغيرة. اديهم مثال واحد محدد لمشكلة طالب حليتها.",cap:"احكي قصة قصيرة ليها نتيجة."}},
{en:{title:"How could AI help a space company?",tag:"ideas that are real",body:"Anomaly detection on satellite telemetry (spot a failing battery early), image analysis for Earth observation (clouds, land use, ships), autonomous operations and scheduling, collision-risk prediction, and smarter navigation filters. Mention that models need good data, testing, and a human in the loop for safety-critical decisions.",cap:"See the AI in Python area for a small anomaly detector."},
 ar:{title:"الذكاء الاصطناعي يفيد شركة فضاء إزاي؟",tag:"أفكار حقيقية",body:"اكتشاف الشذوذ في تليمترية الأقمار (تلاقي بطارية بتفشل بدري)، تحليل صور رصد الأرض (سحاب واستخدام أراضي وسفن)، العمليات والجدولة الذاتية، توقع خطر التصادم، وفلاتر ملاحة أذكى. اذكر إن النماذج محتاجة بيانات كويسة واختبار وإنسان في الحلقة في القرارات الحساسة للسلامة.",cap:"شوف قسم الذكاء الاصطناعي لكاشف شذوذ صغير."}},
{en:{title:"Questions to ask them",tag:"always have two",body:"What does a typical week look like for this role? Which missions or products will I support in the first six months? How do you train new engineers? What are the biggest technical challenges your team faces right now? Good questions show you thought about the work, not just the job title.",cap:"Never end with no questions."},
 ar:{title:"أسئلة تسألها ليهم",tag:"دايمًا جهّز اتنين",body:"شكل الأسبوع العادي في الوظيفة دي عامل إزاي؟ أنهي مهام أو منتجات هدعمها في أول ستة شهور؟ بتدرّبوا المهندسين الجداد إزاي؟ إيه أكبر التحديات التقنية قدام فريقكم دلوقتي؟ الأسئلة الكويسة بتبين إنك فكرت في الشغل مش في اسم الوظيفة بس.",cap:"ما تنهيش من غير أسئلة."}}];

const SP_PRESETS={ISS:[410,420],Star:[550,550],GPS:[20180,20180],GEO:[35786,35786],Mol:[500,39700]};
const orb={rp:420,ra:420,M:0,tsim:0,last:0};
let orbCtx,gCtx,gRecv={x:330,y:250},gClockErr=0,gMode=3;
const OW=640,OH=440,GW=640,GH=360;

function orbitClass(rpAlt,raAlt){
  const rp=RE+rpAlt,ra=RE+raAlt,a=(rp+ra)/2,e=(ra-rp)/(ra+rp);
  if(e<0.02&&Math.abs(a-42164)<400)return "cGEO";
  if(e>0.35)return "cHEO";
  if(raAlt<=2000)return "cLEO";
  if(raAlt<=35000)return "cMEO";
  return "cOther";
}
function kepler(M,e){let E=M;for(let i=0;i<12;i++)E-= (E-e*Math.sin(E)-M)/(1-e*Math.cos(E));return E}
const pxR=r=>55+125*Math.min(1.45,Math.max(0,(r-RE)/35786)**0.4);

function buildSpace(){
  const root=document.getElementById("spaceRoot");
  root.innerHTML=`
  <section class="panel" id="orbits">
    <h2 data-i18n="orbTitle"></h2><p class="hint" data-i18n="orbHint"></p>
    <div class="presets" id="orbPresets"></div>
    <div class="sim"><canvas id="orbCanvas" aria-label="orbit simulator"></canvas></div>
    <div class="sliders">
      <label><span><b data-i18n="perigee"></b> <output id="rpOut"></output></span><input type="range" id="rpIn" min="160" max="40000" step="10" value="420"></label>
      <label><span><b data-i18n="apogee"></b> <output id="raOut"></output></span><input type="range" id="raIn" min="160" max="50000" step="10" value="420"></label>
    </div>
    <div class="readouts" id="orbRead"></div>
    <p class="note" data-i18n="warp"></p>
  </section>
  <section class="panel"><h2 data-i18n="typesTitle"></h2><div class="lessons" id="orbTypes"></div></section>
  <section class="panel" id="gnss">
    <h2 data-i18n="gnssTitle"></h2><p class="hint" data-i18n="gnssHint"></p>
    <div class="presets" id="gMode"></div>
    <div class="sim"><canvas id="gCanvas" aria-label="GNSS trilateration demo"></canvas></div>
    <div class="sliders"><label><span><b data-i18n="gClock"></b> <output id="gcOut"></output></span><input type="range" id="gcIn" min="-60" max="60" step="1" value="0"></label></div>
    <div class="readouts" id="gRead"></div>
    <p class="note" data-i18n="gNote"></p>
  </section>
  <section class="panel"><h2 data-i18n="conceptsTitle"></h2><div class="lessons" id="spConcepts"></div></section>
  <section class="panel"><h2 data-i18n="interviewTitle"></h2><p class="hint" data-i18n="interviewHint"></p><div class="lessons" id="spInterview"></div></section>`;
  orbCtx=fitCanvas(document.getElementById("orbCanvas"),OW,OH);
  gCtx=fitCanvas(document.getElementById("gCanvas"),GW,GH);
  const rpIn=document.getElementById("rpIn"),raIn=document.getElementById("raIn");
  rpIn.addEventListener("input",()=>{orb.rp=+rpIn.value;if(orb.ra<orb.rp){orb.ra=orb.rp;raIn.value=orb.ra}orbReadout()});
  raIn.addEventListener("input",()=>{orb.ra=+raIn.value;if(orb.rp>orb.ra){orb.rp=orb.ra;rpIn.value=orb.rp}orbReadout()});
  document.getElementById("gcIn").addEventListener("input",e=>{gClockErr=+e.target.value;gDraw()});
  const gc=document.getElementById("gCanvas");
  const mv=e=>{const p=canvasPt(gc,e,GW,GH);gRecv={x:Math.max(20,Math.min(GW-20,p.x)),y:Math.max(150,Math.min(GH-20,p.y))};gDraw()};
  gc.addEventListener("click",mv);
  gc.addEventListener("pointermove",e=>{if(e.pointerType==="mouse"&&e.buttons===1)mv(e)});
}
function renderSpace(){
  if(!document.getElementById("orbPresets"))return;
  const pr=[["ISS","pISS"],["Star","pStar"],["GPS","pGPS"],["GEO","pGEO"],["Mol","pMol"]];
  document.getElementById("orbPresets").innerHTML=pr.map(([k,s])=>`<button type="button" data-p="${k}">${t(s)}</button>`).join("");
  document.querySelectorAll("#orbPresets button").forEach(b=>b.addEventListener("click",()=>{
    const p=SP_PRESETS[b.dataset.p];orb.rp=p[0];orb.ra=p[1];document.getElementById("rpIn").value=p[0];document.getElementById("raIn").value=p[1];orb.tsim=0;orbReadout()}));
  document.getElementById("gMode").innerHTML=`<button type="button" data-m="2" class="${gMode===2?"on":""}">${t("gMode2")}</button><button type="button" data-m="3" class="${gMode===3?"on":""}">${t("gMode3")}</button>`;
  document.querySelectorAll("#gMode button").forEach(b=>b.addEventListener("click",()=>{gMode=+b.dataset.m;renderSpace();gDraw()}));
  mountAcc(document.getElementById("orbTypes"),ORBTYPES,-1);
  mountAcc(document.getElementById("spConcepts"),CONCEPTS,-1);
  mountAcc(document.getElementById("spInterview"),INTERVIEW,-1);
  orbReadout();gDraw();
}
function orbElems(){const rp=RE+orb.rp,ra=RE+orb.ra,a=(rp+ra)/2,e=(ra-rp)/(ra+rp),T=2*Math.PI*Math.sqrt(a**3/MU);return{rp,ra,a,e,T}}
function orbReadout(){
  const {a,e,T}=orbElems();
  document.getElementById("rpOut").textContent=orb.rp.toLocaleString("en")+" "+t("alt");
  document.getElementById("raOut").textContent=orb.ra.toLocaleString("en")+" "+t("alt");
  orbDrawFrame.v=null;
}
const orbDrawFrame={v:null};
function orbTick(ts){
  requestAnimationFrame(orbTick);
  if(!orbCtx||curArea!=="space")return;
  const dt=Math.min(0.05,(ts-(orb.last||ts))/1000);orb.last=ts;
  const {rp,ra,a,e,T}=orbElems();
  const vis=Math.min(24,6*Math.pow(T/5400,0.35));
  orb.tsim+=dt*T/vis;
  const M=(2*Math.PI*orb.tsim/T)%(2*Math.PI),E=kepler(M,e),r=a*(1-e*Math.cos(E));
  const nu=2*Math.atan2(Math.sqrt(1+e)*Math.sin(E/2),Math.sqrt(1-e)*Math.cos(E/2));
  const v=Math.sqrt(MU*(2/r-1/a));
  const c=orbCtx,cx=OW/2,cy=OH/2;
  c.clearRect(0,0,OW,OH);
  c.fillStyle="#071026";c.fillRect(0,0,OW,OH);
  // reference rings GEO
  c.strokeStyle="#ffffff14";c.setLineDash([4,6]);c.beginPath();c.arc(cx,cy,pxR(42164),0,7);c.stroke();c.setLineDash([]);
  // orbit path
  c.strokeStyle="#56e4ff88";c.lineWidth=1.6;c.beginPath();
  for(let i=0;i<=180;i++){const th=i/180*2*Math.PI,rr=a*(1-e*e)/(1+e*Math.cos(th)),p=pxR(rr);const x=cx+p*Math.cos(th),y=cy-p*Math.sin(th);i?c.lineTo(x,y):c.moveTo(x,y)}c.stroke();
  // earth
  const g=c.createRadialGradient(cx-14,cy-14,6,cx,cy,55);g.addColorStop(0,"#4aa8ff");g.addColorStop(1,"#0b3b8c");
  c.fillStyle=g;c.beginPath();c.arc(cx,cy,55,0,7);c.fill();
  // rotating flag marker (sidereal day)
  const ang=2*Math.PI*orb.tsim/86164;
  const fx=cx+55*Math.cos(ang),fy=cy-55*Math.sin(ang);
  c.strokeStyle="#ffd479";c.lineWidth=2;c.beginPath();c.moveTo(fx,fy);c.lineTo(cx+66*Math.cos(ang),cy-66*Math.sin(ang));c.stroke();
  c.fillStyle="#ffd479";c.beginPath();c.arc(cx+66*Math.cos(ang),cy-66*Math.sin(ang),3.5,0,7);c.fill();
  // satellite
  const p=pxR(r),sx=cx+p*Math.cos(nu),sy=cy-p*Math.sin(nu);
  c.fillStyle="#5ef0b8";c.shadowColor="#5ef0b8";c.shadowBlur=12;c.beginPath();c.arc(sx,sy,6,0,7);c.fill();c.shadowBlur=0;
  c.strokeStyle="#5ef0b866";c.lineWidth=1;c.beginPath();c.moveTo(sx,sy);c.lineTo(cx,cy);c.stroke();
  document.getElementById("orbRead").innerHTML=
   `<div><i>${t("rPeriod")}</i><b>${hm(T/60)}</b></div><div><i>${t("rSpeed")}</i><b>${v.toFixed(2)} km/s</b></div><div><i>${t("rEcc")}</i><b>${e.toFixed(3)}</b></div><div><i>${t("rClass")}</i><b>${t(orbitClass(orb.rp,orb.ra))}</b></div>`;
}
/* ---- GNSS toy ---- */
const GSATS=[{x:110,y:48},{x:320,y:30},{x:530,y:60}];
function gSolve(rho,n,withB){
  let x=GW/2,y=200,b=0;
  for(let it=0;it<40;it++){
    let A=[],r=[];
    for(let i=0;i<n;i++){const dx=x-GSATS[i].x,dy=y-GSATS[i].y,d=Math.hypot(dx,dy)||1;A.push(withB?[dx/d,dy/d,1]:[dx/d,dy/d]);r.push(rho[i]-(d+(withB?b:0)))}
    const k=A[0].length;let N=Array.from({length:k},()=>Array(k).fill(0)),u=Array(k).fill(0);
    for(let i=0;i<n;i++)for(let p=0;p<k;p++){u[p]+=A[i][p]*r[i];for(let q=0;q<k;q++)N[p][q]+=A[i][p]*A[i][q]}
    for(let p=0;p<k;p++)N[p][p]+=1e-6;
    const s=solveLin(N,u);x+=s[0];y+=s[1];if(withB)b+=s[2];
    if(Math.hypot(...s)<1e-6)break;
  }
  return {x,y,b};
}
function solveLin(N,u){const k=u.length,M=N.map((r,i)=>[...r,u[i]]);
  for(let i=0;i<k;i++){let m=i;for(let j=i+1;j<k;j++)if(Math.abs(M[j][i])>Math.abs(M[m][i]))m=j;[M[i],M[m]]=[M[m],M[i]];
    for(let j=i+1;j<k;j++){const f=M[j][i]/M[i][i];for(let q=i;q<=k;q++)M[j][q]-=f*M[i][q]}}
  const x=Array(k).fill(0);for(let i=k-1;i>=0;i--){let s=M[i][k];for(let j=i+1;j<k;j++)s-=M[i][j]*x[j];x[i]=s/M[i][i]}return x}
function gDraw(){
  if(!gCtx)return;
  const c=gCtx;document.getElementById("gcOut").textContent=(gClockErr>0?"+":"")+gClockErr;
  c.clearRect(0,0,GW,GH);c.fillStyle="#071026";c.fillRect(0,0,GW,GH);
  c.fillStyle="#0b3b8c33";c.fillRect(0,GH-12,GW,12);
  const rho=GSATS.map(s=>Math.hypot(gRecv.x-s.x,gRecv.y-s.y)+gClockErr);
  const cols=["#56e4ff","#ac8bff","#5ef0b8"];
  const used=gMode===2?2:3;
  GSATS.forEach((s,i)=>{
    c.strokeStyle=cols[i]+(i<used?"cc":"33");c.lineWidth=1.5;c.beginPath();c.arc(s.x,s.y,Math.max(1,rho[i]),0,7);c.stroke();
    c.fillStyle=cols[i];c.fillRect(s.x-7,s.y-7,14,14);c.fillStyle="#050b1b";c.font="700 11px sans-serif";c.textAlign="center";c.fillText(i+1,s.x,s.y+4);
  });
  const est=gMode===2?gSolve(rho,2,false):gSolve(rho,3,true);
  const err=Math.hypot(est.x-gRecv.x,est.y-gRecv.y);
  // true receiver
  c.fillStyle="#ffd479";c.beginPath();c.arc(gRecv.x,gRecv.y,7,0,7);c.fill();
  c.strokeStyle="#ff6b8a";c.lineWidth=2;c.beginPath();c.moveTo(est.x-7,est.y-7);c.lineTo(est.x+7,est.y+7);c.moveTo(est.x+7,est.y-7);c.lineTo(est.x-7,est.y+7);c.stroke();
  if(err>1.5){c.setLineDash([3,4]);c.beginPath();c.moveTo(gRecv.x,gRecv.y);c.lineTo(est.x,est.y);c.stroke();c.setLineDash([])}
  document.getElementById("gRead").innerHTML=`<div><i>${t("gErr")}</i><b dir="ltr">${err<1.5?t("gErr0"):err.toFixed(0)+" px"}</b></div>`;
}
buildSpace();
EXT_RENDER.push(renderSpace);
requestAnimationFrame(orbTick);
window.addEventListener("areachange",()=>{if(curArea==="space"){orb.last=0;gDraw()}});

/* ---- NOVA offline knowledge: space ---- */
KB.push(
{keys:["what is an orbit","what is orbit","orbit means","مدار","ما هو المدار","يعني ايه مدار","ايه هو المدار"],boost:1,
 en:"An orbit is falling that keeps missing the ground. A satellite moves sideways so fast, about 7.7 km/s in low Earth orbit, that as gravity pulls it down the Earth's surface curves away beneath it. So it never lands. Open the Orbit simulator in the Orbits & Space tab and change the heights to see it.",
 ar:"المدار هو سقوط بيفضل يغلط الأرض. القمر بيتحرك جنب بسرعة كبيرة، حوالي 7.7 كم/ث في المدار المنخفض، فكل ما الجاذبية تشده لتحت سطح الأرض بيتحني من تحته، فما بيقعش أبدًا. افتح محاكي المدار في تبويب المدارات والفضاء وغيّر الارتفاعات وشوف."},
{keys:["orbital speed","orbital velocity","how fast do satellites","orbital period","speed of satellite","سرعة القمر","سرعة الاقمار","زمن الدورة","السرعة المدارية"],boost:2,
 en:"Circular orbit speed is v = √(μ / r), with μ = 398,600 km³/s² and r measured from Earth's centre. At 420 km (the ISS) that is about 7.66 km/s and one lap takes about 93 minutes. Farther out the speed drops and the period grows: T = 2π √(a³ / μ). GEO takes 23 h 56 min.",
 ar:"سرعة المدار الدايري v = √(μ / r)، وμ = 398,600 كم³/ث² وr من مركز الأرض. على 420 كم (محطة الفضاء) السرعة حوالي 7.66 كم/ث واللفة حوالي 93 دقيقة. كل ما تبعد السرعة تقل والزمن يزيد: T = 2π √(a³ / μ). الـGEO بياخد 23 ساعة و56 دقيقة."},
{keys:["kepler","كبلر","كيبلر","قوانين كبلر"],boost:3,
 en:"Kepler's laws: 1) orbits are ellipses with Earth at one focus. 2) A satellite sweeps equal areas in equal times, so it is faster near Earth and slower far away. 3) T² is proportional to a³, so higher orbits take longer. They are all in the simulator.",
 ar:"قوانين كبلر: 1) المدارات قطع ناقص والأرض في بؤرة. 2) القمر بيمسح مساحات متساوية في أزمنة متساوية، فأسرع قريب من الأرض وأبطأ بعيد. 3) T² يتناسب مع a³، فالمدارات الأعلى أطول زمن. وكلهم في المحاكي."},
{keys:["low earth orbit","leo orbit","what is leo","ما هو leo","مدار منخفض","المدار الارضي المنخفض","ليو"],boost:2,
 en:"LEO is Low Earth Orbit, about 160 to 2,000 km up. A lap takes roughly 90 to 127 minutes. It is used for Earth imaging, the ISS, CubeSats and Starlink. Advantages: low signal delay and cheaper launch. Drawback: each satellite sees a small area, so you need many.",
 ar:"LEO هو المدار الأرضي المنخفض، من 160 لـ 2,000 كم تقريبًا. اللفة حوالي 90 لـ 127 دقيقة. بيتستخدم لتصوير الأرض ومحطة الفضاء والكيوبسات وستارلينك. المميزات: تأخير إشارة قليل وإطلاق أرخص. العيب: كل قمر بيشوف مساحة صغيرة فمحتاج أقمار كتير."},
{keys:["medium earth orbit","meo","مدار متوسط","المدار المتوسط"],boost:2,
 en:"MEO is Medium Earth Orbit, 2,000 to 35,000 km. GPS flies at about 20,200 km with a period near 12 hours, Galileo at about 23,200 km. About 24 satellites are enough to cover the world.",
 ar:"MEO هو المدار الأرضي المتوسط، من 2,000 لـ 35,000 كم. الـGPS على حوالي 20,200 كم وزمن دورة قرب 12 ساعة، وGalileo على حوالي 23,200 كم. حوالي 24 قمر كفاية لتغطية العالم."},
{keys:["geostationary","geosynchronous","geo orbit","35786","35,786","why geo","ثابت بالنسبة للأرض","مدار جيو","المدار الثابت"],boost:3,
 en:"GEO is at 35,786 km above the equator. At that height one lap takes exactly one sidereal day (23 h 56 min), the same as Earth's spin, so the satellite stays over one spot. That is why TV dishes can point at a fixed place in the sky. Trade-off: about a quarter second round-trip delay and weak coverage near the poles.",
 ar:"الـGEO على ارتفاع 35,786 كم فوق خط الاستواء. على الارتفاع ده اللفة بتاخد يوم نجمي بالظبط (23 ساعة و56 دقيقة) زي دوران الأرض، فالقمر بيفضل فوق نقطة واحدة. عشان كده أطباق التلفزيون بتتجه لمكان ثابت في السما. المقابل: تأخير حوالي ربع ثانية رايح جاي وتغطية ضعيفة قرب القطبين."},
{keys:["sun-synchronous","sun synchronous","sso orbit","sso","متزامن مع الشمس"],boost:3,
 en:"A sun-synchronous orbit is a nearly polar LEO (inclination about 98°) whose plane turns about one degree per day, following the Sun. The satellite passes over each place at the same local time, so imaging has consistent lighting.",
 ar:"المدار المتزامن مع الشمس هو LEO شبه قطبي (ميل حوالي 98 درجة) ومستواه بيلف حوالي درجة في اليوم ورا الشمس. القمر بيعدي فوق كل مكان في نفس الوقت المحلي فالتصوير بيبقى بإضاءة ثابتة."},
{keys:["molniya","highly elliptical","heo","elliptical orbit","مولنيا","مدار اهليلجي","مدار بيضاوي"],boost:3,
 en:"Molniya is a highly elliptical orbit: 12-hour period, inclination 63.4°, low perigee and very high apogee. The satellite moves slowly near apogee, so it hangs over high latitudes for hours, which GEO cannot cover well. Try the Molniya preset in the simulator.",
 ar:"مولنيا مدار إهليلجي عالي: زمن دورة 12 ساعة وميل 63.4 درجة وحضيض منخفض وأوج عالي جدًا. القمر بيتحرك ببطء قرب الأوج فبيفضل فوق خطوط العرض العالية لساعات، وده الـGEO ما بيغطيهوش كويس. جرّب إعداد Molniya في المحاكي."},
{keys:["what is a satellite","satellite parts","satellite subsystems","satellite bus","payload","ما هو القمر الصناعي","اجزاء القمر","القمر الصناعي"],boost:2,
 en:"A satellite has a payload (the mission: camera, radio, navigation signal) and a bus that keeps it alive: solar power and battery, on-board computer, radio, attitude control, thermal control, structure and sometimes propulsion. Each subsystem trades mass, power and cost.",
 ar:"القمر الصناعي ليه حمولة (المهمة: كاميرا أو راديو أو إشارة ملاحة) وbus بيبقيه شغال: طاقة شمسية وبطارية، كمبيوتر على المتن، راديو، تحكم في الاتجاه، تحكم حراري، هيكل وأحيانًا دفع. كل نظام فرعي بيوازن بين الوزن والطاقة والتكلفة."},
{keys:["cubesat","cube sat","كيوبسات","كيوب سات"],boost:3,
 en:"A CubeSat is a small standard satellite built from 10 cm cubes called units: 1U, 3U, 6U and so on. They are cheap to launch as rideshare payloads, so universities and startups use them to test technology. UAE example: Nayif-1 launched in 2017.",
 ar:"الكيوبسات قمر صغير قياسي مبني من مكعبات 10 سم اسمها وحدات: 1U و3U و6U وهكذا. رخيصة الإطلاق كحمولة مشتركة، فالجامعات والشركات الناشئة بتستخدمها لاختبار التقنيات. مثال إماراتي: نايف-1 اتطلق سنة 2017."},
{keys:["attitude","adcs","reaction wheel","star tracker","magnetorquer","التحكم في الاتجاه","عجلات رد الفعل","متتبع النجوم"],boost:2,
 en:"ADCS is attitude determination and control: working out which way the satellite faces and turning it. Sensors: sun sensors, gyros, magnetometers and star trackers. Actuators: reaction wheels (spin a wheel, the satellite turns the other way), magnetorquers and thrusters. A Kalman filter fuses the noisy sensors.",
 ar:"الـADCS هو تحديد الاتجاه والتحكم فيه: تعرف القمر وشّه ناحية فين وتلفّه. الحساسات: حساسات الشمس والجيروسكوب والمغناطيسية ومتتبعات النجوم. المنفّذات: عجلات رد الفعل (تدوّر عجلة فالقمر يلف عكسها) ومغناطيسات التحكم والدافعات. فلتر كالمان بيدمج الحساسات المليانة تشويش."},
{keys:["hohmann","delta-v","delta v","rocket equation","transfer orbit","change orbit","انتقال هومان","دلتا في","معادلة الصاروخ"],boost:3,
 en:"A Hohmann transfer moves a satellite between circular orbits with two burns: one at the low point to stretch the orbit, one at the high point to circularise. The velocity change needed is delta-v. LEO to GEO costs about 3.9 km/s. The rocket equation Δv = ve ln(m0/mf) shows that fuel is most of a rocket's mass.",
 ar:"انتقال هومان بينقل القمر بين مدارين دايريين بحرقتين: واحدة عند أقل نقطة تمدّ المدار، وواحدة عند أعلى نقطة تخلّيه دايري. تغيير السرعة المطلوب اسمه delta-v. من LEO لـGEO بيكلّف حوالي 3.9 كم/ث. معادلة الصاروخ Δv = ve ln(m0/mf) بتوضح إن الوقود أغلب وزن الصاروخ."},
{keys:["doppler","ground station","link budget","pass over","محطة ارضية","محطات الارض","دوبلر"],boost:2,
 en:"A LEO satellite is visible from one ground station for only about 5 to 15 minutes per pass. Its speed shifts the radio frequency (Doppler effect), higher when approaching and lower when leaving, so receivers must track it. A link budget adds transmit power and antenna gains, then subtracts distance loss and noise to check that the signal is strong enough.",
 ar:"قمر LEO بيبان من محطة أرضية واحدة حوالي 5 لـ 15 دقيقة بس في كل عبور. سرعته بتغيّر تردد الراديو (دوبلر)، أعلى وهو بيقرّب وأقل وهو بيبعد، فالمستقبِلات لازم تتتبعه. ميزانية الوصلة بتجمع قدرة الإرسال وكسب الهوائيات وتطرح فقد المسافة والضوضاء عشان تتأكد إن الإشارة قوية كفاية."},
{keys:["gps","how does gps work","how gps works","what is gps","what is gnss","gnss","gps work","trilateration","trilateration","الجي بي اس","كيف يعمل gps","بيشتغل gps","ما هو gnss","تحديد المواقع","تحديد الموقع"],boost:3,
 en:"GNSS (GPS and similar systems) works by timing signals. Each satellite broadcasts its position and the exact time. Your receiver measures how long each signal took, multiplies by the speed of light to get a distance, and the intersection of those spheres is you. You need 4 satellites: three for x, y, z and one to fix your receiver's cheap clock. Try the GNSS demo in the Orbits & Space tab.",
 ar:"الـGNSS (الـGPS والأنظمة الشبيهة) بيشتغل بقياس زمن الإشارات. كل قمر بيبث مكانه والوقت بالظبط. المستقبِل بيقيس كل إشارة أخدت وقت قد إيه، ويضرب في سرعة الضوء فيطلع المسافة، وتقاطع الكرات دي هو مكانك. محتاج 4 أقمار: تلاتة لـx وy وz وواحد يصلّح ساعة المستقبِل الرخيصة. جرّب عرض الـGNSS في تبويب المدارات والفضاء."},
{keys:["why 4 satellites","four satellites","4 satellites","clock error","why four","ليه 4 اقمار","اربع اقمار","خطأ الساعة","ليه اربعة اقمار"],boost:4,
 en:"Four satellites because there are four unknowns: x, y, z and your receiver's clock error. Satellites carry atomic clocks, but your phone has a cheap one. A 1 microsecond error is about 300 m, so the receiver solves for time together with position. In the 2D demo you need 3 satellites for the same reason.",
 ar:"أربع أقمار لأن فيه أربع مجاهيل: x وy وz وخطأ ساعة المستقبِل. الأقمار فيها ساعات ذرية بس تليفونك ساعته رخيصة. خطأ ميكروثانية واحدة يساوي حوالي 300 متر، فالمستقبِل بيحل الوقت مع الموقع. في العرض ثنائي الأبعاد محتاج 3 أقمار لنفس السبب."},
{keys:["gps accuracy","gnss error","multipath","ionosphere","rtk","dgps","sbas","دقة gps","دقة الجي بي اس","rtk"],boost:3,
 en:"A phone gets about 3 to 5 m in open sky. Errors come from ionosphere and troposphere delay, multipath (signals bouncing off buildings), satellite clock and orbit errors, and bad geometry (DOP). Fixes: dual-frequency receivers, SBAS, DGPS, and RTK, which uses a nearby base station to reach centimetre accuracy.",
 ar:"التليفون بياخد حوالي 3 لـ 5 متر في السما المفتوحة. الأخطاء من تأخير الأيونوسفير والتروبوسفير، والانعكاس (الإشارات بترتد من المباني)، وأخطاء ساعة ومدار القمر، وسوء الهندسة (DOP). الحلول: مستقبِلات بترددين وSBAS وDGPS وRTK اللي بيستخدم محطة قاعدة قريبة للوصول لدقة سنتيمترات."},
{keys:["galileo","glonass","beidou","navic","qzss","constellation","gps vs","كوكبة","جاليليو","بيدو"],boost:2,
 en:"GNSS constellations: GPS (USA, about 20,200 km, 55° inclination), GLONASS (Russia, about 19,100 km), Galileo (EU, about 23,200 km), BeiDou (China, a mix of MEO, GEO and inclined GEO), plus regional NavIC (India) and QZSS (Japan). Receivers that use several see more satellites and are more reliable.",
 ar:"كوكبات GNSS: GPS (أمريكا، حوالي 20,200 كم وميل 55 درجة)، GLONASS (روسيا، حوالي 19,100 كم)، Galileo (أوروبا، حوالي 23,200 كم)، BeiDou (الصين، خليط من MEO وGEO وGEO مائل)، وأنظمة إقليمية NavIC (الهند) وQZSS (اليابان). المستقبِلات اللي بتستخدم أكتر من نظام بتشوف أقمار أكتر وأوثق."},
{keys:["relativity","relativistic","time dilation","نسبية","النسبية"],boost:3,
 en:"GPS clocks run fast by about 45 microseconds per day because gravity is weaker at altitude, and slow by about 7 because of speed. The net is about +38 µs per day. Uncorrected, that would be about 11 km of error per day, so the clocks are tuned before launch.",
 ar:"ساعات GPS بتجري أسرع بحوالي 45 ميكروثانية في اليوم لأن الجاذبية أضعف في الارتفاع، وأبطأ بحوالي 7 بسبب السرعة. الصافي حوالي +38 ميكروثانية في اليوم. من غير تصحيح ده حوالي 11 كم خطأ في اليوم، فالساعات بتتظبط قبل الإطلاق."},
{keys:["kalman","sensor fusion","slam","dead reckoning","imu","visual odometry","فلتر كالمان","كالمان","دمج الحساسات"],boost:3,
 en:"No single sensor is enough. An IMU is fast but drifts, GNSS is absolute but slow and can be blocked, cameras see the surroundings. A Kalman filter blends them using each one's uncertainty. SLAM builds a map while locating you in it, which is what rovers use where there is no GNSS.",
 ar:"مفيش حساس واحد كفاية. الـIMU سريع بس بينحرف، والـGNSS مطلق بس بطيء وممكن يتحجب، والكاميرات بتشوف المحيط. فلتر كالمان بيدمجهم باستخدام عدم يقين كل واحد. الـSLAM بيبني خريطة وبيحدد مكانك فيها، وده اللي بتستخدمه المركبات وقت ما مفيش GNSS."},
{keys:["space debris","debris","kessler","حطام","كيسلر","حطام الفضاء"],boost:3,
 en:"Dead satellites and fragments circle Earth at 7 to 8 km/s, so even a small piece hits with huge energy. Operators track objects, plan avoidance manoeuvres and de-orbit satellites at end of life. Kessler syndrome is the fear of a collision chain reaction that makes an orbit unusable.",
 ar:"الأقمار الميتة والشظايا بتلف بسرعة 7 لـ 8 كم/ث، فحتى قطعة صغيرة بتخبط بطاقة ضخمة. المشغّلون بيتتبعوا الأجسام ويخططوا مناورات تجنب وينزّلوا الأقمار من المدار في نهاية العمر. متلازمة كيسلر هي الخوف من تفاعل تصادمات متسلسل يخلّي المدار غير صالح."},
{keys:["uae space","emirates space","mbrsc","hope probe","khalifasat","nayif","الامارات الفضاء","مسبار الامل","خليفة سات","مركز محمد بن راشد","الامارات في الفضاء"],boost:3,
 en:"UAE space background: the UAE Space Agency was founded in 2014. MBRSC in Dubai built Nayif-1 (2017, CubeSat) and KhalifaSat (2018), and the Hope probe entered Mars orbit in February 2021. For your interview, also read the company's own site and latest news, since this is only general background.",
 ar:"خلفية عن الإمارات في الفضاء: وكالة الإمارات للفضاء اتأسست سنة 2014. مركز محمد بن راشد للفضاء في دبي بنى نايف-1 (2017، كيوبسات) وخليفة سات (2018)، ومسبار الأمل دخل مدار المريخ في فبراير 2021. للمقابلة اقرا كمان موقع الشركة وآخر أخبارها لأن ده خلفية عامة بس."},
{keys:["interview","tell me about yourself","introduce myself","مقابلة","عرف بنفسك","اعرف نفسي","نصايح المقابلة","تحضير المقابلة"],boost:3,
 en:"For 'tell me about yourself' use present, past, future in about 30 seconds: who you are now, one real proof from your past, and why this role is your next step. Use your real details, end with a question back, and practise aloud. More frameworks are in the interview prep cards in the Orbits & Space tab.",
 ar:"في سؤال 'عرّفنا بنفسك' استخدم الحاضر والماضي والمستقبل في حوالي 30 ثانية: إنت مين دلوقتي، وإثبات حقيقي واحد من ماضيك، وليه الوظيفة دي خطوتك الجاية. استخدم تفاصيلك الحقيقية، واختم بسؤال، واتمرّن بصوت عالي. فيه هياكل أكتر في كروت تحضير المقابلة في تبويب المدارات والفضاء."},
{keys:["why satellites don't fall","why dont satellites fall","free fall","weightless","ليه القمر مبيقعش","ليه الاقمار مبتقعش","انعدام الوزن"],boost:4,
 en:"Satellites do fall, they just keep missing the ground. Sideways speed makes the Earth curve away as fast as they drop. Astronauts float because they and the station fall together, not because gravity is gone. At 400 km gravity is still about 90 percent of its value at the surface.",
 ar:"الأقمار بتقع فعلًا، بس بتغلط الأرض. السرعة الجانبية بتخلّي الأرض تتحني بنفس سرعة نزولها. رواد الفضاء بيعوموا لأنهم والمحطة بيقعوا مع بعض، مش لأن الجاذبية اختفت. على 400 كم الجاذبية لسه حوالي 90 في المية من قيمتها على السطح."}
);
CHIPSX.space={
 en:["What is an orbit?","Why is GEO 35,786 km?","How does GPS work?","Why 4 satellites?","Explain Kepler's laws","What is a CubeSat?","Tell me about yourself tips","How is orbital speed calculated?"],
 ar:["يعني إيه مدار؟","ليه الـGEO على 35,786 كم؟","الـGPS بيشتغل إزاي؟","ليه محتاجين 4 أقمار؟","اشرحلي قوانين كبلر","ما هو الكيوبسات؟","نصايح لسؤال عرّفنا بنفسك","إزاي نحسب السرعة المدارية؟"]};
