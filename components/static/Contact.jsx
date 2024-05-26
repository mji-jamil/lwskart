"use client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";

export default function Contact() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleMessage(event) {
        event.preventDefault();
        setError("");
        setSuccess("");

        const formData = new FormData(event.currentTarget);
        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        try {
            const res = await fetch("/api/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (res.status === 201) {
                setSuccess("Thanks for your message or feedback");
                event.target.reset();
            } else {
                const errorData = await res.text();
                setError(errorData);
            }
        } catch (error) {
            setError("An unexpected error occurred. Please try again later.");
        }
    }

    return (
        <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
                    Contact Us
                </h1>
                <p className="text-gray-600 text-lg text-center mb-12">
                    Get in touch with us for any queries, support, or feedback.
                    We are here to help you.
                </p>
                <div className="flex flex-wrap items-center justify-center -mx-4 mb-12">
                    <div className="w-full lg:w-1/2 px-4">
                        <div className="bg-white p-8 rounded shadow-lg">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Send us a Message
                            </h2>
                            {error && (
                                <div className="text-xl text-red-500 text-center">
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="text-xl text-green-500 text-center">
                                    {success}
                                </div>
                            )}
                            <form onSubmit={handleMessage}>
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-600 mb-2"
                                        htmlFor="name"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-600 mb-2"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-600 mb-2"
                                        htmlFor="message"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-200"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Our Contact Information
                    </h2>
                    <p className="text-gray-600 mb-4">
                        <i className="fa-solid fa-phone text-red-600"></i> +123
                        456 7890
                    </p>
                    <p className="text-gray-600 mb-4">
                        <i className="fa-solid fa-envelope text-red-600"></i>{" "}
                        support@lwskart.com
                    </p>
                    <p className="text-gray-600">
                        <i className="fa-solid fa-map-marker-alt text-red-600"></i>{" "}
                        123 LWSkart St, eCommerce City, EC
                    </p>
                </div>
            </div>
        </section>
    );
}