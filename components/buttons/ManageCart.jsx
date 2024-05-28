"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ManageCart({
    dictionary,
    productId,
    userId,
    stock,
    price,
    discountPercentage,
    quantity,
}) {
    const router = useRouter();
    const [count, setCount] = useState(quantity);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        const discountedPrice = price * (1 - discountPercentage / 100);
        setTotalPrice(discountedPrice * count);
    }, [count, price, discountPercentage]);

    function onReloadCart() {
        window.location.href="/cart";
    }

    const increaseCount = () => {
        if (count < stock) {
            setCount(count + 1);
        }
    };

    const decreaseCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };
    const addToCart = async () => {
        if (!userId) {
            router.push("/login");
        } else {
            if (window.confirm("Confirm number of items?")) {
                try {
                    const response = await fetch("/api/manageCart", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            userId,
                            productId,
                            quantity: count,
                        }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        // onReloadCart();
                        console.log("Product added to buttons:", data.message);

                    } else {
                        console.error(
                            "Failed to add product to buttons:",
                            data.error,
                        );
                    }
                } catch (error) {
                    console.error("Error adding product to buttons:", error);
                }
            }
             else {
                 setCount(quantity)
            }
        }
    };

    return (
        <>
            <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                <div className="text-primary text-lg font-semibold">
                    ${totalPrice.toFixed(2)}
                </div>
            </div>
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
                        className={`h-8 w-8 text-xl flex items-center justify-center select-none ${
                            count >= stock
                                ? "text-gray-400 cursor-not-allowed"
                                : "cursor-pointer"
                        }`}
                        onClick={increaseCount}
                    >
                        +
                    </div>
                </div>
                {count >= stock && (
                    <div className="text-red-500 text-sm mt-2">
                        Maximum stock reached
                    </div>
                )}
            </div>

            <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                <button
                    className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
                    onClick={addToCart}
                >
                    {dictionary?.update}
                </button>
            </div>
        </>
    );
}