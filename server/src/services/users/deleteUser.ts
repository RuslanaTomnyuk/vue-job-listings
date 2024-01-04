import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';

export const deleteUser = async (id) =>
  await AppDataSource.getRepository(User).delete(id);
