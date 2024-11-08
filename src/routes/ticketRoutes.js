const express = require('express');
const ticketController = require('./../controllers/ticketController');

const router = express.Router();

router.use((req, res, next) => {
  req.io = req.app.get('io');
  next();
});

router
  .route('/')
  .get(ticketController.getAllTickets)
  .post(ticketController.createTicket);

router
  .route('/:id')
  .get(ticketController.getTicket)
  .put(ticketController.updateTicket)
  .delete(ticketController.deleteTicket);

module.exports = router;
