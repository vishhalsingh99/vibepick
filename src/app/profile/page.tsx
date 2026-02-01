export const revalidate = 0;

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { connectDb } from "@/lib/db";
import User from "@/models/user.model";
import ProfileClient from "@/components/ProfileClient";

export default async function ProfilePage() {
  await connectDb();

  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await User.findById(session.user.id).lean();
  if (!user) redirect("/login");

  return <ProfileClient user={JSON.parse(JSON.stringify(user))} />;
}
