const express = require('express');
const commentController = require('./../controllers/commentController');

const router = express.Router();

router
  .route('/')
  .get(commentController.getAllComments) // Get all comments
  .post(commentController.createComment); // Create a new comment

router
  .route('/:id')
  .get(commentController.getComment) // Get a specific comment by ID
  .put(commentController.updateComment) // Update a comment by ID
  .delete(commentController.deleteComment); // Delete a comment by ID

module.exports = router;
