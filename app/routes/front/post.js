const express = require('express');
const router = express.Router();
const postController = require('@controllers/front/post');
router.get('/:postSlug', postController.showPost);

module.exports = router;