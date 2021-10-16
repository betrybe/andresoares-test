const express = require('express');
const validator = require('../../middlewares/validator.middleware');
const checkAuth = require('../../middlewares/auth.middleware');

const userController = require('./user.controller');

const router = express.Router();

router.post('/',
  validator({
    name: 'required',
    email: 'required|email',
    password: 'required',
  }), 
  userController.create);

router.post('/admin',
  [
    validator({
      name: 'required',
      email: 'required|email',
      password: 'required',
    }),
    checkAuth,
  ], 
  userController.create);

module.exports = router;