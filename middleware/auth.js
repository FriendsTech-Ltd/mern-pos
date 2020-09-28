import jwt from 'jsonwebtoken';
import asyncHandler from './async';

import UserModel from '../models/UserModel';

// Protect Routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization
    && req.headers.authorization.startsWith('Bearer')
  ) {
    // eslint-disable-next-line
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exits
  if (!token) {
    return res.status(401).json({ success: false, msg: 'You are not authorized to access this route' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await UserModel.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({ success: false, data: err });
  }
});

export default protect;
