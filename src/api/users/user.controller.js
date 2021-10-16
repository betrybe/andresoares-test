const HttpException = require('../../shared/exceptions.shared');
const userService = require('./user.services');
const { ROLES } = require('../../shared/constants.shared');
const { ADMIN_REGISTER } = require('../../shared/error-message.shared');

const checkPermission = (role, permissions) => {
  if (!permissions.includes(role)) {
    throw new HttpException(ADMIN_REGISTER);
  }

  return true;
};

const create = async (req, res, next) => {
  try {
    let role = ROLES.USER;

    if (req.originalUrl === '/users/admin' 
    && checkPermission(req.user && req.user.role, [ROLES.ADMIN])) {
      role = ROLES.ADMIN;
    }

    const result = await userService.create({ ...req.body, role });

    return res.status(201).json({ user: result });
  } catch (e) {
    next(new HttpException(e));
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);

    return res.status(200).json(result);
  } catch (e) {
    next(new HttpException(e));
  }
};

module.exports = { create, login };