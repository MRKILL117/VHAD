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

    Conekta.AddCardToCostumer = function(customerId, card, callback) {
        console.log("card", card);
        let isNumberValid = conekta.Card.validateNumber(card.number);
        let isExpValid = conekta.Card.validateExpirationDate(card.exp_month,card.exp_year);
        let isCvcValid = conekta.Card.validateCVC(card.cvc);
        
        if(!isNumberValid || !isExpValid || !isCvcValid) return callback(null, {errorCode: 515, message: 'card not valid'});
        console.log("card valid");
        conekta.Token.create({data: {card}}, (err, token) => {
            console.log(err);
            if(err) return callback(err);
            
            console.log("token", token);
            conekta.Customer.find(customerId, (err, customer) => {
                if (err) return callback(err);

                let conektaCard = {
                    type: "card",
                    token_id: token
                }
                customer.createPaymentSource(conektaCard, (err, res) => {
                    if (err) return callback(err);

                    console.log("paymentSource", res);
                    return callback(null, res);
                });
            });
        })
    }

};
