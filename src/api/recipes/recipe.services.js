const HttpException = require('../../shared/exceptions.shared');
 const { 
   SERVER_ERROR,
   RECIPE_NOT_FOUND,
} = require('../../shared/error-message.shared');

 const { 
   ROLES,
   API_URL,
} = require('../../shared/constants.shared');

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

const update = async (id, { name, ingredients, preparation, user }) => {
  try {
    const where = user.role === ROLES.ADMIN ? { _id: id } : { _id: id, userId: user.id };

    await Recipe.where(where)
                        .update({ name, ingredients, preparation });

    const recipe = await Recipe.findOne(where);

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

const saveImage = async (id, { image, user }) => {
  try {
    const where = user.role === ROLES.ADMIN ? { _id: id } : { _id: id, userId: user.id };

    await Recipe.where(where)
                        .update({ image: `${API_URL}/${image}` });

    const recipe = await Recipe.findOne(where);

    return {
      _id: recipe.id,
      name: recipe.name,
      ingredients: recipe.ingredients,
      preparation: recipe.preparation,
      userId: recipe.userId,
      image: recipe.image,
    };
  } catch (e) {
    throw new HttpException(RECIPE_NOT_FOUND);
  }
};

const remove = async (id, user) => {
  try {
      const where = user.role === ROLES.ADMIN ? { _id: id } : { _id: id, userId: user.id };

      await Recipe.where(where)
                          .remove();
      return true;
  } catch (e) {
    throw new HttpException(RECIPE_NOT_FOUND);
  }
};

module.exports = { create, listAll, getById, update, remove, saveImage };