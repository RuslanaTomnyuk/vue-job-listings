import { NextFunction, Request, Response } from 'express';
import * as usersService from '../../services/users/getUsers';

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await usersService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
