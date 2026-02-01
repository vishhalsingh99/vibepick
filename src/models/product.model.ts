import mongoose from 'mongoose';

interface IProduct {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  mrp: number;
  discountPercentage: number;
  images: string[];
  thumbnail: string;
  category: mongoose.Types.ObjectId;
  subCategory: mongoose.Types.ObjectId;
  brand: string;
  weight: string;
  unit: string;
  quantityValue: number;
  stock: number;
  lowStockThreshold: number;
  isAvailable: boolean;
  isFeatured: boolean;
  searchKeywords: string[];
  ratingsAverage: number;
  ratingsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    mrp: { type: Number, required: true, min: 0 },
    discountPercentage: Number,
    images: { type: [String], required: true },
    thumbnail: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
      required: true,
    },
    brand: String,
    weight: String,
    unit: String,
    quantityValue: Number,
    stock: { type: Number, default: 0 },
    lowStockThreshold: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    isFeatured: Boolean,
    searchKeywords: { type: [String], required: true },
    ratingsAverage: { type: Number, default: 0 },
    ratingsCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

productSchema.index({
  name: 'text',
  description: 'text',
  shortDescription: 'text',
  brand: 'text',
  searchKeywords: 'text',
});
productSchema.index({ slug: 1 });
productSchema.index({ category: 1, isAvailable: 1 });

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);
export default Product; 
