'use strict';

module.exports = function(Mail) {

    Mail.SendEmail = function(emailData, callback) {
        Mail.send({
            to: emailData.to,
            from: emailData.from,
            subject: emailData.subject,
            text: emailData.text,
            html: emailData.html
        }, (err, mailSent) => {
            if(err) return callback(err);
            return callback(null, 'sent');
        });
    }

};
