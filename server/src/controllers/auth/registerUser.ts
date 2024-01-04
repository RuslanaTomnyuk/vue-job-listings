import { NextFunction, Request, Response } from 'express';
import * as createUserService from '../../services/users/createUser';
import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';
import bcrypt from 'bcrypt';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.sendStatus(400);
    }

    const userExists = await AppDataSource.getRepository(User).findOneBy({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        status: 400,
        message: 'Email already in use',
      });
    }

    const newUser = await createUserService.createUser({
      username,
      email,
      password: await bcrypt.hash(password, 15),
      role,
    });

    res.status(201).json({
      status: 201,
      success: true,
      message: ' User created Successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    next(error);
  }
};
