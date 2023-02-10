const mongoose = require('mongoose');
const Schema = mongoose.Schema

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
    }
    
    
}, { timestamps: true })

const Article = mongoose.model('Atricle', articleSchema)
module.exports = Article