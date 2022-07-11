const mongoose = require('mongoose');
const logger = require('./utils/logger');
mongoose.Promise = Promise;

const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const config = require('config');
mongoose.connect('mongodb://' + config.get('mongodb.address') + '/' + config.get('mongodb.dbname'), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { logger.info('Database connected successfully') })
    .catch(err => logger.error(err));

require('./utils/initializer').init()
app.use(express.json());

app.use('/api', require('./routes/stores'));

// Start the server
const server = app.listen(config.get('port'));
logger.info('API initialized on port ' + config.get('port'));

module.exports = { app, server }
