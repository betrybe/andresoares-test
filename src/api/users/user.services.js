const { sign } = require('jsonwebtoken');
const HttpException = require('../../shared/exceptions.shared');
 const { 
   EMAIL_ALREADY_EXIST,
   USER_PARAMS_INCORRECT,
} = require('../../shared/error-message.shared');
 const { 
   APP_SECRET,
} = require('../../shared/constants.shared');

const User = require('./user.model');

const create = async ({ name, email, password, role }) => {
  try {
    const exist = await User.findOne({ email });

    if (exist) {
      throw new HttpException(EMAIL_ALREADY_EXIST);
    }

    const user = await User.create({ name, email, password, role });

    return {
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  } catch (e) {
    throw new HttpException(e);
  }
};

const login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      throw new HttpException(USER_PARAMS_INCORRECT);
    }

    const token = sign({
        user: { 
          id: user.id, 
          email: user.email, 
          role: user.role,
      } }, APP_SECRET, {
      subject: user.id,
      expiresIn: '7d',
    });

    return { token };
  } catch (e) {
    throw new HttpException(e);
  }   
};

module.exports = { create, login };