const db = require('../models')
const userDB = db.user
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const transporter = require('./../helpers/transporter')
const handlebars = require('handlebars');
const fs = require('fs')

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
            const { bio, full_name, oldUsername, newUsername } = req.body
            const file = req.file
            let token = req.headers.authorization
            const usernameReq = /^[A-Za-z0-9]*$/
            console.log('Edit profile', bio, id, full_name, newUsername, oldUsername)
            console.log(token)

            if (oldUsername !== newUsername) {
                const userCheck = await userDB.findOne({
                    where: {
                        username: newUsername
                    }
                })
                if (userCheck) {
                    throw ({
                        status: 400,
                        success: false,
                        message: 'username already exists'
                    })
                } else if (!newUsername.match(usernameReq)) {
                    throw {
                        status: 400,
                        success: false,
                        message: 'Username must contain only letters and numbers'
                    }
                }
            }
            const result = await userDB.update({ full_name, username: newUsername, bio, image: file?.filename }, {
                where: {
                    id: id
                }
            })
            return res.status(200).send({
                status: 200,
                success: true,
                message: 'Profile updated',
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
    emailRequest: async (req, res) => {
        try {
            const { id } = req.params
            let result = await userDB.findOne({
                where: {
                    id: id
                }
            })

            const email = result?.email
            let payload = { email: email }
            const token = jwt.sign(payload, 'userVerificationToken')

            const emailTemplate = fs.readFileSync('./public/email/template.html', 'utf8')
            const tempCompile = await handlebars.compile(emailTemplate)
            const text = 'please activate your account by clicking the activation link below'
            const linkText = 'Click here to go to the activation page'
            const tempResult = tempCompile({ token: token, text: text, linkText: linkText })
            await transporter.sendMail({
                from: 'enzo4862@gmail.com',
                to: email,
                subject: 'Registration',
                html: tempResult
            })
            return res.status(200).send({
                status: 200,
                success: true,
                message: 'Verification email has been sent',
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

    }


}
