const Video = require('../models/Video');

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
