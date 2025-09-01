import { StatusCodes } from 'http-status-codes';
import config from '../utils/config.js';

export const notFoundHandler = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).render('errors/404');
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.customStatusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).render('errors/500', {
    error: err,
  });
};
