import express from 'express';
import protect from '../middleware/auth';
import validators from '../models/validation/index';
import { handleValidations } from '../middleware/handleValidations';
import uploadImage from '../middleware/uploadMiddleware';
import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,

} from '../controllers/productController';

const router = express.Router();

router.route('/').post(protect, uploadImage.single('image'), handleValidations(validators.productValidation), addProduct).get(protect, getProducts);
router.route('/:id').put(protect, updateProduct).delete(protect, deleteProduct);

export default router;
