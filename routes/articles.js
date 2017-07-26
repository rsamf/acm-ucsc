const router = require('express').Router();
const Article = require('../models/article');
const User = require('../models/user');
const Image = require('../models/image');
const globals = require('../bin/globals');
const fault = globals.fault;
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const upload = require('multer')({
    dest : path.resolve(__dirname, '../uploads/'),
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
    Article.find({}).populate("author").sort({createdAt:-1}).exec((err, articles)=>{
        fault(err, next);
        res.json(articles);
    });
});

router.get('/:id', function(req, res, next){
    Article.findById(req.params.id, (err, article)=>{
        fault(err, next);
        res.json(article);
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
                postArticle(err, image._id, article => {
                    res.json(article);
                });
            });
        });
    } else {
        postArticle(null, null, article => {
            res.json(article);
        });
    }


    function postArticle(err, image, callback) {
        fault(err, next);

        let post =  {
            title : req.body.title,
            content : req.body.content,
            author : req.user,
            images : [image]
        };
        if(mongoose.Types.ObjectId.isValid(req.body.event)) post.event = req.body.event;

        Article.create(post, (err, article)=>{
            fault(err, next);
            User.findById(req.user._id, (err, user)=>{
                fault(err, next);
                user.postedArticles.push(article);
                user.save();
            });
            callback(article);
        });
    }
});

router.put('/:id', [globals.auth.isOfficial, upload.single('photo')], function(req, res, next){
    Article.findByIdAndUpdate(req.params.id, req.body, (err, article)=>{
        fault(err, next);
        res.json(article);
    });
});

router.delete('/:id', globals.auth.isOfficial, function(req, res, next){
    Article.findById(req.params.id, (err, article)=>{
        fault(err, next);

        // Remove all images
        article.images.forEach((image)=>{
            Image.findByIdAndRemove(image, err=>{
                fault(err, next);
            });
        });

        // Remove user's ref
        User.findById(req.user._id, (err, user)=>{
            fault(err, next);
            user.postedArticles.forEach((article, i)=>{
                if(article === req.params.id) {
                    user.postedArticles.splice(i, 1);
                }
            });
            user.save();
        });

        // Remove article
        article.remove();

        // Respond with a success
        res.json({
            message : "Success"
        });
    });
});

module.exports = router;