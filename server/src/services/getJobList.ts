import { AppDataSource } from '../data-source';
import { JobPosition } from '../entity/JobPosition';

export const getJobList = async () => {
  return await AppDataSource.getRepository(JobPosition).find();
}
