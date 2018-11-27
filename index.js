const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

require('./models/Role');
require('./models/User');
require('./services/passport/passportLocal');
require('./services/passport/passportJwt');
require('./seeds/Seeds');

const routes = require('./routes');
const config = require('./config');
const errorHandlers = require('./handlers/errorHandlers');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(config.mongoURI, { useNewUrlParser: true });

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(errorHandlers.productionErrorHandler);
} else {
  app.use(errorHandlers.developmentErrorHandler);
}

app.listen(config.port, () => {
  console.log(`Server listening on PORT ${config.port}`);
});
