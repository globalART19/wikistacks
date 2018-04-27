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
        //console.log(req.body)
        const page = new Page({
            title: req.body.title,
            content: req.body.content,
            slug: slugConverter(req.body.title)
        })
        //res.json(req.body);
        await page.save();
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

function slugConverter(title){
  return title.replace(/\s+/g,'_').replace(/\W/g,'');
}


module.exports = router;
