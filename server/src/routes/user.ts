import express from 'express';
import * as createUserController from '../controllers/user/createUser';
import * as usersController from '../controllers/user/getUsers';
import * as getUserController from '../controllers/user/getUser';
import * as updateUserController from '../controllers/user/updateUser';
import * as deleteUserController from '../controllers/user/deleteUser';

export const userRouter = express.Router();

userRouter.get('', usersController.getUsers);
userRouter.get('/:id', getUserController.getUser);
userRouter.patch('/:id', updateUserController.updateUser);
userRouter.delete('/:id', deleteUserController.deleteUser);
userRouter.post('', createUserController.createUser);

export default userRouter;
