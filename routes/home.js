const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.index);
router.post('/edit', homeController.edit);
router.post('/updatetag', homeController.updateTag);

module.exports = router;