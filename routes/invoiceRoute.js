import express from 'express';
import protect from '../middleware/auth';
import validators from '../models/validation/index';
import { handleValidations } from '../middleware/handleValidations';

import {
  createInvoice,
  deleteInvoice,
  getInvoices,
  getTotalSaleInfo,
  getTotalDue,
} from '../controllers/invoiceController';

const router = express.Router();

router.route('/')
  .post(protect, handleValidations(validators.invoiceValidation), createInvoice)
  .get(protect, getInvoices);

router.route('/sale-info').get(protect, getTotalSaleInfo);
router.route('/total-due').get(protect, getTotalDue);

router.route('/:id').delete(protect, deleteInvoice);

export default router;
