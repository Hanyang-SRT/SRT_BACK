const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

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
