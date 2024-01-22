import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export const getUserById = async ({ id }: { id: number }) =>
  await AppDataSource.getRepository(User).findOneBy({
    id,
  });
