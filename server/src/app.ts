import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import jobsRouter from './routes/jobsRouter';
import authRouter from './routes/auth';
import bodyParser from 'body-parser';
import userRouter from './routes/user';

const app = express();
const apiRouter = express.Router();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.contentType('application/json; charset=utf-8');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', apiRouter);
apiRouter.use('/job-list', jobsRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/user', userRouter);

export default app;
