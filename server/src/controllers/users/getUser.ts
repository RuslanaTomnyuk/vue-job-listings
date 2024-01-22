import { NextFunction, Request, Response } from 'express';
import * as getUserService from '../../services/users/getUser';
import jwt from 'jsonwebtoken';

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookies = req.cookies['auth'];

    const verifiedUser: any = jwt.verify(
      cookies,
      process.env.REFRESH_TOKEN_SECRET
    );

    if (!verifiedUser) {
      return res.status(401).json({
        message: 'Unauthenticated',
      });
    }

    const user = await getUserService.getUser({
      id: verifiedUser.id,
    });

    const { password, confirmPassword, ...userData } = user;

    res.status(200).send(userData);
  } catch (error) {
    next(error);
  }
};
