import { editRoleMobileController } from "@/controllers/editRoleMobile.controller";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
    return editRoleMobileController(req);
}