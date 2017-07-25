const mongoose = require('mongoose');
const Role = {
    Member : "Member",
    Chair : "Chair",
    ViceChair : "Vice Chair",
    Treasurer : "Treasurer",
    Secretary : "Secretary",
    Webmaster : "Webmaster",
    CRC : "Corporate Relations Chair"
};

const UserSchema = new mongoose.Schema({
    google : Object,
    role : {
        type : String,
        default : Role.Member
    },
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
    checkIns : Number,
    accessToken : String,
    refreshToken : String
}, {
    timestamps : true
});

module.exports = mongoose.model("user", UserSchema);
