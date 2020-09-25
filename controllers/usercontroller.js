import asyncHandler from '../middleware/async';
// import UserModel from '../models/UserModel';

// register user
export const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: 'user route okay' });
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
