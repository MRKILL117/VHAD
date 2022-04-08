'use strict';

var isJSON = function(stringToTest) {
    try {
        JSON.parse(stringToTest);
        return true;
    } catch (err) {
        return false;
    }
}

module.exports = function(Document) {

    Document.UploadFile = function(container, request, callback) {
        const Folder = Document.app.models.Folder;
        Folder.upload(container, request, request.res, (err, uploadedFile) => {
            if(err) return callback(err);

            let params = {};
            if(uploadedFile && uploadedFile.fields) {
                for (const key in uploadedFile.fields) {
                    if (Object.hasOwnProperty.call(uploadedFile.fields, key)) {
                        const element = uploadedFile.fields[key];
                        console.log(key, element);
                        if(Array.isArray(element)) {
                            element.forEach(e => {
                                switch (typeof e) {
                                    case 'string':
                                        if(isJSON(e)) params[key] = JSON.parse(e);
                                        else if(/^[0-9]{1,}$/.test(e)) params[key] = Number(e);
                                        else params[key] = e;
                                    break;
                                }
                            });
                        }
                        else {
                            switch (typeof element) {
                                case 'string':
                                    if(isJSON(element)) params[key] = JSON.parse(element);
                                    else if(/^[0-9]{1,}$/.test(element)) params[key] = Number(element);
                                    else params[key] = element;
                                break;
                            }
                        }
                    }
                }
            }
            console.log(uploadedFile);
            console.log("params", params);
            return callback(null, uploadedFile);
        });
    }

};
