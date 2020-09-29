import express from 'express';
import protect from '../middleware/auth';

import {
  registerUser,
  loginUser,
  getUser,
  deleteUser,
  updateUser,
  changePassword,
  forgetPassword,
  resetPassword,
  verifyUser,
} from '../controllers/userController';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').get(loginUser);
router.route('/change-password').put(protect, changePassword);
router.route('/me').get(protect, getUser);

router.route('/update/:id').put(protect, updateUser);
router.route('/delete/:id').delete(protect, deleteUser);

router.route('/verify/:registerToken').get(verifyUser);

router.route('/forget').post(forgetPassword);
router.route('/reset/:token').post(resetPassword);

export default router;
