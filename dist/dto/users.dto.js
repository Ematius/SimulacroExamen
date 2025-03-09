import { z } from 'zod';
export const UserRegisterDTO = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});
export const UserLoginDTO = z.object({
    email: z.string().email('El email no es válido'),
    password: z
        .string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});
