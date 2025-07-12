(async function () {
  const username = 'user01'; // assign your user's ID here
  const deviceId = localStorage.getItem('htap_device') || crypto.randomUUID();
  localStorage.setItem('htap_device', deviceId);
  localStorage.setItem('htap_username', username);

  // Pre-auth request
  const res = await fetch('https://hypertap.onrender.com/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password: 'placeholder', deviceId }) // password is dummy, actual login inside core
  });

  if (!res.ok) {
    console.error('❌ Login pre-check failed');
    return;
  }

  // Load core script WITHOUT query params
  const script = document.createElement('script');
  script.src = 'https://hypertap.onrender.com/secure/hypertap-core.js';
  script.onload = () => console.log('✅ HyperTAP core loaded');
  script.onerror = () => console.error('❌ Failed to load HyperTAP core');
  document.body.appendChild(script);
})();
