"use server";
import { dbConnect } from "@/service/mongo";
import { userModel } from "@/models/user-model";
import {replaceMongoIdInObject} from "@/utils/data-util";
import {productModel} from "@/models/product-model";

export async function updateData(formData) {
    await dbConnect();
    const { email, name, password, phoneNumber } = formData;
    try {
        const updateFields = {
            name,
            email,
            phoneNumber,
            password
        };
        if (password) {
            updateFields.password = password;
        }

        const user = await userModel.findOneAndUpdate(
            { email: email },
            updateFields,
            { new: true }
        );

        if (!user) {
            return { error: { message: "User not found" } };
        }
        const plainUser = replaceMongoIdInObject(user.toObject());

        return { success: true, plainUser };
    } catch (error) {
        return { error: { message: error.message } };
    }
}

export async function getUserData(email) {
    let user
    user = await userModel.findOne({
        email: email,
    });
    return user;
}

export async function updateShippingData(data) {
    await dbConnect();
    try {
        const { email, shippingAddress } = data;
        if (!email) throw new Error("Email is required to update shipping data.");

        const user = await userModel.findOneAndUpdate(
            { email: email },
            { $set: { "shippingAddress": shippingAddress } },
            { new: true }
        );

        if (!user) throw new Error("User not found.");

        return { success: true, message: "Shipping address updated successfully.", user };
    } catch (error) {
        console.error("Error updating shipping data:", error);
        return { error: error.message };
    }
}

export async function updateBillingData(data) {
    await dbConnect()
    try {
        const { email, billingAddress } = data;
        if (!email) throw new Error("Email is required to update shipping data.");

        const user = await userModel.findOneAndUpdate(
            { email: email },
            { $set: { "billingAddress": billingAddress } },
            { new: true }
        );

        if (!user) throw new Error("User not found.");

        return { success: true, message: "Billing address updated successfully.", user };
    } catch (error) {
        console.error("Error updating billing data:", error);
        return { error: error.message };
    }
}

export async function getNewArrivals() {
    try {
        const newArrivals = await productModel.find({ newArrival: true });
        return newArrivals;
    } catch (error) {
        console.error("Error fetching new arrivals:", error);
        throw error;
    }
}

export async function getTrendingProducts() {
    try {
        const trendingProducts = await productModel.find({ trending: true });
        return trendingProducts;
    } catch (error) {
        console.error("Error fetching trending products:", error);
        throw error;
    }
}

export async function getProductById(productId) {
    try {
        const product = await productModel.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw error;
    }
}

export async function getProductsByCategory(category) {
    try {
        const products = await productModel.find({ category: category });
        if (!products || products.length === 0) {
            throw new Error("No products found in the specified category");
        }
        return products;
    } catch (error) {
        console.error("Error fetching products by category:", error);
        throw error;
    }
}