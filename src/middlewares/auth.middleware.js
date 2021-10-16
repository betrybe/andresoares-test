const { verify } = require('jsonwebtoken');
 const { 
   APP_SECRET,
} = require('../shared/constants.shared');
 const { 
   JWT_MALFORMED,
   JWT_IS_MISSING,
} = require('../shared/error-message.shared');
const HttpException = require('../shared/exceptions.shared');

const User = require('../api/users/user.model');

const checkAuth = async (req, _, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      next(new HttpException(JWT_IS_MISSING));
    }

    const { sub } = verify(authorization, APP_SECRET);

    const user = await User.findOne({ _id: sub });

    if (!user) {
      next(new HttpException(JWT_MALFORMED));
    }

    req.user = user;

    return next();
  } catch (e) {
    next(new HttpException(JWT_MALFORMED));
  }
};

module.exports = checkAuth;