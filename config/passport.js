const JwtStrategy = require('passport-jwt').Strategy;

const ExtractJwt = require('passport-jwt').ExtractJwt;


const Student = require('../models/student');
const Mentor = require('../models/mentor');
const Admin = require('../models/admin');

const config = require('../config/database');

module.exports=function (passprt) {
    var opts = {};
    // opts.jwtFromRequest=ExtractJwt.fromAuthHeader();
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");

    opts.secretOrKey = config.secret;

    passprt.use(new JwtStrategy(opts,function (jwt_payload,done) {
        if(jwt_payload.type=="student"){
            Student.getStudentById(jwt_payload._id,function (err,student) {
                if(err){
                    return done(err,false);
                }
                if(student){
                    return done(null,student);
                }
                else {
                    return done(null,false)
                }
            })
        }else if(jwt_payload.type=="mentor"){
            Mentor.getMentorById(jwt_payload._id,function (err,mentor) {
                if(err){
                    return done(err,false);
                }
                if(mentor){
                    return done(null,mentor);
                }
                else {
                    return done(null,false)
                }
            })
        }
        else if(jwt_payload.type=="admin"){
            Admin.getAdminById(jwt_payload._id,function (err,admin) {
                if(err){
                    return done(err,false);
                }
                if(admin){
                    return done(null,admin);
                }
                else {
                    return done(null,false)
                }
            })
        }


    }))
}
