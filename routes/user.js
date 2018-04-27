const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const main = require('../views/main');

router.get('/', (req, res, next) => {
    try {
        res.send(main(''));
    } catch (err) {
        next(err);
    }
});


module.exports = router;
