import Link from "next/link";
import CheckOutAddress from "@/components/payments/CheckOutAddress";
import {auth} from "@/auth";
import {getUserData} from "@/database/queries";

export default async function CheckOut({ cart }) {
    const session = await auth()
    const userData = await getUserData(session?.user?.email)
    const calculateDiscountedPrice = (price, discountPercentage) => {
        return price * (1 - discountPercentage / 100);
    };
    const aggregatedCart = cart?.reduce((acc, product) => {
        const productData = product._doc || product;
        const existingProduct = acc.find(item => item._id.toString() === productData._id.toString());

        const discountedPrice = calculateDiscountedPrice(productData.price, productData.discountPercentage);
        if (existingProduct) {
            existingProduct.quantity += 1;
            existingProduct.totalPrice += discountedPrice;
        } else {
            acc.push({
                ...productData,
                quantity: 1,
                totalPrice: discountedPrice
            });
        }
        return acc;
    }, []);
    const subtotal = aggregatedCart?.reduce((sum, product) => sum + product.totalPrice, 0);
    return (
        <>
            <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
                <CheckOutAddress userData={userData}/>

                <div className="col-span-4 border border-gray-200 p-4 rounded">
                    <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
                        order summary
                    </h4>
                    <div className="space-y-2">
                        {aggregatedCart?.map((product) => (
                            <div className="flex justify-between" key={product?._id}>
                                <div>
                                    <h5 className="text-gray-800 font-bold">
                                        {product?.title}
                                    </h5>
                                </div>
                                <p className="text-gray-600">x{product?.quantity}</p>
                                <p className="text-gray-800 font-medium">
                                    ${product?.totalPrice.toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                        <p>subtotal</p>
                        <p>${subtotal?.toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                        <p>shipping</p>
                        <p>Free</p>
                    </div>

                    <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
                        <p className="font-semibold">Total</p>
                        <p>${subtotal?.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center mb-4 mt-2">
                        <input
                            type="checkbox"
                            name="aggrement"
                            id="aggrement"
                            className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
                        />
                        <label
                            htmlFor="aggrement"
                            className="text-gray-600 ml-3 cursor-pointer text-sm"
                        >
                            I agree to the{" "}
                            <a href="#" className="text-primary">
                                terms & conditions
                            </a>
                        </label>
                    </div>

                    <Link
                        href={"/checkout/payment"}
                        className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
                    >
                        Place order
                    </Link>
                </div>
            </div>
        </>
    );
}