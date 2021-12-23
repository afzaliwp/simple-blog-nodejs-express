const express = require('express');
const router = express.Router();
const settingsController = require('@controllers/admin/settings');
router.get('/', settingsController.index);
router.post('/', settingsController.update);

module.exports = router;