import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getUserById } from '../../helpers/getUserById';
import { updateUserPassword } from '../../services/users/updateUserPassword';
import bcrypt from 'bcrypt';

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies['auth'];

    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return res.sendStatus(400);
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: 400,
        message: 'Password and ConfirmPassword do not match!',
      });
    }

    const verifiedUser: any = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    if (!verifiedUser) {
      return res.status(401).json({
        message: 'Unauthenticated',
      });
    }

    const user = await getUserById({
      id: verifiedUser.id,
    });

    if (!user) {
      res.status(404).json({
        error: 'User not found',
        message: 'We could not find the user with a given email',
      });
    }

    const hashedPassword = await bcrypt.hash(password, +process.env.SALT);
    const hashedConfirmPassword = await bcrypt.hash(
      confirmPassword,
      +process.env.SALT
    );

    await updateUserPassword(
      verifiedUser.id,
      hashedPassword,
      hashedConfirmPassword
    );

    res.status(201).json({
      status: 201,
      success: true,
      message: 'User password updated Successfully',
    });
  } catch (error) {
    console.error('Error creating user:', error);
    next(error);
  }
};
