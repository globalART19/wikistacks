const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
//const main = require('../views/main');
const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views');

router.get('/', (req, res, next) => {
    try {
        res.send(main(''));
    } catch (err) {
        next(err);
    }
});

router.post('/', (req, res, next) => {
    try {
        console.log(req.body)
        res.json(req.body);
    } catch (err) {
        next(err);
    }
});

router.get('/add', (req, res, next) => {
    try {
        res.send(addPage());
    } catch (err) {
        next(err);
    }
});

module.exports = router;
