const express = require('express');
const roleController = require('./../controllers/roleController');
const authController = require('./../controllers/authController');

const router = express.Router();

// router.use(authController.protect); // Apply authentication middleware to all routes

router
  .route('/')
  .get(roleController.getAllRoles) // Get all roles
  .post(roleController.createRole); // Create a new role

router
  .route('/:id')
  .get(roleController.getRole) // Get a specific role by ID
  .put(roleController.updateRole) // Update a role by ID
  .delete(roleController.deleteRole); // Delete a role by ID

module.exports = router;
