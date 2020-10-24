import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import fs from 'fs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import asyncHandler from '../middleware/async';
import UserModel from '../models/UserModel';
import CustomerModel from '../models/CustomerModel';
import ProductModel from '../models/ProductModel';
import InvoiceModel from '../models/InvoiceModel';
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
  const verificationURL = `${req.protocol}://${req.headers.host}/verify/${registerToken}`;

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
export const deleteUser = asyncHandler(async (req, res) => {
  const { ObjectId } = mongoose.Types;
  const { id } = req.user;
  const { password } = req.body;

  const match = await bcrypt.compare(password, req.user.password);

  if (!match) {
    return res.status(400).json({ success: false, msg: 'Invalid credentials for deleting account' });
  }

  await CustomerModel.deleteMany({ user: id });
  await InvoiceModel.deleteMany({ user: id });

  const products = await ProductModel.find({ user: ObjectId(id) });

  products.map(async (product) => {
    const productImage = await ProductModel.findOne({ _id: product._id }).select('image');
    fs.unlink(`${productImage.image}`, async () => {
      await ProductModel.findByIdAndRemove(product._id);
    });
  });

  const result = await UserModel.findByIdAndDelete(id);

  if (!result) throw new NotFound('No user found');
  return res.status(200).json({ success: true, msg: 'Delete success', data: result });
});

// update user
export const updateUser = asyncHandler(async (req, res) => {
  const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, user: updatedUser, msg: 'User updated successfully' });
});

// change password
export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

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
export const forgotPassword = asyncHandler(async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    throw new NotFound('User not found');
  }
  crypto.randomBytes(32, async (err, buffer) => {
    const token = buffer.toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    // reset url
    const resetUrl = `${req.protocol}://${req.headers.host}/reset/${token}`;

    const message = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
     Please click on the following link to complete the process: \n\n ${resetUrl} \n\n
     If you did not request this, please ignore this email and your password will remain unchanged.`;

    await sendEmail({
      email: user.email,
      subject: 'Password Reset',
      message,
    });

    res.status(200).json({ success: true, msg: `Please check your email ${user.email} to complete the process` });
  });
});

// reset  password
export const resetPassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;
  const user = await UserModel.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    },
  );
  if (!user) {
    return res.status(400).json({ success: false, msg: 'Try again session expired' });
  }
  const hash = await bcrypt.hash(newPassword, 11);
  const update = new UserModel({
    password: hash,
    resetToken: undefined,
    expireToken: undefined,
  });
  update.save();
  return sendTokenResponse(update, 200, res);
});
