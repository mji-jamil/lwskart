
import Image from "next/image";
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { auth } from "@/auth";
import Logout from "@/components/auth/Logout";
import ProductNav from "@/components/static/ProductNav";

export default async function Navbar({ dictionary }) {
    const session = await auth();

    return (
        <>
            <nav className="bg-gray-800">
                <div className="container flex">
                    <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
                        <span className="text-white">
                            <i className="fa-solid fa-bars"></i>
                        </span>
                        <span className="capitalize ml-2 text-white">
                            {dictionary?.all_categories}
                        </span>
                        <div
                            className="absolute left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible w-[600px]"
                            style={{ width: "300px" }}
                        >
                            <Link
                                href="/category/electronics"
                                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                            >
                                <Image
                                    src="/icons/electronics.png"
                                    alt="electronics"
                                    className="w-5 h-5 object-contain"
                                    width={24}
                                    height={24}
                                />
                                <span className="ml-6 text-gray-600 text-sm">
                                    {dictionary?.electronics}
                                </span>
                            </Link>
                            <Link
                                href="/category/skincare"
                                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                            >
                                <Image
                                    src="/icons/skincare.png"
                                    alt="skincare"
                                    className="w-5 h-5 object-contain"
                                    width={24}
                                    height={24}
                                />
                                <span className="ml-6 text-gray-600 text-sm">
                                    {dictionary?.skincare}
                                </span>
                            </Link>
                            <Link
                                href="/category/furniture"
                                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                            >
                                <Image
                                    src="/icons/furniture.png"
                                    alt="furniture"
                                    className="w-5 h-5 object-contain"
                                    height={24}
                                    width={24}
                                />
                                <span className="ml-6 text-gray-600 text-sm">
                                    {dictionary?.furniture}
                                </span>
                            </Link>
                            <Link
                                href="/category/dress"
                                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                            >
                                <Image
                                    src="/icons/dress.png"
                                    alt="dress"
                                    width={24}
                                    height={24}
                                    className="w-5 h-5 object-contain"
                                />
                                <span className="ml-6 text-gray-600 text-sm">
                                    {dictionary?.dresses}
                                </span>
                            </Link>
                            <Link
                                href="/category/shoe"
                                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                            >
                                <Image
                                    src="/icons/shoe.png"
                                    alt="Shoe"
                                    height={24}
                                    width={24}
                                    className="w-5 h-5 object-contain"
                                />
                                <span className="ml-6 text-gray-600 text-sm">
                                    {dictionary?.shoes}
                                </span>
                            </Link>
                            <Link
                                href="/category/watches"
                                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                            >
                                <Image
                                    src="/icons/watch.png"
                                    alt="watch"
                                    height={24}
                                    width={24}
                                    className="w-5 h-5 object-contain"
                                />
                                <span className="ml-6 text-gray-600 text-sm">
                                    {dictionary?.watches}
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
                        <div className="flex items-center space-x-6 capitalize">
                            <Link
                                href="/"
                                className="text-gray-200 hover:text-white transition"
                            >
                                {dictionary?.home}
                            </Link>
                            <ProductNav dictionary={dictionary}/>
                            <Link
                                href="/about"
                                className="text-gray-200 hover:text-white transition"
                            >
                                {dictionary?.about_us}
                            </Link>
                            <Link
                                href="/contact"
                                className="text-gray-200 hover:text-white transition"
                            >
                                {dictionary?.contact_us}
                            </Link>
                        </div>
                        {session?.user ? (
                            <>
                                <div>
                                    <span className="text-gray-200 hover:text-white transition">
                                        {session.user?.name}
                                    </span>
                                    <span className="text-white"> | </span>
                                    <span className="text-gray-200 hover:text-white transition">
                                        {" "}
                                        <Logout dictionary={dictionary} />
                                    </span>
                                </div>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="text-gray-200 hover:text-white transition"
                            >
                                {dictionary?.login}
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}