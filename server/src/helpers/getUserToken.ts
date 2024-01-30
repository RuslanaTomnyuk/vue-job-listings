import { AppDataSource } from '../data-source';
import { UserToken } from '../entity/UserToken';

export const getUserToken = async (userId): Promise<any> =>
  await AppDataSource.getRepository(UserToken).findOneBy(userId);
