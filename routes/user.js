const express = require('express');
const router = express.Router();
const passport = require('passport')
const UserController = require('../controllers/UserController');
const upload = require('../middleware/upload')

router.get('/', UserController.index)
router.post('/show', UserController.show)
router.post('/register', passport.authenticate('local.signup',
{
    successRedirect: '/LoginPage',
    failureRedirect: '/Sign-upPage', 
    failureFlash: true
}))
router.post('/update', UserController.update)
router.post('/delete', UserController.destroy)

module.exports = router
