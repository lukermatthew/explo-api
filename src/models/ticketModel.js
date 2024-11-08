const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for the ticket']
    },
    description: {
      type: String,
      required: [true, 'Please provide a description for the ticket']
    },
    status: {
      type: String,
      enum: ['open', 'in-progress', 'closed'],
      default: 'open'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'low'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide the user ID']
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: [true, 'Please provide the department ID']
    }
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt fields
);

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
