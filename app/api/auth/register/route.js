import { userModel } from "@/models/user-model";
import { dbConnect } from "@/service/mongo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const { name, email, password, confirm } = await request.json();

    if (password !== confirm) {
        return new NextResponse("Passwords do not match", {
            status: 400,
        });
    }

    await dbConnect();

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = {
        name: name,
        email,
        password: hashedPassword,
    };

    try {
        await userModel.create(newUser);
        return new NextResponse("User has been created", {
            status: 201,
        });
    } catch (err) {
        return new NextResponse(err.message, {
            status: 500,
        });
    }
};