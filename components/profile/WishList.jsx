import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";
import AddToCart from "@/components/buttons/AddToCart";
import DeleteItemFromWishList from "@/components/buttons/DeleteItemFromWishList";


export default async function WishList({ product, dictionary, userId }) {

    return (
        <>
            <div className="container gap-6 pt-4 pb-16">
                <div className="mx-auto space-y-4 max-w-6xl">
                    <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
                        <div className="w-28">
                            <Image
                                src={product?.thumbnail}
                                alt={product?.title}
                                className="w-full"
                                width={120}
                                height={120}
                            />
                        </div>
                        <div className="w-1/3">
                            <h2 className="text-gray-800 text-xl font-medium uppercase">
                                {product?.title}
                            </h2>
                            <p className="text-gray-500 text-sm">
                                Availability:{" "}
                                {product?.stock > 0 ? (
                                    <span className="text-green-600">
                                        {dictionary?.in_stock}
                                    </span>
                                ) : (
                                    <span className="text-red-600">
                                        {dictionary?.out_stock}
                                    </span>
                                )}
                            </p>
                        </div>
                        <div className="text-primary text-lg font-semibold">
                            $
                            {(
                                product?.price -
                                (product?.price * product?.discountPercentage) /
                                100
                            ).toFixed(2)}
                        </div>

                        <div className="max-w-xs mx-auto p-3">

                            <AddToCart
                                dictionary={dictionary}
                                productId={product?._id.toString()}
                                userId={userId.toString()}
                                className="w-full"
                                disabled={!(product?.stock > 0)}
                            />
                        </div>
                        <DeleteItemFromWishList productId={product?._id.toString()} userId={userId.toString()} />
                    </div>
                </div>
            </div>
        </>
    );
}