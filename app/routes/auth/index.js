const express = require('express');
const router = express.Router();
const loginRouter = require('@routes/auth/login');
const registerRouter = require('@routes/auth/register');

router.use('/login', loginRouter);
router.use('/register', registerRouter);
module.exports = router;