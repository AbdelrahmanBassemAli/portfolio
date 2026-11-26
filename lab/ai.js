"use strict";
/* AI in Python area: lessons, regression playground, k-NN playground, NOVA knowledge */
Object.assign(STR.en,{
 aiTitle:"AI in Python, from zero",aiHint:"Machine learning means the computer finds the rule from examples. Play with two live demos, then read the Python lessons that match them.",
 regTitle:"Demo 1: Linear regression",regHint:"Tap the chart to add points. The line is the best straight fit (least squares), recalculated live. This is what LinearRegression().fit() does.",
 regSample:"Sample data",regClear:"Clear",regEq:"Line",regErr:"Average error",regPred:"Prediction at x = 10",regNeed:"Add at least 2 points",
 knnTitle:"Demo 2: k-Nearest Neighbours",knnHint:"Pick a class and tap to add points. The colours show how the model would classify every spot by voting among its k closest points. Change k and watch the border move.",
 knnA:"Class A",knnB:"Class B",knnK:"k (neighbours)",knnReset:"Reset",knnPts:"Points",
 aiLessonsTitle:"Python lessons for AI"});
Object.assign(STR.ar,{
 aiTitle:"الذكاء الاصطناعي بالبايثون، من الصفر",aiHint:"تعلّم الآلة معناه الكمبيوتر يلاقي القاعدة من الأمثلة. جرّب عرضين مباشرين، وبعدين اقرا دروس البايثون المطابقة ليهم.",
 regTitle:"عرض 1: الانحدار الخطي",regHint:"دوس على الرسم عشان تضيف نقط. الخط هو أفضل خط مستقيم يناسب النقط (المربعات الصغرى) ويتحسب على طول. ده اللي بتعمله LinearRegression().fit().",
 regSample:"بيانات تجريبية",regClear:"مسح",regEq:"الخط",regErr:"متوسط الخطأ",regPred:"التوقع عند x = 10",regNeed:"ضيف نقطتين على الأقل",
 knnTitle:"عرض 2: أقرب الجيران k-NN",knnHint:"اختار فئة ودوس عشان تضيف نقط. الألوان بتوضح إزاي النموذج هيصنّف كل مكان بالتصويت بين أقرب k نقطة. غيّر k وشوف الحد بيتحرك.",
 knnA:"الفئة A",knnB:"الفئة B",knnK:"k (الجيران)",knnReset:"إعادة",knnPts:"النقط",
 aiLessonsTitle:"دروس بايثون للذكاء الاصطناعي"});

const AILESS=[
{en:{title:"What is machine learning?",tag:"rules vs examples",body:"In normal programming you write the rules. In machine learning you give examples and the computer finds the rules. Three families: supervised learning (examples come with answers, like photos labelled cat or dog), unsupervised learning (find groups with no answers), and reinforcement learning (learn by trial and reward, like a robot learning to walk).",cap:"Data in, rule out."},
 ar:{title:"يعني إيه تعلّم آلة؟",tag:"قواعد مقابل أمثلة",body:"في البرمجة العادية إنت بتكتب القواعد. في تعلّم الآلة بتدّي أمثلة والكمبيوتر بيلاقي القواعد. تلات عائلات: التعلّم الموجّه (الأمثلة معاها إجابات، زي صور متعلّم عليها قطة أو كلب)، والتعلّم غير الموجّه (يلاقي مجموعات من غير إجابات)، والتعلّم المعزّز (يتعلم بالتجربة والمكافأة، زي روبوت بيتعلم يمشي).",cap:"بيانات داخلة، قاعدة طالعة."},
 code:'# Normal programming: YOU write the rule\ndef is_hot(temp):\n    return temp > 35\n\n# Machine learning: the computer FINDS the rule\nexamples = [(20, "cool"), (30, "cool"), (38, "hot"), (42, "hot")]\n# a model would learn the boundary near 34-35 from these'},
{en:{title:"Data with NumPy",tag:"arrays and statistics",body:"Almost all AI in Python starts with NumPy. An array holds many numbers and works on all of them at once, without loops. You will use mean, standard deviation, slicing and reshaping all the time. Pandas builds tables on top of it.",cap:"pip install numpy pandas scikit-learn"},
 ar:{title:"البيانات مع NumPy",tag:"المصفوفات والإحصاء",body:"تقريبًا كل الذكاء الاصطناعي في بايثون بيبدأ بـNumPy. المصفوفة بتشيل أرقام كتير وبتشتغل عليهم كلهم مرة واحدة من غير حلقات. هتستخدم المتوسط والانحراف المعياري والتقطيع وتغيير الشكل طول الوقت. وPandas بتبني جداول فوقها.",cap:"pip install numpy pandas scikit-learn"},
 code:'import numpy as np\n\naltitudes = np.array([400, 550, 20200, 35786])   # km\nperiods = np.array([92.7, 95.6, 718, 1436])      # minutes\n\nprint(altitudes.mean())      # average\nprint(periods.max())         # biggest value\nprint(altitudes / 1000)      # whole array at once'},
{en:{title:"Your first model: linear regression",tag:"predict a number",body:"Regression predicts a number. You give it inputs X (hours studied) and answers y (scores). fit() finds the best line, predict() uses it on new inputs. Try demo 1 above: it is the same idea, with the line recalculated on every tap.",cap:"The line is y = m·x + b. fit() finds m and b."},
 ar:{title:"أول نموذج ليك: الانحدار الخطي",tag:"توقّع رقم",body:"الانحدار بيتوقع رقم. بتدّيه المدخلات X (ساعات المذاكرة) والإجابات y (الدرجات). fit() بتلاقي أفضل خط، وpredict() بتستخدمه على مدخلات جديدة. جرّب العرض 1 فوق: نفس الفكرة والخط بيتحسب من جديد مع كل دوسة.",cap:"الخط هو y = m·x + b. وfit() بتلاقي m وb."},
 code:'from sklearn.linear_model import LinearRegression\n\nX = [[1], [2], [3], [4], [5]]   # hours studied\ny = [52, 58, 66, 71, 80]        # exam score\n\nmodel = LinearRegression().fit(X, y)\nprint(model.predict([[6]]))     # about 86'},
{en:{title:"Classification with k-NN",tag:"predict a category",body:"Classification predicts a label. k-Nearest Neighbours is the friendliest algorithm: to classify a new point, look at the k closest known points and take a vote. We hold back 20 percent of the data (train_test_split) to test on examples the model never saw. Try demo 2 above.",cap:"Always test on data the model has not seen."},
 ar:{title:"التصنيف بـk-NN",tag:"توقّع فئة",body:"التصنيف بيتوقع تسمية. أقرب الجيران k-NN أطيب خوارزمية: عشان تصنّف نقطة جديدة بتبص على أقرب k نقطة معروفة وتعمل تصويت. بنحجز 20 في المية من البيانات (train_test_split) عشان نختبر على أمثلة النموذج ما شافهاش. جرّب العرض 2 فوق.",cap:"اختبر دايمًا على بيانات النموذج ما شافهاش."},
 code:'from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.neighbors import KNeighborsClassifier\n\nX, y = load_iris(return_X_y=True)\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=0)\n\nknn = KNeighborsClassifier(n_neighbors=3).fit(X_tr, y_tr)\nprint("accuracy:", knn.score(X_te, y_te))'},
{en:{title:"Overfitting: memorising is not learning",tag:"train vs test score",body:"A model that is too flexible memorises the training data, noise included, and then fails on new data. The warning sign: a very high training score but a much lower test score. Fixes: more data, a simpler model, or stopping earlier. In the k-NN demo, k = 1 hugs every point, including mistakes.",cap:"Good model = good on data it has never seen."},
 ar:{title:"الحفظ الزايد: الحفظ مش تعلّم",tag:"درجة التدريب مقابل الاختبار",body:"نموذج مرن زيادة بيحفظ بيانات التدريب بما فيها التشويش، وبعدين يفشل على البيانات الجديدة. العلامة التحذيرية: درجة تدريب عالية جدًا ودرجة اختبار أقل بكتير. الحلول: بيانات أكتر أو نموذج أبسط أو التوقف بدري. في عرض k-NN لما k = 1 الحد بيلزق في كل نقطة حتى الغلطات.",cap:"النموذج الكويس = كويس على بيانات عمره ما شافها."},
 code:'from sklearn.tree import DecisionTreeClassifier\n\nfor depth in [1, 3, None]:          # None = grow without limit\n    tree = DecisionTreeClassifier(max_depth=depth, random_state=0)\n    tree.fit(X_tr, y_tr)\n    print(depth, tree.score(X_tr, y_tr), tree.score(X_te, y_te))\n# compare the train score with the test score'},
{en:{title:"A tiny neural network",tag:"layers, weights, training",body:"A neural network is layers of simple units. Each one multiplies its inputs by weights, adds them, and applies an activation such as ReLU. Training adjusts the weights step by step (gradient descent) to reduce the loss, the number that measures how wrong the model is. Keras lets you build one in a few lines.",cap:"Learning rate too big: it overshoots. Too small: it takes forever."},
 ar:{title:"شبكة عصبية صغيرة",tag:"طبقات وأوزان وتدريب",body:"الشبكة العصبية طبقات من وحدات بسيطة. كل وحدة بتضرب مدخلاتها في أوزان وتجمعها وتطبّق دالة تنشيط زي ReLU. التدريب بيعدّل الأوزان خطوة بخطوة (الانحدار التدريجي) لتقليل الخسارة، الرقم اللي بيقيس النموذج غلطان قد إيه. وKeras بتخليك تبني واحدة في كام سطر.",cap:"معدل التعلّم كبير: بيتخطى. صغير: بياخد وقت طويل."},
 code:'import tensorflow as tf\n\nmodel = tf.keras.Sequential([\n    tf.keras.layers.Dense(8, activation="relu", input_shape=(4,)),\n    tf.keras.layers.Dense(3, activation="softmax"),\n])\nmodel.compile(optimizer="adam",\n              loss="sparse_categorical_crossentropy",\n              metrics=["accuracy"])\nmodel.fit(X_tr, y_tr, epochs=50, verbose=0)\nprint(model.evaluate(X_te, y_te, verbose=0))'},
{en:{title:"Seeing with OpenCV",tag:"computer vision on a Raspberry Pi",body:"OpenCV reads camera frames as NumPy arrays, so everything you learned still applies. Classic steps: convert to grey, blur, find edges, then find shapes. Deep-learning detection (people, objects, lane lines) runs on a Pi with TensorFlow Lite. This is how a robot sees.",cap:"Same code runs on a laptop webcam and a Pi camera."},
 ar:{title:"الرؤية بـOpenCV",tag:"رؤية حاسوبية على راسبيري باي",body:"OpenCV بتقرا إطارات الكاميرا كمصفوفات NumPy، فكل اللي اتعلمته لسه ينفع. الخطوات الكلاسيكية: تحويل لرمادي، تغبيش، إيجاد الحواف، وبعدين إيجاد الأشكال. وكشف الأجسام بالتعلّم العميق (أشخاص، أجسام، خطوط الطريق) بيشتغل على الباي بـTensorFlow Lite. كده الروبوت بيشوف.",cap:"نفس الكود بيشتغل على كاميرا اللابتوب وكاميرا الباي."},
 code:'import cv2\n\ncap = cv2.VideoCapture(0)        # camera 0\nok, frame = cap.read()\ngray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)\nedges = cv2.Canny(gray, 100, 200)\ncv2.imwrite("edges.png", edges)\ncap.release()'},
{en:{title:"Space project: spot a bad sensor reading",tag:"anomaly detection",body:"Satellites send telemetry: temperatures, voltages, currents. An easy anomaly detector uses the z-score: how many standard deviations a reading is from the average. Anything beyond 2 or 3 deserves a look. Real systems use richer models, but the idea is the same, and it is a nice story for a space interview.",cap:"Here the 35.2 reading is flagged, the normal ones are not."},
 ar:{title:"مشروع فضاء: اكتشف قراءة حساس غلط",tag:"اكتشاف الشذوذ",body:"الأقمار بتبعت تليمترية: درجات حرارة وجهود وتيارات. أسهل كاشف شذوذ بيستخدم الـz-score: القراءة بعيدة كام انحراف معياري عن المتوسط. أي حاجة فوق 2 أو 3 تستاهل نظرة. الأنظمة الحقيقية بتستخدم نماذج أغنى بس الفكرة واحدة، وهي حكاية حلوة لمقابلة فضاء.",cap:"هنا قراءة 35.2 اتعلّمت والعادية لأ."},
 code:'import numpy as np\n\ntemps = np.array([21.0, 21.4, 20.8, 21.1, 35.2, 21.3])  # battery, deg C\nz = (temps - temps.mean()) / temps.std()\nprint(temps[abs(z) > 2])        # [35.2]'}];

const RW=640,RH=340,KW=640,KH=340;
let regPts=[],regCtx,knnCtx,knnPts=[],knnCls="A",knnK=3;
const RX=x=>x/10*RW,RY=y=>RH-y/10*RH;
function seedReg(){regPts=[];for(let i=0;i<9;i++){const x=0.6+i*1.05+Math.random()*0.4;regPts.push({x,y:Math.max(0.3,Math.min(9.7,1.2+0.75*x+(Math.random()-.5)*2.2))})}}
function seedKnn(){knnPts=[];const g=()=>(Math.random()+Math.random()+Math.random()-1.5);
  for(let i=0;i<14;i++){knnPts.push({x:200+g()*90,y:110+g()*80,c:"A"});knnPts.push({x:430+g()*90,y:230+g()*80,c:"B"})}}
function buildAi(){
  const root=document.getElementById("aiRoot");
  root.innerHTML=`
  <section class="panel"><h2 data-i18n="aiTitle"></h2><p class="hint" data-i18n="aiHint"></p></section>
  <section class="panel" id="regPanel">
    <h2 data-i18n="regTitle"></h2><p class="hint" data-i18n="regHint"></p>
    <div class="presets"><button type="button" id="regSampleBtn" data-i18n="regSample"></button><button type="button" id="regClearBtn" data-i18n="regClear"></button></div>
    <div class="sim"><canvas id="regCanvas" aria-label="linear regression playground"></canvas></div>
    <div class="readouts" id="regRead"></div>
  </section>
  <section class="panel" id="knnPanel">
    <h2 data-i18n="knnTitle"></h2><p class="hint" data-i18n="knnHint"></p>
    <div class="presets"><button type="button" id="kA" class="on"></button><button type="button" id="kB"></button><button type="button" id="kReset" data-i18n="knnReset"></button></div>
    <div class="sim"><canvas id="knnCanvas" aria-label="k nearest neighbours playground"></canvas></div>
    <div class="sliders"><label><span><b data-i18n="knnK"></b> <output id="kOut"></output></span><input type="range" id="kIn" min="1" max="9" step="2" value="3"></label></div>
    <div class="readouts" id="knnRead"></div>
  </section>
  <section class="panel"><h2 data-i18n="aiLessonsTitle"></h2><div class="lessons" id="aiLessons"></div></section>`;
  regCtx=fitCanvas(document.getElementById("regCanvas"),RW,RH);
  knnCtx=fitCanvas(document.getElementById("knnCanvas"),KW,KH);
  seedReg();seedKnn();
  const rc=document.getElementById("regCanvas");
  rc.addEventListener("click",e=>{const p=canvasPt(rc,e,RW,RH);regPts.push({x:p.x/RW*10,y:(RH-p.y)/RH*10});regDraw()});
  document.getElementById("regSampleBtn").addEventListener("click",()=>{seedReg();regDraw()});
  document.getElementById("regClearBtn").addEventListener("click",()=>{regPts=[];regDraw()});
  const kc=document.getElementById("knnCanvas");
  kc.addEventListener("click",e=>{const p=canvasPt(kc,e,KW,KH);knnPts.push({x:p.x,y:p.y,c:knnCls});knnDraw()});
  document.getElementById("kA").addEventListener("click",()=>{knnCls="A";knnBtns()});
  document.getElementById("kB").addEventListener("click",()=>{knnCls="B";knnBtns()});
  document.getElementById("kReset").addEventListener("click",()=>{seedKnn();knnDraw()});
  document.getElementById("kIn").addEventListener("input",e=>{knnK=+e.target.value;knnDraw()});
}
function knnBtns(){document.getElementById("kA").classList.toggle("on",knnCls==="A");document.getElementById("kB").classList.toggle("on",knnCls==="B")}
function regFit(){
  const n=regPts.length;if(n<2)return null;
  const mx=regPts.reduce((s,p)=>s+p.x,0)/n,my=regPts.reduce((s,p)=>s+p.y,0)/n;
  let sxy=0,sxx=0;regPts.forEach(p=>{sxy+=(p.x-mx)*(p.y-my);sxx+=(p.x-mx)**2});
  if(sxx<1e-9)return null;const m=sxy/sxx,b=my-m*mx;
  const err=regPts.reduce((s,p)=>s+Math.abs(p.y-(m*p.x+b)),0)/n;
  return {m,b,err};
}
function regDraw(){
  if(!regCtx)return;const c=regCtx;
  c.clearRect(0,0,RW,RH);c.fillStyle="#071026";c.fillRect(0,0,RW,RH);
  c.strokeStyle="#56e4ff1a";c.lineWidth=1;
  for(let i=1;i<10;i++){c.beginPath();c.moveTo(RX(i),0);c.lineTo(RX(i),RH);c.moveTo(0,RY(i));c.lineTo(RW,RY(i));c.stroke()}
  const f=regFit();
  if(f){
    regPts.forEach(p=>{c.strokeStyle="#ff6b8a66";c.beginPath();c.moveTo(RX(p.x),RY(p.y));c.lineTo(RX(p.x),RY(f.m*p.x+f.b));c.stroke()});
    c.strokeStyle="#ffd479";c.lineWidth=3;c.beginPath();c.moveTo(0,RY(f.b));c.lineTo(RW,RY(f.m*10+f.b));c.stroke();
  }
  regPts.forEach(p=>{c.fillStyle="#56e4ff";c.beginPath();c.arc(RX(p.x),RY(p.y),6,0,7);c.fill()});
  document.getElementById("regRead").innerHTML=f?
   `<div><i>${t("regEq")}</i><b dir="ltr">y = ${f.m.toFixed(2)}x ${f.b<0?"−":"+"} ${Math.abs(f.b).toFixed(2)}</b></div><div><i>${t("regErr")}</i><b>${f.err.toFixed(2)}</b></div><div><i>${t("regPred")}</i><b>${(f.m*10+f.b).toFixed(1)}</b></div>`:
   `<div><i></i><b>${t("regNeed")}</b></div>`;
}
function knnClass(x,y,k){
  const d=knnPts.map(p=>({c:p.c,d:(p.x-x)**2+(p.y-y)**2})).sort((a,b)=>a.d-b.d).slice(0,k);
  let a=0;d.forEach(q=>{if(q.c==="A")a++});return a*2>d.length?"A":(a*2===d.length?"A":"B");
}
function knnDraw(){
  if(!knnCtx)return;const c=knnCtx;
  document.getElementById("kOut").textContent=knnK;
  c.clearRect(0,0,KW,KH);c.fillStyle="#071026";c.fillRect(0,0,KW,KH);
  if(knnPts.length){for(let x=0;x<KW;x+=16)for(let y=0;y<KH;y+=16){c.fillStyle=knnClass(x+8,y+8,knnK)==="A"?"#56e4ff30":"#ffd47938";c.fillRect(x,y,16,16)}}
  knnPts.forEach(p=>{c.fillStyle=p.c==="A"?"#56e4ff":"#ffd479";c.strokeStyle="#050b1b";c.lineWidth=2;c.beginPath();c.arc(p.x,p.y,6,0,7);c.fill();c.stroke()});
  document.getElementById("knnRead").innerHTML=`<div><i>${t("knnPts")}</i><b>${knnPts.length}</b></div><div><i>k</i><b>${knnK}</b></div>`;
}
function renderAi(){
  if(!document.getElementById("aiLessons"))return;
  document.getElementById("kA").textContent=t("knnA");document.getElementById("kB").textContent=t("knnB");
  mountAcc(document.getElementById("aiLessons"),AILESS,0);
  regDraw();knnDraw();
}
buildAi();
EXT_RENDER.push(renderAi);

KB.push(
{keys:["what is ai","what is artificial intelligence","what is machine learning","machine learning","what is ml","الذكاء الاصطناعي","ما هو الذكاء الاصطناعي","تعلم الالة","تعلّم الآلة","ما هو تعلم الالة"],boost:2,
 en:"Machine learning means the computer finds the rule from examples instead of you writing it. Three families: supervised (examples with answers), unsupervised (find groups with no answers) and reinforcement learning (learn from reward). AI is the bigger field, and machine learning is the part that learns from data. Open the AI in Python tab to play with two live demos.",
 ar:"تعلّم الآلة معناه الكمبيوتر يلاقي القاعدة من الأمثلة بدل ما إنت تكتبها. تلات عائلات: الموجّه (أمثلة معاها إجابات) وغير الموجّه (يلاقي مجموعات من غير إجابات) والتعزيزي (يتعلم من المكافأة). الذكاء الاصطناعي المجال الأكبر، وتعلّم الآلة الجزء اللي بيتعلم من البيانات. افتح تبويب الذكاء الاصطناعي وجرّب عرضين مباشرين."},
{keys:["supervised","unsupervised","reinforcement learning","classification vs regression","موجه","غير موجه","تعلم معزز","التعلم المعزز"],boost:3,
 en:"Supervised learning uses labelled examples: regression predicts a number (a price), classification predicts a category (cat or dog). Unsupervised learning finds structure without labels, for example clustering. Reinforcement learning learns by trial and reward, like a robot learning to balance.",
 ar:"التعلّم الموجّه بيستخدم أمثلة متعلّم عليها: الانحدار بيتوقع رقم (سعر) والتصنيف بيتوقع فئة (قطة أو كلب). غير الموجّه بيلاقي بنية من غير تسميات، زي التجميع. والتعزيزي بيتعلم بالتجربة والمكافأة زي روبوت بيتعلم يتزن."},
{keys:["linear regression","regression","line of best fit","least squares","الانحدار","انحدار خطي","الانحدار الخطي"],boost:3,
 en:"Linear regression fits the straight line y = m·x + b that is closest to your points, by minimising the squared errors (least squares). In Python: LinearRegression().fit(X, y) then predict(). Tap points in demo 1 and watch the line and the error change.",
 ar:"الانحدار الخطي بيلاقي الخط المستقيم y = m·x + b الأقرب لنقطك بتقليل مربعات الأخطاء (المربعات الصغرى). في بايثون: LinearRegression().fit(X, y) وبعدين predict(). دوس على نقط في العرض 1 وشوف الخط والخطأ بيتغيروا."},
{keys:["knn","k-nn","k nearest","nearest neighbor","nearest neighbour","classification","اقرب الجيران","التصنيف","اقرب جار"],boost:3,
 en:"k-Nearest Neighbours classifies a new point by looking at the k closest known points and taking a vote. Small k follows every point and can overfit, large k is smoother. In scikit-learn: KNeighborsClassifier(n_neighbors=3).fit(X, y). Try demo 2 and change k.",
 ar:"أقرب الجيران k-NN بيصنّف نقطة جديدة بالبص على أقرب k نقطة معروفة وعمل تصويت. k صغير بيتبع كل نقطة وممكن يحفظ زيادة، وk كبير أنعم. في scikit-learn: KNeighborsClassifier(n_neighbors=3).fit(X, y). جرّب العرض 2 وغيّر k."},
{keys:["overfitting","overfit","underfitting","train test split","test set","حفظ زايد","اوفر فيتنج","فرط التخصيص"],boost:3,
 en:"Overfitting is when a model memorises the training data, noise included, so it scores high in training but low on new data. Always split your data with train_test_split and compare the two scores. Fixes: more data, a simpler model, or early stopping.",
 ar:"الـoverfitting لما النموذج يحفظ بيانات التدريب بما فيها التشويش، فيجيب درجة عالية في التدريب وواطية على بيانات جديدة. قسّم بياناتك دايمًا بـtrain_test_split وقارن الدرجتين. الحلول: بيانات أكتر أو نموذج أبسط أو التوقف بدري."},
{keys:["neural network","neural net","deep learning","perceptron","relu","activation","شبكة عصبية","الشبكات العصبية","التعلم العميق"],boost:3,
 en:"A neural network is layers of simple units. Each unit multiplies inputs by weights, adds them and applies an activation like ReLU. Training adjusts the weights with gradient descent to lower the loss. In Keras: Sequential with Dense layers, compile(), then fit(). Deep learning just means many layers.",
 ar:"الشبكة العصبية طبقات من وحدات بسيطة. كل وحدة بتضرب المدخلات في أوزان وتجمعها وتطبّق دالة تنشيط زي ReLU. التدريب بيعدّل الأوزان بالانحدار التدريجي عشان تقل الخسارة. في Keras: Sequential بطبقات Dense وبعدين compile() وfit(). التعلّم العميق معناه طبقات كتير."},
{keys:["gradient descent","loss function","learning rate","انحدار تدريجي","دالة الخسارة","معدل التعلم"],boost:3,
 en:"Loss is a number that says how wrong the model is. Gradient descent moves each weight a small step in the direction that lowers the loss. The learning rate is the step size: too big and it overshoots, too small and it takes forever.",
 ar:"الخسارة رقم بيقول النموذج غلطان قد إيه. الانحدار التدريجي بيحرك كل وزن خطوة صغيرة في اتجاه بيقلل الخسارة. معدل التعلّم هو حجم الخطوة: كبير بيتخطى وصغير بياخد وقت طويل."},
{keys:["numpy","pandas","scikit","sklearn","libraries for ai","python libraries","مكتبات الذكاء","نمباي","باندا"],boost:3,
 en:"The core Python stack for AI: NumPy for arrays, pandas for tables, matplotlib for charts, scikit-learn for classic machine learning, and TensorFlow or PyTorch for neural networks. Start with NumPy and scikit-learn, they are enough for your first projects.",
 ar:"الأساس في بايثون للذكاء الاصطناعي: NumPy للمصفوفات وpandas للجداول وmatplotlib للرسوم وscikit-learn لتعلّم الآلة الكلاسيكي وTensorFlow أو PyTorch للشبكات العصبية. ابدأ بـNumPy وscikit-learn وهيكفوا لأول مشاريعك."},
{keys:["opencv","computer vision","tensorflow lite","tflite","edge ai","object detection","الرؤية الحاسوبية","اوبن سي في","كشف الاجسام"],boost:3,
 en:"Computer vision lets a robot see. OpenCV reads camera frames as NumPy arrays: grey, blur, edges, shapes. For deep-learning detection on a Raspberry Pi use TensorFlow Lite, which runs small optimised models on the device itself, called edge AI, with no internet needed.",
 ar:"الرؤية الحاسوبية بتخلي الروبوت يشوف. OpenCV بتقرا إطارات الكاميرا كمصفوفات NumPy: رمادي وتغبيش وحواف وأشكال. لكشف الأجسام بالتعلّم العميق على الراسبيري باي استخدم TensorFlow Lite اللي بيشغّل نماذج صغيرة محسّنة على الجهاز نفسه، واسمه edge AI، من غير إنترنت."},
{keys:["anomaly","anomaly detection","z-score","zscore","telemetry","ai for satellites","ai in space","اكتشاف الشذوذ","شذوذ","الذكاء الاصطناعي في الفضاء","تليمترية"],boost:3,
 en:"Anomaly detection spots readings that do not fit. A simple method is the z-score: how many standard deviations a reading is from the mean. For satellites you can watch battery temperature or voltage and flag values beyond 2 or 3. AI also helps with Earth-observation images, collision-risk prediction and autonomous operations, always with a human checking safety-critical decisions.",
 ar:"اكتشاف الشذوذ بيلاقي القراءات اللي مش مناسبة. طريقة بسيطة هي الـz-score: القراءة بعيدة كام انحراف معياري عن المتوسط. في الأقمار تقدر تراقب حرارة أو جهد البطارية وتعلّم القيم فوق 2 أو 3. والذكاء الاصطناعي كمان بيساعد في صور رصد الأرض وتوقع خطر التصادم والعمليات الذاتية، ودايمًا مع إنسان بيراجع القرارات الحساسة للسلامة."},
{keys:["llm","chatgpt","large language model","language model","generative ai","transformer","نموذج لغوي","شات جي بي تي","الذكاء التوليدي"],boost:3,
 en:"A large language model predicts the next word, billions of times, after training on huge amounts of text. That simple task makes it able to answer, summarise and write code. It can still be wrong with confidence, so always check important facts. I am an example of one.",
 ar:"النموذج اللغوي الكبير بيتوقع الكلمة الجاية، مليارات المرات، بعد تدريب على كمية ضخمة من النصوص. المهمة البسيطة دي بتخليه يجاوب ويلخص ويكتب كود. ولسه ممكن يغلط بثقة، فراجع المعلومات المهمة دايمًا. أنا مثال على واحد منهم."},
{keys:["first ai project","ai project idea","learn ai","how to start ai","start machine learning","ابدا ذكاء اصطناعي","ازاي ابدا الذكاء","مشروع ذكاء اصطناعي","فكرة مشروع"],boost:3,
 en:"A good path: 1) Python basics and NumPy. 2) Linear regression and k-NN with scikit-learn on a small dataset like iris. 3) One real mini project, for example a Raspberry Pi camera that recognises hand signs, or a telemetry anomaly detector. Finish small projects, they teach more than big plans.",
 ar:"مسار كويس: 1) أساسيات بايثون وNumPy. 2) الانحدار الخطي وk-NN بـscikit-learn على بيانات صغيرة زي iris. 3) مشروع صغير حقيقي، زي كاميرا راسبيري باي بتتعرف على إشارات اليد، أو كاشف شذوذ تليمترية. خلّص مشاريع صغيرة، بتعلّم أكتر من الخطط الكبيرة."}
);
CHIPSX.ai={
 en:["What is machine learning?","Explain linear regression","What is k-NN?","What is overfitting?","How does a neural network learn?","How can AI help satellites?","How do I start with AI?","What is an LLM?"],
 ar:["ما هو تعلّم الآلة؟","اشرحلي الانحدار الخطي","ما هو k-NN؟","يعني إيه overfitting؟","الشبكة العصبية بتتعلم إزاي؟","الذكاء الاصطناعي بيفيد الأقمار إزاي؟","ابدأ الذكاء الاصطناعي إزاي؟","ما هو النموذج اللغوي الكبير؟"]};
