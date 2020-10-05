import express from 'express';
import protect from '../middleware/auth';
import validators from '../models/validation/index';
import { handleValidations } from '../middleware/handleValidations';
import uploadImage from '../middleware/uploadMiddleware';
import {
  getCustomers,
  addCustomer,
  deleteProduct,
  updateProduct,

} from '../controllers/customerController';

const router = express.Router();

router.route('/')
  .post(protect, handleValidations(validators.customerValidation), addCustomer)
  .get(protect, getCustomers);
router.route('/:id').put(protect, updateProduct).delete(protect, deleteProduct);

export default router;
