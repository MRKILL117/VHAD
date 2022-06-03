'use strict';

var loopback = require("loopback");
var path = require('path');

module.exports = function(Mail) {

    Mail.GenerateHtml = function(htmlName, htmlParams) {
        let render = loopback.template(path.resolve(__dirname, `../ejs-emails/${htmlName}`));
        return render(htmlParams);
    }

    Mail.SendEmail = function(emailData, callback) {
        console.log("sendingt to...", emailData.to);
        Mail.send({
            to: emailData.to,
            from: 'proyecto.vaiz@gmail.com',
            subject: emailData.subject,
            text: emailData.text,
            html: emailData.html
        }, (err, mailSent) => {
            // if(err) return callback(err);
            if(err) {
                console.error(err);
                return callback(null, 'not send');
            }
        });
        return callback(null, 'sent');
    }

};
