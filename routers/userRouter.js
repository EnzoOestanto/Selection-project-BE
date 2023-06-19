const express = require('express')
const { userController } = require('../controllers')
const { multerUpload } = require('../middleware/multer')
const Router = express.Router()


Router.get('/:id', userController.getUser)
Router.post('/profile/:id',  multerUpload.single('image'), userController.editProfile)
Router.get('/emailrequest/:id', userController.emailRequest)


module.exports = Router
