import WishList from "@/components/profile/WishList";
import { auth } from "@/auth";
import { getProductById, getUserData } from "@/database/queries";
import Link from "next/link";
import { getDictionary } from "@/app/[lang]/dictionaries";

export default async function Page({ params: { lang } }) {
    const dictionary = await getDictionary(lang);
    const session = await auth();
    const userData = await getUserData(session?.user?.email);
    const userId = userData?._id.toString();

    let wishListProducts = [];
    if (userData?.wishlist.length > 0) {
        wishListProducts = await Promise.all(
            userData.wishlist.map(async (productId) => {
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
                <Link href={"/products"}>
                    <p className="text-gray-600 font-medium">Shop</p>
                </Link>
            </div>
            <WishList
                wishListProducts={wishListProducts}
                dictionary={dictionary}
                userId={userId}
            />
        </>
    );
}