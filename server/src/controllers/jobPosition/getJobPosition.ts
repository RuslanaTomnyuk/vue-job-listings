import { NextFunction, Request, Response } from 'express';
import * as jobPositionService from '../../services/jobs/getJobPosition';

export const getJobPosition = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobPositionId = +req.params.id;
    const jobPosition = await jobPositionService.getJobPosition({ id: jobPositionId });

    res.status(200).send(jobPosition);
  } catch (error) {
    next(error);
  }
}
