import CheckOut from "@/components/payments/CheckOut";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { auth } from "@/auth";
import { getProductById, getUserData } from "@/database/queries";
import Link from "next/link";
import Cart from "@/components/profile/Cart";
import CartHeader from "@/components/profile/CartHeader";

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
        <div className="container py-4">
            <CartHeader />
            <Cart cart={cart} userId={userId}/>
        </div>
    );
}