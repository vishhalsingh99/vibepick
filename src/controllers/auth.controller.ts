import { registerService } from '@/services/auth.service';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { NextRequest, NextResponse } from 'next/server';

export async function registerController(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await registerService(body);

    return NextResponse.json(
      { message: 'User created successfully', user },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error('Register Controller Error:', error);
    const message = getErrorMessage(error);
    return NextResponse.json({ message }, { status: 500 });
  }
}
