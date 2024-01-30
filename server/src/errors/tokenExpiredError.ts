import jwt from 'jsonwebtoken';

const { TokenExpiredError } = jwt;

export const tokenExpiredError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .json({ message: 'Unauthorized! Access Token expired!' });
  }
  return res.sendStatus(401).json({ message: 'Unauthorized!' });
};
