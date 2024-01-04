import { NextFunction, Request, Response } from 'express';
import * as updateUserService from '../../services/users/updateUser';

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, role } = req.body;
    // console.log(username, email, password, role);

    if (!username || !email || !password) {
      return res.sendStatus(400);
    }

    const userRole = role;

    if (userRole !== 'Admin') {
      return res
        .status(403)
        .json({ error: 'Forbidden: Only Admin users can create new users.' });
    }

    const userId = +req.params.id;
    const userData = req.body;

    const updatedUser = await updateUserService.updateUser(userId, userData);

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    next(error);
  }
};
