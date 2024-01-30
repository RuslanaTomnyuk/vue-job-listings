import express from 'express';
import * as createUserController from '../controllers/users/createUser';
import * as usersController from '../controllers/users/getUsers';
import * as getUserController from '../controllers/users/getUser';
import * as updateUserController from '../controllers/users/updateUser';
import * as deleteUserController from '../controllers/users/deleteUser';

export const usersRouter = express.Router();

usersRouter.use('/user', getUserController.getUser);
usersRouter.get('/users', usersController.getUsers);
usersRouter.patch(
  '/users/:id',
  updateUserController.updateUser
);
usersRouter.delete(
  '/users/:id',
  deleteUserController.deleteUser
);
usersRouter.post('/users', createUserController.createUser);

export default usersRouter;
