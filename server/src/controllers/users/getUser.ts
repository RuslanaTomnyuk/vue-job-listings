import { Response } from 'express';
import { getUserByEmail } from '../../helpers/getUserByEmail';

export const getUser = async (req, res: Response) => {
  try {
    const { email } = req.user;
    const user = await getUserByEmail({ email: email });

    if (!user) {
      return res.status(404).json({
        message: 'User not found!',
      });
    }

    return res.status(201).json(req.user);
  } catch (error) {
    res.status(404).json({ error: 'Cannot Find User Data' });
  }
};
