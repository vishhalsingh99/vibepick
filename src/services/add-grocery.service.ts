import uploadOnCloudinary from '@/lib/cloudinary';
import Grocery from '@/models/grocery.model';
import {
  addGrocerySchema,
} from '@/schema/add-grocery.schema';
import { connectDb } from '@/lib/db';
import { logger } from '@/lib/logger';

export async function addGroceryService(formData: FormData) {
  try {

    await connectDb();

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const unit = formData.get("unit") as string;
    const priceStr = formData.get("price") as string;
    const file = formData.get("file") as File | null;

    logger.log("Received form values:", {name, category, unit, priceStr, hasFile: !!file?.size})

    const parsed = addGrocerySchema.safeParse({ name, category, unit, price: priceStr });
    if (!parsed.success) {
      logger.log("Zod Validation Failed")
      const firstError = parsed.error.issues[0];
      return {
        status: 400,
        message: firstError.message || 'Invalid Input Data',
      };
    }

    logger.log("Zod-passed -> Proceeding");

    let imageUrl: string | null = null;
    if (file && file.size > 0) {
      logger.log("Starting Cloudinary Upload");
      imageUrl = await uploadOnCloudinary(file);
      logger.log("Cloudinary result:", imageUrl ? "Success" : "Failed / returned NULL");
      if (!imageUrl) {
        logger.log("Cloudinary Image Upload failed - returning error")
        return {
          success: false,
          status: 500,
          message: 'Failed to upload image',
        };
      }
    } else {
      logger.log("No File Uploaded -> using default / null image");
    }

    logger.log("About to create Grocery Document:", {
      name,
      category,
      unit,
      price: priceStr,
      image: imageUrl || "(no-image)",
    })
    const grocery = await Grocery.create({
      name,
      price: priceStr,
      category,
      unit,
      image:  imageUrl,
    });

    logger.log("Grocery created successfully");

    return {
      success: true,
      status: 201,
      message: 'Grocery added successfully',
      data: {
        _id: grocery._id,
        name: grocery.name,
        category: grocery.category,
        unit: grocery.unit,
        price: grocery.price,
        image: grocery.image,
        createdAt: grocery.createdAt,
      },
    };
  } catch (error) {
    logger.error('Add Grocery Error:', error);
    return {
      success: false,
      status: 500,
      message: 'Failed to add grocery item',
    };
  }
}
