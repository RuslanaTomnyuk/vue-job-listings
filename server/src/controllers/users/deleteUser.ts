import { NextFunction, Request, Response } from 'express';
import * as deleteUserService from '../../services/users/deleteUser';

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // the user role is hardcoded
    const userRole = 'Admin';

    if (userRole !== 'Admin') {
      return res
        .status(403)
        .json({ error: 'Forbidden: Only Admin users can delete a user.' });
    }
    
    const userId = +req.params.id;
    const user = await deleteUserService.deleteUser({
      id: userId,
    });

    res.status(200).send({
      status: 201,
      success: true,
      message: 'User deleted Successfully',
      user: user,
    });
  } catch (error) {
    next(error);
  }
};
