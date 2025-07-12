(function () {
  const script = document.createElement('script');
  script.src = 'https://hypertap.onrender.com/secure/hypertap-core.js';
  script.onload = () => console.log('✅ HyperTAP core loaded');
  script.onerror = () => console.error('❌ Failed to load HyperTAP core');
  document.body.appendChild(script);
})();
