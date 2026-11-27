/* Mission Lab service worker: app shell + photos work offline. AI calls are never cached. */
const V="lab-v11";
const SHELL=["./","index.html","lab.css","hub.css","lab.js","common.js","space.js","ai.js","listen.js","mock.js","diagrams.js","motion.js","hub.js","content.js","orbitworks.js","orbitworks.css","ow-content.js","ow-diagrams.js","ow-nova.js","najm.js","najm.css","glow.css","glow.js","glow-content.js","nova-plus.js","manifest.webmanifest",
"assets/nova.svg","assets/icons/icon-192.png","assets/icons/icon-512.png",
"assets/img/uno.jpg","assets/img/rpi4.jpg","assets/img/iss.jpg","assets/img/hubble.jpg","assets/img/sputnik.jpg","assets/img/galileo.jpg","assets/img/hope-mars.jpg","assets/img/hope-model.jpg","assets/img/gps-launch.jpg","assets/img/cubesat.jpg","assets/img/starlink.jpg","assets/img/ground-station.jpg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=="GET"||u.origin!==location.origin)return;
  const isImg=u.pathname.includes("/assets/");
  if(isImg){e.respondWith(caches.match(r).then(h=>h||fetch(r).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put(r,c));return n})));return}
  e.respondWith(fetch(r).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put(r,c));return n}).catch(()=>caches.match(r).then(h=>h||caches.match("index.html"))));
});
