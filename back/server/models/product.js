'use strict';
var moment = require('moment-timezone');
var CronJob = require('cron').CronJob;
var globalVariables = require('../global.js');

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
            product.categoryId = product.category.id;
            if(product.subcategory) product.subcategoryId = product.subcategory.id;
            Product.create(product, (err, newProduct) => {
                if(err) return callback(err);
    
                newProduct.CreateFilters(product.filters, (err, created) => {
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
        });
    }

    Product.prototype.CreateFilters = function(filters, callback) {
        let cont = 0, limit = 0;
        for (const key in filters) {
            if (Object.hasOwnProperty.call(filters, key)) {
                const categoryFilterId = Number(key.split('~').shift());
                const value = filters[key];
                if(!Number.isNaN(categoryFilterId)) {
                    limit++;
                    Product.app.models.CategoryFilter.findById(categoryFilterId, {}, (err, catFilter) => {
                        if(err) return callback(err);
                        
                        const productFilterInstance = {
                            value,
                            productId: this.id,
                            filterId: catFilter.filterId,
                            categoryFilterId,
                        }
                        Product.app.models.ProductFilter.create(productFilterInstance, (err, newProductFilter) => {
                            if(err) return callback(err);
                            
                            cont++;
                            if(cont == limit) return callback(null, true);
                        });
                    });
                }
            }
        }
        if(!limit) return callback(null, true);
    }

    Product.GetProducts = function(filterText = '', categoriesIds = [], subcategoriesIds = [], filters = null, asCostumer = false, callback) {
        let filter = {
            where: {
                and: [
                    {isDeleted: false},
                ]
            },
            include: {'filters': 'filter'}
        };
        if(asCostumer) filter.where.and.push({isVisible: true});
        if(categoriesIds && categoriesIds.length) filter.where.and.push({categoryId: {inq: [categoriesIds]}});
        if(subcategoriesIds && subcategoriesIds.length) filter.where.and.push({subcategoryId: {inq: [subcategoriesIds]}});
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

            products = products.map(product => {
                let productFormated = {
                    ...product.toJSON(),
                    filters: product.filters().map(filterRelation => {
                        let filter = {
                            ...filterRelation.filter().toJSON(),
                            value: filterRelation.value,
                            productFilterId: filterRelation.id,
                            categoryFilterId: filterRelation.categoryFilterId
                        }

                        return filter;
                    })
                }
                return productFormated;
            });
            // Filter by productFilters
            products = products.filter(product => {
                let productValid = true;
                let productPrice = product.activeOffer ? product.offerPrice : product.price;
                if(!filters) return true;
                if(filters.minPrice) productPrice < filters.minPrice ? productValid = false : null;
                if(filters.maxPrice) productPrice > filters.maxPrice ? productValid = false : null;
                if(filters.productsFilters) {
                    filters.productsFilters.forEach(productFilter => {
                        if(productFilter.values && productFilter.values.length) {
                            const productFilterThatMatches = product.filters.find(filter => filter.categoryFilterId == productFilter.categoryFilterId);
                            if(productFilterThatMatches) {
                                const valueIsInFilter = String(productFilter.values).includes(productFilterThatMatches.value.replace(/[ \_\-]/, '').toUpperCase());
                                if(!valueIsInFilter) productValid = false;
                            }
                        }
                    });
                }
                return productValid;
            })
            return callback(null, products);
        });
    }

    Product.GetOfferedProducts = function(filterByText = '*', categoriesIds = [], subcategoriesIds = [], filters = null, asCostumer = false, callback) {
        Product.GetProducts(filterByText, categoriesIds, subcategoriesIds, filters, asCostumer, (err, products) => {
            if(err) return callback(err);

            if(filterByText == '*' && !categoriesIds.length && !subcategoriesIds.length) products = products.filter(prod => prod.activeOffer);
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
            if(product.hasOwnProperty('category')) this.categoryId = product.category.id;
            if(product.hasOwnProperty('subcategory')) this.subcategoryId = product.subcategory.id;
            if(product.hasOwnProperty('activeOffer')) this.activeOffer = product.activeOffer;
            if(product.hasOwnProperty('offerPrice')) this.offerPrice = product.offerPrice;
            this.UpdateFilters(product.filters, (err, saved) => {
                if(err) return callback(err);

                this.save((err, product) => {
                    if(err) return callback(err);

                    return callback(null, product);
                });
            });
        }, err => {
            return callback(err);
        });
    }

    Product.prototype.UpdateFilters = function(filters, callback) {
        let cont = 0, limit = 0;
        for (const key in filters) {
            if (Object.hasOwnProperty.call(filters, key)) {
                const categoryFilterId = Number(key.split('~').shift());
                const value = filters[key];
                if(!Number.isNaN(categoryFilterId)) {
                    limit++;
                    Product.app.models.ProductFilter.findOne({
                        where: {productId: this.id, categoryFilterId},
                    }, (err, productFilter) => {
                        if(err) return callback(err);

                        if(!!productFilter) {
                            productFilter.value = value;
                            productFilter.save((err, saved) => {
                                if(err) return callback(err);
                                
                                cont++;
                                if(cont == limit) return callback(null, true);
                            });
                        }
                        else {
                            Product.app.models.CategoryFilter.findById(categoryFilterId, {}, (err, catFilter) => {
                                if(err) return callback(err);

                                const productFilterInstance = {
                                    value,
                                    productId: this.id,
                                    filterId: catFilter.filterId,
                                    categoryFilterId,
                                }
                                Product.app.models.ProductFilter.create(productFilterInstance, (err, newProductFilter) => {
                                    if(err) return callback(err);
                                    
                                    cont++;
                                    if(cont == limit) return callback(null, true);
                                });
                            });
                        }
                    });
                }
            }
        }
        if(!limit) return callback(null, true);
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

    Product.SubtractStock = function(productId, quantity, callback) {
        Product.findById(productId, (err, product) => {
            if(err) return callback(err);

            if(!product) return callback({errorCode: 504, message: 'instance not found'});
            if(product.stock < quantity) return callback({errorCode: 520, mesage: 'out of stock'});
            product.stock -= quantity;
            product.save((err, productSaved) => {
                if(err) return callback(err);

                return callback(null, productSaved);
            })
        });
    }

    Product.AddStock = function(productId, quantity, callback) {
        Product.findById(productId, (err, product) => {
            if(err) return callback(err);

            if(!product) return callback({errorCode: 504, message: 'instance not found'});
            product.stock += quantity;
            product.save((err, productSaved) => {
                if(err) return callback(err);

                return callback(null, productSaved);
            });
        });
    }

    Product.CronjobToCcheckStock = function() {
        // second minute hour day(month) month day(week)
        // Every day at 8:00 a.m.
        let cron = new CronJob('0 0 8 * * *', function() {
            Product.GetProducts(null, null, null, null, false, (err, products) => {
                if(err) console.error(err);

                products = products.map(product => {
                    product.monthsOld = moment().tz(globalVariables.momentTimeZone).diff(moment(product.modified), 'months');
                    return product;
                }).filter(product => {
                    let isOutOfStock = product.stock < 3;
                    let isStockSixMonthOld = product.monthsOld >= 6;
                    return isOutOfStock || isStockSixMonthOld;
                });

                Product.app.models.Account.GetAllAccounts((err, users) => {
                    if(err) return callback(err);
        
                    const adminsEmails = users.filter(user => user.role.name == 'Admin').map(admin => admin.email);
                    const htmlParams = {
                        products,
                        platformName: 'VHAD',
                        currentYear: moment().tz(`America/Mexico_City`).year()
                    }
                    const html = Product.app.models.Mail.GenerateHtml('products-out-of-stock.ejs', htmlParams);
                    let cont = 0, limit = adminsEmails.length;
                    if(!limit) return callback(null, true);
                    adminsEmails.forEach(adminEmail => {
                        const emailData = {
                            to: adminEmail,
                            subject: 'Petición de ayuda VHAD',
                            text: '',
                            html
                        }
                        Product.app.models.Mail.SendEmail(emailData, (err, mailSent) => {
                            if(err) return callback(err);
            
                            cont++;
                            if(cont == limit) return callback(null, true);
                        });
                    });
                });
            });
        }, null, true, globalVariables.momentTimeZone);
        cron.start();
    }

};
