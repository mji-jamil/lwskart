import CheckOut from "@/components/payments/CheckOut";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { auth } from "@/auth";
import { getProductById, getUserData } from "@/database/queries";
import Link from "next/link";

export default async function CheckOutPage({ params: { lang } }) {
    const dictionary = await getDictionary(lang);
    const session = await auth();
    const userData = await getUserData(session?.user?.email);
    const userId = userData?._id.toString();

    let cart = [];
    if (userData?.cart.length > 0) {
        cart = await Promise.all(
            userData.cart.map(async (productId) => {
                return await getProductById(productId.toString());
            }),
        );
    }

    return (
        <>
            <div className="container py-4 flex items-center gap-3">
                <Link href="/" className="text-primary text-base">
                    <i className="fa-solid fa-house"></i>
                </Link>
                <span className="text-sm text-gray-400">
                    <i className="fa-solid fa-chevron-right"></i>
                </span>
                <p className="text-gray-600 font-bold">Checkout</p>
            </div>
            <CheckOut cart={cart} />
        </>
    );
}