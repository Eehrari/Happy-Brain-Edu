const mongoose = require('mongoose');

// Online Resources Schema
const OnlineSchema = mongoose.Schema({
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
    link: {
        type: String,
        required: true
    }
});

const Online = module.exports = mongoose.model('Online', OnlineSchema);

module.exports.getOnlineResById = function (id, callback) {
    Online.findById(id, callback);
}

module.exports.addOnlineRes = function (newOnlineRes, callback) {
    newOnlineRes.save(callback);
}

