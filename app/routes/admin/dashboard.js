const express = require('express');
const router = express.Router();
const dashboardController = require('@controllers/admin/dashboard');
router.get('/', dashboardController.index);
router.post('/create-draft-post', dashboardController.createDraftPost);
module.exports = router;