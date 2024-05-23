import Image from "next/image";
import Link from "next/link";

export default function Category({dictionary}) {
    return (
        <>
            <div className="container py-16">
                <h2 className="text-2xl text-gray-800 uppercase mb-6 font-bold font-roboto">
                    {dictionary?.shop_by_category}
                </h2>
                <div className="grid grid-cols-3 gap-3">
                    <div className="relative rounded-sm overflow-hidden group">
                        <Image
                            src="/category/electronics.jpg"
                            alt="category 1"
                            className="w-full"
                            width={200}
                            height={200}
                        />
                        <Link
                            href="/category/electronics"
                            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
                        >
                            {dictionary?.electronics}
                        </Link>
                    </div>
                    <div className="relative rounded-sm overflow-hidden group">
                        <Image
                            src="/category/skincare.webp"
                            alt="category 1"
                            className="w-full"
                            width={300}
                            height={300}
                        />
                        <Link
                            href="/category/skincare"
                            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
                        >
                            {dictionary?.skincare}
                        </Link>
                    </div>
                    <div className="relative rounded-sm overflow-hidden group">
                        <Image
                            src="/category/category-3.jpg"
                            alt="category 1"
                            className="w-full"
                            width={500}
                            height={500}
                        />
                        <Link
                            href="/category/furniture"
                            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
                        >
                            {dictionary?.furniture}
                        </Link>
                    </div>
                    <div className="relative rounded-sm overflow-hidden group">
                        <Image
                            src="/category/shirt.jpg"
                            alt="category 1"
                            className="w-full"
                            width={500}
                            height={500}
                        />
                        <Link
                            href="/category/dress"
                            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
                        >
                            {dictionary?.dresses}
                        </Link>
                    </div>
                    <div className="relative rounded-sm overflow-hidden group">
                        <Image
                            src="/category/shoe.jpg"
                            alt="category 1"
                            className="w-full"
                            width={300}
                            height={300}
                        />
                        <Link
                            href="/category/shoe"
                            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
                        >
                            {dictionary?.shoes}
                        </Link>
                    </div>
                    <div className="relative rounded-sm overflow-hidden group">
                        <Image
                            src="/category/watch.webp"
                            alt="category 1"
                            className="w-full"
                            width={500}
                            height={500}
                        />
                        <Link
                            href="/category/watches"
                            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
                        >
                            {dictionary?.watches}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}