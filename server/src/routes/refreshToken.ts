import express from 'express';
import * as refreshTokenController from '../controllers/auth/refreshToken';

export const refreshTokenRouter = express.Router();

refreshTokenRouter.post('/', refreshTokenController.refreshToken);

export default refreshTokenRouter;
