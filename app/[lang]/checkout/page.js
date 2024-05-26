import CheckOut from "@/components/payments/CheckOut";
import {getDictionary} from "@/app/[lang]/dictionaries";
import {auth} from "@/auth";
import {getProductById, getUserData} from "@/database/queries";

export default async function CheckOutPage({params: {lang}}) {
    const dictionary = await getDictionary(lang);
    const session = await auth();
    const userData = await getUserData(session?.user?.email);
    const userId = userData?._id;

    let cart = [];
    if (userData?.wishlist.length > 0) {
        cart = await Promise.all(
            userData.wishlist.map(async (productId) => {
                return await getProductById(productId.toString());
            }),
        );
    }
    // console.log(cart);
    return (
        <>
            <CheckOut cart={cart}/>
        </>
    );
}