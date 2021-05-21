// Check to see if service worker is running
console.log(`This is the service worker...`);

// Select files to cache for offline use
const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/db.js",
    "/manifest.webmanifest",
    "/style.css",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png",
    "service-worker.js",
    "https://cdn.jsdelivr.net/npm/chart.js@2.8.0"
];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

// Install
self.addEventListener("install", function(event) {
    // pre-cache data
    event.waitUntil(
        caches.open(DATA_CACHE_NAME)
            .then((cache) => cache.add("/api/transaction"))
    );
    // pre-cache static assets
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(FILES_TO_CACHE))
    );
    // Tell browser to activate service worker upon completion of install
    self.skipWaiting();
});