'use strict';

module.exports = function(Category) {

    Category.GetCategories = function(callback) {
        Category.find((err, categories) => {
            if(err) return callback(err);

            return callback(null, categories);
        });
    }

};
