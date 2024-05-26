import { getProducts } from "@/database/queries";
import Products from "@/components/products/Products";
import ProductNotFound from "@/components/products/ProductNotFound";
import { getDictionary } from "@/app/[lang]/dictionaries";

export default async function Page({ params: { lang }, searchParams }) {
    const dictionary = await getDictionary(lang);
    const { query, categories, min, max } = searchParams;

    if (categories && categories.includes(",")) {
        const categoryList = categories.split(",");
        let products = [];
        for (const category of categoryList) {
            const categoryProducts = await getProducts({
                query,
                categories: category.trim(),
                min,
                max,
            });
            products = products.concat(categoryProducts);
        }
        return (
            <>
                {products.length > 0 ? (
                    <Products products={products} dictionary={dictionary} />
                ) : (
                    <ProductNotFound dictionary={dictionary} />
                )}
            </>
        );
    } else {
        const products = await getProducts({ query, categories, min, max });
        return (
            <>
                {products.length > 0 ? (
                    <Products products={products} dictionary={dictionary} />
                ) : (
                    <ProductNotFound dictionary={dictionary} />
                )}
            </>
        );
    }
}