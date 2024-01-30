import { NextFunction, Request, Response } from 'express';
import * as jobListService from '../../services/jobs/getJobList';

export const getJobList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobList = await jobListService.getJobList();
    res.status(200).json(jobList);
  } catch (error) {
    next(error);
  }
};
