const express = require('express')
const { userController } = require('../controllers')
const { multerUpload } = require('../middleware/multer')
const Router = express.Router()


Router.get('/:id',userController.getUser)
Router.put('/:id',userController.editProfile)
Router.put('/image/:id',userController.editImage)

module.exports = Router
