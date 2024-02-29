import { NextFunction, Request, Response } from 'express';

export const errorsHandler = (err: any, _request: Request, response: Response, _next: NextFunction) => {
  console.error(err.stack);
  response.status(500).json({
    error: true,
    code: 500,
    message: err.message,
  });
};
