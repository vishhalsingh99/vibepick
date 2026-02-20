// components/AddGroceryForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, X } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addGrocerySchema, AddGrocerySchemaType } from "@/schema/add-grocery.schema";
import axios from "axios";
import { logger } from "@/lib/logger";

interface AddGroceryFormProps {
  onSuccess?: () => void;
}

export default function AddGroceryForm({ onSuccess }: AddGroceryFormProps = {}) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<AddGrocerySchemaType>({
    resolver: zodResolver(addGrocerySchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      category: undefined,
      unit: "",
      price: "", // string rakho kyuki input text hai
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onSubmit = async (data: AddGrocerySchemaType) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("unit", data.unit);

      // ★★★ Yeh important line ★★★
      // price ko number mein convert kar ke bhejo
      const priceNumber = Number(data.price.replace(/[^0-9.]/g, ""));
      formData.append("price", priceNumber.toString()); // backend ko string mein bhej rahe (number bhi accept karega)

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const res = await axios.post("/api/admin/add-grocery", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      logger.log("Backend response:", res.data); // testing ke liye

      setSuccessMessage("Grocery item successfully add ho gaya!");
      reset();
      setSelectedFile(null);
      setPreviewUrl(null);

      onSuccess?.();

      setTimeout(() => {
        router.push("/admin/groceries");
      }, 1500);
    } catch (err: any) {
      setServerError(
        err.response?.data?.message || "Kuch gadbad ho gayi, phir try karo"
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full">
      {/* Messages */}
      {serverError && (
        <div className="mb-6 p-4 rounded-xl bg-red-900/30 border border-red-600/40 text-red-300 text-sm">
          {serverError}
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 rounded-xl bg-green-900/30 border border-green-600/40 text-green-300 text-sm flex items-center gap-2">
          <Save size={18} />
          {successMessage}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1.5">
            Product Name
          </label>
          <input
            {...register("name")}
            placeholder="e.g. Fresh Mangoes"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-white/40 focus:border-vibe-orange/60 focus:bg-white/10 outline-none transition"
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1.5">
            Category
          </label>
          <select
            {...register("category")}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white focus:border-vibe-orange/60 focus:bg-white/10 outline-none transition appearance-none"
          >
            <option value="">Select Category</option>
            <option value="Fruits & Vegetables">Fruits & Vegetables</option>
            <option value="Dairy & Eggs">Dairy & Eggs</option>
            <option value="Rice, Atta & Grains">Rice, Atta & Grains</option>
            <option value="Snacks & Biscuits">Snacks & Biscuits</option>
            <option value="Spices & Masalas">Spices & Masalas</option>
            <option value="Beverages & Drinks">Beverages & Drinks</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Household Essentials">Household Essentials</option>
            <option value="Instant & Packaged Food">Instant & Packaged Food</option>
            <option value="Baby & Pet Care">Baby & Pet Care</option>
          </select>
          {errors.category && <p className="mt-1 text-xs text-red-400">{errors.category.message}</p>}
        </div>

        {/* Unit + Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1.5">
              Unit
            </label>
            <input
              {...register("unit")}
              placeholder="kg, piece, liter, pack..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-white/40 focus:border-vibe-orange/60 focus:bg-white/10 outline-none transition"
            />
            {errors.unit && <p className="mt-1 text-xs text-red-400">{errors.unit.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1.5">
              Price (₹)
            </label>
            <input
              {...register("price")}
              placeholder="99.99"
              type="text" // text rakha taaki decimal aur clean input ho
              inputMode="decimal"
              pattern="[0-9]*[.]?[0-9]*" // keyboard decimal allow kare
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-white/40 focus:border-vibe-orange/60 focus:bg-white/10 outline-none transition"
            />
            {errors.price && <p className="mt-1 text-xs text-red-400">{errors.price.message}</p>}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1.5">
            Upload Image (optional)
          </label>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-xl border-2 border-dashed border-white/30 flex items-center justify-center bg-black/30 overflow-hidden">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white/40 text-xs text-center px-3">
                  Preview here
                </span>
              )}
            </div>

            <div className="flex-1">
              <label className="cursor-pointer block">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="border border-white/20 rounded-xl p-6 text-center hover:bg-white/5 transition-colors">
                  {selectedFile ? (
                    <p className="text-vibe-orange font-medium text-sm break-all">
                      {selectedFile.name}
                    </p>
                  ) : (
                    <>
                      <p className="text-white/80">Click or drag image here</p>
                      <p className="text-xs text-white/50 mt-1">
                        JPG, PNG, max 5MB
                      </p>
                    </>
                  )}
                </div>
              </label>

              {selectedFile && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                  }}
                  className="mt-3 text-xs text-red-400 hover:text-red-300 flex items-center gap-1 mx-auto"
                >
                  <X size={14} /> Remove
                </button>
              )}

              {errors.file && (
                <p className="mt-2 text-xs text-red-400 text-center">
                  {errors.file?.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          disabled={!isValid || isSubmitting}
          type="submit"
          className="
            w-full py-4 mt-6 rounded-xl
            bg-vibe-orange text-white font-semibold
            flex items-center justify-center gap-3
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:bg-orange-600 transition
          "
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Adding...
            </>
          ) : (
            <>
              <Save size={20} />
              Add Grocery Item
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}