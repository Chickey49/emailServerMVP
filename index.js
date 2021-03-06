var express = require('express');
var router = express.Router();

var cors = require('cors');
const creds = require('./config');
var config = require('dotenv').config()
var sender = require('./sendmailgun.js');


router.post('/send', (req, res, next) => {
    var name = req.body.name
    var phone = req.body.phone
    var email = req.body.email
    var message = req.body.message
    var content = `name: ${name} \n phone: ${phone} \n email: ${email} \n message: ${message} `

    var mail = {
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_FROM,  // Change to email address that you want to receive messages on
        subject: 'Contact us form',        
        text: content
    }

    console.log("Content: " + JSON.stringify(mail));
    res.status(200).send(sender.send(mail));
    
})

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);
app.listen(process.env.PORT);
console.log("Listening on " + process.env.PORT);