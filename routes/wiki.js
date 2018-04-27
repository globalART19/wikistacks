const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
//const main = require('../views/main');
const { Page } = require('../models');
const { addPage, editPage, main, userList, userPages, wikiPage } = require('../views');

router.get('/', (req, res, next) => {
    try {
        res.send(main(''));
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const page = new Page({
            title: req.body.title,
            content: req.body.content
        })
        await page.save();
        console.log(page)
        res.redirect('/');
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
