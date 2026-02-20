import { logger } from '@/lib/logger';
import { addGroceryService } from '@/services/add-grocery.service';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { NextRequest, NextResponse } from 'next/server';

export async function addGroceryController(req: NextRequest) {
try {
    const formData = await req.formData();
    const result = await addGroceryService(formData);

    logger.log("Service returned:", result);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status || 400 }
      );
    }

    return NextResponse.json(
      {
        message: result.message,
        grocery: result.data
      },
      { status: 201 }
    );
  } catch (error) {
    logger.error("Route-level error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
