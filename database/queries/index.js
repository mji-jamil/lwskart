"use server";
import { dbConnect } from "@/service/mongo";
import { userModel } from "@/models/user-model";
import {replaceMongoIdInObject} from "@/utils/data-util";

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