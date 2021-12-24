const express = require('express');
const router = express.Router();
const loginController = require('@controllers/auth/login');
router.get('/', loginController.showLogin);
router.post('/', loginController.doLogin);

module.exports = router;