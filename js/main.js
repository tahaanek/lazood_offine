if('serviceWorker' in navigator){
  window.addEventListener('load', () => {
  navigator.serviceWorker
  .register('./sw.js')
  .then(reg => console.log('service registered'))
  .catch(err => console.log('service error :'+err));
});

if('localStorage' in navigator){
  localStorage.setItem("swCache","service worker chached");
  var chacheData;
  chacheData = localStorage.getItem("swCache");
  document.getElementById("getCacheInput").html(chacheData);
  }

}else{
  alert('This browser not support website, please use modern ones');
}