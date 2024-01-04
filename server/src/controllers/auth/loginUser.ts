import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';
import bcrypt from 'bcrypt';
import generateTokens from '../../utils/generateTokens';

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await AppDataSource.getRepository(User).findOneBy({
      email,
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: true, message: 'Invalid email or password' });
    }

    // Verify password
    const verifiedPassword = await bcrypt.compare(password, user.password);

    if (!verifiedPassword) {
      return res.status(401).json({
        error: true,
        message: 'Incorrect email and password combination',
      });
    }

    const { accessToken, refreshToken } = await generateTokens(user);
    // console.log('tokens', accessToken, refreshToken);


    res.status(200).json({
      error: false,
      accessToken,
      refreshToken,
      message: 'Logged in successfully',
    });
  } catch (error) {
    console.error('Error creating user:', error);
    next(error);
  }
};
