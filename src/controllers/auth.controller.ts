import { registerService } from '@/services/auth.service';
import { NextRequest, NextResponse } from 'next/server';

export async function registerController(req: NextRequest) {
  try {
    const body = await req.json();

    const user = await registerService(body);

    return NextResponse.json(
      { message: 'User created successfully', user },
      { status: 201 },
    );
  } catch (error: any) {
    console.error('Register Controller Error:', error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: error.status || 500 },
    );
  }
}