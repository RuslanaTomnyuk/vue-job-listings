import { AppDataSource } from '../../data-source';
import { UserToken } from '../../entity/UserToken';

export const deleteUserToken = async (id) =>
  await AppDataSource.getRepository(UserToken).delete(id);
