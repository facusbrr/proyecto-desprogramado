import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    nombre: z.string().min(1, 'El nombre es requerido'),
    apellido: z.string().min(1, 'El apellido es requerido'),
    email: z.string().email('El correo electrónico es inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 carácteres'),
  }),
});