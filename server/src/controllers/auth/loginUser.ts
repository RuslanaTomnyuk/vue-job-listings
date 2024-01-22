import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUserByEmail } from '../../helpers/getUserByEmail';
import { AppDataSource } from '../../data-source';
import { UserToken } from '../../entity/UserToken';

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // do validation for login
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Username and password are required.',
      });
    }

    const user = await getUserByEmail({
      email,
    });

    if (!user) {
      // Unauthorized access
      res.status(401).json({
        error: 'User not found',
        message: 'Account does not exist',
      });
    }

    const { password: userPassword, confirmPassword, ...userData } = user;

    // if user exists - validate password
    const isPasswordValid = await bcrypt.compare(password, userPassword);

    const payload = { id: userData.id, email: userData.email };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '20s',
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d',
    });

    isPasswordValid
      ? (await AppDataSource.getRepository(UserToken).save({
        userId: user.id,
        token: refreshToken,
      })) &&
        res
          .status(200)
          .cookie('auth', refreshToken, {
            secure: true,
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 50 * 60 * 1000,
          }) // set the token to response header, so that the client sends it back on each subsequent request
          .json({
            error: false,
            accessToken,
            refreshToken,
            message: 'Logged in successfully',
            userData,
          })
      : res.status(401).json({
        error: true,
        message:
            'Invalid email or password. Please try again with the correct credentials.',
      });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      error: true,
      code: 500,
      message: 'Internal Server Error',
    });
    next(error);
  }
};
