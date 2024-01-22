import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';

export const registerUser = async (userData) => {
  const { username, email, password, confirmPassword, role } = userData;

  const payload = { username, email, password, confirmPassword, role };

  const user = AppDataSource.getRepository(User).create(payload);
  return await AppDataSource.getRepository(User).save(user);
};
