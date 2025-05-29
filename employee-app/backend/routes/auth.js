const express = require('express');
const router = express.Router();

// Dummy login for demo
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

module.exports = router;
