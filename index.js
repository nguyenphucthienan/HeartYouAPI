const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const cloudinary = require('cloudinary');

require('./models/Role');
require('./models/User');
require('./models/Question');
require('./services/passport/passportLocal');
require('./services/passport/passportJwt');
require('./seeds/Seeds');

const routes = require('./routes');
const config = require('./config');
const errorHandlers = require('./handlers/errorHandlers');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(config.mongoURI, { useNewUrlParser: true });

const whitelist = config.corsWhitelist;
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret
});

app.use(cors(corsOptions));

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
