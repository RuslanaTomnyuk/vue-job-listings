import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';

export const changePassword = async (user, password, confirmPassword) => {
  user.password = password;
  user.confirmPassword = confirmPassword;

  await AppDataSource.getRepository(User).update(user.id, {
    ...user,
  });
};
