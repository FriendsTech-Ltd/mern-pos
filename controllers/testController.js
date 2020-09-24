import ErrorResponse from '../utils/errorResponse';
import asyncHandler from '../middleware/async';

// Models

export const test = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: 'Test route okay' });
});
