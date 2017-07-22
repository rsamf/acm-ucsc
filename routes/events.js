const router = require('express').Router();
const Event = require('../models/image');
const fault = require('../bin/globals').fault;

const upload = require('multer')({
    dest : './uploads/',
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
    Event.find({}, (err, events)=>{
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

router.post('/', function(req, res, next){
    Event.create(req.body, (err, event)=>{
        fault(err, next);
        User.findById(req.user._id, (err, user)=>{
            fault(err, next);
            user.postedEvents.push(event);
            user.save();
        });
        res.json(event);
    });
});

router.put('/:id', function(req, res, next){
    Event.findByIdAndUpdate(req.params.id, req.body, (err, event)=>{
        fault(err, next);
        res.json(event);
    });
});

router.delete('/:id', function(req, res, next){
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