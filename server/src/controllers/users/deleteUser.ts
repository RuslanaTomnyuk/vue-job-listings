import { NextFunction, Request, Response } from 'express';
import * as deleteUserService from '../../services/users/deleteUser';
import { getUserById } from '../../helpers/getUserById';
import { deleteUserToken } from '../../services/users/deleteRefreshToken';
import { getUserToken } from '../../helpers/getUserToken';

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

    const user = await getUserById({ id: userId });

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'We could not find such user',
      });
    }

    await deleteUserService.deleteUser({ id: userId });

    const userToken = await getUserToken({ userId: userId });
    if (userToken) await deleteUserToken({ userId: userId });

    res.status(200).json({
      status: 201,
      success: true,
      message: 'User deleted Successfully',
      user: user,
    });
  } catch (error) {
    next(error);
  }
};
