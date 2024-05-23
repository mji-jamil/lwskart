import SingleProduct from "@/components/products/SingleProduct";
import { getProductById } from "@/database/queries";

export default async function Page({ params }) {
    const id = params.id;
    let product = await getProductById(id);

    return (
        <>
            <SingleProduct product={product} />
        </>
    );
}