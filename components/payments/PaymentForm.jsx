"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentForm({ subtotal, userId, products }) {
    console.log(subtotal);
    console.log(userId);
    const productId = products.map((product) => product.toString());
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(e.target);
        const creditCard = formData.get("creditCard");
        const expiry = formData.get("expiry");
        const cvv = formData.get("cvv");

        if (!creditCard || !expiry || !cvv) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const response = await fetch("/api/payments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId, products: productId, totalPrice: subtotal })
            });

            console.log(response);

            if (response.status === 201) {
                router.push("/checkout/payment/success");
            } else {
                setError("Failed to create order. Please try again.");
            }
        } catch (error) {
            console.error("Error processing payment:", error);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="contain py-16">
                <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                    <h2 className="text-2xl uppercase font-medium mb-1">
                        Payment Details
                    </h2>
                    {error && (
                        <div className="text-xl text-red-500 text-center">
                            {error}
                        </div>
                    )}
                    <form onSubmit={onSubmit} autoComplete="on">
                        <div className="space-y-2">
                            <div>
                                <label
                                    htmlFor="creditCard"
                                    className="text-gray-600 mb-2 block"
                                >
                                    Credit Card Number
                                </label>
                                <input
                                    type="text"
                                    name="creditCard"
                                    id="creditCard"
                                    inputMode="numeric"
                                    autoComplete="cc-number"
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="40**-****-****-****"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="expiry"
                                    className="text-gray-600 mb-2 block"
                                >
                                    Expiry
                                </label>
                                <input
                                    type="text"
                                    name="expiry"
                                    id="expiry"
                                    inputMode="numeric"
                                    autoComplete="cc-exp"
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder="MM/YY"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="cvv"
                                    className="text-gray-600 mb-2 block"
                                >
                                    CVV
                                </label>
                                <input
                                    type="text"
                                    name="cvv"
                                    id="cvv"
                                    inputMode="numeric"
                                    autoComplete="cc-csc"
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="toPay"
                                    className="text-gray-600 mb-2 block"
                                >
                                    To Pay
                                </label>
                                <input
                                    type="text"
                                    name="toPay"
                                    id="toPay"
                                    value={subtotal}
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    readOnly
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className={`block w-full py-2 text-center text-white bg-primary border border-primary rounded transition uppercase font-roboto font-medium ${
                                    loading ? "cursor-not-allowed" : "hover:bg-transparent hover:text-primary"
                                }`}
                                disabled={loading}
                            >
                                {loading ? "Processing..." : "Pay Now"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}