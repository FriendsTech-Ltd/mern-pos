// import UserModel from '../models/UserModel';
import fs from 'fs';
import asyncHandler from '../middleware/async';

import CustomerModel from '../models/CustomerModel';
import { NotFound, BadRequest } from '../utils/error';

// @desc    Get All Customer
// @route   GET /api/customer/
// @access  Private
export const getCustomers = asyncHandler(async (req, res, next) => {
  const customer = await CustomerModel.find({ user: req.user.id });

  if (customer instanceof Error) return next(customer, req, res);

  res.status(200).json({ success: true, customer, msg: 'All customer fetched' });
});

// @desc    Add Customer
// @route   POST /api/customer/
// @access  Private
export const addCustomer = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const customer = await CustomerModel.create(req.body);

  if (customer instanceof Error) return next(customer, req, res);

  res.status(201).json({ success: true, customer, msg: 'Customer addded successfully' });
});

// @desc    Update customer
// @route   PUT /api/customer/:id
// @access  Private
export const updateCustomer = asyncHandler(async (req, res, next) => {
  const updatedCustomer = await CustomerModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (updatedCustomer instanceof Error) return next(updatedCustomer, req, res);
  res.status(200).json({ success: true, product: updatedCustomer, msg: 'Customer updated successfully' });
});

// @desc    Delete Customer
// @route   DELETE /api/customer/:id
// @access  Private
export const deleteCustomer = asyncHandler(async (req, res, next) => {
  const deletedCustomer = await CustomerModel.findByIdAndRemove(req.params.id);

  if (deletedCustomer instanceof Error) {
    return next(deletedCustomer, req, res);
  }

  return res.status(200).json({ success: true, deletedCustomer, msg: 'Customer deleted successfully' });
});
