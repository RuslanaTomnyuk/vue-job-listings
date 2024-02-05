import { NextFunction, Request, Response } from 'express';
import { sendEMail } from '../../config/nodemail';
import { getUserByEmail } from '../../helpers/getUserByEmail';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.sendStatus(400);
    }

    const user = await getUserByEmail({ email });

    if (!user) {
      res.status(404).json({
        error: 'User not found',
        message: 'We could not find the user with a given email',
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');

    const hashedResetToken = await bcrypt.hash(resetToken, +process.env.SAULT);

    user.passwordResetToken = hashedResetToken;
    user.passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);

    await AppDataSource.getRepository(User).update(user.id, { ...user });

    const resetPasswordLink = `${process.env.CLIENT_URL}/auth/reset-password/${user.id}/${resetToken}`;

    const mailInfo = {
      to: `${email}`,
      subject: 'Reset Password Link ✔',
      text: `Hello! We've received a password reset request. Please follow the given link to reset your password\n\n
      ${resetPasswordLink}\n
      This password link will be valid only 20 minutes.\n\n
           Thanks`,
    };

    try {
      await sendEMail(mailInfo);
      res.status(200).json({
        status: 200,
        success: true,
        message: 'Password reset link sent to the user email.',
      });
    } catch (error) {
      user.passwordResetToken = null;
      user.passwordResetTokenExpires = null;
      await AppDataSource.getRepository(User).save(user);
      next(error);
    }
  } catch (error) {
    console.error(
      'There was an error sending password reset email. Please, try again later!',
      error
    );
    next(error);
  }
};
