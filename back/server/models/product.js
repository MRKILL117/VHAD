'use strict';

module.exports = function(Product) {

    Product.CreateProduct = function(product, callback) {
        Product.create(product, (err, newProduct) => {
            if(err) return callback(err);

            return callback(null, newProduct);
        });
    }

    Product.GetProducts = function(callback) {
        Product.find({where: {isDeleted: false}}, (err, products) => {
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
