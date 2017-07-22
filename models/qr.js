const mongoose = require('mongoose');

module.exports = mongoose.model("qr", new mongoose.Schema({
    value : Buffer,
    type : String
}));