import PaymentSuccess from "@/components/payments/PaymentSuccess";
import {getDictionary} from "@/app/[lang]/dictionaries";
import {auth} from "@/auth";
import {getOrderById, getProductById, getUserData} from "@/database/queries";

export default async function Page({params: {lang}}) {
    const dictionary = await getDictionary(lang);
    const session = await auth();
    const userData = await getUserData(session?.user?.email);
    const userId = userData?._id.toString();

    let products = [];
    let orderDetails = null
    if (userData?.orders.length > 0) {
        const lastOrderId = userData.orders[userData.orders.length - 1];
        orderDetails = await getOrderById(lastOrderId);

        if (orderDetails && orderDetails.products.length > 0) {
            products = await Promise.all(
                orderDetails.products.map(async (productId) => {
                    return await getProductById(productId.toString());
                })
            );
        }
    }

    // console.log(products);

    return (
        <>
            <PaymentSuccess products={products}/>
        </>
    );
}