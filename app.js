const express=require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to DB
mongoose.connect(config.database);
//On Connection
mongoose.connection.on('connected',function () {
    console.log("Connected to DB " +config.database);
});
//On Error
mongoose.connection.on('error',function (err) {
    console.log("Database error " +err);
});

const app = express();

const admins = require('./routes/admins');
const students = require('./routes/students');
const mentors = require('./routes/mentors');

const port = 3000;
//Cors middleware
app.use(cors());

//Set static folders and files
app.use(express.static(path.join(__dirname,'public')));

//Body parser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/admins',admins);
app.use('/students',students);
app.use('/mentors',mentors);

//index routes
app.get('/',function (req,res) {
    res.send('Invalid ');
});

//Start server
app.listen(port,function(){
    console.log("Server started on port"+port);
});