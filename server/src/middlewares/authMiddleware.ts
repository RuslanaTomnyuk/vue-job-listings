import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getUserById } from '../helpers/getUserById';

export const authMiddleware = async (
  req,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.header('Authorization')?.replace('Bearer ', '');

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized request.',
      });
    }

    const decodedToken: any = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await getUserById({ id: +decodedToken.id });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid Access Token!',
      });
    }

    const { password, confirmPassword, ...userData } = user;

    req.user = userData;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized!',
    });
  }
  
};
