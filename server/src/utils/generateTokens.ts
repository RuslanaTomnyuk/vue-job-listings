import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { UserToken } from '../entity/UserToken';

export const generateAccessToken = (user) => {
  const payload = { id: user.id, email: user.email };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15s',
  });
};

const generateTokens = async (id, email) => {
  try {
    const payload = { id: id, email: email };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '20m',
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '5d',
    });
    const userToken = await AppDataSource.getRepository(UserToken).findOneBy({
      userId: id,
    });

    if (userToken) {
      await AppDataSource.getRepository(UserToken).delete(userToken);
    }

    // Save the new refresh token to the database
    await AppDataSource.getRepository(UserToken).save({
      userId: id,
      token: refreshToken,
    });

    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
};

export default generateTokens;
