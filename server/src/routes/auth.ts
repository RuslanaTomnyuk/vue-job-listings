import express from 'express';
import * as registerUserController from '../controllers/auth/registerUser';
import * as loginUserController from '../controllers/auth/loginUser';
import * as logoutUserController from '../controllers/auth/logoutUser';
import * as refreshTokenController from '../controllers/auth/refreshToken';
import * as resetPasswordController from '../controllers/auth/resetPassword';
import * as forgotPasswordController from '../controllers/auth/forgotPassword';

export const authRouter = express.Router();

authRouter.post('/register', registerUserController.registerUser);
authRouter.post('/login', loginUserController.loginUser);
authRouter.post('/refresh-token', refreshTokenController.refreshToken);

authRouter.patch('/reset-password', resetPasswordController.resetPassword);
authRouter.post('/forgot-password', forgotPasswordController.forgotPassword);
authRouter.get('/logout', logoutUserController.logoutUser);

export default authRouter;
