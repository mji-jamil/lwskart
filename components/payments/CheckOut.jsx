import Link from "next/link";
import CheckOutAddress from "@/components/payments/CheckOutAddress";
import { auth } from "@/auth";
import { getUserData } from "@/database/queries";
import PlaceOrder from "@/components/payments/PlaceOrder";
import { redirect } from "next/navigation";

export default async function CheckOut({ cart }) {
    const session = await auth();
    if (!session) {
        redirect("/login");
    }
    const userData = await getUserData(session?.user?.email);
    const calculateDiscountedPrice = (price, discountPercentage) => {
        return price * (1 - discountPercentage / 100);
    };
    const aggregatedCart = cart?.reduce((acc, product) => {
        const productData = product._doc || product;
        const existingProduct = acc.find(
            (item) => item._id.toString() === productData._id.toString(),
        );

        const discountedPrice = calculateDiscountedPrice(
            productData.price,
            productData.discountPercentage,
        );
        if (existingProduct) {
            existingProduct.quantity += 1;
            existingProduct.totalPrice += discountedPrice;
        } else {
            acc.push({
                ...productData,
                quantity: 1,
                totalPrice: discountedPrice,
            });
        }
        return acc;
    }, []);
    const subtotal = aggregatedCart?.reduce(
        (sum, product) => sum + product.totalPrice,
        0,
    );
    const isCartEmpty = cart.length === 0;
    return (
        <>
            <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
                <CheckOutAddress userData={userData} />

                <div className="col-span-4 border border-gray-200 p-4 rounded">
                    <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
                        order summary
                    </h4>
                    <div className="space-y-2">
                        {aggregatedCart?.map((product) => (
                            <div
                                className="flex justify-between"
                                key={product?._id}
                            >
                                <div>
                                    <h5 className="text-gray-800 font-bold">
                                        {product?.title}
                                    </h5>
                                </div>
                                <p className="text-gray-600">
                                    x{product?.quantity}
                                </p>
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

                    {!isCartEmpty && <PlaceOrder />}
                    {isCartEmpty && (
                        <button
                            className="bg-gray-300 text-white px-4 py-2 rounded cursor-not-allowed"
                            disabled
                        >
                            Place Order
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}