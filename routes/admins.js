const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

//Register route
router.post('/register',function (req,res,next) {
    var newAdmin = new Admin({
       name:req.body.name,
       email:req.body.email,
       password:req.body.password,
       type:'admin'
    });
Admin.addAdmin(newAdmin,function (err,admin) {
    if(err){
        res.json({success:false,msg:'Failed to register the admin!'})
    }else{
        res.json({success:true,msg:'Admin registered!'})
    }
});
});

router.get('/getAdmins', function (req, res, next) {

    Admin.find(function (err, admins) {
        if (err) {
            res.send(err);
        }
        res.json(admins);
    });

});

//Authentication route
router.post('/authenticate',function (req,res,next) {
    const email = req.body.email;
    const password = req.body.password;

    Admin.getAdminByEmail(email,function (err,admin) {
        if(err) throw err;
        if(!admin){
            return res.json({success:false,msg:'Admin not found'});
        }
        Admin.comparePassword(password,admin.password,function (err,isMatch) {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(admin.toJSON(),config.secret,{
                    expiresIn:604800 //1Week

                });
                res.json({
                    success:"true",
                    token:'JWT '+token,
                    admin:{
                        id:admin._id,
                        name:admin.name,
                        email:admin.email,
                        type:admin.type,
                    }
                })
            }
            else{
                return res.json({success:false,msg:'Wrong password!'});

            }
        });
    });
});


//Profile route
router.get('/profile',passport.authenticate('jwt',{session:false}),function (req,res,next) {
res.json({user:req.user})

});



/* GET SINGLE Admin BY ID */
router.get('/:id', function (req, res, next) {
    Admin.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

//Delete one admin
router.delete('/:id', function (req, res, next) {
    Admin.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


//Update one admin
router.put('/:id', function (req, res, next) {

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
        if(err) throw err;
    req.body.password = hash;
    Admin.findByIdAndUpdate(req.params.id, req.body, function (err, post) {

        if (err) return next(err);
        res.json(post);


    });
});
});


        // newAdmin.save(callback);

});


module.exports=router;