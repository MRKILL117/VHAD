'use strict';

module.exports = function(Category) {

    Category.GetCategories = function(callback) {
        Category.find(async (err, categories) => {
            if(err) return callback(err);
            
            categories = categories.sort((a, b) => {
                if(a.name > b.name) return 1;
                if(a.name < b.name) return -1;
                return 0;
            });
            categories = categories.map(category => {
                let categoryFormated = {
                    ...category.toJSON(),
                    filters: category.filters().map(filterRelation => {
                        let filter = {
                            ...filterRelation.filter().toJSON(),
                            formName: filterRelation.name,
                            options: filterRelation.options
                        }

                        return filter;
                    })
                }
                return categoryFormated;
            });
            return callback(null, categories);
        });
    }

    Category.GetCategoryByName = function(name, callback) {
        Category.findOne({where: {name: {like: `%${name}%`}}}, (err, category) => {
            if(err) return callback(err);

            if(!category) return callback({errorCode: 504, message: 'category not found'});
            return callback(null, category);
        })
    }

    Category.AddFilter = function(config, callback) {
        Category.findById(config.categoryId, (err, category) => {
            if(err) return callback(err);
            
            if(!category) return callback({errorCode: 504, message: 'category not found'});
            Category.app.models.Filter.FindByName(config.filter, (err, filter) => {
                if(err) return callback(err);
                
                let relation = {
                    categoryId: category.id,
                    filterId: filter.id,
                    name: config.name,
                    options: (config.options && Array.isArray(config.options) ? config.options : [])
                }
                Category.app.models.CategoryFilter.findOrCreate({where: {categoryId: category.id, filterId: filter.id}}, relation, (err, relation) => {
                    if(err) return callback(err);
                    
                    return callback(null, filter);
                });
            });
        });
    }

};
