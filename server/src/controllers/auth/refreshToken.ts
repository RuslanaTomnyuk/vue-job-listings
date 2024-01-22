import { UserToken } from '../../entity/UserToken';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../../data-source';

export const refreshToken = async (req, res) => {
  const authHeader = req.headers['cookie'];

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Invalid Authorization header. Please, log in again.',
    });
  }

  const token = authHeader.split('=')[1];

  const refreshTokenFromDB = await AppDataSource.getRepository(
    UserToken
  ).findOneBy({ token: token });

  try {
    if (refreshTokenFromDB) {
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        const payload = {
          id: user.id,
          email: user.email,
        };

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '20m',
        });

        res.status(200).json({
          error: false,
          accessToken,
          message: 'Access token created successfully',
        });
      });
    } else {
      res.status(400).json({
        message:
          'There is no such refresh token in the database! Please, log in again!',
      });
    }
  } catch (err) {
    console.log('Refresh token error', err);
    res.status(400).send(err);
  }
};
