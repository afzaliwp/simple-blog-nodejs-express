const express = require('express');
const router = express.Router();
const postsRouter = require('@routes/admin/posts');
const dashboardRoutes = require('@routes/admin/dashboard');
const commentsRouter = require('@routes/admin/comments');
const usersRouter = require('@routes/admin/users');
router.use('/dashboard', dashboardRoutes);
router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);
router.use('/users', usersRouter);

module.exports = router;