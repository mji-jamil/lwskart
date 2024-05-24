"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/actions";
import SocialLogin from "@/components/auth/SocialLogin";
import Link from "next/link";

export default function Login({dictionary}) {
    const [error, setError] = useState("");
    const router = useRouter();

    async function onSubmit(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);

            const response = await login(formData);
            if (!!response.error) {
                setError(response.error.message);
            } else {
                router.push("/account");
            }
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <>
            <div className="contain py-16">
                <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                    <h2 className="text-2xl uppercase font-medium mb-1">
                        {dictionary?.login}
                    </h2>
                    <p className="text-gray-600 mb-6 text-sm">
                        {dictionary?.welcome}
                    </p>
                    {error && (
                        <div className="text-xl text-red-500 text-center">
                            {error}
                        </div>
                    )}
                    <form
                        action="#"
                        method="post"
                        autoComplete="off"
                        onSubmit={onSubmit}
                    >
                        <div className="space-y-2">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-gray-600 mb-2 block"
                                >
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="youremail.@domain.com"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="text-gray-600 mb-2 block"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="*******"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    id="remember"
                                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                />
                                <label
                                    htmlFor="remember"
                                    className="text-gray-600 ml-3 cursor-pointer"
                                >
                                    {dictionary?.remember}
                                </label>
                            </div>
                            <a href="#" className="text-primary">
                                {dictionary?.forgot}
                            </a>
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                            >
                                {dictionary?.login}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 flex justify-center relative">
                        <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
                            {dictionary?.or_login}
                        </div>
                        <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
                    </div>
                    <SocialLogin />

                    <p className="mt-4 text-center text-gray-600">
                        {dictionary?.do_account}?{" "}
                        <Link href="/register" className="text-primary">
                            {dictionary?.register}
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}