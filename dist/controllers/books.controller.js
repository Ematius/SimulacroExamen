import { BookCreateDTO, BookIdDTO, BookUpdateDTO } from '../dto/books.dto.js';
import createDebug from 'debug';
const debug = createDebug('library:controller:books');
export class BooksController {
    repoBooks;
    constructor(repoBooks) {
        this.repoBooks = repoBooks;
        debug('Instanciando ');
    }
    //como el controller es el encargado de devolver la respuesta, le pasamos el res final
    makeResponse(results, error) {
        const data = {
            results,
            error: error || '',
        };
        return data;
    }
    getAll = async (req, res, next) => {
        try {
            const books = await this.repoBooks.read();
            res.json(this.makeResponse(books));
        }
        catch (error) {
            next(error);
        }
    };
    getById = async (req, res, next) => {
        try {
            const { id } = BookIdDTO.parse(req.params);
            const book = await this.repoBooks.readById(id);
            res.json(this.makeResponse([book]));
        }
        catch (error) {
            next(error);
        }
    };
    create = async (req, res, next) => {
        try {
            debug(req.body);
            BookCreateDTO.parse(req.body);
            const newData = req.body;
            const book = await this.repoBooks.create(newData);
            res.json(this.makeResponse([book]));
        }
        catch (error) {
            next(error);
        }
    };
    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            BookUpdateDTO.partial().parse(req.body);
            const newData = req.body;
            const book = await this.repoBooks.update(id, newData);
            res.json(this.makeResponse([book]));
        }
        catch (error) {
            next(error);
        }
    };
    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            const book = await this.repoBooks.delete(id);
            res.json(this.makeResponse([book]));
        }
        catch (error) {
            next(error);
        }
    };
}
