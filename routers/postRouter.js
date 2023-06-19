const express = require('express')
const { postController } = require('../controllers')
const { multerUpload } = require('../middleware/multer')
const Router = express.Router()

Router.post('/',multerUpload.single('image'), postController.createPost)
Router.get('/',postController.getAllPost)
Router.put('/:id',postController.editPost)
Router.delete('/:id',postController.deletePost)

module.exports = Router
