import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import Image from "next/image";

export default function WishList() {
    return (
        <>
            <div className="container py-4 flex items-center gap-3">
                <Link href="/" className="text-primary text-base">
                    <i className="fa-solid fa-house"></i>
                </Link>
                <span className="text-sm text-gray-400">
                    <i className="fa-solid fa-chevron-right"></i>
                </span>
                <p className="text-gray-600 font-medium">Profile</p>
            </div>

            <div className="container gap-6 pt-4 pb-16">
                <div className="mx-auto space-y-4 max-w-6xl">
                    <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
                        <div className="w-28">
                            <Image
                                src="/products/product6.jpg"
                                alt="product 6"
                                className="w-full"
                                width={120}
                                height={120}
                            />
                        </div>
                        <div className="w-1/3">
                            <h2 className="text-gray-800 text-xl font-medium uppercase">
                                Italian L shape
                            </h2>
                            <p className="text-gray-500 text-sm">
                                Availability:{" "}
                                <span className="text-green-600">In Stock</span>
                            </p>
                        </div>
                        <div className="text-primary text-lg font-semibold">
                            $320.00
                        </div>
                        <a
                            href="#"
                            className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                        >
                            add to cart
                        </a>

                        <div className="text-gray-600 cursor-pointer hover:text-primary">
                            <i className="fa-solid fa-trash"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}