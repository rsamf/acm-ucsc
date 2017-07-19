const mongoose = require('mongoose');

module.exports = mongoose.model('test', new mongoose.Schema({
    text : String
}, {
    timestamps : true
}));