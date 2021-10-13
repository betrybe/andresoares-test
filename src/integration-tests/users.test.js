const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

const app = require('../api/server');

describe('Modulo - users', function () {
  this.timeout(30000);

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
});
