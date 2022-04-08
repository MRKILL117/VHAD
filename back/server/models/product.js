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
        });
    }

    Product.prototype.UpdateProduct = function(product, callback) {
        this.UpdateImages(product.images, product.deletedImages).then(updated => {
            this.name = product.name;
            this.description = product.description;
            this.save((err, product) => {
                if(err) return callback(err);
    
                return callback(null, product);
            });
        }, err => {
            return callback(err);
        });
    }

    Product.prototype.UpdateImages = function(newImages, imagesDeleted) {
        return new Promise(async (res, rej) => {
            try {
                if(newImages && newImages.length) {
                    await newImages.forEach(async (imageRoute, i) => {
                        const documentInstance = {
                            name: `${this.name}_imagen_${i+1}`,
                            partialURL: imageRoute,
                            modified: moment().tz('America/Mexico_City').toISOString()
                        }
                        await this.images.create(documentInstance);
                        
                    });
                }
                if(imagesDeleted && imagesDeleted.length) {
                    await imagesDeleted.forEach(async image => {
                        const fileName = image.partialURL.split('/').pop();
                        const folderName = image.partialURL.split('/')[2];
                        await Product.app.models.Folder.removeFile(folderName, fileName);
                        await this.images.destroy(image.id);
                    });
                }
                res(true);
            } catch (err) {
                rej(err);
            }
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
