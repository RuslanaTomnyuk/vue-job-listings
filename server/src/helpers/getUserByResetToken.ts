import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export const getUserByResetToken = async (token: string) =>
  await AppDataSource.getRepository(User).findOneBy({
    passwordResetToken: token,
  });
