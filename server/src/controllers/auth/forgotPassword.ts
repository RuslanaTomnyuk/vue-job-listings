import { NextFunction, Request, Response } from 'express';
import { sendEMail } from '../../config/nodemail';
import { getUserByEmail } from '../../helpers/getUserByEmail';
import jwt from 'jsonwebtoken';

// not implemented yet
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail({ email });

    if (!user) {
      res.status(404).json({
        error: 'User not found',
        message: 'We could not find the user with a given email',
      });
    }

    const payload = { id: user.id, email: user.email };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '10m',
    });

    const mailInfo = {
      to: `${email}`,
      subject: 'Reset Password Link ✔',
      text: `Hello! There, You have recently
           visited our website to reset password and entered your email. 
           Please follow the given link to reset your email 
           http://localhost:5173/auth/reset-password/${user.id}/${accessToken}  
           Thanks`,
    };

    res.status(201).json({
      status: 201,
      success: true && (await sendEMail(mailInfo)),
      message: 'Success'
    });
  } catch (error) {
    console.error('Error occurred while restoring a password', error);
    next(error);
  }
};
