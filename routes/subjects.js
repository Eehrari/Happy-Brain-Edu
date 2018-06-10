const express = require('express');
const router = express.Router();
const Subject = require('../models/subject');

//Register route
router.post('/register', function (req, res, next) {
    var newSubject = new Subject({
        name: req.body.name,
        description: req.body.description,
        sections: req.body.sections
    });

    Subject.addSubject(newSubject, function (err, subject) {
        if (err) {
            res.json({success: false, msg: 'Failed to add the subject!'})
        } else {
            res.json({success: true, msg: 'Subject added!'})
        }
    });
});


router.get('/getSubjects', function (req, res, next) {

    Subject.find(function (err, subjects) {
        if (err) {
            res.send(err);
        }
        res.json(subjects);
    });

});

/* GET SINGLE Subject BY ID */
router.get('/:id', function (req, res, next) {
    Subject.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

//Delete one subject
router.delete('/:id', function (req, res, next) {
    Subject.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


//Update one subject
router.put('/:id', function (req, res, next) {
    Subject.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


module.exports = router;