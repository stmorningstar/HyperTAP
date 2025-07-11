(async function () {
  const box = document.createElement('div');
  box.style.position = 'fixed';
  box.style.top = '100px';
  box.style.right = '20px';
  box.style.zIndex = 9999;
  box.style.background = '#333';
  box.style.color = '#fff';
  box.style.padding = '20px';
  box.style.fontFamily = 'sans-serif';
  box.style.borderRadius = '8px';
  box.innerHTML = `
    <div style="margin-bottom: 8px; font-weight: bold;">HyperTAP Login</div>
    <input placeholder="Username" id="htap_user" style="margin-bottom: 8px; width: 100%;" /><br>
    <input type="password" placeholder="Password" id="htap_pass" style="margin-bottom: 8px; width: 100%;" /><br>
    <button id="htap_login">Login</button>
    <div id="htap_msg" style="margin-top: 8px; color: red;"></div>
  `;
  document.body.appendChild(box);

  document.getElementById('htap_login').onclick = async () => {
    const username = document.getElementById('htap_user').value;
    const password = document.getElementById('htap_pass').value;
    const deviceId = localStorage.getItem('htap_device') || crypto.randomUUID();
    localStorage.setItem('htap_device', deviceId);

    const res = await fetch('https://your-render-url.onrender.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, deviceId })
    });

    const result = await res.json();
    if (!res.ok) {
      document.getElementById('htap_msg').innerText = result.error || 'Login failed';
      return;
    }

    const script = document.createElement('script');
    script.src = `https://your-render-url.onrender.com/secure/hypertap-core.js?username=${username}&deviceId=${deviceId}`;
    document.body.appendChild(script);
    box.remove();
  };
})();
