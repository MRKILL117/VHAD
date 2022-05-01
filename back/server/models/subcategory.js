'use strict';

module.exports = function(Subcategory) {

    Subcategory.CreateOne = function(subcategory, callback) {
        console.log(subcategory);
        if(subcategory.hasOwnProperty('category')) {
            Subcategory.app.models.Category.GetCategoryByName(subcategory.category, (err, category) => {
                if(err) return callback(err);
                
                delete subcategory.category;
                console.log("category", category);
                subcategory.categoryId = category.id;
                Subcategory.create(subcategory, (err, newSubcategory) => {
                    if(err) return callback(err);
                    
                    return callback(null, newSubcategory);
                });
            });
        }
        else {
            Subcategory.create(subcategory, (err, newSubcategory) => {
                if(err) return callback(err);
                
                return callback(null, newSubcategory);
            });
        }
    }

};
