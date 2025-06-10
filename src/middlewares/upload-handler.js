const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'audio/wav',
      'audio/mpeg',
      'audio/mp3',
      'audio/wav',
      'audio/x-wav',
      'audio/x-pn-wav',
    ];
    const allowedExts = ['.wav', '.mp3', '.mpeg'];
    if (
      allowedTypes.includes(file.mimetype) ||
      allowedExts.includes(path.extname(file.originalname).toLowerCase())
    ) {
      cb(null, true);
    } else {
      cb(new Error('지원하지 않는 파일 형식입니다.'));
    }
  },
});

exports.uploadSingleAudio = upload.single('user_audio');

exports.uploadTwoAudios = upload.fields([
  { name: 'user_audio', maxCount: 1 },
  { name: 'ref_audio', maxCount: 1 },
]);
