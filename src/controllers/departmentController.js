const Department = require('./../models/departmentModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createDepartment = catchAsync(async (req, res, next) => {
  const department = await Department.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      department
    }
  });
});

exports.getAllDepartments = catchAsync(async (req, res, next) => {
  const departments = await Department.find();

  res.status(200).json({
    status: 'success',
    results: departments.length,
    data: {
      departments
    }
  });
});

exports.getDepartment = catchAsync(async (req, res, next) => {
  const department = await Department.findById(req.params.id);

  if (!department) {
    return next(new AppError('No department found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      department
    }
  });
});

exports.updateDepartment = catchAsync(async (req, res, next) => {
  const department = await Department.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!department) {
    return next(new AppError('No department found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      department
    }
  });
});

exports.deleteDepartment = catchAsync(async (req, res, next) => {
  const department = await Department.findByIdAndDelete(req.params.id);

  if (!department) {
    return next(new AppError('No department found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
