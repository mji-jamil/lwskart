"use client";

import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const LanguageSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();

    const languages = [
        {
            code: "en",
            language: "English",
            flag: "/usa.png",
        },
        {
            code: "bn",
            language: "বাংলা",
            flag: "/bd.png",
        },
    ];

    const found = languages.find((lang) => pathname.includes(lang.code));
    const [selectedLanguage, setSelectedLanguage] = useState(
        found ?? languages[0],
    );
    const [showManu, setShowManu] = useState(false);

    const handleLanguageChange = (lang) => {
        const newLanguage = languages.find((l) => l.code === lang);
        setSelectedLanguage(newLanguage);
        setShowManu(false);
        router.push(`/${lang}`);
    };

    return (
        <div className="flex gap-4 items-center">
            <div className="relative">
                <button
                    className="flex items-center gap-2 text-black"
                    onClick={() => setShowManu(!showManu)}
                >
                    <Image
                        className="max-w-8"
                        src={selectedLanguage.flag}
                        alt={selectedLanguage.language}
                        height={100}
                        width={165}
                    />
                    {selectedLanguage.language}
                </button>
                {showManu && (
                    <div className="absolute right-0 top-full mt-2 w-40 rounded-md bg-white p-2 z-10 shadow-lg border border-gray-200
">
                        {languages.map((entry) => (
                            <li
                                key={entry.code}
                                onClick={() => handleLanguageChange(entry.code)}
                                className="flex items-center gap-2 p-2 rounded-md cursor-pointer bg-white hover:bg-red-500 hover:text-white transition-colors duration-150 ease-in-out"
                            >
                                <Image
                                    className="max-w-8"
                                    src={entry.flag}
                                    alt={entry.language}
                                    height={100}
                                    width={165}
                                />
                                {entry.language}
                            </li>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LanguageSwitcher;