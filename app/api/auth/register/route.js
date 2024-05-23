import { userModel } from "@/models/user-model";
import { dbConnect } from "@/service/mongo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const { name, email, password } = await request.json();


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