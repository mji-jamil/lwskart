import { dbConnect } from "@/service/mongo";
import { userModel } from "@/models/user-model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { userId, productId } = await req.json();

    try {
        await dbConnect();
        const user = await userModel.findById(userId);
        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }
        const productCount = user.cart.filter(id => id.toString() === productId).length;
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $pull: { cart: productId } },
            { new: true },
        );

        // if (!user) {
        //     return new NextResponse("User not found", { status: 404 });
        // }
        const product = await productModel.findById(productId);
        product.stock += productCount;
        await product.save();

        return new NextResponse("Product removed from wishlist successfully", {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
};