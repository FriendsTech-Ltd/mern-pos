import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from '../middleware/async';
import UserModel from '../models/UserModel';

import sendEmail from '../utils/sendEmail';

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {

  // Create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res
    .status(statusCode)
    .json({ success: true, token });
};

// register user
export const registerUser = asyncHandler(async (req, res) => {
  const user = req.body;
  const isUser = await UserModel.findOne({ email: user.email });
  if (isUser) {
    return res.status(400).json({ success: false, data: isUser });
  }
  // Create token
  const registerToken = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  // Create reset URL
  const verificationURL = `${req.protocol}://${req.get('host')}/api/auth/verify/${registerToken}`;

  const message = `Please click the link below to complete your signup process on POS System: \n\n ${verificationURL}`;

  await sendEmail({
    email: user.email,
    subject: 'POS account verification',
    message,
  });

  res.status(200).json({ success: true, data: `Please check your email ${user.email} to complete signup process in order to use the application` });
});

// Verify user
export const verifyUser = asyncHandler(async (req, res) => {
  const token = req.params.registerToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const salt = await bcrypt.genSalt(10);
  decoded.user.password = await bcrypt.hash(decoded.user.password, salt);
  const user = await UserModel.create(decoded.user);
  sendTokenResponse(user, 201, res);
});

// login user
export const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: 'user route okay' });
});

// get user
export const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: 'user route okay' });
});

// delete User
export const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: 'user route okay' });
});

// update user
export const updateUser = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: 'user route okay' });
});

// change password
export const changePasswor = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: 'user route okay' });
});

// forget password
export const forgetPassword = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: 'user route okay' });
});

// reset  password
export const resetPassword = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: 'user route okay' });
});
