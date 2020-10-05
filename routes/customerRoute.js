import express from 'express';
import protect from '../middleware/auth';
import validators from '../models/validation/index';
import { handleValidations } from '../middleware/handleValidations';

import {
  getCustomers,
  addCustomer,
  deleteCustomer,
  updateCustomer,

} from '../controllers/customerController';

const router = express.Router();

router.route('/')
  .post(protect, handleValidations(validators.customerValidation), addCustomer)
  .get(protect, getCustomers);
router.route('/:id').put(protect, updateCustomer).delete(protect, deleteCustomer);

export default router;
