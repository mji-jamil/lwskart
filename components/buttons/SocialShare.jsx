"use client";
import {
    EmailShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
export default function SocialShare({ url, title }) {
    return (
        <>
            <TwitterShareButton url={url} title={title}>
                <i className="fab fa-twitter"></i>
            </TwitterShareButton>
            <EmailShareButton url={url} subject={title} body={`Check out this amazing product: `}>
                <i className="fas fa-envelope"></i>
            </EmailShareButton>
            <WhatsappShareButton url={url} title={title}>
                <i className="fab fa-whatsapp"></i>
            </WhatsappShareButton>
        </>
    );
}