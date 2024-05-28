import Link from "next/link";

export default  function CheckOutAddress({userData}) {
    return (
        <>
            <div className="col-span-8 border border-gray-200 p-4 rounded">
                <h3 className="text-lg font-medium capitalize mb-4">
                    Checkout
                </h3>
                <Link href={"/update/shipping"}>Update Shipping address here...</Link>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="text-gray-600">
                            Name <span className="text-primary">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="input-box"
                            value={userData?.shippingAddress?.name}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="address" className="text-gray-600">
                            Street address
                        </label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            className="input-box"
                            value={userData?.shippingAddress?.address}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="postCode" className="text-gray-600">
                            Post Code
                        </label>
                        <input
                            type="text"
                            name="postCode"
                            id="postCode"
                            className="input-box"
                            value={userData?.shippingAddress?.postCode}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="text-gray-600">
                            Phone number
                        </label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            className="input-box"
                            value={userData?.shippingAddress?.phoneNumber}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-gray-600">
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="input-box"
                            value={userData?.email}
                            required
                        />
                    </div>
                </div>
            </div>
        </>
    );
}