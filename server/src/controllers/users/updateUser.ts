import { Request, Response } from 'express';
import * as updateUserService from '../../services/users/updateUser';
import { getUserById } from '../../helpers/getUserById';
import { updateUserSchema } from '../../validationSchemas/updateUserSchema';
import bcrypt from 'bcrypt';

export const updateUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { error } = updateUserSchema.validate(req.body);

    if (error) {
      throw new Error(error.message);
    }

    const { username, password, confirmPassword, role } = req.body;
    const userId = +req.params.id;

    if (!username || !password || !confirmPassword) {
      return res.sendStatus(400);
    }

    if (password !== confirmPassword) {
      res.status(400).json({
        status: 400,
        message: 'Password and ConfirmPassword do not match!',
      });
    }

    const existingUser = await getUserById({ id: userId });

    if (existingUser !== null) {
      if (role !== 'Admin') {
        return res.status(403).json({
          error: 'Forbidden: Only Admin users can update the user.',
        });
      }

      const hashedPassword = await bcrypt.hash(password, +process.env.SALT);
      const hashedConfirmPassword = await bcrypt.hash(
        confirmPassword,
        +process.env.SALT
      );

      await updateUserService.updateUser(
        userId,
        username,
        hashedPassword,
        hashedConfirmPassword,
        existingUser
      );

      res.status(200).json({
        message: 'User updated Successfully',
      });
    } else {
      return res.status(404).json({ error: 'Such user doesn\'t exist!' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(401).json({
      error: `${error}`,
      message: 'Cannot update the user',
    });
  }
};
