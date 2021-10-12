const HttpException = require('../../shared/exceptions.shared');

const recipeService = require('./recipe.services');

const create = async (req, res, next) => {
  try {
    const recipe = await recipeService.create({ ...req.body, userId: req.user.id });

    return res.status(201).json({ recipe });
  } catch (e) {
    next(new HttpException(e));
  }
};

const listAll = async (req, res, next) => {
  try {
    const recipes = await recipeService.listAll();

    return res.status(200).json(recipes);
  } catch (e) {
    next(new HttpException(e));
  }
};

const getById = async (req, res, next) => {
  try {
    const recipes = await recipeService.getById(req.params.id);

    return res.status(200).json(recipes);
  } catch (e) {
    next(new HttpException(e));
  }
};

const update = async (req, res, next) => {
  try {
    const recipe = await recipeService.update(req.params.id, { ...req.body, user: req.user });

    return res.status(200).json(recipe);
  } catch (e) {
    next(new HttpException(e));
  }
};

const remove = async (req, res, next) => {
  try {
    await recipeService.remove(req.params.id, req.user);

    return res.status(204).json();
  } catch (e) {
    next(new HttpException(e));
  }
};

module.exports = { create, listAll, getById, update, remove };