const router = require('express').Router();
const passport = require('passport');
const globals = require('../bin/globals');

router.get('/google', passport.authenticate('google', {
    scope : [
        'profile',
        'email'
    ]
}));

router.get('/google/callback', passport.authenticate('google', {
    successRedirect : '/#/events',
    failureRedirect : '/'
}));

router.get('/logout', globals.auth.isLoggedIn, function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;