import { NextFunction, Response } from 'express';
import * as usersService from '../../services/users/getUsers';

export const getUsers = async (
  req,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await usersService.getUsers();
    res.status(200).json({
      status: 200,
      users,
    });
  } catch (error) {
    next(error);
  }
};
