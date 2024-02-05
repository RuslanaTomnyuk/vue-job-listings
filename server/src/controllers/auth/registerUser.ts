import { Request, Response } from 'express';
import * as createUserService from '../../services/users/createUser';
import bcrypt from 'bcrypt';
import { sendEMail } from '../../config/nodemail';
import { createUserSchema } from '../../validationSchemas/createUserSchema';
import { getUserByEmail } from '../../helpers/getUserByEmail';

export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { error } = createUserSchema.validate(req.body);

    if (error) {
      throw new Error(error.message);
    }

    const { username, email, password, confirmPassword, role } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.sendStatus(400);
    }

    const userExists = await getUserByEmail({ email });

    if (userExists) {
      return res.status(400).json({
        status: 400,
        message: 'That email is already registered',
      });
    }

    const hashedPassword = await bcrypt.hash(password, +process.env.SALT);
    const hashedConfirmPassword = await bcrypt.hash(
      confirmPassword,
      +process.env.SALT
    );

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: 400,
        message: 'Password and ConfirmPassword do not match!',
      });
    }

    await createUserService.createUser({
      username,
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
      role,
    });

    const mailInfo = {
      to: `${email}`,
      subject: 'Email Verification ✔',
      text: `Hello ${username}! There, You have recently
           visited our website and entered your email. 
           Please follow the given link to verify your email 
           http://localhost:5173/ 
           Thanks`,
    };

    sendEMail(mailInfo);

    res.status(201).json({
      status: 201,
      success: true,
      message:
        'Thank you for registration with us. Your account has been successfully created.',
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      code: 500,
      message: 'Internal Server Error',
    });
  }
};
