'use strict';
const moment = require('moment-timezone');
const globalVariables = require('../global.js');

module.exports = function(Order) {

    Order.CreateOne = function(cartProducts, address, callback) {
        Order.app.models.OrderStatus.GetByName('pendiente', (err, orderStatus) => {
            if(err) return callback(err);

            const order = {
                creationDate: moment().tz(globalVariables.momentTimeZone).toISOString(),
                userId: address.userId,
                addressId: address.id,
                conektaId: null,
                statusId: orderStatus.id
            }
            Order.create(order, (err, newOrder) => {
                if(err) return callback(err);
                
                let cont = 0, limit = cartProducts.length;
                cartProducts.forEach(cartProduct => {
                    const orderProductInstance = {
                        productId: cartProduct.product.id,
                        orderId: newOrder.id,
                        quantity: cartProduct.quantity,
                    }
                    Order.app.models.OrderProduct.create(orderProductInstance, (err, orderProductRelation) => {
                        if(err) return callback(err);
    
                        cont++;
                        if(cont == limit) return callback(null, newOrder);
                    });
                });
            });
        });
    }

};
