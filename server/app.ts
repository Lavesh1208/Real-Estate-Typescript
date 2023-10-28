import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { dbConnection } from './dbConfig/dbConnection';
import router from './routes';
import ErrorHandler from './utils/ErrorHandler';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(helmet());
app.use(
   cors({
      origin: ['*', process.env.CLIENT_URL as string],
      credentials: true,
      optionsSuccessStatus: 200,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
   }),
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(router);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.all('*', (req, res, next) => {
   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

const errorHandler = (
   err: ErrorHandler,
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
   });
};

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

dbConnection();

app.listen(PORT, () => {
   console.log(`Server started on port ${PORT}`);
});
