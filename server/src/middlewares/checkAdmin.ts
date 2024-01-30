// not implemented yet
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';

export const checkAdmin = async (req, res, next) => {
  const loggedUsername = req.user.username;
  const loggedUser = await AppDataSource.getRepository(User).findOneBy({
    username: loggedUsername,
  });

  if (loggedUser?.role === 'Admin') {
    return next();
  }
  //if the user isn't an admin return a 403
  return res.status(403).send('You are not an admin');
};
