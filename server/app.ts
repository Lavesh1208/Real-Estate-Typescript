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

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, 'views/build')));

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(router);

app.all('*', (req, res, next) => {
   next(new ErrorHandler('Page Not Found', 404));
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

   console.log({ stack: err.stack || 'NO STACK' });
};

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

dbConnection();

app.listen(PORT, () => {
   console.log(`Server started on port ${PORT}`);
});
