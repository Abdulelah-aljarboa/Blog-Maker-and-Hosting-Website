const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { marked } = require('marked')
const slugify = require('slugify');
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const blogSchema = new Schema({
    blogName: {
        type: String,
        required: true
    },
    blogDescription: {
        type: String,
        required: true
    },
    blogBody: {
        type: String,
        required: true
    },
    blogImg: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
    
})
blogSchema.pre('validate', function(next) {
    if (this.blogName) {
        this.slug = slugify(this.blogName, {lower: true, strict: true})
    }
    if (this.blogBody) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.blogBody))
    }
    next()
})

const Blog = mongoose.model('Atricle', blogSchema)
module.exports = Blog