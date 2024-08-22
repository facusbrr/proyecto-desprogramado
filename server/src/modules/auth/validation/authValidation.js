import { z } from 'zod'

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    last_name: z.string().min(1, 'El apellido es requerido'),
    username: z.string().min(1, 'El nombre de usuario es requerido'),
    email: z.string().email('El correo electrónico es inválido'),
    password: z
      .string()
      .min(6, 'La contraseña debe tener al menos 6 carácteres'),
  }),
})

export const loginSchema = z.object({
  body: z.object({
    username: z.string().min(1, 'El nombre de usuario es requerido'),
    password: z
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  }),
})
