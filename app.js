const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const router = require('./routes/router')
const models = require('./models')

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.use(router);

const Port = 1337;

const init = async () => {
  await models.User.sync()
  await models.Page.sync()

  app.listen(Port, () => {
    console.log(`app listen on ${Port}`);
  })
}

init()
