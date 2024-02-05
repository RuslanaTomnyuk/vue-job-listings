import Joi from 'joi';
import JoiPasswordComplexity from 'joi-password-complexity';

export const loginSchema = Joi.object({
  email: Joi.string().min(5).trim().max(100).email().required(),
  password: JoiPasswordComplexity().required(),
});
