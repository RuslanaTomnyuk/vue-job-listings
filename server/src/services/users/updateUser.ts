import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';

export const updateUser = async (
  id,
  username,
  password,
  confirmPassword,
  existingUser
) => {
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

  await AppDataSource.getRepository(User).update(existingUser.id, {
    ...existingUser,
  });
};
