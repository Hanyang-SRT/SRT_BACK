const { StatusCodes } = require('http-status-codes');
const uploadService = require('../services/upload-service');
const RefAudio = require('../models/RefAudio');

/**
 * 사용자 녹음 파일을 처리하는 컨트롤러
 * @param {Object} req - Express 요청 객체
 * @param {Object} req.body - 요청 본문
 * @param {number} req.body.globalOrder - 참조 오디오의 전역 순서
 * @param {Object} req.file - 업로드된 사용자 오디오 파일
 * @param {Object} res - Express 응답 객체
 * @param {Function} next - 다음 미들웨어 함수
 * @returns {Promise<void>}
 */
exports.postRecordFile = async (req, res, next) => {
  try {
    // 두 파일이 form-data로 왔는지 확인
    const { globalOrder } = req.body;
    const userFile = req.file; // single이므로 req.file

    if (!userFile) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'user_audio 파일 첨부 필요',
      });
    }

    const refAudio = await RefAudio.findOne({
      globalOrder: Number(globalOrder),
    });
    if (!refAudio) {
      return res
        .status(404)
        .json({ success: false, message: 'ref_audio 없음' });
    }

    const refFilePath = refAudio.audio_path;

    // 서비스에 넘겨서 모델 서버에 요청
    const response = await uploadService.processAudio(userFile, refFilePath);

    // 클라이언트에 결과 응답
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Post file success',
      data: response,
    });
  } catch (err) {
    // 에러 미들웨어로 넘기기
    next(err);
  }
};
