import { NextFunction, Response } from 'express';
import * as createUserService from '../../services/users/createUser';
import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';
import bcrypt from 'bcrypt';
import { createUserSchema } from '../../validationSchemas/createUserSchema';
import { errorHandler } from '../../errors/errorHandler';

export const createUser = async (
  req,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = createUserSchema.validate(req.body);

    if (error) {
      throw new Error(error.message);
    }
    const { username, email, password, confirmPassword, role } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.sendStatus(400);
    }

    const userExists = await AppDataSource.getRepository(User).findOneBy({
      email,
    });

    if (userExists) {
      res.status(400).json({
        status: 400,
        message: 'Email already in use',
      });
      return;
    }

    const userRole = role;

    if (userRole !== 'Admin') {
      return res
        .status(403)
        .json({ error: 'Forbidden: Only Admin users can create new users.' });
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

    const createdUser = await createUserService.createUser({
      username,
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
      role: userRole,
    });

    res.status(201).json({
      message: 'User created Successfully',
      user: createdUser,
    });
  } catch (error) {
    errorHandler(error);
    next(error);
  }
};
