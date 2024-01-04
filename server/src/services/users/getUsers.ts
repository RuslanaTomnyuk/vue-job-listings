import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';

export const getUsers = async () => {
  return await AppDataSource.getRepository(User).find();
};
