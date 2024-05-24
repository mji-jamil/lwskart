import Products from "@/components/products/Products";
import {getAllProducts} from "@/database/queries";
import {getDictionary} from "@/app/[lang]/dictionaries";

export default async function Page({params: {lang}}) {
    const products = await getAllProducts();
    const dictionary = await getDictionary(lang);
    return (
        <>
            <Products products={products} dictionary={dictionary}/>
        </>
    );
}