import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUserById } from '../../helpers/getUserById';
import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';
import { convertToMilliseconds } from '../../helpers/formatDate';

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, id } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword || !token) {
      return res.sendStatus(400);
    }

    if (password !== confirmPassword) {
      res.status(400).json({
        status: 400,
        message: 'Password and ConfirmPassword do not match!',
      });
    }

    const existingUser = await getUserById({ id: +id });

    if (!existingUser) {
      res.status(404).json({
        error: 'User not found',
        message: 'We could not find the user with a given email',
      });
    }

    if (existingUser.passwordResetToken === null) {
      return res.status(400).json({
        error: true,
        message: 'Token is invalid or has expired!!',
      });
    }

    const isTokenValid = await bcrypt.compare(
      token,
      existingUser.passwordResetToken
    );

    if (!isTokenValid) {
      return res.status(400).json({
        error: true,
        message: 'Token is invalid or has expired!!',
      });
    }

    const currentTime = convertToMilliseconds(new Date());

    const isPasswordResetTokenExpired =
      convertToMilliseconds(existingUser.passwordResetTokenExpires) <
      currentTime; // true - token invalid

    if (!isPasswordResetTokenExpired) {
      const hashedPassword = await bcrypt.hash(password, +process.env.SALT);
      const hashedConfirmPassword = await bcrypt.hash(
        confirmPassword,
        +process.env.SALT
      );

      // make update service
      existingUser.password = hashedPassword;
      existingUser.confirmPassword = hashedConfirmPassword;
      existingUser.passwordResetToken = null;
      existingUser.passwordResetTokenExpires = null;
      existingUser.passwordChangeAt = new Date(Date.now());

      await AppDataSource.getRepository(User).save(existingUser);

      const payload = { id: existingUser.id, email: existingUser.email };

      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '10m',
      });

      res.status(200).json({
        status: 200,
        success: true,
        message: 'Reset Successfully',
        token: accessToken,
      });
    } else {
      return res.status(400).json({
        error: true,
        message: 'Token is invalid or has expired!',
      });
    }
  } catch (error) {
    console.error('Error occurred while restoring a password', error);
    next(error);
  }
};
