import 'reflect-metadata';
import 'dotenv/config'

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes/index';
import { errors } from 'celebrate'

import '@shared/infra/typeorm';
import '@shared/container'

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFonder));
app.use(routes);

app.use(errors())

// Middleware para tratamento de erros globais
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.log(err);
    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server Error' });
  }
);

app.listen(3333, () => {
  console.log('🚀 Server started');
});
