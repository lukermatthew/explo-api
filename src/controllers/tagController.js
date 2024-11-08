const Tag = require('./../models/tagModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createTag = catchAsync(async (req, res, next) => {
  const tag = await Tag.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tag
    }
  });
});

exports.getAllTags = catchAsync(async (req, res, next) => {
  const tags = await Tag.find().sort({ _id: -1 });

  res.status(200).json({
    status: 'success',
    results: tags.length,
    data: {
      tags
    }
  });
});

exports.getTag = catchAsync(async (req, res, next) => {
  const tag = await Tag.findById(req.params.id);

  if (!tag) {
    return next(new AppError('No tag found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tag
    }
  });
});

exports.updateTag = catchAsync(async (req, res, next) => {
  const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!tag) {
    return next(new AppError('No tag found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tag
    }
  });
});

exports.deleteTag = catchAsync(async (req, res, next) => {
  const tag = await Tag.findByIdAndDelete(req.params.id);

  if (!tag) {
    return next(new AppError('No tag found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
