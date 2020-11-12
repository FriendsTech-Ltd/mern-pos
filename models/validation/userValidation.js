import Joi from 'joi';

const schema = Joi.object().keys(
  {
    _id: Joi.string(),
    companyName: Joi.string().min(4).required(),
    companyOwner: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    companyType: Joi.string().required(),
    description: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.number().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.ref('password'),
  },
);

const validate = (data) => {
  const result = schema.validate(data);
  result.value = data;
  return result;
};

export default validate;
