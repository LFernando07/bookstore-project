import z from 'zod'

const userSchema = z.object({
  username: z.string({
    invalid_type_error: 'Username must be a string',
    required_error: 'Username is required'
  }).min(5, 'Username must be at least 5 characters long').max(50, 'Username must be at most 50 characters long'),

  email: z.string().min(1, { message: 'This field has to be filled' }).email('This is not a valid email'),

  password: z.string()
    .min(5, { message: "Password must be at least 5 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*()_\-+={[}\]|:;"'<,>.?]/, { message: "Password must contain at least one special character" })
})


// Para el EMScript Module no se expotar las funciones como modulos sino que se exportan de manera individual

export function validateUser(object) {
  return userSchema.safeParse(object)
}

export function validatePartialUser(object) {
  // Si no esta un parametro del esquema no se valida
  // Si esta se valida a como esta en el esquema
  return userSchema.partial().safeParse(object)
}