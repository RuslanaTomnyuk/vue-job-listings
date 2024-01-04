import { NextFunction, Request, Response } from 'express';
import * as jobPositionService from '../../services/jobs/deleteJobPosition';

export const deleteJobPosition = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobPositionId = +req.params.id;
    const jobPosition = await jobPositionService.deleteJobPosition({ id: jobPositionId });

    res.send(jobPosition);
  } catch (error) {
    next(error);
  }
}
