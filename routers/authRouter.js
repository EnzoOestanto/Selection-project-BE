const express = require('express')
const { authController } = require('../controllers')
const Router = express.Router()

Router.post('/register', authController.register)
Router.post('/login', authController.login)
Router.post('/activation', authController.activation)

module.exports = Router