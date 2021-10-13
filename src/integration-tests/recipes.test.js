const chai = require('chai');
const fs = require('fs');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

const app = require('../api/server');

describe('Modulo - recipes', function() {
  this.timeout(30000);

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
      .set('Authorization', global.token)
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
              .set('Authorization', global.token)
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
                            .set('Authorization', global.token)
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
        .put(`/recipes/${global.recipeId}/image`)
        .set('Authorization', global.token)
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
        .put(`/recipes/${global.recipeId}/image`)
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
});
