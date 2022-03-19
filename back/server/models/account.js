'use strict';

var GenerateUserCode = function(role) {
    const userCode = Math.round(999 * Math.random());
    switch (role) {
        case 'Admin': return `0${userCode}`;
        case 'Seller': return `1${userCode}`;
        case 'User': return `2${userCode}`;
        default: return null;
    }
}

module.exports = function(Account) {

    Account.GetRoles = function(callback) {
        Account.app.models.Role.find((err, roles) => {
            if(err) return callback(err);

            return callback(null, roles);
        })
    }

    Account.GenerateUserCode = function(role) {
        return new Promise(async (res, rej) => {
            try {
                let userCode = GenerateUserCode(role);
                let userFound = await Account.findOne({where: {username: userCode}});
                if(!userFound) res(userCode);
                else userCode = res(await Account.GenerateUserCode(role));
            }
            catch (err) {
                rej(err);
            }
        });
    }

    Account.CreateUserWithRole = async function(user, callback) {
        const RoleMapping = Account.app.models.RoleMapping;
        const Role = Account.app.models.Role;
        
        try {
            if(!user.username) user.username = await Account.GenerateUserCode(user.role);
        } catch (err) {
            return callback(err);
        }

        Account.findOne({where: {or: [{email: user.email}, {username: user.username}]}}, (err, userFound) => {
            if(err) return callback(err);

            if(userFound) return callback(null, false);
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
    }

    Account.RegisterUser = function(userData, callback) {
        if(!userData) return callback({errorCode: 411, message: 'no data'});
        userData.role = 'User';
        Account.CreateUserWithRole(userData, (err, newUser) => {
            if(err) return callback(err);

            return callback(null, newUser);
        })
    }

    Account.prototype.UpdateAccount = function(userData, callback) {
        this.name = userData.name;
        this.email = userData.email;
        this.save((err, userSaved) => {
            if(err) return callback(err);

            return callback(null, userSaved);
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
            })
        })
    }

    Account.GetAllAccounts = function(callback) {
        Account.find({include: {'role': 'role'}}, (err, users) => {
            if(err) return callback(err);

            const usersWithRole = users.map(user => {
                return {
                    ...user.toJSON(),
                    role: user.role().role()
                };
            })
            return callback(null, usersWithRole);
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
            this.changePassword('p4ssw0rd', String(accountData.password), (err, userUpdated) => {
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

};
