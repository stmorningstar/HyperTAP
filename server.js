const express = require('express');
const app = express();
const path = require('path');

const sessions = {};
const USERS = {
  user01: { password: 'Kj#9mP$2vN!xQ5w', expiry: '2025-07-31' }
};

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.post('/api/login', (req, res) => {
  const { username, password, deviceId } = req.body;
  const user = USERS[username];

  if (!user) return res.status(400).json({ error: 'username not found' });
  if (user.password !== password) return res.status(400).json({ error: 'wrong password' });

  const today = new Date().toISOString().split('T')[0];
  if (today > user.expiry) return res.status(403).json({ error: 'subscription expired' });

  if (sessions[username] && sessions[username] !== deviceId)
    return res.status(403).json({ error: 'Already logged in elsewhere' });

  sessions[username] = deviceId;
  return res.json({ ok: true });
});

app.get('/secure/hypertap-core.js', (req, res) => {
  const username = req.query.username;
  const deviceId = req.query.deviceId;
  if (sessions[username] !== deviceId) return res.status(403).send('Forbidden');
  res.sendFile(path.join(__dirname, 'secure/hypertap-core.js'));
});

app.listen(3000, () => {
  console.log('HyperTAP Secure Server running on port 3000');
});
