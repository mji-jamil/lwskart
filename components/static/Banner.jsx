import Link from "next/link";

export default function Banner({ dictionary }) {
    return (
        <>
            <div
                className="bg-cover bg-no-repeat bg-center py-36"
                style={{ backgroundImage: `url('/banner-bg.jpg')` }}
            >
                <div className="container">
                    <h1 className="text-6xl text-gray-800 mb-4 capitalize font-bold">
                        best collection for <br /> home decoration
                    </h1>
                    <p className="text-lg text-gray-600">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Aperiam <br />
                        accusantium perspiciatis, sapiente magni eos dolorum ex
                        quos dolores odio.
                    </p>
                    <div className="mt-12">
                        <Link
                            href="#"
                            className="bg-primary border border-primary text-white px-8 py-3 font-medium
                            rounded-md hover:bg-transparent hover:text-primary"
                        >
                            {dictionary.shop_now}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}