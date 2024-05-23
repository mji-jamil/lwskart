import Products from "@/components/products/Products";
import {getAllProducts} from "@/database/queries";

export default async function Page() {
    const products = await getAllProducts();

    return (
        <>
            <Products products={products}/>
        </>
    );
}