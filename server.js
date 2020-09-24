import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';

import connectDB from './config/db';
import errorHandler from './middleware/errorHandler';

// Routes files
import test from './routes/test';

// Load env vars
dotenv.config({ path: './config/config.env' });

// Database Connection
connectDB();

const app = express();

// Body parse
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'));
}

// Mount routers
app.use('/api/test', test);

const PORT = process.env.PORT || 5000;

// Serve static asset in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

// Error handler
app.use(errorHandler);

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));

// Handle Unhandled rejections
// eslint-disable-next-line no-unused-vars
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => process.exit(1));
});
