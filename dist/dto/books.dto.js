import { z } from 'zod';
import createDebug from 'debug';
const debug = createDebug('books:DTO:book');
debug('Instanciando module');
export const BookCreateDTO = z.object({
    title: z.string().nonempty(),
    author: z.string().nonempty(),
    year: z.number().int().positive(),
    genre: z.string().nonempty(),
    available: z.boolean(),
});
export const BookIdDTO = z.object({
    id: z.string().uuid(),
});
export const BookUpdateDTO = BookCreateDTO.partial();
