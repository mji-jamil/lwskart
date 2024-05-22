import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/static/Navbar";
import Header from "@/components/static/Header";
import Footer from "@/components/static/Footer";
import Copyright from "@/components/static/Copyright";

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

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${poppins.variable} ${roboto.variable}`}>
                <Header />
                <Navbar />
                {children}
                <Footer />
                <Copyright />
            </body>
        </html>
    );
}