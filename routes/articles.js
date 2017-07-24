const router = require('express').Router();
const Article = require('../models/article');
const User = require('../models/user');
const globals = require('../bin/globals');
const fault = globals.fault;

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
    let post = req.body;
    post.author = req.user;
    Article.create(post, (err, article)=>{
        fault(err, next);
        User.findById(req.user._id, (err, user)=>{
            fault(err, next);
            user.postedArticles.push(article);
            user.save();
        });
        res.json(article);
    });
});

router.put('/:id', [globals.auth.isOfficial, upload.single('photo')], function(req, res, next){
    Article.findByIdAndUpdate(req.params.id, req.body, (err, article)=>{
        fault(err, next);
        res.json(article);
    });
});

router.delete('/:id', globals.auth.isOfficial, function(req, res, next){
    Article.findByIdAndRemove(req.params.id, (err)=>{
        fault(err, next);
        User.findById(req.user._id, (err, user)=>{
            fault(err, next);
            user.postedArticles.forEach((article, i)=>{
                if(article === req.params.id) {
                    user.postedArticles.splice(i, 1);
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