var nodemailer = require('nodemailer');

function send(mail) {   

    var transport = {
        // host: 'u21044794.wl045.sendgrid.net', // Don’t forget to replace with the SMTP host of your provider
        host: 'relay-hosting.secureserver.net',
        port: 25,
        secure: false,
        // auth: {
        //     user: creds.USER,
        //     pass: creds.PASS
        // }
    }

    console.log("Content: " + JSON.stringify(mail));

    var transporter = nodemailer.createTransport(transport)

    transporter.verify((error, success) => {
        if (error) {
            console.log("Error verifying: " + error);
        } else {
            console.log('Server is ready to send  messages');
            // send the email only after its been verified.
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
        }
    });
})

module.exports.send = send;