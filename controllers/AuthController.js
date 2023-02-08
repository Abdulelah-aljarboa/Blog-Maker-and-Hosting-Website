const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req, res, next) => {

    let userExists = await User.exists({ email: req.body.email })
    if (userExists) {

    }

    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }
        let user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })
        if (req.file) {
            user.avatar = req.file.path
        }



        user.save()
            .then(response => {
                console.log('User Added Successfully!')
                res.redirect('/LoginPage')
            })
            .catch(error => {
                res.json({
                    message: 'An Error Occured!'
                })
            })
    })
}

const login = (req, res, next) => {
    var email = req.body.email
    var password = req.body.password
    
    User.findOne({$or: [{email:email}, {usrname:email}]})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) {
                    res.json({
                        error: err
                    })
                }
                if (result) {
                    let token = jwt.sign({name: user.username}, 'verySecretValue', {expiresIn: '1h'})
                    console.log('Login Succesful!');
                    res.redirect('/Articles-page')
                    // res.json({
                    //     message: "Login Successful!",
                    //     token
                    // })
                } else {
                    res.json({
                        message: "Password Does Not Match!"
                    })
                }
            })
        } else {
            res.json({
                message: "No User Found!"
            })
        }
    })
}

module.exports = {
    register, login
}