"use client";
import Link from "next/link";
import Image from "next/image";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LanguageSwitcher from "@/components/static/LanguageSwitcher";
import Search from "@/components/Search";

export default function Header({ dictionary, wishListCount, cartCount }) {
    function onClickWishList() {
        window.location.href = "/wishlist";
    }

    function onClickHomePage() {
        window.location.href = "/";
    }

    return (
        <>
            <header className="py-4 shadow-sm bg-white">
                <div className="container flex items-center justify-between">
                    <Link href="/" onClick={onClickHomePage}>
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            className="w-32"
                            width={32}
                            height={32}
                        />
                    </Link>

                    <Search dictionary={dictionary} />

                    <div className="flex items-center space-x-4">
                        <Link
                            href="/wishlist"
                            className="text-center text-gray-700 hover:text-primary transition relative"
                            onClick={onClickWishList}
                        >
                            <div className="text-2xl">
                                <i className="fa-regular fa-heart"></i>
                            </div>
                            <div className="text-xs leading-3">
                                {dictionary?.wishlist}
                            </div>

                            {wishListCount === "" ? (
                                ""
                            ) : (
                                <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                                    {wishListCount}
                                </div>
                            )}
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
                            {cartCount === "" ? (
                                ""
                            ) : (
                                <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                                    {cartCount}
                                </div>
                            )}
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