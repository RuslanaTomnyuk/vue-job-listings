import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';

export const getUser = async (id): Promise<any> => await AppDataSource.getRepository(User).findOneBy(id);
