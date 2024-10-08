import { getProductsByCategory } from "@/database/queries";
import Products from "@/components/products/Products";

export const metadata = {
    title: "Category"
}

export default async function CategoryPage({ params }) {
    const categoryName = params.categoryName;
    const products = await getProductsByCategory(categoryName);
    return (
        <>
            <Products products={products} />
        </>
    );
}