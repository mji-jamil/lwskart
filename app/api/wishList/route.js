// import { dbConnect } from "@/service/mongo";
// import mongoose from "mongoose";
// import { userModel } from "@/models/user-model";
// import { NextResponse } from "next/server";
//
// export const POST = async (req) => {
//     const { userId, productId } = await req.json();
//
//     try {
//         await dbConnect();
//         const user = await userModel.findById(userId);
//
//         if (!user) {
//             return new NextResponse("User not found", { status: 404 });
//         }
//
//         if (!user.wishlist) {
//             user.wishlist = [];
//         }
//
//         const isProductInWishlist = user.wishlist.some(
//             (item) => item.toString() === productId,
//         );
//
//         if (isProductInWishlist) {
//             return new NextResponse("Product already in wishlist", {
//                 status: 200,
//             });
//         }
//
//         user.wishlist.push(new mongoose.Types.ObjectId(productId));
//         await user.save();
//         return new NextResponse("Product added to buttons successfully", {
//             status: 201,
//         });
//     } catch (error) {
//         return new NextResponse(error.message, { status: 500 });
//     }
// };

import { dbConnect } from "@/service/mongo";
import mongoose from "mongoose";
import { userModel } from "@/models/user-model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { userId, productId } = await req.json();

    try {
        await dbConnect();

        // Convert productId to a mongoose ObjectId
        const productObjectId = new mongoose.Types.ObjectId(productId);

        // Find and update the user
        const updatedUser = await userModel.findOneAndUpdate(
            { _id: userId, wishlist: { $ne: productObjectId } }, // Check if product is not in wishlist
            { $addToSet: { wishlist: productObjectId } }, // Add product to wishlist if not already there
            { new: true }
        );

        if (!updatedUser) {
            // Check if the user exists or product is already in the wishlist
            const userExists = await userModel.findById(userId);
            if (!userExists) {
                return new NextResponse("User not found", { status: 404 });
            } else {
                return new NextResponse("Product already in wishlist", { status: 200 });
            }
        }

        return new NextResponse("Product added to wishlist successfully", { status: 201 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
};