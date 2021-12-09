const express = require('express');
const router = express.Router();
const postsRouter = require('@routes/admin/posts');
const dashboardRoutes = require('@routes/admin/dashboard');
router.use('/dashboard', dashboardRoutes);
router.use('/posts', postsRouter);

module.exports = router;