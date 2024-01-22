import { AppDataSource } from '../../data-source';
import { UserToken } from '../../entity/UserToken';

export const getUserToken = async (id): Promise<any> =>
  await AppDataSource.getRepository(UserToken).findOneBy(id);
