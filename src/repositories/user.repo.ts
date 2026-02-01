import User from "@/models/user.model";
import { RegisterSchemaType } from "@/schema/auth.schema";

export function getUserByEmail(email: string) {
    const user = User.findOne({email});
    return user;
}

export function createUser(userData: RegisterSchemaType) {
    const user = User.create(userData);
    return user;
}
