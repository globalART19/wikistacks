const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const main = require('../views/main');

router.get('/', (req, res, next) => {
    try {
        res.send('get');
    } catch (err) {
        next(err);
    }
});

router.post('/', (req, res, next) => {
    try {
        res.send('post');
    } catch (err) {
        next(err);
    }
});

router.get('/add', (req, res, next) => {
    try {
        res.send('add get');
    } catch (err) {
        next(err);
    }
});

module.exports = router;
