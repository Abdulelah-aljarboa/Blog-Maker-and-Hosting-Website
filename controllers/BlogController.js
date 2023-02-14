const Blog = require('../models/Blog')
const path = require('path')
const publicDirPath = path.join('./', '/uploads')
const fs = require('fs')
//show the list of blogs
const index = (req, res, next) => {
    Blog.find()
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

//show single blog
const show = (req, res, next) => {
    let blogID = req.body.blogID
    Blog.findById(blogID)
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


// add new blog
const store = async (req, res, next) => {

    let blog = new Blog({
        blogName: req.body.blogName,
        blogDescription: req.body.blogDescription,
        blogBody: req.body.blogBody,
        createdAt: new Date()
    })
    if (req.file) {
        blog.blogImg = req.file.path
    }

    await blog.save()

        .then(response => {
            console.log('Blog Added Successfully!')
            res.redirect(`/${blog.slug}`)
        })
        .catch(error => {
            res.json({
                message: 'An Error Occured!' + error
            })
        })
}

// update blog
const update = async (req, res, next) => {

    //find the image first and delete it from local uploads folder
    let oldblog = await Blog.findById(req.params.id)
    fs.unlink(oldblog.blogImg, (err) => {
        if (err) {
            throw err;
        }
    })
    //normal find and delete
    await Blog.findByIdAndRemove(req.params.id)

    //make new blog object to assaign updated values
    let blog = new Blog({
        blogName: req.body.blogName,
        blogDescription: req.body.blogDescription,
        blogBody: req.body.blogBody,
        createdAt: new Date()
    })
    if (req.file) {
        blog.blogImg = req.file.path
    }

    await blog.save()


        .then(() => {
            console.log("Blog updated Successfully");
            res.redirect(`/${blog.slug}`)
        })
        .catch(error => {
            res.json({
                message: 'An Error Occured!'
            })
        })
}

// delete blog 
const destroy = async (req, res, next) => {
    //find the image first and delete it from local uploads folder
    let blog = await Blog.findById(req.params.id)
    fs.unlink(blog.blogImg, (err) => {
        if (err) {
            throw err;
        }
    })
    //normal find and delete
    Blog.findByIdAndRemove(req.params.id)
        .then(response => {
            console.log('Blog Deleted Successfully!')
            res.redirect('/Blogs-page')
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