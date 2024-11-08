const { Server } = require('socket.io');

const createSocketServer = httpServer => {
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:4000', // Update with your frontend URL
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.on('connection', socket => {
    console.log('A user connected:', socket.id);

    // Listen for ticket creation events
    socket.on('newTicket', ticket => {
      console.log('New ticket created:', ticket);
      io.emit('newTicket', ticket); // Broadcast to all clients
    });

    // Listen for ticket deletion events
    socket.on('deleteTicket', ticketId => {
      console.log('Ticket deleted:', ticketId);
      io.emit('deleteTicket', ticketId); // Broadcast to all clients
    });

    // Listen for ticket update events
    socket.on('updateTicket', ticket => {
      console.log('Ticket updated:', ticket);
      io.emit('updateTicket', ticket); // Broadcast to all clients
    });

    socket.on('disconnect', reason => {
      console.log('User disconnected:', socket.id, 'Reason:', reason);
    });

    // Handle reconnection
    socket.on('reconnect', attemptNumber => {
      console.log(
        `Client reconnected: ${socket.id} after ${attemptNumber} attempts`
      );
    });
  });

  return io;
};

module.exports = createSocketServer;
