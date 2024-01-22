import { Router } from 'express';
import * as jobListController from '../controllers/jobList/getJobList';
import * as jobPositionController from '../controllers/jobPosition/getJobPosition';
import * as deleteJobPositionController from '../controllers/jobPosition/deleteJobPosition';
import * as createJobPositionController from '../controllers/jobPosition/createJobPosition';

export const jobsRouter = Router({ mergeParams: true });

jobsRouter.get('', jobListController.getJobList);
jobsRouter.post(
  '',
  createJobPositionController.createJobPosition
);

jobsRouter.get('/:id', jobPositionController.getJobPosition);
jobsRouter.delete('/:id', deleteJobPositionController.deleteJobPosition);

export default jobsRouter;
