// For simplicity, using hardcoded credentials.
// You can replace this with real DB-based user login if needed.

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Example: hardcoded credentials
  const validUsername = 'admin';
  const validPassword = 'admin123';

  if (username === validUsername && password === validPassword) {
    return res.status(200).json({ success: true, message: 'Login successful' });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
};