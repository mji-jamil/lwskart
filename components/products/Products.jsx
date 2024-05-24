import Link from "next/link";
import Sidebar from "@/components/products/Sidebar";
import ProductCard from "@/components/products/ProductCard";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Products({products, dictionary}) {
    // console.log(products);
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
                <ProductCard products={products} dictionary={dictionary}/>
            </div>
        </>
    );
}