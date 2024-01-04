import jwt from 'jsonwebtoken';
// import UserToken from '../models/UserToken.js';
import { AppDataSource } from '../data-source';
import { UserToken } from '../entity/UserToken';

const generateTokens = async (user) => {
  try {
    const payload = { _id: user._id, roles: user.roles };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: '5m' }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      { expiresIn: '30h' }
    );

    const userToken = await AppDataSource.getRepository(UserToken).findOneBy({
      userId: user._id,
    });
    if (userToken)
      await await AppDataSource.getRepository(UserToken).delete(userToken);

    await await AppDataSource.getRepository(UserToken).save({
      id: user._id,
      token: refreshToken,
    });
    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
};

export default generateTokens;
