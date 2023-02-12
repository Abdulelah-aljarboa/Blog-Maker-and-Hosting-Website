const path = require('path')
const multer = require('multer') //Needs an install 


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var upload = multer ({
    storage: storage,
    
    limits: {
        fileSize: 2048 * 2048 * 2
    }
})

module.exports = upload