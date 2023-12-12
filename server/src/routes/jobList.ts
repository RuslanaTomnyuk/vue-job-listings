import { Router } from 'express';
import * as jobListController from '../controllers/jobList/getJobList';

export const jobListRouter = Router();

jobListRouter.get('', jobListController.getJobList);

export default jobListRouter;
