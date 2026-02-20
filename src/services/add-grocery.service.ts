import uploadOnCloudinary from '@/lib/cloudinary';
import Grocery from '@/models/grocery.model';
import {
  addGrocerySchema,
  AddGrocerySchemaType,
} from '@/schema/add-grocery.schema';

export async function addGroceryService(formData: FormData) {
  try {

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const unit = formData.get("unit") as string;
    const priceStr = formData.get("price") as string;
    const file = formData.get("file") as File | null;
    const parsed = addGrocerySchema.safeParse({ name, category, unit, price: priceStr });
    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return {
        status: 400,
        message: firstError.message || 'Invalid Input Data',
      };
    }

    let imageUrl: string | null = null;
    if (file && file.size > 0) {
      imageUrl = await uploadOnCloudinary(file);
      if (!imageUrl) {
        return {
          success: false,
          status: 500,
          message: 'Failed to upload image',
        };
      }
    }
    const grocery = await Grocery.create({
      name,
      price: priceStr,
      category,
      unit,
      image:  imageUrl,
    });

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
    console.error('Add Grocery Error:', error);
    return {
      success: false,
      status: 500,
      message: 'Failed to add grocery item',
    };
  }
}
