const router = require('express').Router();
const User = require('../models/user');
const https = require('https');
const apiKey = require('../bin/globals').apiKey;
const fault = require('../bin/globals').fault;

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find({}, function(err, users){
        fault(err, next);
        res.json(users);
    })
});

router.get('/:id', function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        fault(err, next);
        res.json(user);
    });
});

function googleRequest(req, requestObj){
    let call = {
        hostname : "googleapis.com",
        path : `/plus/v1/people${requestObj.path}?key=${apiKey}`,
        method : requestObj.method,
        headers : {
            Authorization : `Bearer ${req.user.accessToken}`
        }
    };
    let request = https.request(call, response=>{
        let blob = '';
        response.on('data', data=>{
            blob += data;
        });
        response.on('end', ()=>{
            console.log(blob);
            requestObj.success(JSON.parse(blob));
        });
    });

    request.end();
    request.on('error', error=>{
        requestObj.error(error);
    });
}

module.exports = router;
