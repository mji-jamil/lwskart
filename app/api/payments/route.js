import { dbConnect } from "@/service/mongo";
import {userModel} from "@/models/user-model";
import {orderModel} from "@/models/order-model";

export const POST = async (req) => {
    try {
        await dbConnect();

        const { userId, products, totalPrice } = await req.json();

        const newOrder = new orderModel({
            userId,
            products,
            totalPrice,
            orderStatus: "Pending",
        });

        const savedOrder = await newOrder.save();

        const orderId = savedOrder._id.toString();

        await userModel.findByIdAndUpdate(
            userId,
            { $set: { cart: [] },
                $push: { orders: orderId }}
        );

        return new Response(JSON.stringify({ message: "Order created successfully" }), {
            status: 201,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        console.error("Error creating order:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
};