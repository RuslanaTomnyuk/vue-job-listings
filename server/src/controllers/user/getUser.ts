import { NextFunction, Request, Response } from 'express';
import * as getUserService from '../../services/users/getUser';

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = +req.params.id;
    const user = await getUserService.getUser({ id: userId });
    // res.json(jobPosition)
    // res.status(StatusCode.OK).json(product)

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
}
