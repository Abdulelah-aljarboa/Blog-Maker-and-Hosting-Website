const passport = require('passport')
const localStarategy = require('passport-local').Strategy
const User = require('../models/User')
const UserController = require('../controllers/UserController');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local.signup', new localStarategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => {
    if (req.body.password != req.body.confirmPassword) {
        return done(null, false, { message: 'Passwords Do Not Match!' })
    } else {
        User.findOne({ email: username }, (err, user) => {
            if (err) {
                return done(err)
            }
            if (user) {
                return done(null, false, { message: 'Email Already Used!' })
            }
            if (!user) {
                let newUser = new User()
                newUser.username = req.body.username
                newUser.email = req.body.email
                newUser.password = newUser.hashPassword(req.body.password)
                newUser.save((err, user) => {
                    if (!err) {
                        return done(null, user, console.log('Account Made With ID:  ' + user.id))
                    } else {
                        console.log("error");
                    }
                })
            }
        })
    }
}))


passport.use('local.login', new localStarategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => {

    User.findOne({email: username}, (err, user) => {
        if (err) {
            return done(null, false, { message: 'Something Wrong Happened' })
        }
        if (!user) {
            return done(null, false, { message: 'User Not Found' })
        } if (user) {
            if (user.comparePasswords(password, user.password)) {
                return done(null, user, console.log('Welcome Back ' + user.id))
            } else {  
                return done(null, false, { message: 'Password is Wrong'})
            }
        }
    })
}))