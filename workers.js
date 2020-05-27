async function InitCache(cacheName){
  console.log('SW worker is installing for the first time.');
    await caches.open(cacheName).then(function(cache){        
       return  cache.addAll(
            [ './','./index.html','./bundle.js']);              
    })
}
addEventListener('install',function(event){
    event.waitUntil(InitCache('cache-'+Math.round(Math.random())))
}),

addEventListener('activate',function(event){
  console.log('SW worker is activated for this domain');   
})
//Todo: fetch event return error
addEventListener('fetch',function(event){  
        event.respondWith(
          caches.match(event.request).then(function(req){
            console.log(req);
            
          }).catch(function(){
            return event.default()
          })
          )
})
