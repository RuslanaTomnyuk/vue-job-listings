import { AppDataSource } from '../data-source';
import { UserToken } from '../entity/UserToken';

export const updateUserToken = async (
  userId: number,
  token: string,
  existingToken
) => {
  existingToken.userId = userId;
  if (token) existingToken.token = token

  await AppDataSource.getRepository(UserToken).update(existingToken.userId, {
    ...existingToken,
  });
};
