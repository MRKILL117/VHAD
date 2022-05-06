'use strict';

module.exports = function(Address) {

    Address.CreateOne = function(address, callback) {
        Address.create(address, (err, newAddress) => {
            if(err) return callback(err);

            return callback(null, newAddress);
        });
    }

    Address.GetUserAddresses = function(userId, callback) {
        Address.find({where: {userId}}, (err, userAddresses) => {
            if(err) return callback(err);

            return callback(null, userAddresses);
        });
    }

};
