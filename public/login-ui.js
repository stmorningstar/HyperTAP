(async function () {
  const username = localStorage.getItem('htap_username') || 'anonymous';
  const deviceId = localStorage.getItem('htap_device') || crypto.randomUUID();
  localStorage.setItem('htap_device', deviceId);

  const script = document.createElement('script');
  script.src = `https://hypertap.onrender.com/secure/hypertap-core.js?username=${username}&deviceId=${deviceId}`;
  document.body.appendChild(script);
})();
