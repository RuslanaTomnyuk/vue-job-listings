import Joi from 'joi';
import JoiPasswordComplexity from 'joi-password-complexity';

export const updateUserSchema = Joi.object({
  username: Joi.string().trim().max(50).required(),
  password: JoiPasswordComplexity().required(),
  confirmPassword: JoiPasswordComplexity().required(),
  role: Joi.string().trim().max(20).required(),
});
