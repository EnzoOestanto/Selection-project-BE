const db = require('../models')
const postDB = db.post
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const transporter = require('./../helpers/transporter')
const handlebars = require('handlebars');
const fs = require('fs')

module.exports = {
    createPost: async (req, res) => {
        try {
            const { post, image } = req.body
            const file = req.file
            console.log('file', file)
            console.log('body', req.body)
            let token = req.headers.authorization
            token = token.split(' ')[1]
            if (token === 'null' || !token) {
                throw ({
                    status: 401,
                    success: false,
                    message: 'Invalid token'
                })
            }
            if (!post) {
                throw {
                    status: 400,
                    success: false,
                    message: 'you cannot create an empty post'
                }
            }
            let verifyToken = jwt.verify(token, 'loginToken')

            const result = await postDB.create({ text: post, user_id: verifyToken.id, image: file?.filename })
            if (!result) {
                throw {
                    status: 500,
                    success: false,
                    message: 'creating post failed'
                }
            }

            console.log('>>', verifyToken)
            return res.status(201).send({
                status: 201,
                success: true,
                message: 'New Post created successfully',
                data: result,
            })
        } catch (error) {
            res.send({
                status: error.status,
                success: error.success,
                message: error.message
            })
        }
    },
    getAllPost: async (req, res) => {
        try {
            //pagination
            const { page, limit } = req.query
            const pageLimit = Number(limit)
            const offset = (page - 1) * pageLimit
            const response = await postDB.count()
            console.log('allpost',response)
            let totalPage = Math.ceil(response / pageLimit)

            let result = await postDB.findAll({
                include: db.user,
                order: [['updatedAt', 'DESC']],
                limit: pageLimit,
                offset: offset,
            })
            console.log('masuk get all')
            if (result.length > 0) {
                return res.status(200).send({
                    status: 200,
                    success: true,
                    message: 'get all post success',
                    data: result,
                    totalPage: totalPage
                })
            } else {
                res.status(404).send({
                    success: true,
                    message: 'post not found',
                    data: {}
                })
            }
        } catch (error) {
            res.send({
                status: error.status,
                success: error.success,
                message: error.message
            })
        }
    },
    editPost: async (req, res) => {
        try {
            const { id } = req.params
            const { text } = req.body

            let result = await postDB.update({ text }, { where: { id: id } })
            return res.status(200).send({
                status: 200,
                success: true,
                message: 'Post updated',
                data: result
            })

        } catch (error) {
            res.send({
                status: error.status,
                success: error.success,
                message: error.message,
                data: []
            })
        }
    },
    deletePost: async (req, res) => {
        try {
            const { id } = req.params
            let result = await postDB.destroy({ where: { id: id } })
            return res.status(200).send({
                status: 200,
                success: true,
                message: 'Post deleted',
                data: result
            })
        } catch (error) {
            res.send({
                status: error.status,
                success: error.success,
                message: error.message,
                data: []
            })

        }
    },
    


}
