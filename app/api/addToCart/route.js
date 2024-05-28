import { dbConnect } from "@/service/mongo";
import mongoose from "mongoose";
import { userModel } from "@/models/user-model";
import { NextResponse } from "next/server";
import { productModel } from "@/models/product-model";

export const POST = async (req) => {
    const { userId, productId } = await req.json();

    try {
        await dbConnect();
        const user = await userModel.findById(userId);

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        if (!user.cart) {
            user.cart = [];
        }

        const product = await productModel.findById(productId);
        if (product.stock <= 0) {
            return new NextResponse("Product out of stock", { status: 400 });
        }

        user.cart.push(new mongoose.Types.ObjectId(productId));
        await user.save();

        product.stock -= 1;
        await product.save();
        return new NextResponse("Product added to buttons successfully", {
            status: 201,
        });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
};