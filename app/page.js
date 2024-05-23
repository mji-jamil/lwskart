import Banner from "@/components/static/Banner";
import Feature from "@/components/static/Feature";
import Category from "@/components/category/Category";
import NewArrival from "@/components/products/NewArrival";
import Ads from "@/components/static/Ads";
import TrendingProducts from "@/components/products/TrendingProducts";
import {getNewArrivals, getTrendingProducts} from "@/database/queries";

export default async function Home() {
    const newArrival = await getNewArrivals();
    const trending = await getTrendingProducts()
    return (
        <div>
            <Banner />
            <Feature />
            <Category />
            <NewArrival newArrival={newArrival} />
            <Ads />
            <TrendingProducts trending={trending}/>
        </div>
    );
}