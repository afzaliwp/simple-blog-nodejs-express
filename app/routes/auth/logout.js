const express = require('express');
const router = express.Router();
const logoutController = require('@controllers/auth/logout');
router.get('/', logoutController.logout);

module.exports = router;