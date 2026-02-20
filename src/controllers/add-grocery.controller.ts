import { addGroceryService } from '@/services/add-grocery.service';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { NextRequest, NextResponse } from 'next/server';

export async function addGroceryController(req: NextRequest) {
  try {
    const formData = await req.formData;
    const grocery = addGroceryService(formData);

    return NextResponse.json(
      { message: 'grocery created successfully', grocery },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error('Grocery Controller Error', error);
    const message = getErrorMessage(error);
    return NextResponse.json({ message }, { status: 500 });
  }
}
