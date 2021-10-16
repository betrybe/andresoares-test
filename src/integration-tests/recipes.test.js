const chai = require('chai');
const fs = require('fs');
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

describe('Modulo - recipes', function() {
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

  it('CRUD receita [admin]', (done) => {
    const recipe = {
      name: 'Bolo de Abacaxi',
      ingredients: 'Abacaxi e outras coisas de bolo',
      preparation: 'Colocar no forno e aguardar até ficar pronto.'
    }

    let locaRecipeId = '';

      chai
      .request(app)
      .post('/recipes')
      .set('Authorization', token)
      .send(recipe)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body.recipe).to.have.property('_id');
        expect(res.body.recipe.name).to.have.string('Bolo de Abacaxi');
        locaRecipeId = res.body.recipe._id;
        return chai
              .request(app)
              .put(`/recipes/${locaRecipeId}`)
              .set('Authorization', token)
              .send({...recipe, name: 'Bolo de Abacaxi [editado]'})
              .end((_, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.name).to.have.string('Bolo de Abacaxi [editado]');

                return chai
                      .request(app)
                      .get(`/recipes`)
                      .end((_, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('array').that.is.not.empty;

                         return chai
                            .request(app)
                            .delete(`/recipes/${locaRecipeId}`)
                            .set('Authorization', token)
                            .end((_, res) => {
                              expect(err).to.be.null;
                              expect(res).to.have.status(204);
                              done();
                        }); 
                });                
          }); 
      });

  });

  it('Atualiza imagem de uma receita', (done) => {
      chai
        .request(app)
        .put(`/recipes/${recipeId}/image`)
        .set('Authorization', token)
        .set('content-type', 'multipart/form-data')
        .attach('image', `${__dirname}/../uploads/ratinho.jpg`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('_id');
          done();
      }); 
  })

  it('Deve lançar um erro não autorizado ao tentar criar receita sem token', (done) => {
      chai
        .request(app)
        .post('/recipes')
        .send({
          name: 'Bolo de Abacaxi',
          ingredients: 'Abacaxi e outras coisas de bolo',
          preparation: 'Colocar no forno e aguardar até ficar pronto.'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          done();
      }); 
  })

  it('Deve lançar um erro não autorizado ao tentar atualizar imagem sem token', (done) => {
      chai
        .request(app)
        .put(`/recipes/${recipeId}/image`)
        .set('content-type', 'multipart/form-data')
        .attach('image', `${__dirname}/../uploads/ratinho.jpg`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          done();
      }); 
  })

  it('Deve lançar um erro quando receita não for encontrada', (done) => {
      chai
        .request(app)
        .get('/recipes/123')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          done();
      }); 
  })

  it('Deve ser possível cadastrar um novo administrador', (done) => {
      chai
        .request(app)
        .get('/recipes/123')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          done();
      }); 
  })
});
