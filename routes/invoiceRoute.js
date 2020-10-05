import express from 'express';
import protect from '../middleware/auth';
import validators from '../models/validation/index';
import { handleValidations } from '../middleware/handleValidations';

import {
  createInvoice,
  deleteInvoice,
  getInvoices,

} from '../controllers/invoiceController';

const router = express.Router();

router.route('/')
  .post(protect, handleValidations(validators.invoiceValidation), createInvoice)
  .get(protect, getInvoices);

router.route('/:id').delete(protect, deleteInvoice);

export default router;
