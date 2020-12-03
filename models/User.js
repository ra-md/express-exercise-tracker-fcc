const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxLength: 20
  },
  count: {
    type: Number,
    default: 0
  },
  log: [
    {
      description: {
        type: String,
        required: true
      },
      duration: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        required: false
      }
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
