// import { dbConnect } from "@/service/mongo";
// import {userModel} from "@/models/user-model";
// import {orderModel} from "@/models/order-model";
//
// export const POST = async (req) => {
//     try {
//         await dbConnect();
//
//         const { userId, products, totalPrice } = await req.json();
//
//         const newOrder = new orderModel({
//             userId,
//             products,
//             totalPrice,
//             orderStatus: "Pending",
//         });
//
//         const savedOrder = await newOrder.save();
//
//         const orderId = savedOrder._id.toString();
//         const user = await userModel.findById(userId);
//         if (!user) {
//             return new Response(JSON.stringify({ error: "User not found" }), {
//                 status: 404,
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });
//         }
//         if (!user.orders) {
//             user.orders = [];
//         }
//
//         user.orders.push(orderId);
//         user.cart = [];
//         await user.save();
//
//
//         return new Response(JSON.stringify({ message: "Order created successfully" }), {
//             status: 201,
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });
//     } catch (error) {
//         console.error("Error creating order:", error);
//         return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//             status: 500,
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });
//     }
// };

import { dbConnect } from "@/service/mongo";
import { userModel } from "@/models/user-model";
import { orderModel } from "@/models/order-model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        await dbConnect();

        const { userId, products, totalPrice } = await req.json();

        // Create a new order
        const newOrder = new orderModel({
            userId,
            products,
            totalPrice,
            orderStatus: "Pending",
        });

        const savedOrder = await newOrder.save();
        const orderId = savedOrder._id.toString();

        // Update user's orders and clear the cart
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {
                $push: { orders: orderId },
                $set: { cart: [] }
            },
            { new: true }
        );

        if (!updatedUser) {
            return new NextResponse("User not found", { status: 404 });
        }

        return new NextResponse(
            JSON.stringify({ message: "Order created successfully" }),
            {
                status: 201,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    } catch (error) {
        console.error("Error creating order:", error);
        return new NextResponse(
            JSON.stringify({ error: "Internal Server Error" }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }
};