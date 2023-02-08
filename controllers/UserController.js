const User = require('../models/User')


//show the list of users
const index = (req, res, next) => {
    User.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An Error Occured!'
        })
    })


}

//show single user
const show = (req, res, next) => {
    let userID = req.body.userID
    User.findById(userID)
    .then(response => {
        res.json({
            response
        })
    }) 
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}


// add new user
// do we give token here ?
const store = (req, res, next) => {
    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    if(req.file) {
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
}

// update user
const update = (req, res, next) => {
    let userID = req.body.userID

    let updatedData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    User.findByIdAndUpdate(userID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'User updated Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An Error Occured!'
        })
    })
}

// delete user 
const destroy = (req, res, next) => {
    let userID = req.body.userID
    User.findByIdAndRemove(userID)
    .then(() => {
        res.json({
            message: 'User Deleted Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An Error Occured!'
        })
    })
}

module.exports = {
    index, show, store, update, destroy
}