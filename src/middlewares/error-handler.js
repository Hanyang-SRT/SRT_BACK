// middlewares/errorHandler.js
module.exports = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    message,
  });
};
