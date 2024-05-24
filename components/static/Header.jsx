import Link from "next/link";
import Image from "next/image";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LanguageSwitcher from "@/components/static/LanguageSwitcher";

export default function Header({ dictionary }) {
    return (
        <>
            <header className="py-4 shadow-sm bg-white">
                <div className="container flex items-center justify-between">
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            className="w-32"
                            width={32}
                            height={32}
                        />
                    </Link>

                    <div className="w-full max-w-xl relative flex">
                        <span className="absolute left-4 top-3 text-lg text-gray-400">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
                            placeholder={dictionary?.search}
                        />
                        <button className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex">
                            {dictionary?.search}
                        </button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            href="/wishlist"
                            className="text-center text-gray-700 hover:text-primary transition relative"
                        >
                            <div className="text-2xl">
                                <i className="fa-regular fa-heart"></i>
                            </div>
                            <div className="text-xs leading-3">
                                {dictionary?.wishlist}
                            </div>
                            <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                                8
                            </div>
                        </Link>
                        <Link
                            href="/checkout"
                            className="text-center text-gray-700 hover:text-primary transition relative"
                        >
                            <div className="text-2xl">
                                <i className="fa-solid fa-bag-shopping"></i>
                            </div>
                            <div className="text-xs leading-3">
                                {dictionary?.cart}
                            </div>
                            <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                                2
                            </div>
                        </Link>
                        <Link
                            href="/account"
                            className="text-center text-gray-700 hover:text-primary transition relative"
                        >
                            <div className="text-2xl">
                                <i className="fa-regular fa-user"></i>
                            </div>
                            <div className="text-xs leading-3">
                                {dictionary?.account}
                            </div>
                        </Link>
                        <LanguageSwitcher />
                    </div>
                </div>
            </header>
        </>
    );
}