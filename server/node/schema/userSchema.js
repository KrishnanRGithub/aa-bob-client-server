const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  mobile: {
    type: String,
    required: true
  },
  photo: {
    type: Buffer,
    required: false
  },
  pin: {
    type: String,
    required: true
  },
  isLinked: {
    type: Boolean,
    required: true,
    default: false
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;