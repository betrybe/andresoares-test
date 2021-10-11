const express = require('express');
const customErrorResponse = require('../middlewares/error.middleware');
const { FIELDS_MUST_BE_FILLED } = require('../shared/error-message.shared');
const validator = require('../middlewares/validator.middleware');

const userRoutes = require('./users/user.routes');
const userController = require('./users/user.controller');

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/login', validator({
  name: 'required',
  email: 'required|email',
}, FIELDS_MUST_BE_FILLED), userController.login);
app.use('/users', userRoutes);

app.use(customErrorResponse);

module.exports = app;
