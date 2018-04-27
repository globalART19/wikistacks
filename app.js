const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const router = require('./routes/router')

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.use(router);

const Port = 1337;

app.listen(Port, () => {
    console.log(`app listen on ${Port}`);
})


