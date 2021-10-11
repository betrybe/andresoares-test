const { connect } = require('mongoose');
const app = require('./app');

const { MONGO_DB_URL } = require('../shared/constants.shared');

const PORT = 3000;

(async () => {
  await connect(MONGO_DB_URL);

  app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
})();