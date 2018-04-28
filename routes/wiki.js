const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');
const { addPage, editPage, main, wikiPage } = require('../views');

router.get('/', async (req, res, next) => {
    try {
        const allPages = await Page.findAll()
        res.send(main(allPages));
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const [author, wasCreated] = await User.findOrCreate({
            where: {
                name: req.body.name,
                email: req.body.email
            }
        })
        const page = await Page.create(req.body)
        page.setAuthor(author)
        res.redirect(`/wiki/${page.slug}`);
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

router.get('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where:
                { slug: req.params.slug }
        })
        console.log('req.query object', req.query)
        console.log('req.query.name', req.query.name)
        console.log('query of db', await User.findAll({ where: { name: req.query.name } }))
        const author = await page.getAuthor()
        res.send(wikiPage(page, author));
    } catch (err) {
        next(err);
    }
});

module.exports = router;
