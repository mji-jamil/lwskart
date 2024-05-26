"use server";

import { signIn } from "@/auth";
import {dbConnect} from "@/service/mongo";

export async function login(formData) {
    try {
        await dbConnect();
        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });
        if (response.error) {
            throw new Error("Email or password mismatched");
        }
        return response;
    } catch (error) {
        return {
            error: { message: error.message || "An unexpected error occurred" },
        };
    }
}