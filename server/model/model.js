const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    luong : {
        type: String,
        required: true
    },
    diachi : {
        type: String,
        required: true
    },
    
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;