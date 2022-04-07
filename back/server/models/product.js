'use strict';
var moment = require('moment-timezone');

module.exports = function(Product) {

    Product.CreateProduct = function(product, callback) {
        Product.create(product, (err, newProduct) => {
            if(err) return callback(err);

            if(product.images && product.images.length) {
                let cont = 0, limit = product.images.length;
                product.images.forEach((imageRoute, i) => {
                    const documentInstance = {
                        name: `${product.name}_imagen_${i+1}`,
                        partialURL: imageRoute,
                        modified: moment().tz('America/Mexico_City').toISOString()
                    }
                    newProduct.images.create(documentInstance, (err, productImage) => {
                        console.log(err);
                        if(err) return callback(err);

                        cont++;
                        if(cont == limit) return callback(null, newProduct);
                    });

                });
            }
            else return callback(null, newProduct);
        });
    }

    Product.GetProducts = function(callback) {
        Product.find({where: {isDeleted: false}, include: 'images'}, (err, products) => {
            if(err) return callback(err);

            return callback(null, products);
        })
    }

    Product.prototype.UpdateProduct = function(product, callback) {
        this.name = product.name;
        this.description = product.description;
        this.save((err, product) => {
            if(err) return callback(err);

            return callback(null, product);
        });
    }

    Product.prototype.DeleteProduct = function(callback) {
        this.isDeleted = true;
        this.save((err, product) => {
            if(err) return callback(err);

            return callback(null, product);
        });
    }

};
