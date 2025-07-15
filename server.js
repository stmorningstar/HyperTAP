const express = require('express');
const app = express();
const path = require('path');

const sessions = {};
const USERS = {
    'testuser': { password: 'testing123', expiry: '2025-07-31' },
    'firdaus': { password: 'administrator1993', expiry: '2025-07-31' },
    'bala': { password: 'Wq@8tY#3mK$9vN2', expiry: '2025-07-31' },
    'user04': { password: 'Xr$2nP#6vM@9kQw', expiry: '2025-07-31' },
    'user05': { password: 'Lp#7mT$4xN!2vQw', expiry: '2025-07-31' },
    'user06': { password: 'Yt@3kM$8vN#2xQw', expiry: '2025-07-31' },
    'user07': { password: 'Qw#9xP$2mT!4vNk', expiry: '2025-07-31' },
    'user08': { password: 'Nm$4vT#7xP@2kQw', expiry: '2025-07-31' },
    'user09': { password: 'Vk#2mP$9xT!4qNw', expiry: '2025-07-31' },
    'user10': { password: 'Tj@7xM$3vP#2kQw', expiry: '2025-07-31' },
    'user11': { password: 'Xp#4vN$8mT!2qKw', expiry: '2025-07-31' },
    'user12': { password: 'Zm@9kP$2xT#7vQw', expiry: '2025-07-31' },
    'user13': { password: 'Wq#3mT$9vP@2kNx', expiry: '2025-07-31' },
    'user14': { password: 'Yt$7xN#2mP@4vQw', expiry: '2025-07-31' },
    'user15': { password: 'Qw@2kP$8vT#9mNx', expiry: '2025-07-31' },
    'user16': { password: 'Nm#9xT$4vP@2kQw', expiry: '2025-07-31' },
    'user17': { password: 'Vk$3mP#7xT@9qNw', expiry: '2025-07-31' },
    'user18': { password: 'Tj@8vN$2mP#4kQw', expiry: '2025-07-31' },
    'user19': { password: 'Xp$4kT$9vN@2mQw', expiry: '2025-07-31' },
    'user20': { password: 'Zm#2xP$7vT@9kNw', expiry: '2025-07-31' },
    'user21': { password: 'Wq@9mT$3vP#2kQx', expiry: '2025-07-31' },
    'user22': { password: 'Yt$7xN#4mP@2vQw', expiry: '2025-07-31' },
    'user23': { password: 'Qw#2kP$8vT@9mNx', expiry: '2025-07-31' },
    'user24': { password: 'Nm@9xT$3vP#2kQw', expiry: '2025-07-31' },
    'user25': { password: 'Vk$4mP#7xT@2qNw', expiry: '2025-07-31' },
    'user26': { password: 'Tj#8vN$2mP@4kQw', expiry: '2025-07-31' },
    'user27': { password: 'Xp@2kT$9vN#4mQw', expiry: '2025-07-31' },
    'user28': { password: 'Zm$7xP#3vT@9kNw', expiry: '2025-07-31' },
    'user29': { password: 'Wq#9mT$2vP@4kQx', expiry: '2025-07-31' },
    'user30': { password: 'Yt$3xN#8vP@2mQw', expiry: '2025-07-31' }
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

// Login endpoint with password validation
app.post('/api/login', (req, res) => {
    const { username, password, deviceId } = req.body;
    const user = USERS[username];
    const today = new Date().toISOString().split('T')[0];

    if (!user) return res.status(400).json({ error: 'username not found' });
    if (password !== user.password) return res.status(400).json({ error: 'invalid password' });
    if (today > user.expiry) return res.status(403).json({ error: 'subscription expired' });
    if (sessions[username] && sessions[username] !== deviceId) {
        return res.status(403).json({ error: 'user already logged in on another device' });
    }

    sessions[username] = deviceId;
    return res.json({ ok: true });
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
    const { username, deviceId } = req.body;
    if (sessions[username] && sessions[username] === deviceId) {
        delete sessions[username];
        return res.json({ ok: true });
    }
    return res.status(400).json({ error: 'invalid session' });
});

// Protected route for login-ui.js
app.get('/public/login-ui.js', verifyReferer, (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login-ui.js'));
});

// Protected route for hypertap-core.js
app.get('/secure/hypertap-core.js', verifyReferer, (req, res) => {
    res.sendFile(path.join(__dirname, 'secure/hypertap-core.js'));
});

app.listen(3000, () => {
    console.log('🔐 HyperTAP Secure Server running on port 3000');
});
