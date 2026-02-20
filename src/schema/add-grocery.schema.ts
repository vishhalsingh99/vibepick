
import { z } from 'zod';


export const categoryArray = [
    'Fruits & Vegetables',
    'Dairy & Eggs',
    'Rice, Atta & Grains',
    'Snacks & Biscuits',
    'Spices & Masalas',
    'Beverages & Drinks',
    'Personal Care',
    'Household Essentials',
    'Instant & Packaged Food',
    'Baby & Pet Care',
  ];

export const addGrocerySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(255, { message: "Name must be at most 255 characters" }),

  category: z.enum(categoryArray, { error: "Please select a category" }),

  unit: z
    .string()
    .trim()
    .min(1, { message: "Unit is required" })
    .max(50, { message: "Unit must be at most 50 characters" }),

  price: z
    .string()
    .trim()
    .min(1)
    .transform((val) => val.replace(/[^0-9.]/g, '')),

  // For Next.js Server Actions / API routes (File from FormData)
  file: z
    .instanceof(File)
    .nullable()
    .optional()
    .refine(
      (file) => file == null || file.size <= 5 * 1024 * 1024, // 5 MB max
      { message: "Image must be less than 5MB" }
    )
    .refine(
      (file) => file == null || ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      { message: "Only JPG, PNG, or WebP images allowed" }
    ),
});

export type AddGrocerySchemaType = z.infer<typeof addGrocerySchema>;