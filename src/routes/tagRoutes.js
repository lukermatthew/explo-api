const express = require('express');
const tagController = require('./../controllers/tagController');

const router = express.Router();

router
  .route('/')
  .get(tagController.getAllTags) // Get all tags
  .post(tagController.createTag); // Create a new tag

router
  .route('/:id')
  .get(tagController.getTag) // Get a specific tag by ID
  .put(tagController.updateTag) // Update a tag by ID
  .delete(tagController.deleteTag); // Delete a tag by ID

module.exports = router;
