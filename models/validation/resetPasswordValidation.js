import Joi from 'joi';

const schema = Joi.object().keys(
  {
    newPassword: Joi.string().min(6).required(),
    confirmPassword: Joi.ref('newPassword'),

  },
);

const validate = (data) => {
  const result = schema.validate(data);
  result.value = data;
  return result;
};

export default validate;
