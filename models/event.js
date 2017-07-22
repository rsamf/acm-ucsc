const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title : String,
    description : String,
    location : String,
    date : Date,
    facebook : String,
    images : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "image"
    }]
}, {
    timestamps : true
});

module.exports = mongoose.model("event", EventSchema);