import express from 'express';
import protect from '../middleware/auth';
import Authorized from '../middleware/Authorized';
import validators from '../models/validation/index';
import { handleValidations } from '../middleware/handleValidations';

import {
  getCustomers,
  getCustomer,
  addCustomer,
  deleteCustomer,
  updateCustomer,
  getTotalCustomerCount,
  payDue,
} from '../controllers/customerController';

const router = express.Router();

router.route('/')
  .post(protect, handleValidations(validators.customerValidation), addCustomer)
  .get(protect, getCustomers);

router.route('/count').get(protect, getTotalCustomerCount);
router.route('/due/pay').put(protect, payDue);
router.route('/details/:id').get(protect, getCustomer);
router.route('/:id').put(protect, handleValidations(validators.customerValidation), updateCustomer).delete(protect, Authorized, deleteCustomer);

export default router;
