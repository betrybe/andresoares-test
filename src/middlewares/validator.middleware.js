const { validateAll } = require('indicative/validator');
const HttpException = require('../shared/exceptions.shared');
const { DEFAULT_BAD_REQUEST } = require('../shared/error-message.shared');

const validator = (rules, typeError = DEFAULT_BAD_REQUEST) => async (req, _, next) => {
  await validateAll(req.body, rules).catch((err) => {
    if (err.length) {
      next(new HttpException(typeError));
    }
  });

  next();
};

module.exports = validator;