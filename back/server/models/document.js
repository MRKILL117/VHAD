'use strict';

module.exports = function(Document) {

    Document.UploadFile = function(file, object, callback) {
        console.log("file", file);
        console.log("object", object);

        return callback(null, true);
    }

};
