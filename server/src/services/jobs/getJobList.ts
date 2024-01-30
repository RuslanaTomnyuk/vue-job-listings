import { AppDataSource } from '../../data-source';
import { JobPosition } from '../../entity/JobPosition';

export const getJobList = async () => await AppDataSource.getRepository(JobPosition).find();

