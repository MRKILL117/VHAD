'use strict';

module.exports = function(OrderStatus) {

    OrderStatus.GetAll = function(callback) {
        OrderStatus.find({}, (err, orderStatuses) => {
            if(err) return callback(err);

            orderStatuses = orderStatuses.sort((a, b) => {
                if(a.name > b.name) return 1;
                if(a.name < b.name) return -1;
                return 1;
            });
            return callback(null, orderStatuses);
        });
    }

    OrderStatus.GetByName = function(name, callback) {
        OrderStatus.findOne({where: {name: {like: `%${name}%`}}}, (err, orderStatus) => {
            if(err) return callback(err);

            if(!orderStatus) return callback({errorCode: 504, message: 'instance not found'});
            return callback(null, orderStatus);
        });
    }

};
