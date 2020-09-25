import express from 'express';

import {
  registerUser,
  loginUser,
  getUser,
  deleteUser,
  updateUser,
  changePasswor,
  forgetPassword,
  resetPassword,
} from '../controllers/usercontroller';

const router = express.Router();

router.route('/').post(registerUser).get(loginUser).get(getUser);
router.route('/:id').delete(deleteUser).put(updateUser);
router.route('/change-password').put(changePasswor);
router.route('/forget').post(forgetPassword);
router.route('/reset/:token').post(resetPassword);

export default router;
