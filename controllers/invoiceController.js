import asyncHandler from '../middleware/async';

import ProductModel from '../models/ProductModel';
import InvoiceModel from '../models/InvoiceModel';
import CustomerModel from '../models/CustomerModel';
import { NotFound } from '../utils/error';

// @desc    Get All Product
// @route   PUT /api/product/:id
// @access  Private
export const getInvoices = asyncHandler(async (req, res) => {
  const invoices = await InvoiceModel.find({ user: req.user.id });

  if (!invoices.length) throw new NotFound('No invoice found');

  res.status(200).json({ success: true, invoices, msg: 'All product fetched' });
});

// @desc    Add Invoice
// @route   POST /api/invoice/
// @access  Private
export const createInvoice = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const { products, customerId } = req.body;

  const inv = {
    user: req.user.id,
    customer: customerId,
    products: [],
  };

  await Promise.all(products.map(async (product) => {
    const result = await ProductModel.findById(product._id);
    // if (!result) throw new NotFound('No product found');
    inv.products.push({
      name: result.name,
      price: result.price,
      sellingPrice: result.sellingPrice,
      quantity: product.quantity,
    });

    const updatedStock = result.stock - product.quantity;

    result.stock = updatedStock;
    await result.save();
  }));

  const invoice = await InvoiceModel.create(inv);
  if (invoice instanceof Error) return next(invoice, req, res);

  const customer = await CustomerModel.findByIdAndUpdate(customerId,
    { $push: { totalSell: invoice._id } });
  if (customer instanceof Error) return next(customer, req, res);

  res.status(201).json({
    success: true,
    inv,
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
  return res.status(200).json({ success: true, deletedInvoice, msg: 'Invoice deleted successfully' });
});
