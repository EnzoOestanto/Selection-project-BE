const db = require('../models')
const likeDB = db.like
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const transporter = require('./../helpers/transporter')
const handlebars = require('handlebars');
const fs = require('fs')

module.exports = {
    addLike: async (req, res) => {
        try {
            const { postId, userId } = req.body
            const response = await likeDB.create({ post_id: postId, user_id: userId })

            return res.status(201).send({
                status: 201,
                success: true,
                message: 'like success',
                data: response,
            })

        } catch (error) {
            res.send({
                status: error.status,
                success: error.success,
                message: error.message
            })
        }
    },
    getLikes: async (req, res) => {
        try {
            console.log('masuk get likes')
            const { postId, userId } = req.query
            const totalLikes = await likeDB.count({
                where: {
                    post_id: postId,
                }
            })
            const response = await likeDB.count({
                where: {
                    post_id: postId,
                    user_id: userId
                }
            })

            return res.status(200).send({
                status: 200,
                success: true,
                message: 'get likes sucess',
                totalLikes: totalLikes,
                data: response

            })

        } catch (error) {

        }
    },
    deleteLike: async (req, res) => {
        try {

            const { postId, userId } = req.query
            const response = await likeDB.destroy({
                where: {
                    post_id: postId,
                    user_id: userId
                }
            })
            console.log('delete',response)

            if (response > 0) {
                return res.status(200).send({
                    status: 200,
                    success: true,
                    message: 'unlike success',
                    data: response

                })
            }
        } catch (error) {
            res.send({
                status: error.status,
                success: error.success,
                message: error.message,
                data: []
            })

        }
    }
}