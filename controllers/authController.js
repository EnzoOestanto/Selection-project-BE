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
            if (!username.match(usernameReq)) {
                throw {
                    status: 400,
                    success: false,
                    message: 'Username must contain only letters and numbers'
                }
            }
            if (!email.match(emailReq)) {
                throw {
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
                const status = false
                const result = await userDB.create({ full_name: fullName, username, email, password: hashedPassword, status })
                if (!result) {
                    throw {
                        status: 500,
                        success: false,
                        message: 'register failed'
                    }
                }
                let payload = { email: result.email }
                console.log('payload', payload)
                const token = jwt.sign(payload, 'userVerificationToken')
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
                    message: 'Register success, verification email has been sent',
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
            let emailCheck
            let usernameCheck
            if (loginDetails.includes("@")) {
                emailCheck = await userDB.findOne({
                    where: {
                        email: loginDetails
                    }
                })
            } else {
                usernameCheck = await userDB.findOne({
                    where: {
                        username: loginDetails
                    }
                })
            }
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
                console.log('masuk validation if')
                console.log('data', data)
                let payload = { id: data.id, username: data.username}
                console.log('payload', payload)
                const token = jwt.sign(payload, 'loginToken')

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
    },
    activation: async (req, res) => {
        try {
            let token = req.headers.authorization
            console.log('BE token', token);
            token = token.split(' ')[1]
            if (token === 'null' || !token) {
                throw ({
                    status: 401,
                    success: false,
                    message: 'Invalid token'
                })
            }
            let verifyToken = jwt.verify(token, 'userVerificationToken')
            let email = verifyToken.email

            const emailCheck = await userDB.findOne({
                where: {
                    email: email
                }
            })
            if (!emailCheck) {
                throw ({
                    status: 401,
                    success: false,
                    message: 'Invalid token'
                })
            }


            const result = await userDB.update({ status: 1 }, {
                where: {
                    email: email
                }
            })
            return res.status(200).send({
                status: 200,
                success: true,
                message: 'Activation Success',

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
    forgotPassword: async (req, res) => {
        try {
            const { loginDetails } = req.query
            console.log(loginDetails)

            if (!loginDetails) {
                throw {
                    status: 400,
                    success: false,
                    message: 'Please enter email or username'
                }
            }

            let data
            if (loginDetails.includes("@")) {
                data = await userDB.findOne({
                    where: {
                        email: loginDetails
                    }
                })
            } else {
                data = await userDB.findOne({
                    where: {
                        username: loginDetails
                    }
                })
            }
            if (!data) {
                throw {
                    status: 400,
                    success: false,
                    message: 'email or username not found'
                }
            } else {
                const emailTemplate = fs.readFileSync('./public/email/template1.html', 'utf8')
                const tempCompile = await handlebars.compile(emailTemplate)
                const email = data.email
                let payload = { email: email }
                console.log('payload', payload)
                const token = jwt.sign(payload, 'passwordResetToken')
                const text = 'to reset yout password, please click the reset password link below'
                const linkText = 'Click here to go to the reset password page'
                const tempResult = tempCompile({ token: token, text: text, linkText: linkText })
                await transporter.sendMail({
                    from: 'enzo4862@gmail.com',
                    to: email,
                    subject: 'Password Reset',
                    html: tempResult
                })

                return res.status(200).send({
                    status: 200,
                    success: true,
                    message: 'reset password email has been sent',
                    data: []
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
    },
    resetPassword: async (req, res) => {
        try {
            const passwordReq = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
            let token = req.headers.authorization
            const { password, passwordConfirmation } = req.body
            console.log('masuk resert pass');

            if (password !== passwordConfirmation) {
                throw ({
                    status: 400,
                    success: false,
                    message: 'password and password confirmation do not match'
                })
            }
            if (!password.match(passwordReq)) {
                throw {
                    status: 400,
                    success: false,
                    message: 'password must contain at least 8 characters including an uppercase letter, a symbol, and a number'
                }
            }

            token = token.split(' ')[1]
            let resetPasswordToken = jwt.verify(token, 'passwordResetToken')
            let email = resetPasswordToken.email
            console.log('>>>', email)

            const emailCheck = await userDB.findOne({
                where: {
                    email: email
                }
            })

            if (!emailCheck) {
                throw ({
                    status: 401,
                    success: false,
                    message: 'Invalid token'
                })
            }
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt);

            const result = await userDB.update({ password: hashedPassword }, {
                where: {
                    email: email
                }
            })
            return res.status(200).send({
                status: 200,
                success: true,
                message: 'Reset Password Success',

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
