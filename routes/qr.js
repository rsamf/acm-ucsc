const router = require('express').Router();
const User = require('../models/user');
const QR = require('../models/qr');
const fault = require('../bin/globals').fault;
const qr = require('qr-image');
const fs = require('fs');

router.get('/', function(req, res, next){
    getUserQR(String(req.user._id), req, res, next);
});

router.get('/:id', function (req, res, next){
    getUserQR(req.params.id, req, res, next);
});

function getUserQR(userId, req, res, next){
    User.findById(userId).populate('qr').exec((err, user)=>{
        fault(err, next);
        if(user.qr){
            res.type(user.qr.type);
            res.send(user.qr.value);
        } else {
            console.log("Couldnt find existing qr code, so generating a new one...");
            createQR(userId, (data)=>{
                // Send response
                res.type('image/png');
                res.send(data);

                // Update user with new qr code
                QR.create({
                    value : data,
                    type : "image/png"
                }, (err, qr)=>{
                    fault(err, next);
                    user.qr = qr;
                    user.save();
                });
            });
        }
    });
}

function createQR(text, callback){
    console.log("Generating qr with text,", text);
    let buf = Buffer.from('', 'base64');
    let readableStream = qr.image(text, {
        type : 'png'
    });
    readableStream.read();
    readableStream.on('data', data=>{
        buf = Buffer.concat([buf, data]);
    });
    readableStream.on('end', ()=>{
        console.log(Buffer.isBuffer(buf));
        callback(buf);
    });
}

module.exports = router;