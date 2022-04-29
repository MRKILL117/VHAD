'use strict';
var moment = require('moment-timezone');

var GenerateProductKey = function(codeLength = 6) {
    let randCode = '';
    for (let i = 0; i < codeLength; i++) {
        const randNum = Math.round(9 * Math.random());
        randCode = randCode.concat(String(randNum));
    }
    return randCode;
}

var GetNow = function() {
    return moment().tz('America/Mexico_City').toISOString();
}

module.exports = function(Product) {

    Product.GenerateKey = function(callback) {
        let productKey = GenerateProductKey();
        Product.findOne({where: {key: productKey}}, (err, product) => {
            if(err) return callback(err);
            
            if(!product) return callback(null, productKey);
            else {
                Product.GenerateKey((err, productKey) => {
                    if(err) return callback(err);

                    return callback(null, productKey);
                });
            }
        })
    }

    Product.CreateProduct = function(product, callback) {
        Product.GenerateKey((err, productKey) => {
            if(err) return callback(err);

            product.key = productKey;
            product.creationDate = GetNow();
            product.modified = GetNow();
            Product.create(product, (err, newProduct) => {
                if(err) return callback(err);
    
                if(product.images && product.images.length) {
                    let cont = 0, limit = product.images.length;
                    product.images.forEach((imageRoute, i) => {
                        const documentInstance = {
                            name: `${product.name}_imagen_${i+1}`,
                            partialURL: imageRoute,
                            modified: GetNow()
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
        });
    }

    Product.GetProducts = function(filterText = '', categoriesIds = [], asCostumer = false, callback) {
        let filter = {
            where: {
                and: [
                    {isDeleted: false},
                ]
            },
            include: ['images', 'category']
        };
        if(asCostumer) filter.where.and.push({isVisible: true});
        if(categoriesIds && categoriesIds.length) filter.where.and.push({categoryId: {inq: [categoriesIds]}});
        if(filterText && filterText != '*') {
            const filterByText = {or: [
                {key: {like: `%${filterText}%`}},
                {name: {like: `%${filterText}%`}},
                {description: {like: `%${filterText}%`}},
            ]}
            filter.where.and.push(filterByText);
        }
        Product.find(filter, (err, products) => {
            if(err) return callback(err);

            return callback(null, products);
        });
    }

    Product.GetOfferedProducts = function(filterByText = '*', categoriesIds = [], asCostumer = false, callback) {
        Product.GetProducts(filterByText, categoriesIds, asCostumer, (err, products) => {
            if(err) return callback(err);

            if(filterByText == '*' && !categoriesIds.length) products = products.filter(prod => prod.activeOffer);
            return callback(null, products);
        });
    }

    Product.prototype.UpdateProduct = function(product, callback) {
        this.UpdateImages(product.images, product.deletedImages).then(updated => {
            if(product.hasOwnProperty('name')) this.name = product.name;
            if(product.hasOwnProperty('description')) this.description = product.description;
            if(product.hasOwnProperty('price')) this.price = product.price;
            if(product.hasOwnProperty('stock') && this.stock != product.stock) this.modified = GetNow();
            if(product.hasOwnProperty('stock')) this.stock = product.stock;
            if(product.hasOwnProperty('isVisible')) this.isVisible = product.isVisible;
            if(product.hasOwnProperty('categoryId')) this.categoryId = product.categoryId;
            if(product.hasOwnProperty('activeOffer')) this.activeOffer = product.activeOffer;
            if(product.hasOwnProperty('offerPrice')) this.offerPrice = product.offerPrice;
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
                            modified: GetNow()
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

    Product.prototype.ChangeVisibility = function(isVisible, callback) {
        this.isVisible = isVisible;
        this.save((err, productSaved) => {
            if(err) return callback(err);

            return callback(null, productSaved);
        })
    }

};
