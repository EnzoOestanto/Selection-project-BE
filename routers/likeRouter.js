const express = require('express')
const { likeController } = require('../controllers')
const { multerUpload } = require('../middleware/multer')
const Router = express.Router()

Router.get('/', likeController.getLikes)
Router.post('/', likeController.addLike)
Router.delete('/', likeController.deleteLike)


module.exports = Router
