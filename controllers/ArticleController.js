const Article = require('../models/Article')
const path = require('path')
const publicDirPath = path.join('./', '/uploads')
const fs = require('fs')
//show the list of articles
const index = (req, res, next) => {
    Article.find()
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
    Article.findById(articleID)
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
const store = async (req, res, next) => {

    let article = new Article({
        articleName: req.body.articleName,
        articleDescription: req.body.articleDescription,
        articleBody: req.body.articleBody,
        createdAt: new Date()
    })
    if (req.file) {
        article.articleImg = req.file.path
    }

    await article.save()

        .then(response => {
            console.log('Article Added Successfully!')
            res.redirect(`/${article.slug}`)
        })
        .catch(error => {
            res.json({
                message: 'An Error Occured!' + error
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
    if (req.file) {
        updatedData.avatar = req.file.path
    }

    article.findByIdAndUpdate(articleID, { $set: updatedData })
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
const destroy = async (req, res, next) => {
    //find the image first and delete it from local uploads folder
    const article = await Article.findById(req.params.id)
    fs.unlink(article.articleImg, (err) => {
        if (err) {
            throw err;
        }
    }) 
    //normal find and delete
    Article.findByIdAndRemove(req.params.id)
    .then(response => {
        console.log('Article Deleted Successfully!')
        res.redirect('/Articles-page')
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