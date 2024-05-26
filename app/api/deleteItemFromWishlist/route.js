import { dbConnect } from "@/service/mongo";
import { userModel } from "@/models/user-model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { userId, productId } = await req.json();

    try {
        const user = await userModel.findByIdAndUpdate(
            userId,
            { $pull: { wishlist: productId } },
            { new: true },
        );

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        return new NextResponse("Product removed from wishlist successfully", {
            status: 200,
        });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
};