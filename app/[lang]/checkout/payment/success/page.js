import PaymentSuccess from "@/components/payments/PaymentSuccess";
import {getDictionary} from "@/app/[lang]/dictionaries";
import {auth} from "@/auth";
import {getProductById, getUserData} from "@/database/queries";

export default async function Page({params: {lang}}) {
    const dictionary = await getDictionary(lang);
    const session = await auth();
    const userData = await getUserData(session?.user?.email);
    const userId = userData?._id.toString();

    let products = [];
    // if (userData?.cart.length > 0) {
    //     products = await Promise.all(
    //         userData.cart.map(async (productId) => {
    //             return await getProductById(productId.toString());
    //         }),
    //     );
    // }
    return (
        <>
            <PaymentSuccess />
        </>
    );
}