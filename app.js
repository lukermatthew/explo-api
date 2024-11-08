const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const http = require('http');
const { Server } = require('socket.io'); // Ensure correct import for Socket.io

const AppError = require('./src/utils/appError');
const globalErrorHandler = require('./src/controllers/errorController');
const userRouter = require('./src/routes/userRoutes');
const roleRouter = require('./src/routes/roleRoutes');
const departmentRouter = require('./src/routes/departmentRoutes');
const ticketRouter = require('./src/routes/ticketRoutes');
const commentRouter = require('./src/routes/commentRoutes');
const tagRouter = require('./src/routes/tagRoutes');
const ticketTagRouter = require('./src/routes/ticketTagRoutes');

const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.set('io', io);
app.use(cors({ origin: '*' }));
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from the same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!'
// });
// app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/roles', roleRouter);
app.use('/api/v1/departments', departmentRouter);
app.use('/api/v1/tickets', ticketRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/tags', tagRouter);
app.use('/api/v1/ticket-tags', ticketTagRouter);

io.on('connection', socket => {
  console.log('New client connected');

  socket.on('newTicket', ticket => {
    io.emit('newTicket', ticket);
  });

  socket.on('deleteTicket', ticketId => {
    io.emit('deleteTicket', ticketId);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = server;
