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
            from: 'a20310066@ceti.mx',
            subject: emailData.subject,
            html: emailData.html
        }, (err, mailSent) => {
            if(err) return callback(err);
            return callback(null, 'sent');
        });
    }

};
