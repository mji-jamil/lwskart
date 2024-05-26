import { NextResponse } from "next/server";
import { messageModel } from "@/models/message-model";

export const POST = async (req) => {
    const { name, email, message } = await req.json();
    const newMessage = {
        name,
        email,
        message,
    };

    try {
        await messageModel.create(newMessage);
        return new NextResponse("User has been created", {
            status: 201,
        });
    } catch (error) {
        return new NextResponse(error.message, {
            status: 500,
        });
    }
};