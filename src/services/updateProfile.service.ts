// services/editRoleMobile.service.ts
import { connectDb } from '@/lib/db';
import User from '@/models/user.model';
import {
  updateProfileSchema,
  updateProfileSchemaType,
} from '@/schema/updateProfile.schema';

export async function updateProfileService(
  userId: string,
  data: updateProfileSchemaType,
) {
  const parsed = updateProfileSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0].message,
    };
  }

  await connectDb();

  const updateData: any = {};

  if (parsed.data.name) updateData.name = parsed.data.name;
  if (parsed.data.mobile) updateData.mobile = parsed.data.mobile;
  if (parsed.data.role) updateData.role = parsed.data.role;

  // ⚠️ email update – only if you want
  if (parsed.data.email) {
    updateData.email = parsed.data.email;
  }

  // const user = await User.findByIdAndUpdate(
  //   userId,
  //   { mobile, role },
  //   { new: true },
  // );
  const user = await User.findByIdAndUpdate(
    userId,
    updateData,
    { new: true }
  );

  if (!user) {
    return {
      success: false,
      message: 'User not found',
    };
  }

  return {
    success: true,
    user,
  };
}
