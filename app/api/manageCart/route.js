// import { dbConnect } from "@/service/mongo";
// import mongoose from "mongoose";
// import { userModel } from "@/models/user-model";
// import { productModel } from "@/models/product-model";
// import { NextResponse } from "next/server";
//
// export const POST = async (req) => {
//     const { userId, productId, quantity } = await req.json();
//
//     try {
//         await dbConnect();
//         const user = await userModel.findById(userId);
//         if (!user) {
//             return new NextResponse("User not found", { status: 404 });
//         }
//
//         const product = await productModel.findById(productId);
//         if (!product) {
//             return new NextResponse("Product not found", { status: 404 });
//         }
//
//         let currentQuantity = user.cart.filter(
//             (id) => id.toString() === productId,
//         ).length;
//
//         let difference = quantity - currentQuantity;
//
//         if (difference > 0) {
//             if (product.stock < difference) {
//                 return new NextResponse("Not enough product in stock", {
//                     status: 400,
//                 });
//             }
//             await userModel.findByIdAndUpdate(
//                 userId,
//                 {
//                     $push: {
//                         cart: {
//                             $each: Array(difference).fill(
//                                 new mongoose.Types.ObjectId(productId),
//                             ),
//                         },
//                     },
//                 },
//                 {
//                     new: true,
//                 },
//             );
//             product.stock -= difference;
//         } else {
//             difference = Math.abs(difference);
//             user.cart = user.cart.filter((id, index) => {
//                 if (id.toString() === productId && difference > 0) {
//                     difference--;
//                     return false;
//                 }
//                 return true;
//             });
//             product.stock += difference;
//         }
//
//         await user.save();
//         await product.save();
//
//         return new NextResponse("Cart updated successfully", {
//             status: 200,
//         });
//     } catch (error) {
//         return new NextResponse(error.message, { status: 500 });
//     }
// };

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

        // Check if requested quantity exceeds available stock
        if (quantity > product.stock) {
            return new NextResponse("Not enough product in stock", { status: 400 });
        }

        // Calculate difference in quantity
        const currentQuantity = user.cart.filter(id => id.toString() === productId).length;
        const difference = quantity - currentQuantity;

        // Add or remove products based on the difference in quantity
        if (difference > 0) {
            // Add products to the cart
            await userModel.findByIdAndUpdate(userId, {
                $push: {
                    cart: { $each: Array(difference).fill(productId) }
                }
            }, { new: true });
            product.stock -= difference;
        } else if (difference < 0) {
            // Remove products from the cart
            const removedProducts = await userModel.findByIdAndUpdate(userId, {
                $pull: { cart: { $in: Array(-difference).fill(productId) } }
            }, {new: true });
            product.stock += removedProducts.length;
        }

        // Save changes to product
        await product.save();

        return new NextResponse("Cart updated successfully", { status: 200 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
};