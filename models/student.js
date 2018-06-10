const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Student Schema
const StudentSchema = mongoose.Schema ({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
      unique:true
  },
  phone: {
    type: String,
    required: true
  },
    password: {
        type: String,
    }, parents_phone: {
        type: String,
    }, country: {
        type: String,
    }, language: {
        type: String,
    }, school_level: {
        type: String,
    }, school_name: {
        type: String,
    }, family_situation: {
        type: String,
    }, english_level: {
        type: String,
    },
    gender: {
        type: String,
    },
    tutor_gender: {
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


const Student = module.exports = mongoose.model('Student', StudentSchema);

module.exports.getStudentById = function(id, callback) {
  Student.findById(id, callback);
}

module.exports.getStudentByEmail = function(email, callback) {
  const query = {email: email}
  Student.findOne(query, callback);
}

module.exports.addStudent = function(newStudent, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newStudent.password, salt, (err, hash) => {
      if(err) throw err;
    newStudent.password = hash;
    newStudent.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
