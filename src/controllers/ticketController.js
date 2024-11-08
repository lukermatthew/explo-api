const Ticket = require('./../models/ticketModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.create(req.body);

  req.app.get('io').emit('ticketCreated', ticket);

  res.status(201).json({
    status: 'success',
    data: {
      ticket
    }
  });
});

exports.getAllTickets = catchAsync(async (req, res, next) => {
  const tickets = await Ticket.find().sort({ _id: -1 });

  res.status(200).json({
    status: 'success',
    results: tickets.length,
    data: {
      tickets
    }
  });
});

exports.getTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return next(new AppError('No ticket found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      ticket
    }
  });
});

exports.updateTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!ticket) {
    return next(new AppError('No ticket found with that ID', 404));
  }

  req.app.get('io').emit('ticketUpdated', ticket);

  res.status(200).json({
    status: 'success',
    data: {
      ticket
    }
  });
});

exports.deleteTicket = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findByIdAndDelete(req.params.id);

  if (!ticket) {
    return next(new AppError('No ticket found with that ID', 404));
  }

  req.app.get('io').emit('ticketDeleted', { id: req.params.id });

  res.status(204).json({
    status: 'success',
    data: null
  });
});
