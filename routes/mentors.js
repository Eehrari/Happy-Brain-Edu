const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentor');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

//Register route
router.post('/register',function (req,res,next) {
    var newMentor = new Mentor({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        language: req.body.language,
        vce_subjects:  req.body.vce_subjects,
        location:  req.body.location,
        studying:  req.body.studying,
        experience:  req.body.experience,
        volunteering:  req.body.volunteering,
        wwcc:  req.body.wwcc,
        why_join: req.body.why_join,
        about_us: req.body.about_us,
        refugee_definition:  req.body.refugee_definition,
        preference:  req.body.preference,
        gender:  req.body.gender,
        send_me_copy:  req.body.send_me_copy,
        status:  'pending',
        deleted:  'no',
        type:  'mentor',

});
Mentor.addMentor(newMentor,function (err,mentor) {
    if(err){
        res.json({success:false,msg:'Failed to register the mentor!'})
    }else{
        res.json({success:true,msg:'Mentor registered!'})
    }
});
});



//Authentication route
router.post('/authenticate',function (req,res,next) {
    const email = req.body.email;
    const password = req.body.password;

    Mentor.getMentorByEmail(email,function (err,mentor) {

        if(err) throw err;
        if(!mentor){
            return res.json({success:false,msg:'Mentor not found'});
        }
        Mentor.comparePassword(password,mentor.password,function (err,isMatch) {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(mentor.toJSON(),config.secret,{
                    expiresIn:604800 //1Week

                });
                res.json({
                    success:"true",
                    token:'JWT '+token,
                    mentor:{
                        id:mentor._id,
                        name:mentor.name,
                        email:mentor.email,
                        type:mentor.type
                    }
                })
            }
            else{
                return res.json({success:false,msg:'Wrong password or Email!'});

            }
        });
    });
});


//Profile route
router.get('/profile',passport.authenticate('jwt',{session:false}),function (req,res,next) {
res.json({user:req.user})

});





router.get('/getMentors', function (req, res, next) {

    Mentor.find(function (err, mentors) {
        if (err) {
            res.send(err);
        }
        res.json(mentors);
    });

});

/* GET SINGLE Student BY ID */
router.get('/:id', function (req, res, next) {
    Mentor.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

//Delete one student
router.delete('/:id', function (req, res, next) {
    Mentor.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


//Update one student
router.put('/:id', function (req, res, next) {

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
        if(err) throw err;
    req.body.password = hash;
    Mentor.findByIdAndUpdate(req.params.id, req.body, function (err, post) {

        if (err) return next(err);
        res.json(post);


    });
});
});


    // newAdmin.save(callback);

});



module.exports=router;