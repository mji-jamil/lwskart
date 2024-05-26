import Image from "next/image";
import Link from "next/link";

export default function Footer({ dictionary }) {
    return (
        <>
            <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
                <div className="container grid grid-cols-1 ">
                    <div className="col-span-1 space-y-4">
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            className="w-30"
                            width={500}
                            height={500}
                        />
                        <div className="mr-2">
                            <p className="text-gray-500">
                                {dictionary?.message}
                            </p>
                        </div>
                        <div className="flex space-x-5">
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <i className="fa-brands fa-facebook-square"></i>
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <i className="fa-brands fa-instagram-square"></i>
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <i className="fa-brands fa-twitter-square"></i>
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <i className="fa-brands fa-github-square"></i>
                            </Link>
                        </div>
                    </div>

                    <div className="col-span-2 grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-4 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                    {dictionary?.solutions}
                                </h3>
                                <div className="mt-4 space-y-4">
                                    <Link
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        {dictionary?.marketing}
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        {dictionary?.analytics}
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        {dictionary?.commerce}
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        {dictionary?.insights}
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                    {dictionary?.support}
                                </h3>
                                <div className="mt-4 space-y-4">
                                    <Link
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        {dictionary?.pricing}
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        {dictionary?.guides}
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        {dictionary?.api_status}
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                    {dictionary?.solutions}
                                </h3>
                                <div className="mt-4 space-y-4">
                                    <Link
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        {dictionary?.marketing}
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        {dictionary?.analytics}
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        {dictionary?.commerce}
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        {dictionary?.insights}
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                    {dictionary?.support}
                                </h3>
                                <div className="mt-4 space-y-4">
                                    <Link
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        {dictionary?.pricing}
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        {dictionary?.guides}
                                    </Link>
                                    <Link
                                        href="#"
                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                    >
                                        {dictionary?.api_status}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}