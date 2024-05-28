"use client";
import Link from "next/link";
import { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { redirect } from "next/navigation";

export default function PaymentSuccess({ products }) {
    if (products?.length === 0) {
        redirect("/products");
    }
    const [pdfUrl, setPdfUrl] = useState(null);

    const generatePdf = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 800]);
        const { width, height } = page.getSize();
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
        const fontSize = 14;
        let y = height - 100;

        page.drawText("ORDER SUMMARY", {
            x: 50,
            y,
            size: fontSize + 10,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });
        y -= 50;

        let subtotal = 0;
        let productSummary = {};

        products.forEach((product) => {
            const { title, price } = product;
            subtotal += price;
            productSummary[title] = (productSummary[title] || 0) + 1;
        });

        for (const [title, quantity] of Object.entries(productSummary)) {
            const totalPrice =
                products.find((product) => product.title === title).price *
                quantity;
            const formattedTotalPrice = totalPrice.toFixed(2);
            const productDetails = `${title} (x${quantity}): $${formattedTotalPrice}`;
            page.drawText(productDetails, {
                x: 50,
                y,
                size: fontSize,
                font: timesRomanFont,
                color: rgb(0, 0, 0),
            });
            y -= 20;
        }

        const formattedSubtotal = subtotal.toFixed(2);
        page.drawText(`Subtotal: $${formattedSubtotal}`, {
            x: 50,
            y,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });
        y -= 20;

        page.drawText(`Shipping: Free`, {
            x: 50,
            y,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });
        y -= 20;

        page.drawText(`Total: $${formattedSubtotal}`, {
            x: 50,
            y,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);
    };

    return (
        <div className="container mx-auto text-center py-16">
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="py-4 px-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Payment Successful!
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Thank you for your purchase. Your order has been
                        successfully placed.
                    </p>
                    <p className="text-gray-600 mb-6">Want to shop more?</p>
                    <Link
                        href="/products"
                        className="inline-block bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition"
                    >
                        Go to Shop
                    </Link>
                    <div className="mt-4">
                        <button
                            onClick={generatePdf}
                            className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition"
                        >
                            Download Receipt as PDF
                        </button>
                        {pdfUrl && (
                            <a
                                href={pdfUrl}
                                download="receipt.pdf"
                                className="block mt-2 text-primary underline"
                            >
                                Click here to download your receipt
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}