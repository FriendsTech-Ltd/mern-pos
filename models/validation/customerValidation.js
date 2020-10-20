import Joi from 'joi';

const schema = Joi.object().keys(
  {
    name: Joi.string().min(4).required(),
    phone: Joi.number().min(11).required(),
    address: Joi.string().required(),

  },
);

const validate = (data) => {
  const result = schema.validate(data);
  result.value = data;
  return result;
};

export default validate;
