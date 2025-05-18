const mongoose = require('mongoose');

  const commentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    role: { type: String, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });

  module.exports = mongoose.models.Comment || mongoose.model('Comment', commentSchema);