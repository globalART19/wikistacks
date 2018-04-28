const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const wiki = require('./routes/wiki')
const user = require('./routes/user')
const models = require('./models')
const main = require('./views/main');

app.use(morgan('dev'));
app.use(bodyParser());

app.use(express.static(__dirname + '/public'));

app.use('/wiki', wiki);
app.use('/users', user);

app.get('/', (req, res, next) => {
  try {
    res.redirect('/wiki');
  } catch (err) {
    next(err);
  }
});

const Port = 1337;

const init = async () => {
  await models.db.sync({ force: false });

  app.listen(Port, () => {
    console.log(`app listen on ${Port}`);
  })
}

init()
