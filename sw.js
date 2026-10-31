// Offline helper for Weg zur B1. build.py fills in the version and the file list.
const CACHE = 'wzb1-154ec0ccfb32';
const FILES = ["./", "apple-touch-icon.png", "fonts.css", "fonts/f0.woff2", "fonts/f1.woff2", "fonts/f10.woff2", "fonts/f11.woff2", "fonts/f12.woff2", "fonts/f13.woff2", "fonts/f14.woff2", "fonts/f15.woff2", "fonts/f16.woff2", "fonts/f17.woff2", "fonts/f18.woff2", "fonts/f19.woff2", "fonts/f2.woff2", "fonts/f20.woff2", "fonts/f3.woff2", "fonts/f4.woff2", "fonts/f5.woff2", "fonts/f6.woff2", "fonts/f7.woff2", "fonts/f8.woff2", "fonts/f9.woff2", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "index.html", "lucide.min.js", "manifest.webmanifest", "pdf.min.js", "pdf.worker.min.js"];

self.addEventListener('install', e => {
  // cache: 'reload' skips the browser's HTTP cache (GitHub Pages keeps files 10 minutes), so an update never stores the old files
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, {cache: 'reload'})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;  // YouTube links go straight to the network
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(hit => hit || fetch(e.request).catch(() =>
    e.request.mode === 'navigate' ? caches.match('./') : Response.error())));
});
