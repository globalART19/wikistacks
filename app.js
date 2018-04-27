const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const wiki = require('./routes/wiki')
const user = require('./routes/user')
const models = require('./models')
const main = require('./views/main');

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.use('/wiki', wiki);
// app.use(user);

app.get('/', (req, res, next) => {
  try {
    res.send(main(''));
  } catch (err) {
    next(err);
  }
});

const Port = 1337;

const init = async () => {
  await models.db.sync({ force: true });

  app.listen(Port, () => {
    console.log(`app listen on ${Port}`);
  })
}

init()
