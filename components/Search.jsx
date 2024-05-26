"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Search({ dictionary }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const handleInput = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    };

    const doSearch = (e) => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("query", searchTerm);
        if (pathname.includes("products")) {
            router.replace(`${pathname}?${newParams.toString()}`);
        } else {
            router.replace(`${pathname}/products?${newParams.toString()}`);
        }
    };

    return (
        <>
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
                    onChange={handleInput}
                />
                <button
                    className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex"
                    onClick={doSearch}
                >
                    {dictionary?.search}
                </button>
            </div>
        </>
    );
}