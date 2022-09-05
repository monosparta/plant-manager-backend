import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './routes/index';
import userRouter from './routes/user';
import rentRouter from './routes/rent';
import adminRouter from './routes/admin';
import { handleError } from './middlewares/errorHandler';

const app = express();

// Disable disclose technologies
app.disable('x-powered-by');

// Set Up Cors (with origin full access)
app.use(cors({ credentials: true, origin: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/rent', rentRouter);
app.use('/api/admin', adminRouter);

// error handler
app.use(handleError);

export default app;
