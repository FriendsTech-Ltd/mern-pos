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
router.route('/verify/:registerToken').get(verifyUser);
router.route('/me').get(protect, getUser);
router.route('/:id').delete(protect, deleteUser).put(updateUser);
router.route('/change-password').put(changePassword);
router.route('/forget').post(forgetPassword);
router.route('/reset/:token').post(resetPassword);

export default router;
