"use client"
import Link from "next/link";

export default function ProductNav({dictionary}) {
    function onClickShop() {
        window.location.href = "/products";
    }
    return (
        <>
            <Link
                href="/products"
                className="text-gray-200 hover:text-white transition"
                onClick={onClickShop}
            >
                {dictionary?.product}
            </Link>
        </>
    );
}