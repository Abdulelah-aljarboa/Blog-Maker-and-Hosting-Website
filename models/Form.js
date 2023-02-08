const mongoose = require('mongoose');
const Schema = mongoose.Schema

const formSchema = new Schema({
    formName: {
        type: String,
    },
    formDescription: {
        type: String
    },
    formImage: {
        type: String
    },
    
}, { timestamps: true })

const Form = mongoose.model('Form', formSchema)
module.exports = Form