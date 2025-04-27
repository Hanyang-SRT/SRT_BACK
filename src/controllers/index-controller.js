const { StatusCodes } = require('http-status-codes');

exports.getTest = async (req, res, next) => {
  try {
    return res.status(StatusCodes.OK).send('hello');
  } catch (err) {
    next(err);
  }
};
