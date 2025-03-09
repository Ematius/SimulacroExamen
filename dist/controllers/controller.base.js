import createDebug from 'debug';
import { HttpError } from '../types/http-error.js';
export const notFoundController = (req, _res, next) => {
    const debug = createDebug('library:notFoundController');
    debug('Petición recibida');
    const message = `Page ${req.url} not found`;
    const error = new HttpError(message, 404, 'Not Found');
    next(error); //Esto lo envía a errorManager archivo errors.controller.ts
};
export const notMethodController = (req, _res, next) => {
    const debug = createDebug('films:notMethodController');
    debug('Petición recibida');
    const message = `Method ${req.method}  not allowed`;
    const error = new HttpError(message, 405, 'Method Not Allowed');
    next(error);
};
