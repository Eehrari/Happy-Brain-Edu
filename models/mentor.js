const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Student Schema
const MentorSchema = mongoose.Schema ({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String
    }, vce_subjects: {
        type: String
    }, studying: {
        type: String,
    }, language: {
        type: String,
    }, location: {
        type: String,
    }, experience: {
        type: String,
    }, volunteering: {
        type: String,
    }, wwcc: {
        type: String,
    }, why_join: {
        type: String,
    }, about_us: {
        type: String,
    }, refugee_definition: {
        type: String,
    }, preference: {
        type: String,
    }, send_me_copy: {
        type: String,
    },
    gender: {
        type: String,
    },
    status: {
        type: String,
    },
    deleted: {
        type: String,
    },
    type: {
        type: String,
    },
});


const Mentor = module.exports = mongoose.model('Mentor', MentorSchema);

module.exports.getMentorById = function(id, callback) {
  Mentor.findById(id, callback);
}

module.exports.getMentorByEmail = function(email, callback) {
  const query = {email: email}
  Mentor.findOne(query, callback);
}

module.exports.addMentor = function(newMentor, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newMentor.password, salt, (err, hash) => {
      if(err) throw err;
    newMentor.password = hash;
    newMentor.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
