const express = require('express');
const validator = require('../../middlewares/validator.middleware');
const checkAuth = require('../../middlewares/auth.middleware');

const recipeController = require('./recipe.controller');

const router = express.Router();

router.post('/',
 [
   validator({
      name: 'required',
      ingredients: 'required',
      preparation: 'required',
   }),
   checkAuth,
  ], 
  recipeController.create);

router.get('/:id', 
  recipeController.getById);

router.get('/', 
  recipeController.listAll);

module.exports = router;