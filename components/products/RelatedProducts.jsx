import Image from "next/image";
import Link from "next/link";
import {getProductsByCategory, getUserData} from "@/database/queries";
import AddToCart from "@/components/buttons/AddToCart";
import {auth} from "@/auth";
import WishListButton from "@/components/buttons/WishListButton";

export default async function RelatedProducts({ category, dictionary }) {
    const products = await getProductsByCategory(category);
    const firstFourProducts = products.slice(0, 4);
    const session = await auth();
    const userData = await getUserData(session?.user?.email);
    return (
        <>
            <div className="container pb-16">
                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                    {dictionary?.related_products}
                </h2>
                <div className="grid grid-cols-4 gap-6">
                    {firstFourProducts.map((product, index) => (
                        <div className="bg-white shadow rounded overflow-hidden group" key={index}>
                            <div className="relative h-60 w-full">
                                <Image
                                    src={product?.thumbnail}
                                    alt={product?.title}
                                    className="w-full h-full object-cover"
                                    fill
                                />
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center
                                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
                                >
                                    <Link
                                        href="#"
                                        className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                        title="view product"
                                    >
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </Link>
                                    <WishListButton productId={product?._id.toString()} userId={userData?._id.toString()} session={session}/>
                                </div>
                            </div>
                            <div className="pt-4 pb-3 px-4">
                                <Link href={`/products/${product?._id}`}>
                                    <h4 className="uppercase font-medium text-base mb-2 text-gray-800 hover:text-primary transition">
                                        {product?.title}
                                    </h4>
                                </Link>
                                <div className="flex items-baseline mb-1 space-x-2">
                                    <p className="text-xl text-primary font-semibold">
                                        ${product?.price}
                                    </p>
                                    <p className="text-sm text-gray-400 line-through">
                                        ${(product?.price + (product?.price * product?.discountPercentage / 100)).toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex gap-1 text-sm text-yellow-400">
                                        {
                                            Array.from({length: 5}, (_, i) => (
                                                <span key={i}>
                                                        <i className={`fa-solid fa-star${i < Math.round(product.rating) ? '' : '-half-alt'}`}></i>
                                                    </span>
                                            ))
                                        }
                                    </div>
                                    <div className="text-xs text-gray-500 ml-3">
                                        ({product.rating})
                                    </div>
                                </div>
                            </div>
                            <AddToCart dictionary={dictionary} productId={product?._id.toString()} userId={userData?._id.toString()} session={session}/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}