import SingleProduct from "@/components/products/SingleProduct";
import { getProductById } from "@/database/queries";

export async function generateMetadata({ params, searchParams }, parent) {
    const id = params.id;

    const product = await getProductById(id);

    return {
        title: product?.title.slice(0, 100),
        description: product?.description.slice(0, 100),
        openGraph: {
            type: "website",
            url: `/products/${id}`,
            title: product?.title,
            description: product?.description,
            images: [
                {
                    url: product?.thumbnail,
                    width: 1200,
                    height: 600,
                    alt: product?.title || "Product Image",
                },
            ],
            site_name: "LWS Kart",
        },
    };
}

export default async function Page({ params }) {
    const id = params.id;
    let product = await getProductById(id);

    return (
        <>
            <SingleProduct product={product} />
        </>
    );
}