import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    postCode: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
}, { _id: false });

const userSchema = new Schema({
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
        // type: addressSchema,
        // required: false,
        type: String,
    },
    billingAddress: {
        type: addressSchema,
        required: false,
    },
});

export const userModel = mongoose.models.users ?? mongoose.model("users", userSchema);