const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide the role name'],
      unique: true
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
); // Add timestamps option

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
