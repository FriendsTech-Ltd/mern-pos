import userValidation from './userValidation';
import loginValidation from './loginValidation';
import productValidation from './productValidation';
import customerValidation from './customerValidation';
import invoiceValidation from './invoiceValidation';
import resetPasswordValidation from './resetPasswordValidation';
import changePasswordValidation from './changePasswordValidation';

const validators = {
  userValidation,
  loginValidation,
  productValidation,
  customerValidation,
  invoiceValidation,
  resetPasswordValidation,
  changePasswordValidation,
};

export default validators;
