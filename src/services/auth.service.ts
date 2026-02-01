import { connectDb } from '@/lib/db';
import { getUserByEmail, createUser } from '@/repositories/user.repo';
import hashPassword from '@/lib/hash';
import {RegisterSchemaType, registerUserSchema } from '@/schema/auth.schema';


export async function registerService(data: RegisterSchemaType) {

  try {
    const parsed = registerUserSchema.safeParse(data);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return {
        status: 400,
        message: firstError.message || 'Invalid input Data',
      };
    }

    const { name, email, password } = parsed.data;

    await connectDb();

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { status: 409, message: 'This email already exists' };
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await createUser({
        name,
        email,
        password: hashedPassword
    });
    return {status: 201, message: "User created successfully",
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            createdAt: newUser.createdAt
        }
    };
  } catch (err) {
    console.error("Register Service Error:", err);
    return {status: 500, message: "Internal Server Error"};
  }
}