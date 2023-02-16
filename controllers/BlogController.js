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
        createdAt: new Date(),
        author: req.body.author
    })
    if (req.file) {
        blog.blogImg = req.file.path
    }

    await blog.save()

        .then(response => {
            console.log('Blog Added Successfully!')
            req.flash('info', 'New Blog Added Successfully!')
            // res.redirect(`/${blog.slug}`)
            res.redirect('/Blogs-page')
        })
        .catch(error => {
            res.json({
                message: 'An Error Occured!' + error
            })
        })
}

// update blog
const update = async (req, res, next) => {

    let oldblog = await Blog.findById(req.params.id)

    if (req.file) {
    //find the image first and delete it from local uploads folder
    fs.unlink(oldblog.blogImg, (err) => {
        if (err) {
            throw err;
        }
    })
}
    //normal find and delete
    await Blog.findByIdAndRemove(req.params.id)

    //make new blog object to assaign updated values
    let blog = new Blog({
        blogName: req.body.blogName,
        blogDescription: req.body.blogDescription,
        blogBody: req.body.blogBody,
        createdAt: new Date(),
        author: req.body.author,
        blogImg: oldblog.blogImg

    })
    if (req.file) {
        blog.blogImg = req.file.path
    }

    await blog.save()


        .then(() => {
            req.flash('info', 'Blog Updated!')
            console.log("Blog updated Successfully");
            res.redirect(`/${blog.slug}`)
        })
        .catch(error => {
            res.json({
                message: 'An Error Occured!' + error
            })
        })
}

// delete blog 
const destroy = async (req, res, next) => {
    //find the image first and delete it from local uploads folder
    let blog = await Blog.findById(req.params.id)
    if (blog != null) {
    fs.unlink(blog.blogImg, (err) => {
        if (err) {
            throw err;
        }
    })
}
    //normal find and delete
    Blog.findByIdAndRemove(req.params.id)
        .then(response => {
            req.flash('info', 'Blog Deleted!')
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