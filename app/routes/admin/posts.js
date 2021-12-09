const express = require('express');
const router = express.Router();
const postsController = require('@controllers/admin/posts');
router.get('/posts', (req, res) => {
    postsController.index(req, res);
});

module.exports = router;