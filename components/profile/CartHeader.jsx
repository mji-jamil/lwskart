"use client"
import Link from "next/link";

export default function CartHeader() {
    function onClickCheckout() {
        window.location.href = "/checkout"
    }
    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Link href="/" className="text-primary text-base">
                        <i className="fa-solid fa-house"></i>
                    </Link>
                    <span className="text-sm text-gray-400">
                        <i className="fa-solid fa-chevron-right"></i>
                    </span>
                    <p className="text-gray-600 font-bold">Cart</p>
                </div>
                <div>
                    <Link href="/checkout"
                          className="bg-primary px-4 py-3 text-white px-4 py-2 rounded hover:bg-primary-dark transition"
                    onClick={onClickCheckout}>
                        Go To Checkout
                    </Link>
                </div>
            </div>
        </>
    );
}