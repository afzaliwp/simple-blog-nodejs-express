const express = require('express');
const router = express.Router();
const usersController = require('@controllers/admin/users');
router.get('/', usersController.index);
router.get('/delete/:userID', usersController.remove);

module.exports = router;