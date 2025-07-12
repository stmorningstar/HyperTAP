const express = require('express');
const app = express();
const path = require('path');

const sessions = {};
const USERS = {
  user01: { password: 'Kj#9mP$2vN!xQ5w', expiry: '2025-07-31' }
};

// Middleware to validate allowed source
function verifyReferer(req, res, next) {
  const allowedReferer = 'https://crm.intl.hopeedu.com';
  const referer = req.get('Referer') || '';
  if (!referer.startsWith(allowedReferer)) {
    return res.status(403).send('// ❌ Access denied');
  }
  next();
}

app.use(express.json());

// ✅ Login endpoint
app.post('/api/login', (req, res) => {
  const { username, deviceId } = req.body;
  const user = USERS[username];
  const today = new Date().toISOString().split('T')[0];

  if (!user) return res.status(400).json({ error: 'username not found' });
  if (today > user.expiry) return res.status(403).json({ error: 'subscription expired' });

  sessions[username] = deviceId;
  return res.json({ ok: true });
});

// ✅ Protected route for login-ui.js
app.get('/public/login-ui.js', verifyReferer, (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login-ui.js'));
});

// ✅ Protected route for hypertap-core.js
app.get('/secure/hypertap-core.js', verifyReferer, (req, res) => {
  res.sendFile(path.join(__dirname, 'secure/hypertap-core.js'));
});

app.listen(3000, () => {
  console.log('🔐 HyperTAP Secure Server running on port 3000');
});
