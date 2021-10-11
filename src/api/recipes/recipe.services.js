const HttpException = require('../../shared/exceptions.shared');
 const { 
   SERVER_ERROR,
   RECIPE_NOT_FOUND,
} = require('../../shared/error-message.shared');

const Recipe = require('./recipe.model');

const create = async ({ name, ingredients, preparation, userId }) => {
  try {
    const recipe = await Recipe.create({ name, ingredients, preparation, userId });

    return {
      _id: recipe.id,
      name: recipe.name,
      ingredients: recipe.ingredients,
      preparation: recipe.preparation,
      userId: recipe.userId,
    };
  } catch (e) {
    throw new HttpException(SERVER_ERROR);
  }
};

const listAll = async () => {
  try {
    const recipes = await Recipe.find();

    return recipes.map((item) => ({
      _id: item.id,
      name: item.name,
      ingredients: item.ingredients,
      preparation: item.preparation,
      userId: item.userId,
    }));
  } catch (e) {
    throw new HttpException(SERVER_ERROR);
  }
};

const getById = async (id) => {
  try {
    const recipe = await Recipe.findOne({ _id: id });

    return {
      _id: recipe.id,
      name: recipe.name,
      ingredients: recipe.ingredients,
      preparation: recipe.preparation,
      userId: recipe.userId,
    };
  } catch (e) {
    throw new HttpException(RECIPE_NOT_FOUND);
  }
};

module.exports = { create, listAll, getById };