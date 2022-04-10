'use strict';
var moment = require('moment-timezone');
const { v4: uuidv4 } = require('uuid');

var GenerateUserCode = function(role) {
    let userCode = '';
    for (let i = 0; i < 3; i++) {
        const randNum = Math.round(9 * Math.random());
        userCode = userCode.concat(String(randNum));
    }
    switch (role) {
        case 'Admin': return `0${userCode}`;
        case 'Seller': return `1${userCode}`;
        case 'User': return `2${userCode}`;
        default: return null;
    }
}

var GenerateRestorePasswordPin = function() {
    let userRestorePin = '';
    for (let i = 0; i < 6; i++) {
        const randNum = Math.round(9 * Math.random());
        userRestorePin = userRestorePin.concat(String(randNum));
    }
    return userRestorePin;
}

module.exports = function(Account) {

    Account.GetRoles = function(callback) {
        Account.app.models.Role.find((err, roles) => {
            if(err) return callback(err);

            roles = roles.map(role => {
                let label = '';
                switch (role.name) {
                  case 'Admin': label = 'Administrador'; break;
                  case 'Seller': label = 'Empleado'; break;
                  case 'User': label = 'Usuario'; break;
                }
                return {
                  ...role.toJSON(),
                  label
                }
              });
            return callback(null, roles);
        })
    }

    Account.GenerateUserCode = function(role, callback) {
        let userCode = GenerateUserCode(role);
        Account.findOne({where: {username: userCode}}, (err, userFound) => {
            if(err) return callback(err);
            if(!userFound) return callback(null, userCode);
            else {
                Account.GenerateUserCode(role, (err, userCode) => {
                    if(err) return callback(err);
    
                    return callback(null, userCode);
                });
            }
        });
    }

    Account.GenerateUserResetPasswordPin = function(callback) {
        let restorePasswordPin = GenerateRestorePasswordPin();
        Account.findOne({where: {restorePasswordPin}}, (err, userFound) => {
            if(err) return callback(err);
            if(!userFound) return callback(null, restorePasswordPin);
            else {
                Account.GenerateUserResetPasswordPin((err, restorePasswordPin) => {
                    if(err) return callback(err);
    
                    return callback(null, restorePasswordPin);
                });
            }
        });
    }

    Account.CreateUserWithRole = function(user, callback) {
        const RoleMapping = Account.app.models.RoleMapping;
        const Role = Account.app.models.Role;
        
        Account.GenerateUserCode(user.role, (err, userCode) => {
            if(err) return callback(err);

            if(!user.username) user.username = userCode;
            Account.findOne({where: {or: [{email: user.email}, {username: user.username}]}}, (err, userFound) => {
                if(err) return callback(err);
    
                if(userFound) return callback({errorCode: 410, message: 'email or username already registered'});
                Account.create(user, (err, newAccount) => {
                    if(err) return callback(err);
                    
                    Role.findOne({where: {name: user.role}}, (err, role) => {
                        if(err) {
                            newAccount.destroy((err2, destroyed) => {
                                if(err2) return callback(err2);
                                return callback(err);
                            });
                        }
                        if(!role) {
                            newAccount.destroy((err2, destroyed) => {
                                if(err2) return callback(err2);
                                return callback({errorCode: 412, message: 'instance not found'});
                            });
                        }
                        else {
                            role.principals.create({
                                principalType: RoleMapping.USER,
                                principalId: newAccount.id
                            }, (err, principal) => {
                                if(err) return callback(err);
            
                                return callback(null, newAccount);
                            });
                        }
                    });
                });
            });
        });
    }

    Account.GetUserWithRole = function(userId, callback) {
        Account.findById(userId, {include: {'role': 'role'}}, (err, user) => {
            if(err) return callback(err);

            return callback(null, user);
        })
    }

    Account.RegisterUser = function(userData, callback) {
        if(!userData) return callback({errorCode: 411, message: 'no data'});
        userData.role = 'User';
        Account.CreateUserWithRole(userData, (err, newUser) => {
            if(err) return callback(err);
            
            newUser.verificationLink = uuidv4();
            newUser.save((err, userSaved) => {
                if(err) return callback(err);

                const emailData = {
                    to: userSaved.email,
                    subject: 'Verificación de correo para cuenta VHAD',
                    text: `Link de verificación: http://localhost:4200/verificar-email/${userSaved.verificationLink}`,
                    html: null
                }
                Account.app.models.Mail.SendEmail(emailData, (err, mailSent) => {
                    if(err) return callback(err);

                    return callback(null, newUser);
                });
            });
        });
    }

    Account.prototype.UpdateAccount = function(userData, callback) {
        const generateToken = this.email != userData.email && userData.generateToken ? true : false;
        this.name = userData.name;
        this.email = userData.email;
        this.save((err, userSaved) => {
            if(err) return callback(err);
            
            Account.GetUserWithRole(this.id, (err, userWithRole) => {
                if(err) return callback(err);
                
                if(generateToken) {
                    userWithRole.createAccessToken(-1, (err, token) => {
                        if(err) return callback(err);
                        
                        const user = {
                            ...userWithRole.toJSON(),
                            role: userWithRole.role().role(),
                            token
                        }
                        return callback(null, user);
                    });
                }
                else {
                    const user = {
                        ...userWithRole.toJSON(),
                        role: userWithRole.role().role()
                    }
                    return callback(null, user);
                }
            });
        });
    }

    Account.prototype.DeleteAccount = function(callback) {
        Account.app.models.RoleMapping.findOne({where: {principalId: this.id}}, (err, userRoleRelation) => {
            if(err) return callback(err);
            
            userRoleRelation.destroy((err, userRoleRelationDestroyed) => {
                if(err) return callback(err);

                this.destroy((err, userDeleted) => {
                    if(err) return callback(err);
        
                    return callback(null, userDeleted);
                });
            });
        });
    }

    Account.GetAllAccounts = function(callback) {
        Account.find({include: {'role': 'role'}}, (err, users) => {
            if(err) return callback(err);

            const usersWithRole = users.map(user => {
                return {
                    ...user.toJSON(),
                    role: user.role().role()
                };
            });
            return callback(null, usersWithRole);
        });
    }

    Account.GetAccountsFiltered = function(txtToFilter, role, callback) {
        Account.GetAllAccounts((err, users) => {
            if(err) return callback(err);

            users = users.filter(user => {
                if(!role || role == '*') return true;
                if(user.role.name == role) return true;
                return false;
            }).filter(user => {
                let match = false;
                let txt = txtToFilter.toLowerCase();
                if(!txt || txt == '*') return true;
                if(user.name.toLowerCase().includes(txt)) match = true;
                if(user.username.toLowerCase().includes(txt)) match = true;
                if(user.email.toLowerCase().includes(txt)) match = true;
                return match;
            });

            return callback(null, users);
        })
    }

    Account.LogIn = function(credentials, callback) {
        let filter = {where: {}, include: {'role': 'role'}};
        if(credentials.hasOwnProperty('username')) filter.where['username'] = credentials.username;
        if(credentials.hasOwnProperty('email')) filter.where['email'] = credentials.email;

        Account.findOne(filter, (err, user) => {
            if(err) return callback(err);
            
            if(!user) return callback('Usuario no registrado');
            credentials.email = user.email;
            credentials.ttl = -1;
            Account.login(credentials, (err, token) => {
                if(err) return callback(err);
    
                user = Object.assign({}, user.toJSON());
                user.role = user.role.role;
                user.token = token;
                return callback(null, user);
            });
        });
    }

    Account.LogOut = function(token, callback) {
        Account.logout(token, (err, loggedOut) => {
            if(err) return callback(err);

            return callback(null, loggedOut);
        })
    }

    Account.prototype.FirstTimeConfiguration = function(accountData, callback) {
        Account.findOne({where: {email: accountData.email}}, (err, userFound) => {
            if(err) return callback(err);

            if(userFound && userFound.id != this.id) return callback({errorCode: 410, message: 'email already registered'});
            this.setPassword(String(accountData.password), (err, userUpdated) => {
                if(err) return callback(err);
                
                this.name = accountData.name;
                this.email = accountData.email;
                this.firstTimeConfiguration = true;
                this.save((err, accountSaved) => {
                    if(err) return callback(err);
                    
                    Account.findById(this.id, {include: {'role': 'role'}}, (err, account) => {
                        if(err) return callback(err);
                        
                        account.createAccessToken(-1, {}, (err, userToken) => {
                            if(err) return callback(err);
    
                            let user = Object.assign({}, account.toJSON());
                            user.role = user.role.role;
                            user.token = userToken;
                            return callback(null, user);
                        })
                    });
                });
            });
        });
    }

    Account.GenerateRestorePasswordPinAndSendByMail = function(emailOrUsername, callback) {
        Account.findOne({
            where: {
                or: [{email: emailOrUsername}, {username: emailOrUsername}]
            },
            include: {'role': 'role'}
        }, (err, userFound) => {
            if(err) return callback(err);
            
            if(!userFound) return callback({errorCode: 412, message: 'instance not found'});
            const user = {
                ...userFound.toJSON(),
                role: userFound.toJSON().role.role
            };
            if(user.role.name == 'Admin') {
                return callback({errorCode: 415, message: `admin can't recover password by email`});
            }

            const userPin = GenerateRestorePasswordPin();
            userFound.restorePasswordPin = userPin;
            userFound.save((err, userSaved) => {
                if(err) return callback(err);

                const htmlParams = {
                    username: userFound.name,
                    userPin: userPin,
                    platformName: 'VHAD',
                    currentYear: moment().tz(`America/Mexico_City`).year()
                }
                const html = Account.app.models.Mail.GenerateHtml('recover-password.ejs', htmlParams);
                const emailData = {
                    to: userFound.email,
                    subject: 'Recuperación de contraseña de cuenta VHAD',
                    text: '',
                    html
                }
                Account.app.models.Mail.SendEmail(emailData, (err, mailSent) => {
                    if(err) return callback(err);
                    return callback(null, userFound);
                });
            });
        })
    }

    Account.CheckVerificationCode = function(verificationCode, callback) {
        Account.findOne({where: {restorePasswordPin: verificationCode}}, (err, userFound) => {
            if(err) return callback(err);

            if(!userFound) return callback({errorCode: 412, message: 'instance not found'});
            return callback(null, userFound);
        });
    }

    Account.SetPassword = function(userId, newPassword, callback) {
        Account.setPassword(userId, newPassword, (err) => {
            if(err) return callback(err);

            return callback(null, true);
        });
    }

    Account.prototype.ChangePassword = function(oldPassword, newPassword, callback) {
        this.changePassword(oldPassword, newPassword, (err) => {
            if(err) return callback(err);

            return callback(null, true);
        });
    }

    Account.RestorePassword = function(verificationCode, newPassword, callback) {
        Account.CheckVerificationCode(verificationCode, (err, user) => {
            if(err) return callback(err);

            user.restorePasswordPin = null;
            user.save((err, userSaved) => {
                if(err) return callback(err);

                userSaved.setPassword(newPassword, (err) => {
                    if(err) return callback(err);

                    return callback(null, true);
                })
            });
        });
    }

    Account.VerifyEmail = function(verificationLink, callback) {
        Account.findOne({where: {verificationLink}}, (err, user) => {
            if(err) return callback(err);

            if(!user) return callback({errorCode: 412, message: 'instance not found'});
            user.verificationLink = null;
            user.emailVerified = true;
            user.save((err, saved) => {
                if(err) return callback(err);

                return callback(null, true);
            })
        })
    }

};
