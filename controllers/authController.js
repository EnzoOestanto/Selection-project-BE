const db = require('../models')
const userDB = db.user
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const transporter = require('./../helpers/transporter')
const handlebars = require('handlebars');
const fs = require('fs')

module.exports = {
    register: async (req, res) => {
        try {
            const { fullName, username, email, password, passwordConfirmation } = req.body;
            if (!fullName || !username || !email || !password || !passwordConfirmation) {
                throw {
                    status: 400,
                    success: false,
                    message: 'Please fill all fields'
                }
            }
            const usernameReq = /^[A-Za-z0-9]*$/
            const emailReq = /^\S+@\S+\.\S+$/
            if(!username.match(usernameReq)){
                throw {
                    status: 400,
                    success: false,
                    message: 'Username must contain only letters and numbers'
                }
            }
            if(!email.match(emailReq)){
                throw{
                    status: 400,
                    success: false,
                    message: 'Email format is invalid'
                }
            }

            console.log('body', fullName, username, email, password, passwordConfirmation)
            const usernameCheck = await userDB.findOne({
                where: {
                    username: username
                }
            })
            const emailCheck = await userDB.findOne({
                where: {
                    email: email
                }
            })
            if (usernameCheck) {
                throw {
                    status: 400,
                    success: false,
                    message: 'Username already exists'
                };
            } else if (emailCheck) {
                throw {
                    status: 400,
                    success: false,
                    message: 'Email already exists'
                };
            }
            const passwordReq = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
            if (password !== passwordConfirmation) {
                throw {
                    status: 400,
                    success: false,
                    message: 'password did not match'
                }
            }
            if (!password.match(passwordReq)) {
                throw {
                    status: 400,
                    success: false,
                    message: 'password must contain at least 8 characters including an uppercase letter, a symbol, and a number'
                }
            } else {
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt);
                const emailTemplate = fs.readFileSync('./public/email/template.html', 'utf8')
                const tempCompile = await handlebars.compile(emailTemplate)
                const tempResult = tempCompile({link: `http://google.com`})
                const result = await userDB.create({ full_name: fullName, username, email, password: hashedPassword })
                if (result) {
                    await transporter.sendMail({
                        from: 'enzo4862@gmail.com',
                        to: email,
                        subject: 'Registration',
                        html: tempResult
                    })
                }
                
                return res.status(200).send({
                    success: true,
                    message: 'Register success',
                    data: result
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
    login: async (req, res) => {
        try {

            const { loginDetails, password } = req.body
            if (!loginDetails || !password) {
                throw {
                    status: 400,
                    success: false,
                    message: 'Please fill all fields'
                }
            }
            const usernameCheck = await userDB.findOne({
                where: {
                    username: loginDetails
                }
            })
            const emailCheck = await userDB.findOne({
                where: {
                    email: loginDetails
                }
            })
            if (!usernameCheck && !emailCheck) {
                throw {
                    status: 400,
                    success: false,
                    message: 'Invalid credentials'
                }
            }
            let data
            if (emailCheck) {
                data = emailCheck
            } else {
                data = usernameCheck
            }

            let validaiton = await bcrypt.compare(password, data?.password);
            if (validaiton) {
                // console.log('masuk validation if')
                let payload = { id: data.id, username: data.username, email: data.email }
                console.log('payload', payload)
                const token = jwt.sign(payload, 'userVerificationToken')
                return res.status(200).send({
                    status: 200,
                    success: true,
                    message: 'login success',
                    data: data,
                    token: token
                })
            } else {
                throw {
                    status: 400,
                    success: false,
                    message: 'Invalid credentials'
                }
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
