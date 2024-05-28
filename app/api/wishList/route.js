import { dbConnect } from "@/service/mongo";
import mongoose from "mongoose";
import { userModel } from "@/models/user-model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { userId, productId } = await req.json();

    try {
        await dbConnect();

        const productObjectId = new mongoose.Types.ObjectId(productId);
        const updatedUser = await userModel.findOneAndUpdate(
            { _id: userId },
            { $push: { wishlist: productObjectId } },
            { new: true },
        );

        if (!updatedUser) {
            const userExists = await userModel.findById(userId);
            if (!userExists) {
                return new NextResponse("User not found", { status: 404 });
            } else {
                return new NextResponse("Product already in wishlist", {
                    status: 200,
                });
            }
        }

        return new NextResponse("Product added to wishlist successfully", {
            status: 201,
        });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
};