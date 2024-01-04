import { AppDataSource } from '../../data-source';
import { JobPosition } from '../../entity/JobPosition';

export const getJobPosition = async (id): Promise<JobPosition> => await AppDataSource.getRepository(JobPosition).findOneBy(id);
