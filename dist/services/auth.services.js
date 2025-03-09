import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import debug from 'debug';
const SALTS = 10;
export class AuthService {
    static async hashPassword(password) {
        debug('LLego a hashPassword');
        return hash(password, SALTS);
    }
    static async generateToken(payload) {
        const secret = process.env.JWT_SECRET;
        return jwt.sign(payload, secret);
    }
    static async comparePassword(password, hash) {
        debug('LLego a comparePassword');
        return compare(password, hash);
    }
    static async verifyToken(token) {
        const secret = process.env.JWT_SECRET;
        const result = jwt.verify(token, secret);
        if (typeof result === 'string') {
            throw new Error('Token no válido');
        }
        return result;
    }
}
