const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

/**
 * 사용자 오디오와 참조 오디오를 처리하여 분석 결과를 반환하는 함수
 * @param {Object} userFile - 사용자가 업로드한 오디오 파일 정보
 * @param {Buffer} userFile.buffer - 오디오 파일의 버퍼
 * @param {string} userFile.originalname - 원본 파일명
 * @param {string} userFile.mimetype - 파일의 MIME 타입
 * @param {string} refFilePath - 참조 오디오 파일의 경로
 * @returns {Promise<Object>} 분석 결과 데이터
 * @throws {Error} 모델 서버 연동 실패시 에러 발생
 */
exports.processAudio = async (userFile, refFilePath) => {
  try {
    const form = new FormData();

    form.append('user_audio', userFile.buffer, {
      filename: userFile.originalname,
      contentType: userFile.mimetype,
    });

    // ref_audio (서버 파일 경로에서 ReadStream으로)
    form.append('ref_audio', fs.createReadStream(refFilePath));

    const response = await axios.post(
      'https://areum817-speech-recognition.hf.space/analyze', // API 엔드포인트
      form,
      {
        headers: form.getHeaders(),
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        timeout: 600000,
      }
    );

    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error('모델 서버 연동 실패');
  }
};
