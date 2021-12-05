const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/admin/dashboard');
router.get('/dashboard', (req, res) => {
    dashboardController.index(req, res);
});

module.exports = router;