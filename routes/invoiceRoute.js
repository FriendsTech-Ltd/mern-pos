import express from 'express';
import protect from '../middleware/auth';
import validators from '../models/validation/index';
import { handleValidations } from '../middleware/handleValidations';

import {
  createInvoice,
  deleteInvoice,
  getInvoices,
  getTotalSaleInfo,
  getSaleInfoWithDate,
  getRecentSale,
  getTodaySale,

} from '../controllers/invoiceController';

const router = express.Router();

router.route('/')
  .post(protect, handleValidations(validators.invoiceValidation), createInvoice)
  .get(protect, getInvoices);

router.route('/sale-info').get(protect, getTotalSaleInfo);
router.route('/sale/day').get(protect, getSaleInfoWithDate);
router.route('/sale/recent').get(protect, getRecentSale);
router.route('/sale/today').get(protect, getTodaySale);

router.route('/:id').delete(protect, deleteInvoice);

export default router;
