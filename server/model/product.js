const mongoose = require('mongoose');

var Proschema = new mongoose.Schema({
    masp:{
        type:String,
        required:true
    },
    tensp:{
        type:String,
        required:true
    },
    dongia:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    mausac:{
        type:String,
        required:true
    },
    makh:{
        type:String,
        required:true
    },
    tenkh:{
        type:String,
        required:true
    },
})

const Prodb = mongoose.model('prodb', Proschema);

module.exports = Prodb;