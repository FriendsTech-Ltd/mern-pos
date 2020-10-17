import mongoose from 'mongoose';
import asyncHandler from '../middleware/async';

import ProductModel from '../models/ProductModel';
import InvoiceModel from '../models/InvoiceModel';
import CustomerModel from '../models/CustomerModel';
import { NotFound } from '../utils/error';

// @desc    Get All Invoice
// @route   PUT /api/invoice/:id
// @access  Private
export const getInvoices = asyncHandler(async (req, res) => {
  const invoices = await InvoiceModel.find({ user: req.user.id })
    .populate({ path: 'customer', model: 'customer', select: 'name due address phone' });
  // .populate({ path: 'customer', model: 'customer' }).select('customer.name');

  if (!invoices.length) throw new NotFound('No invoice found');

  res.status(200).json({ success: true, invoices, msg: 'All product fetched' });
});

// @desc    Add Invoice
// @route   POST /api/invoice/
// @access  Private
export const createInvoice = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const {
    products,
    customerId,
    payAmount,
    totalProductAmount,
    discount,
  } = req.body;

  const newInvoice = {
    user: req.user.id,
    customer: customerId,
    products: [],
    totalAmountAfterDiscount: totalProductAmount,
    discount,
    payAmount,
  };

  const dueAmount = totalProductAmount - payAmount;

  if (dueAmount < totalProductAmount) {
    newInvoice.due = dueAmount;
  }

  await Promise.all(products.map(async (product) => {
    const result = await ProductModel.findById(product._id);
    // if (!result) throw new NotFound('No product found');
    newInvoice.products.push({
      name: result.name,
      price: result.price,
      sellingPrice: result.sellingPrice,
      quantity: product.quantity,
    });

    const updatedStock = result.stock - product.quantity;

    result.stock = updatedStock;
    await result.save();
  }));

  const invoice = await InvoiceModel.create(newInvoice);
  if (invoice instanceof Error) return next(invoice, req, res);

  const customer = await CustomerModel.findByIdAndUpdate(customerId,
    {
      $push: { totalSell: invoice._id },
      $inc: { due: dueAmount, allTimeSellAmount: totalProductAmount },
    });
  if (customer instanceof Error) return next(customer, req, res);

  res.status(201).json({
    success: true,
    invoice,
    msg: 'Invoice created successfully',
  });
});

// @desc    Delete Invoice
// @route   DELETE /api/invoice/:id
// @access  Private
export const deleteInvoice = asyncHandler(async (req, res) => {
  const deletedInvoice = await InvoiceModel.findByIdAndDelete(req.params.id);
  if (!deletedInvoice) {
    throw new NotFound('Invoice not found');
  }
  return res.status(200).json({ success: true, invoice: deletedInvoice, msg: 'Invoice deleted successfully' });
});

// @desc    Get Total sale info
// @route   GET /api/invoice/sale-info
// @access  Private
export const getTotalSaleInfo = asyncHandler(async (req, res) => {
  const { ObjectId } = mongoose.Types;

  const totalSaleAmount = await InvoiceModel.aggregate([
    {
      $match: { user: ObjectId(req.user.id) },
    },
    {
      $group: {
        _id: req.user.id,
        totalSaleAmount: { $sum: '$totalAmountAfterDiscount' },
        totalProductSale: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({ success: true, totalSaleAmount, msg: 'Total sale amount' });
});

// @desc    Get Total sale info
// @route   GET /api/invoice/sale-info
// @access  Private
export const getTotalDue = asyncHandler(async (req, res) => {
  const { ObjectId } = mongoose.Types;

  const totalDueAmount = await InvoiceModel.aggregate([
    {
      $match: { user: ObjectId(req.user.id) },
    },
    {
      $group: {
        _id: req.user.id,
        totalDueAmount: { $sum: '$due' },
      },
    },
  ]);

  res.status(200).json({ success: true, totalDueAmount, msg: 'Total sale amount' });
});
