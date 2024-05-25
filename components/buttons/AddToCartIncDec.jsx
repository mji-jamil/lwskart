"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddToCartIncDec({ dictionary, productId, userId }) {
    const router = useRouter();

    const [count, setCount] = useState(1);

    const increaseCount = () => {
        setCount(count + 1);
    };

    const decreaseCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };
    const addToCart = async () => {
        if (!userId) {
            router.push("/login");
        }
        try {
            const response = await fetch("/api/addToCartIncDec", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, productId, quantity: count }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Product added to buttons:", data.message);
            } else {
                console.error("Failed to add product to buttons:", data.error);
            }
        } catch (error) {
            console.error("Error adding product to buttons:", error);
        }
    };

    const addToWishList = async (e) => {
        if (!userId) {
            router.push("/login");
        } else {
            try {
                const response = await fetch("/api/wishList", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId, productId }),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("Product added to buttons:", data.message);
                } else {
                    console.error("Failed to add product to buttons:", data.error);
                }
            } catch (error) {
                console.error("Error adding product to buttons:", error);
            }
        }
    };

    return (
        <>
            <div className="mt-4">
                <h3 className="text-sm text-gray-800 uppercase mb-1">
                    {dictionary?.quantity}
                </h3>
                <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                    <div
                        className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                        onClick={decreaseCount}
                    >
                        -
                    </div>
                    <div className="h-8 w-8 text-base flex items-center justify-center">
                        {count}
                    </div>
                    <div
                        className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                        onClick={increaseCount}
                    >
                        +
                    </div>
                </div>
            </div>

            <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                <button
                    className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
                    onClick={addToCart}
                >
                    <i className="fa-solid fa-bag-shopping"></i>{" "}
                    {dictionary?.add_to_cart}
                </button>
                <button
                    className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"
                    onClick={addToWishList}
                >
                    <i className="fa-solid fa-heart"></i> {dictionary?.wishlist}
                </button>
            </div>
        </>
    );
}