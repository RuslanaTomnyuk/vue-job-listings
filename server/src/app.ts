import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import jobListRouter from './routes/jobList';

const app = express();
const apiRouter = express.Router();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.contentType('application/json; charset=utf-8');
  next();
});

app.use('/', apiRouter);
apiRouter.use('/job-list', jobListRouter);

export default app
