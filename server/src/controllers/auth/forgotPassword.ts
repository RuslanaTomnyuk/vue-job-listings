import { NextFunction, Request, Response } from 'express';

import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';

// not implemented yet
export const forgotPassword = async (
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

    // const newUser = await createUserService.createUser({
    //   username,
    //   email,
    //   password: await bcrypt.hash(password, 15),
    //   role,
    // });

    // const mailInfo = {
    //   from: {
    //     name: 'Job-Listings 👻',
    //     address: process.env.NODEMAIL_EMAIL,
    //   },
    //   to: `${email}`,
    //   subject: 'Email Verification ✔',
    //   text: `Hello ${username}! There, You have recently
    //        visited our website and entered your email.
    //        Please follow the given link to verify your email
    //        http://localhost:3000/job-list
    //        Thanks`,
    // };

    // res.status(201).json({
    //   status: 201,
    //   success: true && sendEMail(mailInfo),
    //   message: 'User created Successfully',
    //   user: newUser,
    // });
  } catch (error) {
    console.error('Error occurred while restoring a password', error);
    next(error);
  }
};
