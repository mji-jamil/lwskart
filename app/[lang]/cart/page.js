import { getDictionary } from "@/app/[lang]/dictionaries";
import { auth } from "@/auth";
import { getProductById, getUserData } from "@/database/queries";
import Cart from "@/components/profile/Cart";
import CartHeader from "@/components/profile/CartHeader";

export const metadata = {
    title: "Cart"
}

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
            <CartHeader cart={cart} dictionary={dictionary} />
            <Cart cart={cart} userId={userId} dictionary={dictionary} />
        </div>
    );
}