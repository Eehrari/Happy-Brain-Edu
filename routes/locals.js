var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');
const Local = require('../models/local');
var fileName;
var date;

var store = multer.diskStorage({

    destination:function(req,file,cb){
        cb(null, './uploads');
    },
    filename:function(req,file,cb){
        fileName = Date.now()+'.'+file.originalname;
        cb(null, fileName);
    }
});


var upload = multer({storage:store}).single('file');

router.post('/upload', function(req,res,next){
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        }
        //do all database record saving activity
        return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    });
});


router.post('/download', function(req,res,next){
    filepath = path.join(__dirname,'../uploads') +'/'+ req.body.filename;
    res.sendFile(filepath);
});

router.post('/deletefile', function(req,res,next){
    filepath = path.join(__dirname,'../uploads') +'/'+ req.body.filename;
    fs.unlink(filepath, function(error) {
        if (error) {
            throw error;
        }
        console.log('Deleted '+filepath);
    });
});


//Register route
router.post('/register', function (req, res, next) {
    var newLocalRes = new Local({
        title: req.body.title,
        description: req.body.description,
        subject: req.body.subject,
        fileUplaod: fileName
    });

    Local.addLocalResource(newLocalRes, function (err, localres) {
        if (err) {
            res.json({success: false, msg: 'Failed to add resource!'})
        } else {

            res.json({success: true, msg: 'Resource added!'})

        }
    });
});


router.get('/getAll', function (req, res, next) {

    Local.find(function (err, locals) {
        if (err) {
            res.send(err);
        }
        res.json(locals);
    });

});

router.get('/:id', function (req, res, next) {
    Local.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.delete('/:id', function (req, res, next) {
    Local.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


//Update one subject
router.put('/:id', function (req, res, next) {
    Local.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


module.exports = router;