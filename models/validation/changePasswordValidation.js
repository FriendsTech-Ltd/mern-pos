import Joi from 'joi';

const schema = Joi.object().keys(
  {
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
    confirmPassword: Joi.ref('newPassword'),

  },
);

const validate = (data) => {
  const result = schema.validate(data);
  result.value = data;
  return result;
};

export default validate;
