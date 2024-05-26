"use client"
import { useRouter } from "next/navigation";


export default function DeleteItemFromWishList({ productId, userId }) {
    const router = useRouter();
    const deleteItem = async () => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                const response = await fetch("/api/deleteItemFromWishlist", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId, productId }),
                });

                if (response.ok) {
                    setTimeout(() => {
                        router.push("/wishlist")
                    }, 4000)

                } else {
                    const data = await response.json();
                    console.error("Failed to delete item:", data.error);
                }
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        }
    };

    return (
        <>
            <button
                className="text-gray-600 cursor-pointer hover:text-primary"
                onClick={deleteItem}
            >
                <i className="fa-solid fa-trash"></i>
            </button>
        </>
    );
}