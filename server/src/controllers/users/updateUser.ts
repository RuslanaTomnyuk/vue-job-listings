import { NextFunction, Request, Response } from 'express';
import * as updateUserService from '../../services/users/updateUser';
import { getUserById } from '../../helpers/getUserById';
import { updateUserSchema } from '../../validationSchemas/updateUserSchema';
import bcrypt from 'bcrypt';

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = updateUserSchema.validate(req.body);

    if (error) {
      throw new Error(error.message);
    }

    const { username, password, confirmPassword, role } = req.body;

    if (!username || !password || !confirmPassword) {
      return res.sendStatus(400);
    }

    const userId = +req.params.id;

    const existingUser = await getUserById({ id: userId });

    if (existingUser !== null) {
      const userRole = role;

      if (userRole !== 'Admin') {
        return res.status(403).json({
          error: 'Forbidden: Only Admin users can update a user.',
        });
      }

      const hashedPassword = await bcrypt.hash(password, +process.env.SALT);
      const hashedConfirmPassword = await bcrypt.hash(
        confirmPassword,
        +process.env.SALT
      );

      if (password !== confirmPassword) {
        return res.status(400).json({
          status: 400,
          message: 'Password and ConfirmPassword do not match!',
        });
      }

      const updatedUser = await updateUserService.updateUser(userId, {
        username,
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword,
        role: userRole,
      });

      res.status(200).json({
        message: 'User updated Successfully',
        user: updatedUser,
      });
    } else {
      return res.status(404).json({ error: 'Such user doesn\'t exist!' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    next(error);
  }
};
