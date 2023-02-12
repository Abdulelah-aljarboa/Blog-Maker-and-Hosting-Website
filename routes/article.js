const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const ArticleController = require('../controllers/ArticleController');
const upload = require('../middleware/upload')

router.get('/', ArticleController.index)
router.post('/show', ArticleController.show)
router.post('/store',upload.single('articleImg'), ArticleController.store)
router.post('/update', ArticleController.update)
router.delete('/:id', ArticleController.destroy)

module.exports = router
