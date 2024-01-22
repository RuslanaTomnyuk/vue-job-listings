import express from 'express';
import * as createUserController from '../controllers/users/createUser';
import * as usersController from '../controllers/users/getUsers';
import * as getUserController from '../controllers/users/getUser';
import * as updateUserController from '../controllers/users/updateUser';
import * as deleteUserController from '../controllers/users/deleteUser';
import { authMiddleware } from '../middlewares/authMiddleware';

export const usersRouter = express.Router();

usersRouter.use('/user', getUserController.getUser);
usersRouter.get('/users', authMiddleware, usersController.getUsers);
usersRouter.patch('/users/:id', authMiddleware, updateUserController.updateUser);
usersRouter.delete('/users/:id', authMiddleware, deleteUserController.deleteUser);
usersRouter.post('/users', authMiddleware, createUserController.createUser);

export default usersRouter;
