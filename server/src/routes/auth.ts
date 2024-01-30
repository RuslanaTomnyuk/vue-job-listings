import express from 'express';
import * as registerUserController from '../controllers/auth/registerUser';
import * as loginUserController from '../controllers/auth/loginUser';
import * as logoutUserController from '../controllers/auth/logoutUser';
import * as refreshTokenController from '../controllers/auth/refreshToken';
import * as deleteRefreshTokenController from '../controllers/auth/deleteRefreshToken';
import * as resetPasswordController from '../controllers/auth/resetPassword';
import * as resetPasswordIdTokenController from '../controllers/auth/resetPasswordIdToken';
import * as forgotPasswordController from '../controllers/auth/forgotPassword';
import { authMiddleware } from '../middlewares/authMiddleware';

export const authRouter = express.Router();

authRouter.post('/register', registerUserController.registerUser);
authRouter.post('/login', loginUserController.loginUser);
authRouter.post('/refresh-token', refreshTokenController.refreshToken);
authRouter.delete('/refresh-token', deleteRefreshTokenController.deleteRefreshToken);

authRouter.post('/reset-password', authMiddleware, resetPasswordController.resetPassword);
authRouter.post('/reset-password/:id/:token', resetPasswordIdTokenController.resetPasswordIdToken);
authRouter.post('/forgot-password', forgotPasswordController.forgotPassword);
authRouter.get('/logout', logoutUserController.logoutUser);

export default authRouter;
