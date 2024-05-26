"use client";
import { useRouter } from "next/navigation";
export default function WishListButton({
    productId,
    userId,
    session,
    dictionary,
}) {
    const router = useRouter();
    const addToWishList = async (e) => {
        if (!session) {
            router.push("/login");
        } else {
            if (
                window.confirm(
                    "Are you sure you want to add this item to wishlist?",
                )
            ) {
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
                className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                title="Add to Wishlist"
                onClick={addToWishList}
            >
                <i className="fa-solid fa-heart"></i>
            </button>
        </>
    );
}