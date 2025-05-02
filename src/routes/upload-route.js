const express = require('express');

const uploadController = require('../controllers/upload-controller');
const uploadMiddleware = require('../middlewares/upload-handler');

const router = express.Router();

router.post(
  '/',
  uploadMiddleware.uploadSingleAudio,
  uploadController.postRecordFile
);

module.exports = router;
