const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title : String,
    content : String,
    event : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "event"
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    images : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "image"
    }]
}, {
    timestamps : true
});

module.exports = mongoose.model("article", ArticleSchema);