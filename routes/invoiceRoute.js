import express from 'express';
import protect from '../middleware/auth';
import validators from '../models/validation/index';
import { handleValidations } from '../middleware/handleValidations';

import {
  createInvoice

} from '../controllers/invoiceController';

const router = express.Router();

router.route('/')
  .post(protect, createInvoice);

export default router;
