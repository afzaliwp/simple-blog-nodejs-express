const express = require('express');
const router = express.Router();
const postController = require('@controllers/front/post');
const commentController = require('@controllers/front/comment');
router.get('/:postSlug', postController.showPost);
router.post('/:postSlug/comments', commentController.store);

module.exports = router;