const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/admin/dashboard');
const postsController = require('../../controllers/admin/posts');
router.get('/dashboard', (req, res) => {
    dashboardController.index(req, res);
});
router.get('/posts', (req, res) => {
    postsController.index(req, res);
});

module.exports = router;