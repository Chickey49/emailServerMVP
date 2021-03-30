var Mailgun = require('mailgun-js');

//API_KEY = ENV['MAILGUN_API_KEY']
//API_URL = "https://api:#{API_KEY}@api.mailgun.net/v2/<your-mailgun-domain>"

// process.env('MAILGUN_API_KEY'),
// process.env(' MAILGUN_DOMAIN, MAILGUN_PUBLIC_KEY, MAILGUN_SMTP_LOGIN, MAILGUN_SMTP_PASSWORD, MAILGUN_SMTP_PORT, MAILGUN_SMTP_SERVER.


function send(mail) {

    //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
    var mailgun = new Mailgun(
        {
            apiKey: process.env.MAILGUN_API_KEY, 
            domain: process.env.MAILGUN_DOMAIN
        });

    var data = {
        //Specify email data
        from: mail.from,
        //The email to contact
        to: mail.to,
        //Subject and text data  
        subject: mail.subject,
        html: mail.content
    }

    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, function (err, body) {
        //If there is an error, render the error page
        if (err) {
            res.status("500").send('error', { error : err});
            console.log("got an error: ", err);
        }
        //Else we can greet    and leave
        else {
           
            res.status("200").send('submitted');
            console.log(data);
        }
    });
}

module.exports.send = send;