"use strict";
/* Orbitworks prep: study track, interview playbook, formula sheet, quiz. Bilingual (EN / Egyptian Arabic). */

const OW_STUDY=[
/* 1 */
{dg:"ow-kepler",en:{title:"Orbital mechanics in 5 minutes",tag:"Kepler, vis-viva, period",
 body:"An orbit is an ellipse with the Earth at one focus. Three numbers cover most questions: the semi-major axis a (size), the eccentricity e (shape) and the inclination i (tilt). Speed changes along the orbit: v² = μ(2/r − 1/a), called vis-viva. For a circular orbit v = √(μ/r) and the period is T = 2π√(a³/μ). A satellite at about 508 km, like Altair-1, moves at 7.61 km/s and circles the Earth every 94.8 minutes. Lower is faster. Always say the units (km, km/s, μ = 398,600 km³/s²).",
 cap:"Interview line: 'Lower orbits are faster and shorter, but feel more drag.'"},
 ar:{title:"ميكانيكا المدارات في 5 دقايق",tag:"كبلر، vis-viva، زمن الدورة",
 body:"المدار قطع ناقص والأرض في إحدى بؤرتيه. تلات أرقام بتغطي معظم الأسئلة: نصف المحور الأكبر a (الحجم) والانحراف e (الشكل) والميل i (الزاوية). السرعة بتتغير على طول المدار: v² = μ(2/r − 1/a) واسمها vis-viva. في المدار الدائري v = √(μ/r) وزمن الدورة T = 2π√(a³/μ). قمر على ارتفاع 508 كم تقريبًا زي Altair-1 بيمشي بسرعة 7.61 كم/ث ويلف الأرض كل 94.8 دقيقة. كل ما نزلت أسرع. قول الوحدات دايمًا (كم، كم/ث، μ = 398,600).",
 cap:"جملة للمقابلة: المدار الأقل أسرع ودورته أقصر، بس مقاومة الجو فيه أعلى."},
 code:`import math
MU = 398600.4418      # km^3/s^2
RE = 6378.137         # km

def circular_speed(alt_km):
    return math.sqrt(MU / (RE + alt_km))

def period_min(alt_km):
    a = RE + alt_km
    return 2 * math.pi * math.sqrt(a**3 / MU) / 60

def vis_viva(r_km, a_km):
    return math.sqrt(MU * (2 / r_km - 1 / a_km))

print(round(circular_speed(508), 2), "km/s")   # 7.61
print(round(period_min(508), 1), "min")        # 94.8`},
/* 2 */
{dg:"ow-sso",en:{title:"Sun-synchronous orbit (SSO) and revisit",tag:"why Altair-1 flies at 97.4°",
 body:"Earth is not a perfect sphere: its bulge (the J2 term) slowly turns an orbit's plane. At the right inclination, a bit past 90° (retrograde), that turn matches the Earth's yearly trip around the Sun: 0.9856° per day. The satellite then crosses each latitude at the same local solar time, so shadows and lighting stay consistent from image to image. Altair-1 is listed in an SSO at about 508 km and 97.4° (OrbitalWiki, NORAD 100897). Transporter rideshare missions from Vandenberg commonly deliver to SSO, which fits.",
 cap:"Formula to remember: the nodal precession rate depends on cos i, so i must be above 90°."},
 ar:{title:"المدار المتزامن مع الشمس (SSO) وزمن إعادة الزيارة",tag:"ليه Altair-1 بيطير على 97.4°",
 body:"الأرض مش كرة مثالية: انتفاخها (حد J2) بيلفّ مستوى المدار ببطء. عند الميل المظبوط، أكتر من 90° شوية (مدار رجعي)، اللفة دي بتطابق رحلة الأرض السنوية حوالين الشمس: 0.9856° في اليوم. فالقمر بيعدي على كل خط عرض في نفس الوقت الشمسي المحلي، والإضاءة والظلال بتفضل ثابتة من صورة للتانية. Altair-1 مسجّل في SSO على ارتفاع 508 كم وميل 97.4° تقريبًا (OrbitalWiki، NORAD 100897). ورحلات Transporter من Vandenberg بتوصّل غالبًا لمدار SSO، وده متوافق.",
 cap:"المعادلة اللي تفتكرها: معدل لفّ المستوى بيعتمد على cos i، فلازم i أكبر من 90°."},
 code:`import math
MU, RE, J2 = 398600.4418, 6378.137, 1.08263e-3

def sso_inclination(alt_km, e=0.0):
    a = RE + alt_km
    n = math.sqrt(MU / a**3)                  # mean motion, rad/s
    sun = 2 * math.pi / (365.2422 * 86400)    # Sun's apparent motion, rad/s
    cos_i = -sun / (1.5 * J2 * (RE / (a * (1 - e**2)))**2 * n)
    return math.degrees(math.acos(cos_i))

print(round(sso_inclination(508), 1))   # 97.4`},
/* 3 */
{dg:"ow-frames",en:{title:"Coordinate frames, time and TLEs",tag:"ECI, ECEF, UTC vs GPS time, SGP4",
 body:"Navigation bugs are usually frame or time bugs. ECI is fixed against the stars and is where orbits are propagated. ECEF spins with the Earth and is where latitude, longitude and ground stations live. The orbital frame (LVLH) rides with the satellite, and the body frame is glued to the spacecraft. Rotating between them needs a precise time. GPS time has no leap seconds, so it runs ahead of UTC by a whole number (18 s since 2017). Public tracking data comes as a TLE (two-line element set) and is propagated with SGP4, good to about a kilometre near its epoch and worse after days. Orbitworks' own site shows Altair-1's live position from US Space Force tracking data, which is this kind of data.",
 cap:"Say it out loud: 'I always state the frame and the time system of every vector.'"},
 ar:{title:"الإطارات الإحداثية والوقت والـTLE",tag:"ECI وECEF وUTC مقابل GPS وSGP4",
 body:"أغلب أخطاء الملاحة بتبقى أخطاء إطار أو وقت. ECI ثابت بالنسبة للنجوم وفيه بنحسب المدارات. ECEF بيلف مع الأرض وفيه خط الطول والعرض والمحطات الأرضية. الإطار المداري (LVLH) بيمشي مع القمر، وإطار الجسم ملزوق في المركبة. والتحويل بينهم محتاج وقت دقيق. وقت GPS مفيهوش ثواني كبيسة، فهو قدّام UTC بعدد صحيح (18 ثانية من 2017). بيانات التتبع العامة بتيجي في TLE ومعالجتها بـSGP4، ودقتها حوالي كيلومتر قرب وقت القياس وبتسوء بعد أيام. وموقع Orbitworks نفسه بيعرض موقع Altair-1 الحي من بيانات تتبع القوات الفضائية الأمريكية، وهي من النوع ده.",
 cap:"قولها بصوتك: أنا دايمًا بحدد الإطار ونظام الوقت لأي متجه."},
 code:`from sgp4.api import Satrec, jday    # pip install sgp4

line1 = "<paste TLE line 1 for NORAD 100897 from CelesTrak>"
line2 = "<paste TLE line 2>"
sat = Satrec.twoline2rv(line1, line2)

jd, fr = jday(2026, 12, 1, 9, 0, 0)     # 1 Dec 2026, 09:00 UTC = 13:00 Dubai
err, r_km, v_kms = sat.sgp4(jd, fr)      # position/velocity in the TEME frame
print(err, r_km, v_kms)`},
/* 4 */
{dg:"gnss-trilat",en:{title:"GNSS positioning, on the ground and in orbit",tag:"pseudorange, 4 unknowns, DOP",
 body:"A receiver measures the travel time of each satellite's signal. Multiplied by the speed of light that gives a pseudorange: the true distance plus a clock error. There are four unknowns (x, y, z and the receiver clock bias), so you need at least four satellites. Solve by linearising and iterating least squares. Geometry matters: DOP (dilution of precision) says how much geometry magnifies range errors. Error sources: satellite orbit and clock, ionosphere, troposphere, multipath, receiver noise. In LEO a spaceborne receiver sees large Doppler shifts (tens of kHz) and fast-changing geometry, so it needs a fast cold start. A satellite at 500 km is inside the upper ionosphere, so dual-frequency receivers are used for precise work.",
 cap:"Mini demo: Orbits & Space → GNSS demo. Move the receiver and change the clock error."},
 ar:{title:"تحديد المواقع بالـGNSS، على الأرض وفي المدار",tag:"pseudorange وأربع مجاهيل وDOP",
 body:"المستقبل بيقيس زمن وصول إشارة كل قمر. لما نضربه في سرعة الضوء بيطلع pseudorange: المسافة الحقيقية زائد خطأ ساعة. فيه أربع مجاهيل (x وy وz وانحياز ساعة المستقبل)، فمحتاج 4 أقمار على الأقل. بنحل بالتخطيط الخطي وتكرار المربعات الصغرى. الهندسة مهمة: الـDOP بيقول الهندسة بتكبّر أخطاء المسافة قد إيه. مصادر الخطأ: مدار وساعة القمر والأيونوسفير والتروبوسفير وتعدد المسارات وضوضاء المستقبل. في LEO المستقبل بيشوف Doppler كبير (عشرات الكيلوهرتز) وهندسة بتتغير بسرعة، فمحتاج بداية باردة سريعة. وقمر على 500 كم جوه الأيونوسفير العلوي، فبنستخدم مستقبلات بترددين للدقة العالية.",
 cap:"تجربة صغيرة: المدارات والفضاء ← عرض GNSS. حرّك المستقبل وغيّر خطأ الساعة."},
 code:`import numpy as np

def solve(sats, rho, x0=np.zeros(4), iters=8):
    """sats: Nx3 satellite positions (m). rho: N pseudoranges (m).
    Returns [x, y, z, c*clock_bias] and GDOP."""
    x = x0.astype(float).copy()
    for _ in range(iters):
        d = np.linalg.norm(sats - x[:3], axis=1)
        H = np.hstack([-(sats - x[:3]) / d[:, None], np.ones((len(d), 1))])
        x += np.linalg.lstsq(H, rho - (d + x[3]), rcond=None)[0]
    gdop = np.sqrt(np.trace(np.linalg.inv(H.T @ H)))
    return x, gdop`},
/* 5 */
{dg:"ow-kf",en:{title:"Orbit determination and the Kalman filter",tag:"predict, update, covariance",
 body:"Orbit determination turns noisy measurements (GNSS fixes, ranging, Doppler) into the best estimate of the state: position and velocity, often plus drag and clock terms. A Kalman filter does it in two repeating steps. Predict: push the state forward with the dynamics model (gravity with J2, drag) and let the uncertainty (covariance P) grow. Update: blend in a new measurement, weighted by the Kalman gain K, which trusts the less noisy of model and sensor. Orbits are nonlinear, so real systems use an extended Kalman filter (EKF) or a batch least-squares fit. Say what you tuned: process noise Q and measurement noise R.",
 cap:"If asked 'what if the filter diverges?': check Q and R, frames and units, and measurement outliers."},
 ar:{title:"تحديد المدار وفلتر كالمان",tag:"توقّع وتصحيح وcovariance",
 body:"تحديد المدار بيحوّل قياسات فيها ضوضاء (GNSS ومسافات وDoppler) لأحسن تقدير للحالة: الموقع والسرعة، وساعات معاهم مقاومة الجو وخطأ الساعة. فلتر كالمان بيعمل كده في خطوتين متكررتين. التوقّع: بيمشّي الحالة لقدام بنموذج الديناميكا (الجاذبية مع J2 والمقاومة) وعدم اليقين (الـcovariance P) بيكبر. التصحيح: بيدمج قياس جديد، موزون بمعامل كالمان K اللي بيثق في الأقل ضوضاء من النموذج والحساس. المدارات مش خطية، فالأنظمة الحقيقية بتستخدم EKF أو مطابقة مربعات صغرى على دفعة. وقول إيه اللي ظبطته: ضوضاء العملية Q وضوضاء القياس R.",
 cap:"لو اتسألت الفلتر بيتباعد؟: راجع Q وR والإطارات والوحدات والقياسات الشاذة."},
 code:`import numpy as np
dt = 1.0
F = np.array([[1, dt], [0, 1]])          # position, velocity model
H = np.array([[1.0, 0.0]])               # we measure position only
Q = np.diag([0.01, 0.001])               # process noise (model trust)
R = np.array([[25.0]])                   # GNSS noise: sigma = 5 m

def step(x, P, z):
    x = F @ x;  P = F @ P @ F.T + Q                    # predict
    K = P @ H.T @ np.linalg.inv(H @ P @ H.T + R)       # Kalman gain
    x = x + K @ (z - H @ x)                            # update
    P = (np.eye(2) - K @ H) @ P
    return x, P`},
/* 6 */
{dg:"ow-triad",en:{title:"Attitude determination",tag:"sensors, TRIAD, quaternions",
 body:"Attitude is which way the satellite points: a rotation between the body frame and a reference frame. You cannot sense it directly, so you measure known directions and solve. Sun sensors and magnetometers give vectors (cheap, coarse). Star trackers match star patterns and give arc-second accuracy. Gyros give the rotation rate and drift, so they are fused with the others, usually in a Kalman filter. TRIAD builds the rotation from two direction pairs; QUEST and Davenport's q-method use more. Quaternions store the rotation without gimbal lock (four numbers, unit length). This links straight to Orbitworks: imaging only works if the satellite knows where it points.",
 cap:"Good answer to 'why star trackers?': they give the best accuracy, but cost more and fail when the Sun or Earth is in view."},
 ar:{title:"تحديد الاتجاه (Attitude determination)",tag:"حساسات وTRIAD وكواترنيون",
 body:"الـattitude هو القمر بيشاور على فين: دوران بين إطار الجسم وإطار مرجعي. مش بتحسه مباشرة، فبتقيس اتجاهات معروفة وبتحل. حساسات الشمس والمغناطيسية بتدي متجهات (رخيصة وتقريبية). متتبع النجوم بيطابق أنماط النجوم ويدي دقة بالثواني القوسية. الجيروسكوب بيدي معدل الدوران والانجراف، فبيتدمج مع الباقي غالبًا في فلتر كالمان. TRIAD بيبني الدوران من زوجين من الاتجاهات، وQUEST وطريقة q لديفنبورت بتستخدم أكتر. والكواترنيون بيخزّن الدوران من غير gimbal lock (4 أرقام طولها 1). وده مرتبط مباشرة بـOrbitworks: التصوير مش بيشتغل إلا لو القمر عارف بيشاور على فين.",
 cap:"إجابة كويسة لسؤال ليه star trackers؟: دقتها الأعلى، بس أغلى وبتتعطل لو الشمس أو الأرض في مجال الرؤية."},
 code:`import numpy as np
unit = lambda v: v / np.linalg.norm(v)

def triad_frame(v1, v2):
    t1 = unit(v1)
    t2 = unit(np.cross(v1, v2))
    return np.column_stack([t1, t2, np.cross(t1, t2)])

def triad(b1, b2, r1, r2):
    """b: two vectors measured in the body frame. r: the same two in the reference frame.
    Returns R such that v_ref = R @ v_body."""
    return triad_frame(r1, r2) @ triad_frame(b1, b2).T`},
/* 7 */
{dg:"ow-adcs",en:{title:"Attitude control: wheels and magnetorquers",tag:"detumble, point, desaturate",
 body:"Actuators move the satellite. Reaction wheels spin up or down and the satellite turns the opposite way (angular momentum is conserved). They are precise and need no fuel, but they saturate, so something must dump the stored momentum. Magnetorquers are coils that push against the Earth's magnetic field: weak, but free and fine for desaturation. After separation from the rocket the satellite tumbles. Detumbling uses the B-dot law: command a dipole opposite to the measured field change, m = −k·dB/dt. Then a PD controller points the satellite. Imaging satellites also need agility: how fast they can slew between targets.",
 cap:"Remember the trio: sense (sensors), decide (control law), act (wheels, torquers)."},
 ar:{title:"التحكم في الاتجاه: عجلات وملفات مغناطيسية",tag:"إيقاف التدحرج والتوجيه وتفريغ الزخم",
 body:"المشغّلات هي اللي بتحرك القمر. عجلات التفاعل بتزود أو تقلل سرعتها والقمر بيلف في الاتجاه المعاكس (حفظ الزخم الزاوي). دقيقة ومش محتاجة وقود، بس بتتشبع، فلازم حاجة تفرّغ الزخم المخزّن. الملفات المغناطيسية بتدفع ضد مجال الأرض المغناطيسي: ضعيفة بس ببلاش ومناسبة للتفريغ. بعد الانفصال عن الصاروخ القمر بيتدحرج. إيقاف التدحرج بيستخدم قانون B-dot: أمر بعزم مغناطيسي عكس تغير المجال المقاس، m = −k·dB/dt. بعدين متحكم PD بيوجّه القمر. وأقمار التصوير محتاجة رشاقة: بتلف بين الأهداف بسرعة قد إيه.",
 cap:"افتكر التلاتة: استشعر (حساسات)، قرر (قانون تحكم)، نفّذ (عجلات وملفات)."},
 code:`import numpy as np
K_BDOT = 2e5      # gain, tuned in simulation

def bdot_dipole(B_now, B_prev, dt, m_max=0.2):
    """Commanded magnetic dipole (A*m^2) to detumble. B in tesla."""
    bdot = (np.asarray(B_now) - np.asarray(B_prev)) / dt
    return np.clip(-K_BDOT * bdot, -m_max, m_max)

def pd_torque(q_err_vec, omega, kp=0.02, kd=0.2):
    """Pointing torque from quaternion error (vector part) and body rate."""
    return -kp * np.asarray(q_err_vec) - kd * np.asarray(omega)`},
/* 8 */
{dg:"ow-bus",en:{title:"What is inside a satellite",tag:"the bus and the payload",
 body:"A satellite is a bus plus a payload. The payload is why the mission exists: for Altair, five sensors (optical, shortwave infrared, thermal, hyperspectral, RF) and onboard NVIDIA GPUs. The bus keeps it alive: EPS (solar panels, battery, power regulation), OBC (flight computer and software), ADCS (attitude sensors and actuators), TT&C (radios for telemetry and commands), thermal control, structure and sometimes propulsion. An Orbitworks operations job ad mentions the Airbus Arrow-150 bus. Know the subsystem names, and for each one say what can go wrong: low battery, overheating, a wheel fault, a missed pass.",
 cap:"Nice line for the call: 'Navigation touches ADCS, the OBC software and the ground tools at the same time.'"},
 ar:{title:"إيه اللي جوه القمر الصناعي",tag:"المنصة والحمولة",
 body:"القمر منصة (bus) زائد حمولة (payload). الحمولة هي سبب وجود المهمة: في Altair خمس حساسات (بصري وتحت أحمر قصير وحراري وفائق الطيفية وRF) ومعالجات NVIDIA GPU على متن القمر. والمنصة بتخليه عايش: EPS (ألواح شمسية وبطارية وتنظيم قدرة) وOBC (كمبيوتر الطيران والبرمجيات) وADCS (حساسات ومشغّلات الاتجاه) وTT&C (راديو للتليمترية والأوامر) والتحكم الحراري والهيكل وساعات الدفع. وإعلان وظيفة عمليات عند Orbitworks بيذكر منصة Airbus Arrow-150. اعرف أسماء الأنظمة الفرعية، وقول لكل واحد إيه اللي ممكن يبوظ: بطارية واطية وسخونية وعجلة بايظة وتمريرة فاتت.",
 cap:"جملة حلوة للمكالمة: الملاحة بتلمس الـADCS وبرمجيات الـOBC وأدوات الأرض في نفس الوقت."},
 code:`LIMITS = {"batt_v": (6.0, 8.4), "batt_temp_c": (0, 40), "wheel_rpm": (-6000, 6000)}   # illustrative

def check(tm):
    """Return the telemetry channels that are out of limits."""
    return [k for k, (lo, hi) in LIMITS.items() if not lo <= tm[k] <= hi]

print(check({"batt_v": 7.2, "batt_temp_c": 45, "wheel_rpm": 1200}))   # ['batt_temp_c']`},
/* 9 */
{dg:"ow-eo",en:{title:"Earth observation: GSD, pointing and geolocation",tag:"why navigation errors become metres",
 body:"Ground sample distance is the pixel size on the ground: GSD = pixel pitch × altitude / focal length. Swath is the strip width. The navigation link is geolocation: ground error ≈ altitude × pointing error. At 508 km, 0.1° of attitude error moves a pixel by about 887 m, while 10 arc-seconds gives about 25 m. That is why star trackers, good orbit knowledge and accurate time matter. Different sensors answer different questions: optical for detail, SWIR for materials and haze, thermal for heat and fires, hyperspectral for composition, RF for emitters. Altair processes onboard, so users get analysis-ready results in minutes instead of raw images.",
 cap:"Strong closing line: 'Better navigation and attitude knowledge directly improves the value of every image.'"},
 ar:{title:"رصد الأرض: GSD والتوجيه وتحديد الموقع الجغرافي",tag:"ليه أخطاء الملاحة بتبقى أمتار",
 body:"الـGSD هو حجم البكسل على الأرض: GSD = حجم البكسل × الارتفاع ÷ البعد البؤري. والـswath عرض الشريط. وحلقة الربط بالملاحة هي التحديد الجغرافي: خطأ الأرض ≈ الارتفاع × خطأ الاتجاه. على 508 كم، خطأ اتجاه 0.1° بيزحزح البكسل حوالي 887 متر، وعشر ثواني قوسية بتدي حوالي 25 متر. عشان كده متتبعات النجوم ومعرفة المدار الجيدة والوقت الدقيق مهمين. الحساسات المختلفة بتجاوب أسئلة مختلفة: البصري للتفاصيل وSWIR للمواد والضباب والحراري للحرارة والحرائق وفائق الطيفية للتركيب وRF للمُرسِلات. وAltair بيعالج على المتن، فالمستخدم بياخد نتايج جاهزة للتحليل في دقايق بدل صور خام.",
 cap:"جملة ختام قوية: تحسين الملاحة ومعرفة الاتجاه بيرفع قيمة كل صورة مباشرة."},
 code:`import math

def gsd_m(pixel_um, alt_km, focal_m):
    return pixel_um * 1e-6 * alt_km * 1000 / focal_m

def ground_error_m(alt_km, pointing_err_deg):
    return alt_km * 1000 * math.radians(pointing_err_deg)

print(round(gsd_m(5.5, 508, 4.0), 2), "m")              # 0.7 m, sub-meter class
print(round(ground_error_m(508, 0.1)), "m")             # 887 m
print(round(ground_error_m(508, 10 / 3600)), "m")       # 25 m`},
/* 10 */
{dg:"ow-pass",en:{title:"Ground contact, passes and link budget",tag:"short windows, long planning",
 body:"A LEO satellite is above a ground station only for minutes. For a 508 km orbit the longest horizon-to-horizon pass is about 11.7 minutes; with a 10° elevation mask it is about 7.5. With a 94.8-minute orbit that is a few passes a day per station, so uplink and downlink must be planned: what to command, what to downlink first, what to do if a pass is missed. The signal must also survive the distance: free-space path loss FSPL = 20·log10(d_km) + 20·log10(f_MHz) + 32.44 dB. Operators watch telemetry on dashboards, run Python procedures and handle anomalies. Orbitworks' ops job ad mentions Python, Grafana and an in-house mission control tool called Cockpit.",
 cap:"'Test as you fly' means rehearsing the real procedures on the ground first."},
 ar:{title:"الاتصال الأرضي والتمريرات وميزانية الوصلة",tag:"نوافذ قصيرة وتخطيط طويل",
 body:"قمر LEO بيبقى فوق محطة أرضية لدقايق بس. في مدار 508 كم أطول تمريرة من الأفق للأفق حوالي 11.7 دقيقة، ومع قناع ارتفاع 10° حوالي 7.5. ومع دورة 94.8 دقيقة، دي كام تمريرة في اليوم للمحطة الواحدة، فلازم نخطط الإرسال والاستقبال: نأمر بإيه وننزّل إيه الأول ونعمل إيه لو تمريرة فاتت. والإشارة لازم تستحمل المسافة: الفقد في الفضاء الحر FSPL = 20·log10(المسافة كم) + 20·log10(التردد ميجاهرتز) + 32.44 ديسيبل. والمشغّلون بيتابعوا التليمترية على لوحات وبيشغّلوا إجراءات بايثون وبيتعاملوا مع الأعطال. وإعلان العمليات عند Orbitworks بيذكر بايثون وGrafana وأداة تحكم داخلية اسمها Cockpit.",
 cap:"'Test as you fly' معناها تتمرن على الإجراءات الحقيقية على الأرض الأول."},
 code:`import math
RE = 6378.137

def max_pass_min(alt_km, min_elev_deg=0, period_min=94.8):
    el = math.radians(min_elev_deg)
    half_angle = math.acos(RE / (RE + alt_km) * math.cos(el)) - el   # Earth central half-angle
    return 2 * half_angle / (2 * math.pi) * period_min

print(round(max_pass_min(508), 1), "min")        # 11.7, horizon to horizon
print(round(max_pass_min(508, 10), 1), "min")    # 7.5, with a 10 degree mask`},
/* 11 */
{dg:"ow-ait",en:{title:"Assembly, integration and test (AIT)",tag:"what happens in the Abu Dhabi factory",
 body:"Orbitworks builds satellites in a 50,000 sq ft facility in KEZAD, Abu Dhabi, with a 15,000 sq ft ISO-class cleanroom, EMI chambers, thermal vacuum systems and shaker tables, and capacity for up to 50 satellites a year. AIT is where a design becomes flight hardware: assemble, integrate payloads, then prove it survives launch and space. Vibration tests the launch shake. Thermal vacuum cycles hot and cold in vacuum. EMC checks the satellite does not disturb itself or others. Every requirement is verified by test, analysis, inspection or demonstration. For navigation, AIT includes checking sensor alignment and that ADCS commands move the satellite the right way.",
 cap:"Ask them: 'How do you verify attitude and navigation performance before launch?'"},
 ar:{title:"التجميع والتكامل والاختبار (AIT)",tag:"اللي بيحصل في مصنع أبوظبي",
 body:"Orbitworks بتبني الأقمار في منشأة مساحتها 50,000 قدم مربع في KEZAD بأبوظبي، فيها غرفة نظيفة 15,000 قدم مربع وغرف EMI وأنظمة فاكيوم حراري وطاولات اهتزاز، وطاقة لحد 50 قمر في السنة. الـAIT هو المكان اللي التصميم بيبقى فيه عتاد طيران: تجميع ودمج الحمولات وبعدين إثبات إنه هيستحمل الإطلاق والفضاء. الاهتزاز بيختبر رجّة الإطلاق. والفاكيوم الحراري بيدوّر سخونة وبرودة في فراغ. وEMC بيتأكد إن القمر مش بيزعج نفسه ولا غيره. وكل متطلب بيتحقق منه باختبار أو تحليل أو فحص أو عرض. وفي الملاحة، الـAIT بيشمل فحص محاذاة الحساسات وإن أوامر الـADCS بتحرك القمر في الاتجاه الصح.",
 cap:"اسألهم: بتتحققوا من أداء الاتجاه والملاحة قبل الإطلاق إزاي؟"}},
/* 12 */
{dg:"ow-constel",en:{title:"Constellations, revisit and keeping orbits safe",tag:"10 satellites, 4-hour revisit",
 body:"Altair is planned as 10 satellites: Altair-1 launched on 1 October 2026 and the other nine follow through 2027. At full strength the constellation is designed to revisit any point on Earth roughly every four hours. Revisit depends on orbit altitude, the number of satellites, how they are spread over orbital planes, and the sensor swath. A constellation needs phasing so satellites do not bunch up, and small manoeuvres or drag management to keep their spacing. Safety work: screen for conjunctions (close approaches) using tracking data, plan avoidance manoeuvres, and plan end of life so the satellite deorbits. At about 500 km, drag helps clear dead satellites within years.",
 cap:"Don't invent specifics about Orbitworks' propulsion or manoeuvres: say what you would ask."},
 ar:{title:"المجموعات وزمن إعادة الزيارة وسلامة المدارات",tag:"10 أقمار وزيارة كل 4 ساعات",
 body:"Altair متخطط يبقى 10 أقمار: Altair-1 اتطلق في 1 أكتوبر 2026 والتسعة الباقيين بيلحقوا خلال 2027. وعند الاكتمال المجموعة مصممة تزور أي نقطة على الأرض تقريبًا كل أربع ساعات. زمن الإعادة بيعتمد على ارتفاع المدار وعدد الأقمار وتوزيعها على المستويات المدارية وعرض مسح الحساس. والمجموعة محتاجة ضبط مراحل (phasing) عشان الأقمار متتلزقش في بعض، ومناورات صغيرة أو إدارة للمقاومة للحفاظ على المسافات. وشغل السلامة: فحص الاقترابات (conjunctions) من بيانات التتبع، وتخطيط مناورات التفادي، وتخطيط نهاية العمر عشان القمر ينزل. وعلى 500 كم تقريبًا المقاومة بتساعد في تنضيف الأقمار الميتة خلال سنين.",
 cap:"متألفش تفاصيل عن دفع Orbitworks أو مناوراتها: قول إيه اللي هتسأل عنه."}}
];

/* ---------- interview playbook (accordion, text only) ---------- */
const OW_PLAY=[
{en:{title:"What this call is (and is not)",tag:"Tue 1 Dec, 1:00 to 1:30 pm Dubai · Lobhana Ahale",
 body:"Orbitworks' careers page describes the process: initial contact, an introductory video conversation about your background, interests and fit, then a technical or role screening, sometimes a short task, then final interviews. Your call is most likely the introductory conversation. Expect a recruiter to test: motivation, communication, basic understanding of what Orbitworks does, level and availability, and logistics (location, notice, salary). It is not usually a deep technical exam, but one or two simple space questions are possible, so know the basics in the study track. Confirm the video link and the exact time zone in the invite today."},
 ar:{title:"المكالمة دي إيه (ومش إيه)",tag:"الثلاثاء 1 ديسمبر، 1:00 لـ 1:30 ظهرًا بتوقيت دبي · Lobhana Ahale",
 body:"صفحة الوظائف عند Orbitworks بتوصف العملية: تواصل مبدئي، ثم محادثة تعريفية بالفيديو عن خلفيتك واهتماماتك ومدى التوافق، ثم فرز تقني أو حسب الدور، وأحيانًا مهمة قصيرة، ثم المقابلات النهائية. مكالمتك غالبًا هي المحادثة التعريفية. توقّع إن الريكروتر يختبر: الدافع والتواصل وفهمك الأساسي لشغل Orbitworks ومستواك ومواعيدك واللوجيستيات (المكان والإشعار والراتب). مش امتحان تقني عميق عادة، بس ممكن سؤال أو اتنين بسيطين في الفضاء، فاعرف الأساسيات في مسار المذاكرة. أكّد رابط الفيديو والتوقيت بالظبط في الدعوة النهاردة."}},
{en:{title:"Your 60-second pitch",tag:"fill the brackets with your real facts",
 body:"Structure: who you are, what you studied, one proof, why space navigation, why Orbitworks. Template: 'I am [name], a recent graduate in [degree and field] from [university]. My focus was space navigation: [two topics, for example orbit determination and GNSS]. In my [project or thesis] I [what you built or measured, with one number if you have it]. What draws me to Orbitworks is that you build and operate satellites here in Abu Dhabi, and Altair-1 shows the whole chain works: design, integration, launch and operations. I want to bring my navigation and Python skills to a team that is doing this for real.' Practise it out loud until it fits in 60 seconds. Use only facts that are true for you."},
 ar:{title:"تعريفك في 60 ثانية",tag:"املا الأقواس بحقايقك الحقيقية",
 body:"الهيكل: إنت مين، درست إيه، دليل واحد، ليه ملاحة الفضاء، ليه Orbitworks. قالب: 'أنا [الاسم]، خريج حديث في [التخصص] من [الجامعة]. تركيزي كان ملاحة الفضاء: [موضوعين، مثلًا تحديد المدار وGNSS]. في [مشروعي أو رسالتي] عملت [اللي بنيته أو قسته، برقم لو عندك]. اللي شدّني لـOrbitworks إنكم بتبنوا وتشغّلوا أقمار هنا في أبوظبي، وAltair-1 بيثبت إن السلسلة كلها شغالة: تصميم وتكامل وإطلاق وتشغيل. عايز أجيب مهاراتي في الملاحة وبايثون لفريق بيعمل ده بجد.' اتمرن عليه بصوت عالي لحد ما يتحشر في 60 ثانية. استخدم حقايق صحيحة عنك بس."}},
{en:{title:"Why Orbitworks? Facts you can cite",tag:"five true, checkable points",
 body:"1) First commercial satellite built in the UAE: Altair-1 launched on 1 October 2026 on SpaceX Transporter-18 and is in orbit. 2) It is the first of ten AI-enabled Earth observation satellites: five sensors and onboard GPUs that turn data into answers in minutes. 3) Everything happens in Abu Dhabi: a 50,000 sq ft KEZAD factory, tested and shipped from the UAE. 4) The name: Altair comes from the Arabic al-ṭā'ir, a star used for centuries to navigate by. Say this one with a smile, you are a navigation graduate. 5) The company is young (joint venture of Loft Orbital and Marlan Space, started 2024) and growing, so a graduate can learn fast and own real work."},
 ar:{title:"ليه Orbitworks؟ حقايق تقدر تذكرها",tag:"خمس نقاط صحيحة وممكن التحقق منها",
 body:"1) أول قمر تجاري اتبنى في الإمارات: Altair-1 اتطلق في 1 أكتوبر 2026 على SpaceX Transporter-18 وهو في المدار. 2) هو الأول من عشرة أقمار رصد أرض بالذكاء الاصطناعي: خمس حساسات ومعالجات GPU على المتن بتحوّل البيانات لإجابات في دقايق. 3) كل حاجة بتحصل في أبوظبي: مصنع 50,000 قدم مربع في KEZAD، واتختبر وشُحن من الإمارات. 4) الاسم: Altair جاي من الطائر بالعربي، نجم استُخدم قرون في الملاحة. قولها بابتسامة، إنت خريج ملاحة. 5) الشركة صغيرة (شراكة Loft Orbital وMarlan Space بدأت 2024) وبتكبر، فخريج يقدر يتعلم بسرعة ويمسك شغل حقيقي."}},
{en:{title:"Likely recruiter questions and answer frames",tag:"practise each in 30 to 45 seconds",
 body:"Tell me about yourself: use the 60-second pitch. Why space navigation? A real story of when it clicked, then what you like (maths plus real hardware). Why Orbitworks and not another company? Use the five facts above, one sentence each. What do you know about Altair? 10 satellites, five sensors, onboard AI, Altair-1 launched 1 Oct 2026, the other nine in 2027. Your biggest strength and a weakness? Real strength with an example, and a real weakness with what you are doing about it. Are you comfortable with shift or on-call work? Ask what it looks like, say honestly what works. Availability, notice and salary: know your start date and give a researched range or ask about the band first. Visa and location: be clear about your status and willingness to work on site in Abu Dhabi. Where do you see yourself in 3 years? Growing into a navigation or operations specialist on real missions."},
 ar:{title:"أسئلة الريكروتر المتوقعة وهيكل الإجابة",tag:"اتمرن على كل واحد في 30 لـ 45 ثانية",
 body:"احكيلي عن نفسك: استخدم تعريف الـ60 ثانية. ليه ملاحة الفضاء؟ قصة حقيقية عن اللحظة اللي حبيتها فيها، وبعدين إيه اللي بتحبه (رياضة مع عتاد حقيقي). ليه Orbitworks مش شركة تانية؟ استخدم النقاط الخمسة، جملة لكل واحدة. تعرف إيه عن Altair؟ 10 أقمار وخمس حساسات وذكاء على المتن واطلاق Altair-1 في 1 أكتوبر 2026 والتسعة الباقيين في 2027. أقوى نقطة فيك وضعف؟ قوة حقيقية بمثال، وضعف حقيقي مع اللي بتعمله عشانه. مرتاح لشغل ورديات أو on-call؟ اسأل شكله إيه وقول بصراحة اللي يناسبك. المواعيد والإشعار والراتب: اعرف تاريخ بدايتك وادي نطاق مدروس أو اسأل عن النطاق الأول. الإقامة والمكان: وضّح وضعك واستعدادك للشغل في الموقع بأبوظبي. إنت فين بعد 3 سنين؟ بكبر لمتخصص ملاحة أو عمليات على مهام حقيقية."}},
{en:{title:"Questions to ask Lobhana",tag:"shows real interest",
 body:"Pick three. 1) 'Which teams would a graduate with a space navigation background fit best: operations, flight dynamics, onboard software or AIT?' 2) 'What does the first six months look like for a new graduate?' 3) 'How do the teams in Abu Dhabi work with Loft Orbital's teams on operations and onboard software?' 4) 'What are the next steps and timeline after this call?' 5) 'Is there a technical screening or a task, and how should I prepare?' 6) 'What do you enjoy most about working at Orbitworks?' Avoid asking about salary and perks first. Do not ask things the website already answers."},
 ar:{title:"أسئلة تسألها لـLobhana",tag:"بتوري اهتمام حقيقي",
 body:"اختار تلاتة. 1) أنهي فرق بتناسب خريج خلفيته ملاحة فضاء أكتر: العمليات أو ديناميكا الطيران أو برمجيات المتن أو AIT؟ 2) شكل أول ستة شهور لخريج جديد إيه؟ 3) الفرق في أبوظبي بتشتغل مع فرق Loft Orbital في العمليات وبرمجيات المتن إزاي؟ 4) الخطوات الجاية والجدول الزمني بعد المكالمة دي إيه؟ 5) فيه فرز تقني أو مهمة، وأتحضر لها إزاي؟ 6) إيه أكتر حاجة بتحبها في الشغل في Orbitworks؟ متسألش عن الراتب والمزايا الأول. ومتسألش حاجة الموقع بيجاوب عليها."}},
{en:{title:"Do, don't and the 1-hour checklist",tag:"Tuesday 12:00 to 1:00 pm",
 body:"Do: speak clearly, answer in 30 to 60 seconds, use one concrete example, say 'I do not know yet, here is how I would find out' when stuck. Don't: invent experience, criticise a past employer, or recite numbers you are not sure about. Checklist: open the invite and test the link; test microphone, camera and internet; quiet room, phone on silent; CV, pitch and the three questions in front of you; water; re-read the Orbitworks briefing and the Altair facts; one deep breath. Have a pen and paper for names and next steps. Afterwards send a short thank-you note to Lobhana the same day."},
 ar:{title:"اعمل ومتعملش، وقائمة آخر ساعة",tag:"الثلاثاء 12:00 لـ 1:00 ظهرًا",
 body:"اعمل: اتكلم بوضوح وجاوب في 30 لـ 60 ثانية واستخدم مثال واحد محدد، وقول 'لسه معرفش، وده اللي هعمله عشان أعرف' لو وقفت. متعملش: متألفش خبرة ومتنتقدش شغل سابق ومتقولش أرقام مش متأكد منها. القائمة: افتح الدعوة وجرّب الرابط؛ جرّب المايك والكاميرا والإنترنت؛ أوضة هادية والموبايل صامت؛ السيرة الذاتية والتعريف والأسئلة التلاتة قدامك؛ مية؛ راجع ملخص Orbitworks وحقايق Altair؛ نفس عميق. وخلّي قلم وورقة للأسماء والخطوات الجاية. وبعدها ابعت رسالة شكر قصيرة لـLobhana في نفس اليوم."}}
];

/* ---------- formula sheet ---------- */
const OW_FORMULAS=[
 ["μ (Earth)","398,600 km³/s²"],["Earth radius","6,378 km"],
 ["Circular speed","v = √(μ/r)"],["Period","T = 2π√(a³/μ)"],
 ["Vis-viva","v² = μ(2/r − 1/a)"],["Altair-1 class (508 km)","7.61 km/s · 94.8 min"],
 ["SSO precession","0.9856°/day → i ≈ 97.4° at 508 km"],["Pseudorange","ρ = r + c·δt + errors"],
 ["Ground error","≈ altitude × pointing error"],["FSPL","20log10(d km)+20log10(f MHz)+32.44 dB"],
 ["Max pass at 508 km","11.7 min (7.5 with 10° mask)"],["GPS L1","1575.42 MHz"]
];

/* ---------- quiz (8 questions) ---------- */
QUIZ.ow=[
{en:{q:"Why do Earth-observation satellites like Altair-1 often fly sun-synchronous orbits?",o:["They pass each place at the same local solar time, so lighting is consistent","They stay above one city","They need no fuel at all","They are faster than any other orbit"]},ar:{q:"ليه أقمار رصد الأرض زي Altair-1 بتطير غالبًا في مدارات متزامنة مع الشمس؟",o:["بتعدي على كل مكان في نفس الوقت الشمسي المحلي فالإضاءة ثابتة","بتفضل فوق مدينة واحدة","مش محتاجة وقود خالص","أسرع من أي مدار تاني"]},a:0},
{en:{q:"A circular orbit at 508 km has a period of about:",o:["24 hours","12 hours","95 minutes","10 minutes"]},ar:{q:"زمن الدورة لمدار دائري على 508 كم حوالي:",o:["24 ساعة","12 ساعة","95 دقيقة","10 دقايق"]},a:2},
{en:{q:"How many satellites does a GNSS receiver need to solve x, y, z and its clock bias?",o:["1","2","3","At least 4"]},ar:{q:"كام قمر محتاج مستقبل GNSS عشان يحل x وy وz وانحياز الساعة؟",o:["1","2","3","4 على الأقل"]},a:3},
{en:{q:"What does a Kalman filter do between measurements?",o:["Nothing","Predicts the state with a model and lets uncertainty grow","Deletes old data","Turns the receiver off"]},ar:{q:"فلتر كالمان بيعمل إيه بين القياسات؟",o:["مفيش","بيتوقع الحالة بنموذج وعدم اليقين بيكبر","بيمسح البيانات القديمة","بيطفي المستقبل"]},a:1},
{en:{q:"Which sensor gives the best attitude accuracy (arc-seconds)?",o:["Sun sensor","Magnetometer","Star tracker","Thermometer"]},ar:{q:"أنهي حساس بيدي أفضل دقة اتجاه (ثواني قوسية)؟",o:["حساس شمس","مغناطيسي","متتبع نجوم","ترمومتر"]},a:2},
{en:{q:"A reaction wheel saturates. What fixes it?",o:["Magnetorquers dump the stored momentum","Turn the satellite off","Add more solar panels","Wait for the Moon"]},ar:{q:"عجلة التفاعل اتشبعت. إيه الحل؟",o:["الملفات المغناطيسية بتفرّغ الزخم المخزّن","نطفي القمر","نزود ألواح شمسية","نستنى القمر"]},a:0},
{en:{q:"At 508 km, a 0.1° pointing error moves an image by roughly:",o:["9 m","90 m","900 m","90 km"]},ar:{q:"على 508 كم، خطأ توجيه 0.1° بيزحزح الصورة تقريبًا:",o:["9 متر","90 متر","900 متر","90 كم"]},a:2},
{en:{q:"Which fact about Orbitworks is correct?",o:["It built Altair-1, launched 1 Oct 2026, first of ten Earth-observation satellites","It only operates satellites built abroad","It builds rockets","It was founded in 1990"]},ar:{q:"أنهي معلومة عن Orbitworks صحيحة؟",o:["بنت Altair-1 اللي اتطلق 1 أكتوبر 2026، أول عشرة أقمار رصد أرض","بتشغّل أقمار مبنية بره بس","بتبني صواريخ","اتأسست في 1990"]},a:0}
];
