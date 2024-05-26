import Banner from "@/components/static/Banner";
import Feature from "@/components/static/Feature";
import Category from "@/components/category/Category";
import NewArrival from "@/components/products/NewArrival";
import Ads from "@/components/static/Ads";
import TrendingProducts from "@/components/products/TrendingProducts";
import { getNewArrivals, getTrendingProducts } from "@/database/queries";
import { getDictionary } from "@/app/[lang]/dictionaries";

export default async function Home({ params: { lang } }) {
    const newArrival = await getNewArrivals();
    const trending = await getTrendingProducts();
    const dictionary = await getDictionary(lang);
    return (
        <div>
            <Banner dictionary={dictionary} />
            <Feature dictionary={dictionary} />
            <Category dictionary={dictionary} />
            <NewArrival newArrival={newArrival} dictionary={dictionary} />
            <Ads />
            <TrendingProducts trending={trending} dictionary={dictionary} />
        </div>
    );
}