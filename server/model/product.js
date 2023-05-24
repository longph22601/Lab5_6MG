const mongoose = require("mongoose");

var Proschema = new mongoose.Schema({
  masp: {
    type: String,
    required: true,
  },
  tensp: {
    type: String,
    required: true,
  },
  dongia: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  mausac: {
    type: String,
    required: true,
  },
  soluong: {
    type: Number,
    required: true,
  },
  trangthai: {
    type: String,
    required: true,
  },
  mota: {
    type: String,
    required: true,
  },
});

const Prodb = mongoose.model("proStore", Proschema);

module.exports = Prodb;
