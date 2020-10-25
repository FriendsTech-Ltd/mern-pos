import express from 'express';
import protect from '../middleware/auth';
import Authorized from '../middleware/Authorized';
import validators from '../models/validation/index';
import { handleValidations } from '../middleware/handleValidations';
import uploadImage from '../middleware/uploadMiddleware';
import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  getAllProductInfo,

} from '../controllers/productController';

const router = express.Router();

router.route('/')
  .post(protect, uploadImage.single('image'), handleValidations(validators.productValidation), addProduct)
  .get(protect, getProducts);

router.route('/info').get(protect, getAllProductInfo);
router.route('/:id').put(protect, handleValidations(validators.productValidation), updateProduct).delete(protect, Authorized, deleteProduct);

export default router;
