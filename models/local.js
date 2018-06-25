const mongoose = require('mongoose');

// Online Resources Schema
const localSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },

    subject: {
        type: String
    },
    fileUplaod: {
        type: String,
        required: true
    }
});

const Local = module.exports = mongoose.model('Local', localSchema);

module.exports.getLocalResourceById = function (id, callback) {
    Local.findById(id, callback);
}

module.exports.addLocalResource = function (newLocalResource, callback) {
    newLocalResource.save(callback);
}

