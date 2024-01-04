import { NextFunction, Request, Response } from 'express';
import * as createJobPositionService from '../../services/jobs/createJobPosition';

export const createJobPosition = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobPosition = await createJobPositionService.createJobPosition({ ...req.body });

    res.status(200).send(jobPosition);
  } catch (error) {
    next(error);
  }
}
