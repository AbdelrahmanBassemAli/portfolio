(function(){
var S=[
['home','happy','Scroll down, I\'ll fly with you!'],
['about','happy','That\'s the human behind the builds.'],
['skills','thinking','Hmm, so many tools. Where to start?'],
['projects','excited','These are my favorite builds!'],
['rover','excited','Rover time! Watch it roll.'],
['experience','happy','Real missions, real hands-on work.'],
['mentorship','happy','He loves teaching, too.'],
['teaching-portfolio','thinking','Lesson plans, checking them twice...'],
['credentials','thinking','Credentials loaded. Checking... all good.'],
['lab','excited','Mission Lab! Tap the demos.'],
['systems','thinking','Systems check. Everything nominal.'],
['navigation','thinking','Plotting a course through the stars...'],
['drive','excited','Take the wheel, I\'ll navigate!'],
['contact','excited','We made it! Now say hi.']];
var FACE={happy:'\uD83D\uDE0A',thinking:'\uD83E\uDD14',excited:'\uD83E\uDD29'},NAME={happy:'Happy',thinking:'Thinking',excited:'Excited'};
var bub,fl,cur=null,hideT,lastY=scrollY,vel=0,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
function buddy(){return document.querySelector('.orbit-buddy')}
function mk(){
 bub=document.createElement('div');bub.className='cmp-bubble';bub.setAttribute('aria-hidden','true');
 bub.innerHTML='<div class="cmp-mood"><b></b><i></i><span></span></div><p></p>';document.body.appendChild(bub);
 fl=document.createElement('div');fl.className='cmp-flame';fl.setAttribute('aria-hidden','true');document.body.appendChild(fl);
 document.body.classList.add('cmp-on');
}
function active(){
 var h=innerHeight*.45,best=S[0];
 for(var i=0;i<S.length;i++){var e=document.getElementById(S[i][0]);if(!e)continue;var r=e.getBoundingClientRect();if(r.top<=h&&r.bottom>h){return S[i]}if(r.top<=h)best=S[i]}
 return best;
}
function say(s){
 bub.dataset.mood=s[1];document.body.dataset.cmpMood=s[1];
 bub.querySelector('i').textContent=FACE[s[1]];bub.querySelector('span').textContent=NAME[s[1]];bub.querySelector('p').textContent=s[2];
 show();
}
function show(){bub.classList.add('on');clearTimeout(hideT);hideT=setTimeout(function(){bub.classList.remove('on')},5200)}
function place(){
 var b=buddy();if(!b)return;
 var r=b.getBoundingClientRect(),cs=getComputedStyle(b);
 var gone=b.classList.contains('is-open')||parseFloat(cs.opacity)<.2||document.querySelector('.orbit-buddy .buddy-body[aria-expanded=true]');
 var body=b.querySelector('.buddy-body'),br=body?body.getBoundingClientRect():r;
 bub.style.right=Math.max(6,innerWidth-br.right+4)+'px';
 bub.style.bottom=(innerHeight-br.top+6)+'px';
 bub.style.visibility=gone?'hidden':'visible';
 fl.style.left=(br.left+br.width/2-7)+'px';fl.style.top=(br.bottom-14)+'px';
 fl.style.height=Math.min(46,Math.abs(vel)*1.1)+'px';fl.style.opacity=gone?0:Math.min(1,Math.abs(vel)/8);
}
function tick(){
 var y=scrollY;vel=vel*.8+(y-lastY)*.2;lastY=y;
 var b=buddy();
 if(b){
  if(!bub)mk();
  if(!reduce){var d=Math.max(-1,Math.min(1,vel/18));b.style.setProperty('--cmp-r',(d*10)+'deg');b.style.setProperty('--cmp-x',(-Math.abs(d)*6)+'px')}
  var s=active();if(!cur||s[0]!==cur[0]){cur=s;say(s)}
  place();
 }
 requestAnimationFrame(tick);
}
addEventListener('pointerdown',function(e){var b=buddy();if(bub&&b&&b.contains(e.target)===false&&cur){}},true);
addEventListener('load',function(){requestAnimationFrame(tick)});
if(document.readyState==='complete')requestAnimationFrame(tick);
})();
