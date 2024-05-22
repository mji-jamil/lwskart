import Banner from "@/components/static/Banner";
import Feature from "@/components/static/Feature";
import Category from "@/components/category/Category";
import NewArrival from "@/components/products/NewArrival";
import Ads from "@/components/static/Ads";
import TrendingProducts from "@/components/products/TrendingProducts";

export default function Home() {
    return (
        <div>
            <Banner />
            <Feature />
            <Category />
            <NewArrival />
            <Ads />
            <TrendingProducts />
        </div>
    );
}