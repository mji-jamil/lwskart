import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        price: {
            type: Number,
            required: false,
        },
        discountPercentage: {
            type: Number,
            required: false,
        },
        rating: {
            type: Number,
            required: false,
            min: 0,
            max: 5,
        },
        review: {
            type: Number,
            required: false,
        },
        stock: {
            type: Number,
            required: false,
        },
        brand: {
            type: String,
            required: false,
        },
        category: {
            type: String,
            required: false,
        },
        thumbnail: {
            type: String,
            required: false,
        },
        images: {
            type: [String],
            required: false,
        },
        newArrival: {
            type: Boolean,
            required: false,
        },
        trending: {
            type: Boolean,
            required: false,
        },
    },
    {
        timestamps: true,
    },
);

export const productModel =
    mongoose.models.products ?? mongoose.model("products", productSchema);