const mongoose = require('mongoose');

module.exports = mongoose.model("image", new mongoose.Schema({
    value : Buffer,
    type : String
}));