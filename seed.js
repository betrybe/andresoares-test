// colocar query do MongoDB
const { MongoClient } = require('mongodb');

const { MONGO_DB_URL } = require('./src/shared/constants.shared');

(async () => {
  connection = await MongoClient.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  db = connection.db('Cookmaster');

  // db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
  await db.collection('users').insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });

  await connection.close();
})()