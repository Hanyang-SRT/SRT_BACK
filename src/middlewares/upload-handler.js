const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

/**
 * Multer 설정 객체
 * 파일 업로드 제한 및 필터링을 처리
 */
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB
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

/**
 * 단일 오디오 파일 업로드를 처리하는 미들웨어
 * @type {import('express').RequestHandler}
 */
exports.uploadSingleAudio = upload.single('user_audio');

/**
 * 두 개의 오디오 파일 업로드를 처리하는 미들웨어
 * @type {import('express').RequestHandler}
 */
exports.uploadTwoAudios = upload.fields([
  { name: 'user_audio', maxCount: 1 },
  { name: 'ref_audio', maxCount: 1 },
]);
