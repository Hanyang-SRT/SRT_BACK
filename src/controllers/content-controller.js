const { StatusCodes } = require('http-status-codes');

const contentService = require('../services/content-service');

/**
 * 콘텐츠 리소스를 조회하는 컨트롤러
 * @param {Object} req - Express 요청 객체
 * @param {Object} req.params - URL 파라미터
 * @param {string} req.params.contentId - 조회할 콘텐츠 ID
 * @param {Object} res - Express 응답 객체
 * @param {Function} next - 다음 미들웨어 함수
 */
exports.getContentResource = async (req, res, next) => {
  try {
    const { contentId } = req.params;
    if (!contentId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Content Id Omitted',
      });
    }

    const resource = await contentService.getContentResource(contentId);
    if (!resource) {
      return res.status(StatusCodes.NO_CONTENT).json({
        success: true,
        message: 'No Content Found',
      });
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Content Resource Retrieved Successfully',
      resource: resource,
    });
  } catch (err) {
    next();
  }
};

const Video = require('../models/Video');

/**
 * 새로운 비디오 정보를 생성하는 컨트롤러
 * @param {Object} req - Express 요청 객체
 * @param {Object} req.body - 요청 본문
 * @param {string} req.body.videoId - 비디오 식별자
 * @param {number} req.body.startTime - 시작 시간
 * @param {number} req.body.endTime - 종료 시간
 * @param {string} req.body.script - 비디오 스크립트
 * @param {number} req.body.globalOrder - 전역 순서
 * @param {Object} res - Express 응답 객체
 * @param {Function} next - 다음 미들웨어 함수
 */
exports.createVideo = async (req, res, next) => {
  try {
    const { videoId, startTime, endTime, script, globalOrder } = req.body;

    if (
      !videoId ||
      startTime == null ||
      endTime == null ||
      !script ||
      globalOrder == null
    ) {
      return res.status(400).json({ message: '모든 필드를 입력해 주세요.' });
    }

    const newVideo = new Video({
      videoId,
      startTime,
      endTime,
      script,
      globalOrder,
    });

    await newVideo.save();
    res.status(201).json({ message: '비디오 저장 성공', data: newVideo });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: '중복된 globalOrder입니다.' });
    }
    next(err);
  }
};
