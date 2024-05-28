import { dbConnect } from "@/service/mongo";
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

        const currentQuantity = user.cart.filter(id => id.toString() === productId).length;
        const difference = quantity - currentQuantity;

        if (difference > 0) {

            if (product.stock < difference) {
                return new NextResponse("Not enough product in stock", { status: 400 });
            }

            await userModel.findByIdAndUpdate(userId, {
                $push: {
                    cart: { $each: Array(difference).fill(productId) }
                }
            }, { new: true });
            product.stock -= difference;
        } else if (difference < 0) {

            let count = Math.abs(difference);
            user.cart = user.cart.filter(id => {
                if (id.toString() === productId && count > 0) {
                    count--;
                    return false;
                }
                return true;
            });

            product.stock += Math.abs(difference);
            await user.save();
        }

        await product.save();

        return new NextResponse("Cart updated successfully", { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
};