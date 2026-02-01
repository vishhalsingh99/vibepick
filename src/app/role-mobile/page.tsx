export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { connectDb } from '@/lib/db';
import User from '@/models/user.model';
import EditProfile from '@/components/EditProfile';

export default async function EditProfilePage() {
  await connectDb();

  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const user = await User.findById(session.user.id).lean();
  if (!user) redirect('/login');

  return (
    <div className="min-h-[calc(100vh-5rem)] px-4 pt-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold text-white">
          Update <span className="text-vibe-orange">Details</span>
        </h1>

        {/* Client Component */}
        <EditProfile initialData={JSON.parse(JSON.stringify(user))} />
      </div>
    </div>
  );
}
