const { sign } = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const mongoDbUrl = 'mongodb://localhost:27017/Cookmaster';
 const { 
   APP_SECRET,
} = require('../shared/constants.shared');

before(async () => {
  connection = await MongoClient.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  db = connection.db('Cookmaster');
  await db.collection('users').deleteMany({});
  await db.collection('recipes').deleteMany({});

  const rootUser = {
      name: 'Admin User',
      email: 'admin@admin.com',
      password: '1234567',
      role: 'admin'
    };

  const { insertedId: userId } = await db.collection('users').insertOne(rootUser);

  global.token = sign({}, APP_SECRET, {
    subject: userId.toString(),
    expiresIn: '7d',
  });

  const rootRecipe = {
    name: "Bolo de cenoura",
    ingredients: "Cenoura e outras coisas de bolo",
    preparation: "Colocar no forno e aguardar até ficar pronto.",
    userId: userId
  };

  const recipe = await db.collection('recipes').insertOne(rootRecipe);

  global.recipeId = recipe.insertedId;  
})

after(async () => {
  await connection.close();
});