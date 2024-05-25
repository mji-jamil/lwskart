"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateData } from "@/database/queries";

export default function UpdateProfile({ user }) {
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        // password: user?.password || "",
        phoneNumber: user?.phoneNumber || "",
    });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formDataObject = Object.fromEntries(new FormData(e.target).entries());

        try {
            const response = await updateData(formDataObject);
            if (response.error) {
                setError(response.error.message);
            } else {
                router.push("/account");
            }
        } catch (err) {
            setError("An error occurred while updating profile.");
            console.error("Error updating profile:", err);
        }
    };


    return (
        <div className="contain py-16">
            <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                <h2 className="text-2xl uppercase font-medium mb-1">Update Profile</h2>
                {error && <div className="text-xl text-red-500 text-center">{error}</div>}
                <form onSubmit={onSubmit} autoComplete="off">
                    <div className="space-y-2">
                        <div>
                            <label htmlFor="name" className="text-gray-600 mb-2 block">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData?.name}
                                onChange={handleChange}
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder="Full Name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-gray-600 mb-2 block">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData?.email}
                                onChange={handleChange}
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder="youremail.@domain.com"
                                required
                                readOnly
                            />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="text-gray-600 mb-2 block">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                value={formData?.phoneNumber}
                                onChange={handleChange}
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder="+880**-********"
                            />
                        </div>
                        {/*<div>*/}
                        {/*    <label htmlFor="password" className="text-gray-600 mb-2 block">*/}
                        {/*        Password*/}
                        {/*    </label>*/}
                        {/*    <input*/}
                        {/*        type="password"*/}
                        {/*        name="password"*/}
                        {/*        id="password"*/}
                        {/*        value={formData?.password}*/}
                        {/*        onChange={handleChange}*/}
                        {/*        className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"*/}
                        {/*        placeholder="*******"*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}