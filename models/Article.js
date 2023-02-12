const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { marked } = require('marked')
const slugify = require('slugify');
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const articleSchema = new Schema({
    articleName: {
        type: String,
    },
    articleDescription: {
        type: String
    },
    articleBody: {
        type: String
    },
    articleImg: {
        type: String
    },
    createdAt: {
        type: Date
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
articleSchema.pre('validate', function(next) {
    if (this.articleName) {
        this.slug = slugify(this.articleName, {lower: true, strict: true})
    }
    if (this.articleBody) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.articleBody))
    }
    next()
})

const Article = mongoose.model('Atricle', articleSchema)
module.exports = Article