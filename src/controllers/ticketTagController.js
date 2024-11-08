const TicketTag = require('./../models/ticketTagModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createTicketTag = catchAsync(async (req, res, next) => {
  const ticketTag = await TicketTag.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      ticketTag
    }
  });
});

exports.getAllTicketTags = catchAsync(async (req, res, next) => {
  const ticketTags = await TicketTag.find().sort({ _id: -1 });

  res.status(200).json({
    status: 'success',
    results: ticketTags.length,
    data: {
      ticketTags
    }
  });
});

exports.getTicketTag = catchAsync(async (req, res, next) => {
  const ticketTag = await TicketTag.findById(req.params.id);

  if (!ticketTag) {
    return next(
      new AppError('No ticket-tag association found with that ID', 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      ticketTag
    }
  });
});

exports.deleteTicketTag = catchAsync(async (req, res, next) => {
  const ticketTag = await TicketTag.findByIdAndDelete(req.params.id);

  if (!ticketTag) {
    return next(
      new AppError('No ticket-tag association found with that ID', 404)
    );
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
