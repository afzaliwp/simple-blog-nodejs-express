const express = require('express');
const router = express.Router();
const registerController = require('@controllers/auth/register');
router.get('/', registerController.showRegister);
router.post('/', registerController.doRegister);

module.exports = router;