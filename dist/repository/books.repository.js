import { PrismaClient } from "@prisma/client";
import createDebug from 'debug';
const debug = createDebug('library:repository:books');
export class BookRepo {
    prisma; // Conexión a la base de datos hecha por prisma
    constructor() {
        debug('Instanciando repo for books');
        this.prisma = new PrismaClient();
    }
    async read() {
        const books = await this.prisma.books.findMany();
        return books;
    }
    async readById(id) {
        const book = await this.prisma.books.findUniqueOrThrow({
            where: { id },
        });
        return book;
    }
    async create(data) {
        const book = await this.prisma.books.create({
            data,
        });
        return book;
    }
    async update(id, data) {
        const book = await this.prisma.books.update({
            where: { id },
            data,
        });
        return book;
    }
    async delete(id) {
        const book = await this.prisma.books.delete({
            where: { id },
        });
        return book;
    }
}
