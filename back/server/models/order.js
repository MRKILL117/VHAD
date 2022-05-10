'use strict';
const moment = require('moment-timezone');
const globalVariables = require('../global.js');

module.exports = function(Order) {

    Order.CreateOne = function(cartProducts, address, callback) {
        Order.app.models.OrderStatus.GetByName('abierto', (err, orderStatus) => {
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
                        if(cont == limit) {
                            Order.SubtractStockOfProducts(cartProducts, (err, productsUpdated) => {
                                if(err) return callback(err);

                                return callback(null, newOrder);
                            });
                        }
                    });
                });
            });
        });
    }

    Order.SubtractStockOfProducts = function(cartProducts, callback) {
        let cont = 0, limit = cartProducts.length;
        if(!limit) return callback(null, 0);
        cartProducts.forEach(cartProduct => {
            Order.app.models.Product.SubtractStock(cartProduct.product.id, cartProduct.quantity, (err, productUpdated) => {
                if(err) return callback(err);

                cont++;
                if(cont == limit) return callback(null, cartProducts.length);
            });
        });
    }

    Order.GetAll = function(callback) {
        Order.find({order: 'creationDate ASC'}, (err, orders) => {
            if(err) return callback(err);

            orders = orders.map(order => {
                const orderFormated = {
                    ...order.toJSON(),
                    products: order.products().map(productRelation => {
                        const productFormated = {
                            ...productRelation.toJSON(),
                            ...productRelation.product().toJSON()
                        }
                        delete productFormated.product;
                        return productFormated;
                    })
                }
                return orderFormated;
            });
            return callback(null, orders);
        });
    }

    Order.GetById = function(orderId, callback) {
        Order.GetAll((err, orders) => {
            if(err) return callback(err);

            const order = orders.find(order => order.id == orderId);
            if(!order) return callback({errorCode: 504, message: 'instance not found'});
            return callback(null, order);
        });
    }

    Order.prototype.UpdateSeller = function(sellerId, callback) {
        this.sellerId = sellerId;
        this.save((err, orderSaved) => {
            if(err) return callback(err);

            return callback(null, orderSaved);
        });
    }

};
