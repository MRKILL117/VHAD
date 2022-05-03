'use strict';

module.exports = function(Filter) {

    Filter.FindByName = function(name, callback) {
        Filter.findOne({where: {name: {like: `%${name}%`}}}, (err, filter) => {
            if(err) return callback(err);

            if(!filter) return callback({errorCode: 504, message: 'filter not found'});
            return callback(null, filter);
        })
    }

};
