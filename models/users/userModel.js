const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  profesi : {
      type: String,
      required: true
  }
});


const User = mongoose.model('users', UserSchema);

module.exports = User;