import createDebug from 'debug';
import { PrismaClient } from '@prisma/client';
const debug = createDebug('movies:repository:reviews');
export class ReviewRepo {
    prisma;
    constructor() {
        debug('Instanciando');
        this.prisma = new PrismaClient();
    }
    async read() {
        debug('Reading reviews');
        const reviews = await this.prisma.review.findMany({
            include: {
                user: true,
                book: true,
            },
        });
        return reviews;
        // return await this.prisma.review.findMany();
    }
    async readById(id) {
        debug('Reading review with id');
        const review = await this.prisma.review.findUniqueOrThrow({
            where: { id },
            include: {
                user: true,
                book: true,
            },
        });
        return review;
    }
    async create(data) {
        debug('Creating new review');
        debug('User:', data.userId);
        debug('Film:', data.bookId);
        const review = await this.prisma.review.create({
            data: {
                content: data.content,
                userRating: data.userRating,
                user: {
                    connect: { id: data.userId },
                },
                book: {
                    connect: { id: data.bookId },
                },
            },
        });
        return review;
    }
    async update(id, data) {
        debug('Updating review with id:', id);
        const review = await this.prisma.review.update({
            where: { id },
            data,
        });
        return review;
    }
    async delete(id) {
        debug('Deleting review with id:', id);
        const review = await this.prisma.review.delete({
            where: {
                id,
            },
        });
        return review;
    }
}
