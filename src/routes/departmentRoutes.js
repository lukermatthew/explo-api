const express = require('express');
const departmentController = require('./../controllers/departmentController');
const authController = require('./../controllers/authController');

const router = express.Router();

// router.use(authController.protect); // Apply authentication middleware to all routes

router
  .route('/')
  .get(departmentController.getAllDepartments) // Get all departments
  .post(departmentController.createDepartment); // Create a new department

router
  .route('/:id')
  .get(departmentController.getDepartment) // Get a specific department by ID
  .put(departmentController.updateDepartment) // Update a department by ID
  .delete(departmentController.deleteDepartment); // Delete a department by ID

module.exports = router;
