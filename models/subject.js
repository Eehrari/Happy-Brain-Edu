const mongoose = require('mongoose');

// Subject Schema
const SubjectSchema = mongoose.Schema ({
  name: {
    type: String
  },
  description: {
    type: String,
    required: true
  },

  sections: {
    type: String,
    required: true
  }
});

const Subject = module.exports = mongoose.model('Subject', SubjectSchema);

module.exports.getSubjectById = function(id, callback) {
  Subject.findById(id, callback);
}

module.exports.addSubject = function(newSubject, callback) {
    newSubject.save(callback);
}

