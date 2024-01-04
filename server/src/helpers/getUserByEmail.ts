import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export const getUserByEmail = async ({ email }: { email: string }) => await AppDataSource.getRepository(User).findOneBy({
  email,
});

