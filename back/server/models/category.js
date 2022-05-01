'use strict';

module.exports = function(Category) {

    Category.GetCategories = function(callback) {
        Category.find((err, categories) => {
            if(err) return callback(err);

            categories = categories.sort((a, b) => {
                if(a.name > b.name) return 1;
                if(a.name < b.name) return -1;
                return 0;
            });
            return callback(null, categories);
        });
    }

    Category.GetCategoryByName = function(name, callback) {
        Category.find({where: {name: {like: `%${name}%`}}}, (err, category) => {
            if(err) return callback(err);

            if(!category) return callback({errorCode: 504, message: 'category not found'});
            return callback(null, category);
        })
    }

};
