import { PrismaClient } from '@prisma/client';
import createDebug from 'debug';
const debug = createDebug('library:repository:users');
export class UserRepo {
    prisma;
    constructor() {
        debug('Instanciando UserRepo');
        this.prisma = new PrismaClient();
    }
    createRegister = async (data) => {
        debug('Creating new user');
        const user = await this.prisma.user.create({
            data,
            omit: {
                password: true,
            }
        });
        return user;
    };
    // 🔹 Buscar usuario por email
    findByEmail = async (email) => {
        debug('Getting user by email:', email);
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    };
}
