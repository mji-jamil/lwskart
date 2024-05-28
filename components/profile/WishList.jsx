"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";
import AddToCart from "@/components/buttons/AddToCart";
import DeleteItemFromWishList from "@/components/buttons/DeleteItemFromWishList";
import { useState } from "react";
import Link from "next/link";
import {redirect} from "next/navigation";

export default function WishList({ dictionary, userId, wishListProducts }) {
    if(!userId) {
        redirect("/login")
    }
    const [products, setProducts] = useState(wishListProducts);
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
                                    <p className="text-gray-500 text-sm">
                                        Availability:{" "}
                                        {product?.stock > 0 ? (
                                            <span className="text-green-600">
                                                {dictionary?.in_stock}
                                            </span>
                                        ) : (
                                            <span className="text-red-600">
                                                {dictionary?.out_stock}
                                            </span>
                                        )}
                                    </p>
                                </div>
                                <div className="text-primary text-lg font-semibold">
                                    $
                                    {(
                                        product?.price -
                                        (product?.price *
                                            product?.discountPercentage) /
                                            100
                                    ).toFixed(2)}
                                </div>

                                <div className="max-w-xs mx-auto p-3">
                                    <AddToCart
                                        dictionary={dictionary}
                                        productId={product?._id.toString()}
                                        userId={userId}
                                        className="w-full"
                                        disabled={!(product?.stock > 0)}
                                    />
                                </div>
                                <DeleteItemFromWishList
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
                                No Products in Wishlist
                            </h2>
                            <p className="text-gray-500 mb-4">
                                Try adding some products to wishlist.
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