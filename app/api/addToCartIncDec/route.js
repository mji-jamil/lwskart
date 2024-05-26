import { dbConnect } from "@/service/mongo";
import mongoose from "mongoose";
import { userModel } from "@/models/user-model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { userId, productId, quantity } = await req.json();

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }
        for (let i = 0; i < quantity; i++) {
            user.cart.push(new mongoose.Types.ObjectId(productId));
        }

        // user.buttons.push(new mongoose.Types.ObjectId(productId));
        await user.save();
        return new NextResponse("Product added to buttons successfully", {
            status: 201,
        });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
};