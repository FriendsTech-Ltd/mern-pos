import express from 'express';
import protect from '../middleware/auth';
import validators from '../models/validation/index';
import { handleValidations } from '../middleware/handleValidations';

import {
  registerUser,
  loginUser,
  getUser,
  deleteUser,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyUser,
} from '../controllers/userController';

const router = express.Router();

router.route('/register').post(handleValidations(validators.userValidation), registerUser);
router.route('/login').post(handleValidations(validators.loginValidation), loginUser);
router.route('/change-password').put(protect, changePassword);
router.route('/me').get(protect, getUser);

router.route('/update/:id').put(protect, updateUser);
router.route('/delete').post(protect, deleteUser);

router.route('/verify/:registerToken').get(verifyUser);

router.route('/forgot').post(forgotPassword);
router.route('/reset/:token').post(resetPassword);

export default router;
