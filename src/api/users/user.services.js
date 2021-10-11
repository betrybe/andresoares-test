 const HttpException = require('../../shared/exceptions.shared');
 const { EMAIL_ALREADY_EXIST } = require('../../shared/error-message.shared');
 const User = require('./user.model');

const create = async ({ name, email, password, role }) => {
  try {
    const exist = await User.findOne({ email });

    if (exist) {
      throw new HttpException(EMAIL_ALREADY_EXIST);
    }

    const user = await User.create({ name, email, password, role });

    return {
      // eslint-disable-next-line no-underscore-dangle
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  } catch (e) {
    throw new HttpException(e);
  }
};

module.exports = { create };