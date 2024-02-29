import Joi from 'joi';
import JoiPasswordComplexity from 'joi-password-complexity';

export const updateUserSchema = Joi.object({
  username: Joi.string().trim().max(50).required(),
  email: Joi.string().min(5).trim().max(100).email().required(),
  password: JoiPasswordComplexity().required(),
});
