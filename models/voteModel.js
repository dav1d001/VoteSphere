const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  options: [
    {
      name: { type: String, required: true },
      votes: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model('Vote', voteSchema);
