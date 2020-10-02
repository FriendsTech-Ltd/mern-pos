import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';

import connectDB from './config/db';
import { handleErrors } from './middleware/handleError';

// Routes files
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
// Load env vars
dotenv.config({ path: './config/config.env' });

// Database Connection
connectDB();

const app = express();

// Body parse
app.use(express.json());
app.use('/public', express.static('public'));
express.urlencoded({ extended: true });
// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'));
}

// Mount routers
app.use('/api/auth/', userRoute);
app.use('/api/product/', productRoute);

const PORT = process.env.PORT || 5000;

// Serve static asset in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

// Error handler
app.use(handleErrors);

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));

// Handle Unhandled rejections
// eslint-disable-next-line no-unused-vars
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => process.exit(1));
});
