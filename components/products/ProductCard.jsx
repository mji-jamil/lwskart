import Image from "next/image";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import AddToCart from "@/components/buttons/AddToCart";
import { auth } from "@/auth";
import { getUserData } from "@/database/queries";
import WishListButton from "@/components/buttons/WishListButton";

export default async function ProductCard({ products, dictionary }) {
    const session = await auth();
    const userData = await getUserData(session?.user?.email);
    return (
        <>
            {products.map((product) => (
                <div
                    className="bg-white shadow rounded overflow-hidden group"
                    key={product._id}
                >
                    <div className="relative h-60 w-full">
                        <Image
                            src={product?.thumbnail}
                            alt={product?.title}
                            className="w-full h-full object-cover"
                            fill
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                            <a
                                href="#"
                                className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                title="view product"
                            >
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </a>
                            <WishListButton
                                productId={product?._id.toString()}
                                userId={userData?._id.toString()}
                                session={session}
                            />
                        </div>
                    </div>
                    <div className="pt-4 pb-3 px-4">
                        <Link href={`/products/${product._id}`}>
                            <h4 className="uppercase font-medium text-base mb-2 text-gray-800 hover:text-primary transition">
                                {product?.title}
                            </h4>
                        </Link>
                        <div className="flex items-baseline mb-1 space-x-2">
                            <p className="text-xl text-primary font-semibold">
                                $
                                {(
                                    product?.price -
                                    (product?.price *
                                        product?.discountPercentage) /
                                        100
                                ).toFixed(2)}
                            </p>
                            <p className="text-base text-gray-400 line-through">
                                ${product?.price}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <div className="flex gap-1 text-sm text-yellow-400">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span key={i}>
                                        <i
                                            className={`fa-solid fa-star${i < Math.round(product?.rating) ? "" : "-half-alt"}`}
                                        ></i>
                                    </span>
                                ))}
                            </div>
                            <div className="text-xs text-gray-500 ml-3">
                                ({product?.rating})
                            </div>
                        </div>
                    </div>
                    <AddToCart
                        dictionary={dictionary}
                        productId={product?._id.toString()}
                        userId={userData?._id.toString()}
                        session={session}
                    />
                </div>
            ))}
        </>
    );
}