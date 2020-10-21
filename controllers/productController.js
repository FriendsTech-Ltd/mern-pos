import mongoose from 'mongoose';
import fs from 'fs';
import asyncHandler from '../middleware/async';

import ProductModel from '../models/ProductModel';
import { NotFound } from '../utils/error';

// @desc    Get All Product
// @route   PUT /api/product/:id
// @access  Private
export const getProducts = asyncHandler(async (req, res) => {
  const products = await ProductModel.find({ user: req.user.id });

  if (!products.length) throw new NotFound('Invoice not found');

  res.status(200).json({ success: true, products, msg: 'All product fetched' });
});

// @desc    Add Product
// @route   POST /api/product/
// @access  Private
export const addProduct = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  req.body.image = req.file.path;

  const product = await ProductModel.create(req.body);

  if (product instanceof Error) return next(product, req, res);

  res.status(201).json({ success: true, product, msg: 'Product addded successfully' });
});

// @desc    Update Product
// @route   PUT /api/product/:id
// @access  Private
export const updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updateProduct) throw new NotFound('Product not found');

  res.status(200).json({ success: true, product: updatedProduct, msg: 'Product updated successfully' });
});

// @desc    Delete Product
// @route   DELETE /api/product/:id
// @access  Private
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const productImage = await ProductModel.findOne({ _id: req.params.id }).select('image');

  if (!productImage) {
    throw new NotFound(`User not found by the is:${req.params.id}`);
  }
  fs.unlink(`${productImage.image}`, async (err) => {
    if (err instanceof Error) return next(err, req, res);

    const result = await ProductModel.findByIdAndRemove(req.params.id);
    return res.status(200).json({ success: true, msg: 'Product deleted successfully', product: result });
  });
});

// @desc    Get All product information
// @route   GET /api/product/info
// @access  Private
export const getAllProductInfo = asyncHandler(async (req, res) => {
  const { ObjectId } = mongoose.Types;

  const productInfo = await ProductModel.aggregate([
    {
      $match: { user: ObjectId(req.user.id) },
    },
    {
      $group: {
        _id: req.user.id,
        totalProductCost: { $sum: { $multiply: ['$price', '$stock'] } },
        totalProduct: { $sum: '$stock' },
        totalProductType: { $sum: 1 },
      },
    },
  ]);

  if (!productInfo.length) {
    throw new NotFound('No information found');
  }

  res.status(200).json({ success: true, productInfo: productInfo[0], msg: 'Successfully product info fetched' });
});
