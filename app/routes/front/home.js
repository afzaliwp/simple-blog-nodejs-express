const express = require('express');
const router = express.Router();
const homeController = require('@controllers/front/home');
router.get('/', homeController.index);
router.get('/404', homeController.notFound);

module.exports = router;