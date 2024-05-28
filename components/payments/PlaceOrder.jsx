"use client"
import { useState } from "react";
import Link from "next/link";

export default function PlaceOrder() {
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleTermsChange = (e) => {
        setAgreedToTerms(e.target.checked);
    };

    function payment() {
        window.location.href = "/checkout/payment"
    }

    return (
        <>
            <div className="flex items-center mb-4 mt-2">
                <input
                    type="checkbox"
                    name="agreement"
                    id="agreement"
                    className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
                    onChange={handleTermsChange}
                />
                <label
                    htmlFor="agreement"
                    className="text-gray-600 ml-3 cursor-pointer text-sm"
                >
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary">
                        terms & conditions
                    </Link>
                </label>
            </div>

            <Link
                href={agreedToTerms ? "/checkout/payment" : "#"}
                className={`block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md ${
                    agreedToTerms ? "hover:bg-transparent hover:text-primary transition" : "opacity-50 cursor-not-allowed"
                } transition font-medium`}
                onClick={payment}
            >
                Place order
            </Link>
        </>
    );
}