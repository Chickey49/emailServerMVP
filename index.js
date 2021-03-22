var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var cors = require('cors');
const creds = require('./config');

var transport = {
    host: 'u21044794.wl045.sendgrid.net', // Don’t forget to replace with the SMTP host of your provider
    port: 25,
    auth: {
        user: creds.USER,
        pass: creds.PASS
    }
}


router.post('/', (req, res, next) => {
    var name = req.body.name
    var phone = req.body.phone
    var email = req.body.email
    var message = req.body.message
    var content = `name: ${name} \ phone: ${phone} \n email: ${email} \n message: ${message} `

    var mail = {
        from: name,
        to: 'camslens@gmail.com',  // Change to email address that you want to receive messages on
        subject: 'Request from contact us form',
        text: content
    }

    var transporter = nodemailer.createTransport(transport)

    transporter.verify((error, success) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Server is ready to take messages');
        }
    });



    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                status: 'fail'
            })
        } else {
            res.json({
                status: 'success'
            })
        }
    })
})

const app = express()
app.use(cors())
app.use(express.json())
app.use('/', router)
app.listen(3002)