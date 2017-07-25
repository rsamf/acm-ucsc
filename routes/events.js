const router = require('express').Router();
const Event = require('../models/event');
const User = require('../models/user');
const Image = require('../models/image');
const globals = require('../bin/globals');
const fault = globals.fault;
const path = require('path');
const fs = require('fs');

const upload = require('multer')({
    dest : path.resolve(__dirname, '../uploads/'),
    inMemory : false,
    onError : ()=>{
        console.error("Error uploading image");
    },
    onFileUploadStart : file=>{
        console.log("Uploading file...", file.name, file.fieldname, file.encoding, file.mimetype, file.path, file.extension);
    },
    onFileUploadComplete : file=>{
        console.log("... Finished uploading file", file.name);
    }
});


router.get('/', function(req, res, next){
    Event.find({}).sort({date : -1}).exec((err, events)=>{
        fault(err, next);
        res.json(events);
    });
});

router.get('/:id', function(req, res, next){
    Event.findById(req.params.id, (err, event)=>{
        fault(err, next);
        res.json(event);
    });
});

router.post('/', [globals.auth.isOfficial, upload.single('photo')], function(req, res, next){
    if(req.file){
        console.log(req.file);
        fs.readFile(path.resolve(__dirname,`../uploads/${req.file.filename}`), (err, data)=>{
            Image.create({
                type : req.file.mimetype,
                value : data
            }, (err, image)=>{
                fault(err, next);
                postEvent(err, image._id, event => {
                    res.json(event);
                });
            });
        });
    } else {
        postEvent(null, null, event => {
            res.json(event);
        });
    }

    function postEvent(err, image, callback){
        fault(err, next);
        console.log("raw body", req.body);

        let post = req.body;
        post.date = new Date(`${req.body.date}`);
        post.images = [image];
        console.log("post", post);
        if(post.date == "Invalid Date") {
            res.json({
                error : "Invalid Date"
            });
        } else {
            Event.create(post, (err, event)=>{
                fault(err, next);
                User.findById(req.user._id, (err, user)=>{
                    fault(err, next);
                    user.postedEvents.push(event);
                    user.save();
                });
                callback(event);
            });
        }
    }

});

router.put('/:id', [globals.auth.isOfficial, upload.single('photo')], function(req, res, next){
    Event.findByIdAndUpdate(req.params.id, req.body, (err, event)=>{
        fault(err, next);
        res.json(event);
    });
});

router.delete('/:id', globals.auth.isOfficial, function(req, res, next){
    Event.findByIdAndRemove(req.params.id, (err)=>{
        fault(err, next);
        User.findById(req.user._id, (err, user)=>{
            fault(err, next);
            user.postedEvents.forEach((event, i)=>{
                if(event === req.params.id) {
                    user.postedEvents.splice(i, 1);
                }
            });
            user.save();
        });
        res.json({
            message : "Success"
        });
    });
});

module.exports = router;