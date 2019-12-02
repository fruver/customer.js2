import Joi from '@hapi/joi';

export const UserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .alphanum()
    .required(),
});

export const TokenSchema = Joi.object({
  userId: Joi.string(),
  token: Joi.string(),
  createdAt: Joi.date(),
});
