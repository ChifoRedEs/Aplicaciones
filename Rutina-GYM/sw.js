const CACHE="rutina-gym-v2-1";
const ASSETS=[
"./","./index.html","./manifest.json","./css/app.css",
"./js/app.js","./js/backup.js","./js/data.js","./js/db.js",
"./js/exercise-manager.js","./js/migration.js","./js/state.js",
"./js/stats.js","./js/timer.js","./js/ui.js","./js/workouts.js",
"./data/exercises.js"
];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const x=r.clone();caches.open(CACHE).then(c=>c.put(e.request,x));return r}).catch(()=>caches.match("./index.html"))))
});