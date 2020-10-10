import express from 'express';
import protect from '../middleware/auth';
import validators from '../models/validation/index';
import { handleValidations } from '../middleware/handleValidations';

import {
  getCustomers,
  getCustomer,
  addCustomer,
  deleteCustomer,
  updateCustomer,

} from '../controllers/customerController';

const router = express.Router();

router.route('/')
  .post(protect, handleValidations(validators.customerValidation), addCustomer)
  .get(protect, getCustomers);
router.route('/details/:id').get(protect, getCustomer);
router.route('/:id').put(protect, updateCustomer).delete(protect, deleteCustomer);

export default router;
