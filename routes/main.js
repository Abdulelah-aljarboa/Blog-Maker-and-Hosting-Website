const express = require('express');
const router = express.Router();
const path = require('path')
const publicDirPath = path.join('../', 'views/')
const Article = require('../models/Article');


router.get("/LoginPage", (req, res) => { res.render(publicDirPath + 'LoginPage.ejs') })
router.get("/Sign-upPage", (req, res) => { res.render(publicDirPath + 'Sign-upPage.ejs') })
router.get("/About-usPage", (req, res) => { res.render(publicDirPath + 'About-usPage.ejs') })
router.get("/ArticleMaker-page", (req, res) => { res.render(publicDirPath + 'ArticleMaker-page.ejs') })
router.get("/", (req, res) => { res.render(publicDirPath + 'Home.ejs') })
router.get("/Articles-page", (req, res) => {
    Article.find({}, (err, articles) => {
        let chunk = []
        let chunkSize = 4
        for (let i = 0; i < articles.length; i += chunkSize) {
            chunk.push(articles.slice(i, chunkSize + i))
        }
        res.render(publicDirPath + 'Articles-page.ejs', {
            chunk
        })
    })

})
router.get("/:id", (req, res) => {
    Article.findOne({_id: req.params.id}, (err, article) => {
       if(!err) {
        res.render(publicDirPath + 'Article-One.ejs', {
            article
        })
    }
    })
})



module.exports = router
