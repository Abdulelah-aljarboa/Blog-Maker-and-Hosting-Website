const Article = require('../models/Article')


//show the list of articles
const index = (req, res, next) => {
    article.find()
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

//show single article
const show = (req, res, next) => {
    let articleID = req.body.articleID
    article.findById(articleID)
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


// add new article
// do we give token here ?
const store = (req, res, next) => {
    let article = new Article({
        articleName: req.body.articleName,
        articleDescription: req.body.articleDescription,
        articleBody: req.body.articleBody
    })
    if(req.file) {
        article.avatar = req.file.path
    }
    
    article.save()
    
    .then(response => {
        console.log('Article Added Successfully!')
        res.redirect('/Articles-page')
    })
    .catch(error => {
        res.json({
            message: 'An Error Occured!'
        })
    })
}

// update article
const update = (req, res, next) => {
    let articleID = req.body.articleID

    let updatedData = {
        articleName: req.body.articleName,
        articleDescription: req.body.articleDescription,
        articleBody: req.body.articleBody,
    }
    if(req.file) {
        updatedData.avatar = req.file.path
    }

    article.findByIdAndUpdate(articleID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'Article updated Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An Error Occured!'
        })
    })
}

// delete article 
const destroy = (req, res, next) => {
    let articleID = req.body.articleID
    article.findByIdAndRemove(articleID)
    .then(() => {
        res.json({
            message: 'Article Deleted Successfully!'
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