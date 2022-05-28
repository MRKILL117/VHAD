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
    
                const userRole = user.role().role().name;
                Order.app.models.Conekta.CreateOrder(user.conektaCostumerId, payment, cartProducts, (err, conektaOrder) => {
                    if(err) {
                        Order.AddStockOfProducts(cartProducts, (err2, productsUpdated) => {
                            if(err2) return callback(err2);
                            return callback(err);
                        });
                    } else {
                        Order.app.models.OrderStatus.GetAll((err, orderStatuses) => {
                            if(err) return callback(err);

                            let statusName = 'abierto';
                            switch (payment.method) {
                                case 'cash': statusName = 'entregado'; break;
                                case 'card': statusName = userRole != 'User' ? 'proceso' : 'abierto'; break;
                            }
                            const status = orderStatuses.find(status => status.name.toLowerCase().includes(statusName.toLowerCase()));
                            const order = {
                                creationDate: moment().tz(globalVariables.momentTimeZone).toISOString(),
                                userId,
                                addressId: address ? address.id : null,
                                conektaId: conektaOrder ? conektaOrder.id : null,
                                conektaOrder: conektaOrder ? conektaOrder : null,
                                statusId: status.id,
                                paymentMethod: payment.method,
                                clientName: payment.client,
                                sellerId: userRole != 'User' || payment.method == 'cash' ? userId : null,
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
                                    
                                    Order.SendTicket(newOrder.id, (err, sended) => {
                                        if(err) return callback(err);

                                        if(payment.method == 'card' && userRole != 'User') {
                                            user.DeleteCard(payment.card.id, (err, cardDeleted) => {
                                                return callback(null, newOrder);
                                            });
                                        }
                                        else return callback(null, newOrder);
                                    });
                                });
                            });
                        });
                    }
                    
                });
            });
        });
    }

    Order.SendTicket = function(orderId, callback) {
        Order.GetById(orderId, (err, order) => {
            if(err) return callback(err);

            if(!order || !order.user) return callback({errorCode: 504, message: 'order not found or not user'});
            const htmlParams = {
                username: order.user.name,
                orderId: order.id,
                products: order.products.map(product => {
                    const productPrice = product.activeOffer ? product.offerPrice : product.price;
                    const productMapped = {
                        key: product.key,
                        name: product.name,
                        quantity: product.quantity,
                        price: productPrice,
                        total: productPrice * product.quantity,
                    };
                    return productMapped;
                }),
                currentYear: moment().tz(`America/Mexico_City`).year()
            }
            const html = Order.app.models.Mail.GenerateHtml('order-ticket.ejs', htmlParams);
            const emailData = {
                to: order.user.email,
                subject: 'Gracias por su compra de VHAD',
                text: '',
                html
            }
            Order.app.models.Mail.SendEmail(emailData, (err, mailSent) => {
                if(err) return callback(err);

                return callback(null, 'ok');
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
            const productId = cartProduct.product ? cartProduct.product.id : cartProduct.id;
            Order.app.models.Product.AddStock(productId, cartProduct.quantity, (err, productUpdated) => {
                if(err) error = err;
    
                cont++;
                if(cont == limit) {
                    if(error) return callback(error);
                    else return callback(null, cartProducts.length);
                }
            });
        });
    }

    Order.GetAll = function(statusIds = [], productIds = [], sellerIds = [], paymentMethod = null, startDate = null, endDate = null, callback) {
        let ordersFilter = {
            where: {},
            order: 'creationDate ASC'
        }
        if(statusIds && statusIds.length) ordersFilter.where['statusId'] = {inq: statusIds};
        if(sellerIds && sellerIds.length) ordersFilter.where['sellerId'] = {inq: sellerIds};
        if(paymentMethod && paymentMethod != '*') ordersFilter.where['paymentMethod'] = {like: `%${paymentMethod}%`};
        if(startDate && startDate != '*') {
            const searchGreaterThanStartDate = {creationDate: {gte: moment(startDate).startOf('day').toISOString()}}
            if(!ordersFilter.where.and) ordersFilter.where['and'] = [searchGreaterThanStartDate];
            else ordersFilter.where.and.push(searchGreaterThanStartDate);
        }
        if(endDate && endDate != '*') {
            const searchLowerThanEndDate = {creationDate: {lte: moment(endDate).endOf('day').toISOString()}}
            if(!ordersFilter.where.and) ordersFilter.where['and'] = [searchLowerThanEndDate];
            else ordersFilter.where.and.push(searchLowerThanEndDate);
        }
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

            if(productIds && productIds.length) {
                orders = orders.filter(order => {
                    let match = false;
                    let orderProductIds = order.products.map(product => product.id);
                    orderProductIds.forEach(productId => {
                        if(productIds.includes(productId)) match = true;
                    });
                    return match;
                });
            }
            return callback(null, orders);
        });
    }

    Order.GetById = function(orderId, callback) {
        Order.GetAll(null, null, null, null, null, null, (err, orders) => {
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

            Order.find({where: {sellerId, statusId: status.id}}, (err, ordersAttendedBySeller) => {
                if(err) return callback(err);

                if(ordersAttendedBySeller.length) return callback({errorCode: 506, message: 'seller already has order in process'});
                this.statusId = status.id;
                this.sellerId = sellerId;
                this.save((err, orderSaved) => {
                    if(err) return callback(err);

                    return callback(null, orderSaved);
                });
            });
        });
    }
    
    Order.prototype.ChangeStatus = function(status, callback) {
        Order.GetById(this.id, (err, order) => {
            if(err) return callback(err);

            if(order.isCancelled) return callback({errorCode: 508, message: 'order cancelled'});
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
        })
    }

    Order.prototype.CancelOrder = function(callback) {
        Order.GetById(this.id, (err, order) => {
            if(err) return callback(err);

            if(!order || !order.user) return callback({errorCode: 504, message: 'order not found or not user'});
            const htmlParams = {
                orderId: order.id,
                user: order.user,
                products: order.products.map(product => {
                    const productPrice = product.total / product.quantity;
                    const productMapped = {
                        key: product.key,
                        name: product.name,
                        quantity: product.quantity,
                        price: productPrice,
                        total: product.total,
                    };
                    return productMapped;
                }),
                currentYear: moment().tz(`America/Mexico_City`).year()
            }
            const html = Order.app.models.Mail.GenerateHtml('cancel-order.ejs', htmlParams);
            const emailData = {
                to: null,
                subject: 'Orden cancelada de VHAD',
                text: '',
                html
            }
            Order.app.models.Account.SendEmailByRole('admin', emailData, (err, mailSent) => {
                if(err) return callback(err);

                Order.app.models.OrderStatus.GetByName('cancelado', (err, cancelledStatus) => {
                    if(err) return callback(err);

                    Order.AddStockOfProducts(order.products, (err, productsModified) => {
                        if(err) return callback(err);

                        this.isCancelled = true;
                        this.statusId = cancelledStatus.id;
                        this.save((err, orderSaved) => {
                            if(err) return callback(err);

                            if(this.sellerId) {
                                Order.app.models.Account.SendEmailByUserId(this.sellerId, emailData, (err, sended) => {
                                    return callback(null, order);
                                });
                            }
                            else return callback(null, order);
                        });
                    });
                });
            });
        });
    }

    // -------------------------------------- FedEx -------------------------------------- //

    Order.CreateFedexShipment = function(orderId, callback) {
        Order.GetById(orderId, (err, order) => {
            if(err) return callback(err);

            return callback(null, order);
        });
    }

    /* fedex repsonse
    {
        "transactionId": "624dxxx6-b709-470c-8c39-4b55xxxxx492",
        "customerTransactionId": "order123xxxx89",
        "output": {
            "asynchronousProcessingResultsDetail": "SYNCHRONOUSLY_PROCESSED",
            "jobId": "abc123456",
            "transactionShipments": [],
            "alerts": []
        }
    }
    */

};
