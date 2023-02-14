const express = require('express');
const router = express.Router();


const Blog = require('../models/Blog');



//main routing
router.get("/LoginPage", (req, res) => { res.render('LoginPage') })
router.get("/Sign-upPage", (req, res) => { res.render('Sign-upPage') })
router.get("/About-usPage", (req, res) => { res.render('About-usPage') })
router.get("/BlogMaker-page", (req, res) => { res.render('BlogMaker-page') })
// router.get("/BlogEditor-page", (req, res) => { res.render('BlogEditor-page') })
router.get("/", (req, res) => { res.render('Home') })
router.get("/Blogs-page", (req, res) => {
    Blog.find({}, (err, blogs) => {
        let chunk = []
        let chunkSize = 4
        for (let i = 0; i < blogs.length; i += chunkSize) {
            chunk.push(blogs.slice(i, chunkSize + i))
        }
        res.render('Blogs-page', {
            chunk
        })
    }).sort({ createdAt: "desc" })

})
router.get("/:slug", async (req, res) => {
    const blog = await Blog.findOne({ slug: req.params.slug })
    if (blog != null) {
        res.render('Blog-One', {
            blog
        })
    } else {
        res.redirect('Blogs-page')
    }
})
router.get("/BlogEditor-page/:id", async (req, res) => {
    const blog = await Blog.findById( req.params.id )
        res.render('BlogEditor-page', {
            blog: blog
        })
})


module.exports = router
