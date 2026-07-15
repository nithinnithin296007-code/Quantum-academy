import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FacilitiesSection from "../components/sections/FacilitiesSection";
import GallerySection from "../components/sections/GallerySection";
import TestSeriesSection from "../components/sections/TestSeriesSection";
import SEO from "../components/ui/SEO";

const facilitiesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    "name": "Campus Facilities - Quantum Academy",
    "description": "View Quantum Academy's modern science labs, library space, study cabins, and advanced mock test analytics.",
    "mainEntity": {
        "@type": "EducationalOrganization",
        "name": "Quantum Academy",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Mock Test Series Programs",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Course",
                        "name": "Eklavya Test Series",
                        "description": "JEE Mains Mock Test Series with 25 mock tests, comprehensive reports, and solutions."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Course",
                        "name": "Dronacharya Test Series",
                        "description": "NEET Mock Test Series with 20 mock tests, simulation reports, and instant answers."
                    }
                }
            ]
        }
    }
};

export default function Facilities() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main>
            <SEO schema={facilitiesSchema} />
            <Navbar />
            <FacilitiesSection />
            <GallerySection />
            <TestSeriesSection />
            <Footer />
        </main>
    );
}