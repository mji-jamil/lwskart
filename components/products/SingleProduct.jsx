import Image from "next/image";
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.min.css";
import RelatedProducts from "@/components/products/RelatedProducts";

export default function SingleProduct({ product, dictionary }) {
    return (
        <>
            <div className="container py-4 flex items-center gap-3">
                <Link href="#" className="text-primary text-base">
                    <i className="fa-solid fa-house"></i>
                </Link>
                <span className="text-sm text-gray-400">
                    <i className="fa-solid fa-chevron-right"></i>
                </span>
                <p className="text-gray-600 font-medium">{dictionary?.product}</p>
            </div>
            <div className="container grid grid-cols-2 gap-6 mb-8">
                <div className="h-100">
                    <Image
                        src={product?.thumbnail}
                        alt={product?.title || "Product Image"}
                        className="w-full"
                        width={300}
                        height={120}
                    />
                    <div className="grid grid-cols-5 gap-4 mt-4">
                        {product?.images.map((image, i) => (
                            <div
                                key={i}
                                className="w-24 h-24 border border-primary overflow-hidden"
                            >
                                <Image
                                    src={image}
                                    alt={`Product Image ${i + 1}`}
                                    className="w-full h-full object-cover cursor-pointer"
                                    width={120}
                                    height={120}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-medium uppercase mb-2">
                        {product?.title}
                    </h2>
                    <div className="flex items-center mb-4">
                        <div className="flex gap-1 text-sm text-yellow-400">
                            {Array.from({ length: 5 }, (_, i) => (
                                <span key={i}>
                                    <i
                                        className={`fa-solid fa-star${i < Math.round(product.rating) ? "" : "-half-alt"}`}
                                    ></i>
                                </span>
                            ))}
                        </div>
                        <div className="text-xs text-gray-500 ml-3">
                            ({`${product?.review}`} Reviews)
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-gray-800 font-semibold space-x-2">
                            <span>
                                {dictionary?.availability}:{" "}
                                {product?.stock > 0 ? (
                                    <span className="text-green-600">
                                        {dictionary?.in_stock}
                                    </span>
                                ) : (
                                    <span className="text-red-600">
                                        {dictionary?.out_stock}
                                    </span>
                                )}
                            </span>
                        </p>
                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">
                                {dictionary?.brand}:{" "}
                            </span>
                            <span className="text-gray-600">
                                {product?.brand}
                            </span>
                        </p>
                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">
                                {dictionary?.category}:{" "}
                            </span>
                            <span className="text-gray-600">
                                {product?.category}
                            </span>
                        </p>
                    </div>
                    <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                        <p className="text-xl text-primary font-semibold">
                            $
                            {(
                                product?.price -
                                (product?.price * product?.discountPercentage) /
                                100
                            ).toFixed(2)}
                        </p>
                        <p className="text-base text-gray-400 line-through">
                            ${product?.price}
                        </p>
                    </div>

                    <p className="mt-4 text-gray-600">{product?.description}</p>

                    <div className="mt-4">
                        <h3 className="text-sm text-gray-800 uppercase mb-1">
                            {dictionary?.quantity}
                        </h3>
                        <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                            <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                                -
                            </div>
                            <div className="h-8 w-8 text-base flex items-center justify-center">
                                4
                            </div>
                            <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                                +
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                        <a
                            href="#"
                            className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
                        >
                            <i className="fa-solid fa-bag-shopping"></i> {dictionary?.add_to_cart}
                        </a>
                        <a
                            href="#"
                            className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"
                        >
                            <i className="fa-solid fa-heart"></i> {dictionary?.wishlist}
                        </a>
                    </div>

                    <div className="flex gap-3 mt-4">
                        <a
                            href="#"
                            className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                        >
                            <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                        >
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                        <a
                            href="#"
                            className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                        >
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
            <hr />
            <div className="mt-8">
                <RelatedProducts category={product?.category} dictionary={dictionary} />
            </div>
        </>
    );
}