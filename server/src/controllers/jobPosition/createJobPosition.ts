import { NextFunction, Request, Response } from 'express';
import * as createJobPositionService from '../../services/jobs/createJobPosition';

export const createJobPosition = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newJobPosition = await createJobPositionService.createJobPosition({
      ...req.body,
    });

    res.status(200).json({
      message: 'New Job Position created Successfully',
      jobPosition: newJobPosition,
    });
  } catch (error) {
    next(error);
  }
};
