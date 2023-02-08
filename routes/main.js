const express = require('express');
const router = express.Router();
const path = require('path')
const publicDirPath = path.join('../', 'views/')

router.get("/", (req, res) => { res.render(publicDirPath + 'Home.ejs') })
router.get("/Survey-page", (req, res) => { res.render(publicDirPath + 'Survey-page.ejs') })
router.get("/About-usPage", (req, res) => { res.render(publicDirPath + 'About-usPage.ejs') })
router.get("/Survey-One", (req, res) => { res.render(publicDirPath + 'Survey-One.ejs') })
router.get("/LoginPage", (req, res) => { res.render(publicDirPath + 'LoginPage.ejs') })
router.get("/Sign-upPage", (req, res) => { res.render(publicDirPath + 'Sign-upPage.ejs') })


module.exports = router
