const express = require('express');
const router = express.Router();


const Article = require('../models/Article');



//main routing
router.get("/LoginPage", (req, res) => { res.render('LoginPage') })
router.get("/Sign-upPage", (req, res) => { res.render('Sign-upPage') })
router.get("/About-usPage", (req, res) => { res.render('About-usPage') })
router.get("/ArticleMaker-page", (req, res) => { res.render('ArticleMaker-page') })
router.get("/", (req, res) => { res.render('Home') })
router.get("/Articles-page", (req, res) => {
    Article.find({}, (err, articles) => {
        let chunk = []
        let chunkSize = 4
        for (let i = 0; i < articles.length; i += chunkSize) {
            chunk.push(articles.slice(i, chunkSize + i))
        }
        res.render('Articles-page', {
            chunk
        })
    }).sort({createdAt: "desc"})

})
router.get("/:slug", async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug})
        if (article != null) {
            res.render('Article-One', {
                article
            })
        } else {
            res.redirect('Articles-page')
        }
    })



module.exports = router
