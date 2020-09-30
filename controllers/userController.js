import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from '../middleware/async';
import UserModel from '../models/UserModel';
import { NotFound, BadRequest } from '../utils/error';
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
    throw new BadRequest('Email already Exits');
  }
  // Create token
  const registerToken = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  // Create reset URL
  const verificationURL = `${req.protocol}://${req.get('host')}/api/auth/verify/${registerToken}`;

  const message = `Please click the link below to complete your signup process on POS System: \n\n ${verificationURL} `;

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
  const { email, password } = req.body;

  // Check for manager
  const user = await UserModel.findOne({ email }).select('+password');
  if (!user) {
    throw new NotFound(`User not found by the :${email}`);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new BadRequest('Invalid credentials');
  }
  return sendTokenResponse(user, 200, res);
});

// get user
export const getUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user.id).select('-password');
  res.status(200).json({ success: true, data: user });
});

// delete User
export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  if (!user) {
    throw new NotFound(`User not found by the is:${id}`);
  }
  const result = await UserModel.deleteOne({ _id: id });
  if (result instanceof Error) {
    return next(result, req, res);
  }
  return res.status(200).json({ success: true, msg: 'Delete success', data: user });
});

// update user
export const updateUser = asyncHandler(async (req, res) => {
  const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: updatedUser, msg: 'User updated successfully' });
});

// change password
export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  console.log(req.user)
  const { _id } = req.user;

  const match = await bcrypt.compare(oldPassword, req.user.password);

  if (!match) {
    return res.status(400).json({ success: false, msg: 'Old password does not match' });
  }

  const hash = await bcrypt.hash(newPassword, 11);

  await UserModel.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { password: hash } },
  );
  return res.status(200).json({ success: true, msg: 'Password changed successfully' });
});

// forget password
export const forgetPassword = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: 'user route okay' });
});

// reset  password
export const resetPassword = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: 'user route okay' });
});
