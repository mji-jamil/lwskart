"use server";

import { signIn } from "@/auth";
import {dbConnect} from "@/service/mongo";

export async function login(formData) {

    try {
        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });
        return response;
    } catch (error) {
        // throw new Error(error.message);
        console.log(error);
    }
}