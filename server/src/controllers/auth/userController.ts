import express from 'express';
import { User } from '../../entity/User';
import { AppDataSource } from '../../data-source';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const userRepository = AppDataSource.getRepository(User)
    const { username, email, password } = req.body;
    // const newUser = new User()
    // newUser.username = username
    // newUser.email = email
    // newUser.password = password
    if (!username || !email || !password) {
      return res.sendStatus(400)
    }

    const user = userRepository.create({ username, email, password });
    await userRepository.save(user);

    return res.status(201).send(user);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { router as UserController };
