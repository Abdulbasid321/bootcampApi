const express = require('express');
const router = express.Router();
const adminLoginController = require('../controller/auth.controller');
const viewStudentController = require('../controller/register.controller');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const bearer = req.headers.authorization;

  if (!bearer) return res.status(401).json({ message: 'Access denied' });

  const token = bearer.split(' ')[1];
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = verified;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

router.post('/login', adminLoginController.adminLogin);
router.get('/registrations', verifyToken, viewStudentController.getAllRegistrations);
module.exports = router;
