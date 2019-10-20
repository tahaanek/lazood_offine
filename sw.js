const cacheApp = 'o-app-v1';
const cacheData = [
    'vendor/bootstrap/css/bootstrap.min.css',
    'vendor/fontawesome-free/css/all.min.css',
    'vendor/simple-line-icons/css/simple-line-icons.css',
    'css/landing-page.min.css',
    'vendor/jquery/jquery.min.js',
    'vendor/bootstrap/js/bootstrap.bundle.min.js',
    'img/bg-showcase-1.jpg',
    'img/bg-showcase-2.jpg',
    'img/bg-showcase-3.jpg',
    'img/testimonials-1.jpg',
    'img/testimonials-2.jpg',
    'img/testimonials-3.jpg',
    'index.html',
    'js/main.js',
    'about.html',
];
// const cart = 
// {
//     {
//     id : 1,
//     product : 'product 1',
//     quantity : 2,
//     priceUnit : 999
// },
// {
//     id : 2,
//     product : 'product 2',
//     quantity : 1,
//     priceUnit : 111
// }
// };


// install service
self.addEventListener('install', e => {
    console.log('service installed');

    e.waitUntil(
        caches
        .open(cacheApp)
        .then(cache => {
            console.log('service worker chaching file : '+cacheData)
            cache.addAll(cacheData);
        })
        .then(() => self.skipWaiting())
    );

});

// activate service
self.addEventListener('activate', e => {
    console.log('service activated');
    e.waitUntil(
        caches.keys().then(cacheApp => {
            return Promise.all(
                cacheApp.map(cache =>{
                    if(cache !== cacheApp){
                      console.log('clearing old cache : '+cacheApp);
                      return caches.delete(cache);
                    }
                })
            );
        })
    );
});
// fetch service
self.addEventListener('fetch', e => {
    console.log('service fetching');
    e.respondWith(
        fetch(e.request)
          .then(res => {
            const resClone = res.clone();
            caches
            .open(cacheApp)
            .then(cache => {
                cache.put(e.request, resClone);
            });
            return res;
          })
        .catch(() => { 
            caches.match(e.request).then(res => res) ;
        })
      );    
  });