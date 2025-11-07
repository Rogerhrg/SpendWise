import { z } from 'zod'

export const RegisterSchema = z.object({
  email: z.email('El correo electrónico no es válido'),
  name: z.string().min(1).max(100),
  password: z.string().min(8).max(100)
})
