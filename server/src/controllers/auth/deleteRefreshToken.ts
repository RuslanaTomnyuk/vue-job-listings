import { AppDataSource } from '../../data-source';
import { UserToken } from '../../entity/UserToken';
import * as deleteRefreshTokenService from '../../services/users/deleteRefreshToken';

export const deleteRefreshToken = async (req, res) => {
  const authHeader = req.headers['cookie'];

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Invalid Authorization header. Please, log in again.',
    });
  }

  const splittedToken = authHeader.split(';')[0];
  const token = splittedToken.split('auth=')[1];

  const refreshTokenFromDB = await AppDataSource.getRepository(
    UserToken
  ).findOneBy({ token: token });

  if (refreshTokenFromDB) {
    await deleteRefreshTokenService.deleteUserToken(
      refreshTokenFromDB.userId
    );

    res.status(201).json({
      message:
         'Success',
    });
  } else {
    return res.status(400).json({
      message:
          'There is no such refresh token in the database! Please, log in again!',
    });
  }

};
