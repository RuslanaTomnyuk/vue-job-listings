import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { refreshToken } from '../controllers/auth/refreshToken';

export const authMiddleware = async (
  req,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: 'Invalid Authorization header. Please, log in again.' });
  }

  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) {
    if (refreshToken(req, res)) {
      next();
    }
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        if (refreshToken(req, res)) {
          next();
        }
      }

      // if token has been altered or has expired, return an unauthorized error
      return res
        .status(401)
        .json({ message: 'This session has expired. Please login' });
    } else {
      req.user = user;
      next();
    }
  });
};
