// controllers/editRoleMobile.controller.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../auth';
import { updateProfileService } from '@/services/updateProfile.service';

export async function editRoleMobileController(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    const result = await updateProfileService(session.user.id, body);

    if (!result.success) {
      return NextResponse.json({ message: result.message }, { status: 400 });
    }

    return NextResponse.json(
      {
        message: 'User updated successfully',
        user: result.user,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Edit role/mobile controller error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
