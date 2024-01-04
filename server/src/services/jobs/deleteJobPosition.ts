import { AppDataSource } from '../../data-source';
import { JobPosition } from '../../entity/JobPosition';

export const deleteJobPosition = async (id) => await AppDataSource.getRepository(JobPosition).delete(id);
