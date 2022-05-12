'use strict';

module.exports = function(UserAttention) {

    UserAttention.CreateOne = function(request, userAttention, callback) {
        const userId = request.accessToken.userId;
        if(!userId) return callback({errorCode: 504, message: 'user not found'});
        userAttention.userId = userId;
        UserAttention.create(userAttention, (err, newAttention) => {
            if(err) return callback(err);

            return callback(null, newAttention);
        });
    }

    UserAttention.GetDisregarded = function(callback) {
        UserAttention.find({where: {attended: false}}, (err, userAttentions) => {
            if(err) return callback(err);

            return callback(null, userAttentions);
        });
    }

};
