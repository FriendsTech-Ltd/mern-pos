import Joi from 'joi';

const schema = Joi.object().keys(
  {
    _id: Joi.string(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    sellingPrice: Joi.number().required(),
    stock: Joi.number().required(),
    unit: Joi.string().required(),
    description: Joi.string().required(),
  },
);

const validate = (data) => {
  const result = schema.validate(data);
  result.value = data;
  return result;
};

export default validate;
