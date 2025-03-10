import { Router } from "express";
import createDebug from 'debug';
import { Role } from '@prisma/client';
const debug = createDebug('books:router:books');
export const createBooksRouter = (authInterceptor, booksController) => {
    debug('Configurando router de books');
    const booksRouter = Router();
    booksRouter.get('/', booksController.getAll);
    booksRouter.get('/:id', booksController.getById);
    booksRouter.post('/create', authInterceptor.authenticate, authInterceptor.hasRole(Role.admin), booksController.create);
    booksRouter.patch('/:id', authInterceptor.authenticate, booksController.update);
    booksRouter.delete('/:id', authInterceptor.authenticate, authInterceptor.hasRole(Role.admin), booksController.delete);
    return booksRouter;
};
