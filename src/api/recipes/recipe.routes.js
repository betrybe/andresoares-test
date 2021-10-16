const express = require('express');
const multer = require('multer');
const validator = require('../../middlewares/validator.middleware');
const checkAuth = require('../../middlewares/auth.middleware');
const { storage } = require('../../shared/configs.shared');

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 1024 } });

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

router.put('/:id',
  [
   validator({
      name: 'required',
      ingredients: 'required',
      preparation: 'required',
   }),
   checkAuth,
  ],
  recipeController.update);

router.put('/:id/image',
  [
   checkAuth,
   upload.single('image'),
  ],
  recipeController.saveImage);

router.delete('/:id',
  checkAuth,
  recipeController.remove);

router.get('/', 
  recipeController.listAll);

module.exports = router;