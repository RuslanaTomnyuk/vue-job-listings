import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';
import { getUserById } from '../../helpers/getUserById';

export const updateUser = async (
  id,
  { username, password, confirmPassword, role }
) => {
  const existingUser = await getUserById(id);

  if (id) existingUser.id = id;

  if (username) {
    existingUser.username = username;
  }

  if (password) {
    existingUser.password = password;
  }

  if (confirmPassword) {
    existingUser.confirmPassword = confirmPassword;
  }

  await AppDataSource.getRepository(User).update(existingUser.id, existingUser);
};
