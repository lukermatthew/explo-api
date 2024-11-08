const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the tag name'],
      unique: true
    }
  },
  { timestamps: true }
);

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
