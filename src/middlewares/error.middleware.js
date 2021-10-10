const HttpException = require('../shared/exceptions.shared');

const customErrorResponse = (err, _req, res, _) => {
  if (err instanceof HttpException) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  console.log({ err });
  return res.status(500).json({
    message: 'Internal server error',
  });
};

module.exports = customErrorResponse;