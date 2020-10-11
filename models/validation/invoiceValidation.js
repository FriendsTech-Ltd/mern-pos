import Joi from 'joi';

const schema = Joi.object().keys(
  {
    customerId: Joi.string().required(),
    payAmount: Joi.number().required(),
    totalProductAmount: Joi.number().required(),
    discount: Joi.number().required(),
    products: Joi.array().items(Joi.object({
      _id: Joi.string().required(),
      quantity: Joi.number().required(),
    })).required(),

  },
);

const validate = (data) => {
  const result = schema.validate(data);
  result.value = data;
  return result;
};

export default validate;
