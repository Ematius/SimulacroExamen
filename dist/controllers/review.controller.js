import createDebug from 'debug';
import { ReviewCreateDTO, ReviewUpdateDTO } from '../dto/review.dto.js';
const debug = createDebug('movies:controller:reviews');
export class ReviewsController {
    repoReviews;
    constructor(repoReviews) {
        this.repoReviews = repoReviews;
        debug('Instanciando');
    }
    makeResponse(results) {
        const data = {
            results,
            error: '',
        };
        return data;
    }
    getAll = async (req, res, next) => {
        debug('getAll');
        try {
            const reviews = await this.repoReviews.read();
            res.json(this.makeResponse(reviews));
        }
        catch (error) {
            next(error);
        }
    };
    getById = async (req, res, next) => {
        debug('getById');
        try {
            const { id } = req.params;
            const review = await this.repoReviews.readById(id);
            res.json(this.makeResponse([review]));
        }
        catch (error) {
            next(error);
        }
    };
    create = async (req, res, next) => {
        debug('create');
        try {
            if (!req.user) {
                throw new Error('Usuario no autenticado'); // 🔹 Verificamos que el usuario esté autenticado
            }
            const bookId = req.params.id; // 🔹 Obtenemos `bookId` de la URL
            const userId = req.user.id; // 🔹 Obtenemos `userId` del token
            // 🔹 Creamos un objeto con los datos correctos
            const newData = ReviewCreateDTO.parse({
                ...req.body,
                bookId,
                userId,
            });
            const review = await this.repoReviews.create(newData);
            res.json(this.makeResponse([review]));
        }
        catch (error) {
            next(error);
        }
    };
    update = async (req, res, next) => {
        debug('update');
        try {
            if (!req.user) {
                throw new Error('Usuario no autenticado');
            }
            const { id } = req.params;
            const userId = req.user.id;
            // 🔹 Verificar si la review existe
            const existingReview = await this.repoReviews.readById(id);
            if (!existingReview) {
                throw new Error('La review no existe.');
            }
            // 🔹 Verificar si la review pertenece al usuario autenticado
            if (existingReview.userId !== userId) {
                throw new Error('No tienes permiso para actualizar esta review.');
            }
            // 🔹 Verificar qué datos está recibiendo realmente
            console.log('📌 req.body:', req.body);
            // 🔹 Validar datos con Zod después de confirmar que la review existe
            const newData = ReviewUpdateDTO.parse(req.body);
            const updatedReview = await this.repoReviews.update(id, newData);
            res.json(this.makeResponse([updatedReview]));
        }
        catch (error) {
            console.log('❌ Error en update review:', error);
            next(error);
        }
    };
    delete = async (req, res, next) => {
        debug('delete');
        try {
            if (!req.user) {
                throw new Error('Usuario no autenticado');
            }
            const { id } = req.params;
            const userId = req.user.id; // 🔹 ID del usuario autenticado
            // 🔹 Verificar si la review existe
            const existingReview = await this.repoReviews.readById(id);
            if (!existingReview) {
                throw new Error('No se encontró la review con el ID proporcionado.');
            }
            // 🔹 Verificar si la review pertenece al usuario autenticado
            if (existingReview.userId !== userId) {
                throw new Error('No tienes permiso para eliminar esta review.');
            }
            // 🔹 Si todo está bien, eliminar la review
            await this.repoReviews.delete(id);
            res.json({ message: 'Review eliminada correctamente' });
        }
        catch (error) {
            next(error);
        }
    };
}
