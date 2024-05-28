import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, required: true },
        products: [{ type: Schema.Types.ObjectId, required: true }],
        totalPrice: { type: Number, required: true },
        orderStatus: {
            type: String,
            enum: [
                "Pending",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled",
            ],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    },
);

export const orderModel =
    mongoose.models.orders ?? mongoose.model("orders", orderSchema);