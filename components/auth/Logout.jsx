"use client";
import { signOut } from "next-auth/react";

export default function Logout({ dictionary }) {
    return (
        <>
            <button
                onClick={() =>
                    signOut({ callbackUrl: "http://localhost:3000/login" })
                }
            >
                {dictionary?.logout}
            </button>
        </>
    );
}