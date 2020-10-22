import mongoose from 'mongoose';
import asyncHandler from '../middleware/async';
import CustomerModel from '../models/CustomerModel';
import { NotFound } from '../utils/error';

// @desc    Get All Customer
// @route   GET /api/customer/
// @access  Private
export const getCustomers = asyncHandler(async (req, res) => {
  const customer = await CustomerModel.find({ user: req.user.id });

  if (!customer.length) throw new NotFound('No customer found');

  res.status(200).json({ success: true, customer, msg: 'All customer fetched' });
});

// @desc    Get Customer
// @route   GET /api/customer/
// @access  Private
export const getCustomer = asyncHandler(async (req, res) => {
  const customer = await CustomerModel.findOne({ user: req.user.id, _id: req.params.id }).populate({ path: 'totalSell', model: 'invoice' });

  if (!customer) throw new NotFound('No customer found');

  res.status(200).json({ success: true, customer, msg: 'Single customer fetched' });
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
export const updateCustomer = asyncHandler(async (req, res) => {
  const updatedCustomer = await CustomerModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedCustomer) throw new NotFound('Customer not found');

  res.status(200).json({ success: true, customer: updatedCustomer, msg: 'Customer updated successfully' });
});

// @desc    Delete Customer
// @route   DELETE /api/customer/:id
// @access  Private
export const deleteCustomer = asyncHandler(async (req, res) => {
  const deletedCustomer = await CustomerModel.findByIdAndDelete(req.params.id);
  if (!deletedCustomer) throw new NotFound('Customer not found');

  return res.status(200).json({ success: true, customer: deletedCustomer, msg: 'Customer deleted successfully' });
});

// @desc    Get total customer count
// @route   GET /api/customer/count
// @access  Private
export const getTotalCustomerCount = asyncHandler(async (req, res) => {
  const customerCount = await CustomerModel.find({ user: req.user.id }).count();

  res.status(200).json({ success: true, customerCount, msg: 'Total customer count fetched' });
});

// @desc    Pay Due
// @route   POST /api/customer/due/pay
// @access  Private
export const payDue = asyncHandler(async (req, res) => {
  const { ObjectId } = mongoose.Types;
  const { _id, payAmount } = req.body;

  const customer = await CustomerModel.findOne({ _id, user: ObjectId(req.user.id) });

  if (customer.due < payAmount) {
    throw new NotFound('You send more amount than due');
  }

  customer.due -= payAmount;
  customer.duePayHistory.push({ payAmount });
  await customer.save();

  res.status(200).json({ success: true, customer, msg: 'Due has been updated' });
});
