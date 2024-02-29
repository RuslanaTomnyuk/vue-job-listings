import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUserByEmail } from '../../helpers/getUserByEmail';
import { AppDataSource } from '../../data-source';
import { UserToken } from '../../entity/UserToken';
import { loginSchema } from '../../validationSchemas/loginSchema';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      return res.status(401).json({
        error: true,
        message: error.message,
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Username and password are required.',
      });
    }

    const user = await getUserByEmail({ email });

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'Account does not exist',
      });
    }

    const { password: userPassword, confirmPassword, ...userData } = user;

    const isPasswordValid = await bcrypt.compare(password, userPassword);

    const payload = { id: user.id, email: user.email };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '10m',
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d',
    });

    if (isPasswordValid) {
      await AppDataSource.getRepository(UserToken).save({
        userId: user.id,
        token: refreshToken,
      });
      res
        .status(200)
        .setHeader('Authorization', `Bearer ${accessToken}`) // set the token to response header, so that the client sends it back on each subsequent request
        .cookie('auth', refreshToken, {
          secure: true,
          httpOnly: true,
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({
          status: 200,
          error: false,
          accessToken,
          message: 'Logged in successfully',
          userData,
        });
    } else {
      return res.status(401).json({
        error: true,
        message:
          'Invalid email or password. Please try again with the correct credentials.',
      });
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      error: true,
      code: 500,
      message: 'Internal Server Error',
    });
  }
};
