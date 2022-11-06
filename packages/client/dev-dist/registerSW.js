// if ('serviceWorker' in navigator)
//   navigator.serviceWorker.register('/dev-sw.js?dev-sw', { scope: '/', type: 'classic' });

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/dev-sw.js?dev-sw', { scope: '/', type: 'classic' })
      .then((registration) => {
        console.log('ServiceWorker registration successful with  scope: ', registration.scope);
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}
