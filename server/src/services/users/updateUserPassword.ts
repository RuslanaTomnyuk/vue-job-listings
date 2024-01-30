import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';
import { getUserById } from '../../helpers/getUserById';

export const updateUserPassword = async (id, password, confirmPassword) => {
  const existingUser = await getUserById({ id: +id });

  if (id) existingUser.id = id;

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
