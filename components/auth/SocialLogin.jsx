"use client"
import Link from "next/link";
import {signIn} from "next-auth/react";

export default function SocialLogin() {
    const handleGoogleAuth = (event) => {
        signIn("google", {
            callbackUrl: "http://localhost:3000/account",
        });
    };

    const handleFacebookAuth = (event) => {
        signIn("facebook", {
            callbackUrl: "http://localhost:3000/account",
        });
    };
    return (
        <>
            <div className="mt-4 flex gap-4">
                <button

                    className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700"
                    onClick={handleFacebookAuth}
                >
                    facebook
                </button>
                <button

                    className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500"
                    onClick={handleGoogleAuth}
                >
                    google
                </button>
            </div>
        </>
    );
}