"use server";
import { dbConnect } from "@/service/mongo";
import { userModel } from "@/models/user-model";
import { replaceMongoIdInObject } from "@/utils/data-util";
import { productModel } from "@/models/product-model";

export async function updateData(formData) {
    await dbConnect();
    const { email, name, phoneNumber } = formData;
    try {
        const updateFields = {
            name,
            email,
            phoneNumber,

        };
        // if (password) {
        //     updateFields.password = password;
        // }

        const user = await userModel.findOneAndUpdate(
            { email: email },
            updateFields,
            { new: true },
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
    let user;
    user = await userModel.findOne({
        email: email,
    });
    return user;
}

export async function updateShippingData(data) {
    await dbConnect();
    try {
        const { email, shippingAddress } = data;
        if (!email)
            throw new Error("Email is required to update shipping data.");

        const user = await userModel.findOneAndUpdate(
            { email: email },
            { $set: { shippingAddress: shippingAddress } },
            { new: true },
        );

        if (!user) throw new Error("User not found.");

        return {
            success: true,
            message: "Shipping address updated successfully.",
            user,
        };
    } catch (error) {
        console.error("Error updating shipping data:", error);
        return { error: error.message };
    }
}

export async function updateBillingData(data) {
    await dbConnect();
    try {
        const { email, billingAddress } = data;
        if (!email)
            throw new Error("Email is required to update shipping data.");

        const user = await userModel.findOneAndUpdate(
            { email: email },
            { $set: { billingAddress: billingAddress } },
            { new: true },
        );

        if (!user) throw new Error("User not found.");

        return {
            success: true,
            message: "Billing address updated successfully.",
            user,
        };
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

export async function getAllProducts() {
    try {
        const allProducts = await productModel.find({});
        return allProducts;
    } catch (error) {
        console.error("Error fetching all products:", error);
        throw error;
    }
}

export async function getAllCategories() {
    try {
        const categories = await productModel.distinct("category");
        return categories;
    } catch (error) {
        console.error("Error fetching all categories:", error);
        throw error;
    }
}

export async function getProductCountByCategory(category) {
    try {
        const productCount = await productModel.countDocuments({
            category: category,
        });
        return productCount;
    } catch (error) {
        console.error(
            `Error fetching product count for category ${category}:`,
            error,
        );
        throw error;
    }
}

export async function getProductById(productId) {
    try {
        const product = await productModel.findById(productId);
        return product;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw error;
    }
}

export async function getProductsByCategory(category) {
    try {
        const capitalizedCategory =
            category.charAt(0).toUpperCase() + category.slice(1);
        const products = await productModel.find({
            category: capitalizedCategory,
        });
        if (!products || products.length === 0) {
            throw new Error("No products found in the specified category");
        }
        return products;
    } catch (error) {
        console.error("Error fetching products by category:", error);
        throw error;
    }
}

export async function getProductsByTitle(title) {
    try {
        const products = await productModel.find({ title: new RegExp(title, 'i') });

        if (!products.length) {
            return {
                status: 'not_found',
                message: "No products found with the specified title",
                products: []
            };
        }
        return products;
    } catch (error) {
        console.error("Error fetching products by title:", error);
        throw error;
    }
}

export async function getProducts({ query, categories, min, max }) {
    const filters = {};

    if (query) {
        filters.title = { $regex: query, $options: 'i' };
    }
    if (categories && categories.length > 0) {
        const categoryFilter = Array.isArray(categories) ? categories : [categories];
        filters.category = { $in: categoryFilter };
    }
    if (min) {
        filters.price = { $gte: parseFloat(min) };
    }
    if (max) {
        filters.price = filters.price || {};
        filters.price.$lte = parseFloat(max);
    }

    const products = await productModel.find(filters).exec();
    return products;
}

export async function getProductsByPriceRange(minPrice, maxPrice) {
    const filters = {};

    if (minPrice !== undefined) {
        filters.price = { $gte: minPrice };
    }
    if (maxPrice !== undefined) {
        filters.price = filters.price || {};
        filters.price.$lte = maxPrice;
    }

    const products = await productModel.find(filters).exec();
    return products;
}