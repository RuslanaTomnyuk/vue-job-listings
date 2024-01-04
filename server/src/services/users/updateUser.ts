import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';

export const updateUser = async (
  id,
  { username, email, password }
) => {
  const existingUser = await AppDataSource.getRepository(User).findOneBy(id);

  if (!existingUser) {
    return 'User not found.';
  }

  if (id) {
    existingUser.id = id;
  }

  if (username) {
    existingUser.username = username;
  }

  if (password) {
    existingUser.password = password;
  }

  if (email) {
    existingUser.email = email;
  }

  return await AppDataSource.getRepository(User).update(existingUser.id, existingUser);
};
