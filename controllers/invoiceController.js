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
    .select('customer payAmount due totalAmountAfterDiscount createdAt')
    .populate({ path: 'customer', model: 'customer', select: 'name due address' })
    .sort({ createdAt: -1 });
  // .populate({ path: 'customer', model: 'customer' }).select('customer.name');

  if (!invoices.length) throw new NotFound('No invoice found');

  res.status(200).json({ success: true, invoices, msg: 'All product fetched' });
});

// @desc    Get single Invoice
// @route   GET /api/invoice/:id
// @access  Private
export const getInvoice = asyncHandler(async (req, res) => {
  const invoice = await InvoiceModel.findOne({ user: req.user.id, _id: req.params.id })
    .populate({ path: 'customer', model: 'customer', select: 'name due address phone email' });

  if (!invoice) throw new NotFound('No invoice found');

  res.status(200).json({ success: true, invoice, msg: 'Single invoice fetched' });
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

  products.map(async (product) => {
    if (product.quantity <= 0) throw new NotFound('You send negative or 0 value for quantity');
    const result = await ProductModel.findById(product._id);
    if (!result) throw new NotFound('No product found');
    if (product.quantity > result.stock) throw new NotFound('Your selected product has been stock out');
  });

  const newInvoice = {
    user: req.user.id,
    customer: customerId,
    productId: {},
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
    newInvoice.products.push({
      productId: result._id,
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
  // invoice.customer = customer;
  const createdInv = await InvoiceModel.findById(invoice._id)
    .populate({ path: 'customer', model: 'customer', select: 'name due address phone email' });
  res.status(201).json({
    success: true,
    invoice: createdInv,
    msg: 'Invoice created successfully',
  });
});

// @desc    Delete Invoice
// @route   DELETE /api/invoice/:id
// @access  Private
export const deleteInvoice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { ObjectId } = mongoose.Types;
  const invoice = await InvoiceModel.findOne({ _id: id, user: req.user.id });

  await Promise.all(invoice.products.map(async (product) => {
    const result = await ProductModel.findById(product.productId);

    console.log(result);

    result.stock += product.quantity;
    await result.save();
  }));

  await CustomerModel.findByIdAndUpdate(invoice.customer,
    { $inc: { due: -invoice.due }, $pull: { totalSell: ObjectId(invoice._id) } });

  const deletedInvoice = await InvoiceModel.findByIdAndDelete(id);
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

  const totalSaleInfo = await InvoiceModel.aggregate([
    {
      $match: { user: ObjectId(req.user.id) },
    },
    { $unwind: '$products' },
    {
      $group: {
        _id: req.user.id,
        totalSaleAmount: { $sum: '$totalAmountAfterDiscount' },
        totalSoldInvoice: { $sum: 1 },
        totalDueAmount: { $sum: '$due' },
        totalSoldProductQuantity: { $sum: '$products.quantity' },
        totalProductCost: { $sum: { $multiply: ['$products.price', '$products.quantity'] } },
      },
    },
    {
      $addFields: {
        totalProfit: { $subtract: ['$totalSaleAmount', '$totalProductCost'] },
      },
    },
  ]);

  if (!totalSaleInfo.length) throw new NotFound('No sale info found');

  res.status(200).json({ success: true, totalSaleInfo: totalSaleInfo[0], msg: 'Total sale amount' });
});

// @desc    Get Total sale info
// @route   GET /api/invoice/sale/day
// @access  Private
export const getSaleInfoWithDate = asyncHandler(async (req, res) => {
  const { ObjectId } = mongoose.Types;
  const query = req.query.day;

  // const todaydate = new Date().toISOString().slice(0, 10);
  // const olddate = (new Date().getTime() - (query * 24 * 60 * 60 * 1000));

  // const day = query == 0 ? todaydate : olddate;

  // const today = new Date();
  // today.setHours(0, 0, 0, 0);

  const oldDate = (new Date().getTime() - (query * 24 * 60 * 60 * 1000));
  // const day = query === Number(0) ? today : oldDate;
  const day = new Date(oldDate);
  day.setHours(0, 0, 0, 0);

  const totalSaleInfoByDay = await InvoiceModel.aggregate([
    {
      $match: {
        user: ObjectId(req.user.id),
        createdAt: { $gte: new Date(day) },
      },
    },
    { $unwind: '$products' },
    {
      $group: {
        _id: req.user.id,
        totalSaleAmount: { $sum: '$totalAmountAfterDiscount' },
        totalSoldProduct: { $sum: '$products.quantity' },
        totalSoldInvoice: { $sum: 1 },
        totalProductCost: { $sum: { $multiply: ['$products.price', '$products.quantity'] } },
        totalDue: { $sum: '$due' },
      },
    },
    {
      $addFields: {
        totalProfit: { $subtract: ['$totalSaleAmount', '$totalProductCost'] },
        currentCash: { $subtract: ['$totalSaleAmount', '$totalDue'] },
      },
    },
  ]);

  if (!totalSaleInfoByDay.length) {
    return res.status(200).json({ success: true, totalSaleInfoByDay, msg: 'No sale so far' });
  }

  res.status(200).json({ success: true, totalSaleInfoByDay: totalSaleInfoByDay[0], msg: 'Total sale amount' });
});

// @desc    Get recent sale
// @route   GET /api/invoice/sale/recent
// @access  Private
export const getRecentSale = asyncHandler(async (req, res) => {
  const recentSale = await InvoiceModel.find({ user: req.user.id })
    .populate({ path: 'customer', model: 'customer', select: 'name' })
    .sort({ createdAt: -1 }).limit(7);

  if (!recentSale.length) {
    throw new NotFound('Recently you don\'t have any sale');
  }

  res.status(200).json({ success: true, recentSale, msg: 'Recent sale fetched' });
});

// @desc    Get today  sale
// @route   GET /api/invoice/sale/today
// @access  Private
export const getTodaySale = asyncHandler(async (req, res) => {
  // const today = new Date().toISOString().slice(0, 10);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todaySale = await InvoiceModel
    .find({ user: req.user.id, createdAt: { $gte: new Date(today) } })
    .select('totalAmountAfterDiscount createdAt');

  if (!todaySale.length) {
    throw new NotFound('Today you don\'t have any sale');
  }

  res.status(200).json({ success: true, todaySale, msg: 'Today sale fetched' });
});
