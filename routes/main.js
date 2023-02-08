const express = require('express');
const router = express.Router();
const path = require('path')
const publicDirPath = path.join('../', 'views/')

router.get("/", (req, res) => { res.render(publicDirPath + 'Home.ejs') })
router.get("/Articles-page", (req, res) => { res.render(publicDirPath + 'Articles-page.ejs') })
router.get("/About-usPage", (req, res) => { res.render(publicDirPath + 'About-usPage.ejs') })
router.get("/Article-One", (req, res) => { res.render(publicDirPath + 'Article-One.ejs') })
router.get("/LoginPage", (req, res) => { res.render(publicDirPath + 'LoginPage.ejs') })
router.get("/Sign-upPage", (req, res) => { res.render(publicDirPath + 'Sign-upPage.ejs') })


module.exports = router
