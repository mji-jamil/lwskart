import { userModel } from "@/models/user-model";
import { NextResponse } from "next/server";
import { dbConnect } from "@/service/mongo";

export const POST = async (req) => {
    const { userId } = await req.json();

    try {
        await dbConnect();
        const user = await userModel.findById(userId);

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        return new NextResponse(user, { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
};