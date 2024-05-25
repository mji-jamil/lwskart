import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
    {
        name: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
        postCode: {
            type: String,
            required: false,
        },
        phoneNumber: {
            type: String,
            required: false,
        },
    },
    { _id: false },
);

const userSchema = new Schema(
    {
        name: {
            required: true,
            type: String,
        },
        email: {
            required: true,
            type: String,
        },
        password: {
            required: true,
            type: String,
        },
        image: {
            required: false,
            type: String,
        },
        phoneNumber: {
            type: String,
            required: false,
        },
        shippingAddress: {
            type: addressSchema,
            required: false,
        },
        billingAddress: {
            type: addressSchema,
            required: false,
        },
        cart: [
            {
                type: mongoose.Schema.Types.ObjectId,
            },
        ],
        wishlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
            },
        ],
    },
    {
        timestamps: true,
    },
);

export const userModel =
    mongoose.models.users ?? mongoose.model("users", userSchema);