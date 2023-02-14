const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const BlogController = require('../controllers/BlogController');
const upload = require('../middleware/upload')

router.get('/', BlogController.index)
router.post('/show', BlogController.show)
router.post('/store',upload.single('blogImg'), BlogController.store)
router.put('/:id',upload.single('blogImg') ,BlogController.update)
router.delete('/:id', BlogController.destroy)

module.exports = router
