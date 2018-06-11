const express = require('express');
const router = express.Router();
const Online = require('../models/online');

//Register route
router.post('/register', function (req, res, next) {
    var newOnlineRes = new Online({
        title: req.body.title,
        description: req.body.description,
        subject: req.body.subject,
        link: req.body.link
    });

    Online.addOnlineRes(newOnlineRes, function (err, onlineres) {
        if (err) {
            res.json({success: false, msg: 'Failed to add resource!'})
        } else {
            res.json({success: true, msg: 'Resource added!'})
        }
    });
});


router.get('/getAll', function (req, res, next) {

    Online.find(function (err, onlines) {
        if (err) {
            res.send(err);
        }
        res.json(onlines);
    });

});

router.get('/:id', function (req, res, next) {
    Online.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.delete('/:id', function (req, res, next) {
    Online.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


//Update one subject
router.put('/:id', function (req, res, next) {
    Online.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


module.exports = router;