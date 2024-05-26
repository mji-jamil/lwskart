import { Poppins, Roboto } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/static/Navbar";
import Header from "@/components/static/Header";
import Footer from "@/components/static/Footer";
import Copyright from "@/components/static/Copyright";
import { dbConnect } from "@/service/mongo";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { auth } from "@/auth";
import { getUserData } from "@/database/queries";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
});
const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-roboto",
});

export const metadata = {
    title: "LWSkart",
    description:
        "LWSkart is your go-to eCommerce platform offering a wide range of products at unbeatable prices.",
};

export default async function RootLayout({ children, params: { lang } }) {
    await dbConnect();
    const dictionary = await getDictionary(lang);
    const session = await auth();
    let wishListCount = "";
    let cartCount = "";
    if (session) {
        const userData = await getUserData(session?.user?.email);
        wishListCount = userData?.wishlist.length;
        cartCount = userData?.cart.length;
    }

    return (
        <html lang="en">
            <body className={`${poppins.variable} ${roboto.variable}`}>
                <Header
                    dictionary={dictionary}
                    wishListCount={wishListCount}
                    cartCount={cartCount}
                />
                <Navbar dictionary={dictionary} />
                {children}
                <Footer dictionary={dictionary} />
                <Copyright dictionary={dictionary} />
            </body>
        </html>
    );
}