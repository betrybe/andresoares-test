const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const { sign } = require('jsonwebtoken');
const { MongoClient } = require('mongodb');

 const { 
   APP_SECRET,
   MONGO_DB_URL,
} = require('../shared/constants.shared');


const app = require('../api/server');

describe('Modulo - users', function () {
  this.timeout(30000);
  let token;
  let recipeId;

  before(async () => {
    const connection = await MongoClient.connect(MONGO_DB_URL, {
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

    token = sign({}, APP_SECRET, {
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

    recipeId = recipe.insertedId; 
  })

  it('Cadastrar novo usuário e logar no sistema', (done) => {
    const newUser = {
      name: 'Andre Soares',
      email: 'andre@email.com',
      password: '1234567'
    };

      chai
      .request(app)
      .post('/users')
      .send(newUser)
      .end((_, res) => {
        expect(res).to.have.status(201);
        expect(res.body.user).to.have.property('_id');
        expect(res.body.user.name).to.have.string('Andre Soares');

        return chai
              .request(app)
              .post('/login')
              .send(newUser)
              .end((_, res) => {
                  expect(res).to.have.status(200);
                  expect(res.body).to.have.property('token');
                  done();
        });
      });
  });

  it("Deve lançar um erro quando usuário não digitar email/senha correta", (done) => {
      chai
        .request(app)
        .post('/login')
        .send({
          email: 'andre@email.com',
          password: '123'
        })
        .end((_, res) => {
            expect(res).to.have.status(401);
            done();
      });
  });

  it('Deve ser possível cadastrar um novo administrador', (done) => {
      chai
        .request(app)
        .post('/users/admin')
        .set('Authorization', token)
        .send({
          name: 'Andre Soares',
          email: 'andre2@email.com',
          password: '1234567'
        })
        .end((_, res) => {
          expect(res).to.have.status(201);
          expect(res.body.user).to.have.property('_id');
          expect(res.body.user.role).to.have.string('admin');
          done();
      }); 
  })
});
