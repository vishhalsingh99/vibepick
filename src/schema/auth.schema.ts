import { z } from 'zod';

export const registerUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 character long')
    .max(255, 'Name must be less than 255'),
  email: z
    .email('Please enter a valid email address')
    .trim()
    .max(255, 'Emai must be less than characters')
    .toLowerCase(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(128, 'Password must be less than 128 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one number',
    )
});


export const loginUserSchema = z.object({
  email: z
  .email('Please enter a valid email address')
  .trim()
  .max(255, "Email must be less than 250 characters")
  .toLowerCase(),
  password: z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one number',
  )
})

export type RegisterSchemaType = z.infer<typeof registerUserSchema>;
export type LoginSchemaType = z.infer<typeof loginUserSchema>;