import express from 'express';
import * as createUserController from '../controllers/user/createUser';
import * as registerUserController from '../controllers/auth/registerUser';
import * as loginUserController from '../controllers/auth/loginUser';
import * as usersController from '../controllers/user/getUsers';
import * as getUserController from '../controllers/user/getUser';
import * as updateUserController from '../controllers/user/updateUser';
import * as deleteUserController from '../controllers/user/deleteUser';

export const authRouter = express.Router();

authRouter.get('/user', usersController.getUsers);
authRouter.get('/user/:id', getUserController.getUser);
authRouter.patch('/user/:id', updateUserController.updateUser);
authRouter.delete('/user/:id', deleteUserController.deleteUser);
authRouter.post('/user', createUserController.createUser);
authRouter.post('/register', registerUserController.registerUser);
authRouter.post('/login', loginUserController.loginUser);
authRouter.post('/reset-password');
authRouter.get('/logout');

export default authRouter;
