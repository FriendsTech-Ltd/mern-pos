import Joi from 'joi';

const schema = Joi.object().keys(
  {
    _id: Joi.string(),
    name: Joi.string().min(4).required(),
    phone: Joi.string().min(11).required(),
    email: Joi.string().email(),
    address: Joi.string().required(),
  },
);

const validate = (data) => {
  const result = schema.validate(data);
  result.value = data;
  return result;
};

export default validate;
