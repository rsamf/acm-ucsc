const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    google : Object,
    role : String,
    postedEvents : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "event"
    }],
    postedArticles : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "article"
    }],
    qr : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "qr"
    },
    accessToken : String,
    refreshToken : String
}, {
    timestamps : true
});

module.exports = mongoose.model("user", UserSchema);
