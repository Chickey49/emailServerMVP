var express = require('express');
var router = express.Router();

var cors = require('cors');
const creds = require('./config');
var sender = require('./sendmailgun.js');


router.post('/send', (req, res, next) => {
    var name = req.body.name
    var phone = req.body.phone
    var email = req.body.email
    var message = req.body.message
    var content = `name: ${name} \ phone: ${phone} \n email: ${email} \n message: ${message} `

    var mail = {
        from: name,
        to: 'camslens@gmail.com',  // Change to email address that you want to receive messages on
        subject: 'Contact us form',
        port: 25,
        text: content
    }

    console.log("Content: " + JSON.stringify(mail));
    sender.send(mail);
    
})

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);
app.listen(3002);