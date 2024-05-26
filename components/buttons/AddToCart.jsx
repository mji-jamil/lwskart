"use client";

import { useRouter } from "next/navigation";

export default function AddToCart({ dictionary, productId, userId, session }) {
    const router = useRouter();
    const addToCart = async () => {
        if (!session) {
            router.push("/login");
        } else {
            if (
                window.confirm(
                    "Are you sure you want to add this item to cart?",
                )
            ) {
                try {
                    const response = await fetch("/api/addToCart", {
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
                        console.error(
                            "Failed to add product to buttons:",
                            data.error,
                        );
                    }
                } catch (error) {
                    console.error("Error adding product to buttons:", error);
                }
            }
        }
    };
    return (
        <>
            <button
                className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
                onClick={addToCart}
            >
                {dictionary?.add_to_cart}
            </button>
        </>
    );
}