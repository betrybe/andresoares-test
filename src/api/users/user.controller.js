const HttpException = require('../../shared/exceptions.shared');
const userService = require('./user.services');

const create = async (req, res, next) => {
  try {
    const result = await userService.create(req.body);

    return res.status(201).json(result);
  } catch (e) {
    next(new HttpException(e));
  }
};

module.exports = { create };