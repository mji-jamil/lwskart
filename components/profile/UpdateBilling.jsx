"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {updateBillingData, updateData, updateShippingData} from "@/database/queries";

export default function UpdateBilling({ user }) {
    const [formData, setFormData] = useState({
        name: user?.billingAddress?.name || "",
        phoneNumber: user?.billingAddress?.phoneNumber || "",
        billingAddress: user?.billingAddress?.address || "",
        postCode: user?.billingAddress?.postCode || "",
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

        const updatedData = {
            email: user.email,
            billingAddress: {
                name: formData.name,
                address: formData.billingAddress,
                postCode: formData.postCode,
                phoneNumber: formData.phoneNumber,
            }
        };

        try {
            const response = await updateBillingData(updatedData);
            if (response.error) {
                setError(response.error);
            } else {
                router.push("/account");
            }
        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <div className="contain py-16">
            <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                <h2 className="text-2xl uppercase font-medium mb-1">
                    Update Shipping
                </h2>
                {error && (
                    <div className="text-xl text-red-500 text-center">
                        {error}
                    </div>
                )}
                <form onSubmit={onSubmit} autoComplete="off">
                    <div className="space-y-2">
                        <div>
                            <label
                                htmlFor="name"
                                className="text-gray-600 mb-2 block"
                            >
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
                            <label
                                htmlFor="phoneNumber"
                                className="text-gray-600 mb-2 block"
                            >
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
                        <div>
                            <label
                                htmlFor="billingAddress"
                                className="text-gray-600 mb-2 block"
                            >
                                Address
                            </label>
                            <input
                                type="text"
                                name="billingAddress"
                                id="billingAddress"
                                value={formData?.billingAddress}
                                onChange={handleChange}
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder="711-2880 Nulla St. Mankato Mississippi"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="postCode"
                                className="text-gray-600 mb-2 block"
                            >
                                Post Code
                            </label>
                            <input
                                type="text"
                                name="postCode"
                                id="postCode"
                                value={formData?.postCode}
                                onChange={handleChange}
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder="99999"
                            />
                        </div>
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