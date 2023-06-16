const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'enzo4862@gmail.com',
        pass: 'kjzrydfwscrnolkh'
    },
    tls:{
        rejectUnauthorized: false
    }
})

module.exports = transporter