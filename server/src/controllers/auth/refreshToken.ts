import jwt from 'jsonwebtoken';
import { getUserById } from '../../helpers/getUserById';
import { getUserToken } from '../../helpers/getUserToken';

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies['auth'] || req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: 'Invalid refresh token. Please, log in again.',
    });
  }

  try {
    const decodedToken: any = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const userToken = await getUserToken({ userId: decodedToken.id });

    if (!userToken) {
      return res.status(401).json({
        error: 'User not found',
        message: 'Account does not exist',
      });
    }

    if (refreshToken !== userToken.token) {
      return res.status(401).json({
        message: 'Refresh token is expired or used!',
      });
    }
    const user = await getUserById({ id: userToken.userId });

    if (!user) {
      // Unauthorized access
      return res.status(401).json({
        error: 'User not found',
        message: 'Account does not exist',
      });
    }

    const payload = { id: user.id, email: user.email };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '20m',
    });

    res
      .status(200)
      .json({
        status: 200,
        error: false,
        accessToken,
        message: 'Access token created successfully',
      });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized. Please, log in again.',
    });
  }
};
