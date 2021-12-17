const express = require('express');
const router = express.Router();
const commentsController = require('@controllers/admin/comments');
router.get('/', commentsController.index);
router.get('/approve/:commentID', commentsController.approveComment);
router.get('/reject/:commentID', commentsController.rejectComment);
router.get('/delete/:commentID', commentsController.deleteComment);

module.exports = router;