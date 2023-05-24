const { number } = require("joi");
const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  sdt: {
    type: Number,
    required: true,
  },
  diachi: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

const Userdb = mongoose.model("userStore", schema);

module.exports = Userdb;
