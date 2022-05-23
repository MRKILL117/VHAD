'use strict';
const conekta = require('conekta');
const globalVariables = require('../global.js');
conekta.api_key = globalVariables.conektaKey;
conekta.locale = 'es';
conekta.api_version = '2.0.0';

module.exports = function(Conekta) {

    Conekta.CreateCostumer = function(user, callback) {
        const conektaCostumer = {
            name: user.name,
            email: user.email,
            phone: user.cellphone
        }
        conekta.Customer.create(conektaCostumer, (err, newCostumer) => {
            if(err) return callback(err);

            return callback(null, newCostumer.toObject());
        })
    }

    Conekta.GetCustomer = function(customerId, callback) {
        conekta.Customer.find(customerId, (err, costumer) => {
            if(err) return callback(err);

            return callback(null, costumer);
        });
    }

    Conekta.AddCardToCostumer = function(customerId, card, callback) {
        conekta.Customer.find(customerId, (err, customer) => {
            if (err) return callback(err);

            let conektaCard = {
                type: "card",
                token_id: card.token.id
            }
            customer.createPaymentSource(conektaCard, (err, res) => {
                if (err) return callback(err);

                return callback(null, res);
            });
        });
    }


    Conekta.CreateOrder = function(customerId, payment, cartProducts, callback) {
        if(payment.method != 'card') return callback(null, false);
        let conektaOrder = {
            currency: "MXN",
            customer_info: {customer_id: customerId},
            line_items: cartProducts.map(cartProduct => {
                let productPrice = String(cartProduct.product.activeOffer ? cartProduct.product.offerPrice : cartProduct.product.price);
                if(productPrice.indexOf('.') < 0) productPrice += '00';
                else productPrice = productPrice.replace('.', '');
                let line_item = {
                    name: cartProduct.product.name,
                    unit_price: parseInt(productPrice),
                    quantity: cartProduct.quantity
                }
                return line_item;
            }),
            charges: [{
                payment_method: {
                    type: 'card',
                    payment_source_id: payment.card.id
                }
            }]
        };

        conekta.Order.create(conektaOrder, (err, newConektaOrder) => {
            if(err) return callback(err);

            return callback(null, newConektaOrder.toObject());
        })
    }

};
