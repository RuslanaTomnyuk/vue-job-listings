import { AppDataSource } from '../../data-source';
import { JobPosition } from '../../entity/JobPosition';

export const createJobPosition = async (payload) => {
  const jobPosition = AppDataSource.getRepository(JobPosition).create(payload);

  return await AppDataSource.getRepository(JobPosition).save(jobPosition);
};
