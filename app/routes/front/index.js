const express = require('express');
const router = express.Router();
const homeRouter = require('@routes/front/home');
const postRouter = require('@routes/front/post');

router.use('/', homeRouter);
router.use('/p', postRouter);

module.exports = router;