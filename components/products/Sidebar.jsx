import "@fortawesome/fontawesome-free/css/all.min.css";
import {getAllCategories, getProductCountByCategory} from "@/database/queries";

export default async function Sidebar() {
    const categories = await getAllCategories();

    return (
        <>
            <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
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
                                    />
                                    <label
                                        htmlFor={`cat-${i}`}
                                        className="text-gray-600 ml-3 cusror-pointer"
                                    >
                                        {category}
                                    </label>
                                    <div className="ml-auto text-gray-600 text-sm">
                                        ({getProductCountByCategory(category)})
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
                                className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                                placeholder="min"
                            />
                            <span className="mx-3 text-gray-500">-</span>
                            <input
                                type="text"
                                name="max"
                                id="max"
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