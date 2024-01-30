import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { updateUserPassword } from '../../services/users/updateUserPassword';

// not implemented yet
export const resetPasswordIdToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    if (!password || !id || !token) {
      return res.sendStatus(400);
    }

    await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, +process.env.SALT);
    const hashedConfirmPassword = await bcrypt.hash(password, +process.env.SALT);

    // Update the user's password in the database
    await updateUserPassword(id,
      hashedPassword,
      hashedConfirmPassword
    );

    return res.status(201).json({
      status: 201,
      success: true,
      message: 'Success',
    });
  } catch (error) {
    console.error('Error occurred while restoring a password', error);
    next(error);
  }
};
