'use strict';
const moment = require('moment-timezone');
const globalVariables = require('../global.js');

module.exports = function(Order) {

    Order.CreateOne = function(req, cartProducts, address, payment, callback) {

        Order.SubtractStockOfProducts(cartProducts, (err, productsUpdated) => {
            if(err) return callback(err);
            
            const userId = req.accessToken.userId;
            Order.app.models.Account.GetUserWithRole(userId, (err, user) => {
                if(err) return callback(err);
    
                Order.app.models.Conekta.CreateOrder(user.conektaCostumerId, payment, cartProducts, (err, conektaOrder) => {
                    if(err) {
                        Order.AddStockOfProducts(cartProducts, (err2, productsUpdated) => {
                            if(err2) return callback(err2);
                            return callback(err);
                        });
                    } else {
                        Order.app.models.OrderStatus.GetAll((err, orderStatuses) => {
                            if(err) return callback(err);
                
                            const order = {
                                creationDate: moment().tz(globalVariables.momentTimeZone).toISOString(),
                                userId,
                                addressId: address ? address.id : null,
                                conektaId: conektaOrder ? conektaOrder.id : null,
                                conektaOrder: conektaOrder ? conektaOrder : null,
                                statusId: orderStatuses.find(status => status.name.toLowerCase().includes('abierto')).id,
                                paymentMethod: payment.method,
                                clientName: payment.client,
                                sellerId: user.role().role().name != 'User' || payment.method == 'cash' ? userId : null,
                                total: cartProducts.reduce((total, cartProduct) => {
                                    const productPrice = cartProduct.product.activeOffer ? cartProduct.product.offerPrice : cartProduct.product.price;
                                    return total + (cartProduct.quantity * productPrice);
                                }, 0)
                            }
                            Order.create(order, (err, newOrder) => {
                                if(err) return callback(err);
                                
                                let orderProductInstances = [];
                                cartProducts.forEach(cartProduct => {
                                    orderProductInstances.push({
                                        productId: cartProduct.product.id,
                                        orderId: newOrder.id,
                                        quantity: cartProduct.quantity,
                                        total: cartProduct.quantity * (cartProduct.product.activeOffer ? cartProduct.product.offerPrice : cartProduct.product.price)
                                    });
                                });
                                Order.app.models.OrderProduct.create(orderProductInstances, (err, orderProductRelation) => {
                                    if(err) return callback(err);
                                    
                                    return callback(null, newOrder);
                                });
                            });
                        });
                    }
                    
                });
            });
        });
    }

    Order.SubtractStockOfProducts = function(cartProducts, callback) {
        let cont = 0, limit = cartProducts.length, error;
        if(!limit) return callback(null, 0);
        cartProducts.forEach(cartProduct => {
            Order.app.models.Product.SubtractStock(cartProduct.product.id, cartProduct.quantity, (err, productUpdated) => {
                if(err) error = err;

                cont++;
                if(cont == limit) {
                    if(error) return callback(error);
                    else return callback(null, cartProducts.length);
                }
            });
        });
    }
    
    Order.AddStockOfProducts = function(cartProducts, callback) {
        let cont = 0, limit = cartProducts.length, error;
        if(!limit) return callback(null, 0);
        cartProducts.forEach(cartProduct => {
            Order.app.models.Product.AddStock(cartProduct.product.id, cartProduct.quantity, (err, productUpdated) => {
                if(err) error = err;
    
                cont++;
                if(cont == limit) {
                    if(error) return callback(error);
                    else return callback(null, cartProducts.length);
                }
            });
        });
    }

    Order.GetAll = function(statusIds = [], callback) {
        let ordersFilter = {
            where: {},
            order: 'creationDate ASC'
        }
        if(statusIds && statusIds.length) ordersFilter.where['statusId'] = {inq: statusIds};
        Order.find(ordersFilter, (err, orders) => {
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
        Order.GetAll(null, (err, orders) => {
            if(err) return callback(err);

            const order = orders.find(order => order.id == orderId);
            if(!order) return callback({errorCode: 504, message: 'instance not found'});
            return callback(null, order);
        });
    }

    Order.prototype.UpdateSeller = function(sellerId, callback) {
        if(this.sellerId) return callback({errorCode: 505, message: 'order already has seller'});
        Order.app.models.OrderStatus.GetByName('proceso', (err, status) => {
            if(err) return callback(err);

            this.statusId = status.id;
            this.sellerId = sellerId;
            this.save((err, orderSaved) => {
                if(err) return callback(err);
    
                return callback(null, orderSaved);
            });
        });
    }
    
    Order.prototype.ChangeStatus = function(status, callback) {
        if(!!status.id) {
            this.statusId = status.id;
            this.save((err, orderSaved) => {
                if(err) return callback(err);
                
                return callback(null, orderSaved);
            });
        }
        else {
            Order.app.models.OrderStatus.GetByName(status, (err, status) => {
                if(err) return callback(err);
        
                this.statusId = status.id;
                this.save((err, orderSaved) => {
                    if(err) return callback(err);
        
                    return callback(null, orderSaved);
                });
            });
        }
    }

};
