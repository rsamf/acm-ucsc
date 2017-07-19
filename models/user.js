const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId : String,
    role : String,
    postedEvents : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "event"
    }],
    postedNews : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "news"
    }],
    accessToken : String,
    refreshToken : String
}, {
    timestamps : true
});

module.exports = mongoose.model("user", UserSchema);
