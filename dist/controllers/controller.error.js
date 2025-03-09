import createDebug from 'debug';
import { PrismaClientKnownRequestError, PrismaClientValidationError, } from '@prisma/client/runtime/library.js';
// import { ErrorPage } from '../views/pages/error-page.js';
const debug = createDebug('library:errorManager');
export const errorManager = (err, _req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_next) => {
    if (err instanceof PrismaClientKnownRequestError) {
        err = {
            ...err,
            cause: `Prisma Code ${err.code} in ${err.meta?.modelName} model`,
            message: err.meta?.cause || '',
            statusCode: 400,
            status: 'Bad Request',
        };
    }
    else if (err instanceof PrismaClientValidationError) {
        err = {
            ...err,
            cause: 'Prisma validation error',
            message: err.message || '',
            statusCode: 400,
            status: 'Bad Request',
        };
    }
    else if (!('status' in err)) {
        console.error(err);
        err = {
            ...err,
            statusCode: 400,
            status: 'Bad Request',
        };
    }
    const publicMessage = `Error: ${err.statusCode} ${err.status}`;
    debug(publicMessage, err.message, err.cause);
    res.status(err.statusCode);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    const response = {
        results: null,
        error: publicMessage,
    };
    res.json(response);
};
