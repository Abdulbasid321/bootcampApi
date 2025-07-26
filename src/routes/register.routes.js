const express = require('express');
const router = express.Router();
const registerationController = require('../controller/register.controller');


router.post('/register', registerationController.createRegistration);
module.exports = router;
