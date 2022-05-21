'use strict';
const moment = require('moment-timezone');

module.exports = function(UserAttention) {

    UserAttention.CreateOne = function(request, userAttention, callback) {
        const userId = request.accessToken.userId;
        if(!userId) return callback({errorCode: 504, message: 'user not found'});
        userAttention.userId = userId;
        UserAttention.create(userAttention, (err, newAttention) => {
            if(err) return callback(err);
            
            newAttention.SendToAdmins((err, sended) => {
                if(err) return callback(err);
                
                return callback(null, newAttention);
            })
        });
    }

    UserAttention.prototype.SendToAdmins = function(callback) {
        UserAttention.findById(this.id, {include: 'user'}, (err, helpRequest) => {
            if(err) return callback(err);

            UserAttention.app.models.Account.GetAllAccounts((err, users) => {
                if(err) return callback(err);
    
                const adminsEmails = users.filter(user => user.role.name == 'Admin').map(admin => admin.email);
                const htmlParams = {
                    userRequestName: helpRequest.user().name,
                    requestSubject: helpRequest.subject,
                    request: helpRequest.comment,
                    platformName: 'VHAD',
                    currentYear: moment().tz(`America/Mexico_City`).year()
                }
                const html = UserAttention.app.models.Mail.GenerateHtml('help-request.ejs', htmlParams);
                console.log(adminsEmails);
                let cont = 0, limit = adminsEmails.length;
                if(!limit) return callback(null, true);
                adminsEmails.forEach(adminEmail => {
                    const emailData = {
                        to: adminEmail,
                        subject: 'Petición de ayuda VHAD',
                        text: '',
                        html
                    }
                    UserAttention.app.models.Mail.SendEmail(emailData, (err, mailSent) => {
                        if(err) return callback(err);
        
                        cont++;
                        if(cont == limit) return callback(null, true);
                    });
                });
            });
        });
    }

    UserAttention.GetDisregarded = function(callback) {
        UserAttention.find({where: {attended: false}}, (err, userAttentions) => {
            if(err) return callback(err);

            return callback(null, userAttentions);
        });
    }

};
