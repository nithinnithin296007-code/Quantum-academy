import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FacilitiesSection from "../components/sections/FacilitiesSection";
import TestSeriesSection from "../components/sections/TestSeriesSection";

export default function Facilities() {
    return (
        <main>
            <Navbar />
            <FacilitiesSection />
            <TestSeriesSection />
            <Footer />
        </main>
    );
}