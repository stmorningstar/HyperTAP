(async function () {
  const existing = document.getElementById('hypertap-login-btn');
  if (existing) return; // prevent duplicates

  const btn = document.createElement('button');
  btn.id = 'hypertap-login-btn';
  btn.textContent = 'Click Here to Login HyperTAP by FY';
  btn.style.position = 'fixed';
  btn.style.top = '10px';
  btn.style.left = '10px';
  btn.style.zIndex = '9999';
  btn.style.background = '#444';
  btn.style.color = '#fff';
  btn.style.border = 'none';
  btn.style.padding = '8px 12px';
  btn.style.borderRadius = '6px';
  btn.style.fontSize = '13px';
  btn.style.cursor = 'pointer';
  btn.style.fontWeight = 'bold';
  btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';

  btn.addEventListener('click', () => {
    const username = localStorage.getItem('htap_username') || 'anonymous';
    const deviceId = localStorage.getItem('htap_device') || crypto.randomUUID();
    localStorage.setItem('htap_device', deviceId);

    const script = document.createElement('script');
    script.src = `https://hypertap.onrender.com/secure/hypertap-core.js?username=${username}&deviceId=${deviceId}`;
    document.body.appendChild(script);

    btn.remove(); // optional: remove button after clicked
  });

  document.body.appendChild(btn);
})();
