import Joi from 'joi';

const schema = Joi.object().keys(
  {
    companyName: Joi.string().min(4).required(),
    companyOwner: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    companyType: Joi.string().required(),
    description: Joi.string().required(),
    password: Joi.string().required(),

  },
);

const validate = (data) => {
  const result = schema.validate(data);
  result.value = data;
  return result;
};

export default validate;
