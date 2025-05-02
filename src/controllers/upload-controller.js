const { StatusCodes } = require('http-status-codes');
const axios = require('axios');

const uploadService = require('../services/upload-service');

exports.postRecordFile = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Audio file omitted',
      });
    }

    const response = await axios.post('http://<IP>:<PORT>', file.buffer, {
      headers: {
        'Content-Type': file.mimetype,
        'Content-Length': file.size,
      },
      timeout: 10000,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Post file success',
      data: response,
    });
  } catch (err) {
    next(err);
  }
};
