import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';
import { sendEMail } from '../../config/nodemail';

// not implemented yet
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.sendStatus(400);
    }

    const user = await AppDataSource.getRepository(User).findOneBy({
      email,
    });

    if (!user) {
      res.status(404).json({
        error: 'User not found',
        message: 'We could not find the user with a given email',
      });
    }

    const mailInfo = {
      from: {
        name: 'Job-Listings 👻',
        address: process.env.NODEMAIL_EMAIL,
      },
      to: `${email}`,
      subject: 'Email Verification ✔',
      text: `Hello ${username}! There, You have recently
           visited our website and entered your email. 
           Please follow the given link to verify your email 
           http://localhost:3000/job-list  
           Thanks`,
    };

    res.status(201).json({
      status: 201,
      success: true && sendEMail(mailInfo),
      message: 'password reset Successfully',
      user: user,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    next(error);
  }
};

/*
export function changeUserPassword(body) {
  return fetch.perform("/api/v1.0/profile/change-password", {
    method: "POST",
    body: JSON.stringify({
      currentPassword: body.currentPassword,
      newPassword: body.newPassword,
      confirmPassword: body.confirmPassword
    })
  });
}
*/
