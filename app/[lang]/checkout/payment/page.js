import PaymentForm from "@/components/payments/PaymentForm";
import {getDictionary} from "@/app/[lang]/dictionaries";
import {auth} from "@/auth";
import {getProductById, getUserData} from "@/database/queries";

export const metadata = {
    title: "Payment"
}

export default async function PaymentPage({params: {lang}}) {
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
            <PaymentForm subtotal={subtotal} userId={userId} products={userData?.cart}/>
        </>
    );
}