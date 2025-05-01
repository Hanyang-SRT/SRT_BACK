const express = require('express');
const router = express.Router();

const contentController = require('../controllers/content-controller');

router.get('/:contentId', contentController.getContentResource);

router.post('/', contentController.createVideo);

module.exports = router;
