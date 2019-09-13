const initialize = require('./src/controllers/initializer');
const logger = require('./src/utils/logger.js');
const app = require('./app');

const port = 4444;
// const host = 'localhost';
// const environment = 'development';

initialize().then(() => {
  app.listen(port, () => {
    logger.log(`API REST template listening at ${port}`);
  });
}).catch((err) => {
  logger.error(
    `API REST template failed to listen at ${port} : err: ${err}`,
  );
});
