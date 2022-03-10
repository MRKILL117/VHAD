'use strict';

module.exports = function(Account) {

    Account.CreateUserWithRole = function(user, callback) {
        const RoleMapping = Account.app.models.RoleMapping;
        const Role = Account.app.models.Role;

        Account.findOne({where: {email: user.email}}, (err, userFound) => {
            if(err) return callback(err);

            if(userFound) return callback(null, false);
            Account.findOrCreate(user, (err, newAccount) => {
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
                            return callback('Rol no especificado');
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
        Account.findOne({where: {code: credentials.code}, include: {'role': 'role'}}, (err, user) => {
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
        console.log("logging out", token);
        Account.logout(token, (err, loggedOut) => {
            if(err) return callback(err);

            return callback(null, loggedOut);
        })
    }

};
