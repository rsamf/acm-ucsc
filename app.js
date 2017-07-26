const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const expressSession = require('express-session');

const mongoose = require('mongoose');
const User = require('./models/user');
const Test = require('./models/test');

const uri = process.env.DATABASEURL || "mongodb://samf:dbpassword@ds163672.mlab.com:63672/acm-ucsc";
mongoose.connect(uri);
Test.create({
    text : 'test123'
}, (err, test)=>{
    console.log(test);
});


passport.serializeUser(function(user, done) {
    console.log("S");
    return done(null, user);
});

passport.deserializeUser(function(user, done) {
    console.log("D");
    return done(null, user);
});
const awsurl = 'http://ec2-52-38-143-227.us-west-2.compute.amazonaws.com';
const strategy = new GoogleStrategy({
        clientID : "1060625076984-7lkslmheimde03btvdmnp8ijai7jp4fl.apps.googleusercontent.com",
        clientSecret : "QJ25PMCNvV2YYGrLqqAtm3WJ",
        //callbackURL : "http://localhost:8000/auth/google/callback"
        callbackURL : awsurl + '/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function(){
            User.findOne({ "google.id" : profile.id }, function(err, user){
                if(err) {
                    console.error(err);
                    return done(null, false);
                } else if(user) {
                    User.findByIdAndUpdate(user._id, { accessToken : accessToken, google : profile }, (err, user)=>{
                        if(!err){
                            return done(null, user);
                        }
                        return done(null, false);
                    });
                } else {
                    let userObj = {
                        google : profile,
                        role : "Member",
                        accessToken : accessToken,
                    };
                    User.create(userObj, function (err, user) {
                        if (err) {
                            console.error(err);
                            return done(null, false);
                        }
                        return done(null, user);
                    });
                }
            });
        });
    }
);
passport.use('google', strategy);


/*
    Express
 */


const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
    secret : 'super duper secret 123',
    resave : true,
    saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/qr', require('./routes/qr'));
app.use('/events', require('./routes/events'));
app.use('/articles', require('./routes/articles'));
app.use('/images', require('./routes/images'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
