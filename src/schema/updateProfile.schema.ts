import { z } from 'zod';

export const updateProfileSchema = z
  .object({
    name: z.string().min(2).optional(),
    email: z
      .email('Please enter a valid email address')
      .trim()
      .max(255, 'Emai must be less than characters')
      .toLowerCase()
      .optional(),
    mobile: z
      .string()
      .regex(/^[6-9]\d{9}$/, 'Invalid mobile number')
      .optional(),

    role: z.enum(['user', 'deliveryBoy']).optional(),
  })
  .refine((data) => Object.values(data).some(Boolean), {
    message: 'At least one field is required',
  });

export type updateProfileSchemaType = z.infer<typeof updateProfileSchema>;
