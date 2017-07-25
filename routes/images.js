const router = require('express').Router();
const Image = require('../models/image');
const fault = require('../bin/globals').fault;

router.get('/:id', function(req, res, next){
    Image.findById(req.params.id, (err, image)=>{
        fault(err, next);
        if(!image) return next();
        res.type(image.type);
        res.send(image.value);
    });
});

module.exports = router;