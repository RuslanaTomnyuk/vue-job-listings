import { UserToken } from '../../entity/UserToken';
import { AppDataSource } from '../../data-source';

export const logoutUser = async (req, res) => {
  try {
    const authHeader = req.headers['cookie'];
    if (!authHeader) return res.sendStatus(204);

    const splittedToken = authHeader.split(';')[0];
    const refreshToken = splittedToken.split('auth=')[1];

    const userToken = await AppDataSource.getRepository(UserToken).findOneBy({
      token: refreshToken,
    });

    if (!userToken) {
      return res
        .status(200)
        .json({ error: false, message: 'There is no such token' });
    }

    await AppDataSource.getRepository(UserToken).delete(userToken);

    res
      .status(200)
      .clearCookie('auth')
      .json({ error: false, message: 'Logged Out Successfully' });
  } catch (err) {
    console.log('Log Out User Error!', err);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
};
