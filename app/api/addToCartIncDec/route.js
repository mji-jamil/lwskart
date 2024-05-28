import { dbConnect } from "@/service/mongo";
import mongoose from "mongoose";
import { userModel } from "@/models/user-model";
import { productModel } from "@/models/product-model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { userId, productId, quantity } = await req.json();

    try {
        await dbConnect();
        const user = await userModel.findById(userId);
        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        const product = await productModel.findById(productId);
        if (!product) {
            return new NextResponse("Product not found", { status: 404 });
        }

        if (product.stock < quantity) {
            return new NextResponse("Not enough product in stock", { status: 400 });
        }
        await userModel.findByIdAndUpdate(userId, {
            $push: {
                cart: { $each: Array(quantity).fill(new mongoose.Types.ObjectId(productId)) }
            }
        });

        product.stock -= quantity;
        await product.save();

        return new NextResponse("Product added to cart successfully", {
            status: 201,
        });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
};