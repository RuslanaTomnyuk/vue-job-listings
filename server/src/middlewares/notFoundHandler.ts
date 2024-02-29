import { Request, Response } from 'express';

const notFoundHandler = (request: Request, response: Response) => {
  const message = 'Route not found';
  response.status(404).json({ message });
};

export default notFoundHandler;
