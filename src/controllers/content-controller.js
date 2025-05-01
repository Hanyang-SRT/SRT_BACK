const { StatusCodes } = require('http-status-codes');

const contentService = require('../services/content-service');

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
