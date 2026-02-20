import { addGroceryController } from "@/controllers/add-grocery.controller";
import { NextRequest } from "next/server";

export async function POST (req:NextRequest) {
   return addGroceryController(req);
}