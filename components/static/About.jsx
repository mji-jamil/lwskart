import Image from "next/image";


export default function About() {
    return (
        <>
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">About LWSkart</h1>
                    <p className="text-gray-600 text-lg mb-12">
                        LWSkart is your go-to eCommerce platform offering a wide range of products at unbeatable prices.
                        We are committed to providing the best shopping experience, with high-quality products and
                        exceptional customer service.
                    </p>
                    <div className="text-left max-w-4xl mx-auto">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                        <p className="text-gray-600 mb-8">
                            At LWSkart, our mission is to make online shopping easy, affordable, and accessible for everyone. We strive to offer a vast selection of products across various categories, ensuring that our customers find exactly what they need at the best prices.
                        </p>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Values</h2>
                        <p className="text-gray-600 mb-8">
                            We believe in providing excellent customer service, maintaining high standards of product quality, and fostering a community of happy and satisfied customers. Our values guide us in everything we do, from sourcing products to delivering them to your doorstep.
                        </p>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                        <p className="text-gray-600 mb-4">
                            We are always here to help. If you have any questions, suggestions, or concerns, feel free to reach out to us at <a href="mailto:support@lwskart.com" className="text-red-600 hover:underline">support@lwskart.com</a>.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}