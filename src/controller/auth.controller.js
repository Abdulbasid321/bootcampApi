const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });
    return res.status(200).json({ token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
};
