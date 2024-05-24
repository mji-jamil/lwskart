"use client"
import { useEffect, useState } from "react";
import { getAllCategories, getProductCountByCategory } from "@/database/queries";
import { useRouter } from "next/navigation";

export default function Sidebar() {
    const [categories, setCategories] = useState([]);
    const [productCounts, setProductCounts] = useState({});
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const router = useRouter();

    useEffect(() => {
        async function fetchCategories() {
            const categories = await getAllCategories();
            setCategories(categories);

            const counts = {};
            for (const category of categories) {
                counts[category] = await getProductCountByCategory(category);
            }
            setProductCounts(counts);
        }

        fetchCategories();
    }, []);

    const handleCategoryChange = (category) => {
        const currentParams = new URLSearchParams(window.location.search);
        const categories = currentParams.get('categories')?.split(',') || [];
        if (categories.includes(category)) {
            const newCategories = categories.filter(cat => cat !== category);
            if (newCategories.length > 0) {
                currentParams.set('categories', newCategories.join(','));
            } else {
                currentParams.delete('categories');
            }
        } else {
            categories.push(category);
            currentParams.set('categories', categories.join(','));
        }
        updateUrlParams(currentParams);
    };

    const handlePriceChange = () => {
        const currentParams = new URLSearchParams(window.location.search);
        if (minPrice) {
            currentParams.set('min', minPrice);
        } else {
            currentParams.delete('min');
        }
        if (maxPrice) {
            currentParams.set('max', maxPrice);
        } else {
            currentParams.delete('max');
        }
        updateUrlParams(currentParams);
    };

    const updateUrlParams = (params) => {
        if (params.toString()) {
            router.push(`?${params.toString()}`);
        } else {
            router.push("/products");
        }
    };

    return (
        <>
            <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden hidden md:block">
                <div className="divide-y divide-gray-200 space-y-5">
                    <div>
                        <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                            Categories
                        </h3>
                        <div className="space-y-2">
                            {categories.map((category, i) => (
                                <div className="flex items-center" key={i}>
                                    <input
                                        type="checkbox"
                                        name={`cat-${i}`}
                                        id={`cat-${i}`}
                                        className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                        onChange={() => handleCategoryChange(category)}
                                    />
                                    <label
                                        htmlFor={`cat-${i}`}
                                        className="text-gray-600 ml-3 cursor-pointer"
                                    >
                                        {category}
                                    </label>
                                    <div className="ml-auto text-gray-600 text-sm">
                                        ({productCounts[category] || 0})
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4">
                        <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                            Price
                        </h3>
                        <div className="mt-4 flex items-center">
                            <input
                                type="text"
                                name="min"
                                id="min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                onBlur={handlePriceChange}
                                className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                                placeholder="min"
                            />
                            <span className="mx-3 text-gray-500">-</span>
                            <input
                                type="text"
                                name="max"
                                id="max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                onBlur={handlePriceChange}
                                className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                                placeholder="max"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}