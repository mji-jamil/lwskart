import Link from "next/link";
import Sidebar from "@/components/products/Sidebar";
import ProductCard from "@/components/products/ProductCard";

export default function ProductNotFound({dictionary}) {
    return (
        <>
            <div className="container py-4 flex items-center gap-3">
                <Link href="#" className="text-primary text-base">
                    <i className="fa-solid fa-house"></i>
                </Link>
                <span className="text-sm text-gray-400">
                    <i className="fa-solid fa-chevron-right"></i>
                </span>
                <p className="text-gray-600 font-medium">Shop</p>
            </div>
            <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
                <Sidebar dictionary={dictionary}/>
                <div className="md:col-span-3 col-span-2 flex flex-col items-center justify-center text-center">
                    <i className="fa-solid fa-box-open text-6xl text-gray-300 mb-4"></i>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                        Product not found
                    </h2>
                    <p className="text-gray-500 mb-4">
                        The product you are searching for was not found. Try searching for another product.
                    </p>
                </div>
            </div>
        </>
    );
}