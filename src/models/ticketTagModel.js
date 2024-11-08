const mongoose = require('mongoose');

const ticketTagSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
      required: [true, 'Please provide the ticket ID']
    },
    tagId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
      required: [true, 'Please provide the tag ID']
    }
  },
  { timestamps: true }
);

const TicketTag = mongoose.model('TicketTag', ticketTagSchema);

module.exports = TicketTag;
