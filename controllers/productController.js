// import UserModel from '../models/UserModel';
import fs from 'fs';
import asyncHandler from '../middleware/async';

import ProductModel from '../models/ProductModel';
import { NotFound, BadRequest } from '../utils/error';

// @desc    Get All Product
// @route   PUT /api/product/:id
// @access  Private
export const getProducts = asyncHandler(async (req, res, next) => {
  const products = await ProductModel.find({ user: req.user.id });

  if (products instanceof Error) return next(products, req, res);

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
export const updateProduct = asyncHandler(async (req, res, next) => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (updateProduct instanceof Error) return next(updateProduct, req, res);
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
    const result = await
    ProductModel.findByIdAndRemove(req.params.id);
    if (result instanceof Error) {
      return next(result, req, res);
    }
    return res.status(200).json({ success: true, msg: 'Product deleted successfully', product: result });
  });
});
