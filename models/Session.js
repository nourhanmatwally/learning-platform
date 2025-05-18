const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  loginTime: {
    type: Date,
    required: false,
  },
  logoutTime: {
    type: Date,
    required: false,
  },
  duration: {
    type: Number, // المدة بالثواني
    required: false,
  },
});

module.exports = mongoose.models.Session || mongoose.model('Session', sessionSchema);