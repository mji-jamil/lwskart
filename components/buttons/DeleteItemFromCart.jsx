"use client";
import { useRouter } from "next/navigation";

export default function DeleteItemFromCart({ productId, userId, onDelete }) {
    const router = useRouter();

    function onReload() {
        window.location.href = "/cart";
    }

    const deleteItem = async () => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                const response = await fetch("/api/deleteItemFromCart", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId, productId }),
                });

                if (response.ok) {
                    await onDelete(productId);
                    await onReload();
                    // router.push("/wishlist")
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
            <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                <button
                    className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
                    onClick={deleteItem}
                >
                    Delete
                </button>
            </div>
        </>
    );
}