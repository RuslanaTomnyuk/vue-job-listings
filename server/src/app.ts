import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import jobsRouter from './routes/jobsRouter';
import authRouter from './routes/auth';
import usersRouter from './routes/users';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middlewares/authMiddleware';
import { errorsHandler } from './middlewares/errorsHandler';

const app = express();
const apiRouter = express.Router();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.contentType('application/json; charset=utf-8');
  next();
});

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
    allowedHeaders: [ 'Authorization', 'Content-Type' ],
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', apiRouter);

apiRouter.use('/auth', authRouter);
apiRouter.use('', authMiddleware, usersRouter);

apiRouter.use('/job-list', authMiddleware, jobsRouter);

app.use(errorsHandler);

export default app;
