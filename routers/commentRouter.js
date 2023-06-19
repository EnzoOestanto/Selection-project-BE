const express = require('express')
const { commentController } = require('../controllers')

const Router = express.Router()

Router.post('/', commentController.addComment)
Router.get('/', commentController.getAllComment)

module.exports = Router
