import { Router } from 'express';
import createDebug from 'debug';
const debug = createDebug('movies:router:reviews');
export const createReviewsRouter = (authInterceptor, reviewsController) => {
    debug('Ejecutando createReviewsRouter');
    const reviewsRouter = Router();
    reviewsRouter.get('/', authInterceptor.authenticate, reviewsController.getAll);
    reviewsRouter.get('/:id', authInterceptor.authenticate, reviewsController.getById);
    reviewsRouter.post('/create/:id', authInterceptor.authenticate, reviewsController.create);
    reviewsRouter.patch('/:id', authInterceptor.authenticate, reviewsController.update);
    reviewsRouter.delete('/:id', authInterceptor.authenticate, reviewsController.delete);
    return reviewsRouter;
};
