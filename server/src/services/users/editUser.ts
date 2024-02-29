import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';

export const editUser = async (
  id,
  username,
  email,
  existingUser
) => {
  if (id) existingUser.id = id;

  if (username) {
    existingUser.username = username;
  }

  if (email) {
    existingUser.email = email;
  }

  await AppDataSource.getRepository(User).update(existingUser.id, {
    ...existingUser,
  });
};
