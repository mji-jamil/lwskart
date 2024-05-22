import Image from "next/image";
import Link from "next/link";

export default function Ads() {
    return (
        <>
            <div className="container pb-16">
                <Link href="#">
                    <Image
                        src="/offer.jpg"
                        alt="ads"
                        className="w-full"
                        width={4672}
                        height={1124}
                    />
                </Link>
            </div>
        </>
    );
}