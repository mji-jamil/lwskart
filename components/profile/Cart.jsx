"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";
import Link from "next/link";
import ManageCart from "@/components/buttons/ManageCart";
import DeleteItemFromCart from "@/components/buttons/DeleteItemFromCart";
import { useState } from "react";
import {redirect} from "next/navigation";

export default function Cart({ dictionary, userId, cart }) {
    if(!userId) {
        redirect("/login")
    }
    const calculateDiscountedPrice = (price, discountPercentage) => {
        return price * (1 - discountPercentage / 100);
    };
    const aggregatedCart = cart?.reduce((acc, product) => {
        const productData = product._doc || product;
        const existingProduct = acc.find(
            (item) => item._id.toString() === productData._id.toString(),
        );

        const discountedPrice = calculateDiscountedPrice(
            productData.price,
            productData.discountPercentage,
        );
        if (existingProduct) {
            existingProduct.quantity += 1;
            existingProduct.totalPrice += discountedPrice;
        } else {
            acc.push({
                ...productData,
                quantity: 1,
                totalPrice: discountedPrice,
            });
        }
        return acc;
    }, []);
    const [products, setProducts] = useState(aggregatedCart);
    const handleDeleteItem = (deletedProductId) => {
        setProducts((prevProducts) =>
            prevProducts.filter(
                (product) => product._id.toString() !== deletedProductId,
            ),
        );
    };

    return (
        <>
            <div className="container gap-6 pt-4 pb-16">
                <div className="mx-auto space-y-4 max-w-6xl">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div
                                className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded"
                                key={product?._id}
                            >
                                <div className="w-28">
                                    <Link href={`/products/${product._id}`}>
                                        <Image
                                            src={product?.thumbnail}
                                            alt={product?.title}
                                            className="w-full"
                                            width={120}
                                            height={120}
                                        />
                                    </Link>
                                </div>
                                <div className="w-1/3">
                                    <Link href={`/products/${product._id}`}>
                                        <h2 className="text-gray-800 text-xl font-medium uppercase">
                                            {product?.title}
                                        </h2>
                                    </Link>
                                </div>

                                <ManageCart
                                    productId={product?._id.toString()}
                                    userId={userId}
                                    stock={product?.stock}
                                    price={product?.price}
                                    discountPercentage={
                                        product?.discountPercentage || 0
                                    }
                                    dictionary={dictionary}
                                    quantity={product.quantity}
                                />
                                <DeleteItemFromCart
                                    productId={product?._id.toString()}
                                    userId={userId}
                                    onDelete={handleDeleteItem}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="md:col-span-3 col-span-2 flex flex-col items-center justify-center text-center">
                            <i className="fa-solid fa-box-open text-6xl text-gray-300 mb-4"></i>
                            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                                No Products in Cart
                            </h2>
                            <p className="text-gray-500 mb-4">
                                Try adding some products to cart.
                            </p>
                            <p>
                                <Link
                                    href={"/products"}
                                    className="text-red-600 text-lg font-medium hover:underline"
                                >
                                    VISIT SHOP
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}