const db = require('../models')
const userDB = db.user
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    getUser: async (req, res) => {
        try {
            const { id } = req.params
            let result = await userDB.findOne({
                where: {
                    id: id
                }
            })
            if (!result) {
                throw {
                    status: 404,
                    success: false,
                    message: 'user not found'
                };
            }
            return res.status(200).send({
                status: 200,
                success: true,
                message: 'get user success',
                data: result
            })

        } catch (error) {
            res.send({
                status: error.status,
                success: error.success,
                message: error.message
            })
        }
    },
    editProfile: async (req, res) => {
        try {
            const { id } = req.params
            const { bio, image } = req.body
            console.log('Edit profile', bio)

            const userCheck = await userDB.findOne({
                where: {
                    id: id
                }
            })
            if (!userCheck) {
                throw ({
                    status: 404,
                    success: false,
                    message: 'user not found'
                })
            }
            const result = await userDB.update({ bio }, {
                where: {
                    id: id
                }
            })
            return res.status(200).send({
                status: 200,
                success: true,
                message: 'Bio updated',
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
    editImage: async (req, res) => {
        try {
            const { id } = req.params
            const { image } = req.body
            const file = req.file

            let token = req.headers.authorization
            token = token.split(' ')[1]
            if (token === 'null' || !token) {
                throw ({
                    status: 401,
                    success: false,
                    message: 'Invalid token'
                })
            }
            let verifyToken = jwt.verify(token, 'loginToken')
            const userCheck = await userDB.findOne({
                where: {
                    id: id
                }
            })


        } catch (error) {

        }
    }



}
