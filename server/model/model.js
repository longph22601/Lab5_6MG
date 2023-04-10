const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique : true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    admin:{
      type:Boolean,
      default:false,
    },

    
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;