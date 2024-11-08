const express = require('express');
const ticketTagController = require('../controllers/ticketTagController');

const router = express.Router();

router.route('/').post(ticketTagController.createTicketTag); // Create a new ticket-tag association

router.route('/:id').delete(ticketTagController.deleteTicketTag); // Delete a ticket-tag association

module.exports = router;
