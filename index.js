const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const routes = require('./routes');
const config = require('./config');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(config.mongoURI, { useNewUrlParser: true });

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/api', routes);

app.listen(config.port, () => {
  console.log(`Server listening on PORT ${config.port}`);
});
