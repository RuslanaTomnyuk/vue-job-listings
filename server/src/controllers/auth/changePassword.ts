import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getUserById } from '../../helpers/getUserById';
import * as changePasswordService from '../../services/users/changePassword';
import bcrypt from 'bcrypt';

export const changePassword = async (
  req,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserById({ id: +req.user.id });

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'We could not find the user with a given email',
      });
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        status: 400,
        message: 'The current password you provided is not valid!',
      });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        status: 400,
        message: 'Password and ConfirmPassword do not match!',
      });
    }

    const hashedPassword = await bcrypt.hash(
      req.body.password,
      +process.env.SALT
    );
    const hashedConfirmPassword = await bcrypt.hash(
      req.body.confirmPassword,
      +process.env.SALT
    );

    const payload = { id: user.id, email: user.email };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '10m',
    });

    await changePasswordService.changePassword(
      user,
      hashedPassword,
      hashedConfirmPassword
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: 'User password updated Successfully',
      token: accessToken,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    next(error);
  }
};
