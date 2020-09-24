import ErrorResponse from '../utils/errorResponse';

// eslint-disable-next-line
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for developer
  console.log(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000 && err.keyValue.email) {
    const message = 'The email already exist';
    error = new ErrorResponse(message, 400);
  }

  if (err.code === 11000 && err.keyValue.hostelName) {
    const message = 'The hostel name already exist';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server Error' });
};

export default errorHandler;
