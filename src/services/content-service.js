const Video = require('../models/Video');

/**
 * 콘텐츠 ID에 해당하는 비디오 리소스를 조회하는 함수
 * @param {string|number} contentId - 조회할 콘텐츠의 globalOrder
 * @returns {Promise<Object|null>} 비디오 리소스 데이터 또는 없을 경우 null
 * @throws {Error} 데이터베이스 조회 실패시 에러 발생
 */
exports.getContentResource = async (contentId) => {
  try {
    const reqData = await Video.findOne({ globalOrder: contentId });

    if (!reqData) {
      return null;
    }

    return reqData;
  } catch (err) {
    throw err;
  }
};
