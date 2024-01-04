import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';

export const createUser = async (userData) => {
  const { username, email, password, role } = userData;
  
  const payload = { username, email, password, role };

  const user = AppDataSource.getRepository(User).create(payload);
  return await AppDataSource.getRepository(User).save(user);
};
