const express = require('express');
const passport = require('passport');
const router = express.Router();


const Blog = require('../models/Blog');


//main routing
router.get("/LoginPage", (req, res) => { res.render('LoginPage') })
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
router.post("/Login", passport.authenticate('local.login',
    {
        successRedirect: '/',
        failureRedirect: '/LoginPage',
        failureFlash: true
    }))
router.get("/Sign-upPage", (req, res) => { res.render('Sign-upPage') })
router.get("/About-usPage", (req, res) => { res.render('About-usPage') })
router.get("/BlogMaker-page", (req, res) => {
    res.render('BlogMaker-page', {
        message: req.flash('error')
    })
})
router.get("/", (req, res) => { res.render('Home') })
router.get("/Blogs-page", (req, res) => {
    Blog.find({}, (err, blogs) => {
        let chunk = []
        let chunkSize = 4
        for (let i = 0; i < blogs.length; i += chunkSize) {
            chunk.push(blogs.slice(i, chunkSize + i))
        }
        res.render('Blogs-page', {
            chunk: chunk,
            message: req.flash("info")
        })
    }).sort({ createdAt: "desc" })

})
router.get("/:slug", async (req, res) => {
    const blog = await Blog.findOne({ slug: req.params.slug })
    if (blog != null) {
        res.render('Blog-One', {
            blog,
            message: req.flash("info")

        })
    } else {
        res.redirect('Blogs-page')
    }
})
router.get("/BlogEditor-page/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    res.render('BlogEditor-page', {
        blog: blog
    })
})


module.exports = router
