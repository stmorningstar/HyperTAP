app.get('/secure/hypertap-core.js', (req, res) => {
  const allowedReferer = 'https://crm.intl.hopeedu.com';
  const referer = req.get('Referer') || '';

  // ✅ Block if accessed directly (no referer or not from CRM site)
  if (!referer.startsWith(allowedReferer)) {
    return res.status(403).send('// Access denied: Unauthorized');
  }

  // ✅ Otherwise allow
  res.sendFile(path.join(__dirname, 'secure/hypertap-core.js'));
});
