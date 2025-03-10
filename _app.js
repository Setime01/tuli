import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(() => console.log('Service Worker Registered'))
          .catch((err) => console.error('Service Worker Registration Failed:', err));
      });
    }
  }, []);

  return <Component {...pageProps} />;
}
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registered:', reg))
      .catch(err => console.log('Service Worker registration failed:', err));
  });
}
