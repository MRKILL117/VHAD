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

};
